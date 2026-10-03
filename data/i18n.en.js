/* English translations – Tung Son Quang Ninh */
window.I18N = {
  cfg: {
    diaChi: "Quang Ninh, Vietnam",
    khuVuc: "Ha Long, Cam Pha, Uong Bi, Dong Trieu, Quang Yen, Mong Cai and all of Quang Ninh province",
    gioLamViec: "7:00 – 18:00, every day"
  },
  ui: {
    locale: "en-GB", news: "News", gocNhin: "Tung Son’s take:", source: "Source:", viewSource: "Original article", viOnly: "Vietnamese",
    readMore: "Read more →", month: (m) => ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m - 1], code: "Code", brand: "Brand", line: "Product line", scope: "Use",
    spec: "Packing", howto: "How to apply", price: "Price", priceVal: "Contact us for the best price", callQuote: "Call for a quote", zalo: "Message on Zalo",
    allProducts: "All products", type: "Type", all: "All", area: "Area", noi: "Interior", ngoai: "Exterior",
    count: (n) => n + (n === 1 ? " product" : " products"), empty: "No matching products. Try another filter.", brandCount: (n) => n + " products · View all →",
    updated: "Updated ", lastUpdated: "Last updated: ", allArticles: "← All articles", ctaH: "Need advice for your home?",
    ctaP: "Free survey and quotation anywhere in Quang Ninh.", callNow: "Call now", otherArticles: "More articles",
    badPhone: "Please enter a valid phone number.", notConnected: (tel, ph) => `The form is not connected yet. Please call <a href="${tel}">${ph}</a> or message us on Zalo.`,
    thanks: "Thank you! Tung Son has received your request and will call you back shortly.", sendFail: (tel, ph) => `Could not send. Please call <a href="${tel}">${ph}</a>.`,
    cm: { "gia-vlxd": "Material prices", "thi-truong-son": "Paint market", "phap-ly": "Building rules", "xu-huong": "Colour trends", "quang-ninh": "Quang Ninh" },
    khu: { noi: "Interior", ngoai: "Exterior", ca2: "Interior & exterior" },
    cWall: "Wall area", cOpen: "Minus doors & windows", cCeil: "Ceiling area", cTotal: "Total area to paint",
    cTop: (c) => `Top coat (${c} coat${c > 1 ? "s" : ""})`, cPrimer: "Primer (1 coat)", cPutty: "Wall putty (2 coats)", cL: "litres", cKg: "kg",
    cPack: (n18, n5) => [n18 ? n18 + " × 18 L pail" : "", n5 ? n5 + " × 5 L can" : ""].filter(Boolean).join(" + "), cBag: (n) => n + " × 25 kg bag",
    cBuy: "Suggested", cIncl: (w) => `includes ${w}% waste allowance`, cErr: "Doors and windows are larger than the wall area — please check your numbers."
  },
  th: {
    netec: { slogan: "Paint that conquers time", ngan: "The NETEC Center range by Global Plus.",
      moTa: "NETEC Center is part of the Global Plus family: smooth finish, high coverage, low VOC and environmentally friendly. A complete system from wall putty and primers to interior & exterior top coats and waterproofing." },
    npaint: { slogan: "Creating green spaces", ngan: "N Paint Global offers the widest range.",
      moTa: "N Paint Global offers the widest range: alkali-resistant primers, matte, gloss, super gloss, premium enamel, waterproofing and gold metallic paint — covering every part of a home." }
  },
  loai: {
    botba: { ten: "Wall putty", moTa: "Levels the wall, fills hairline cracks and creates a smooth, firm base before priming.", dung: "Apply 2 thin coats on a dry wall, sand smooth, then prime." },
    lot: { ten: "Alkali-resistant primer", moTa: "Blocks alkali and salts from cement that cause blotching and chalking; improves adhesion so the top coat shows its true colour and lasts longer.", dung: "Apply 1 coat after putty, let dry as stated on the can, then apply top coats." },
    min: { ten: "Smooth matte paint", moTa: "Elegant smooth matte finish that hides wall imperfections well; easy to apply and economical.", dung: "Apply 2 top coats over primer." },
    bong: { ten: "Gloss paint", moTa: "Soft sheen, vivid colours and easy to wipe clean of everyday marks.", dung: "Apply 2 top coats over primer." },
    sieubong: { ten: "Super gloss paint", moTa: "High gloss, dirt-resistant and very washable — ideal for homes with children, hallways and living rooms.", dung: "Apply 2 top coats over alkali-resistant primer." },
    mensu: { ten: "Ultra-gloss enamel paint", moTa: "The premium line: a porcelain-like gloss, long-lasting colour and outstanding stain resistance and washability.", dung: "Apply 2 top coats over a primer from the same system." },
    sieutrang: { ten: "Super white paint", moTa: "Bright white with high coverage — ideal for ceilings and spaces that need more light.", dung: "Apply 2 coats on primed ceilings or walls." },
    chongtham: { ten: "Coloured waterproof paint", moTa: "Waterproofs and decorates exterior and vertical walls exposed to rain and wind.", dung: "Apply 2 coats on primed vertical walls as instructed." },
    chongthamxm: { ten: "Cement-mix waterproofing", moTa: "Mixed with cement to waterproof roof decks, gutters, bathrooms, water tanks and wall bases.", dung: "Mix with cement at the maker’s ratio and brush on 2–3 crossed coats." },
    nhu: { ten: "Gold metallic paint", moTa: "Luxurious metallic effect for mouldings, columns, gates and decorative details.", dung: "Apply on a primed surface by brush or spray." }
  },
  ghiChu: { "Bao 25kg": "25 kg bag" },
  spTen: (p, LOAI, KHU) => {
    const sub = p.ten.includes(" – ") ? " – " + p.ten.split(" – ")[1] : "";
    const where = p.khu === "ca2" ? (p.loai === "chongthamxm" || p.loai === "nhu" ? "" : "Interior & Exterior ") : KHU[p.khu] + " ";
    return `Premium ${where}${LOAI[p.loai].ten.replace(/\b\w/g, (c) => c.toUpperCase())} ${p.ma}${sub}`;
  },
  tin: {
    "https://sct.dongnai.gov.vn/vi/news/Quan-ly-cong-nghiep/thi-truong-phan-hoa-manh-son-cong-nghiep-dan-dat-giai-doan-2025-2026-54294.html": {
      tieuDe: "Paint market diverges; decorative paint slowly recovers",
      tomTat: "According to the Vietnam Paint & Printing Ink Association, paint output in 2024 reached nearly 500 million litres, up 8.34%. Decorative paint holds 51.5% of the market and is forecast to recover by about 9–10%, while industrial coatings lead growth.",
      gocNhin: "More new brands also means more low-quality products. Check the label and QR code, and buy from a seller with a clear address." },
    "https://doanhnghiephoinhap.vn/gia-thep-hom-nay-3092026-quang-sat-giam-manh-do-cau-tich-tru-ha-nhiet-150211.html": {
      tieuDe: "Domestic steel prices flat as iron ore falls sharply",
      tomTat: "On 30 September, construction steel was stable at roughly 13,840–15,150 VND/kg depending on brand and region. In the north, Viet Duc CB240 coil was about 14,650 VND/kg and Hoa Phat about 14,920 VND/kg. Global iron ore fell as stockpiling demand cooled.",
      gocNhin: "Steel prices are stable — a sensible time to lock in structural materials if your family plans to start building at year-end." },
    "https://baophapluat.vn/quang-ninh-tang-nguon-cung-nha-o-huong-toi-an-cu.html": {
      tieuDe: "Quang Ninh adjusts its housing development programme to 2030",
      tomTat: "Quang Ninh raises its target average floor area from 32.6 m² to 36 m² per person. In 2026–2030 the province needs over 2.42 million m² of additional social housing, with total capital of about 2,357 billion VND, to meet demand as urbanisation accelerates.",
      gocNhin: "Demand for new and renovated homes in the province remains high — the right time to invest in a protective paint system from day one." },
    "https://baoxaydung.vn/tieu-thu-xi-mang-noi-dia-thang-8-giam-do-mua-mua-nhung-van-tang-33-so-voi-cung-ky-192260918171620963.htm": {
      tieuDe: "August cement sales dip on rain but are up 33% year on year",
      tomTat: "Domestic cement consumption in August 2026 was about 7.63 million tonnes, down 7% from July due to heavy rain but up 33% year on year. Eight-month domestic consumption reached about 57.37 million tonnes; the market is expected to pick up as the weather improves.",
      gocNhin: "The dry season at year-end is peak building time — book painters and materials early to avoid price rises and delays." },
    "https://www.nbavietnam.net/vi/news/trang-tu-van/bang-bao-gia-vat-lieu-xay-dung-thang-9-nam-2026-cap-nhat-moi-nhat-1165.html": {
      tieuDe: "Sand, stone, cement and brick prices — September 2026",
      tomTat: "Reference prices for September: cement about 59,000–87,000 VND per 50 kg bag depending on brand; plastering sand about 205,000–215,000 VND/m³; 1×2 stone about 295,000–305,000 VND/m³; traditional fired bricks about 950–1,200 VND each. Actual prices vary by area and supplier.",
      gocNhin: "Get quotes in Quang Ninh close to your start date and compare at least 2–3 suppliers." },
    "https://luatvietnam.vn/tin-van-ban-moi/tu-01-7-2026-nha-o-rieng-le-duoi-7-tang-duoc-mien-giay-phep-xay-dung-186-106122-article.html": {
      tieuDe: "From 1 July 2026: private houses under 7 storeys exempt from building permits (with conditions)",
      tomTat: "Under the 2025 Construction Law (No. 135/2025/QH15), private houses under 7 storeys with a total floor area under 500 m² that are not in areas with special planning or architectural controls are exempt from building permits. Larger houses or those in controlled areas still need a permit.",
      gocNhin: "Exemption does not mean anything goes: you must still follow planning rules and keep neighbours safe. Check with your ward/commune office before starting." },
    "https://tuoitre.vn/phunuonline/7-mau-son-len-ngoi-nam-2026-1101564856.htm": {
      tieuDe: "7 paint colours on the rise in 2026",
      tomTat: "Olive green, warm sage, terracotta, copper ochre, sandstone beige, mahogany and midnight teal are the favoured shades — all warm, nature-inspired tones that bring a sense of calm.",
      gocNhin: "To follow the trend without it dating quickly: use beige or cream as the base and make one feature wall in olive or terracotta." },
    "https://tienphong.vn/xu-huong-mau-son-nha-2026-bang-hoa-sac-cua-su-sau-lang-va-ca-tinh-post1821457.tpo": {
      tieuDe: "2026 home colour trends: depth and personality",
      tomTat: "Four main directions for 2026: deep moody tones (bronze, plum, night black), nature palettes (clay, moss green), warm neutral bases (cream white, muted rose) replacing cool whites, and bold personal accents such as magenta, mustard and smoky blue.",
      gocNhin: "Dark shades are beautiful but can make a room gloomy — use them only in bright rooms or as an accent." }
  },
  kt: [
{ slug: "quy-trinh-son-nha-chuan", nhom: "Painting", anh: "assets/img/anh/hero-3.webp",
  tieuDe: "The proper 6-step house painting process — done right, it lasts a decade",
  tomTat: "Whether paint looks good and lasts depends about 70% on surface preparation. This is the process Tung Son’s team follows on every job.",
  noiDung: `<p>Many families think painting is just “rolling colour onto the wall”. In reality, whether a paint job stays beautiful or quickly peels and yellows depends mostly on the steps <strong>before</strong> the top coat is opened.</p>
<h3>Step 1 — Check the wall</h3><p>New walls need enough time to dry (usually about 3–4 weeks after plastering, depending on the weather). The wall must be dry, clean and free of dust and mould. A moisture meter helps — many manufacturers recommend wall moisture below about 16% before painting.</p>
<h3>Step 2 — Prepare the surface</h3><p>Scrape off excess mortar and loose old paint, treat mould and fill cracks. On old walls this is the most important step.</p>
<h3>Step 3 — Apply putty</h3><p>Apply 2 thin coats, let dry and sand smooth. Use dedicated exterior putty outdoors.</p>
<h3>Step 4 — Alkali-resistant primer</h3><p>The primer blocks alkali from cement (the cause of blotching and chalking), improves adhesion and lets the top coat show its true colour. <em>Skipping the primer to save money</em> is the most expensive saving of all.</p>
<h3>Step 5 — Two top coats</h3><p>Apply the first coat, wait the drying time stated on the can, then apply the second. Roll evenly in one direction for a uniform colour.</p>
<h3>Step 6 — Inspection and clean-up</h3><p>Check under natural light, touch up any uneven areas and clean up thoroughly before handover.</p>
<div class="note">Do not paint in rain, humid “nồm” weather or direct strong sun — paint may run, blister or dry too fast.</div>` },
{ slug: "chong-tham-nha-o-vung-bien", nhom: "Waterproofing", anh: "assets/img/anh/banner-npaint.webp",
  tieuDe: "Waterproofing homes in Quang Ninh: sea climate, storms and humid springs",
  tomTat: "Coastal homes face driving rain, salty wind and high humidity. Where to waterproof and the best time to do it.",
  noiDung: `<p>Quang Ninh has a long rainy and storm season and a humid spring, and many areas near the sea are exposed to salt air. Leaks don’t just ruin paint — they cause mould, affect health and damage the structure.</p>
<h3>5 places to waterproof first</h3><ul><li><strong>Roof decks, terraces and gutters:</strong> where water collects most.</li><li><strong>Bathrooms:</strong> waterproof the floor and the base of the walls before tiling.</li><li><strong>Walls facing the rain:</strong> wall faces that take driving rain directly.</li><li><strong>Wall bases:</strong> stop rising damp from the ground.</li><li><strong>Joints with neighbouring houses, around windows and service pipes.</strong></li></ul>
<h3>Choosing materials</h3><p><strong>Cement-mix waterproofing</strong> suits roof decks, bathrooms and water tanks (followed by tiles or a protective screed). <strong>Coloured waterproof paint</strong> is for exterior vertical walls — it waterproofs and is the finishing colour at the same time.</p>
<h3>When to do it</h3><p>Ideally in the dry season (roughly October to early the following year) when surfaces are dry. Waterproof during construction — fixing it later costs many times more.</p>
<div class="note">Tip: after waterproofing a roof deck or bathroom, flood-test it with water for 24–48 hours and check the ceiling below before tiling.</div>` },
{ slug: "cach-tinh-luong-son", nhom: "Estimating", anh: "assets/img/anh/hero-1.webp",
  tieuDe: "How to estimate how much paint your whole house needs",
  tomTat: "A simple formula to estimate the number of cans and avoid buying too much or running out halfway.",
  noiDung: `<h3>1. Work out the area</h3><p><strong>Wall area of a room</strong> = (Length + Width) × 2 × Height − Door and window area.<br><strong>Ceiling area</strong> = Length × Width.</p>
<p><em>Example:</em> a 4 m × 5 m room, 3.2 m high, with one door (0.9 × 2.2 m) and one window (1.2 × 1.4 m):<br>Walls = (4+5) × 2 × 3.2 − (1.98 + 1.68) ≈ <strong>54 m²</strong>; ceiling = <strong>20 m²</strong>.</p>
<h3>2. Check the spreading rate on the can</h3><p>Each product has its own spreading rate (m²/litre/coat or m²/kg/coat), printed on the can or technical sheet. Paint needed = Area × Number of coats ÷ Spreading rate.</p>
<h3>3. Add a margin</h3><p>Add about 5–10% for waste and touch-ups. Old or rough walls absorb more paint.</p>
<div class="note">The quickest way: send Tung Son your room sizes or drawings — we will estimate quantities for free and suggest a paint system that fits your budget.</div>` },
{ slug: "chon-son-min-bong-men-su", nhom: "Choosing paint", anh: "assets/img/anh/npaint-banner.webp",
  tieuDe: "Matte, gloss, super gloss or enamel — which paint for which room?",
  tomTat: "Understand the sheen levels to choose paint that looks good, cleans easily and fits your budget.",
  noiDung: `<table class="tbl"><thead><tr><th>Type</th><th>Characteristics</th><th>Best for</th></tr></thead><tbody>
<tr><td>Matte</td><td>Hides wall imperfections well, soft look, economical</td><td>Bedrooms, ceilings, rental homes</td></tr>
<tr><td>Gloss</td><td>Soft sheen, vivid colour, wipes clean of everyday marks</td><td>Living rooms, dining rooms</td></tr>
<tr><td>Super gloss</td><td>High gloss, stain-resistant, very washable</td><td>Homes with children, hallways, stairs</td></tr>
<tr><td>Enamel</td><td>Porcelain-like, luxurious, most colour-fast</td><td>Façades, premium living rooms</td></tr></tbody></table>
<p>Note: the glossier the paint, the more it “shows” wall defects — so puttying and sanding must be really smooth.</p>
<h3>Don’t mix up interior and exterior paint</h3><p>Exterior paint resists UV, sun, rain and mould better; interior paint prioritises safety and low odour. Using interior paint outside makes it fade and chalk quickly.</p>` },
{ slug: "luu-y-khi-xay-nha", nhom: "Building a home", anh: "assets/img/anh/phong-xanh.webp",
  tieuDe: "10 important things to know before building your family home",
  tomTat: "From legal paperwork and choosing a contractor to the right time for finishing paint — what to know before you break ground.",
  noiDung: `<ol><li><strong>Check the land’s legal status:</strong> land-use certificate, zoning and building lines.</li>
<li><strong>Building permit:</strong> from 1 July 2026, many private houses under 7 storeys with total floor area under 500 m² are exempt if they are not in areas with special architectural controls. Ask your ward/commune office about your exact case.</li>
<li><strong>Design:</strong> larger houses need a qualified designer — don’t just “copy the neighbour’s house”.</li>
<li><strong>Keep a 10–15% budget reserve</strong> for extras.</li>
<li><strong>A clear contract</strong> with your builder: scope, materials, schedule, warranty and staged payments.</li>
<li><strong>Timing:</strong> the dry season suits structural work and finishing.</li>
<li><strong>Waterproof during construction:</strong> roof decks, bathrooms and wall bases.</li>
<li><strong>Check materials</strong> as they arrive on site — labels and origin.</li>
<li><strong>Give walls enough time to dry</strong> before puttying and painting to avoid blistering and blotches.</li>
<li><strong>Keep invoices, warranty cards</strong> and as-built records.</li></ol>` },
{ slug: "son-lai-nha-cu", nhom: "Renovation", anh: "assets/img/anh/phong-xam.webp",
  tieuDe: "Repainting an old house: peeling, mould and hairline cracks",
  tomTat: "Painting straight over damaged old paint is the most common mistake. How to treat each wall condition before repainting.",
  noiDung: `<h3>Peeling and blistering walls</h3><p>Scrape off all loose paint and putty, find and fix the source of moisture (roof, pipes, wall base) before redoing from the putty stage.</p>
<h3>Mould and moss</h3><p>Clean off the mould, wash and let the wall dry completely. Use an alkali-resistant primer and a mould-resistant top coat.</p>
<h3>Hairline cracks</h3><p>Small surface cracks can be opened slightly, filled with a suitable filler and re-puttied. Large or through-wall cracks need a structural check.</p>
<h3>Old walls in good condition</h3><p>Clean off dust, sand lightly, apply 1 coat of primer then 2 top coats.</p>
<div class="note">Tung Son surveys your walls for free and tells you clearly what needs fixing before quoting.</div>` },
{ slug: "tuong-nha-mua-nom", nhom: "Maintenance", anh: "assets/img/anh/hero-2.webp",
  tieuDe: "Humid “nồm” season: keeping walls dry and free of stains",
  tomTat: "The humid weather of late winter and early spring makes walls “sweat” and paint deteriorate. Small habits that protect your home.",
  noiDung: `<ul><li>Keep doors and windows closed on very humid days; open them again when the air is dry.</li>
<li>Use a dehumidifier or the “dry” mode on your air conditioner.</li>
<li>Wipe damp floors and walls with a dry cloth; don’t mop with lots of water.</li>
<li>Don’t paint on humid days — paint dries slowly, grows mould and adheres poorly.</li>
<li>When repainting, choose gloss or super gloss paints that are easy to wipe for rooms that tend to be damp.</li></ul>` },
{ slug: "chon-mau-son-nha", nhom: "Colour", anh: "assets/img/anh/phoi-mau-2.webp",
  tieuDe: "Choosing house colours: 5 rules so you won’t need to repaint",
  tomTat: "A colour on a tiny swatch looks very different on a whole wall. Practical rules for choosing colours.",
  noiDung: `<ol><li><strong>The 60–30–10 rule:</strong> 60% main colour, 30% secondary colour, 10% accent.</li>
<li><strong>Test on the real wall</strong> over about 1 m² and look at it in the morning and evening.</li>
<li><strong>Colours look darker on the wall</strong> than on the chart — choose one shade lighter.</li>
<li><strong>Dim rooms</strong> need light, warm tones; keep deep shades for accents.</li>
<li><strong>Exteriors:</strong> harmonise with the roof, doors and neighbouring houses; very dark colours absorb heat and fade faster in the sun.</li></ol>
<p>See Tung Son’s <a href="bang-mau.html">colour charts</a> or ask us for free colour advice from a photo of your home.</p>` }
  ]
};
