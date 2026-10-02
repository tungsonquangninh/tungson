(function () {
  const C = Object.assign({}, window.CAU_HINH || {});
  const L = window.I18N || {};
  Object.assign(C, L.cfg || {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const page = document.body.dataset.page;
  const ROOT = document.body.dataset.root || "";
  const img = (p) => (p && !/^(https?:|\/|data:)/.test(p) ? ROOT + p : p);
  const U = Object.assign({
    locale: "vi-VN", news: "Tin tức", gocNhin: "Góc nhìn Tùng Sơn:", source: "Nguồn:", viewSource: "Xem bài gốc", viOnly: "",
    readMore: "Đọc bài →", month: (m) => "Th" + m, code: "Mã", brand: "Thương hiệu", line: "Dòng sản phẩm", scope: "Phạm vi sử dụng",
    spec: "Quy cách", howto: "Hướng dẫn thi công", price: "Giá", priceVal: "Liên hệ để có giá tốt", callQuote: "Gọi báo giá", zalo: "Nhắn Zalo",
    allProducts: "Tất cả sản phẩm", type: "Loại", all: "Tất cả", area: "Khu vực", noi: "Nội thất", ngoai: "Ngoại thất",
    count: (n) => n + " sản phẩm", empty: "Chưa có sản phẩm phù hợp. Hãy chọn bộ lọc khác.", brandCount: (n) => n + " sản phẩm · Xem tất cả →",
    updated: "Cập nhật ", lastUpdated: "Cập nhật lần cuối: ", allArticles: "← Tất cả bài viết", ctaH: "Cần tư vấn cho công trình của bạn?",
    ctaP: "Khảo sát và báo giá miễn phí tại Quảng Ninh.", callNow: "Gọi ngay", otherArticles: "Bài viết khác",
    badPhone: "Vui lòng nhập số điện thoại hợp lệ.", notConnected: (tel, ph) => `Biểu mẫu chưa được kết nối. Vui lòng gọi <a href="${tel}">${ph}</a> hoặc nhắn Zalo để được tư vấn ngay.`,
    thanks: "Cảm ơn anh/chị! Tùng Sơn đã nhận thông tin và sẽ gọi lại trong thời gian sớm nhất.", sendFail: (tel, ph) => `Chưa gửi được. Anh/chị vui lòng gọi <a href="${tel}">${ph}</a>.`,
    cm: { "gia-vlxd": "Giá vật liệu", "thi-truong-son": "Thị trường sơn", "phap-ly": "Pháp lý xây nhà", "xu-huong": "Xu hướng màu", "quang-ninh": "Tin Quảng Ninh" },
    khu: { noi: "Nội thất", ngoai: "Ngoại thất", ca2: "Nội & ngoại thất" }
  }, L.ui || {});
  const CM = U.cm, KHU = U.khu;

  /* ---------- Liên hệ ---------- */
  const telHref = C.dienThoaiGoi ? "tel:" + C.dienThoaiGoi : "lien-he.html";
  const zaloHref = C.zalo ? "https://zalo.me/" + C.zalo : "lien-he.html";
  $$("[data-cfg]").forEach((el) => (el.textContent = C[el.dataset.cfg] || ""));
  $$("[data-tel]").forEach((el) => (el.href = telHref));
  $$("[data-zalo]").forEach((el) => { el.href = zaloHref; if (C.zalo) el.target = "_blank"; });
  $$("[data-fb]").forEach((el) => { if (C.facebook) { el.href = C.facebook; el.target = "_blank"; } else el.remove(); });
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Menu & ngôn ngữ ---------- */
  const mb = $(".menu-btn"), nav = $(".nav");
  if (mb) mb.addEventListener("click", () => { nav.classList.toggle("open"); document.body.style.overflow = nav.classList.contains("open") ? "hidden" : ""; });
  $$(".nav a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); document.body.style.overflow = ""; }));
  $$(".langsw a").forEach((a) => a.addEventListener("click", () => { if (location.hash) a.href = a.href.split("#")[0] + location.hash; }));

  const d = (s) => { const [y, m, dd] = String(s).slice(0, 10).split("-"); return { y, m, d: dd, full: U.locale === "vi-VN" ? `${dd}/${m}/${y}` : new Date(+y, m - 1, +dd).toLocaleDateString(U.locale) }; };
  $$("[data-today]").forEach((el) => (el.textContent = new Date().toLocaleDateString(U.locale, { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })));

  /* ---------- Supabase ---------- */
  const sbOn = !!(C.supabaseUrl && C.supabaseAnonKey);
  const sbHeaders = () => (String(C.supabaseAnonKey).startsWith("sb_") ? { apikey: C.supabaseAnonKey, "Content-Type": "application/json" } : { apikey: C.supabaseAnonKey, Authorization: "Bearer " + C.supabaseAnonKey, "Content-Type": "application/json" });
  const trNews = (n) => { const t = (L.tin || {})[n.link]; return t ? Object.assign({}, n, t, { _tr: true }) : n; };
  async function loadNews() {
    let list = (window.TIN_TUC || []).slice();
    if (sbOn) {
      try {
        const r = await fetch(C.supabaseUrl + "/rest/v1/tin_tuc?select=*&order=ngay.desc&limit=60", { headers: sbHeaders() });
        if (r.ok) {
          const rows = await r.json();
          const mapped = rows.map((x) => ({ ngay: x.ngay, chuyenMuc: x.chuyen_muc, tieuDe: x.tieu_de, tomTat: x.tom_tat, gocNhin: x.goc_nhin, nguon: x.nguon, link: x.link }));
          const seen = new Set(mapped.map((x) => x.tieuDe));
          list = mapped.concat(list.filter((x) => !seen.has(x.tieuDe)));
        }
      } catch (e) {}
    }
    return list.sort((a, b) => String(b.ngay).localeCompare(String(a.ngay))).map(trNews);
  }
  const viTag = (n) => (U.viOnly && !n._tr ? ` <span class="tag sage">${U.viOnly}</span>` : "");
  const newsCard = (n) => {
    const t = d(n.ngay);
    const showTip = n.gocNhin && (n._tr || !U.viOnly);
    return `<article class="news"><div class="date"><b>${t.d}</b><span>${U.month(+t.m)}/${t.y}</span></div><div>
      <div class="meta"><span class="tag">${esc(CM[n.chuyenMuc] || n.chuyenMuc || U.news)}</span>${viTag(n)}<span>${t.full}</span></div>
      <h3 ${!n._tr && U.viOnly ? 'lang="vi"' : ""}>${esc(n.tieuDe)}</h3>${n._tr || !U.viOnly ? `<p>${esc(n.tomTat)}</p>` : ""}
      ${showTip ? `<div class="tip"><b>${U.gocNhin}</b> ${esc(n.gocNhin)}</div>` : ""}
      ${n.link ? `<div class="src">${U.source} <a href="${esc(n.link)}" target="_blank" rel="noopener">${esc(n.nguon || U.viewSource)} ↗</a></div>` : ""}
    </div></article>`;
  };
  const miniNews = (n) => { const t = d(n.ngay); return `<a href="diem-tin.html"><div class="d"><b>${t.d}</b>${U.month(+t.m)}</div><div><h4>${esc(n.tieuDe)}${viTag(n)}</h4>${n._tr || !U.viOnly ? `<p>${esc(n.tomTat)}</p>` : ""}</div></a>`; };
  const KT = L.kt || window.KIEN_THUC || [];
  const ktCard = (k) => `<a class="card" href="kien-thuc.html#${k.slug}" style="text-decoration:none;color:inherit"><img class="thumb" src="${img(k.anh)}" alt="" loading="lazy"><div class="body"><div class="meta"><span class="tag sage">${esc(k.nhom)}</span></div><h3>${esc(k.tieuDe)}</h3><p>${esc(k.tomTat)}</p><span class="more">${U.readMore}</span></div></a>`;

  /* ---------- Sản phẩm ---------- */
  const SP = window.SAN_PHAM || [];
  const TH = (window.THUONG_HIEU || []).map((t) => Object.assign({}, t, (L.th || {})[t.id] || {}));
  const LOAI = {}; Object.entries(window.LOAI_SON || {}).forEach(([k, v]) => (LOAI[k] = Object.assign({}, v, (L.loai || {})[k] || {})));
  const spTen = (p) => (L.spTen ? L.spTen(p, LOAI, KHU) : p.ten);
  const thName = (id) => (TH.find((t) => t.id === id) || {}).ten || "";
  const prodCard = (p) => `<button class="prod" data-ma="${p.ma}"><div class="pimg"><img src="${img(p.anh)}" alt="${esc(spTen(p))}" loading="lazy"></div>
     <div class="body"><div class="code">${esc(thName(p.th))} · ${p.ma}</div><h3>${esc(spTen(p))}</h3><div class="row"><span class="tag sage">${KHU[p.khu]}</span><span class="tag">${LOAI[p.loai].ten}</span></div></div></button>`;
  function openProduct(ma) {
    const p = SP.find((x) => x.ma === ma); if (!p) return;
    const Lo = LOAI[p.loai], m = $("#modal");
    $(".mimg", m).innerHTML = `<img src="${img(p.anh)}" alt="${esc(spTen(p))}">`;
    $(".mbody", m).innerHTML = `<div class="code" style="color:var(--accent);font-weight:700;font-size:13px">${esc(thName(p.th))} · ${U.code} ${p.ma}</div>
      <h2 style="font-size:24px;margin-top:6px">${esc(spTen(p))}</h2><p class="muted">${Lo.moTa}</p>
      <ul class="spec"><li><span>${U.brand}</span><span>${esc(thName(p.th))}</span></li><li><span>${U.line}</span><span>${Lo.ten}</span></li>
      <li><span>${U.scope}</span><span>${KHU[p.khu]}</span></li>${p.ghiChu ? `<li><span>${U.spec}</span><span>${(L.ghiChu || {})[p.ghiChu] || p.ghiChu}</span></li>` : ""}
      <li><span>${U.howto}</span><span>${Lo.dung}</span></li><li><span>${U.price}</span><span>${U.priceVal}</span></li></ul>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-primary" href="${telHref}">${U.callQuote}</a><a class="btn btn-zalo" href="${zaloHref}" ${C.zalo ? 'target="_blank"' : ""}>${U.zalo}</a></div>`;
    m.classList.add("open"); document.body.style.overflow = "hidden";
  }
  function closeModal() { $$(".modal").forEach((m) => m.classList.remove("open")); document.body.style.overflow = ""; }
  document.addEventListener("click", (e) => {
    const pr = e.target.closest(".prod"); if (pr) openProduct(pr.dataset.ma);
    if (e.target.classList.contains("modal") || e.target.closest(".modal-close")) closeModal();
    const zi = e.target.closest("[data-zoom]"); if (zi) { const lb = $("#lightbox"); $("img", lb).src = zi.dataset.zoom || zi.src; lb.classList.add("open"); }
    else if (e.target.closest("#lightbox")) $("#lightbox").classList.remove("open");
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModal(); const lb = $("#lightbox"); if (lb) lb.classList.remove("open"); } });

  function productsPage() {
    const st = { th: "all", loai: "all", khu: "all" };
    const h = location.hash.slice(1);
    if (TH.some((t) => t.id === h)) st.th = h;
    if (h.startsWith("loai-")) st.loai = h.slice(5);
    const sub = $("#sub-brands"), chL = $("#chips-loai"), chK = $("#chips-khu");
    sub.innerHTML = `<button data-th="all">${U.allProducts}</button>` + TH.map((t) => `<button data-th="${t.id}">${t.ten}</button>`).join("");
    const loaiDung = Object.keys(LOAI).filter((k) => SP.some((p) => p.loai === k));
    chL.innerHTML = `<span class="lbl">${U.type}</span><button data-loai="all">${U.all}</button>` + loaiDung.map((k) => `<button data-loai="${k}">${LOAI[k].ten}</button>`).join("");
    chK.innerHTML = `<span class="lbl">${U.area}</span><button data-khu="all">${U.all}</button><button data-khu="noi">${U.noi}</button><button data-khu="ngoai">${U.ngoai}</button>`;
    function render() {
      $$("button", sub).forEach((b) => b.classList.toggle("on", b.dataset.th === st.th));
      $$("button", chL).forEach((b) => b.classList.toggle("on", b.dataset.loai === st.loai));
      $$("button", chK).forEach((b) => b.classList.toggle("on", b.dataset.khu === st.khu));
      const t = TH.find((x) => x.id === st.th);
      $("#brand-intro").innerHTML = t ? `<div class="brand-intro"><img src="${img(t.banner)}" alt="${t.ten}"><div>${t.logo ? `<img class="logo" src="${img(t.logo)}" alt="${t.ten}">` : `<h2 style="margin-bottom:4px">${t.ten}</h2>`}<div class="eyebrow">${t.slogan}</div><p class="lead" style="margin:0">${t.moTa}</p></div></div>` : "";
      const list = SP.filter((p) => (st.th === "all" || p.th === st.th) && (st.loai === "all" || p.loai === st.loai) && (st.khu === "all" || p.khu === st.khu || p.khu === "ca2"));
      $("#sp-count").textContent = U.count(list.length);
      $("#sp-grid").innerHTML = list.length ? list.map(prodCard).join("") : `<div class="empty" style="grid-column:1/-1">${U.empty}</div>`;
    }
    sub.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; st.th = b.dataset.th; history.replaceState(null, "", st.th === "all" ? location.pathname : "#" + st.th); render(); });
    chL.addEventListener("click", (e) => { const b = e.target.closest("button[data-loai]"); if (!b) return; st.loai = b.dataset.loai; render(); });
    chK.addEventListener("click", (e) => { const b = e.target.closest("button[data-khu]"); if (!b) return; st.khu = b.dataset.khu; render(); });
    window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (TH.some((t) => t.id === h)) { st.th = h; st.loai = "all"; } else if (h.startsWith("loai-")) { st.th = "all"; st.loai = h.slice(5); } render(); window.scrollTo({ top: 0, behavior: "smooth" }); });
    render();
  }

  async function homePage() {
    $("#home-brands").innerHTML = TH.map((t) => `<a class="brand-card" href="san-pham.html#${t.id}" style="text-decoration:none;color:inherit"><div class="poster"><img src="${img(t.banner)}" alt="${t.ten}" loading="lazy"></div><div class="body"><div class="eyebrow" style="margin-bottom:4px">${t.slogan}</div><h3>${t.ten}</h3><p class="muted" style="font-size:15px">${t.ngan || t.moTa.split(":")[0].split(".")[0] + "."}</p><span class="count">${U.brandCount(SP.filter((p) => p.th === t.id).length)}</span></div></a>`).join("");
    $("#home-kt").innerHTML = KT.slice(0, 3).map(ktCard).join("");
    const news = await loadNews();
    $("#home-news").innerHTML = news.slice(0, 5).map(miniNews).join("");
    if (news[0]) $("#home-news-date").textContent = U.updated + d(news[0].ngay).full;
  }

  async function newsPage() {
    const news = await loadNews();
    let cur = "all";
    const ch = $("#chips-news");
    const used = Object.keys(CM).filter((k) => news.some((n) => n.chuyenMuc === k));
    ch.innerHTML = `<button data-c="all">${U.all}</button>` + used.map((k) => `<button data-c="${k}">${CM[k]}</button>`).join("");
    const render = () => {
      $$("button", ch).forEach((b) => b.classList.toggle("on", b.dataset.c === cur));
      $("#news-list").innerHTML = news.filter((n) => cur === "all" || n.chuyenMuc === cur).map(newsCard).join("");
    };
    ch.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { cur = b.dataset.c; render(); } });
    if (news[0]) $("#news-updated").textContent = U.lastUpdated + d(news[0].ngay).full;
    render();
  }

  function ktPage() {
    const render = () => {
      const k = KT.find((x) => x.slug === location.hash.slice(1));
      if (!k) { $("#kt-view").innerHTML = `<div class="grid g3">${KT.map(ktCard).join("")}</div>`; return; }
      const others = KT.filter((x) => x !== k);
      $("#kt-view").innerHTML = `<div class="article-layout"><article class="article"><img class="cover" src="${img(k.anh)}" alt=""><div class="content">
        <div class="meta"><a href="kien-thuc.html">${U.allArticles}</a><span class="tag sage">${k.nhom}</span></div><h1 style="font-size:clamp(26px,3.4vw,36px)">${k.tieuDe}</h1><p class="lead">${k.tomTat}</p>${k.noiDung}</div></article>
        <aside class="side"><div class="box cta-box"><h4>${U.ctaH}</h4><p>${U.ctaP}</p><a class="btn btn-primary" href="${telHref}">${U.callNow}</a></div>
        <div class="box list"><h4>${U.otherArticles}</h4>${others.map((o) => `<a href="#${o.slug}">${o.tieuDe}</a>`).join("")}</div></aside></div>`;
    };
    window.addEventListener("hashchange", () => { render(); window.scrollTo({ top: 0, behavior: "smooth" }); });
    render();
  }

  const form = $("#lien-he-form");
  if (form) form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = $(".msg", form), fd = Object.fromEntries(new FormData(form));
    msg.className = "msg";
    if (!/^[0-9 +.]{9,15}$/.test(fd.so_dien_thoai || "")) { msg.className = "msg err"; msg.textContent = U.badPhone; return; }
    if (!sbOn) { msg.className = "msg err"; msg.innerHTML = U.notConnected(telHref, esc(C.dienThoai)); return; }
    const btn = $("button[type=submit]", form); btn.disabled = true;
    try {
      const r = await fetch(C.supabaseUrl + "/rest/v1/lien_he", { method: "POST", headers: { ...sbHeaders(), Prefer: "return=minimal" }, body: JSON.stringify(fd) });
      if (!r.ok) throw new Error(r.status);
      form.reset(); msg.className = "msg ok"; msg.textContent = U.thanks;
    } catch (err) { msg.className = "msg err"; msg.innerHTML = U.sendFail(telHref, esc(C.dienThoai)); }
    btn.disabled = false;
  });

  if (page === "home") homePage();
  if (page === "products") productsPage();
  if (page === "news") newsPage();
  if (page === "knowledge") ktPage();
})();
