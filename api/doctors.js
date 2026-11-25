const { neon } = require('@neondatabase/serverless');

// Backup de leads del formulario /doctors. El envío primario es Web3Forms (email);
// esto guarda cada lead en Neon por si el primario falla. Sustituye a FormSubmit (caído, error 522, nov 2026).
let ready = false;
async function ensure(sql) {
  if (ready) return;
  await sql`CREATE TABLE IF NOT EXISTS doctors_leads (
    id serial PRIMARY KEY,
    nombre text, email text, celular text, instagram text,
    data jsonb, ip text, ts timestamptz DEFAULT now()
  )`;
  ready = true;
}

module.exports = async (req, res) => {
  const sql = neon(process.env.DATABASE_URL);
  await ensure(sql);

  if (req.method === 'POST') {
    const b = req.body || {};
    if (b.botcheck) return res.status(200).json({ ok: true }); // honeypot: descartar sin ruido
    const nombre = String(b.nombre || '').trim().slice(0, 120);
    const email = String(b.email || '').trim().toLowerCase().slice(0, 160);
    const celular = String(b.celular || '').trim().slice(0, 60);
    const instagram = String(b.instagram || '').trim().slice(0, 120);
    if (!nombre && !email) return res.status(400).json({ ok: false });
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    const data = {};
    for (const k of Object.keys(b).slice(0, 25)) {
      if (typeof b[k] === 'string') data[k] = b[k].slice(0, 2000);
    }
    await sql`INSERT INTO doctors_leads (nombre, email, celular, instagram, data, ip)
              VALUES (${nombre}, ${email}, ${celular}, ${instagram}, ${JSON.stringify(data)}::jsonb, ${ip})`;
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'GET') {
    const q = req.query || {};
    if (!q.full || q.full !== process.env.CURSO_STATS_KEY) {
      return res.status(200).json({ ok: true, info: 'backup de leads activo' });
    }
    const rows = await sql`SELECT id, nombre, email, celular, instagram, data, ts FROM doctors_leads ORDER BY ts DESC LIMIT 200`;
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: true, count: rows.length, leads: rows });
  }

  return res.status(405).json({ ok: false });
};
