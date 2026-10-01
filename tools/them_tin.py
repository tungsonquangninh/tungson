"""Thêm tin mới vào data/tin-tuc.js.
Cách dùng: python3 tools/them_tin.py tin_moi.json
tin_moi.json là mảng JSON: [{"ngay":"YYYY-MM-DD","chuyenMuc":"gia-vlxd|thi-truong-son|phap-ly|xu-huong|quang-ninh",
"tieuDe":"...","tomTat":"...","gocNhin":"...","nguon":"...","link":"https://..."}]"""
import json, sys, re, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
F = ROOT / "data" / "tin-tuc.js"
GIU_TOI_DA = 60
CM = {"gia-vlxd", "thi-truong-son", "phap-ly", "xu-huong", "quang-ninh"}
src = F.read_text(encoding="utf-8")
cu = json.loads(re.search(r"window\.TIN_TUC\s*=\s*(\[.*\]);", src, re.S).group(1))
moi = json.load(open(sys.argv[1], encoding="utf-8"))
links = {x.get("link") for x in cu}; tieu = {x["tieuDe"] for x in cu}
them = []
for t in moi:
    assert re.fullmatch(r"\d{4}-\d{2}-\d{2}", t["ngay"]), t
    assert t["chuyenMuc"] in CM, t
    assert t["tieuDe"] and t["tomTat"] and t.get("link", "").startswith("http"), t
    if t["link"] in links or t["tieuDe"] in tieu:
        continue
    them.append({k: t.get(k, "") for k in ["ngay", "chuyenMuc", "tieuDe", "tomTat", "gocNhin", "nguon", "link"]})
tat_ca = sorted(them + cu, key=lambda x: x["ngay"], reverse=True)[:GIU_TOI_DA]
F.write_text("/* ĐIỂM TIN — được cập nhật tự động mỗi sáng. Nội dung bên trong [ ] là JSON. */\nwindow.TIN_TUC = "
             + json.dumps(tat_ca, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
print(f"Đã thêm {len(them)} tin, tổng {len(tat_ca)} tin.")
