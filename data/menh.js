/* Dữ liệu ngũ hành – màu sơn hợp mệnh (VI / EN / ZH) */
window.MENH = {
  can: { vi: ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"], en: ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"], zh: ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"] },
  chi: { vi: ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"], en: ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"], zh: ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"] },
  con: { vi: ["Chuột","Trâu","Hổ","Mèo","Rồng","Rắn","Ngựa","Dê","Khỉ","Gà","Chó","Lợn"], en: ["Rat","Ox","Tiger","Cat","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"], zh: ["鼠","牛","虎","猫","龙","蛇","马","羊","猴","鸡","狗","猪"] },
  napAm: {
    vi: ["Hải Trung Kim","Lư Trung Hỏa","Đại Lâm Mộc","Lộ Bàng Thổ","Kiếm Phong Kim","Sơn Đầu Hỏa","Giản Hạ Thủy","Thành Đầu Thổ","Bạch Lạp Kim","Dương Liễu Mộc","Tuyền Trung Thủy","Ốc Thượng Thổ","Tích Lịch Hỏa","Tùng Bách Mộc","Trường Lưu Thủy","Sa Trung Kim","Sơn Hạ Hỏa","Bình Địa Mộc","Bích Thượng Thổ","Kim Bạch Kim","Phú Đăng Hỏa","Thiên Hà Thủy","Đại Trạch Thổ","Thoa Xuyến Kim","Tang Đố Mộc","Đại Khê Thủy","Sa Trung Thổ","Thiên Thượng Hỏa","Thạch Lựu Mộc","Đại Hải Thủy"],
    en: ["Gold in the Sea","Fire in the Furnace","Great Forest Wood","Roadside Earth","Sword-edge Metal","Mountain-top Fire","Stream Water","City-wall Earth","White Wax Metal","Willow Wood","Spring Water","Rooftop Earth","Thunderbolt Fire","Pine & Cypress Wood","Long River Water","Gold in the Sand","Fire below the Mountain","Flatland Wood","Earth on the Wall","Gold Foil Metal","Lamp Fire","Heavenly River Water","Great Post-road Earth","Hairpin Metal","Mulberry Wood","Great Stream Water","Earth in the Sand","Heavenly Fire","Pomegranate Wood","Great Sea Water"],
    zh: ["海中金","炉中火","大林木","路旁土","剑锋金","山头火","涧下水","城头土","白蜡金","杨柳木","泉中水","屋上土","霹雳火","松柏木","长流水","沙中金","山下火","平地木","壁上土","金箔金","覆灯火","天河水","大驿土","钗钏金","桑柘木","大溪水","沙中土","天上火","石榴木","大海水"]
  },
  hanh: {
    kim: { vi: "Kim", en: "Metal", zh: "金" }, thuy: { vi: "Thủy", en: "Water", zh: "水" }, moc: { vi: "Mộc", en: "Wood", zh: "木" },
    hoa: { vi: "Hỏa", en: "Fire", zh: "火" }, tho: { vi: "Thổ", en: "Earth", zh: "土" }
  },
  /* sinh: hành sinh ra mệnh (màu tốt nhất); khac: hành khắc mệnh (nên hạn chế) */
  quanHe: { kim: { sinh: "tho", khac: "hoa" }, thuy: { sinh: "kim", khac: "tho" }, moc: { sinh: "thuy", khac: "kim" }, hoa: { sinh: "moc", khac: "thuy" }, tho: { sinh: "hoa", khac: "moc" } },
  mau: {
    kim: [["#F7F7F4", "Trắng Sứ", "Trắng sứ", "Porcelain white", "瓷白"], ["#F0F1EC", "19-2P", "Xám trắng", "Off-white grey", "灰白"], ["#B9B9B1", "19-3T", "Xám ghi nhạt", "Light grey", "浅灰"], ["#969792", "19-4D", "Xám ghi", "Dove grey", "银灰"]],
    thuy: [["#B8E3F4", "3-4P", "Xanh da trời nhạt", "Light sky blue", "浅天蓝"], ["#A1BDE4", "41-4D", "Xanh dương nhạt", "Soft blue", "浅蓝"], ["#6686AD", "37-5A", "Xanh dương xám", "Slate blue", "灰蓝"], ["#4E4F54", "19-5A", "Xám đen", "Charcoal", "炭灰黑"]],
    moc: [["#DDEEDC", "27-1P", "Xanh ngọc nhạt", "Mint green", "薄荷绿"], ["#C1DA74", "25-4D", "Xanh cốm", "Lime green", "嫩芽绿"], ["#83C240", "25-5A", "Xanh lá", "Leaf green", "叶绿"], ["#74704A", "11-5A", "Xanh rêu ô liu", "Olive moss", "橄榄苔绿"]],
    hoa: [["#F8CED8", "44-1P", "Hồng phấn", "Blush pink", "粉红"], ["#F1E3F0", "6-3P", "Tím nhạt", "Pale lilac", "淡紫"], ["#F3624D", "16-5A", "Đỏ cam", "Coral red", "珊瑚红"], ["#AE5046", "17-5A", "Đỏ đất nung", "Terracotta red", "陶土红"]],
    tho: [["#ECDFB5", "13-3T", "Be kem", "Cream beige", "奶油米色"], ["#FAE69F", "14-4D", "Vàng nhạt", "Soft yellow", "浅黄"], ["#C0B386", "13-4D", "Be đậm", "Deep beige", "深米色"], ["#905849", "18-5A", "Nâu đất", "Earth brown", "土棕"]]
  },
  moTa: {
    kim: {
      vi: "Hành Kim tượng trưng cho kim loại, sự cứng cỏi, rõ ràng và quyết đoán. Theo ngũ hành, Thổ sinh Kim nên các màu của hành Thổ như vàng kem, be cát, nâu đất được xem là màu tương sinh, mang lại sự hỗ trợ và vượng khí cho gia chủ. Màu bản mệnh trắng, xám, ghi bạc tạo cảm giác sạch sẽ, sang trọng. Nên hạn chế dùng nhiều đỏ, hồng, cam, tím (hành Hỏa) vì Hỏa khắc Kim.",
      en: "Metal stands for firmness, clarity and decisiveness. In the five-element cycle Earth nourishes Metal, so Earth colours such as cream yellow, sand beige and earth brown are the most supportive. Metal’s own colours — white, grey and silver — feel clean and elegant. Avoid large areas of red, pink, orange or purple (Fire), because Fire overcomes Metal.",
      zh: "金代表坚毅、清晰与果断。五行中土生金，所以奶油黄、沙米色、土棕等土色被视为相生色，最能扶助屋主。金的本命色白、灰、银色给人整洁高雅之感。宜少用大面积的红、粉、橙、紫（火），因为火克金。"
    },
    thuy: {
      vi: "Hành Thủy tượng trưng cho nước, sự mềm mại, linh hoạt và trí tuệ. Theo ngũ hành, Kim sinh Thủy nên các màu của hành Kim như trắng, xám, ghi bạc là màu tương sinh rất tốt. Màu bản mệnh xanh dương, xanh navy, đen tạo chiều sâu và cảm giác bình yên. Nên hạn chế dùng nhiều vàng đất, nâu (hành Thổ) vì Thổ khắc Thủy.",
      en: "Water stands for softness, flexibility and wisdom. Metal nourishes Water, so Metal colours — white, grey and silver — are the most supportive. Water’s own colours — blue, navy and black — add depth and calm. Avoid large areas of earthy yellow or brown (Earth), because Earth overcomes Water.",
      zh: "水代表柔和、灵活与智慧。金生水，所以白、灰、银等金色是最好的相生色。水的本命色蓝、藏青、黑色带来深邃与宁静。宜少用大面积的土黄、棕色（土），因为土克水。"
    },
    moc: {
      vi: "Hành Mộc tượng trưng cho cây cối, sự sinh trưởng, tươi mới và phát triển. Theo ngũ hành, Thủy sinh Mộc nên các màu của hành Thủy như xanh dương, xanh navy, đen là màu tương sinh. Màu bản mệnh xanh lá, xanh rêu, xanh ô liu mang lại cảm giác gần gũi thiên nhiên — cũng là những gam màu đang được ưa chuộng năm 2026. Nên hạn chế dùng nhiều trắng, xám, bạc (hành Kim) vì Kim khắc Mộc.",
      en: "Wood stands for growth, freshness and development. Water nourishes Wood, so Water colours — blue, navy and black — are the most supportive. Wood’s own colours — fresh green, moss and olive — bring nature indoors and are also among 2026’s trending shades. Avoid large areas of white, grey or silver (Metal), because Metal overcomes Wood.",
      zh: "木代表生长、清新与发展。水生木，所以蓝、藏青、黑等水色是相生色。木的本命色嫩绿、苔绿、橄榄绿亲近自然，也是 2026 年流行色。宜少用大面积的白、灰、银色（金），因为金克木。"
    },
    hoa: {
      vi: "Hành Hỏa tượng trưng cho lửa, sự nhiệt huyết, ấm áp và năng động. Theo ngũ hành, Mộc sinh Hỏa nên các màu của hành Mộc như xanh lá, xanh rêu là màu tương sinh. Màu bản mệnh đỏ đất nung, hồng phấn, đỏ cam, tím nhạt tạo không khí ấm cúng. Nên hạn chế dùng nhiều đen, xanh nước biển (hành Thủy) vì Thủy khắc Hỏa.",
      en: "Fire stands for passion, warmth and energy. Wood nourishes Fire, so Wood colours — green and moss — are the most supportive. Fire’s own colours — terracotta, blush pink, coral red and pale lilac — create a warm, cosy feel. Avoid large areas of black or deep blue (Water), because Water overcomes Fire.",
      zh: "火代表热情、温暖与活力。木生火，所以绿色、苔绿等木色是相生色。火的本命色陶土红、粉红、珊瑚红、淡紫营造温馨氛围。宜少用大面积的黑色、深蓝（水），因为水克火。"
    },
    tho: {
      vi: "Hành Thổ tượng trưng cho đất, sự vững chãi, bao dung và ổn định. Theo ngũ hành, Hỏa sinh Thổ nên các màu của hành Hỏa như hồng phấn, đỏ cam, đỏ đất nung là màu tương sinh. Màu bản mệnh vàng kem, be cát, nâu đất mang lại cảm giác ấm áp, an yên. Nên hạn chế dùng nhiều xanh lá (hành Mộc) vì Mộc khắc Thổ.",
      en: "Earth stands for stability, generosity and steadiness. Fire nourishes Earth, so Fire colours — blush pink, coral red and terracotta — are the most supportive. Earth’s own colours — cream yellow, sand beige and earth brown — feel warm and grounded. Avoid large areas of green (Wood), because Wood overcomes Earth.",
      zh: "土代表稳重、包容与安定。火生土，所以粉红、珊瑚红、陶土红等火色是相生色。土的本命色奶油黄、沙米色、土棕给人温暖安稳之感。宜少用大面积的绿色（木），因为木克土。"
    }
  },
  ui: {
    vi: { born: "Ngày sinh", lunar: "Năm âm lịch", menh: "Mệnh", beforeTet: (y) => `Bạn sinh trước Tết Nguyên đán nên được tính theo năm âm lịch ${y}.`,
      sinh: "Màu tương sinh — tốt nhất", ban: "Màu bản mệnh — hợp", ky: "Màu nên hạn chế dùng làm màu chính", meaning: "Diễn giải theo phong thủy",
      tips: "Gợi ý phối màu cho ngôi nhà",
      tip: (s, b) => [`<b>Phòng khách:</b> dùng tông nhạt của màu tương sinh (${s}) làm màu nền, điểm nhấn bằng màu bản mệnh.`, `<b>Phòng ngủ:</b> ưu tiên màu nhẹ nhàng như ${b} pha sáng — dễ ngủ và thư thái.`, `<b>Ngoại thất:</b> chọn màu tương sinh hoặc bản mệnh tông sáng, bền màu; viền, cửa, phào chỉ dùng màu đậm hơn.`, `<b>Màu kỵ:</b> không nhất thiết phải tránh hoàn toàn — có thể dùng ở đồ trang trí, rèm, gối với diện tích nhỏ.`],
      note: "Màu hợp mệnh là kinh nghiệm văn hóa dân gian, mang tính tham khảo. Nên chọn theo mệnh của chủ nhà (người trụ cột) cho phòng khách và ngoại thất, còn phòng ngủ theo mệnh người sử dụng phòng. Quan trọng nhất vẫn là màu bạn thấy đẹp và dễ chịu.",
      code: "Mã màu", chart: "Mã màu theo bảng màu sơn NETEC Center – N Paint Global. Màu hiển thị trên màn hình chỉ gần đúng, vui lòng xem bảng màu thực tế trước khi chọn.", empty: "Nhập ngày tháng năm sinh để xem màu sơn hợp mệnh.", bad: "Ngày sinh chưa hợp lệ, vui lòng kiểm tra lại." },
    en: { born: "Date of birth", lunar: "Lunar year", menh: "Element", beforeTet: (y) => `You were born before Lunar New Year, so your lunar year is ${y}.`,
      sinh: "Supporting colours — best", ban: "Your element’s colours — good", ky: "Colours to avoid as the main colour", meaning: "Feng shui explanation",
      tips: "Colour ideas for your home",
      tip: (s, b) => [`<b>Living room:</b> use light tones of the supporting colours (${s}) as the base, with accents in your element’s colours.`, `<b>Bedroom:</b> soft, lightened shades such as ${b} help you relax and sleep well.`, `<b>Exterior:</b> choose light, fade-resistant tones of your supporting or element colours; use deeper shades for trims, doors and mouldings.`, `<b>Colours to avoid:</b> you don’t have to avoid them completely — use them in small areas such as decor, curtains and cushions.`],
      note: "Element colours are a folk tradition and are for reference only. Use the homeowner’s element for the living room and exterior, and each person’s own element for their bedroom. Above all, choose colours you find beautiful and comfortable.",
      code: "Code", chart: "Colour codes follow the NETEC Center – N Paint Global colour chart. On-screen colours are approximate; please check the physical colour card before choosing.", empty: "Enter your date of birth to see your lucky paint colours.", bad: "Invalid date of birth — please check again." },
    zh: { born: "出生日期", lunar: "农历年", menh: "五行", beforeTet: (y) => `您在农历春节前出生，按农历 ${y} 年计算。`,
      sinh: "相生色——最佳", ban: "本命色——相合", ky: "不宜作为主色", meaning: "风水解读",
      tips: "家居配色建议",
      tip: (s, b) => [`<b>客厅：</b>以相生色（${s}）的浅色调为底色，用本命色作点缀。`, `<b>卧室：</b>选用${b}等柔和的浅色，有助放松与睡眠。`, `<b>外墙：</b>选择相生色或本命色中浅而耐候的色调；线条、门窗和装饰线用较深的颜色。`, `<b>忌色：</b>不必完全避开，可小面积用于摆件、窗帘、抱枕等。`],
      note: "五行配色属于民间文化经验，仅供参考。客厅和外墙按屋主（家中主事人）的五行选色，卧室按使用者的五行选色。最重要的是选择您自己觉得好看、舒适的颜色。",
      code: "色号", chart: "色号来自 NETEC Center – N Paint Global 色卡。屏幕显示颜色仅供参考，选色前请查看实物色卡。", empty: "输入出生日期，查看适合您的墙漆颜色。", bad: "出生日期无效，请重新检查。" }
  }
};

/* HƯỚNG NHÀ – HƯỚNG ĐẤT theo Bát trạch (cung phi theo năm âm lịch + giới tính) */
window.MENH.bt = {
  // hướng: N, NE, E, SE, S, SW, W, NW
  tot: { 1: ["SE", "E", "S", "N"], 2: ["NE", "W", "NW", "SW"], 3: ["S", "N", "SE", "E"], 4: ["N", "S", "E", "SE"],
         6: ["W", "NE", "SW", "NW"], 7: ["NW", "SW", "NE", "W"], 8: ["SW", "NW", "W", "NE"], 9: ["E", "SE", "N", "S"] },
  xau: { 1: ["W", "NE", "NW", "SW"], 2: ["E", "SE", "S", "N"], 3: ["SW", "NW", "NE", "W"], 4: ["NW", "SW", "W", "NE"],
         6: ["SE", "E", "N", "S"], 7: ["N", "S", "SE", "E"], 8: ["S", "N", "E", "SE"], 9: ["NE", "W", "SW", "NW"] },
  cung: { vi: { 1: "Khảm", 2: "Khôn", 3: "Chấn", 4: "Tốn", 6: "Càn", 7: "Đoài", 8: "Cấn", 9: "Ly" },
          en: { 1: "Kan", 2: "Kun", 3: "Zhen", 4: "Xun", 6: "Qian", 7: "Dui", 8: "Gen", 9: "Li" },
          zh: { 1: "坎", 2: "坤", 3: "震", 4: "巽", 6: "乾", 7: "兑", 8: "艮", 9: "离" } },
  dir: { vi: { N: "Bắc", NE: "Đông Bắc", E: "Đông", SE: "Đông Nam", S: "Nam", SW: "Tây Nam", W: "Tây", NW: "Tây Bắc" },
         en: { N: "North", NE: "North-east", E: "East", SE: "South-east", S: "South", SW: "South-west", W: "West", NW: "North-west" },
         zh: { N: "北", NE: "东北", E: "东", SE: "东南", S: "南", SW: "西南", W: "西", NW: "西北" } },
  sao: {
    vi: { tot: [["Sinh Khí", "tài lộc, thăng tiến, nhiều sinh khí"], ["Thiên Y", "sức khỏe, gặp quý nhân"], ["Diên Niên", "hòa thuận, bền vững gia đạo"], ["Phục Vị", "bình an, vững vàng"]],
          xau: [["Họa Hại", "thị phi, trắc trở"], ["Ngũ Quỷ", "hao tài, bất hòa"], ["Lục Sát", "kiện tụng, tình cảm lục đục"], ["Tuyệt Mệnh", "xấu nhất, nên tránh"]] },
    en: { tot: [["Sheng Qi", "prosperity and success"], ["Tian Yi", "health and helpful people"], ["Yan Nian", "family harmony"], ["Fu Wei", "peace and stability"]],
          xau: [["Huo Hai", "mishaps and gossip"], ["Wu Gui", "money loss and quarrels"], ["Liu Sha", "disputes and relationship trouble"], ["Jue Ming", "the worst, avoid"]] },
    zh: { tot: [["生气", "财运、升迁"], ["天医", "健康、贵人"], ["延年", "家庭和睦"], ["伏位", "平安稳定"]],
          xau: [["祸害", "是非、阻滞"], ["五鬼", "破财、不和"], ["六煞", "官非、感情不顺"], ["绝命", "最凶，宜避开"]] },
  },
  ui: {
    vi: { h: "Hướng nhà, hướng đất hợp tuổi", gender: "Giới tính", male: "Nam", female: "Nữ",
      cung: (c, nhom) => `Cung mệnh (Bát trạch): <b>${c}</b> — thuộc nhóm <b>${nhom}</b>.`, dong: "Đông tứ mệnh", tay: "Tây tứ mệnh",
      good: "4 hướng tốt — nên chọn", bad: "4 hướng xấu — nên tránh",
      tips: (g) => [`<b>Chọn đất:</b> ưu tiên lô đất có mặt tiền quay về hướng ${g}. Hướng nhà tính theo hướng cửa chính nhìn ra ngoài.`,
        `<b>Đất đã có hướng chưa hợp:</b> có thể xoay cửa chính, đặt bàn thờ, bếp và đầu giường quay về các hướng tốt để hóa giải.`,
        `<b>Nhiều thế hệ:</b> thường xem theo tuổi chủ nhà (người trụ cột), phòng riêng xem theo tuổi người dùng.`],
      note: "Hướng nhà theo Bát trạch là kinh nghiệm phong thủy dân gian, mang tính tham khảo; nên kết hợp điều kiện thực tế (nắng, gió, đường đi) khi xây dựng." },
    en: { h: "Best house & land directions", gender: "Gender", male: "Male", female: "Female",
      cung: (c, nhom) => `Your Eight Mansions trigram: <b>${c}</b> — <b>${nhom}</b> group.`, dong: "East", tay: "West",
      good: "4 good directions — choose", bad: "4 bad directions — avoid",
      tips: (g) => [`<b>Choosing land:</b> prefer a plot whose front faces ${g}. A house’s direction is the way the main door faces when you look out.`,
        `<b>If the plot faces a poor direction:</b> turn the main door, altar, stove and bed head towards your good directions.`,
        `<b>Multi-generation homes:</b> the homeowner’s birth year is usually used; private rooms follow each user.`],
      note: "Eight Mansions directions are a folk feng shui tradition and for reference only — also consider sun, wind and access when building." },
    zh: { h: "宜选的房屋与地块朝向", gender: "性别", male: "男", female: "女",
      cung: (c, nhom) => `八宅命卦：<b>${c}</b>，属于<b>${nhom}</b>。`, dong: "东四命", tay: "西四命",
      good: "四吉方——宜选", bad: "四凶方——宜避",
      tips: (g) => [`<b>选地：</b>优先选择正面朝向${g}的地块。房屋朝向以大门向外看的方向为准。`,
        `<b>地块朝向不理想：</b>可调整大门、神台、灶台和床头朝向吉方来化解。`,
        `<b>多代同堂：</b>一般以屋主（家中主事人）的年份为准，个人房间按使用者选。`],
      note: "八宅朝向属于民间风水经验，仅供参考；建房时还应结合日照、通风和道路等实际条件。" },
  },
};
