"""Tự động lấy tin mới (Google News RSS) và thêm vào data/tin-tuc.js.
Chạy mỗi sáng bằng GitHub Actions (.github/workflows/cap-nhat-tin.yml). Chỉ dùng thư viện chuẩn Python."""
import json, re, pathlib, urllib.request, urllib.parse, html, datetime as dt, random
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

ROOT = pathlib.Path(__file__).resolve().parent.parent
F = ROOT / "data" / "tin-tuc.js"
GIU_TOI_DA, MOI_NGAY_TOI_DA = 60, 5
VN = dt.timezone(dt.timedelta(hours=7))

# (chuyên mục, từ khóa tìm kiếm)
TRUY_VAN = [
    ("gia-vlxd", "giá vật liệu xây dựng"),
    ("gia-vlxd", "giá thép xây dựng hôm nay"),
    ("thi-truong-son", "ngành sơn Việt Nam"),
    ("thi-truong-son", "sơn chống thấm"),
    ("phap-ly", "giấy phép xây dựng nhà ở riêng lẻ"),
    ("xu-huong", "xu hướng màu sơn nhà"),
    ("quang-ninh", "Quảng Ninh nhà ở xây dựng"),
]
GOC_NHIN = {
    "gia-vlxd": ["Giá vật liệu thay đổi theo từng đợt — nên chốt báo giá và đặt hàng sát ngày thi công, so sánh 2–3 đại lý tại Quảng Ninh.",
                 "Phần vật tư thô chiếm tỉ trọng lớn; dự trù thêm 10–15% ngân sách để không bị động khi giá tăng."],
    "thi-truong-son": ["Mua sơn nên kiểm tra tem, mã QR và mua qua đơn vị có địa chỉ rõ ràng để tránh hàng kém chất lượng.",
                       "Sơn tốt mà thi công sai quy trình vẫn nhanh hỏng — đừng bỏ qua lớp bả và sơn lót kháng kiềm."],
    "phap-ly": ["Trước khi khởi công, gia đình nên hỏi UBND xã/phường để biết chính xác thủ tục áp dụng cho nhà mình."],
    "xu-huong": ["Muốn hợp xu hướng mà không lỗi mốt: dùng tông trung tính ấm làm nền và chỉ chọn 1 mảng tường làm điểm nhấn.",
                 "Màu trên bảng màu nhỏ thường nhạt hơn khi lên tường — hãy thử 1 m² trước khi quyết định."],
    "quang-ninh": ["Khí hậu biển và mùa nồm của Quảng Ninh đòi hỏi chống thấm kỹ và chọn sơn ngoại thất chịu thời tiết tốt."],
}

def lay_rss(q):
    url = "https://news.google.com/rss/search?" + urllib.parse.urlencode({"q": q + " when:2d", "hl": "vi", "gl": "VN", "ceid": "VN:vi"})
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (tungson-news-bot)"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()

def doc_tin(xml_bytes, cm):
    out = []
    for it in ET.fromstring(xml_bytes).iter("item"):
        tieu = html.unescape((it.findtext("title") or "").strip())
        nguon = (it.findtext("source") or "").strip()
        if nguon and tieu.endswith(" - " + nguon):
            tieu = tieu[: -len(" - " + nguon)]
        link = (it.findtext("link") or "").strip()
        try:
            ngay = parsedate_to_datetime(it.findtext("pubDate")).astimezone(VN).date().isoformat()
        except Exception:
            ngay = dt.datetime.now(VN).date().isoformat()
        if len(tieu) < 20 or not link:
            continue
        try:
            ts = parsedate_to_datetime(it.findtext("pubDate")).timestamp()
        except Exception:
            ts = 0
        out.append({"_ts": ts, "ngay": ngay, "chuyenMuc": cm, "tieuDe": tieu,
                    "tomTat": f"{tieu}. Bấm vào nguồn bên dưới để đọc toàn bộ bài viết từ {nguon or 'báo gốc'}.",
                    "gocNhin": random.choice(GOC_NHIN[cm]), "nguon": nguon or "Google News", "link": link})
    return sorted(out, key=lambda x: x["_ts"], reverse=True)  # tin mới nhất lên trước

def chuan(s):
    return re.sub(r"\W+", " ", s.lower()).strip()

def main():
    src = F.read_text(encoding="utf-8")
    cu = json.loads(re.search(r"window\.TIN_TUC\s*=\s*(\[.*\]);", src, re.S).group(1))
    da_co = {chuan(x["tieuDe"]) for x in cu} | {x.get("link") for x in cu}
    moi = []
    for cm, q in TRUY_VAN:
        try:
            for t in doc_tin(lay_rss(q), cm)[:3]:
                k = chuan(t["tieuDe"])
                if k in da_co or t["link"] in da_co:
                    continue
                t.pop("_ts", None); da_co.add(k); moi.append(t); break  # tối đa 1 tin / từ khóa
        except Exception as e:
            print("Bỏ qua", q, "-", e)
    moi = moi[:MOI_NGAY_TOI_DA]
    tat_ca = sorted(moi + cu, key=lambda x: x["ngay"], reverse=True)[:GIU_TOI_DA]
    luc = dt.datetime.now(VN).strftime("%Y-%m-%dT%H:%M")
    F.write_text("/* ĐIỂM TIN — được cập nhật tự động 2 lần mỗi ngày. Nội dung bên trong [ ] là JSON. */\nwindow.TIN_TUC = "
                 + json.dumps(tat_ca, ensure_ascii=False, indent=1) + ";\nwindow.TIN_CAP_NHAT = \"" + luc + "\";\n", encoding="utf-8")
    print(f"Thêm {len(moi)} tin mới, tổng {len(tat_ca)} tin.")

if __name__ == "__main__":
    main()
