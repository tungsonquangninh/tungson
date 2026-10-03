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
    khu: { noi: "Nội thất", ngoai: "Ngoại thất", ca2: "Nội & ngoại thất" },
    cWall: "Diện tích tường", cOpen: "Trừ cửa đi & cửa sổ", cCeil: "Diện tích trần", cTotal: "Tổng diện tích cần sơn",
    cTop: (c) => `Sơn phủ (${c} lớp)`, cPrimer: "Sơn lót (1 lớp)", cPutty: "Bột bả (2 lớp)", cL: "lít", cKg: "kg",
    cPack: (n18, n5) => [n18 ? n18 + " thùng 18 lít" : "", n5 ? n5 + " lon 5 lít" : ""].filter(Boolean).join(" + "), cBag: (n) => n + " bao 25 kg",
    cBuy: "Gợi ý mua", cWallOut: "Diện tích tường ngoài", cExtra: "Diện tích khác", cTopOut: (c) => `Sơn phủ ngoại thất (${c} lớp)`, cPrimerOut: "Sơn lót ngoại thất (1 lớp)", cPuttyOut: "Bột bả ngoại thất (2 lớp)", cIncl: (w) => `đã cộng ${w}% hao hụt`, cErr: "Kích thước cửa lớn hơn diện tích tường — vui lòng kiểm tra lại số liệu."
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


  function calcPage() {
    const v = (id) => Math.max(0, parseFloat(($("#" + id) || {}).value) || 0);
    const ck = (id) => !!($("#" + id) || {}).checked;
    const f1 = (x) => (Math.round(x * 10) / 10).toLocaleString(U.locale);
    const pack = (need) => { let best = null; for (let a = 0; a <= Math.ceil(need / 18) + 1; a++) { const b = Math.max(0, Math.ceil((need - 18 * a) / 5)); const tot = 18 * a + 5 * b; if (!best || tot < best.tot || (tot === best.tot && a + b < best.a + best.b)) best = { a, b, tot }; } return best; };
    const row = (k, val, strong) => `<div class="cr${strong ? " big" : ""}"><span>${k}</span><b>${val}</b></div>`;
    const form = $("#calc-form");
    $$(".calc-tabs button", form).forEach((btn) => btn.addEventListener("click", () => {
      form.dataset.mode = btn.dataset.mode;
      $$(".calc-tabs button", form).forEach((x) => x.setAttribute("aria-selected", x === btn ? "true" : "false"));
      $(".grp-in", form).hidden = btn.dataset.mode !== "in"; $(".grp-out", form).hidden = btn.dataset.mode !== "out";
      run();
    }));
    function run() {
      const out = form.dataset.mode === "out";
      let wall, open, ceil = 0, extra = 0;
      if (!out) {
        const L_ = v("c-len"), W = v("c-wid"), H = v("c-hei");
        wall = (L_ + W) * 2 * H; open = v("c-dw") * v("c-dh") * v("c-dq") + v("c-ww") * v("c-wh") * v("c-wq");
        ceil = ck("c-ceil") ? L_ * W : 0;
      } else {
        const H = v("e-floors") * v("e-fh"), F = v("e-front"), D = v("e-depth");
        wall = ((ck("e-sf") ? F : 0) + (ck("e-sb") ? F : 0) + (ck("e-sl") ? D : 0) + (ck("e-sr") ? D : 0)) * H;
        extra = v("e-extra"); open = v("e-dw") * v("e-dh") * v("e-dq") + v("e-ww") * v("e-wh") * v("e-wq");
      }
      const net = wall - open, total = net + ceil + extra;
      const coats = +$("#c-coats").value || 2, rate = v("c-rate") || 10, waste = 1 + v("c-waste") / 100;
      if (net < 0) { $("#calc-out").innerHTML = `<p class="msg err" style="display:block">${U.cErr}</p>`; return; }
      const top = total * coats / rate * waste, primer = total / rate * waste, putty = total * 1.0 * waste;
      const pt = pack(top), pp = pack(primer);
      let h = row(out ? U.cWallOut : U.cWall, f1(wall) + " m²") + row(U.cOpen, "− " + f1(open) + " m²") + (ceil ? row(U.cCeil, "+ " + f1(ceil) + " m²") : "") + (extra ? row(U.cExtra, "+ " + f1(extra) + " m²") : "") + row(U.cTotal, f1(total) + " m²", true);
      h += `<div class="cbox"><div class="ct">${out ? U.cTopOut(coats) : U.cTop(coats)}</div><div class="cv">${f1(top)} ${U.cL}</div><div class="cp">${U.cBuy}: ${U.cPack(pt.a, pt.b)}</div></div>`;
      if (ck("c-primer")) h += `<div class="cbox"><div class="ct">${out ? U.cPrimerOut : U.cPrimer}</div><div class="cv">${f1(primer)} ${U.cL}</div><div class="cp">${U.cBuy}: ${U.cPack(pp.a, pp.b)}</div></div>`;
      if (ck("c-putty")) h += `<div class="cbox"><div class="ct">${out ? U.cPuttyOut : U.cPutty}</div><div class="cv">${f1(putty)} ${U.cKg}</div><div class="cp">${U.cBuy}: ${U.cBag(Math.ceil(putty / 25))}</div></div>`;
      h += `<p class="muted" style="font-size:13px;margin:6px 0 0">${U.cIncl(v("c-waste"))}</p>`;
      $("#calc-out").innerHTML = h;
    }
    $("#calc-form").addEventListener("input", run); $("#calc-form").addEventListener("change", run); run();
  }


  function menhPage() {
    const M = window.MENH, lg = (document.documentElement.lang || "vi").slice(0, 2), T = M.ui[lg] || M.ui.vi, li = { vi: 1, en: 2, zh: 3 }[lg] || 1;
    const HANH = ["kim", "thuy", "hoa", "tho", "moc"]; // 1..5
    const CAN_V = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5], CHI_V = [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2];
    const sw = (c) => `<div class="sw"><i style="background:${c[0]}"></i><span>${T.code} ${c[1]}</span><small>${c[li + 1]}</small></div>`;
    const names = (k) => M.mau[k].map((c) => c[li + 1].toLowerCase() + " (" + c[1] + ")").join(", ");
    function show() {
      const d = +$("#m-d").value, m = +$("#m-m").value, y = +$("#m-y").value, out = $("#menh-out");
      if (!d || !m || !y) { out.innerHTML = `<div class="menh-empty">${T.empty}</div>`; return; }
      const dt = new Date(y, m - 1, d);
      if (y < 1900 || y > 2100 || dt.getMonth() !== m - 1 || dt.getDate() !== d) { out.innerHTML = `<div class="msg err" style="display:block">${T.bad}</div>`; return; }
      const L_ = window.AmLich.solar2lunar(d, m, y), ly = L_.year;
      const ci = (ly + 6) % 10, zi = (ly + 8) % 12, n = CAN_V[ci] + CHI_V[zi], k = HANH[(n > 5 ? n - 5 : n) - 1];
      const ni = Math.floor((((ly - 4) % 60) + 60) % 60 / 2), rel = M.quanHe[k];
      const canchi = lg === "zh" ? M.can.zh[ci] + M.chi.zh[zi] : M.can.vi[ci] + " " + M.chi.vi[zi];
      const hn = (x) => M.hanh[x][lg] || M.hanh[x].vi;
      out.innerHTML = `<div class="menh-res">
        <div class="menh-head"><div class="el el-${k}">${hn(k)}</div><div>
          <div class="muted" style="font-size:14px">${T.lunar} ${ly} · ${canchi} (${M.con[lg][zi]})</div>
          <h2 style="margin:2px 0 0">${T.menh} ${hn(k)} — ${M.napAm[lg][ni]}</h2>
          ${ly !== y ? `<p class="muted" style="font-size:14px;margin:6px 0 0">${T.beforeTet(ly)}</p>` : ""}</div></div>
        <h4>${T.sinh} <span class="tag sage">${hn(rel.sinh)}</span></h4><div class="sws">${M.mau[rel.sinh].map(sw).join("")}</div>
        <h4>${T.ban} <span class="tag">${hn(k)}</span></h4><div class="sws">${M.mau[k].map(sw).join("")}</div>
        <h4>${T.ky} <span class="tag" style="background:#f3e3e0;color:#8a2a1c">${hn(rel.khac)}</span></h4><div class="sws ky">${M.mau[rel.khac].map(sw).join("")}</div>
        <p class="muted" style="font-size:13px;margin:12px 0 0">${T.chart} <a href="bang-mau.html">→</a></p>
        <h4>${T.meaning}</h4><p>${M.moTa[k][lg] || M.moTa[k].vi}</p>
        <h4>${T.tips}</h4><ul class="tips">${T.tip(names(rel.sinh), names(k)).map((x) => `<li>${x}</li>`).join("")}</ul>
        <p class="note" style="font-size:14px">${T.note}</p></div>`;
    }
    $("#menh-form").addEventListener("submit", show);
    $("#menh-form").addEventListener("input", () => { if ($("#m-y").value.length === 4) show(); });
    show();
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
  if (page === "calc") calcPage();
  if (page === "menh") menhPage();
})();
