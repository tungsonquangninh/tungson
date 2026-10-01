(function () {
  const C = window.CAU_HINH || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const page = document.body.dataset.page;
  const CM = { "gia-vlxd": "Giá vật liệu", "thi-truong-son": "Thị trường sơn", "phap-ly": "Pháp lý xây nhà", "xu-huong": "Xu hướng màu", "quang-ninh": "Tin Quảng Ninh" };
  const KHU = { noi: "Nội thất", ngoai: "Ngoại thất", ca2: "Nội & ngoại thất" };

  /* ---------- Thông tin liên hệ ---------- */
  const telHref = C.dienThoaiGoi ? "tel:" + C.dienThoaiGoi : "lien-he.html";
  const zaloHref = C.zalo ? "https://zalo.me/" + C.zalo : "lien-he.html";
  $$("[data-cfg]").forEach((el) => (el.textContent = C[el.dataset.cfg] || ""));
  $$("[data-tel]").forEach((el) => (el.href = telHref));
  $$("[data-zalo]").forEach((el) => { el.href = zaloHref; if (C.zalo) el.target = "_blank"; });
  $$("[data-fb]").forEach((el) => { if (C.facebook) { el.href = C.facebook; el.target = "_blank"; } else el.remove(); });
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Menu ---------- */
  const mb = $(".menu-btn"), nav = $(".nav");
  if (mb) mb.addEventListener("click", () => { nav.classList.toggle("open"); document.body.style.overflow = nav.classList.contains("open") ? "hidden" : ""; });
  $$(".nav a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); document.body.style.overflow = ""; }));

  /* ---------- Ngày tháng ---------- */
  const d = (s) => { const [y, m, dd] = String(s).slice(0, 10).split("-"); return { y, m, d: dd, full: `${dd}/${m}/${y}` }; };
  const today = new Date();
  $$("[data-today]").forEach((el) => (el.textContent = today.toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })));

  /* ---------- Supabase (tuỳ chọn) ---------- */
  const sbOn = !!(C.supabaseUrl && C.supabaseAnonKey);
  const sbHeaders = () => (String(C.supabaseAnonKey).startsWith("sb_") ? { apikey: C.supabaseAnonKey, "Content-Type": "application/json" } : { apikey: C.supabaseAnonKey, Authorization: "Bearer " + C.supabaseAnonKey, "Content-Type": "application/json" });
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
      } catch (e) { /* dùng dữ liệu có sẵn */ }
    }
    return list.sort((a, b) => String(b.ngay).localeCompare(String(a.ngay)));
  }

  const newsCard = (n) => {
    const t = d(n.ngay);
    return `<article class="news"><div class="date"><b>${t.d}</b><span>Th${+t.m}/${t.y}</span></div><div>
      <div class="meta"><span class="tag">${esc(CM[n.chuyenMuc] || n.chuyenMuc || "Tin tức")}</span><span>${t.full}</span></div>
      <h3>${esc(n.tieuDe)}</h3><p>${esc(n.tomTat)}</p>
      ${n.gocNhin ? `<div class="tip"><b>Góc nhìn Tùng Sơn:</b> ${esc(n.gocNhin)}</div>` : ""}
      ${n.link ? `<div class="src">Nguồn: <a href="${esc(n.link)}" target="_blank" rel="noopener">${esc(n.nguon || "Xem bài gốc")} ↗</a></div>` : ""}
    </div></article>`;
  };
  const miniNews = (n) => { const t = d(n.ngay); return `<a href="diem-tin.html"><div class="d"><b>${t.d}</b>Th${+t.m}</div><div><h4>${esc(n.tieuDe)}</h4><p>${esc(n.tomTat)}</p></div></a>`; };
  const ktCard = (k) => `<a class="card" href="kien-thuc.html#${k.slug}" style="text-decoration:none;color:inherit"><img class="thumb" src="${k.anh}" alt="" loading="lazy"><div class="body"><div class="meta"><span class="tag sage">${esc(k.nhom)}</span></div><h3>${esc(k.tieuDe)}</h3><p>${esc(k.tomTat)}</p><span class="more">Đọc bài →</span></div></a>`;

  /* ---------- Sản phẩm ---------- */
  const SP = window.SAN_PHAM || [], TH = window.THUONG_HIEU || [], LOAI = window.LOAI_SON || {};
  const thName = (id) => (TH.find((t) => t.id === id) || {}).ten || "";
  const prodCard = (p) => `<button class="prod" data-ma="${p.ma}"><div class="pimg"><img src="${p.anh}" alt="${esc(p.ten)}" loading="lazy"></div>
     <div class="body"><div class="code">${esc(thName(p.th))} · ${p.ma}</div><h3>${esc(p.ten)}</h3><div class="row"><span class="tag sage">${KHU[p.khu]}</span><span class="tag">${LOAI[p.loai].ten}</span></div></div></button>`;

  function openProduct(ma) {
    const p = SP.find((x) => x.ma === ma); if (!p) return;
    const L = LOAI[p.loai];
    const m = $("#modal");
    $(".mimg", m).innerHTML = `<img src="${p.anh}" alt="${esc(p.ten)}">`;
    $(".mbody", m).innerHTML = `<div class="code" style="color:var(--accent);font-weight:700;font-size:13px">${esc(thName(p.th))} · Mã ${p.ma}</div>
      <h2 style="font-size:24px;margin-top:6px">${esc(p.ten)}</h2><p class="muted">${L.moTa}</p>
      <ul class="spec"><li><span>Thương hiệu</span><span>${esc(thName(p.th))}</span></li><li><span>Dòng sản phẩm</span><span>${L.ten}</span></li>
      <li><span>Phạm vi sử dụng</span><span>${KHU[p.khu]}</span></li>${p.ghiChu ? `<li><span>Quy cách</span><span>${p.ghiChu}</span></li>` : ""}
      <li><span>Hướng dẫn thi công</span><span>${L.dung}</span></li><li><span>Giá</span><span>Liên hệ để có giá tốt</span></li></ul>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-primary" href="${telHref}">Gọi báo giá</a><a class="btn btn-zalo" href="${zaloHref}" ${C.zalo ? 'target="_blank"' : ""}>Nhắn Zalo</a></div>`;
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
    sub.innerHTML = `<button data-th="all">Tất cả sản phẩm</button>` + TH.map((t) => `<button data-th="${t.id}">${t.ten}</button>`).join("");
    const loaiDung = Object.keys(LOAI).filter((k) => SP.some((p) => p.loai === k));
    chL.innerHTML = `<span class="lbl">Loại</span><button data-loai="all">Tất cả</button>` + loaiDung.map((k) => `<button data-loai="${k}">${LOAI[k].ten}</button>`).join("");
    chK.innerHTML = `<span class="lbl">Khu vực</span><button data-khu="all">Tất cả</button><button data-khu="noi">Nội thất</button><button data-khu="ngoai">Ngoại thất</button>`;
    function render() {
      $$("button", sub).forEach((b) => b.classList.toggle("on", b.dataset.th === st.th));
      $$("button", chL).forEach((b) => b.classList.toggle("on", b.dataset.loai === st.loai));
      $$("button", chK).forEach((b) => b.classList.toggle("on", b.dataset.khu === st.khu));
      const t = TH.find((x) => x.id === st.th);
      $("#brand-intro").innerHTML = t ? `<div class="brand-intro"><img src="${t.banner}" alt="${t.ten}"><div>${t.logo ? `<img class="logo" src="${t.logo}" alt="${t.ten}">` : `<h2 style="margin-bottom:4px">${t.ten}</h2>`}<div class="eyebrow">${t.slogan}</div><p class="lead" style="margin:0">${t.moTa}</p></div></div>` : "";
      const list = SP.filter((p) => (st.th === "all" || p.th === st.th) && (st.loai === "all" || p.loai === st.loai) && (st.khu === "all" || p.khu === st.khu || p.khu === "ca2"));
      $("#sp-count").textContent = list.length + " sản phẩm";
      $("#sp-grid").innerHTML = list.length ? list.map(prodCard).join("") : `<div class="empty" style="grid-column:1/-1">Chưa có sản phẩm phù hợp. Hãy chọn bộ lọc khác.</div>`;
    }
    sub.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; st.th = b.dataset.th; history.replaceState(null, "", st.th === "all" ? location.pathname : "#" + st.th); render(); });
    chL.addEventListener("click", (e) => { const b = e.target.closest("button[data-loai]"); if (!b) return; st.loai = b.dataset.loai; render(); });
    chK.addEventListener("click", (e) => { const b = e.target.closest("button[data-khu]"); if (!b) return; st.khu = b.dataset.khu; render(); });
    window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (TH.some((t) => t.id === h)) { st.th = h; st.loai = "all"; } else if (h.startsWith("loai-")) { st.th = "all"; st.loai = h.slice(5); } render(); window.scrollTo({ top: 0, behavior: "smooth" }); });
    render();
  }

  /* ---------- Trang chủ ---------- */
  async function homePage() {
    $("#home-brands").innerHTML = TH.map((t) => `<a class="brand-card" href="san-pham.html#${t.id}" style="text-decoration:none;color:inherit"><div class="poster"><img src="${t.banner}" alt="${t.ten}" loading="lazy"></div><div class="body"><div class="eyebrow" style="margin-bottom:4px">${t.slogan}</div><h3>${t.ten}</h3><p class="muted" style="font-size:15px">${t.moTa.split(":")[0].split(".")[0]}.</p><span class="count">${SP.filter((p) => p.th === t.id).length} sản phẩm · Xem tất cả →</span></div></a>`).join("");
    $("#home-kt").innerHTML = (window.KIEN_THUC || []).slice(0, 3).map(ktCard).join("");
    const news = await loadNews();
    $("#home-news").innerHTML = news.slice(0, 5).map(miniNews).join("");
    if (news[0]) $("#home-news-date").textContent = "Cập nhật " + d(news[0].ngay).full;
  }

  /* ---------- Điểm tin ---------- */
  async function newsPage() {
    const news = await loadNews();
    let cur = "all";
    const ch = $("#chips-news");
    const used = Object.keys(CM).filter((k) => news.some((n) => n.chuyenMuc === k));
    ch.innerHTML = `<button data-c="all">Tất cả</button>` + used.map((k) => `<button data-c="${k}">${CM[k]}</button>`).join("");
    const render = () => {
      $$("button", ch).forEach((b) => b.classList.toggle("on", b.dataset.c === cur));
      $("#news-list").innerHTML = news.filter((n) => cur === "all" || n.chuyenMuc === cur).map(newsCard).join("");
    };
    ch.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { cur = b.dataset.c; render(); } });
    if (news[0]) $("#news-updated").textContent = "Cập nhật lần cuối: " + d(news[0].ngay).full;
    render();
  }

  /* ---------- Kiến thức ---------- */
  function ktPage() {
    const KT = window.KIEN_THUC || [];
    const render = () => {
      const k = KT.find((x) => x.slug === location.hash.slice(1));
      if (!k) {
        $("#kt-view").innerHTML = `<div class="grid g3">${KT.map(ktCard).join("")}</div>`;
        return;
      }
      const others = KT.filter((x) => x !== k);
      $("#kt-view").innerHTML = `<div class="article-layout"><article class="article"><img class="cover" src="${k.anh}" alt=""><div class="content">
        <div class="meta"><a href="kien-thuc.html">← Tất cả bài viết</a><span class="tag sage">${k.nhom}</span></div><h1 style="font-size:clamp(26px,3.4vw,36px)">${k.tieuDe}</h1><p class="lead">${k.tomTat}</p>${k.noiDung}</div></article>
        <aside class="side"><div class="box cta-box"><h4>Cần tư vấn cho công trình của bạn?</h4><p>Khảo sát và báo giá miễn phí tại Quảng Ninh.</p><a class="btn btn-primary" href="${telHref}">Gọi ngay</a></div>
        <div class="box list"><h4>Bài viết khác</h4>${others.map((o) => `<a href="#${o.slug}">${o.tieuDe}</a>`).join("")}</div></aside></div>`;
    };
    window.addEventListener("hashchange", () => { render(); window.scrollTo({ top: 0, behavior: "smooth" }); });
    render();
  }

  /* ---------- Form liên hệ ---------- */
  const form = $("#lien-he-form");
  if (form) form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = $(".msg", form), fd = Object.fromEntries(new FormData(form));
    msg.className = "msg";
    if (!/^[0-9 +.]{9,15}$/.test(fd.so_dien_thoai || "")) { msg.className = "msg err"; msg.textContent = "Vui lòng nhập số điện thoại hợp lệ."; return; }
    if (!sbOn) { msg.className = "msg err"; msg.innerHTML = `Biểu mẫu chưa được kết nối. Vui lòng gọi <a href="${telHref}">${esc(C.dienThoai)}</a> hoặc nhắn Zalo để được tư vấn ngay.`; return; }
    const btn = $("button[type=submit]", form); btn.disabled = true;
    try {
      const r = await fetch(C.supabaseUrl + "/rest/v1/lien_he", { method: "POST", headers: { ...sbHeaders(), Prefer: "return=minimal" }, body: JSON.stringify(fd) });
      if (!r.ok) throw new Error(r.status);
      form.reset(); msg.className = "msg ok"; msg.textContent = "Cảm ơn anh/chị! Tùng Sơn đã nhận thông tin và sẽ gọi lại trong thời gian sớm nhất.";
    } catch (err) { msg.className = "msg err"; msg.innerHTML = `Chưa gửi được. Anh/chị vui lòng gọi <a href="${telHref}">${esc(C.dienThoai)}</a>.`; }
    btn.disabled = false;
  });

  if (page === "home") homePage();
  if (page === "products") productsPage();
  if (page === "news") newsPage();
  if (page === "knowledge") ktPage();
})();
