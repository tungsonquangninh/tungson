/* PHỐI MÀU 3D — dựng nhà dạng khối theo kích thước, phối màu hợp mệnh (VI / EN / ZH) */
(function () {
  const host = document.getElementById("n3");
  if (!host || !window.THREE) return;
  const lg = (document.documentElement.lang || "vi").slice(0, 2), li = { vi: 2, en: 3, zh: 4 }[lg] || 2;
  const M = window.MENH, BT = M.bt;
  const U = {
    vi: {
      type: "Mẫu nhà / phòng", types: { pho: "Nhà phố", bietthu: "Biệt thự", vuon: "Nhà sân vườn", phong: "Phối màu trong phòng" }, room: "Kích thước phòng", rW: "Chiều rộng phòng (m)", rD: "Chiều dài phòng (m)", rH: "Chiều cao trần (m)", rType: "Loại phòng", rTypes: { khach: "Phòng khách", ngu: "Phòng ngủ" }, rParts: { wall: "Tường chính", accent: "Tường nhấn", trim: "Phào, len chân tường", roof: "Trần nhà" }, size: "Kích thước ngôi nhà", lotW: "Rộng mặt tiền (m)", lotD: "Chiều sâu lô đất (m)", yard: "Sân trước (m)", floors: "Số tầng", fh: "Cao mỗi tầng (m)",
      roof: "Kiểu mái", roofs: { bang: "Mái bằng (có tum)", thai: "Mái Thái", nhat: "Mái Nhật" }, balc: "Có ban công các tầng trên", win: "Cửa sổ mặt tiền mỗi tầng", side: "Có cửa sổ hai bên hông",
      face: "Hướng nhà (hướng cửa chính nhìn ra)", owner: "Gia chủ", d: "Ngày", m: "Tháng", y: "Năm sinh", g: "Giới tính", male: "Nam", female: "Nữ",
      schemes: "Phương án màu đề xuất", custom: "Tùy chỉnh từng phần", pick: "Chọn bộ phận rồi bấm vào màu:",
      parts: { wall: "Tường chính", accent: "Mảng nhấn", trim: "Phào chỉ, viền", roof: "Mái / mái tum" },
      general: "Nhập năm sinh gia chủ để xem phương án hợp mệnh. Dưới đây là các phương án phổ biến.",
      menh: (h, n) => `Gia chủ mệnh <b>${h}</b> (${n}). Phương án dưới đây dùng màu tương sinh và bản mệnh.`,
      sNames: ["Tương sinh – nhẹ nhàng", "Bản mệnh – hài hòa", "Phối hai tông", "Sáng sang – nhấn đậm"],
      vNames: ["Trắng – mái xanh đen", "Kem – mái xám ghi", "Xám trắng – mái đỏ", "Xanh ngọc – mái rêu"], gNames: ["Kem ấm – mái đỏ", "Trắng xám hiện đại", "Xanh biển mát", "Xanh ngọc tự nhiên"],
      good: "hợp", bad: "nên tránh", faceGood: (d, s) => `Hướng <b>${d}</b> là hướng tốt (<b>${s}</b>) với gia chủ.`, faceBad: (d, s) => `Hướng <b>${d}</b> là hướng xấu (<b>${s}</b>) — nên cân nhắc xoay cửa chính về hướng tốt.`,
      views: { front: "Mặt tiền", corner: "Góc chéo", side: "Bên hông", top: "Trên cao" }, spin: "Tự xoay", shot: "Tải ảnh", hint: "Kéo để xoay · cuộn / chụm 2 ngón để phóng to",
      used: "Màu đang dùng", code: "Mã", note: "Mô hình dạng khối để hình dung màu sắc, không phải bản vẽ kiến trúc. Màu trên màn hình chỉ mang tính tham khảo — xem màu thật trên bảng màu giấy trước khi sơn.",
      dirs: { N: "Bắc", NE: "Đông Bắc", E: "Đông", SE: "Đông Nam", S: "Nam", SW: "Tây Nam", W: "Tây", NW: "Tây Bắc" }, northTag: "BẮC",
    },
    en: {
      type: "House / room", types: { pho: "Townhouse", bietthu: "Villa", vuon: "Garden house", phong: "Room colours" }, room: "Room size", rW: "Room width (m)", rD: "Room length (m)", rH: "Ceiling height (m)", rType: "Room type", rTypes: { khach: "Living room", ngu: "Bedroom" }, rParts: { wall: "Main walls", accent: "Feature wall", trim: "Cornice & skirting", roof: "Ceiling" }, size: "House size", lotW: "Front width (m)", lotD: "Plot depth (m)", yard: "Front yard (m)", floors: "Storeys", fh: "Height per storey (m)",
      roof: "Roof type", roofs: { bang: "Flat roof (with stair house)", thai: "Steep hip roof", nhat: "Low hip roof" }, balc: "Balconies on upper floors", win: "Front windows per storey", side: "Windows on both sides",
      face: "House facing (main door looks towards)", owner: "Homeowner", d: "Day", m: "Month", y: "Birth year", g: "Gender", male: "Male", female: "Female",
      schemes: "Suggested colour schemes", custom: "Customise each part", pick: "Choose a part, then tap a colour:",
      parts: { wall: "Main walls", accent: "Accent panels", trim: "Trim & mouldings", roof: "Roof" },
      general: "Enter the homeowner's birth date for element-matched schemes. Popular schemes are shown below.",
      menh: (h, n) => `Homeowner's element: <b>${h}</b> (${n}). These schemes use supporting and own-element colours.`,
      sNames: ["Supporting – soft", "Own element – balanced", "Two-tone", "Bright with bold accents"],
      vNames: ["White – charcoal roof", "Cream – grey roof", "Off-white – red roof", "Mint – moss roof"], gNames: ["Warm cream – red roof", "Modern white & grey", "Cool sea blue", "Natural mint"],
      good: "good", bad: "avoid", faceGood: (d, s) => `Facing <b>${d}</b> is a good direction (<b>${s}</b>) for the homeowner.`, faceBad: (d, s) => `Facing <b>${d}</b> is an unfavourable direction (<b>${s}</b>) — consider turning the main door to a good direction.`,
      views: { front: "Front", corner: "Corner", side: "Side", top: "Top" }, spin: "Auto-rotate", shot: "Save image", hint: "Drag to rotate · scroll / pinch to zoom",
      used: "Colours in use", code: "Code", note: "A simple block model to visualise colours, not an architectural drawing. Screen colours are approximate — check the printed colour chart before painting.",
      dirs: { N: "North", NE: "North-east", E: "East", SE: "South-east", S: "South", SW: "South-west", W: "West", NW: "North-west" }, northTag: "N",
    },
    zh: {
      type: "房型 / 房间", types: { pho: "联排街屋", bietthu: "别墅", vuon: "庭院平房", phong: "室内配色" }, room: "房间尺寸", rW: "房间宽（米）", rD: "房间长（米）", rH: "层高（米）", rType: "房间类型", rTypes: { khach: "客厅", ngu: "卧室" }, rParts: { wall: "主墙面", accent: "背景墙", trim: "顶角线、踢脚线", roof: "天花板" }, size: "房屋尺寸", lotW: "临街面宽（米）", lotD: "地块进深（米）", yard: "前院（米）", floors: "层数", fh: "每层高度（米）",
      roof: "屋顶类型", roofs: { bang: "平屋顶（带楼梯间）", thai: "陡坡四坡顶", nhat: "缓坡四坡顶" }, balc: "上层带阳台", win: "每层正面窗户数", side: "两侧开窗",
      face: "房屋朝向（大门朝外的方向）", owner: "屋主", d: "日", m: "月", y: "出生年", g: "性别", male: "男", female: "女",
      schemes: "推荐配色方案", custom: "逐部分调整", pick: "先选部位，再点颜色：",
      parts: { wall: "主墙面", accent: "点缀面", trim: "线条、边框", roof: "屋顶" },
      general: "输入屋主出生日期即可查看五行配色方案。以下为常用方案。",
      menh: (h, n) => `屋主五行：<b>${h}</b>（${n}）。以下方案采用相生色与本命色。`,
      sNames: ["相生 – 柔和", "本命 – 和谐", "双色搭配", "明亮 – 深色点缀"],
      vNames: ["白墙 – 黑灰顶", "米色 – 灰顶", "灰白 – 红顶", "薄荷绿 – 苔绿顶"], gNames: ["暖米色 – 红顶", "现代白灰", "清爽海蓝", "自然薄荷绿"],
      good: "相合", bad: "宜避", faceGood: (d, s) => `朝<b>${d}</b>是屋主的吉方（<b>${s}</b>）。`, faceBad: (d, s) => `朝<b>${d}</b>是凶方（<b>${s}</b>），可考虑将大门调向吉方。`,
      views: { front: "正面", corner: "斜角", side: "侧面", top: "俯视" }, spin: "自动旋转", shot: "保存图片", hint: "拖动旋转 · 滚轮 / 双指缩放",
      used: "当前颜色", code: "色号", note: "体块模型仅用于预览配色，并非建筑图纸。屏幕颜色仅供参考，刷漆前请查看实物色卡。",
      dirs: { N: "北", NE: "东北", E: "东", SE: "东南", S: "南", SW: "西南", W: "西", NW: "西北" }, northTag: "北",
    },
  }[lg] || null;
  const T = U || {};
  const PN = () => (kind === "phong" ? T.rParts : T.parts);
  const DIRS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const ALL = []; Object.keys(M.mau).forEach((k) => M.mau[k].forEach((c) => ALL.push({ el: k, c })));
  const C = (k, i) => M.mau[k][i];

  /* ---------- Form ---------- */
  const num = (id, lab, val, step, min, max) => `<div><label for="${id}">${lab}</label><input id="${id}" type="number" value="${val}" step="${step}" min="${min}" max="${max}" inputmode="decimal"></div>`;
  const panel = host.querySelector(".n3-panel");
  panel.innerHTML = `
    <form class="f n3-form" onsubmit="return false">
      <h3>${T.type}</h3>
      <div class="n3-types">${Object.entries(T.types).map(([k, v]) => `<button type="button" data-t="${k}" class="${k === "pho" ? "on" : ""}"><span class="n3-ti n3-ti-${k}"></span>${v}</button>`).join("")}</div>
      <div class="n3-roomopt" hidden><label for="n-room">${T.rType}</label><select id="n-room">${Object.entries(T.rTypes).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select></div>
      <h3 class="n3-sizeh">${T.size}</h3>
      <div class="three">${num("n-w", T.lotW, 5, 0.1, 3, 30)}${num("n-d", T.lotD, 18, 0.5, 6, 60)}${num("n-y", T.yard, 3, 0.5, 0, 15)}</div>
      <div class="three">${num("n-f", T.floors, 3, 1, 1, 7)}${num("n-h", T.fh, 3.6, 0.1, 2.8, 5)}${num("n-win", T.win, 2, 1, 0, 6)}</div>
      <label for="n-roof">${T.roof}</label><select id="n-roof">${Object.entries(T.roofs).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select>
      <label class="chk"><input type="checkbox" id="n-balc" checked> ${T.balc}</label>
      <label class="chk n3-sideopt"><input type="checkbox" id="n-side"> ${T.side}</label>
      <label for="n-face" style="margin-top:12px">${T.face}</label><select id="n-face">${DIRS.map((d) => `<option value="${d}"${d === "S" ? " selected" : ""}>${T.dirs[d]}</option>`).join("")}</select>
      <h3>${T.owner}</h3>
      <div class="three">${num("n-bd", T.d, "", 1, 1, 31)}${num("n-bm", T.m, "", 1, 1, 12)}${num("n-by", T.y, "", 1, 1900, 2100)}</div>
      <label for="n-g">${T.g}</label><select id="n-g"><option value="m">${T.male}</option><option value="f">${T.female}</option></select>
    </form>
    <div class="n3-box"><h3>${T.schemes}</h3><p class="n3-info muted"></p><div class="n3-face"></div><div class="n3-schemes"></div></div>
    <div class="n3-box"><h3>${T.custom}</h3><p class="muted" style="font-size:14px;margin:0 0 8px">${T.pick}</p><div class="n3-parts"></div><div class="n3-sw"></div></div>`;
  const view = host.querySelector(".n3-view");
  view.insertAdjacentHTML("beforeend", `<div class="n3-bar">${Object.entries(T.views).map(([k, v]) => `<button type="button" data-v="${k}">${v}</button>`).join("")}<button type="button" data-spin>${T.spin}</button><button type="button" data-shot>⤓ ${T.shot}</button></div><div class="n3-hint">${T.hint}</div>`);
  host.querySelector(".n3-legend").innerHTML = "";
  host.querySelector(".n3-note").textContent = T.note;
  const $ = (s) => host.querySelector(s), $$ = (s) => Array.from(host.querySelectorAll(s));
  const v = (id) => parseFloat($("#" + id).value);

  /* ---------- Mệnh & hướng ---------- */
  function owner() {
    const d = v("n-bd"), m = v("n-bm"), y = v("n-by");
    if (!d || !m || !y || y < 1900 || y > 2100) return null;
    const dt = new Date(y, m - 1, d); if (dt.getMonth() !== m - 1) return null;
    const ly = window.AmLich.solar2lunar(d, m, y).year;
    const HANH = ["kim", "thuy", "hoa", "tho", "moc"], CAN_V = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5], CHI_V = [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2];
    const n = CAN_V[(ly + 6) % 10] + CHI_V[(ly + 8) % 12], k = HANH[(n > 5 ? n - 5 : n) - 1];
    const nam = $("#n-g").value !== "f";
    let s = String(ly).split("").reduce((a, c) => a + +c, 0); while (s > 9) s = String(s).split("").reduce((a, c) => a + +c, 0);
    let q = nam ? 11 - s : s + 4; while (q > 9) q -= 9; if (q === 5) q = nam ? 2 : 8;
    return { k, ly, kua: q, nap: M.napAm[lg][Math.floor((((ly - 4) % 60) + 60) % 60 / 2)] };
  }
  function schemes(o) {
    if (kind === "phong") return roomSchemes(o);
    if (!o && kind !== "pho") return [
      { wall: C("kim", 0), accent: C("kim", 1), trim: C("kim", 0), roof: C("thuy", 3) },
      { wall: C("tho", 0), accent: C("kim", 0), trim: C("kim", 0), roof: C("kim", 3) },
      { wall: C("kim", 1), accent: C("tho", 2), trim: C("kim", 0), roof: C("hoa", 3) },
      { wall: C("moc", 0), accent: C("kim", 0), trim: C("kim", 0), roof: C("moc", 3) },
    ].map((x, i) => Object.assign(x, { name: T.vNames[i] }));
    if (!o) return [
      { wall: C("tho", 0), accent: C("tho", 3), trim: C("kim", 0), roof: C("hoa", 3) },
      { wall: C("kim", 1), accent: C("kim", 3), trim: C("kim", 0), roof: C("thuy", 3) },
      { wall: C("thuy", 0), accent: C("thuy", 2), trim: C("kim", 0), roof: C("thuy", 3) },
      { wall: C("moc", 0), accent: C("moc", 3), trim: C("kim", 0), roof: C("moc", 3) },
    ].map((x, i) => Object.assign(x, { name: T.gNames[i] }));
    const S = M.mau[M.quanHe[o.k].sinh], B = M.mau[o.k];
    const white = M.quanHe[o.k].khac !== "kim" ? C("kim", 0) : B[0];
    return [
      { wall: S[0], accent: S[2], trim: white, roof: S[3] },
      { wall: B[0], accent: B[2], trim: white, roof: S[3] },
      { wall: S[1], accent: B[3], trim: B[0], roof: S[3] },
      { wall: white, accent: S[3], trim: S[0], roof: B[3] },
    ].map((x, i) => Object.assign(x, { name: T.sNames[i] }));
  }
  let cur = null, part = "wall", O = null;

  /* ---------- 3D ---------- */
  const W3 = THREE;
  const renderer = new W3.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = W3.PCFSoftShadowMap;
  renderer.outputEncoding = W3.sRGBEncoding;
  view.prepend(renderer.domElement);
  const scene = new W3.Scene(); scene.background = new W3.Color("#dfe9f1"); scene.fog = new W3.Fog("#dfe9f1", 90, 220);
  const camera = new W3.PerspectiveCamera(40, 1, 0.1, 500);
  const controls = new W3.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.maxPolarAngle = Math.PI * 0.49; controls.minDistance = 6; controls.maxDistance = 120; controls.autoRotateSpeed = 1.2;
  scene.add(new W3.HemisphereLight("#ffffff", "#8f8a7c", 0.6));
  const sun = new W3.DirectionalLight("#fff6e6", 1.0); sun.position.set(18, 30, 22); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, far: 120 }); sun.shadow.bias = -0.0005;
  scene.add(sun);
  const ground = new W3.Mesh(new W3.CircleGeometry(160, 48), new W3.MeshLambertMaterial({ color: "#a9bf8c" }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  let house = new W3.Group(); scene.add(house);
  const mats = {};
  const mat = (key, hex) => { if (!mats[key]) { mats[key] = new W3.MeshStandardMaterial({ color: hex || "#ffffff", roughness: 0.85, metalness: 0 }); mats[key].color.convertSRGBToLinear(); } return mats[key]; };
  const glass = new W3.MeshStandardMaterial({ color: "#41546a", roughness: 0.2, metalness: 0.35 });
  const wood = new W3.MeshStandardMaterial({ color: "#6b4a33", roughness: 0.7 });
  const rail = new W3.MeshStandardMaterial({ color: "#9fb4c4", roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.45 });
  const pave = new W3.MeshLambertMaterial({ color: "#cfc8bb" }), road = new W3.MeshLambertMaterial({ color: "#6f747a" });
  [ground.material, glass, wood, rail, pave, road].forEach((m) => m.color.convertSRGBToLinear());
  function box(w, h, d, m, x, y, z, g) { const o = new W3.Mesh(new W3.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; (g || house).add(o); return o; }
  function hip(w, d, h, over, m) {
    const W = w / 2 + over, D = d / 2 + over, g = new W3.BufferGeometry();
    const r = D >= W ? [[0, h, -(D - W)], [0, h, D - W]] : [[-(W - D), h, 0], [W - D, h, 0]];
    const p = [[-W, 0, -D], [W, 0, -D], [W, 0, D], [-W, 0, D]];
    let tris;
    if (D >= W) tris = [[p[3], p[2], r[1]], [p[1], p[0], r[0]], [p[0], p[3], r[1]], [p[0], r[1], r[0]], [p[2], p[1], r[0]], [p[2], r[0], r[1]]];
    else tris = [[p[0], p[3], r[0]], [p[2], p[1], r[1]], [p[3], p[2], r[1]], [p[3], r[1], r[0]], [p[1], p[0], r[0]], [p[1], r[0], r[1]]];
    g.setAttribute("position", new W3.Float32BufferAttribute(tris.flat(2), 3)); g.computeVertexNormals();
    const o = new W3.Mesh(g, m); o.castShadow = o.receiveShadow = true; return o;
  }
  function label(text, color, size) {
    const c = document.createElement("canvas"); c.width = 256; c.height = 96; const x = c.getContext("2d");
    x.font = "bold 44px 'Be Vietnam Pro',sans-serif"; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillStyle = "rgba(255,255,255,.9)"; const tw = x.measureText(text).width + 36; x.beginPath(); x.roundRect ? x.roundRect(128 - tw / 2, 14, tw, 68, 34) : x.rect(128 - tw / 2, 14, tw, 68); x.fill();
    x.fillStyle = color; x.fillText(text, 128, 50);
    const s = new W3.Sprite(new W3.SpriteMaterial({ map: new W3.CanvasTexture(c) })); s.scale.set(size * 2.67, size, 1); s.renderOrder = 9; return s;
  }
  function arrow(len, color) {
    const g = new W3.Group(), m = new W3.MeshBasicMaterial({ color });
    const sh = new W3.Mesh(new W3.PlaneGeometry(0.35, len), m); sh.rotation.x = -Math.PI / 2; sh.position.z = len / 2; g.add(sh);
    const hd = new W3.Mesh(new W3.CircleGeometry(0.9, 3), m); hd.rotation.x = -Math.PI / 2; hd.rotation.z = -Math.PI / 2; hd.position.z = len + 0.5; g.add(hd);
    g.position.y = 0.03; return g;
  }
  let dims = { w: 5, d: 15, H: 12 };

  let kind = "pho";
  const PRESET = {
    pho: { "n-w": 5, "n-d": 18, "n-y": 3, "n-f": 3, "n-h": 3.6, "n-win": 2, "n-roof": "bang", "n-balc": true },
    bietthu: { "n-w": 17, "n-d": 26, "n-y": 7, "n-f": 2, "n-h": 3.6, "n-win": 2, "n-roof": "thai", "n-balc": true },
    vuon: { "n-w": 20, "n-d": 24, "n-y": 7, "n-f": 2, "n-h": 3.4, "n-win": 2, "n-roof": "thai", "n-balc": false },
    phong: { "n-w": 4.2, "n-d": 5.2, "n-h": 3.2 },
  };
  function show(el, on) { if (!el) return; if (on) el.style.removeProperty("display"); else el.style.setProperty("display", "none", "important"); }
  function setKind(k) {
    kind = k; const P = PRESET[k], room = k === "phong";
    Object.entries(P).forEach(([id, val]) => { const e = $("#" + id); if (e.type === "checkbox") e.checked = val; else e.value = val; });
    $$(".n3-types button").forEach((b) => b.classList.toggle("on", b.dataset.t === k));
    show($(".n3-sideopt"), k === "pho"); show($(".n3-roomopt"), room); $(".n3-roomopt").hidden = false;
    ["n-y", "n-f", "n-win"].forEach((id) => show($("#" + id).parentElement, !room));
    ["n-roof", "n-face"].forEach((id) => { show($("#" + id), !room); show(host.querySelector(`label[for="${id}"]`), !room); });
    show($("#n-balc").closest("label"), !room);
    host.querySelector('label[for="n-w"]').textContent = room ? T.rW : T.lotW;
    host.querySelector('label[for="n-d"]').textContent = room ? T.rD : T.lotD;
    host.querySelector('label[for="n-h"]').textContent = room ? T.rH : T.fh;
    $(".n3-sizeh").textContent = room ? T.room : T.size;
    $("#n-w").max = room ? 12 : 40; $("#n-d").max = room ? 15 : 60;
    build(); refresh(); goView("corner");
  }
  /* --- tiện ích dựng --- */
  const leaf = new W3.MeshLambertMaterial({ color: "#5d8a3c" }), leaf2 = new W3.MeshLambertMaterial({ color: "#7aa84f" }), bark = new W3.MeshLambertMaterial({ color: "#6b4f35" });
  const lawn = new W3.MeshLambertMaterial({ color: "#8fb36a" }), stone = new W3.MeshLambertMaterial({ color: "#d8d2c4" });
  const floorW = new W3.MeshStandardMaterial({ color: "#b48a5e", roughness: 0.6 }), fabric = new W3.MeshStandardMaterial({ color: "#8c8a86", roughness: 0.95 });
  const fabric2 = new W3.MeshStandardMaterial({ color: "#e9e4da", roughness: 0.95 }), rug = new W3.MeshStandardMaterial({ color: "#c9b79c", roughness: 1 });
  const dark = new W3.MeshStandardMaterial({ color: "#2b2f36", roughness: 0.4 }), curtain = new W3.MeshStandardMaterial({ color: "#efe8dc", roughness: 1, side: W3.DoubleSide });
  const lampM = new W3.MeshBasicMaterial({ color: "#fff4d6" });
  [leaf, leaf2, bark, lawn, stone, floorW, fabric, fabric2, rug, dark, curtain].forEach((m) => m.color.convertSRGBToLinear());
  function cyl(r, h, m, x, y, z, g) { const o = new W3.Mesh(new W3.CylinderGeometry(r, r, h, 14), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; (g || house).add(o); return o; }
  function tree(x, z, s) {
    cyl(0.14 * s, 1.6 * s, bark, x, 0.8 * s, z);
    const f = new W3.Mesh(new W3.IcosahedronGeometry(1.1 * s, 1), (x + z) % 2 > 0 ? leaf : leaf2); f.position.set(x, 2.2 * s, z); f.castShadow = true; house.add(f);
    const f2 = new W3.Mesh(new W3.IcosahedronGeometry(0.75 * s, 1), leaf2); f2.position.set(x + 0.4 * s, 2.9 * s, z - 0.2 * s); f2.castShadow = true; house.add(f2);
  }
  function hedge(x, z, w, d) { if (w > 0.3) box(w, 0.7, d, leaf, x, 0.35, z); }
  function win(x, y, z, ww, wh, axis, sg) { // axis "z": mặt trước/sau, "x": hông
    const Tm = mat("trim");
    if (axis === "z") { box(ww + 0.18, wh + 0.18, 0.12, Tm, x, y, z); box(ww, wh, 0.1, glass, x, y, z + 0.03 * sg); }
    else { box(0.12, wh + 0.18, ww + 0.18, Tm, x, y, z); box(0.1, wh, ww, glass, x + 0.03 * sg, y, z); }
  }
  function site(LW, LD, gateW) { // tường rào + cổng + bãi cỏ
    const Tm = mat("trim"), Wm = mat("wall"), Am = mat("accent");
    box(LW - 0.4, 0.04, LD - 0.4, lawn, 0, 0.07, 0);
    const fh = 1.4, t = 0.2, gx = gateW / 2, fw = (LW - gateW) / 2 - 0.5;
    box(t, fh, LD, Wm, -LW / 2, fh / 2, 0); box(t, fh, LD, Wm, LW / 2, fh / 2, 0); box(LW, fh, t, Wm, 0, fh / 2, -LD / 2);
    for (const sx of [-1, 1]) {
      const cx = sx * (LW / 2 - fw / 2);
      box(fw, fh * 0.55, t, Wm, cx, fh * 0.275, LD / 2); box(fw, 0.06, t + 0.08, Tm, cx, fh * 0.55, LD / 2);
      box(fw, fh * 0.45, 0.04, rail, cx, fh * 0.55 + fh * 0.225, LD / 2);
      box(0.5, fh + 0.5, 0.5, Am, sx * (gx + 0.25), (fh + 0.5) / 2, LD / 2); box(0.62, 0.12, 0.62, Tm, sx * (gx + 0.25), fh + 0.56, LD / 2);
    }
    for (const [px, pz] of [[-LW / 2, -LD / 2], [LW / 2, -LD / 2], [-LW / 2, LD / 2], [LW / 2, LD / 2]]) box(0.36, fh + 0.2, 0.36, Tm, px, (fh + 0.2) / 2, pz);
  }
  function roofOn(w, d, y, z, roof) {
    const Tm = mat("trim"), Rm = mat("roof"), Wm = mat("wall");
    if (roof === "bang") { box(w, 0.9, d, Wm, 0, y + 0.45, z); box(w + 0.2, 0.14, d + 0.2, Tm, 0, y + 0.97, z); return y + 1.0; }
    const over = roof === "nhat" ? 0.9 : 0.55, rh = roof === "nhat" ? Math.min(w, d) * 0.22 : Math.min(w, d) * 0.42;
    box(w + over * 2, 0.16, d + over * 2, Tm, 0, y + 0.08, z);
    const r = hip(w, d, rh, over, Rm); r.position.set(0, y + 0.16, z); house.add(r); return y + rh;
  }
  /* --- chi tiết dùng chung cho mẫu biệt thự / sân vườn --- */
  const iron = new W3.MeshStandardMaterial({ color: "#1d2126", roughness: 0.45, metalness: 0.4 });
  const paveD = new W3.MeshLambertMaterial({ color: "#6d7076" }), paveL = new W3.MeshLambertMaterial({ color: "#d9d6cf" });
  const flowerP = new W3.MeshLambertMaterial({ color: "#c2417a" }), flowerV = new W3.MeshLambertMaterial({ color: "#8a6cc7" });
  const woodL = new W3.MeshStandardMaterial({ color: "#8a5a36", roughness: 0.6 });
  [iron, paveD, paveL, flowerP, flowerV, woodL].forEach((m) => m.color.convertSRGBToLinear());
  let bars = [];
  function ironRun(x1, z1, x2, z2, y, h) { // lan can / hàng rào sắt: 2 thanh ngang + song đứng
    const L = Math.hypot(x2 - x1, z2 - z1), ang = Math.atan2(x2 - x1, z2 - z1), cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
    for (const yy of [y + 0.08, y + h]) { const r = box(0.05, 0.06, L, iron, cx, yy, cz); r.rotation.y = ang; }
    const n = Math.max(2, Math.floor(L / 0.16));
    for (let k = 1; k < n; k++) { const t = k / n; bars.push([x1 + (x2 - x1) * t, y + h / 2 + 0.04, z1 + (z2 - z1) * t, h]); }
  }
  function flushBars() {
    if (!bars.length) return;
    const im = new W3.InstancedMesh(new W3.BoxGeometry(0.025, 1, 0.025), iron, bars.length), m4 = new W3.Matrix4();
    bars.forEach((b, i) => { m4.makeScale(1, b[3], 1); m4.setPosition(b[0], b[1], b[2]); im.setMatrixAt(i, m4); });
    im.castShadow = true; house.add(im); bars = [];
  }
  function pier(x, z, h, lampOn) {
    const Am = mat("accent"), Tm = mat("trim");
    box(0.5, h, 0.5, Am, x, h / 2, z); box(0.64, 0.14, 0.64, Tm, x, h + 0.07, z); box(0.6, 0.12, 0.6, Tm, x, 0.3, z);
    if (lampOn) { const s = new W3.Mesh(new W3.SphereGeometry(0.16, 12, 10), lampM); s.position.set(x, h + 0.3, z); house.add(s); }
  }
  function topiary(x, y, z) { box(0.36, 0.34, 0.36, mat("trim"), x, y + 0.17, z); const b = new W3.Mesh(new W3.SphereGeometry(0.28, 12, 10), leaf2); b.position.set(x, y + 0.6, z); b.castShadow = true; house.add(b); }
  function palm(x, z, h) {
    const t = cyl(0.14, h, bark, x, h / 2, z); t.rotation.z = 0.05;
    for (let k = 0; k < 7; k++) { const a = k * Math.PI * 2 / 7, f = new W3.Mesh(new W3.BoxGeometry(0.35, 0.05, 2.2), leaf); f.position.set(x + Math.sin(a) * 0.9, h - 0.2, z + Math.cos(a) * 0.9); f.rotation.y = a; f.rotation.x = 0.35; f.castShadow = true; house.add(f); }
  }
  function flowers(x, z, w, d) { box(w, 0.35, d, mat("trim"), x, 0.175, z); for (let k = 0; k < Math.floor(w * d * 6); k++) { const s = new W3.Mesh(new W3.SphereGeometry(0.12, 6, 5), k % 3 ? flowerP : (k % 2 ? flowerV : leaf2)); s.position.set(x - w / 2 + 0.15 + ((k * 0.37) % 1) * (w - 0.3), 0.45, z - d / 2 + 0.12 + ((k * 0.61) % 1) * (d - 0.24)); house.add(s); } }
  function bigWin(x, y0, z, w, h, sg, rotY) { // cửa kính khung đen chia ô + ô thoáng
    const g = new W3.Group(); g.position.set(x, y0, z); if (rotY) g.rotation.y = rotY; house.add(g);
    box(w + 0.16, h + 0.16, 0.1, iron, 0, h / 2, 0, g); box(w, h, 0.06, glass, 0, h / 2, 0.04 * sg, g);
    box(w, 0.06, 0.08, iron, 0, h * 0.78, 0.05 * sg, g); const n = Math.max(2, Math.round(w / 0.7));
    for (let k = 1; k < n; k++) box(0.05, h, 0.08, iron, -w / 2 + k * w / n, h / 2, 0.05 * sg, g);
    box(w + 0.5, 0.12, 0.22, mat("trim"), 0, h + 0.18, 0.08, g); return g;
  }
  function archShape(cx, y0, w, h) { const s = new W3.Shape(); s.moveTo(cx - w / 2, y0); s.lineTo(cx + w / 2, y0); s.lineTo(cx + w / 2, y0 + h - w / 2); s.absarc(cx, y0 + h - w / 2, w / 2, 0, Math.PI, false); s.lineTo(cx - w / 2, y0); return s; }
  function archPath(cx, y0, w, h) { const s = new W3.Path(); s.moveTo(cx - w / 2, y0); s.lineTo(cx + w / 2, y0); s.lineTo(cx + w / 2, y0 + h - w / 2); s.absarc(cx, y0 + h - w / 2, w / 2, 0, Math.PI, false); s.lineTo(cx - w / 2, y0); return s; }
  function ext(shape, depth, m, x, y, z, rotY) { const o = new W3.Mesh(new W3.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 16 }), m); o.position.set(x, y, z); if (rotY) o.rotation.y = rotY; o.castShadow = o.receiveShadow = true; house.add(o); return o; }
  function archWin(x, y0, z, w, h, rotY) { // cửa vòm khung gỗ
    const fr = archShape(0, 0, w + 0.2, h + 0.1); fr.holes.push(archPath(0, 0, w, h));
    ext(fr, 0.1, woodL, x, y0, z, rotY); ext(archShape(0, 0, w, h), 0.04, glass, x, y0, z + (rotY ? 0 : 0.02), rotY);
    const n = Math.max(2, Math.round(w / 0.6)), g = new W3.Group(); g.position.set(x, y0, z); if (rotY) g.rotation.y = rotY; house.add(g);
    for (let k = 1; k < n; k++) box(0.05, h - w / 2, 0.06, woodL, -w / 2 + k * w / n, (h - w / 2) / 2, 0.08, g);
    box(w, 0.05, 0.06, woodL, 0, h - w / 2, 0.08, g);
  }
  function hipFull(w, d, rh, over, x, y, z) { // mái dốc + diềm + đèn hắt + chóp
    const Tm = mat("trim"), r = hip(w, d, rh, over, mat("roof")); r.position.set(x, y + 0.18, z); house.add(r);
    box(w + over * 2 + 0.1, 0.22, d + over * 2 + 0.1, Tm, x, y + 0.09, z);
    const L = Math.abs(d - w) / 2, along = d >= w;
    for (const s of [-1, 1]) { const fx = x + (along ? 0 : s * L), fz = z + (along ? s * L : 0); const c = new W3.Mesh(new W3.ConeGeometry(0.07, 1.1, 8), iron); c.position.set(fx, y + 0.18 + rh + 0.5, fz); house.add(c); if (L < 0.05) break; }
    for (let k = 0; k < Math.floor((w + 2 * over) / 1.5); k++) { const s = new W3.Mesh(new W3.SphereGeometry(0.06, 6, 5), lampM); s.position.set(x - w / 2 - over + 0.75 + k * 1.5, y - 0.03, z + d / 2 + over - 0.1); house.add(s); }
    return y + 0.18 + rh;
  }
  /* --- BIỆT THỰ TÂN CỔ ĐIỂN 2 TẦNG: tầng trệt rộng có sân thượng lan can sắt, tầng trên lùi, giàn pergola, mái Thái 2 lớp --- */
  function buildVilla(LW, LD, Y, N, FH, NW, roof) {
    const Wm = mat("wall"), Am = mat("accent"), Tm = mat("trim");
    N = Math.max(2, N);
    const wm = Math.max(9, Math.min(LW - 3, 15)), dm = Math.max(8, Math.min(LD - Y - 2.5, 13)), zF = LD / 2 - Y, zC = zF - dm / 2, set = 2.4;
    // sân lát đá + viền cỏ, hàng rào trụ trắng song sắt đen, cổng giữa
    box(LW - 0.6, 0.04, LD - 0.6, lawn, 0, 0.07, 0); box(LW - 2.2, 0.05, Y + 1, paveD, 0, 0.1, zF + Y / 2 - 0.3); box(wm + 2, 0.05, dm + 2, paveD, 0, 0.1, zC);
    const fh = 1.7, gate = 3.6, step = 3.2;
    const fenceLine = (x1, z1, x2, z2) => { const L = Math.hypot(x2 - x1, z2 - z1), n = Math.max(1, Math.round(L / step)); for (let k = 0; k < n; k++) { const a = k / n, b = (k + 1) / n; const ax = x1 + (x2 - x1) * a, az = z1 + (z2 - z1) * a, bx = x1 + (x2 - x1) * b, bz = z1 + (z2 - z1) * b; box(Math.abs(bx - ax) || 0.3, 0.5, Math.abs(bz - az) || 0.3, Am, (ax + bx) / 2, 0.25, (az + bz) / 2); ironRun(ax, az, bx, bz, 0.5, fh - 0.6); } };
    const fz = LD / 2, fx = LW / 2;
    fenceLine(-fx, fz, -gate / 2 - 0.3, fz); fenceLine(gate / 2 + 0.3, fz, fx, fz); fenceLine(-fx, fz, -fx, -fz); fenceLine(fx, fz, fx, -fz);
    box(LW, 1.9, 0.25, Wm, 0, 0.95, -fz);
    for (const sx of [-1, 1]) { pier(sx * (gate / 2 + 0.3), fz, fh + 0.3, true); for (let k = 1; k * step < fx - gate / 2 - 0.5; k++) pier(sx * (gate / 2 + 0.3 + k * step), fz, fh, false); pier(sx * fx, fz, fh, true); for (let k = 1; k * step < LD; k++) pier(sx * fx, fz - k * step, fh, false); }
    for (const sx of [-1, 1]) { const g = new W3.Group(); g.position.set(sx * gate / 4, 0, fz); house.add(g); box(gate / 2 - 0.1, 0.06, 0.06, iron, 0, 0.2, 0, g); box(gate / 2 - 0.1, 0.08, 0.06, iron, 0, fh + 0.1, 0, g); for (let k = 0; k < 12; k++) box(0.03, fh - 0.1, 0.03, iron, -gate / 4 + 0.1 + k * (gate / 2 - 0.3) / 11, fh / 2 + 0.15, 0, g); }
    // tầng trệt
    const y0 = 0.45, top0 = y0 + FH;
    box(wm + 0.5, 0.45, dm + 0.5, Tm, 0, 0.225, zC);
    box(wm, FH, dm, Wm, 0, y0 + FH / 2, zC);
    box(wm + 0.5, 0.38, dm + 0.5, Tm, 0, top0 + 0.19, zC); // gờ phào + sàn sân thượng
    const bays = 3, bw = wm / bays;
    for (let k = 0; k <= bays; k++) { const x = -wm / 2 + k * bw; box(0.5, FH, 0.26, Am, x, y0 + FH / 2, zF + 0.12); box(0.64, 0.2, 0.34, Tm, x, top0 - 0.12, zF + 0.14); box(0.6, 0.25, 0.32, Tm, x, y0 + 0.12, zF + 0.14); const l = new W3.Mesh(new W3.BoxGeometry(0.12, 0.18, 0.08), lampM); l.position.set(x, y0 + 2.3, zF + 0.3); house.add(l); }
    for (let k = 0; k < bays; k++) bigWin(-wm / 2 + bw * (k + 0.5), y0 + 0.05, zF + 0.04, Math.min(2.4, bw - 1.1), Math.min(FH - 0.75, 2.9), 1);
    for (const sx of [-1, 1]) for (let j = 0; j < Math.max(1, Math.floor(dm / 4)); j++) { const z = zF - 2.2 - j * 4; if (z > zF - dm + 1) bigWin(sx * (wm / 2 + 0.04), y0 + 0.6, z, 1.3, 2.0, 1, sx * Math.PI / 2); }
    for (let k = 0; k < 3; k++) box(bw + 1.6 - k * 0.4, 0.15, 0.38, stone, 0, 0.075 + k * 0.15, zF + 1.05 - k * 0.36);
    // lan can sân thượng trên tầng trệt
    const yT = top0 + 0.38, wu = wm * 0.62, xu = -wm / 2 + wu / 2, du = dm - set, zu = zF - set - du / 2;
    ironRun(-wm / 2 + 0.25, zF + 0.1, wm / 2 - 0.25, zF + 0.1, yT, 0.95); ironRun(-wm / 2 + 0.05, zF, -wm / 2 + 0.05, zF - set, yT, 0.95); ironRun(wm / 2 - 0.05, zF, wm / 2 - 0.05, zF - dm + 0.3, yT, 0.95);
    for (const x of [-wm / 2 + 0.25, -wm / 6, wm / 6, wm / 2 - 0.25]) { box(0.42, 1.15, 0.42, Am, x, yT + 0.57, zF + 0.1); box(0.52, 0.1, 0.52, Tm, x, yT + 1.2, zF + 0.1); topiary(x, yT + 1.25, zF + 0.1); }
    // các tầng trên (lùi vào, khối lệch trái)
    let yy = yT;
    for (let i = 1; i < N; i++) {
      const fH = FH - 0.2;
      box(wu, fH, du, Wm, xu, yy + fH / 2, zu);
      for (const sx of [-1, 1]) box(0.45, fH, 0.24, Am, xu + sx * (wu / 2 - 0.22), yy + fH / 2, zF - set + 0.1);
      bigWin(xu, yy + 0.25, zF - set + 0.03, Math.min(3.2, wu * 0.5), Math.min(fH - 0.6, 2.7), 1);
      for (const sx of [-1, 1]) { const l = new W3.Mesh(new W3.BoxGeometry(0.12, 0.18, 0.08), lampM); l.position.set(xu + sx * (Math.min(3.2, wu * 0.5) / 2 + 0.5), yy + 2.1, zF - set + 0.1); house.add(l); }
      for (let j = 0; j < Math.max(1, Math.floor(du / 3.5)); j++) bigWin(-wm / 2 - 0.04, yy + 0.7, zF - set - 1.8 - j * 3.5, 1.2, 1.8, 1, -Math.PI / 2);
      bigWin(xu + wu / 2 + 0.04, yy + 0.25, zF - set - du * 0.35, 1.8, 2.5, 1, Math.PI / 2);
      if (i < N - 1) box(wu + 0.3, 0.25, du + 0.3, Tm, xu, yy + fH + 0.12, zu);
      yy += fH + (i < N - 1 ? 0.25 : 0);
    }
    // pergola + bàn ăn ngoài trời ở phần sân thượng bên phải
    const px1 = xu + wu / 2, px2 = wm / 2 - 0.3, pz1 = zF - set + 0.2, pz2 = zF - set - du * 0.75, ph = FH - 0.3;
    for (const [x, z] of [[px2, pz1], [px2, pz2]]) box(0.14, ph, 0.14, iron, x, yT + ph / 2, z);
    box(px2 - px1, 0.12, 0.12, iron, (px1 + px2) / 2, yT + ph, pz1); box(px2 - px1, 0.12, 0.12, iron, (px1 + px2) / 2, yT + ph, pz2);
    for (let k = 0; k <= 5; k++) box(0.06, 0.1, pz1 - pz2, iron, px1 + k * (px2 - px1) / 5, yT + ph + 0.08, (pz1 + pz2) / 2);
    box(px2 - px1, 0.03, pz1 - pz2, rail, (px1 + px2) / 2, yT + ph + 0.15, (pz1 + pz2) / 2);
    const tx = (px1 + px2) / 2, tz = (pz1 + pz2) / 2; box(1.0, 0.06, 1.8, woodL, tx, yT + 0.75, tz); box(0.8, 0.72, 1.5, iron, tx, yT + 0.36, tz).scale.set(0.15, 1, 0.9);
    for (const sx of [-1, 1]) for (const sz of [-0.5, 0.5]) box(0.42, 0.45, 0.42, woodL, tx + sx * 0.75, yT + 0.22, tz + sz);
    // mái Thái 2 lớp (mái lớn phía sau + mái nhỏ nhô trước)
    let H;
    if (roof === "bang") { box(wu, 1.0, du, Wm, xu, yy + 0.5, zu); box(wu + 0.25, 0.14, du + 0.25, Tm, xu, yy + 1.07, zu); H = yy + 1.2; }
    else {
      const k = roof === "nhat" ? 0.26 : 0.46, over = roof === "nhat" ? 1.0 : 0.8;
      H = hipFull(wu, du, Math.min(wu, du) * k, over, xu, yy, zu);
      const wB = wu * 0.56, dB = du * 0.72; hipFull(wB, dB, Math.min(wB, dB) * k * 1.35, over * 0.9, xu - wu / 2 + wB / 2 + 0.1, yy + 0.05, zF - set - dB / 2 + 0.7);
    }
    // cây, chậu, cọ
    for (const sx of [-1, 1]) { palm(sx * (LW / 2 - 1.3), -LD / 2 + 2, 6.5); hedge(sx * (LW / 2 - 0.9), fz - 3.5, 0.9, 4); topiary(sx * (bw / 2 + 0.6), 0.1, zF + 1.4); }
    tree(-LW / 2 + 1.8, fz - 1.6, 1.1); tree(LW / 2 - 1.8, zC - 1, 1.2);
    flushBars();
    return H;
  }
  /* --- NHÀ SÂN VƯỜN phong cách Địa Trung Hải: khối 2 tầng có hiên vòm + ban công, cánh 1 tầng cửa vòm, chòi nghỉ bát giác --- */
  function buildGarden(LW, LD, Y, N, FH, NW, roof) {
    const Wm = mat("wall"), Am = mat("accent"), Tm = mat("trim");
    const wm = Math.max(9, Math.min(LW - 8, 15)), dm = Math.max(7, Math.min(LD - Y - 3, 11)), zF = LD / 2 - Y, zC = zF - dm / 2, OX = (LW - wm) / 2 - 0.9;
    // tường rào cao + bãi cỏ + sân lát
    box(LW - 0.4, 0.04, LD - 0.4, lawn, 0, 0.07, 0);
    const fwH = 2.2, gate = 3.4;
    box(0.25, fwH, LD, Wm, -LW / 2, fwH / 2, 0); box(0.25, fwH, LD, Wm, LW / 2, fwH / 2, 0); box(LW, fwH, 0.25, Wm, 0, fwH / 2, -LD / 2);
    for (const [x, z, w, d] of [[-LW / 2, 0, 0.35, LD], [LW / 2, 0, 0.35, LD], [0, -LD / 2, LW, 0.35]]) box(w, 0.1, d, Tm, x, fwH + 0.05, z);
    const gx = LW / 2 - gate / 2 - 2.6, fw1 = gx - gate / 2 + LW / 2, fw2 = LW / 2 - gx - gate / 2;
    box(fw1, fwH, 0.25, Wm, -LW / 2 + fw1 / 2, fwH / 2, LD / 2); box(fw2, fwH, 0.25, Wm, LW / 2 - fw2 / 2, fwH / 2, LD / 2);
    // nhà cổng nhỏ có mái
    for (const sx of [-1, 1]) box(0.5, fwH + 0.3, 0.7, Wm, gx + sx * (gate / 2 + 0.25), (fwH + 0.3) / 2, LD / 2);
    box(gate, 2.3, 0.08, woodL, gx, 1.15, LD / 2);
    { const r = hip(gate + 1, 1.6, 0.7, 0.3, mat("roof")); r.position.set(gx, fwH + 0.4, LD / 2); house.add(r); box(gate + 1.6, 0.15, 2.2, Tm, gx, fwH + 0.35, LD / 2); }
    // sân lát trước nhà + lối đi
    box(wm + 1.5, 0.06, 4.2, paveL, OX, 0.1, zF + 2.1); box(gate, 0.05, Math.max(0.5, LD / 2 - zF - 4.2), paveL, gx, 0.1, (LD / 2 + zF + 4.2) / 2);
    // khối A 2 tầng (bên trái) có hiên vòm — dựng trong nhóm lệch phải để chừa vườn bên trái
    const root = house, hg = new W3.Group(); hg.position.x = OX; root.add(hg); house = hg;
    const NA = Math.max(1, N), wa = Math.min(7.5, wm * 0.45), xa = -wm / 2 + wa / 2, rec = 2.2, top = 0.3 + NA * FH;
    box(wm + 0.3, 0.3, dm + 0.3, Tm, 0, 0.15, zC);
    box(wa, FH, dm - rec, Wm, xa, 0.3 + FH / 2, zC - rec / 2); // tầng trệt lùi tạo hiên
    { const s = new W3.Shape(); s.moveTo(-wa / 2, 0); s.lineTo(wa / 2, 0); s.lineTo(wa / 2, FH); s.lineTo(-wa / 2, FH); s.lineTo(-wa / 2, 0); const aw = (wa - 1.2) / 2; for (const sx of [-1, 1]) s.holes.push(archPath(sx * (aw / 2 + 0.3), 0, aw, FH - 0.5)); ext(s, 0.4, Am, xa, 0.3, zF - 0.4); }
    archWin(xa, 0.3 + 0.05, zF - rec + 0.02, 1.8, 2.6);
    box(wa, 0.3, dm, Tm, xa, 0.3 + FH + 0.15, zC); // sàn ban công
    for (let i = 1; i < NA; i++) {
      const yb = 0.3 + i * FH + 0.3;
      box(wa, FH - 0.3, dm - rec, Wm, xa, yb + (FH - 0.3) / 2, zC - rec / 2);
      archWin(xa - wa * 0.18, yb + 0.1, zF - rec + 0.02, 1.6, 2.5); box(1.6, 2.4, 0.06, woodL, xa + wa * 0.2, yb + 1.25, zF - rec + 0.04);
      ironRun(xa - wa / 2 + 0.1, zF - 0.05, xa + wa / 2 - 0.1, zF - 0.05, yb, 0.95); ironRun(xa - wa / 2 + 0.05, zF, xa - wa / 2 + 0.05, zF - rec, yb, 0.95); ironRun(xa + wa / 2 - 0.05, zF, xa + wa / 2 - 0.05, zF - rec, yb, 0.95);
      for (const sx of [-1, 1]) { const l = new W3.Mesh(new W3.SphereGeometry(0.1, 8, 6), lampM); l.position.set(xa + sx * (wa / 2 + 0.05), yb + 1.9, zF - 0.6); house.add(l); }
      // tường hai bên ban công để mái che
      for (const sx of [-1, 1]) box(0.3, FH - 0.3, rec, Wm, xa + sx * (wa / 2 - 0.15), yb + (FH - 0.3) / 2, zF - rec / 2);
      archWin(-wm / 2 - 0.02, yb + 0.4, zC - 1.5, 1.2, 2.0, -Math.PI / 2);
    }
    archWin(-wm / 2 - 0.02, 0.6, zC - 1.5, 1.2, 2.2, -Math.PI / 2);
    // bậc tam cấp cong
    for (let k = 0; k < 3; k++) { const c = new W3.Mesh(new W3.CylinderGeometry(2.4 - k * 0.45, 2.4 - k * 0.45, 0.15, 32, 1, false, -Math.PI / 2, Math.PI), stone); c.position.set(xa, 0.075 + k * 0.15, zF + 0.1); c.receiveShadow = true; house.add(c); }
    // cánh B 1 tầng (bên phải) cửa vòm lớn
    const wb = wm - wa, xb = wm / 2 - wb / 2, db = dm - 0.8, zb = zF - 0.8 - db / 2, hb = FH + 0.4;
    box(wb, hb, db, Wm, xb, 0.3 + hb / 2, zb);
    const nb = Math.max(1, Math.min(3, Math.floor(wb / 2.6)));
    for (let k = 0; k < nb; k++) archWin(xb - wb / 2 + wb * (k + 0.5) / nb, 0.35, zF - 0.78, Math.min(2.0, wb / nb - 0.8), hb - 0.6);
    archWin(wm / 2 + 0.02, 0.5, zb, 1.4, hb - 1.0, Math.PI / 2);
    flowers(xa - wa / 2 + 1.0, zF + 0.6, 1.6, 0.6); flowers(xa + wa / 2 - 1.0, zF + 0.6, 1.6, 0.6); flowers(xb, zF + 0.1, wb - 1, 0.6);
    // mái: khối A + cánh B
    let H;
    if (roof === "bang") { box(wa, 0.9, dm, Wm, xa, top + 0.45, zC); box(wb, 0.9, db, Wm, xb, 0.3 + hb + 0.45, zb); H = top + 1; }
    else {
      const k = roof === "nhat" ? 0.3 : 0.48, over = roof === "nhat" ? 0.9 : 0.7;
      H = hipFull(wa, dm, Math.min(wa, dm) * k, over, xa, top, zC);
      hipFull(wb + 0.2, db, Math.min(wb, db) * k * 0.9, over, xb + 0.1, 0.3 + hb, zb);
    }
    flushBars(); house = root;
    // chòi nghỉ bát giác + bàn ghế + lối đá
    const gzx = -LW / 2 + 2.9, gzz = zC - 0.5;
    if (OX - wm / 2 + LW / 2 > 6) {
      const c = new W3.Mesh(new W3.CylinderGeometry(2.0, 2.0, 0.3, 8), paveL); c.position.set(gzx, 0.15, gzz); house.add(c);
      for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + Math.PI / 8; box(0.16, 2.5, 0.16, woodL, gzx + Math.cos(a) * 1.7, 1.55, gzz + Math.sin(a) * 1.7); }
      const r = new W3.Mesh(new W3.ConeGeometry(2.45, 1.5, 8), mat("roof")); r.position.set(gzx, 3.6, gzz); r.rotation.y = Math.PI / 8; r.castShadow = true; house.add(r);
      cyl(0.6, 0.06, woodL, gzx, 0.95, gzz); cyl(0.08, 0.65, woodL, gzx, 0.62, gzz);
      for (let k = 0; k < 7; k++) box(0.8, 0.05, 0.45, paveL, gzx + 0.8 + k * 0.55, 0.1, gzz + 2.3 + k * 0.7);
      for (const [dx, dz] of [[1.1, 0.4], [-1.0, 0.6], [0.2, -1.1]]) box(0.42, 0.45, 0.42, woodL, gzx + dx, 0.5, gzz + dz);
    }
    // cây xanh, cây hoa
    for (const [x, z, s] of [[LW / 2 - 1.4, -LD / 2 + 1.8, 1.2], [-LW / 2 + 1.6, LD / 2 - 1.8, 1.2], [-LW / 2 + 1.5, -LD / 2 + 1.6, 1.3], [-LW / 2 + 4.5, LD / 2 - 4, 1.0]]) tree(x, z, s);
    for (const [x, z] of [[-LW / 2 + 1.2, gzz - 3], [gx - gate / 2 - 1.2, LD / 2 - 1.2], [-LW / 2 + 1.3, LD / 2 - 5]]) { const b = new W3.Mesh(new W3.IcosahedronGeometry(0.9, 1), flowerP); b.position.set(x, 0.85, z); b.castShadow = true; house.add(b); const b2 = new W3.Mesh(new W3.IcosahedronGeometry(0.6, 1), leaf); b2.position.set(x + 0.5, 0.6, z + 0.3); house.add(b2); }
    flushBars();
    return H;
  }
  /* --- PHÒNG: tường cắt mở phía camera, đồ nội thất đơn giản --- */
  let roomWalls = [], roomCeil = null;
  function buildRoom(W, D, H, type) {
    const Wm = mat("wall"), Am = mat("accent"), Tm = mat("trim"), Cm = mat("roof"), t = 0.12;
    roomWalls = [];
    box(W + 2 * t, 0.06, D + 2 * t, floorW, 0, 0.03, 0);
    const mk = (nx, nz, len, m) => { // tường + len chân tường + phào trần
      const g = new W3.Group(); house.add(g); const along = nz !== 0;
      const sx = along ? len : t, sz = along ? t : len, px = nx * (W / 2 + t / 2), pz = nz * (D / 2 + t / 2);
      box(sx, H, sz, m, px, H / 2, pz, g);
      const ix = px - nx * (t / 2 + 0.015), iz = pz - nz * (t / 2 + 0.015);
      box(along ? len : 0.03, 0.12, along ? 0.03 : len, Tm, ix, 0.06 + 0.03, iz, g);
      box(along ? len : 0.08, 0.1, along ? 0.08 : len, Tm, px - nx * (t / 2 + 0.04), H - 0.05, pz - nz * (t / 2 + 0.04), g);
      roomWalls.push({ g, n: new W3.Vector3(nx, 0, nz), d: nx ? W / 2 : D / 2 }); return g;
    };
    const back = mk(0, -1, W + 2 * t, Am), front = mk(0, 1, W + 2 * t, Wm), left = mk(-1, 0, D, Wm), right = mk(1, 0, D, Wm);
    roomCeil = new W3.Group(); house.add(roomCeil); box(W + 2 * t, 0.08, D + 2 * t, Cm, 0, H + 0.04, 0, roomCeil);
    // cửa sổ + rèm (tường trái), cửa đi (tường phải)
    const ww = Math.min(2.2, D * 0.45), wy = 1.55;
    box(0.06, 1.6, ww + 0.16, Tm, -W / 2 + 0.01, wy, -D * 0.1, left); box(0.04, 1.44, ww, glass, -W / 2 + 0.03, wy, -D * 0.1, left);
    for (const sz of [-1, 1]) box(0.05, H - 0.5, 0.45, curtain, -W / 2 + 0.12, (H - 0.5) / 2 + 0.25, -D * 0.1 + sz * (ww / 2 + 0.2), left);
    box(0.06, 2.3, 1.05, Tm, W / 2 - 0.01, 1.15, D / 2 - 1.0, right); box(0.05, 2.2, 0.9, wood, W / 2 - 0.04, 1.1, D / 2 - 1.0, right);
    // đèn trần + ánh sáng ấm
    const lamp = new W3.Mesh(new W3.CylinderGeometry(0.35, 0.35, 0.06, 24), lampM); lamp.position.set(0, H - 0.04, 0); roomCeil.add(lamp);
    const pl = new W3.PointLight("#ffe7c2", 0.55, Math.max(W, D) * 2.2); pl.position.set(0, H - 0.4, 0); house.add(pl);
    box(Math.min(W * 0.6, 3), 0.02, Math.min(D * 0.4, 2.2), rug, 0, 0.07, -D * 0.05);
    const zb = -D / 2;
    if (type === "ngu") {
      const bw = Math.min(1.8, W * 0.5), bl = 2.1;
      box(bw + 0.1, 1.1, 0.1, wood, 0, 0.55, zb + 0.06); box(bw, 0.35, bl, wood, 0, 0.2, zb + 0.1 + bl / 2);
      box(bw - 0.06, 0.22, bl - 0.06, fabric2, 0, 0.48, zb + 0.1 + bl / 2); box(bw - 0.1, 0.08, bl * 0.55, fabric, 0, 0.62, zb + 0.1 + bl * 0.7);
      for (const sx of [-0.45, 0.45]) box(bw * 0.38, 0.14, 0.4, fabric2, sx * bw * 0.55, 0.66, zb + 0.4);
      for (const sx of [-1, 1]) { box(0.45, 0.5, 0.4, wood, sx * (bw / 2 + 0.35), 0.25, zb + 0.3); cyl(0.12, 0.35, lampM, sx * (bw / 2 + 0.35), 0.68, zb + 0.3); }
      box(0.6, 2.2, Math.min(2, D * 0.4), wood, W / 2 - 0.32, 1.1, -D * 0.15);
    } else {
      const sw = Math.min(2.4, W * 0.6);
      box(sw, 0.42, 0.9, fabric, 0, 0.21, zb + 0.5); box(sw, 0.5, 0.2, fabric, 0, 0.62, zb + 0.15);
      for (const sx of [-1, 1]) box(0.2, 0.6, 0.9, fabric, sx * (sw / 2 - 0.1), 0.3, zb + 0.5);
      for (let k = 0; k < 3; k++) box(0.42, 0.34, 0.12, fabric2, -sw / 3 + k * sw / 3, 0.6, zb + 0.33);
      box(1.1, 0.06, 0.6, wood, 0, 0.42, zb + 1.7); for (const [lx, lz] of [[-0.5, -0.25], [0.5, -0.25], [-0.5, 0.25], [0.5, 0.25]]) box(0.05, 0.39, 0.05, dark, lx, 0.2, zb + 1.7 + lz);
      box(0.45, 0.5, Math.min(2.2, D * 0.45), wood, W / 2 - 0.25, 0.25, -D * 0.1); box(0.06, 0.75, 1.3, dark, W / 2 - 0.08, 1.25, -D * 0.1, right);
      const pot = cyl(0.18, 0.4, mat("pot", "#d6cbb8"), -W / 2 + 0.4, 0.2, zb + 0.45); const f = new W3.Mesh(new W3.IcosahedronGeometry(0.42, 1), leaf); f.position.set(-W / 2 + 0.4, 0.85, zb + 0.45); house.add(f);
    }
    return H;
  }
  const _v = new W3.Vector3();
  function cutaway() {
    roomWalls.forEach((w) => { _v.copy(camera.position); w.g.visible = _v.dot(w.n) < w.d + 0.2; });
    if (roomCeil) roomCeil.visible = camera.position.y < dims.H + 0.2;
  }
  function roomSchemes(o) {
    const wh = C("kim", 0);
    if (!o) return [
      { wall: C("tho", 0), accent: C("tho", 2), trim: wh, roof: wh },
      { wall: C("kim", 1), accent: C("thuy", 2), trim: wh, roof: wh },
      { wall: C("moc", 0), accent: C("moc", 3), trim: wh, roof: wh },
      { wall: C("hoa", 1), accent: C("hoa", 3), trim: wh, roof: wh },
    ].map((x, i) => Object.assign(x, { name: T.gNames[i] }));
    const S = M.mau[M.quanHe[o.k].sinh], B = M.mau[o.k], white = M.quanHe[o.k].khac !== "kim" ? wh : B[0];
    return [
      { wall: S[0], accent: S[2], trim: white, roof: white },
      { wall: B[0], accent: B[2], trim: white, roof: white },
      { wall: white, accent: S[3], trim: S[0], roof: white },
      { wall: S[1], accent: B[1], trim: white, roof: white },
    ].map((x, i) => Object.assign(x, { name: T.sNames[i] }));
  }
  function build() {
    scene.remove(house); house.traverse((o) => o.geometry && o.geometry.dispose()); house = new W3.Group(); scene.add(house);
    roomWalls = []; roomCeil = null;
    if (kind === "phong") {
      const W = Math.min(12, Math.max(2.5, v("n-w") || 4)), D = Math.min(15, Math.max(2.5, v("n-d") || 5)), H = Math.min(5, Math.max(2.4, v("n-h") || 3.2));
      buildRoom(W, D, H, $("#n-room").value); dims = { w: W, d: D, H }; paint(); legend(); return;
    }
    if (kind !== "pho") {
      const LW = Math.min(40, Math.max(10, v("n-w") || 16)), LD = Math.min(60, Math.max(14, v("n-d") || 24)), Y = Math.min(LD - 10, Math.max(2, v("n-y") || 5));
      const N = Math.round(Math.min(kind === "vuon" ? 2 : 4, Math.max(1, v("n-f") || 1))), FH = Math.min(5, Math.max(2.8, v("n-h") || 3.6)), NW = Math.round(Math.min(4, Math.max(1, v("n-win") || 2)));
      box(LW + 0.4, 0.06, LD + 0.4, pave, 0, 0.03, 0); box(Math.max(LW + 16, 30), 0.04, 6, road, 0, 0.02, LD / 2 + 3.2);
      const H = kind === "bietthu" ? buildVilla(LW, LD, Y, N, FH, NW, $("#n-roof").value, $("#n-balc").checked && N > 1) : buildGarden(LW, LD, Y, N, FH, NW, $("#n-roof").value);
      compass(LW, LD); dims = { w: LW * 0.75, d: LD * 0.75, H }; paint(); legend(); return;
    }

    const LW = Math.min(30, Math.max(3, v("n-w") || 5)), LD = Math.min(60, Math.max(6, v("n-d") || 18)), Y = Math.min(LD - 4, Math.max(0, v("n-y") || 0));
    const N = Math.round(Math.min(7, Math.max(1, v("n-f") || 1))), FH = Math.min(5, Math.max(2.8, v("n-h") || 3.6)), NW = Math.round(Math.min(6, Math.max(0, v("n-win") || 0)));
    const roof = $("#n-roof").value, balc = $("#n-balc").checked && N > 1, side = $("#n-side").checked;
    const w = LW - (side ? 1.2 : 0.02), d = LD - Y - (side ? 1 : 0), zF = LD / 2 - Y, zC = zF - d / 2; // mặt tiền hướng +Z
    const Wm = mat("wall"), Am = mat("accent"), Tm = mat("trim"), Rm = mat("roof");
    // nền lô đất + đường
    box(LW + 0.4, 0.06, LD + 0.4, pave, 0, 0.03, 0); box(Math.max(LW + 16, 30), 0.04, 6, road, 0, 0.02, LD / 2 + 3.2);
    // các tầng
    for (let i = 0; i < N; i++) {
      const y0 = i * FH;
      box(w, FH - 0.2, d, Wm, 0, y0 + (FH - 0.2) / 2, zC);
      box(w + 0.16, 0.2, d + 0.16, Tm, 0, y0 + FH - 0.1, zC); // gờ sàn (phào)
      // cửa & cửa sổ mặt tiền
      const zf = zF + 0.03;
      if (i === 0) {
        const dw = Math.min(w * 0.5, 3.2); box(dw + 0.24, 2.84, 0.12, Tm, -w * 0.12, 1.42, zf); box(dw, 2.7, 0.1, wood, -w * 0.12, 1.37, zf + 0.03);
        if (w > 4.2) { box(1.3, 1.5, 0.12, Tm, w / 2 - 1.1, 1.6, zf); box(1.14, 1.34, 0.1, glass, w / 2 - 1.1, 1.6, zf + 0.03); }
      } else if (NW) {
        const ww = Math.min(1.4, (w - 0.8) / NW - 0.4), wh = Math.min(1.8, FH - 1.3), step = (w - 0.4) / NW;
        for (let j = 0; j < NW; j++) { const x = -w / 2 + 0.2 + step * (j + 0.5); box(ww + 0.18, wh + 0.18, 0.12, Tm, x, y0 + 1.0 + wh / 2, zf); box(ww, wh, 0.1, glass, x, y0 + 1.0 + wh / 2, zf + 0.03); }
      }
      if (side && d > 5) for (const sx of [-1, 1]) for (let j = 0; j < Math.max(1, Math.floor(d / 5)); j++) {
        const z = zF - 2.5 - j * 5; if (z < zF - d + 1.5) continue;
        box(0.12, 1.5, 1.3, Tm, sx * (w / 2 + 0.03), y0 + 1.6, z); box(0.1, 1.34, 1.14, glass, sx * (w / 2 + 0.06), y0 + 1.6, z);
      }
      // ban công
      if (balc && i > 0) {
        box(w, 0.18, 1.2, Tm, 0, y0 + 0.09, zF + 0.6);
        box(w, 1.0, 0.05, rail, 0, y0 + 0.68, zF + 1.17); box(w, 0.06, 0.1, Tm, 0, y0 + 1.2, zF + 1.17);
      }
    }
    const top = N * FH;
    // mảng nhấn: 2 trụ góc mặt tiền + mảng ốp dọc từ tầng 2
    box(0.34, top, 0.14, Am, -w / 2 + 0.17, top / 2, zF + 0.06); box(0.34, top, 0.14, Am, w / 2 - 0.17, top / 2, zF + 0.06);
    if (N > 1) box(Math.min(1.2, w * 0.22), top - FH, 0.1, Am, w / 2 - 0.34 - Math.min(1.2, w * 0.22) / 2, FH + (top - FH) / 2, zF + 0.05);
    // mái
    let H = top;
    if (roof === "bang") {
      box(w, 1.0, d, Wm, 0, top + 0.5, zC); box(w - 0.4, 1.0, d - 0.4, mat("floor", "#cfc9bd"), 0, top + 0.52, zC); // lan can mái
      box(w + 0.2, 0.14, d + 0.2, Tm, 0, top + 1.07, zC);
      const tw = Math.min(w - 0.6, 4), td = Math.min(d * 0.35, 6), tz = zC - d / 2 + td / 2 + 0.3;
      box(tw, 2.8, td, Wm, 0, top + 1.4, tz); const r = hip(tw, td, 0.9, 0.35, Rm); r.position.set(0, top + 2.8, tz); house.add(r);
      H = top + 3.7;
    } else {
      const over = roof === "nhat" ? 0.9 : 0.5, rh = roof === "nhat" ? Math.min(w, d) * 0.22 : Math.min(w, d) * 0.45;
      box(w + over * 2, 0.16, d + over * 2, Tm, 0, top + 0.08, zC);
      const r = hip(w, d, rh, over, Rm); r.position.set(0, top + 0.16, zC); house.add(r); H = top + rh;
    }
    compass(LW, LD);
    dims = { w: Math.max(LW, 4), d: LD, H };
    paint(); legend();
  }
  function compass(LW, LD) {
    const face = $("#n-face").value, ang = DIRS.indexOf(face) * Math.PI / 4; // hướng nhà so với Bắc (theo chiều kim đồng hồ)
    const fa = arrow(4, "#b5532a"); fa.position.set(0, 0.04, LD / 2 + 0.3); house.add(fa);
    const fl = label(T.dirs[face], "#b5532a", 1.2); fl.position.set(0, 1.2, LD / 2 + 6.6); house.add(fl);
    // Bắc: mặt tiền (+Z) là hướng "face" → Bắc nằm ở góc -ang so với +Z
    const R = Math.max(LW, LD) / 2 + 6;
    const na = arrow(2.2, "#1b2333"); na.rotation.y = Math.atan2(Math.sin(ang), Math.cos(ang)); na.position.set(Math.sin(ang) * (R - 3), 0.05, Math.cos(ang) * (R - 3)); house.add(na);
    const nl = label(T.northTag, "#1b2333", 1.3); nl.position.set(Math.sin(ang) * R, 1.0, Math.cos(ang) * R + (face === "N" ? 3 : 0)); house.add(nl);
  }
  function setColors(s) { cur = { wall: s.wall, accent: s.accent, trim: s.trim, roof: s.roof }; paint(); legend(); swatches(); }
  function paint() { if (!cur) return; ["wall", "accent", "trim", "roof"].forEach((k) => mat(k).color.set(cur[k][0]).convertSRGBToLinear()); }
  function legend() {
    if (!cur) return;
    host.querySelector(".n3-legend").innerHTML = `<b>${T.used}:</b> ` + ["wall", "accent", "trim", "roof"].map((k) => `<span><i style="background:${cur[k][0]}"></i>${PN()[k]}: ${cur[k][1]} – ${cur[k][li]}</span>`).join("");
  }
  /* ---------- Phương án & tùy chỉnh ---------- */
  function refresh() {
    O = owner();
    const ss = schemes(O);
    $(".n3-info").innerHTML = O ? T.menh(M.hanh[O.k][lg], O.nap) : T.general;
    $(".n3-schemes").innerHTML = ss.map((s, i) => `<button type="button" class="n3-sc" data-i="${i}"><span class="n3-chips">${["wall", "accent", "trim", "roof"].map((k) => `<i style="background:${s[k][0]}" title="${PN()[k]}"></i>`).join("")}</span><b>${s.name}</b><small>${s.wall[1]} · ${s.accent[1]} · ${s.roof[1]}</small></button>`).join("");
    $$(".n3-sc").forEach((b) => b.addEventListener("click", () => { $$(".n3-sc").forEach((x) => x.classList.toggle("on", x === b)); setColors(ss[+b.dataset.i]); }));
    $$(".n3-sc")[0].click();
    faceInfo();
  }
  function faceInfo() {
    const face = $("#n-face").value, fb = $(".n3-face");
    if (kind === "phong") { fb.className = "n3-face"; fb.innerHTML = ""; return; }
    if (O) {
      const sao = BT.sao[lg] || BT.sao.vi, gi = BT.tot[O.kua].indexOf(face), bi = BT.xau[O.kua].indexOf(face);
      fb.className = "n3-face " + (gi >= 0 ? "ok" : "no");
      fb.innerHTML = gi >= 0 ? T.faceGood(T.dirs[face], sao.tot[gi][0]) : T.faceBad(T.dirs[face], sao.xau[bi][0]) + ` (${BT.tot[O.kua].map((d) => T.dirs[d]).join(", ")})`;
    } else { fb.className = "n3-face"; fb.innerHTML = ""; }
  }
  function swatches() {
    $(".n3-parts").innerHTML = ["wall", "accent", "trim", "roof"].map((k) => `<button type="button" data-p="${k}" class="${k === part ? "on" : ""}">${cur ? `<i style="background:${cur[k][0]}"></i>` : ""}${PN()[k]}</button>`).join("");
    $$(".n3-parts button").forEach((b) => b.addEventListener("click", () => { part = b.dataset.p; swatches(); }));
    const rel = O ? M.quanHe[O.k] : null;
    $(".n3-sw").innerHTML = ALL.map(({ el, c }, i) => {
      const tag = rel ? (el === rel.sinh || el === O.k ? `<em class="g">${T.good}</em>` : el === rel.khac ? `<em class="b">${T.bad}</em>` : "") : "";
      return `<button type="button" data-i="${i}" class="${cur && cur[part][1] === c[1] ? "on" : ""}" title="${c[1]} – ${c[li]}"><i style="background:${c[0]}"></i><span>${c[1]}</span>${tag}</button>`;
    }).join("");
    $$(".n3-sw button").forEach((b) => b.addEventListener("click", () => { cur[part] = ALL[+b.dataset.i].c; $$(".n3-sc").forEach((x) => x.classList.remove("on")); paint(); legend(); swatches(); }));
  }
  /* ---------- Camera ---------- */
  let anim = null;
  function goView(k, instant) {
    const r = kind === "phong" ? Math.max(dims.w, dims.d) * 1.25 + 3 : Math.max(dims.w, dims.d * 0.75, dims.H) * 1.9 + 8, cy = dims.H * 0.45;
    const P = { front: [0, cy + 2, r], corner: [(kind === "vuon" ? -1 : 1) * r * 0.72, cy + r * 0.35, r * 0.72], side: [r, cy + 2, 0], top: [r * 0.15, r * 1.1, r * 0.45] }[k];
    const to = new W3.Vector3(...P), tgt = new W3.Vector3(0, cy, 0);
    if (instant) { camera.position.copy(to); controls.target.copy(tgt); return; }
    const from = camera.position.clone(), f2 = controls.target.clone(), t0 = performance.now();
    anim = (t) => { const a = Math.min(1, (t - t0) / 700), e = a < 0.5 ? 2 * a * a : 1 - Math.pow(-2 * a + 2, 2) / 2; camera.position.lerpVectors(from, to, e); controls.target.lerpVectors(f2, tgt, e); if (a >= 1) anim = null; };
  }
  $$(".n3-bar [data-v]").forEach((b) => b.addEventListener("click", () => { controls.autoRotate = false; $(".n3-bar [data-spin]").classList.remove("on"); goView(b.dataset.v); }));
  $(".n3-bar [data-spin]").addEventListener("click", (e) => { controls.autoRotate = !controls.autoRotate; e.currentTarget.classList.toggle("on", controls.autoRotate); });
  $(".n3-bar [data-shot]").addEventListener("click", () => { renderer.render(scene, camera); const a = document.createElement("a"); a.href = renderer.domElement.toDataURL("image/png"); a.download = "tung-son-phoi-mau-3d.png"; a.click(); });
  function resize() { const r = view.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / r.height; camera.updateProjectionMatrix(); }
  new ResizeObserver(resize).observe(view);
  (function loop(t) { requestAnimationFrame(loop); if (anim) anim(t); controls.update(); if (kind === "phong") cutaway(); renderer.render(scene, camera); })(0);
  /* ---------- Events ---------- */
  const form = $(".n3-form");
  const geomIds = ["n-room", "n-w", "n-d", "n-y", "n-f", "n-h", "n-win", "n-roof", "n-balc", "n-side", "n-face"];
  let tmr; form.addEventListener("input", (e) => {
    const id = e.target.id; clearTimeout(tmr);
    tmr = setTimeout(() => {
      if (geomIds.includes(id)) { build(); if (id === "n-face") faceInfo(); }
      else if (["n-bd", "n-bm", "n-g"].includes(id) || (id === "n-by" && String(e.target.value).length === 4)) refresh();
    }, 150);
  });
  $$(".n3-types button").forEach((b) => b.addEventListener("click", () => setKind(b.dataset.t)));
  build(); refresh(); resize(); goView("corner", true);
})();
