/* 中文翻译 – Tùng Sơn 广宁 */
window.I18N = {
  cfg: {
    diaChi: "越南广宁省",
    khuVuc: "下龙、锦普、汪秘、东潮、广安、芒街及广宁全省",
    gioLamViec: "每天 7:00 – 18:00"
  },
  ui: {
    locale: "zh-CN", news: "资讯", gocNhin: "Tùng Sơn 点评：", source: "来源：", viewSource: "查看原文", viOnly: "越南语",
    readMore: "阅读全文 →", month: (m) => m + "月", code: "型号", brand: "品牌", line: "产品类别", scope: "适用范围",
    spec: "规格", howto: "施工说明", price: "价格", priceVal: "欢迎来电询问优惠价", callQuote: "致电报价", zalo: "Zalo 留言",
    allProducts: "全部产品", type: "类型", all: "全部", area: "区域", noi: "内墙", ngoai: "外墙",
    count: (n) => "共 " + n + " 款产品", empty: "没有符合条件的产品，请换个筛选条件。", brandCount: (n) => n + " 款产品 · 查看全部 →",
    updated: "更新于 ", lastUpdated: "最近更新：", allArticles: "← 全部文章", ctaH: "需要为您的房子咨询？",
    ctaP: "广宁省内免费勘察与报价。", callNow: "立即致电", otherArticles: "其他文章",
    badPhone: "请输入有效的电话号码。", notConnected: (tel, ph) => `表单尚未连接。请致电 <a href="${tel}">${ph}</a> 或通过 Zalo 联系我们。`,
    thanks: "谢谢！Tùng Sơn 已收到您的信息，会尽快回电。", sendFail: (tel, ph) => `发送失败，请致电 <a href="${tel}">${ph}</a>。`,
    cm: { "gia-vlxd": "建材价格", "thi-truong-son": "涂料市场", "phap-ly": "建房法规", "xu-huong": "色彩趋势", "quang-ninh": "广宁新闻" },
    khu: { noi: "内墙", ngoai: "外墙", ca2: "内外墙通用" },
    cWall: "墙面面积", cOpen: "扣除门窗", cCeil: "天花面积", cTotal: "需涂刷总面积",
    cTop: (c) => `面漆（${c} 遍）`, cPrimer: "底漆（1 遍）", cPutty: "腻子（2 遍）", cL: "升", cKg: "公斤",
    cPack: (n18, n5) => [n18 ? n18 + " 桶 18 升" : "", n5 ? n5 + " 桶 5 升" : ""].filter(Boolean).join(" + "), cBag: (n) => n + " 袋 25 公斤",
    cBuy: "建议购买", cWallOut: "外墙面积", cExtra: "其他面积", cTopOut: (c) => `外墙面漆（${c} 遍）`, cPrimerOut: "外墙底漆（1 遍）", cPuttyOut: "外墙腻子（2 遍）", cIncl: (w) => `已含 ${w}% 损耗`, cErr: "门窗面积大于墙面面积——请检查输入数据。"
  },
  th: {
    netec: { slogan: "征服时间的涂料", ngan: "Global Plus 旗下 NETEC Center 系列。",
      moTa: "NETEC Center 属于 Global Plus 体系：漆面平滑细腻、遮盖力强、低 VOC、环保。从腻子粉、底漆到内外墙面漆及防水涂料，配套齐全。" },
    npaint: { slogan: "打造绿色空间", ngan: "N Paint Global 产品线最齐全。",
      moTa: "N Paint Global 产品线最齐全：抗碱底漆、平光、光泽、超高光、高级瓷釉漆、防水涂料以及金色装饰漆，满足房屋每个部位的需求。" }
  },
  loai: {
    botba: { ten: "腻子粉", moTa: "找平墙面、填补细小裂缝，在刷底漆前形成平整坚实的基面。", dung: "在干燥墙面上薄批两遍，打磨平整后再刷底漆。" },
    lot: { ten: "抗碱底漆", moTa: "阻隔水泥中的碱和盐分，防止发花、粉化；增强附着力，让面漆显色准确、更加耐久。", dung: "批腻子后刷一遍，按桶上说明干燥后再刷面漆。" },
    min: { ten: "平光漆", moTa: "哑光细腻、高雅，能很好地遮盖墙面瑕疵；易施工，性价比高。", dung: "底漆后刷两遍面漆。" },
    bong: { ten: "光泽漆", moTa: "柔和光泽，色彩鲜亮，日常污渍易擦洗。", dung: "底漆后刷两遍面漆。" },
    sieubong: { ten: "超高光漆", moTa: "光泽度高、抗污、耐擦洗——适合有小孩的家庭、走廊和客厅。", dung: "抗碱底漆后刷两遍面漆。" },
    mensu: { ten: "超亮瓷釉漆", moTa: "高端系列：如瓷釉般光亮，色彩持久，抗污和耐擦洗性能出众。", dung: "配套底漆后刷两遍面漆。" },
    sieutrang: { ten: "超白漆", moTa: "洁白明亮、遮盖力高——适合天花板和需要更多光线的空间。", dung: "在已刷底漆的天花或墙面上刷两遍。" },
    chongtham: { ten: "彩色防水涂料", moTa: "既防水又有装饰色彩，适用于经受风雨的外墙和立墙。", dung: "在已刷底漆的立墙上按说明刷两遍。" },
    chongthamxm: { ten: "水泥基防水涂料", moTa: "与水泥混合使用，用于屋面、天沟、卫生间、水池和墙脚防水。", dung: "按厂家比例与水泥调配，交叉涂刷 2–3 遍。" },
    nhu: { ten: "金色金属漆", moTa: "金属光泽，华丽大气，适用于线条、柱子、大门及装饰细节。", dung: "在已刷底漆的表面刷涂或喷涂。" }
  },
  ghiChu: { "Bao 25kg": "25 公斤/袋" },
  spTen: (p, LOAI, KHU) => {
    const sub = p.ten.includes(" – ") ? " – " + p.ten.split(" – ")[1] : "";
    const where = p.khu === "ca2" ? (p.loai === "chongthamxm" || p.loai === "nhu" ? "" : "内外墙") : KHU[p.khu];
    return `高级${where}${LOAI[p.loai].ten} ${p.ma}${sub}`;
  },
  tin: {
    "https://sct.dongnai.gov.vn/vi/news/Quan-ly-cong-nghiep/thi-truong-phan-hoa-manh-son-cong-nghiep-dan-dat-giai-doan-2025-2026-54294.html": {
      tieuDe: "涂料市场分化明显，装饰涂料逐步回暖",
      tomTat: "据越南涂料油墨协会，2024 年涂料产量近 5 亿升，增长 8.34%。装饰涂料占市场 51.5%，预计回升约 9–10%；工业涂料继续引领增长。",
      gocNhin: "新品牌越多，劣质产品也越多。购买时请检查标签、二维码，并选择地址明确的商家。" },
    "https://doanhnghiephoinhap.vn/gia-thep-hom-nay-3092026-quang-sat-giam-manh-do-cau-tich-tru-ha-nhiet-150211.html": {
      tieuDe: "国内钢价持平，铁矿石大幅下跌",
      tomTat: "9 月 30 日，建筑钢材价格稳定在每公斤约 13,840–15,150 越南盾（视品牌和地区而定）。北部地区 Việt Đức CB240 盘螺约 14,650 盾/公斤，和发（Hòa Phát）约 14,920 盾/公斤。国际铁矿石因囤货需求降温而下跌。",
      gocNhin: "钢价平稳——如果家里打算年底开工，现在是锁定主体材料的好时机。" },
    "https://baophapluat.vn/quang-ninh-tang-nguon-cung-nha-o-huong-toi-an-cu.html": {
      tieuDe: "广宁调整 2030 年前住房发展规划",
      tomTat: "广宁将人均住房面积目标从 32.6 平方米提高到 36 平方米。2026–2030 年需新增社会住房 242 万多平方米，总投资约 23,570 亿越南盾，以满足城市化加快带来的住房需求。",
      gocNhin: "省内新建和翻新住房需求仍然很大——这也是一开始就做好防护涂层的好时机。" },
    "https://baoxaydung.vn/tieu-thu-xi-mang-noi-dia-thang-8-giam-do-mua-mua-nhung-van-tang-33-so-voi-cung-ky-192260918171620963.htm": {
      tieuDe: "8 月水泥销量受降雨影响下降，但同比增长 33%",
      tomTat: "2026 年 8 月越南国内水泥消费约 763 万吨，因雨水多较 7 月下降 7%，但同比增长 33%。前 8 个月国内消费约 5,737 万吨；预计天气好转后市场将重新活跃。",
      gocNhin: "年底旱季是建房高峰——请尽早预约施工队和材料，避免涨价和延误。" },
    "https://www.nbavietnam.net/vi/news/trang-tu-van/bang-bao-gia-vat-lieu-xay-dung-thang-9-nam-2026-cap-nhat-moi-nhat-1165.html": {
      tieuDe: "2026 年 9 月沙、石、水泥、砖价格参考",
      tomTat: "9 月参考价：水泥每袋（50 公斤）约 59,000–87,000 越南盾；抹灰砂约 205,000–215,000 盾/立方米；1×2 石子约 295,000–305,000 盾/立方米；传统烧结砖约 950–1,200 盾/块。实际价格因地区和供应商而异。",
      gocNhin: "请在开工前向广宁当地询价，并至少比较 2–3 家供应商。" },
    "https://luatvietnam.vn/tin-van-ban-moi/tu-01-7-2026-nha-o-rieng-le-duoi-7-tang-duoc-mien-giay-phep-xay-dung-186-106122-article.html": {
      tieuDe: "2026 年 7 月 1 日起：7 层以下独栋住宅可免办建筑许可证（有条件）",
      tomTat: "根据 2025 年《建筑法》（第 135/2025/QH15 号），7 层以下、总建筑面积不足 500 平方米且不在有特殊规划或建筑管控要求区域内的独栋住宅，可免办建筑许可证。超出上述标准或位于管控区域的仍需办理。",
      gocNhin: "免许可证不等于随便建：仍须遵守规划，确保邻居安全。开工前请向所在坊/社人民委员会咨询。" },
    "https://tuoitre.vn/phunuonline/7-mau-son-len-ngoi-nam-2026-1101564856.htm": {
      tieuDe: "2026 年走红的 7 种墙漆颜色",
      tomTat: "橄榄绿、暖鼠尾草绿、陶土色、铜赭色、砂岩米色、桃花心木棕和午夜蓝绿是最受欢迎的颜色——都偏暖、贴近自然，令人放松。",
      gocNhin: "想跟潮流又不怕过时：用米色或奶油色做底色，只挑一面墙用橄榄绿或陶土色做点缀。" },
    "https://tienphong.vn/xu-huong-mau-son-nha-2026-bang-hoa-sac-cua-su-sau-lang-va-ca-tinh-post1821457.tpo": {
      tieuDe: "2026 年家居色彩趋势：深沉而有个性",
      tomTat: "2026 年四大方向：深沉色调（古铜、梅子紫、夜黑）、自然色系（陶土、苔藓绿）、以奶油白和灰粉为代表的暖中性底色取代冷白，以及洋红、芥末黄、烟蓝等个性点缀色。",
      gocNhin: "深色很美但容易让房间显暗——只适合光线充足的房间或作点缀使用。" }
  },
  kt: [
{ slug: "quy-trinh-son-nha-chuan", nhom: "刷漆施工", anh: "assets/img/anh/hero-3.webp",
  tieuDe: "规范刷漆 6 步——做对了，十年依然如新",
  tomTat: "漆面好不好看、耐不耐久，约 70% 取决于基面处理。这是 Tùng Sơn 施工队每个工程都遵循的流程。",
  noiDung: `<p>很多家庭以为刷漆就是“把颜色滚上墙”。其实，漆面能否长久美观、还是很快起皮发黄，主要取决于打开面漆<strong>之前</strong>的步骤。</p>
<h3>第 1 步 —— 检查墙面</h3><p>新墙需要足够时间干燥（抹灰后一般约 3–4 周，视天气而定）。墙面须干燥、洁净、无灰尘、无霉菌。可使用湿度计——许多厂家建议墙面含水率低于约 16% 再刷漆。</p>
<h3>第 2 步 —— 基面处理</h3><p>铲除多余砂浆和起皮的旧漆，处理霉菌，填补裂缝。旧墙尤其要重视这一步。</p>
<h3>第 3 步 —— 批腻子</h3><p>薄批两遍，干后打磨平整。外墙请使用专用外墙腻子。</p>
<h3>第 4 步 —— 抗碱底漆</h3><p>底漆阻隔水泥中的碱（发花、泛白粉的原因），增强附着力，让面漆显色准确。<em>为省钱不刷底漆</em>，是最贵的“省钱”。</p>
<h3>第 5 步 —— 两遍面漆</h3><p>刷第一遍，按桶上说明的时间干燥后再刷第二遍。均匀用力、朝一个方向滚涂，颜色才均匀。</p>
<h3>第 6 步 —— 验收与清洁</h3><p>在自然光下检查，修补不均匀处，交付前彻底清洁。</p>
<div class="note">下雨、回南天潮湿或阳光直射墙面时不要刷漆——容易流挂、起泡或干得太快。</div>` },
{ slug: "chong-tham-nha-o-vung-bien", nhom: "防水", anh: "assets/img/anh/banner-npaint.webp",
  tieuDe: "广宁房屋防水：海洋气候、台风暴雨与回南天",
  tomTat: "沿海房屋面临斜雨、咸湿海风和高湿度。哪些部位需要防水，什么时候做最合适。",
  noiDung: `<p>广宁雨季和台风季长，春季潮湿回南，许多临海地区还受盐雾影响。渗漏不仅毁坏漆面，还会发霉、影响健康和房屋结构。</p>
<h3>优先防水的 5 个部位</h3><ul><li><strong>屋面、露台、天沟：</strong>最容易积水的地方。</li><li><strong>卫生间、浴室：</strong>铺砖前做好地面和墙根防水。</li><li><strong>迎雨面墙：</strong>直接受斜雨冲刷的墙面。</li><li><strong>墙脚：</strong>阻止地面潮气上升。</li><li><strong>与邻屋交接缝、窗户四周、管道穿墙处。</strong></li></ul>
<h3>材料选择</h3><p><strong>水泥基防水涂料</strong>适用于屋面、卫生间、水池（之后需铺砖或做保护层）。<strong>彩色防水涂料</strong>用于外立墙——既防水又是面层颜色。</p>
<h3>施工时间</h3><p>最好在旱季（约 10 月至次年初）、基面干燥时进行。建房时就应做好防水——日后返修费用高出数倍。</p>
<div class="note">小贴士：屋面或卫生间做完防水后，蓄水试验 24–48 小时，检查楼下天花无渗漏后再铺砖。</div>` },
{ slug: "cach-tinh-luong-son", nhom: "用量估算", anh: "assets/img/anh/hero-1.webp",
  tieuDe: "如何自己估算全屋需要多少涂料",
  tomTat: "一个简单公式帮您估算桶数，避免买多浪费或中途不够。",
  noiDung: `<h3>1. 计算面积</h3><p><strong>房间墙面面积</strong> =（长 + 宽）× 2 × 高 − 门窗面积。<br><strong>天花面积</strong> = 长 × 宽。</p>
<p><em>例：</em>4 米 × 5 米的房间，层高 3.2 米，一扇门（0.9 × 2.2 米）和一扇窗（1.2 × 1.4 米）：<br>墙面 =（4+5）× 2 × 3.2 −（1.98 + 1.68）≈ <strong>54 平方米</strong>；天花 = <strong>20 平方米</strong>。</p>
<h3>2. 查看桶上的理论涂布率</h3><p>每种产品的涂布率不同（平方米/升/遍 或 平方米/公斤/遍），印在桶上或技术资料中。所需涂料 = 面积 × 遍数 ÷ 涂布率。</p>
<h3>3. 加上损耗</h3><p>另加约 5–10% 作为损耗和修补。旧墙、粗糙墙面吸漆更多。</p>
<div class="note">最快的方法：把房屋尺寸或图纸发给 Tùng Sơn——我们免费算量，并推荐符合预算的涂料方案。</div>` },
{ slug: "chon-son-min-bong-men-su", nhom: "选漆", anh: "assets/img/anh/npaint-banner.webp",
  tieuDe: "平光、光泽、超高光还是瓷釉？不同房间怎么选",
  tomTat: "了解光泽等级，选出既好看、又好清洁、还合预算的涂料。",
  noiDung: `<table class="tbl"><thead><tr><th>类型</th><th>特点</th><th>适用</th></tr></thead><tbody>
<tr><td>平光（哑光）</td><td>遮盖墙面瑕疵好，柔和，经济</td><td>卧室、天花、出租房</td></tr>
<tr><td>光泽</td><td>柔和光泽，色彩鲜亮，日常污渍可擦</td><td>客厅、餐厅</td></tr>
<tr><td>超高光</td><td>光泽高，抗污，耐擦洗</td><td>有小孩的家庭、走廊、楼梯</td></tr>
<tr><td>瓷釉</td><td>如瓷釉般光亮，高档，最保色</td><td>外立面、高档客厅</td></tr></tbody></table>
<p>注意：漆越亮，越容易“暴露”墙面缺陷——所以批腻子和打磨一定要平整。</p>
<h3>内墙漆与外墙漆不能混用</h3><p>外墙漆更耐紫外线、日晒雨淋并防霉；内墙漆更注重安全、低气味。内墙漆用在室外很快会褪色、粉化。</p>` },
{ slug: "luu-y-khi-xay-nha", nhom: "建房", anh: "assets/img/anh/phong-xanh.webp",
  tieuDe: "家庭建房前必须知道的 10 件事",
  tomTat: "从法律手续、选择承包商到刷漆完工的时机——开工前应了解的要点。",
  noiDung: `<ol><li><strong>核查土地手续：</strong>土地使用权证、规划、建筑红线。</li>
<li><strong>建筑许可证：</strong>2026 年 7 月 1 日起，许多 7 层以下、总面积不足 500 平方米且不在特殊建筑管控区的独栋住宅可免办许可证。具体情况请向所在坊/社人民委员会咨询。</li>
<li><strong>设计：</strong>规模较大的房屋需请有资质的设计单位，不要“照着邻居家盖”。</li>
<li><strong>预留 10–15% 预算</strong>应对额外支出。</li>
<li><strong>与承包商签订清晰合同：</strong>项目、材料、工期、保修和分阶段付款。</li>
<li><strong>选择时间：</strong>旱季适合主体施工和装修。</li>
<li><strong>主体阶段就做防水：</strong>屋面、卫生间、墙脚。</li>
<li><strong>材料进场时检查</strong>标签和来源。</li>
<li><strong>给墙体足够干燥时间</strong>再批腻子刷漆，避免起泡发花。</li>
<li><strong>保存发票、保修卡</strong>和竣工资料。</li></ol>` },
{ slug: "son-lai-nha-cu", nhom: "翻新", anh: "assets/img/anh/phong-xam.webp",
  tieuDe: "旧房重新刷漆：起皮、发霉、细裂缝怎么处理",
  tomTat: "直接在损坏的旧漆上刷新漆是最常见的错误。重新刷漆前各种墙面问题的处理方法。",
  noiDung: `<h3>墙面起皮、起泡</h3><p>铲除所有松动的漆层和腻子，找到并处理潮气来源（屋面、管道、墙脚），再从批腻子开始重做。</p>
<h3>墙面发霉、长青苔</h3><p>清除霉菌，清洗后让墙面完全干燥。使用抗碱底漆和防霉面漆。</p>
<h3>细小裂缝</h3><p>表面细裂可略微扩开，用专用材料填补后重新批腻子。较大裂缝或贯穿裂缝需检查结构。</p>
<h3>旧墙状况良好</h3><p>清除灰尘，轻轻打磨，刷一遍底漆再刷两遍面漆。</p>
<div class="note">Tùng Sơn 免费上门勘察墙面，报价前清楚说明需要处理的地方。</div>` },
{ slug: "tuong-nha-mua-nom", nhom: "保养", anh: "assets/img/anh/hero-2.webp",
  tieuDe: "回南天：保持墙面干燥、不发霉",
  tomTat: "冬末春初的回南天让墙面“出汗”，漆面加速老化。几个小习惯保护您的家。",
  noiDung: `<ul><li>回南严重的日子关紧门窗，天气干燥时再开窗通风。</li>
<li>使用除湿机或空调的“除湿”模式。</li>
<li>用干布擦干潮湿的地面和墙面；不要用大量水拖地。</li>
<li>回南天不要刷漆——漆干得慢，易发霉、附着差。</li>
<li>新刷或翻新时，容易潮湿的房间优先选用易擦洗的光泽或超高光漆。</li></ul>` },
{ slug: "chon-mau-son-nha", nhom: "色彩", anh: "assets/img/anh/phoi-mau-2.webp",
  tieuDe: "房屋选色：5 条原则，免得返工重刷",
  tomTat: "小色卡上的颜色刷到整面墙上会很不一样。实用的选色原则。",
  noiDung: `<ol><li><strong>60–30–10 法则：</strong>60% 主色，30% 辅色，10% 点缀色。</li>
<li><strong>在实际墙面试色</strong>约 1 平方米，早晚各看一次。</li>
<li><strong>上墙后颜色通常比色卡深</strong>——建议选浅一个色阶。</li>
<li><strong>采光差的房间</strong>用浅色、暖色；深色只作点缀。</li>
<li><strong>外墙：</strong>与屋顶、门窗及周边房屋协调；颜色太深容易吸热，日晒下褪色更快。</li></ol>
<p>欢迎参考 Tùng Sơn 的<a href="bang-mau.html">色卡</a>，或发房屋照片给我们免费配色。</p>` }
  ]
};
