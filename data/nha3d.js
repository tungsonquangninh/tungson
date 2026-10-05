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
      gNames: ["Kem ấm – mái đỏ", "Trắng xám hiện đại", "Xanh biển mát", "Xanh ngọc tự nhiên"],
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
      gNames: ["Warm cream – red roof", "Modern white & grey", "Cool sea blue", "Natural mint"],
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
      gNames: ["暖米色 – 红顶", "现代白灰", "清爽海蓝", "自然薄荷绿"],
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
    bietthu: { "n-w": 16, "n-d": 24, "n-y": 6, "n-f": 2, "n-h": 3.6, "n-win": 2, "n-roof": "thai", "n-balc": true },
    vuon: { "n-w": 18, "n-d": 24, "n-y": 8, "n-f": 1, "n-h": 3.8, "n-win": 2, "n-roof": "nhat", "n-balc": false },
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
  /* --- BIỆT THỰ: khối chính + sảnh lồi có cột, ban công con tiện, sân vườn, tường rào --- */
  function buildVilla(LW, LD, Y, N, FH, NW, roof, balc) {
    const Wm = mat("wall"), Am = mat("accent"), Tm = mat("trim");
    site(LW, LD, 4);
    const wm = Math.max(7, Math.min(LW - 4, 15)), dm = Math.max(6, Math.min(LD - Y - 3, 13)), zF = LD / 2 - Y, zC = zF - dm / 2;
    const bw = Math.min(5, wm * 0.34), bd = 1.8, top = N * FH, wing = (wm - bw) / 2;
    box(wm + 0.6, 0.5, dm + 0.6, Tm, 0, 0.25, zC); // bệ nền
    for (let i = 0; i < N; i++) {
      const y0 = 0.5 + i * FH, wh = Math.min(2.0, FH - 1.2), n = Math.max(1, Math.min(NW, Math.floor(wing / 1.8)));
      box(wm, FH - 0.2, dm, Wm, 0, y0 + (FH - 0.2) / 2, zC); box(wm + 0.2, 0.2, dm + 0.2, Tm, 0, y0 + FH - 0.1, zC);
      for (const sx of [-1, 1]) for (let j = 0; j < n; j++) win(sx * (bw / 2 + wing * (j + 0.5) / n), y0 + 0.9 + wh / 2, zF + 0.03, Math.min(1.4, wing / n - 0.5), wh, "z", 1);
      for (let j = 0; j < Math.max(1, Math.floor(dm / 4)); j++) { const z = zF - 2 - j * 4; if (z < zF - dm + 1.2) continue; for (const sx of [-1, 1]) win(sx * (wm / 2 + 0.03), y0 + 0.9 + wh / 2, z, 1.2, wh, "x", sx); }
      for (let j = 0; j < Math.max(1, Math.floor(wm / 3.5)); j++) win(-wm / 2 + 1.75 + j * 3.5, y0 + 0.9 + wh / 2, zF - dm - 0.03, 1.2, wh, "z", -1);
      if (balc && i > 0) for (const sx of [-1, 1]) {
        const cx = sx * (bw / 2 + wing / 2), bwid = wing - 0.4;
        box(bwid, 0.18, 1.3, Tm, cx, y0 + 0.09, zF + 0.65);
        for (let k = 0; k <= Math.floor(bwid / 0.3); k++) cyl(0.05, 0.8, Tm, cx - bwid / 2 + 0.1 + k * 0.3, y0 + 0.58, zF + 1.22);
        box(bwid, 0.1, 0.16, Tm, cx, y0 + 1.03, zF + 1.22);
      }
    }
    const zb = zF + bd / 2;
    if (N > 1) box(bw, top - FH, bd, Am, 0, 0.5 + FH + (top - FH) / 2, zb);
    box(bw + 0.3, 0.3, bd + 0.3, Tm, 0, 0.5 + FH - 0.05, zb);
    for (const sx of [-1, 1]) for (const zz of [zF + bd - 0.25, zF + 0.4]) cyl(0.2, FH - 0.3, Tm, sx * (bw / 2 - 0.25), 0.5 + (FH - 0.3) / 2, zz);
    box(2.44, 2.9, 0.12, Tm, 0, 0.5 + 1.45, zF + 0.03); box(2.2, 2.8, 0.1, wood, 0, 0.5 + 1.4, zF + 0.06);
    for (let i = 1; i < N; i++) { const y0 = 0.5 + i * FH, wh = Math.min(2.2, FH - 1.0); win(0, y0 + 0.7 + wh / 2, zF + bd + 0.03, bw * 0.55, wh, "z", 1); }
    for (let k = 0; k < 3; k++) box(bw + 1.2 - k * 0.3, 0.17, 0.4, stone, 0, 0.085 + k * 0.17, zF + bd + 1.0 - k * 0.35);
    let H = roofOn(wm, dm, 0.5 + top, zC, roof);
    if (roof !== "bang") { box(bw + 0.8, 0.16, bd + 2.8, Tm, 0, 0.5 + top + 0.02, zF + bd / 2 - 0.4); const r = hip(bw, bd + 2, Math.min(bw, bd + 2) * 0.45, 0.4, mat("roof")); r.position.set(0, 0.5 + top + 0.1, zF + bd / 2 - 0.4); house.add(r); }
    else box(bw, 1.0, bd, Am, 0, 0.5 + top + 0.5, zb);
    const pl = LD / 2 - (zF + bd + 1.2); if (pl > 0.3) box(3.2, 0.05, pl, stone, 0, 0.1, LD / 2 - pl / 2);
    for (const sx of [-1, 1]) { hedge(sx * (bw / 2 + wing / 2 + 0.3), zF + bd + 0.6, wing - 1, 0.8); tree(sx * (LW / 2 - 1.6), LD / 2 - 1.8, 1.25); tree(sx * (LW / 2 - 1.5), zC - 1, 1.1); }
    return H + 0.5;
  }
  /* --- NHÀ SÂN VƯỜN: nền cao, hiên rộng có cột, mái phủ cả hiên, sân cỏ nhiều cây --- */
  function buildGarden(LW, LD, Y, N, FH, NW, roof) {
    const Wm = mat("wall"), Am = mat("accent"), Tm = mat("trim"), Rm = mat("roof");
    site(LW, LD, 3.6);
    const wm = Math.max(8, Math.min(LW - 4, 16)), dm = Math.max(6, Math.min(LD - Y - 4, 11)), hv = 2.4;
    const zF = LD / 2 - Y - hv, zC = zF - dm / 2, top = 0.45 + N * FH;
    box(wm + 0.4, 0.45, dm + hv + 0.4, Tm, 0, 0.225, zC + hv / 2);
    for (let i = 0; i < N; i++) {
      const y0 = 0.45 + i * FH, wh = Math.min(1.9, FH - 1.3), n = Math.max(1, NW), ww = Math.min(1.5, (wm / 2 - 2.6) / n - 0.4);
      box(wm, FH - 0.2, dm, Wm, 0, y0 + (FH - 0.2) / 2, zC); if (i < N - 1) box(wm + 0.2, 0.2, dm + 0.2, Tm, 0, y0 + FH - 0.1, zC);
      if (ww > 0.5) for (const sx of [-1, 1]) for (let j = 0; j < n; j++) win(sx * (2.0 + (wm / 2 - 2.6) * (j + 0.5) / n), y0 + 0.9 + wh / 2, zF + 0.03, ww, wh, "z", 1);
      for (let j = 0; j < Math.max(1, Math.floor(dm / 3.5)); j++) { const z = zF - 1.8 - j * 3.5; if (z < zF - dm + 1) continue; for (const sx of [-1, 1]) win(sx * (wm / 2 + 0.03), y0 + 0.9 + wh / 2, z, 1.2, wh, "x", sx); }
    }
    box(3.0, FH - 0.2, 0.1, Am, 0, 0.45 + (FH - 0.2) / 2, zF + 0.05);
    box(2.24, 2.6, 0.12, Tm, 0, 0.45 + 1.3, zF + 0.11); box(2.0, 2.5, 0.1, wood, 0, 0.45 + 1.25, zF + 0.15);
    const nc = Math.max(3, Math.round(wm / 2.6) + 1);
    for (let k = 0; k < nc; k++) { const x = -wm / 2 + 0.25 + k * (wm - 0.5) / (nc - 1); box(0.32, top - 0.55, 0.32, Am, x, 0.45 + (top - 0.55) / 2, zF + hv - 0.2); box(0.44, 0.2, 0.44, Tm, x, 0.55, zF + hv - 0.2); }
    box(wm + 0.2, 0.3, 0.3, Tm, 0, top - 0.15, zF + hv - 0.2);
    for (let k = 0; k < 3; k++) box(3.2 - k * 0.3, 0.15, 0.35, stone, 0, 0.075 + k * 0.15, zF + hv + 0.6 - k * 0.3);
    let H;
    if (roof === "bang") { box(wm + 0.3, 0.25, dm + hv + 0.3, Tm, 0, top + 0.12, zC + hv / 2); box(wm, 0.8, dm, Wm, 0, top + 0.65, zC); H = top + 1.1; }
    else { const over = roof === "nhat" ? 1.0 : 0.6, dd = dm + hv, rh = Math.min(wm, dd) * (roof === "nhat" ? 0.24 : 0.4); box(wm + over * 2, 0.16, dd + over * 2, Tm, 0, top + 0.08, zC + hv / 2); const r = hip(wm, dd, rh, over, Rm); r.position.set(0, top + 0.16, zC + hv / 2); house.add(r); H = top + rh; }
    const pz0 = zF + hv + 1.0, pz1 = LD / 2;
    for (let z = pz0 + 0.5; z < pz1 - 0.3; z += 1.1) box(1.6, 0.05, 0.8, stone, 0, 0.1, z);
    for (const sx of [-1, 1]) {
      hedge(sx * (wm / 4 + 0.8), zF + hv + 1.4, wm / 2 - 2.6, 0.7);
      tree(sx * (LW / 2 - 1.8), LD / 2 - 2, 1.35); tree(sx * (LW / 2 - 2.2), (pz0 + pz1) / 2, 1.0); tree(sx * (LW / 2 - 1.6), zC - dm / 2 - 1.2, 1.2);
      box(1.6, 0.42, 0.5, stone, sx * (LW / 4 + 1), 0.21, (pz0 + pz1) / 2 + 0.6);
    }
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
    const P = { front: [0, cy + 2, r], corner: [r * 0.72, cy + r * 0.35, r * 0.72], side: [r, cy + 2, 0], top: [r * 0.15, r * 1.1, r * 0.45] }[k];
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
