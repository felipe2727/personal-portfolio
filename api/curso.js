const { neon } = require('@neondatabase/serverless');

const NIVELES = ['Nunca he usado IA', 'La uso de vez en cuando', 'La uso a diario', 'Ya creo contenido con IA'];
const GENEROS = ['Mujer', 'Hombre', 'Otro', 'Prefiero no decirlo'];

const TEST_WORDS = ['test', 'prueba', 'ejemplo', 'borrar', 'asdf', 'qwerty', 'demo'];
const OWNER_EMAILS = ['mortylobster@gmail.com', 'felipeeche47@gmail.com', 'felipe@kentro-ai.com'];
const BAD_DOMAINS = [
  'kentro.test', 'mailinator.com', 'yopmail.com', 'guerrillamail', '10minutemail', 'sharklasers',
  'trashmail', 'maildrop.cc', 'getnada', 'dispostable', 'temp-mail', 'tempmail', 'fakeinbox',
  'mail.ru', 'bk.ru', 'inbox.ru', 'list.ru', 'rambler.ru',
];

function spamCheck(nombre, email) {
  const n = nombre.toLowerCase();
  const e = email.toLowerCase();
  if (OWNER_EMAILS.includes(e)) return 'owner';
  if (BAD_DOMAINS.some((d) => e.includes(d))) return 'dominio';
  if (TEST_WORDS.some((w) => n.includes(w) || e.split('@')[0].includes(w))) return 'test';
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(e)) return 'email';
  if (/https?:|www\./i.test(n) || (n.match(/\d/g) || []).length > 3) return 'nombre';
  return null;
}

module.exports = async (req, res) => {
  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'POST') {
    const b = req.body || {};
    if (b.website) return res.status(200).json({ ok: true }); // honeypot: drop entirely
    const nombre = String(b.nombre || '').trim().slice(0, 80);
    const edad = parseInt(b.edad, 10);
    const genero = String(b.genero || '');
    const email = String(b.email || '').trim().toLowerCase().slice(0, 120);
    const nivel = String(b.nivel || '');
    if (!nombre || !email.includes('@') || !(edad >= 14 && edad <= 99) || !GENEROS.includes(genero) || !NIVELES.includes(nivel)) {
      return res.status(400).json({ ok: false, error: 'datos incompletos' });
    }
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    let motivo = spamCheck(nombre, email);
    if (!motivo && ip !== 'unknown') {
      const [{ reciente }] = await sql`SELECT count(*)::int AS reciente FROM curso_leads WHERE ip = ${ip} AND ts > now() - interval '1 hour'`;
      if (reciente >= 4) motivo = 'rate';
    }
    await sql`INSERT INTO curso_leads (nombre, edad, genero, email, nivel, ip, flagged, motivo)
              VALUES (${nombre}, ${edad}, ${genero}, ${email}, ${nivel}, ${ip}, ${!!motivo}, ${motivo})
              ON CONFLICT (email) DO NOTHING`;
    const [{ count }] = await sql`SELECT count(*)::int AS count FROM curso_leads WHERE flagged = false`;
    return res.status(200).json({ ok: true, count });
  }

  if (req.method === 'GET') {
    const all = await sql`SELECT nombre, edad, genero, email, nivel, ts, flagged, motivo FROM curso_leads ORDER BY ts DESC`;
    const rows = all.filter((r) => !r.flagged);
    const count = rows.length;
    const bucket = (e) => (e < 18 ? '14–17' : e < 25 ? '18–24' : e < 35 ? '25–34' : e < 45 ? '35–44' : e < 55 ? '45–54' : '55+');
    const tally = (arr, fn) => arr.reduce((m, x) => { const k = fn(x); m[k] = (m[k] || 0) + 1; return m; }, {});
    const stats = {
      count,
      plazasGratis: Math.max(0, 50 - count),
      flagged: all.length - count,
      porGenero: tally(rows, (r) => r.genero),
      porEdad: tally(rows, (r) => bucket(r.edad)),
      porNivel: tally(rows, (r) => r.nivel),
      porDia: tally(rows, (r) => new Date(r.ts).toISOString().slice(0, 10)),
    };
    const q = req.query || {};
    if (q.full && q.full === process.env.CURSO_STATS_KEY) {
      stats.entries = all.map((r) => ({
        nombre: r.nombre, edad: r.edad, genero: r.genero, email: r.email, nivel: r.nivel,
        flag: r.flagged ? (r.motivo || 'spam') : '',
        fecha: new Date(r.ts).toISOString().slice(0, 16).replace('T', ' '),
      }));
    }
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(stats);
  }

  return res.status(405).json({ ok: false });
};
