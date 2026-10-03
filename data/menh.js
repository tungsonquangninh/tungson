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
    kim: [["#F5F3EE", "Trắng sứ", "Porcelain white", "瓷白"], ["#C3C7CB", "Xám ghi", "Dove grey", "银灰"], ["#DCDDDF", "Bạc ánh kim", "Silver", "银色"]],
    thuy: [["#9DBAD6", "Xanh dương nhạt", "Light blue", "浅蓝"], ["#2F4A73", "Xanh navy", "Navy blue", "藏青"], ["#3A3B3F", "Đen than", "Charcoal", "炭黑"]],
    moc: [["#B5D0A2", "Xanh lá non", "Fresh green", "嫩绿"], ["#6E8B5B", "Xanh rêu", "Moss green", "苔绿"], ["#8E9C5E", "Xanh ô liu", "Olive green", "橄榄绿"]],
    hoa: [["#E9B7B0", "Hồng phấn", "Blush pink", "粉红"], ["#F2A477", "Cam đào", "Peach orange", "蜜桃橙"], ["#B5532A", "Đỏ đất nung", "Terracotta red", "陶土红"], ["#B9A2CF", "Tím nhạt", "Lavender", "淡紫"]],
    tho: [["#F1E2B8", "Vàng kem", "Cream yellow", "奶油黄"], ["#E3D0AE", "Be cát", "Sand beige", "沙米色"], ["#B58A63", "Nâu đất", "Earth brown", "土棕"]]
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
      vi: "Hành Hỏa tượng trưng cho lửa, sự nhiệt huyết, ấm áp và năng động. Theo ngũ hành, Mộc sinh Hỏa nên các màu của hành Mộc như xanh lá, xanh rêu là màu tương sinh. Màu bản mệnh đỏ đất nung, hồng phấn, cam đào, tím nhạt tạo không khí ấm cúng. Nên hạn chế dùng nhiều đen, xanh nước biển (hành Thủy) vì Thủy khắc Hỏa.",
      en: "Fire stands for passion, warmth and energy. Wood nourishes Fire, so Wood colours — green and moss — are the most supportive. Fire’s own colours — terracotta, blush pink, peach and lavender — create a warm, cosy feel. Avoid large areas of black or deep blue (Water), because Water overcomes Fire.",
      zh: "火代表热情、温暖与活力。木生火，所以绿色、苔绿等木色是相生色。火的本命色陶土红、粉红、蜜桃橙、淡紫营造温馨氛围。宜少用大面积的黑色、深蓝（水），因为水克火。"
    },
    tho: {
      vi: "Hành Thổ tượng trưng cho đất, sự vững chãi, bao dung và ổn định. Theo ngũ hành, Hỏa sinh Thổ nên các màu của hành Hỏa như hồng phấn, cam đào, đỏ đất nung là màu tương sinh. Màu bản mệnh vàng kem, be cát, nâu đất mang lại cảm giác ấm áp, an yên. Nên hạn chế dùng nhiều xanh lá (hành Mộc) vì Mộc khắc Thổ.",
      en: "Earth stands for stability, generosity and steadiness. Fire nourishes Earth, so Fire colours — blush pink, peach and terracotta — are the most supportive. Earth’s own colours — cream yellow, sand beige and earth brown — feel warm and grounded. Avoid large areas of green (Wood), because Wood overcomes Earth.",
      zh: "土代表稳重、包容与安定。火生土，所以粉红、蜜桃橙、陶土红等火色是相生色。土的本命色奶油黄、沙米色、土棕给人温暖安稳之感。宜少用大面积的绿色（木），因为木克土。"
    }
  },
  ui: {
    vi: { born: "Ngày sinh", lunar: "Năm âm lịch", menh: "Mệnh", beforeTet: (y) => `Bạn sinh trước Tết Nguyên đán nên được tính theo năm âm lịch ${y}.`,
      sinh: "Màu tương sinh — tốt nhất", ban: "Màu bản mệnh — hợp", ky: "Màu nên hạn chế dùng làm màu chính", meaning: "Diễn giải theo phong thủy",
      tips: "Gợi ý phối màu cho ngôi nhà",
      tip: (s, b) => [`<b>Phòng khách:</b> dùng tông nhạt của màu tương sinh (${s}) làm màu nền, điểm nhấn bằng màu bản mệnh.`, `<b>Phòng ngủ:</b> ưu tiên màu nhẹ nhàng như ${b} pha sáng — dễ ngủ và thư thái.`, `<b>Ngoại thất:</b> chọn màu tương sinh hoặc bản mệnh tông sáng, bền màu; viền, cửa, phào chỉ dùng màu đậm hơn.`, `<b>Màu kỵ:</b> không nhất thiết phải tránh hoàn toàn — có thể dùng ở đồ trang trí, rèm, gối với diện tích nhỏ.`],
      note: "Màu hợp mệnh là kinh nghiệm văn hóa dân gian, mang tính tham khảo. Nên chọn theo mệnh của chủ nhà (người trụ cột) cho phòng khách và ngoại thất, còn phòng ngủ theo mệnh người sử dụng phòng. Quan trọng nhất vẫn là màu bạn thấy đẹp và dễ chịu.",
      empty: "Nhập ngày tháng năm sinh để xem màu sơn hợp mệnh.", bad: "Ngày sinh chưa hợp lệ, vui lòng kiểm tra lại." },
    en: { born: "Date of birth", lunar: "Lunar year", menh: "Element", beforeTet: (y) => `You were born before Lunar New Year, so your lunar year is ${y}.`,
      sinh: "Supporting colours — best", ban: "Your element’s colours — good", ky: "Colours to avoid as the main colour", meaning: "Feng shui explanation",
      tips: "Colour ideas for your home",
      tip: (s, b) => [`<b>Living room:</b> use light tones of the supporting colours (${s}) as the base, with accents in your element’s colours.`, `<b>Bedroom:</b> soft, lightened shades such as ${b} help you relax and sleep well.`, `<b>Exterior:</b> choose light, fade-resistant tones of your supporting or element colours; use deeper shades for trims, doors and mouldings.`, `<b>Colours to avoid:</b> you don’t have to avoid them completely — use them in small areas such as decor, curtains and cushions.`],
      note: "Element colours are a folk tradition and are for reference only. Use the homeowner’s element for the living room and exterior, and each person’s own element for their bedroom. Above all, choose colours you find beautiful and comfortable.",
      empty: "Enter your date of birth to see your lucky paint colours.", bad: "Invalid date of birth — please check again." },
    zh: { born: "出生日期", lunar: "农历年", menh: "五行", beforeTet: (y) => `您在农历春节前出生，按农历 ${y} 年计算。`,
      sinh: "相生色——最佳", ban: "本命色——相合", ky: "不宜作为主色", meaning: "风水解读",
      tips: "家居配色建议",
      tip: (s, b) => [`<b>客厅：</b>以相生色（${s}）的浅色调为底色，用本命色作点缀。`, `<b>卧室：</b>选用${b}等柔和的浅色，有助放松与睡眠。`, `<b>外墙：</b>选择相生色或本命色中浅而耐候的色调；线条、门窗和装饰线用较深的颜色。`, `<b>忌色：</b>不必完全避开，可小面积用于摆件、窗帘、抱枕等。`],
      note: "五行配色属于民间文化经验，仅供参考。客厅和外墙按屋主（家中主事人）的五行选色，卧室按使用者的五行选色。最重要的是选择您自己觉得好看、舒适的颜色。",
      empty: "输入出生日期，查看适合您的墙漆颜色。", bad: "出生日期无效，请重新检查。" }
  }
};
