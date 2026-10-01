/* DANH SÁCH SẢN PHẨM — sửa/bổ sung tại đây.
   loai: lot | min | bong | sieubong | mensu | sieutrang | chongtham | chongthamxm | nhu | botba
   khu : noi (nội thất) | ngoai (ngoại thất) | ca2 (nội & ngoại thất) */
window.THUONG_HIEU = [
  { id: "netec", ten: "NETEC Center", slogan: "Sơn chinh phục thời gian", logo: "assets/img/anh/logo-netec.webp", banner: "assets/img/anh/netec-poster.webp",
    moTa: "Dòng sơn NETEC Center thuộc hệ sinh thái Global Plus: bề mặt láng mịn, độ che phủ cao, hàm lượng VOC thấp, thân thiện với môi trường. Đầy đủ từ bột bả, sơn lót đến sơn phủ nội – ngoại thất và chống thấm." },
  { id: "npaint", ten: "N Paint Global", slogan: "Kiến tạo không gian xanh", logo: "assets/img/anh/logo-npaint.webp", banner: "assets/img/anh/npaint-poster2.webp",
    moTa: "N Paint Global có dải sản phẩm rộng nhất: từ sơn lót kháng kiềm, sơn mịn, bóng, siêu bóng đến men sứ cao cấp, chống thấm và sơn nhũ vàng trang trí — đáp ứng mọi hạng mục của một ngôi nhà." }
];

window.LOAI_SON = {
  botba:      { ten: "Bột bả",                    moTa: "Làm phẳng, che khe nứt nhỏ, tạo bề mặt mịn chắc trước khi sơn lót.", dung: "Bả 2 lớp mỏng lên tường đã khô, xả nhám phẳng rồi mới sơn lót." },
  lot:        { ten: "Sơn lót kháng kiềm",        moTa: "Ngăn kiềm và muối từ xi măng gây loang màu, phấn hóa; tăng độ bám dính và giúp lớp sơn phủ lên màu chuẩn, bền hơn.", dung: "Thi công 1 lớp sau bả, chờ khô theo hướng dẫn trên vỏ thùng rồi sơn phủ." },
  min:        { ten: "Sơn phủ mịn",               moTa: "Bề mặt mờ mịn, sang trọng, che khuyết điểm tường tốt; dễ thi công, chi phí hợp lý.", dung: "Sơn 2 lớp phủ sau lớp lót." },
  bong:       { ten: "Sơn phủ bóng",              moTa: "Bề mặt bóng nhẹ, màu sắc tươi, dễ lau chùi vết bẩn thông thường.", dung: "Sơn 2 lớp phủ sau lớp lót." },
  sieubong:   { ten: "Sơn phủ siêu bóng",         moTa: "Độ bóng cao, chống bám bẩn, lau chùi tốt — phù hợp nhà có trẻ nhỏ, hành lang, phòng khách.", dung: "Sơn 2 lớp phủ sau lớp lót kháng kiềm." },
  mensu:      { ten: "Sơn siêu bóng men sứ",      moTa: "Dòng cao cấp nhất: bề mặt bóng như men sứ, màu bền, kháng bẩn và lau chùi vượt trội.", dung: "Sơn 2 lớp phủ sau lớp lót kháng kiềm cùng hệ." },
  sieutrang:  { ten: "Sơn siêu trắng",            moTa: "Trắng sáng, độ phủ cao — lý tưởng cho trần nhà và không gian cần nhiều ánh sáng.", dung: "Sơn 2 lớp lên trần/tường đã lót." },
  chongtham:  { ten: "Sơn chống thấm màu",        moTa: "Vừa chống thấm vừa có màu trang trí cho tường ngoài, tường đứng chịu mưa gió.", dung: "Thi công lên tường đứng đã lót, 2 lớp theo hướng dẫn." },
  chongthamxm:{ ten: "Chống thấm pha xi măng",    moTa: "Trộn cùng xi măng theo tỉ lệ để chống thấm sàn mái, sê nô, nhà vệ sinh, bể nước, chân tường.", dung: "Trộn với xi măng theo tỉ lệ nhà sản xuất, quét 2–3 lớp đan chéo." },
  nhu:        { ten: "Sơn nhũ vàng",              moTa: "Hiệu ứng ánh kim sang trọng cho phào chỉ, cột, cổng, chi tiết trang trí điểm nhấn.", dung: "Thi công lên bề mặt đã lót, quét hoặc phun theo chi tiết." }
};

window.SAN_PHAM = [
  // NETEC CENTER
  { ma: "NE-200", ten: "Bột bả nội ngoại thất cao cấp NE-200", th: "netec", loai: "botba", khu: "ca2", anh: "assets/img/sp/ne200.webp", ghiChu: "Bao 25kg" },
  { ma: "G3", ten: "Sơn lót kháng kiềm nội thất cao cấp G3", th: "netec", loai: "lot", khu: "noi", anh: "assets/img/sp/g3.webp" },
  { ma: "G4", ten: "Sơn lót kháng kiềm ngoại thất cao cấp G4", th: "netec", loai: "lot", khu: "ngoai", anh: "assets/img/sp/g4.webp" },
  { ma: "G1", ten: "Sơn mịn nội thất cao cấp G1", th: "netec", loai: "min", khu: "noi", anh: "assets/img/sp/g1.webp" },
  { ma: "G2", ten: "Sơn mịn ngoại thất cao cấp G2", th: "netec", loai: "min", khu: "ngoai", anh: "assets/img/sp/g2.webp" },
  { ma: "G5", ten: "Sơn bóng nội thất cao cấp G5", th: "netec", loai: "bong", khu: "noi", anh: "assets/img/sp/g5.webp" },
  { ma: "G6", ten: "Sơn bóng ngoại thất cao cấp G6", th: "netec", loai: "bong", khu: "ngoai", anh: "assets/img/sp/g6.webp" },
  { ma: "G7", ten: "Sơn siêu bóng nội thất cao cấp G7", th: "netec", loai: "sieubong", khu: "noi", anh: "assets/img/sp/g7.webp" },
  { ma: "G8", ten: "Sơn siêu bóng ngoại thất cao cấp G8", th: "netec", loai: "sieubong", khu: "ngoai", anh: "assets/img/sp/g8.webp" },
  { ma: "G9", ten: "Sơn chống thấm màu cao cấp G9", th: "netec", loai: "chongtham", khu: "ngoai", anh: "assets/img/sp/g9.webp" },
  // N PAINT GLOBAL
  { ma: "NP-200", ten: "Bột bả tường nội ngoại thất cao cấp NP-200", th: "npaint", loai: "botba", khu: "ca2", anh: "assets/img/sp/np200.webp", ghiChu: "Bao 25kg" },
  { ma: "NP01", ten: "Sơn lót kháng kiềm ngoại thất cao cấp NP01 – Alkali Ext", th: "npaint", loai: "lot", khu: "ngoai", anh: "assets/img/sp/np01.webp" },
  { ma: "NP02", ten: "Sơn lót kháng kiềm nội & ngoại thất NP02 – Alkali Primer", th: "npaint", loai: "lot", khu: "ca2", anh: "assets/img/sp/np02.webp" },
  { ma: "NP03", ten: "Sơn lót kháng kiềm nội thất cao cấp NP03 – Alkali Int", th: "npaint", loai: "lot", khu: "noi", anh: "assets/img/sp/np03.webp" },
  { ma: "NP05", ten: "Sơn siêu trắng nội thất cao cấp NP05 – Super White", th: "npaint", loai: "sieutrang", khu: "noi", anh: "assets/img/sp/np05.webp" },
  { ma: "NP06", ten: "Sơn mịn nội thất cao cấp NP06 – Smooth Int", th: "npaint", loai: "min", khu: "noi", anh: "assets/img/sp/np06.webp" },
  { ma: "NP08", ten: "Sơn bóng nội thất cao cấp NP08 – Gloss Int", th: "npaint", loai: "bong", khu: "noi", anh: "assets/img/sp/np08.webp" },
  { ma: "NP09", ten: "Sơn siêu bóng nội thất cao cấp NP09 – Super Gloss", th: "npaint", loai: "sieubong", khu: "noi", anh: "assets/img/sp/np09.webp" },
  { ma: "NP10", ten: "Sơn siêu bóng men sứ nội thất NP10 – Enamel Int", th: "npaint", loai: "mensu", khu: "noi", anh: "assets/img/sp/np10.webp" },
  { ma: "NP11", ten: "Sơn mịn ngoại thất cao cấp NP11 – Silk Ext", th: "npaint", loai: "min", khu: "ngoai", anh: "assets/img/sp/np11.webp" },
  { ma: "NP12", ten: "Sơn bóng ngoại thất cao cấp NP12 – Gloss Ext", th: "npaint", loai: "bong", khu: "ngoai", anh: "assets/img/sp/np12.webp" },
  { ma: "NP16", ten: "Sơn siêu bóng ngoại thất cao cấp NP16 – Super Gloss", th: "npaint", loai: "sieubong", khu: "ngoai", anh: "assets/img/sp/np16.webp" },
  { ma: "NP18", ten: "Sơn siêu bóng men sứ ngoại thất NP18 – Enamel Ext", th: "npaint", loai: "mensu", khu: "ngoai", anh: "assets/img/sp/np18.webp" },
  { ma: "NP19", ten: "Sơn chống thấm pha xi măng NP19 – Waterproof", th: "npaint", loai: "chongthamxm", khu: "ca2", anh: "assets/img/sp/np19.webp" },
  { ma: "NP20", ten: "Sơn chống thấm màu cao cấp NP20 – Shield Color", th: "npaint", loai: "chongtham", khu: "ngoai", anh: "assets/img/sp/np20.webp" },
  { ma: "NP88", ten: "Sơn nhũ vàng cao cấp NP88 – Gold Paint", th: "npaint", loai: "nhu", khu: "ca2", anh: "assets/img/sp/np88.webp" }
];
