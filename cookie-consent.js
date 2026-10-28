/* Kéntro — banner de cookies (inferior) + Consent Mode v2 de Google y consentimiento de Meta Pixel.
   El estado por defecto (denegado) se fija en el <head> de cada página antes de GTM y del Pixel. */
(function () {
  var KEY = 'kentro-consent';
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function apply(v) {
    var g = v === 'granted' ? 'granted' : 'denied';
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('consent', 'update', { ad_storage: g, ad_user_data: g, ad_personalization: g, analytics_storage: g });
    if (typeof window.fbq === 'function') window.fbq('consent', g === 'granted' ? 'grant' : 'revoke');
    window.dataLayer.push({ event: 'consent_update', consent: g });
  }

  var en = (function () { try { return localStorage.getItem('kentro-lang') === 'en'; } catch (e) { return false; } })();
  var T = en
    ? { text: 'We use our own and third-party cookies (Google and Meta) to measure visits and improve our ads. You can accept or reject them.', more: 'Cookie policy', ok: 'Accept', no: 'Reject' }
    : { text: 'Usamos cookies propias y de terceros (Google y Meta) para medir las visitas y mejorar nuestros anuncios. Puedes aceptarlas o rechazarlas.', more: 'Política de cookies', ok: 'Aceptar', no: 'Rechazar' };

  function show() {
    if (document.getElementById('kc-banner')) return;
    var css = document.createElement('style');
    css.textContent =
      '#kc-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:1000;max-width:760px;margin:0 auto;background:#1a1a1a;color:#f2f1ef;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.35);padding:18px 20px;display:flex;gap:16px;align-items:center;font-family:Oxanium,system-ui,sans-serif}' +
      '#kc-banner p{flex:1;font-size:13px;line-height:1.55;margin:0}' +
      '#kc-banner a{color:#f2f1ef;text-decoration:underline}' +
      '#kc-banner .kc-btns{display:flex;gap:8px;flex-shrink:0}' +
      '#kc-banner button{font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:.04em;padding:11px 18px;border-radius:30px;cursor:pointer;border:1px solid rgba(242,241,239,.35);background:none;color:#f2f1ef}' +
      '#kc-banner button.kc-ok{background:#e63228;border-color:#e63228;color:#fff}' +
      '@media (max-width:640px){#kc-banner{flex-direction:column;align-items:stretch;left:10px;right:10px;bottom:10px;padding:16px}#kc-banner .kc-btns button{flex:1}}' +
      'body.kc-open .wa-float{bottom:200px}@media (min-width:641px){body.kc-open .wa-float{bottom:110px}}';
    document.head.appendChild(css);
    var b = document.createElement('div');
    b.id = 'kc-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', T.more);
    b.innerHTML = '<p>' + T.text + ' <a href="/cookies">' + T.more + '</a></p>' +
      '<div class="kc-btns"><button type="button" class="kc-no">' + T.no + '</button><button type="button" class="kc-ok">' + T.ok + '</button></div>';
    document.body.appendChild(b);
    document.body.classList.add('kc-open');
    function choose(v) { save(v); apply(v); b.remove(); document.body.classList.remove('kc-open'); }
    b.querySelector('.kc-ok').addEventListener('click', function () { choose('granted'); });
    b.querySelector('.kc-no').addEventListener('click', function () { choose('denied'); });
  }

  // Permite reabrir el banner desde la página de política (botón "Cambiar preferencias").
  window.kentroCookies = { reopen: function () { try { localStorage.removeItem(KEY); } catch (e) {} show(); } };

  if (!read()) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
  }
})();
