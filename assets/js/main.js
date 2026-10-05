/* =========================================================
   Nachiyar Chit Fund — site script
   Layout injection, bilingual switch, animations, page apps
   ========================================================= */
(function () {
  "use strict";
  var D = document, root = D.documentElement;
  root.classList.add("js");
  var C = window.NCF;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- storage-safe language ---------- */
  function getLang() { try { return localStorage.getItem("ncf-lang") || "en"; } catch (e) { return "en"; } }
  function storeLang(l) { try { localStorage.setItem("ncf-lang", l); } catch (e) {} }
  var LANG = getLang() === "ta" ? "ta" : "en";
  function t(o) { if (o == null) return ""; if (typeof o === "string") return o; return o[LANG] || o.en; }
  function L(en, ta) { return LANG === "ta" ? ta : en; }

  /* ---------- formatting ---------- */
  function inr(n) { return "₹" + Number(n).toLocaleString("en-IN"); }
  function nfmt(n) { return Number(n).toLocaleString("en-IN"); }
  function short(n) {
    if (n >= 10000000) return "₹" + (n / 10000000).toString().replace(/\.0+$/, "") + L(" Crore", " கோடி");
    if (n >= 100000) return "₹" + (n / 100000).toString().replace(/\.0+$/, "") + L(" Lakh", " லட்சம்");
    return inr(n);
  }
  function unitWord(u, plural) {
    var m = { month: [L("Month", "மாதம்"), L("Months", "மாதங்கள்")], week: [L("Week", "வாரம்"), L("Weeks", "வாரங்கள்")], day: [L("Day", "நாள்"), L("Days", "நாட்கள்")] };
    return m[u][plural ? 1 : 0];
  }
  function instWord(u) { return { month: L("Monthly instalment", "மாதத் தவணை"), week: L("Weekly instalment", "வாரத் தவணை"), day: L("Daily instalment", "தினசரி தவணை") }[u]; }
  function auctionWord(a) { return { monthly: L("Monthly oral auction", "மாதாந்திர வாய்மொழி ஏலம்"), weekly: L("Every Thursday, live", "ஒவ்வொரு வியாழன், நேரடி"), daily: L("Every evening, live", "தினமும் மாலை, நேரடி") }[a]; }

  /* ---------- icons ---------- */
  var I = {
    phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/>',
    mail: '<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2-8 5-8-5V6l8 5 8-5z"/>',
    pin: '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
    globe: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.9a15.6 15.6 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4zM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16 16 0 0 0 0 4zm.8 2h2.9c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16zM8 8H5.1a8 8 0 0 1 4.3-3.6C8.8 5.5 8.3 6.7 8 8zm4 12c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4zm2.3-6H9.7a14 14 0 0 1 0-4h4.6a14 14 0 0 1 0 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.9a8 8 0 0 1-4.3 3.6zm1.7-5.6a16 16 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4z"/>',
    wa: '<path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1a8.1 8.1 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4l-.5-.3zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM20.5 3.5A11.8 11.8 0 0 0 1.9 17.8L.2 24l6.4-1.7A11.8 11.8 0 0 0 24 12a11.7 11.7 0 0 0-3.5-8.5z"/>',
    ig: '<path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM21.9 7a6 6 0 0 0-1.6-4.3A6 6 0 0 0 16 1.1C14.3 1 9.7 1 8 1.1a6 6 0 0 0-4.3 1.6A6 6 0 0 0 2.1 7C2 8.7 2 15.3 2.1 17a6 6 0 0 0 1.6 4.3A6 6 0 0 0 8 22.9c1.7.1 6.3.1 8 0a6 6 0 0 0 4.3-1.6 6 6 0 0 0 1.6-4.3c.1-1.7.1-8.3 0-10zm-2.2 12a3.3 3.3 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.9.4s-4.6.1-5.9-.4A3.3 3.3 0 0 1 4.3 19c-.5-1.3-.4-4.3-.4-5.9s-.1-4.6.4-5.9A3.3 3.3 0 0 1 6.1 5.4C7.4 4.9 10.4 5 12 5s4.6-.1 5.9.4a3.3 3.3 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.9s.1 4.6-.4 5.9z"/>',
    fb: '<path d="M14 8V6c0-.8.6-1 1-1h2.6V1H14c-3.6 0-4.5 2.7-4.5 4.5V8H7v4h2.5v11h4.5V12h3.3l.4-4z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    shield: '<path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>',
    star: '<path d="M12 2l3 6.3 6.9.9-5 4.8 1.2 6.9L12 17.6 5.9 21l1.2-6.9-5-4.8 6.9-.9z"/>',
    // stroke icons (24)
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.3-6 6.5-6s5.9 2.4 6.5 6"/><circle cx="17" cy="9" r="2.6"/><path d="M16 14.2c2.9.1 5 2.3 5.5 5.3"/>',
    chart: '<path d="M3 20h18"/><path d="M6 16v-4M10 16V9M14 16v-6M18 16V6"/><path d="M5 9l5-4 4 3 5-5"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.6"/>',
    rupee: '<path d="M7 4h11M7 8.5h11M7 4c6 0 7 4.5 4 7.5S7 13 7 13l8 8"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',
    handshake: '<path d="M2 11l4-4 4 2 3-2 4 1 5 3"/><path d="M6 7l-4 4 6 6c.8.8 2 .8 2.8 0l5.4-5.4"/><path d="M10 13l2 2M12.5 11.5l2 2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    growth: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    gavel: '<path d="M14.5 3.5l6 6M12 6l6 6M10 8l6 6-2.5 2.5-6-6z"/><path d="M8.5 12.5 3 18l3 3 5.5-5.5"/><path d="M13 21h8"/>',
    live: '<circle cx="12" cy="12" r="2.5"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14"/>',
    percent: '<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M7.5 13.5h3v3h-3z"/>',
    coin: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><path d="M10 9.5h4M10 12h4M11 9.5c2 0 2 3 0 3l2.5 2.5"/>',
    crown: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/><path d="M5 19h14"/>',
    diamond: '<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3 7.5 9 12 21M15 3l1.5 6L12 21"/>',
    bars: '<path d="M3 18l3-6h6l3 6zM9 12l3-6h6l3 6"/><path d="M2 21h20"/>',
    flower: '<circle cx="12" cy="12" r="2.6"/><path d="M12 9.4c-1.6-3.6 1.6-6.4 0-6.4s1.6 2.8 0 6.4zM12 14.6c1.6 3.6-1.6 6.4 0 6.4s-1.6-2.8 0-6.4zM9.4 12c-3.6 1.6-6.4-1.6-6.4 0s2.8-1.6 6.4 0zM14.6 12c3.6-1.6 6.4 1.6 6.4 0s-2.8 1.6-6.4 0z"/>',
    rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 15l-3-3c1-4 4.5-9 13-9 0 8.5-5 12-9 13z"/><circle cx="14.5" cy="9.5" r="1.8"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5"/>',
    ring: '<circle cx="12" cy="15" r="6"/><path d="M9 3h6l-3 6z"/>',
    briefcase: '<rect x="2.5" y="7" width="19" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2.5 13h19"/>',
    heart: '<path d="M12 20s-8-4.6-8-10.4A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8 2.6C20 15.4 12 20 12 20z"/><path d="M9 12h2l1-2 1.5 4 1-2H17"/>',
    car: '<path d="M3 16v-4l2.5-5h13L21 12v4z"/><circle cx="7" cy="16.5" r="2"/><circle cx="17" cy="16.5" r="2"/><path d="M3 12h18"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>',
    plane: '<path d="M2 16l20-8-4 12-6-4-3 4v-5z"/><path d="M12 16l10-8"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    phoneS: '<path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2 4.6 1.4V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5l1.3 4.6z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    app: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10.5 18.5h3"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 16l-5-5-9 9"/>',
    calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>'
  };
  function ico(name, cls) { return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (I[name] || "") + "</svg>"; }
  window.NCF_ICO = ico;

  /* ---------- nav ---------- */
  var NAV = [
    ["index.html", "Home", "முகப்பு"],
    ["about.html", "About Us", "எங்களைப் பற்றி"],
    ["schemes.html", "Chit Schemes", "சீட்டு திட்டங்கள்"],
    ["calculator.html", "Calculator", "கணக்கீடு"],
    ["how-it-works.html", "How It Works", "செயல்முறை"],
    ["why-chit-fund.html", "Why Chit Fund", "ஏன் சீட்டு?"],
    ["faqs.html", "FAQs", "கேள்விகள்"],
    ["gallery.html", "Gallery", "கேலரி"],
    ["careers.html", "Careers", "வேலைவாய்ப்பு"],
    ["contact.html", "Contact Us", "தொடர்புக்கு"]
  ];
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (page === "" || page === "home.html") page = "index.html";
  var waBase = "https://wa.me/" + C.whatsappIntl;
  function waLink(msg) { return waBase + "?text=" + encodeURIComponent(msg); }

  function headerHTML() {
    var items = NAV.map(function (n, i) {
      var active = n[0] === page ? ' class="active" aria-current="page"' : "";
      return '<li style="--i:' + i + '"><a href="' + n[0] + '"' + active + ' data-ta="' + n[2] + '">' + n[1] + "</a></li>";
    }).join("");
    return '' +
      '<div class="topbar"><div class="container">' +
      '<div class="tb-left"><a href="tel:' + C.phoneIntl + '">' + ico("phone") + " " + C.phone + "</a>" +
      '<a href="' + waBase + '" target="_blank" rel="noopener">' + ico("wa") + " " + C.whatsapp + "</a>" +
      '<a class="tb-mail" href="mailto:' + C.email + '">' + ico("mail") + " " + C.email + "</a></div>" +
      '<div class="tb-right"><span class="tb-tag">நம்பிக்கையுடன்... வளர்ச்சியின் வழியில்... உங்கள் நலனுக்காக...</span>' +
      '<a href="' + C.instagramUrl + '" target="_blank" rel="noopener" aria-label="Instagram">' + ico("ig") + "</a>" +
      '<a href="' + C.facebookUrl + '" target="_blank" rel="noopener" aria-label="Facebook">' + ico("fb") + "</a></div>" +
      "</div></div>" +
      '<header class="site-header" id="siteHeader"><div class="container nav-wrap">' +
      '<a class="brand" href="index.html" aria-label="Nachiyar Chit Fund home"><img src="assets/img/logo-badge.png" alt="Nachiyar Chit Fund logo" width="54" height="54">' +
      '<span class="brand-text"><span class="brand-name">NACHIYAR</span><span class="brand-sub">CHIT FUND PRIVATE LIMITED</span></span></a>' +
      '<div class="nav-actions">' +
      '<a class="btn btn-gold btn-sm hdr-cta" href="tel:' + C.phoneIntl + '">' + ico("phone").replace("<svg ", '<svg style="fill:currentColor" ') + " " + C.phone + "</a>" +
      '<a class="btn btn-wa btn-sm hdr-cta" href="' + waBase + '" target="_blank" rel="noopener">' + ico("wa").replace("<svg ", '<svg style="fill:#fff" ') + ' <span data-ta="சீட்டில் சேர">Join a Chit</span></a>' +
      '<div class="lang-switch" role="group" aria-label="Language" data-lang="' + LANG + '"><span class="lang-pill"></span>' +
      '<button type="button" data-setlang="en" aria-pressed="' + (LANG === "en") + '">EN</button>' +
      '<button type="button" class="ta-btn" data-setlang="ta" aria-pressed="' + (LANG === "ta") + '">தமிழ்</button></div>' +
      '<button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mainNav"><span></span><span></span><span></span></button>' +
      "</div></div>" +
      '<nav class="main-nav" id="mainNav" aria-label="Main"><div class="container"><ul>' + items + "</ul>" +
      '<div class="mnav-cta" style="display:none"></div></div></nav></header>';
  }

  function footerHTML() {
    var quick = NAV.slice(0, 5).map(function (n) { return '<li><a href="' + n[0] + '" data-ta="' + n[2] + '">' + n[1] + "</a></li>"; }).join("");
    var more = NAV.slice(5).map(function (n) { return '<li><a href="' + n[0] + '" data-ta="' + n[2] + '">' + n[1] + "</a></li>"; }).join("");
    var r = C.reg;
    return '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
      '<div><div class="f-brand"><img src="assets/img/logo-badge.png" alt="" width="64" height="64"><span class="brand-text"><span class="brand-name">NACHIYAR</span><span class="brand-sub">CHIT FUND PRIVATE LIMITED</span></span></div>' +
      '<p class="about" data-ta="வேலூரைச் சேர்ந்த பதிவு செய்யப்பட்ட சீட்டு நிறுவனம். 2018 முதல் நம்பிக்கையுடன் குடும்பங்களும் வியாபாரிகளும் சேமித்து வளர உதவுகிறோம். சேர்ந்து சேமிப்போம், சேர்ந்து வளர்வோம், சேர்ந்து முன்னேறுவோம்.">A registered chit fund company from Vellore, helping families and traders save and grow with confidence since 2018. Save together, grow together, prosper together.</p>' +
      '<div class="socials"><a href="' + C.instagramUrl + '" target="_blank" rel="noopener" aria-label="Instagram">' + ico("ig") + '</a><a href="' + C.facebookUrl + '" target="_blank" rel="noopener" aria-label="Facebook">' + ico("fb") + '</a><a href="' + waBase + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + ico("wa") + '</a></div></div>' +
      '<div><h4 data-ta="விரைவு இணைப்புகள்">Quick Links</h4><ul class="f-links">' + quick + "</ul></div>" +
      '<div><h4 data-ta="மேலும்">More</h4><ul class="f-links">' + more + "</ul></div>" +
      '<div><h4 data-ta="எங்களை தொடர்பு கொள்ள">Get in Touch</h4><ul class="f-contact">' +
      '<li>' + ico("pin") + '<a href="' + C.mapUrl + '" target="_blank" rel="noopener" data-ta="' + C.address.ta + '">' + C.address.en + "</a></li>" +
      '<li>' + ico("phone") + '<span><a href="tel:' + C.phoneIntl + '">' + C.phone + '</a> <small data-ta="(மொபைல்)">(Mobile)</small></span></li>' +
      '<li>' + ico("wa") + '<span><a href="' + waBase + '" target="_blank" rel="noopener">' + C.whatsapp + '</a> <small data-ta="(வாட்ஸ்அப்)">(WhatsApp)</small></span></li>' +
      '<li>' + ico("mail") + '<a href="mailto:' + C.email + '" style="word-break:break-all">' + C.email + "</a></li>" +
      '<li>' + ico("globe") + '<a href="' + C.websiteUrl + '" target="_blank" rel="noopener">' + C.website + "</a></li>" +
      "</ul></div></div>" +
      '<div class="f-reg"><span>CIN: <b>' + r.CIN + '</b></span><span>PAN: <b>' + r.PAN + '</b></span><span>TAN: <b>' + r.TAN + '</b></span><span>MSME / Udyam: <b>' + r.UDYAM + "</b></span></div>" +
      '<div class="f-bottom"><span>© ' + new Date().getFullYear() + ' <span data-ta="நாச்சியார் சிட் ஃபண்ட் பிரைவேட் லிமிடெட். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.">Nachiyar Chit Fund Private Limited. All rights reserved.</span></span><span class="tamil-tag">நம்பிக்கையை உருவாக்குவோம்... வளர்ச்சியை உருவாக்குவோம்...</span></div>' +
      "</div></footer>" +
      '<a class="fab-wa" href="' + waLink("Hello Nachiyar Chit Fund, I would like to know about your chit schemes.") + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + ico("wa") + '<span class="fab-tip" data-ta="வாட்ஸ்அப்பில் பேசுங்கள்">Chat on WhatsApp</span></a>' +
      '<button class="to-top" id="toTop" aria-label="Back to top"><svg class="ring" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22"/></svg><svg class="arr" viewBox="0 0 24 24"><path d="M6 14l6-6 6 6"/></svg></button>' +
      '<div class="toast" id="toast" role="status" aria-live="polite"></div>';
  }

  /* ---------- inject chrome ---------- */
  var hdr = D.getElementById("site-header");
  if (hdr) hdr.outerHTML = headerHTML();
  var ftr = D.getElementById("site-footer");
  if (ftr) ftr.outerHTML = footerHTML();
  var prog = D.createElement("div"); prog.id = "scroll-progress"; D.body.prepend(prog);
  var glow = D.createElement("div"); glow.className = "cursor-glow"; D.body.appendChild(glow);

  // mobile menu CTAs
  var mcta = D.querySelector(".mnav-cta");
  if (mcta) {
    mcta.innerHTML = '<a class="btn btn-gold" href="tel:' + C.phoneIntl + '">' + ico("phone") + " " + C.phone + '</a><a class="btn btn-wa" href="' + waBase + '" target="_blank" rel="noopener">' + ico("wa") + " WhatsApp</a>";
    mcta.style.cssText = "";
    mcta.className = "mnav-cta";
  }

  /* ---------- page ready ---------- */
  D.body.classList.add("page-enter");
  window.addEventListener("load", function () { revealInView(); });

  /* ---------- language ---------- */
  function applyLang(l) {
    LANG = l; root.lang = l; storeLang(l);
    D.querySelectorAll("[data-ta]").forEach(function (el) {
      if (el.dataset.en == null) el.dataset.en = el.innerHTML;
      el.innerHTML = l === "ta" ? el.dataset.ta : el.dataset.en;
    });
    D.querySelectorAll("[data-ta-ph]").forEach(function (el) {
      if (el.dataset.enPh == null) el.dataset.enPh = el.getAttribute("placeholder") || "";
      el.setAttribute("placeholder", l === "ta" ? el.dataset.taPh : el.dataset.enPh);
    });
    D.querySelectorAll("[data-ta-title]").forEach(function (el) {
      if (el.dataset.enTitle == null) el.dataset.enTitle = D.title;
      D.title = l === "ta" ? el.dataset.taTitle : el.dataset.enTitle;
    });
    D.querySelectorAll(".lang-switch").forEach(function (s) {
      s.dataset.lang = l;
      s.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.setlang === l)); });
    });
    D.dispatchEvent(new CustomEvent("langchange"));
    setTimeout(function () { revealInView(); moveTabInd(); }, 30);
  }
  D.addEventListener("click", function (e) {
    var b = e.target.closest("[data-setlang]");
    if (b && b.dataset.setlang !== LANG) {
      D.body.style.transition = "opacity .25s"; D.body.style.opacity = ".35";
      setTimeout(function () { applyLang(b.dataset.setlang); D.body.style.opacity = "1"; }, 200);
    }
  });

  /* ---------- header behaviour ---------- */
  var header = D.getElementById("siteHeader");
  var toTop = D.getElementById("toTop");
  var ringC = toTop && toTop.querySelector("circle");
  function onScroll() {
    var y = window.scrollY, h = D.documentElement.scrollHeight - innerHeight;
    var p = h > 0 ? Math.min(1, y / h) : 0;
    prog.style.transform = "scaleX(" + p + ")";
    if (header) header.classList.toggle("scrolled", y > 20);
    if (toTop) { toTop.classList.toggle("show", y > 500); if (ringC) ringC.style.strokeDashoffset = String(138 - 138 * p); }
    var vs = D.querySelector(".vsteps");
    if (vs) { var r = vs.getBoundingClientRect(); var pr = Math.max(0, Math.min(1, (innerHeight * 0.75 - r.top) / r.height)); vs.style.setProperty("--progress", pr.toFixed(3)); }
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  var mt = D.getElementById("menuToggle");
  if (mt) mt.addEventListener("click", function () {
    var open = D.body.classList.toggle("menu-open");
    mt.setAttribute("aria-expanded", String(open)); mt.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  D.addEventListener("keydown", function (e) { if (e.key === "Escape" && D.body.classList.contains("menu-open")) mt.click(); });

  /* ---------- menu links close the mobile menu ---------- */
  D.addEventListener("click", function (e) { if (e.target.closest(".main-nav a[href]")) D.body.classList.remove("menu-open"); });

  /* ---------- reveal ---------- */
  D.querySelectorAll("[data-stagger]").forEach(function (g) {
    var kind = g.dataset.stagger || "up", step = parseFloat(g.dataset.step || "0.09");
    Array.prototype.forEach.call(g.children, function (c, i) {
      if (!c.hasAttribute("data-reveal")) c.setAttribute("data-reveal", kind);
      c.style.setProperty("--d", (i * step).toFixed(2) + "s");
    });
  });
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  function observeReveals(scope) {
    (scope || D).querySelectorAll("[data-reveal]:not(.in)").forEach(function (el) { if (io) io.observe(el); else el.classList.add("in"); });
  }
  function revealInView() {
    D.querySelectorAll("[data-reveal]:not(.in)").forEach(function (el) {
      var r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add("in");
    });
  }
  window.NCF_reveal = function (s) { if (s) s.querySelectorAll("[data-stagger]").forEach(function (g) { Array.prototype.forEach.call(g.children, function (c, i) { if (!c.hasAttribute("data-reveal")) c.setAttribute("data-reveal", g.dataset.stagger || "up"); c.style.setProperty("--d", (i * 0.08).toFixed(2) + "s"); }); }); observeReveals(s); setTimeout(revealInView, 30); };

  /* ---------- counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.dataset.count), dur = 1800, start = null, pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    if (reduce) { el.textContent = pre + nfmt(target) + suf; return; }
    function step(ts) { if (!start) start = ts; var p = Math.min(1, (ts - start) / dur); var e = 1 - Math.pow(1 - p, 4); el.textContent = pre + nfmt(Math.round(target * e)) + suf; if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  var cio = "IntersectionObserver" in window ? new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { animateCount(en.target); var s = en.target.closest(".stat"); if (s) s.classList.add("in"); cio.unobserve(en.target); } });
  }, { threshold: 0.4 }) : null;
  D.querySelectorAll("[data-count]").forEach(function (el) { el.textContent = (el.dataset.prefix || "") + nfmt(el.dataset.count) + (el.dataset.suffix || ""); if (cio) cio.observe(el); });

  var bio = "IntersectionObserver" in window ? new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { en.target.style.width = en.target.dataset.w; bio.unobserve(en.target); } });
  }, { threshold: 0.3 }) : null;
  D.querySelectorAll("[data-w]").forEach(function (el) { if (bio && !reduce) bio.observe(el); else el.style.width = el.dataset.w; });

  /* ---------- interactions: tilt, glow, ripple ---------- */
  var fine = window.matchMedia && matchMedia("(hover:hover) and (pointer:fine)").matches;
  function bindTilt(scope) {
    if (!fine || reduce) return;
    (scope || D).querySelectorAll("[data-tilt]").forEach(function (el) {
      if (el._tilt) return; el._tilt = 1;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(900px) rotateY(" + (x * 9) + "deg) rotateX(" + (-y * 9) + "deg) translateY(-6px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }
  window.NCF_tilt = bindTilt; bindTilt();
  D.addEventListener("mousemove", function (e) {
    var f = e.target.closest && e.target.closest(".feature");
    if (f) { var r = f.getBoundingClientRect(); f.style.setProperty("--mx", (e.clientX - r.left) + "px"); f.style.setProperty("--my", (e.clientY - r.top) + "px"); }
    if (fine && !reduce) { glow.style.opacity = "1"; glow.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)"; }
  }, { passive: true });
  D.addEventListener("pointerdown", function (e) {
    var b = e.target.closest(".btn"); if (!b || reduce) return;
    var r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), sp = D.createElement("span");
    sp.className = "ripple"; sp.style.width = sp.style.height = s + "px"; sp.style.left = (e.clientX - r.left - s / 2) + "px"; sp.style.top = (e.clientY - r.top - s / 2) + "px";
    b.appendChild(sp); setTimeout(function () { sp.remove(); }, 700);
  });

  /* ---------- toast & copy ---------- */
  var toastEl = D.getElementById("toast"), tt;
  function toast(msg) { if (!toastEl) return; toastEl.textContent = msg; toastEl.classList.add("show"); clearTimeout(tt); tt = setTimeout(function () { toastEl.classList.remove("show"); }, 2400); }
  D.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]"); if (!b) return;
    var txt = b.dataset.copy;
    function ok() { b.classList.add("ok"); toast(L("Copied: ", "நகலெடுக்கப்பட்டது: ") + txt); setTimeout(function () { b.classList.remove("ok"); }, 1600); }
    function fallback() { var ta = D.createElement("textarea"); ta.value = txt; D.body.appendChild(ta); ta.select(); try { D.execCommand("copy"); ok(); } catch (x) { toast(txt); } ta.remove(); }
    try { navigator.clipboard.writeText(txt).then(ok, fallback); } catch (x) { fallback(); }
  });

  /* ---------- hero: rotating words ---------- */
  function initRotator() {
    D.querySelectorAll(".rotator").forEach(function (r) {
      if (r._iv) clearInterval(r._iv);
      var items = r.querySelectorAll("span"); if (!items.length) return;
      var i = 0; items.forEach(function (s, k) { s.className = k === 0 ? "on" : ""; });
      if (reduce) return;
      r._iv = setInterval(function () { var cur = items[i]; cur.className = "out"; i = (i + 1) % items.length; items[i].className = "on"; setTimeout(function () { if (cur.className === "out") cur.className = ""; }, 700); }, 2600);
    });
  }
  function buildRotator() {
    var r = D.getElementById("heroRotator"); if (!r) return;
    var words = LANG === "ta" ? ["சேர்ந்து சேமிப்போம்.", "சேர்ந்து வளர்வோம்.", "சேர்ந்து முன்னேறுவோம்."] : ["Save Together.", "Grow Together.", "Prosper Together."];
    r.innerHTML = words.map(function (w) { return "<span>" + w + "</span>"; }).join("");
    initRotator();
  }
  buildRotator(); D.addEventListener("langchange", buildRotator);

  /* ---------- gold dust canvas ---------- */
  D.querySelectorAll("canvas.gold-dust").forEach(function (cv) {
    if (reduce) return;
    var ctx = cv.getContext("2d"), parts = [], W, H, dpr = Math.min(2, window.devicePixelRatio || 1), running = true;
    function size() { var r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener("resize", size);
    var n = Math.min(70, Math.round(W / 18));
    for (var i = 0; i < n; i++) parts.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2.2 + 0.4, vy: -(Math.random() * 0.35 + 0.08), vx: (Math.random() - 0.5) * 0.2, a: Math.random() * 0.6 + 0.2, tw: Math.random() * 6.28 });
    var vis = true;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }).observe(cv);
    function loop() {
      if (vis) {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i]; p.x += p.vx; p.y += p.vy; p.tw += 0.03;
          if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
          var a = p.a * (0.6 + 0.4 * Math.sin(p.tw));
          var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          g.addColorStop(0, "rgba(255,236,170," + a + ")"); g.addColorStop(1, "rgba(230,192,99,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, 6.283); ctx.fill();
        }
      }
      if (running) requestAnimationFrame(loop);
    }
    loop();
  });

  /* ---------- hero orbit satellites ---------- */
  function placeOrbit() {
    D.querySelectorAll("[data-orbit]").forEach(function (stage) {
      var sats = stage.querySelectorAll(".sat"), n = sats.length, rad = stage.offsetWidth * (stage.offsetWidth < 420 ? 0.36 : 0.47);
      sats.forEach(function (s, i) {
        var base = (i / n) * Math.PI * 2 - Math.PI / 2;
        s._base = base; s._rad = rad;
      });
      if (stage._raf) cancelAnimationFrame(stage._raf);
      var t0 = performance.now();
      function tick(now) {
        var a = reduce ? 0 : (now - t0) / 1000 * 0.12;
        sats.forEach(function (s) { var ang = s._base + a; s.style.transform = "translate(" + (Math.cos(ang) * s._rad) + "px," + (Math.sin(ang) * s._rad * 0.92) + "px)"; });
        if (!reduce) stage._raf = requestAnimationFrame(tick);
      }
      stage._raf = requestAnimationFrame(tick);
    });
  }
  placeOrbit(); window.addEventListener("resize", placeOrbit);

  /* ---------- banner orbit art ---------- */
  D.querySelectorAll(".pb-art[data-icons]").forEach(function (art) {
    var icons = art.dataset.icons.split(","), main = art.dataset.main || "shield";
    var orbs = icons.map(function (n, i) { var ang = (i / icons.length) * 360; return '<span class="orb" style="transform:rotate(' + ang + 'deg) translate(' + 0 + 'px)"></span>'; });
    var html = '<span class="ring r1"></span><span class="ring r2"></span><div class="spinner">';
    icons.forEach(function (n, i) {
      var ang = (i / icons.length) * Math.PI * 2;
      var x = 50 + Math.cos(ang) * 50, y = 50 + Math.sin(ang) * 50;
      html += '<span class="orb" style="left:' + x + '%;top:' + y + '%">' + ico(n) + "</span>";
    });
    html += '</div><div class="pb-core">' + ico(main) + "</div>";
    art.innerHTML = html;
  });

  /* ---------- Tabs indicator ---------- */
  function moveTabInd() {
    D.querySelectorAll(".tabs").forEach(function (tabs) {
      var ind = tabs.querySelector(".tab-ind"), sel = tabs.querySelector('[aria-selected="true"]');
      if (ind && sel) { ind.style.width = sel.offsetWidth + "px"; ind.style.transform = "translateX(" + sel.offsetLeft + "px)"; }
    });
  }
  window.addEventListener("resize", moveTabInd);

  /* =========================================================
     PAGE APPS
     ========================================================= */
  var S = window.SCHEMES || [];
  function medal(s) { return '<span class="sc-medal medal-' + s.medal + '">' + ico(s.icon).replace("<svg ", '<svg style="fill:none;stroke:#4a0912;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round" ') + "</span>"; }
  function rangeOf(s) { var a = s.variants.map(function (v) { return v.amount; }); var mn = Math.min.apply(0, a), mx = Math.max.apply(0, a); return mn === mx ? short(mn) : short(mn) + " – " + short(mx); }

  /* ---- Home: scheme family cards ---- */
  function renderHomeSchemes() {
    var box = D.getElementById("home-schemes"); if (!box) return;
    box.innerHTML = S.map(function (s, i) {
      var v = s.variants[0];
      return '<article class="scheme-card" data-tilt data-reveal="' + (i % 2 ? "flip" : "up") + '" style="--d:' + (i % 4 * 0.08) + 's">' +
        '<div class="sc-top">' + medal(s) + '<span class="sc-badge">' + (s.special ? L("Special scheme", "சிறப்பு திட்டம்") : L("Auction chit", "ஏல சீட்டு")) + "</span>" +
        "<h3>" + t(s.name) + "</h3><p>" + t(s.tag) + "</p><span class='sc-shine'></span></div>" +
        '<div class="sc-body"><div class="sc-range"><small>' + L("Chit amount", "சீட்டுத் தொகை") + "</small>" + rangeOf(s) + "</div>" +
        '<div class="sc-meta"><div><b>' + v.months + "</b><span>" + unitWord(s.unit, true) + "</span></div><div><b>" + v.members + "</b><span>" + L("Members", "உறுப்பினர்கள்") + "</span></div></div>" +
        '<a class="btn btn-maroon btn-sm" href="schemes.html#' + s.id + '">' + L("View details", "விவரங்கள் பார்க்க") + ico("arrow") + "</a></div></article>";
    }).join("");
    observeReveals(box); bindTilt(box); setTimeout(revealInView, 50);
  }

  /* ---- Schemes page ---- */
  var curFamily = null, curVariant = {};
  function renderSchemesApp() {
    var app = D.getElementById("schemes-app"); if (!app) return;
    var hash = (location.hash || "").replace("#", "");
    if (!curFamily) curFamily = S.some(function (s) { return s.id === hash; }) ? hash : S[0].id;
    var tabs = '<div class="tab-wrap"><div class="tabs" role="tablist" aria-label="' + L("Chit schemes", "சீட்டு திட்டங்கள்") + '"><span class="tab-ind"></span>' +
      S.map(function (s) { return '<button class="tab" role="tab" id="tab-' + s.id + '" aria-controls="panel" aria-selected="' + (s.id === curFamily) + '" data-family="' + s.id + '">' + t(s.name) + "</button>"; }).join("") + "</div></div>";
    app.innerHTML = tabs + '<div id="panel" role="tabpanel"></div>';
    renderPanel();
    app.querySelectorAll(".tab").forEach(function (b) {
      b.addEventListener("click", function () {
        curFamily = b.dataset.family;
        app.querySelectorAll(".tab").forEach(function (x) { x.setAttribute("aria-selected", String(x === b)); });
        moveTabInd(); b.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" });
        try { history.replaceState(null, "", "#" + curFamily); } catch (e) {}
        renderPanel();
        var top = app.getBoundingClientRect().top + scrollY - 120;
        if (scrollY > top) window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
      });
    });
    setTimeout(moveTabInd, 60);
  }
  function enquiryMsg(s, v) { return "Hello Nachiyar Chit Fund, I am interested in " + s.name.en + " (" + inr(v.amount) + ", " + v.months + " " + s.unit + "s). Please share details."; }
  function renderPanel() {
    var panel = D.getElementById("panel"); if (!panel) return;
    var s = S.filter(function (x) { return x.id === curFamily; })[0];
    var withRows = s.variants.filter(function (v) { return v.rows; });
    if (!curVariant[s.id] && withRows.length) curVariant[s.id] = withRows[0].code;
    var u = s.unit, v0 = s.variants[0];
    var h = '<div class="panel">';
    h += '<div class="family-head">' + medal(s) + "<div><h2>" + t(s.name) + "</h2><p>" + t(s.tag) + "</p></div>" +
      '<div class="family-chips"><span class="chip">' + ico("calendar") .replace("<svg ", '<svg style="width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2" ') + " " + (s.id === "honey" ? "25 / 50 " + unitWord(u, true) : v0.months + " " + unitWord(u, true)) + '</span><span class="chip">' + (s.id === "honey" ? "25 / 50" : v0.members) + " " + L("Members", "உறுப்பினர்கள்") + '</span><span class="chip">' + auctionWord(s.auction) + "</span></div></div>";
    h += '<p class="lead" style="margin:0 0 26px;max-width:820px">' + t(s.desc) + "</p>";
    // variant cards
    h += '<div class="plans" data-stagger="up">';
    s.variants.forEach(function (v) {
      h += '<article class="plan' + (v.featured ? " featured" : "") + '">' + (v.featured ? '<span class="ribbon">' + L("Popular", "பிரபலம்") + "</span>" : "") +
        '<span class="plan-label">' + v.code + "</span>" +
        '<div class="plan-amount">' + inr(v.amount) + "<small>" + L("Chit amount", "சீட்டுத் தொகை") + "</small></div>" +
        '<div class="kv">' +
        "<div><span>" + ico("rupee") + instWord(u) + "</span><b>" + inr(v.inst) + "</b></div>" +
        "<div><span>" + ico("calendar") + L("Duration", "காலம்") + "</span><b>" + v.months + " " + unitWord(u, true) + "</b></div>" +
        "<div><span>" + ico("users") + L("Members", "உறுப்பினர்கள்") + "</span><b>" + v.members + "</b></div>" +
        "<div><span>" + ico("gavel") + L("Auction", "ஏலம்") + "</span><b>" + (s.auction === "monthly" ? L("Monthly", "மாதந்தோறும்") : s.auction === "weekly" ? L("Weekly", "வாரந்தோறும்") : L("Daily", "தினமும்")) + "</b></div>" +
        "<div><span>" + ico("percent") + L("Commission", "கமிஷன்") + "</span><b>5%</b></div>" +
        "</div>";
      if (v.pay) {
        h += '<div class="pg-mini"><div class="p"><small>' + L("You pay", "நீங்கள் செலுத்துவது") + "</small><b>" + inr(v.pay) + '</b></div><div class="g"><small>' + L("You get", "நீங்கள் பெறுவது") + "</small><b>" + inr(v.get) + "</b></div></div>" +
          '<div class="plan-gain">' + ico("growth").replace("<svg ", '<svg style="width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2" ') + L("Benefit: ", "பலன்: ") + inr(v.get - v.pay) + "</div>";
      } else {
        h += '<div class="pg-mini"><div class="p"><small>' + L("Max. payable", "அதிகபட்ச தொகை") + "</small><b>" + short(v.inst * v.months) + '</b></div><div class="g"><small>' + L("Actual payable", "உண்மை செலுத்துதல்") + "</small><b>" + L("Lower*", "குறைவு*") + "</b></div></div>";
      }
      h += '<div class="plan-actions">' + (v.rows ? '<button class="btn btn-outline-dark btn-sm" data-showrows="' + v.code + '">' + L("Schedule", "அட்டவணை") + "</button>" : "") +
        '<a class="btn btn-gold btn-sm" href="' + waLink(enquiryMsg(s, v)) + '" target="_blank" rel="noopener">' + L("Enquire", "விசாரிக்க") + "</a></div></article>";
    });
    h += "</div>";
    if (s.variants.some(function (v) { return !v.pay; })) {
      h += '<p class="table-note" style="border:0;padding:14px 4px 0">' + ico("info") + "<span>" + L("*Max. payable is the full instalment × duration. Your real payment is lower, because each auction's dividend is reduced from your next instalment. Ask our office for the current group's month-wise chart.", "*அதிகபட்ச தொகை = முழுத் தவணை × காலம். ஒவ்வொரு ஏலத்தின் ஈவுத்தொகை அடுத்த தவணையில் குறைக்கப்படுவதால், நீங்கள் செலுத்துவது இதைவிட குறைவாக இருக்கும். தற்போதைய குழுவின் மாதவாரி அட்டவணையை எங்கள் அலுவலகத்தில் பெறலாம்.") + "</span></p>";
    }
    // schedule table
    if (withRows.length) {
      h += '<div class="table-card" id="schedule" style="margin-top:34px" data-reveal="up"><div class="table-head"><h3>' + L("Month-wise schedule", "மாதவாரி அட்டவணை") + '</h3><div class="variant-pills" role="group">' +
        withRows.map(function (v) { return '<button type="button" data-variant="' + v.code + '" aria-pressed="' + (curVariant[s.id] === v.code) + '">' + short(v.amount) + (s.id === "silver" ? " · " + v.months + L("m", " மா") : "") + "</button>"; }).join("") +
        '</div></div><div class="table-scroll" id="schedTable"></div><div class="table-note">' + ico("info") + "<span>" +
        (s.partialSchedule ? L("Showing the first 10 months of the 20-month schedule as printed in our scheme chart. Totals are for the full 20 months. Figures are indicative and depend on each month's auction.", "எங்கள் திட்ட அட்டவணையில் உள்ளபடி 20 மாதத்தில் முதல் 10 மாதங்கள் காட்டப்பட்டுள்ளன. மொத்தம் முழு 20 மாதங்களுக்கானது. தொகைகள் ஒவ்வொரு மாத ஏலத்தைப் பொறுத்து மாறலாம்.") : L("Figures are from our scheme chart and are indicative. The actual amounts depend on each month's auction.", "இந்தத் தொகைகள் எங்கள் திட்ட அட்டவணையிலிருந்து எடுக்கப்பட்டவை. உண்மையான தொகை ஒவ்வொரு மாத ஏலத்தைப் பொறுத்து மாறலாம்.")) +
        "</span></div></div>";
    }
    // rules
    var rules = [["gavel", L("Oral auction", "வாய்மொழி ஏலம்"), L("Open, spoken bidding", "திறந்த நேரடி ஏலம்")], ["live", L("Live bidding", "நேரடி ஏலம்"), L("Join in person or live", "நேரில் அல்லது நேரலையில்")], ["percent", L("5% commission", "5% கமிஷன்"), L("Formal & fixed", "முறையானது, நிலையானது")], ["target", L("No fixed allotment", "நிர்ணய ஒதுக்கீடு இல்லை"), L("Equal chance for all", "அனைவருக்கும் சம வாய்ப்பு")], ["eye", L("Transparent", "வெளிப்படை"), L("Every rupee explained", "ஒவ்வொரு ரூபாய்க்கும் கணக்கு")]];
    if (s.bidCap) rules.splice(2, 0, ["chart", L("Bid up to 30%", "30% வரை ஏலம்"), L("Of the chit amount", "சீட்டுத் தொகையில்")]);
    h += '<div class="rules" data-stagger="zoom">' + rules.map(function (r) { return '<div class="rule"><span class="r-ico">' + ico(r[0]) + "</span><div><b>" + r[1] + "</b><small>" + r[2] + "</small></div></div>"; }).join("") + "</div>";
    // schedule for special
    if (s.id === "honey" || s.id === "super-jet") {
      var a = s.id === "honey" ? [L("THURSDAY", "வியாழன்"), L("Live auction", "நேரடி ஏலம்"), L("Oral auction every Thursday.", "ஒவ்வொரு வியாழனும் வாய்மொழி நேரடி ஏலம்."), L("SATURDAY", "சனிக்கிழமை"), L("Payment", "கட்டணம்"), L("Pay your weekly amount on Saturday morning.", "சனிக்கிழமை காலை வாரத் தொகையை செலுத்துங்கள்.")]
        : [L("DAY 1 · EVENING", "நாள் 1 · மாலை"), L("Daily auction", "தினசரி ஏலம்"), L("Chit is auctioned every evening.", "தினமும் மாலை சீட்டு ஏலம் விடப்படும்."), L("DAY 2 · MORNING", "நாள் 2 · காலை"), L("Payment process", "பணம் பெறுதல்"), L("Winner receives payment the next morning.", "மறுநாள் காலை பணம் பெற்றுக்கொள்ளலாம்.")];
      h += '<div class="schedule"><div class="sched-card" data-reveal="left"><span class="day">' + a[0] + "</span><b>" + a[1] + "</b><p>" + a[2] + '</p></div><span class="sched-arrow">' + ico("arrow").replace('stroke="currentColor"', "") + '</span><div class="sched-card" data-reveal="right"><span class="day">' + a[3] + "</span><b>" + a[4] + "</b><p>" + a[5] + "</p></div></div>";
    }
    // benefits & eligibility
    var ben = s.special ? [L("Short-term plan with quick returns", "விரைவான பலன் தரும் குறுகிய கால திட்டம்"), L("Small, easy payments", "சிறிய, எளிய தவணைகள்"), L("Builds a disciplined savings habit", "ஒழுங்கான சேமிப்பு பழக்கம்"), L("Member-friendly and transparent", "உறுப்பினர் நலன், வெளிப்படை")]
      : [L("Get a lump sum when you need it, through the auction", "தேவைப்படும் நேரத்தில் ஏலம் மூலம் மொத்தத் தொகை"), L("Dividend every month reduces your payment", "ஒவ்வொரு மாதமும் ஈவுத்தொகை — தவணை குறையும்"), L("Use the 15-day interest-free facility", "15 நாள் வட்டியில்லா வசதி பயன்படுத்தலாம்"), L("Professional management, secure transactions", "திறமையான நிர்வாகம், பாதுகாப்பான பரிவர்த்தனை")];
    var eli = [L("Age 18 years and above", "18 வயது நிரம்பியவர்கள்"), L("Aadhaar card and PAN card", "ஆதார் அட்டை மற்றும் பான் அட்டை"), L("Address proof and passport-size photos", "முகவரி சான்று, பாஸ்போர்ட் அளவு புகைப்படங்கள்"), L("Regular income source; surety when taking the prize amount", "நிலையான வருமானம்; சீட்டு எடுக்கும்போது ஜாமீன்")];
    h += '<div class="info-cols"><div class="info-box" data-reveal="left"><h4>' + ico("star") + L("Key benefits", "முக்கிய பலன்கள்") + '</h4><ul class="check-list">' + ben.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div><div class="info-box" data-reveal="right"><h4>' + ico("doc") + L("Eligibility & documents", "தகுதி மற்றும் ஆவணங்கள்") + '</h4><ul class="check-list">' + eli.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div></div>";
    h += "</div>";
    panel.innerHTML = h;
    renderTable(s);
    panel.querySelectorAll("[data-variant]").forEach(function (b) { b.addEventListener("click", function () { curVariant[s.id] = b.dataset.variant; panel.querySelectorAll("[data-variant]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); }); renderTable(s); }); });
    panel.querySelectorAll("[data-showrows]").forEach(function (b) { b.addEventListener("click", function () { curVariant[s.id] = b.dataset.showrows; panel.querySelectorAll("[data-variant]").forEach(function (x) { x.setAttribute("aria-pressed", String(x.dataset.variant === b.dataset.showrows)); }); renderTable(s); var sc = D.getElementById("schedule"); if (sc) sc.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }); });
    window.NCF_reveal(panel);
  }
  function renderTable(s) {
    var box = D.getElementById("schedTable"); if (!box) return;
    var v = s.variants.filter(function (x) { return x.code === curVariant[s.id]; })[0]; if (!v || !v.rows) return;
    var cum = s.hasCumulative;
    var th = "<thead><tr><th>" + L("Month", "மாதம்") + "</th><th>" + L("You pay", "செலுத்தும் தொகை") + "<small>(₹)</small></th><th>" + L("Dividend", "பங்கீடு") + "<small>(₹)</small></th><th>" + L("Amount received", "பெறும் தொகை") + "<small>" + L("if you take the chit (₹)", "அந்த மாதம் எடுத்தால் (₹)") + "</small></th>" + (cum ? "<th>" + L("Total paid so far", "இதுவரை செலுத்தியது") + "<small>(₹)</small></th>" : "") + "</tr></thead>";
    var last = v.rows.length - 1;
    var tb = '<tbody class="row-anim">' + v.rows.map(function (r, i) {
      return '<tr style="animation-delay:' + (i * 0.035).toFixed(3) + 's"><td>' + r[0] + "</td><td>" + nfmt(r[1]) + "</td><td>" + nfmt(r[2]) + '</td><td class="' + (i === last && !s.partialSchedule ? "hl" : "") + '">' + nfmt(r[3]) + "</td>" + (cum ? '<td class="' + (i === last ? "hl-r" : "") + '">' + nfmt(r[4]) + "</td>" : "") + "</tr>";
    }).join("") + "</tbody>";
    var tf = "<tfoot><tr><td>" + L("Total", "மொத்தம்") + "</td><td>" + nfmt(v.total[0]) + "</td><td>" + nfmt(v.total[1]) + '</td><td class="hl">' + nfmt(v.total[2]) + "</td>" + (cum ? "<td></td>" : "") + "</tr></tfoot>";
    box.innerHTML = '<table class="data">' + th + tb + tf + "</table>";
  }

  /* ---- Compare table ---- */
  function renderCompare() {
    var box = D.getElementById("compare-table"); if (!box) return;
    var rows = "";
    S.forEach(function (s) {
      s.variants.forEach(function (v, i) {
        rows += "<tr>" + (i === 0 ? '<td class="name" rowspan="' + s.variants.length + '">' + t(s.name) + "</td>" : "") + "<td><b>" + inr(v.amount) + "</b></td><td>" + inr(v.inst) + " / " + unitWord(s.unit, false) + "</td><td>" + v.months + " " + unitWord(s.unit, true) + "</td><td>" + v.members + "</td><td>" + (v.pay ? inr(v.pay) : "—") + "</td><td>" + (v.get ? '<span class="yes">' + inr(v.get) + "</span>" : "—") + "</td></tr>";
      });
    });
    box.innerHTML = '<table class="data"><thead><tr><th class="l">' + L("Scheme", "திட்டம்") + "</th><th>" + L("Chit amount", "சீட்டுத் தொகை") + "</th><th>" + L("Instalment", "தவணை") + "</th><th>" + L("Duration", "காலம்") + "</th><th>" + L("Members", "உறுப்பினர்") + "</th><th>" + L("You pay*", "செலுத்துவது*") + "</th><th>" + L("You get*", "பெறுவது*") + "</th></tr></thead><tbody>" + rows + "</tbody></table>";
  }

  /* ---- FAQs ---- */
  function renderFaqs() {
    D.querySelectorAll("[data-faqs]").forEach(function (box) {
      var limit = parseInt(box.dataset.limit || "0", 10);
      var cat = box.dataset.cat || "all";
      var q = (box.dataset.q || "").toLowerCase();
      var list = window.FAQS.filter(function (f) { return (cat === "all" || f.cat === cat) && (!q || (t(f.q) + " " + t(f.a) + " " + f.q.en + " " + f.a.en).toLowerCase().indexOf(q) > -1); });
      if (limit) list = list.slice(0, limit);
      box.innerHTML = list.length ? list.map(function (f, i) {
        return '<div class="faq" data-reveal="up" style="--d:' + (i * 0.05).toFixed(2) + 's"><button class="faq-q" aria-expanded="false" id="fq' + i + '"><span>' + t(f.q) + '</span><span class="pm" aria-hidden="true"></span></button><div class="faq-a" role="region" aria-labelledby="fq' + i + '"><div><p>' + t(f.a) + "</p></div></div></div>";
      }).join("") : '<p style="text-align:center;color:var(--muted)">' + L("No matching questions. Try another word, or call us on ", "பொருந்தும் கேள்வி இல்லை. வேறு சொல்லில் தேடுங்கள், அல்லது அழையுங்கள்: ") + C.phone + "</p>";
      box.querySelectorAll(".faq-q").forEach(function (b) {
        b.addEventListener("click", function () {
          var f = b.parentNode, open = !f.classList.contains("open");
          box.querySelectorAll(".faq.open").forEach(function (x) { if (x !== f) { x.classList.remove("open"); x.querySelector(".faq-q").setAttribute("aria-expanded", "false"); } });
          f.classList.toggle("open", open); b.setAttribute("aria-expanded", String(open));
        });
      });
      var first = box.querySelector(".faq"); if (first && !q) { first.classList.add("open"); first.querySelector(".faq-q").setAttribute("aria-expanded", "true"); }
      observeReveals(box); setTimeout(revealInView, 40);
    });
  }
  var fs = D.getElementById("faqSearch");
  if (fs) fs.addEventListener("input", function () { var b = D.querySelector("[data-faqs]"); b.dataset.q = fs.value.trim(); renderFaqs(); });
  D.querySelectorAll("[data-faqcat]").forEach(function (b) {
    b.addEventListener("click", function () {
      D.querySelectorAll("[data-faqcat]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      var box = D.querySelector("[data-faqs]"); box.dataset.cat = b.dataset.faqcat; renderFaqs();
    });
  });

  /* ---- Calculator ---- */
  function tween(el, to) {
    var from = parseFloat(el.dataset.v || "0"); el.dataset.v = to;
    if (reduce) { el.textContent = inr(Math.round(to)); return; }
    var st = null; function step(ts) { if (!st) st = ts; var p = Math.min(1, (ts - st) / 600), e = 1 - Math.pow(1 - p, 3); el.textContent = inr(Math.round(from + (to - from) * e)); if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  function setFill(r) { var p = (r.value - r.min) / (r.max - r.min) * 100; r.style.setProperty("--fill", p + "%"); }
  function initCalc() {
    var fam = D.getElementById("cFamily"), vr = D.getElementById("cVariant"); if (!fam) return;
    function fillFam() {
      var cur = fam.value;
      fam.innerHTML = S.map(function (s) { return '<option value="' + s.id + '">' + t(s.name) + "</option>"; }).join("");
      fam.value = cur || "gold-a1";
      fillVar();
    }
    function fillVar() {
      var s = S.filter(function (x) { return x.id === fam.value; })[0], cur = vr.value;
      vr.innerHTML = s.variants.map(function (v) { return '<option value="' + v.code + '">' + inr(v.amount) + " · " + v.months + " " + unitWord(s.unit, true) + "</option>"; }).join("");
      if (s.variants.some(function (v) { return v.code === cur; })) vr.value = cur;
      showPlan();
    }
    function showPlan() {
      var s = S.filter(function (x) { return x.id === fam.value; })[0], v = s.variants.filter(function (x) { return x.code === vr.value; })[0] || s.variants[0];
      D.getElementById("pInst").textContent = inr(v.inst); D.getElementById("pInstL").textContent = instWord(s.unit);
      D.getElementById("pDur").textContent = v.months + " " + unitWord(s.unit, true);
      D.getElementById("pMem").textContent = v.members;
      tween(D.getElementById("pMax"), v.inst * v.months);
      var pg = D.getElementById("pPayGet");
      if (v.pay) {
        pg.innerHTML = '<div class="bar-row"><div class="bar-label"><span>' + L("You pay (total)", "நீங்கள் செலுத்துவது (மொத்தம்)") + "</span><span>" + inr(v.pay) + '</span></div><div class="bar"><i class="pay" style="width:0"></i></div></div><div class="bar-row"><div class="bar-label"><span>' + L("You get", "நீங்கள் பெறுவது") + "</span><span>" + inr(v.get) + '</span></div><div class="bar"><i class="get" style="width:0"></i></div></div><div class="gain-box"><svg viewBox="0 0 24 24" fill="none" stroke="#1f7a3f" stroke-width="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg><div><small style="font-weight:800;color:var(--muted)">' + L("Your benefit as a non-prized member", "சீட்டு எடுக்காதவருக்கான பலன்") + "</small><b>" + inr(v.get - v.pay) + "</b></div></div>";
        var mx = v.get; setTimeout(function () { var b = pg.querySelectorAll(".bar i"); b[0].style.width = (v.pay / mx * 100) + "%"; b[1].style.width = "100%"; }, 60);
      } else {
        pg.innerHTML = '<p class="table-note" style="border:0;padding:12px 0 0">' + ico("info") + "<span>" + L("Your actual payment will be lower than the maximum, because dividends from each auction reduce your instalment. Ask us for the current group's chart.", "ஒவ்வொரு ஏலத்தின் ஈவுத்தொகையால் உங்கள் தவணை குறையும். எனவே நீங்கள் செலுத்துவது அதிகபட்சத்தைவிட குறைவாக இருக்கும். தற்போதைய குழு அட்டவணையை எங்களிடம் கேளுங்கள்.") + "</span></p>";
      }
      var link = D.getElementById("pEnq"); if (link) link.href = waLink(enquiryMsg(s, v));
    }
    fam.addEventListener("change", fillVar); vr.addEventListener("change", showPlan);
    fillFam();
    D.addEventListener("langchange", fillFam);
    // auction calc
    var amt = D.getElementById("aAmt"), mem = D.getElementById("aMem"), bid = D.getElementById("aBid");
    function calc() {
      [amt, mem, bid].forEach(setFill);
      var A = +amt.value, M = +mem.value, B = +bid.value;
      D.getElementById("oAmt").textContent = inr(A); D.getElementById("oMem").textContent = M; D.getElementById("oBid").textContent = B + "%";
      var disc = A * B / 100, comm = A * 0.05, pool = Math.max(0, disc - comm), div = pool / M, inst = A / M;
      tween(D.getElementById("rPrize"), A - disc); tween(D.getElementById("rDisc"), disc); tween(D.getElementById("rComm"), comm);
      tween(D.getElementById("rDiv"), div); tween(D.getElementById("rInst"), inst); tween(D.getElementById("rNext"), Math.max(0, inst - div));
      var bar = D.getElementById("splitBar").children;
      bar[0].style.width = ((A - disc) / A * 100) + "%"; bar[1].style.width = (Math.min(disc, comm) / A * 100) + "%"; bar[2].style.width = (pool / A * 100) + "%";
    }
    [amt, mem, bid].forEach(function (r) { r.addEventListener("input", calc); });
    calc();
  }

  /* ---- Gallery ---- */
  var GAL = [
    ["all-schemes", "overview", { en: "All chit schemes at a glance", ta: "அனைத்து சீட்டு திட்டங்களும் ஒரே பார்வையில்" }],
    ["premium-schemes", "schemes", { en: "Diamond, Platinum & Gold schemes", ta: "டைமண்ட், பிளாட்டினம், கோல்டு திட்டங்கள்" }],
    ["silver-scheme", "schemes", { en: "Silver Scheme 1, 2 & 3", ta: "சில்வர் திட்டம் 1, 2, 3" }],
    ["gold-scheme-a1", "schemes", { en: "Gold Scheme – A1", ta: "கோல்டு திட்டம் – A1" }],
    ["gold-scheme-a2", "schemes", { en: "Gold Scheme – A2", ta: "கோல்டு திட்டம் – A2" }],
    ["honey-weekly", "special", { en: "Honey Weekly Chit", ta: "ஹனி வீக்லி சீட்டு" }],
    ["super-jet", "special", { en: "Super Jet Chit – 100 days", ta: "சூப்பர் ஜெட் சீட்டு – 100 நாள்" }],
    ["interest-free-loan", "special", { en: "15 Days Interest-Free Loan", ta: "15 நாள் வட்டியில்லா கடன்" }]
  ];
  var catName = { overview: { en: "Overview", ta: "கண்ணோட்டம்" }, schemes: { en: "Chit schemes", ta: "சீட்டு திட்டங்கள்" }, special: { en: "Special schemes", ta: "சிறப்பு திட்டங்கள்" } };
  function renderGallery() {
    var g = D.getElementById("gallery"); if (!g) return;
    var f = g.dataset.filter || "all";
    g.innerHTML = GAL.map(function (x, i) {
      return '<figure class="g-item' + (f !== "all" && x[1] !== f ? " hide" : "") + '" data-reveal="up" style="--d:' + (i % 2 * 0.1) + 's" tabindex="0" role="button" aria-label="' + t(x[2]) + '" data-idx="' + i + '"><div class="g-frame"><img src="assets/img/gallery/' + x[0] + '.jpg" alt="' + t(x[2]) + '" loading="lazy" width="1024" height="1206"><span class="g-zoom" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/></svg></span></div><figcaption class="g-cap"><small>' + t(catName[x[1]]) + "</small>" + t(x[2]) + "</figcaption></figure>";
    }).join("");
    observeReveals(g); setTimeout(revealInView, 40);
  }
  function initGallery() {
    var g = D.getElementById("gallery"); if (!g) return;
    renderGallery();
    D.querySelectorAll("[data-gfilter]").forEach(function (b) {
      b.addEventListener("click", function () {
        D.querySelectorAll("[data-gfilter]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        g.dataset.filter = b.dataset.gfilter;
        g.querySelectorAll(".g-item").forEach(function (it) {
          var show = b.dataset.gfilter === "all" || GAL[+it.dataset.idx][1] === b.dataset.gfilter;
          if (show) { it.classList.remove("hide"); it.classList.remove("in"); void it.offsetWidth; it.classList.add("in"); } else it.classList.add("hide");
        });
      });
    });
    var lb = D.createElement("div"); lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
    lb.innerHTML = '<button class="lb-btn lb-close" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><button class="lb-btn lb-prev" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-btn lb-next" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>';
    D.body.appendChild(lb);
    var idx = 0, img = lb.querySelector("img"), cap = lb.querySelector("figcaption");
    function visible() { return Array.prototype.map.call(g.querySelectorAll(".g-item:not(.hide)"), function (e) { return +e.dataset.idx; }); }
    function show(i) { idx = i; var x = GAL[i]; img.src = "assets/img/gallery/" + x[0] + ".jpg"; img.alt = t(x[2]); cap.textContent = t(x[2]); }
    function open(i) { show(i); lb.classList.add("open"); D.body.style.overflow = "hidden"; lb.querySelector(".lb-close").focus(); }
    function close() { lb.classList.remove("open"); D.body.style.overflow = ""; }
    function nav(d) { var v = visible(), p = v.indexOf(idx); show(v[(p + d + v.length) % v.length]); }
    g.addEventListener("click", function (e) { var it = e.target.closest(".g-item"); if (it) open(+it.dataset.idx); });
    g.addEventListener("keydown", function (e) { var it = e.target.closest(".g-item"); if (it && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(+it.dataset.idx); } });
    lb.querySelector(".lb-close").onclick = close; lb.querySelector(".lb-prev").onclick = function () { nav(-1); }; lb.querySelector(".lb-next").onclick = function () { nav(1); };
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    D.addEventListener("keydown", function (e) { if (!lb.classList.contains("open")) return; if (e.key === "Escape") close(); if (e.key === "ArrowRight") nav(1); if (e.key === "ArrowLeft") nav(-1); });
    D.addEventListener("langchange", renderGallery);
  }

  /* ---- Forms (compose WhatsApp / email) ---- */
  function initForms() {
    D.querySelectorAll("form[data-compose]").forEach(function (form) {
      var sel = form.querySelector("select[data-schemes]");
      function fillSel() { if (!sel) return; var cur = sel.value; sel.innerHTML = '<option value="">' + L("Select a scheme", "திட்டத்தைத் தேர்ந்தெடுக்கவும்") + "</option>" + S.map(function (s) { return '<option value="' + s.name.en + '">' + t(s.name) + "</option>"; }).join("") + '<option value="Not sure">' + L("Not sure, please suggest", "தெரியவில்லை, பரிந்துரைக்கவும்") + "</option>"; sel.value = cur; }
      fillSel(); D.addEventListener("langchange", fillSel);
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true, data = [];
        form.querySelectorAll(".field").forEach(function (f) {
          var inp = f.querySelector("input,select,textarea"); if (!inp) return;
          var v = inp.value.trim(), bad = false;
          if (inp.required && !v) bad = true;
          if (inp.type === "tel" && v && !/^[6-9]\d{9}$/.test(v.replace(/\D/g, "").slice(-10))) bad = true;
          if (inp.type === "email" && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) bad = true;
          f.classList.toggle("invalid", bad); if (bad) ok = false;
          if (v) data.push(inp.dataset.label + ": " + v);
        });
        if (!ok) { var fi = form.querySelector(".invalid input,.invalid select,.invalid textarea"); if (fi) fi.focus(); return; }
        var subject = form.dataset.compose === "career" ? "Job application – Nachiyar Chit Fund" : "Chit enquiry – Nachiyar Chit Fund";
        var body = (form.dataset.compose === "career" ? "Hello Nachiyar Chit Fund, I would like to apply for a job.\n" : "Hello Nachiyar Chit Fund, I would like to enquire about a chit scheme.\n") + data.join("\n");
        var box = form.querySelector(".form-success");
        box.innerHTML = "<p>" + L("Your message is ready. Choose how to send it to us:", "உங்கள் செய்தி தயார். எங்களுக்கு அனுப்ப ஒரு வழியைத் தேர்ந்தெடுங்கள்:") + '</p><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + waLink(body) + '">' + ico("wa").replace("<svg ", '<svg style="fill:#fff" ') + " " + L("Send on WhatsApp", "வாட்ஸ்அப்பில் அனுப்ப") + '</a><a class="btn btn-maroon btn-sm" href="mailto:' + C.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body) + '">' + L("Send by email", "மின்னஞ்சலில் அனுப்ப") + "</a></div>" + (form.dataset.compose === "career" ? '<p style="margin-top:10px;font-weight:600">' + L("Please attach your resume in the email or WhatsApp chat.", "மின்னஞ்சல் அல்லது வாட்ஸ்அப்பில் உங்கள் சுயவிவரத்தை (Resume) இணைக்கவும்.") + "</p>" : "");
        box.classList.add("show");
      });
      form.querySelectorAll("input,select,textarea").forEach(function (i) { i.addEventListener("input", function () { i.closest(".field").classList.remove("invalid"); }); });
    });
  }

  /* ---- Careers: apply buttons preselect role ---- */
  D.addEventListener("click", function (e) {
    var b = e.target.closest("[data-apply]"); if (!b) return;
    var s = D.getElementById("jRole"); if (s) { s.value = b.dataset.apply; }
    var f = D.getElementById("apply"); if (f) f.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  });

  /* ---------- boot ---------- */
  function renderAll() { renderHomeSchemes(); if (D.getElementById("schemes-app")) { var y = scrollY; renderSchemesApp(); window.scrollTo(0, y); } renderCompare(); renderFaqs(); }
  renderAll(); initCalc(); initGallery(); initForms();
  D.addEventListener("langchange", renderAll);
  if (LANG !== "en") applyLang(LANG);
  observeReveals();
  setTimeout(revealInView, 60);
  window.addEventListener("hashchange", function () { var h = location.hash.replace("#", ""); var b = D.querySelector('.tab[data-family="' + h + '"]'); if (b) b.click(); });
})();
