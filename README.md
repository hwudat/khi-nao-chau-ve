# 🪡 Website Dự Án: "Khi Nào Cháu Về"

Dự án website triển lãm ảnh và lời nhắn cảm xúc, lấy cảm hứng từ hình ảnh cây kim khâu và sợi chỉ vá áo của bà — biểu tượng của sự chắt chiu, chờ đợi và tình yêu thương gia đình.

---

## 📁 Cấu trúc thư mục (`D:\Web dự án Khi nào cháu về`)

```
D:\Web dự án Khi nào cháu về\
├── index.html          # Trang chủ (Hero logo lớn, kim khâu SVG, preview triển lãm, dải nhà tài trợ)
├── gallery.html        # Trang triển lãm ảnh & lời nhắn (Masonry Pinterest-style, bộ lọc cảm xúc, popup modal)
├── upload.html         # Cổng gửi lời nhắn ("Khâu lại lời nhớ", upload ảnh xem trước, đếm ký tự)
├── about.html          # Về dự án (Câu chuyện ý nghĩa, biểu tượng kim/chỉ, timeline hành trình, ban tổ chức)
├── sponsors.html       # Nhà tài trợ ("Những sợi chỉ đồng hành", các gói tài trợ, form gửi đề xuất)
├── admin.html          # Trang quản trị / kiểm duyệt (PIN: 1234, duyệt/từ chối/gắn nhãn tài trợ, thống kê)
├── mockup.html         # Bản phác thảo giao diện ban đầu
├── logo.png            # File logo chính thức (chữ tạo từ dây giày vàng shoelace)
├── css/
│   └── style.css       # Toàn bộ CSS phong cách vintage thủ công, viền khâu dashed, font chữ, responsive
└── js/
    ├── data.js         # Lưu trữ dữ liệu bằng LocalStorage (kèm sẵn dữ liệu mẫu demo)
    └── main.js         # Hiệu ứng cuộn trang, navbar, modal xem ảnh, thông báo toast
```

---

## 🌟 Điểm nổi bật đã hoàn thành

1. **Nhận diện thương hiệu & Logo chính thức**:
   - Sử dụng logo gốc từ chất liệu dây giày màu vàng rực (`#FFD700`).
   - Kích thước logo ở Hero Section được phóng lớn ấn tượng theo đúng ý bạn, có hiệu ứng đổ bóng vàng ấm.

2. **Ngôn ngữ thiết kế: Kim Khâu & Sợi Chỉ**:
   - Hình minh họa kim khâu bằng SVG chuyển động lắc lư (sway & float) nhẹ nhàng.
   - Các đường phân cách section kiểu mũi khâu: `× × × × × × × × × ×`.
   - Khung card ảnh và form đều có viền đứt nét (dashed border) và 4 góc thêu chữ `✕`.
   - Nút hành động mang tên riêng: **"🧵 KHÂU LẠI LỜI NHỚ"**.

3. **Tính năng Triển lãm & Modal phóng to**:
   - Hiển thị theo dạng bảng ghim (Masonry Grid) như album ảnh gia đình.
   - Bộ lọc cảm xúc: *Nhớ nhà, Tự hào, Vui, Biết ơn*.
   - Nhấp vào bất kỳ ảnh/lời nhắn nào để mở cửa sổ xem chi tiết (Modal).

4. **Khu vực Nhà Tài Trợ ("Những Sợi Chỉ Đồng Hành")**:
   - Trưng bày theo các hạng: *Kim Cương, Bạch Kim, Vàng, Bảo trợ truyền thông*.
   - Khung "Sponsored Story" kể câu chuyện nhân văn của thương hiệu thay vì banner quảng cáo thô ráp.
   - Form tiếp nhận đề xuất tài trợ trực tiếp trên web.

5. **Quy trình Kiểm duyệt (Admin Dashboard)**:
   - Người dùng gửi bài từ `upload.html` -> tự động lưu ở trạng thái **Chờ duyệt (Pending)**.
   - Ban tổ chức vào `admin.html` (Mã PIN: **1234**) để:
     - Xem danh sách bài mới
     - Duyệt bài (Bài được duyệt sẽ lập tức xuất hiện trên `gallery.html` và `index.html`)
     - Từ chối bài không phù hợp
     - Gắn huy hiệu "Đồng hành bởi nhà tài trợ"

---

## 🚀 Cách mở và trải nghiệm

1. Mở thư mục `D:\Wed dự án HNgoc\` trên máy tính.
2. Double-click chuột vào file **`index.html`** để mở trang chủ trên trình duyệt (Chrome, Cốc Cốc, Edge...).
3. Bạn có thể thử nghiệm luồng hoạt động:
   - Vào `upload.html` gửi một lời nhắn và ảnh mới.
   - Mở `admin.html` (nhập PIN `1234` hoặc bấm *Truy cập nhanh*) để duyệt bài vừa gửi.
   - Quay lại `gallery.html` để thấy bài viết vừa được khâu lên triển lãm!
