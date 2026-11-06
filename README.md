# 🪡 Website Dự Án: "Khi Nào Cháu Về"

Dự án website triển lãm ảnh và lời nhắn cảm xúc, lấy cảm hứng từ hình ảnh cây kim khâu và sợi chỉ vá áo của bà — biểu tượng của sự chắt chiu, chờ đợi và tình yêu thương gia đình.

Website đã chính thức được phát hành trực tuyến 24/7 và kết nối hệ thống dữ liệu đám mây Google Cloud Firestore.

---

## 🌐 Đường link truy cập chính thức

* **Trang chủ**: https://hwudat.github.io/khi-nao-chau-ve/
* **Triển lãm**: https://hwudat.github.io/khi-nao-chau-ve/gallery.html
* **Gửi lời nhắn**: https://hwudat.github.io/khi-nao-chau-ve/upload.html
* **Về dự án**: https://hwudat.github.io/khi-nao-chau-ve/about.html
* **Nhà tài trợ**: https://hwudat.github.io/khi-nao-chau-ve/sponsors.html
* **Trang quản trị duyệt bài**: https://hwudat.github.io/khi-nao-chau-ve/admin.html
  * **Mã PIN bảo mật Ban Tổ Chức**: `davkhinaochauve`

---

## 📁 Cấu trúc thư mục (`D:\Web dự án Khi nào cháu về`)

```
D:\Web dự án Khi nào cháu về\
├── index.html          — Trang chủ (Hero logo lớn, kim khâu SVG, preview triển lãm, dải nhà tài trợ)
├── gallery.html        — Trang triển lãm ảnh & lời nhắn (Masonry Pinterest-style, bộ lọc cảm xúc, popup modal)
├── upload.html         — Cổng gửi lời nhắn ("Khâu lại lời nhớ", tự động nén ảnh, đếm ký tự)
├── about.html          — Về dự án (Câu chuyện ý nghĩa, biểu tượng kim/chỉ, timeline hành trình, ban tổ chức)
├── sponsors.html       — Nhà tài trợ ("Những sợi chỉ đồng hành", các gói tài trợ, form gửi đề xuất)
├── admin.html          — Trang quản trị / kiểm duyệt (Bảo mật bằng mã PIN riêng, duyệt/từ chối/gắn nhãn tài trợ)
├── mockup.html         — Bản phác thảo giao diện ban đầu
├── logo.png            — File logo chính thức (chữ tạo từ dây giày vàng shoelace)
├── css/
│   └── style.css       — Toàn bộ CSS phong cách vintage thủ công, viền khâu dashed, font chữ, responsive
└── js/
    ├── firebase-config.js — Cấu hình kết nối Google Cloud Firestore
    ├── data.js         — Tầng xử lý dữ liệu đám mây Firestore, nén ảnh tự động và dự phòng bộ nhớ
    └── main.js         — Hiệu ứng cuộn trang, navbar, modal xem ảnh, thông báo toast
```

---

## 🌟 Điểm nổi bật của hệ thống

1. **Nhận diện thương hiệu & Logo chính thức**:
   - Sử dụng logo gốc từ chất liệu dây giày màu vàng rực (`#FFD700`).
   - Kích thước logo ở Hero Section được phóng lớn ấn tượng, có hiệu ứng đổ bóng vàng ấm.

2. **Ngôn ngữ thiết kế: Kim Khâu & Sợi Chỉ**:
   - Hình minh họa kim khâu bằng SVG chuyển động lắc lư nhẹ nhàng.
   - Các đường phân cách section kiểu mũi khâu: `× × × × × × × × × ×`.
   - Khung card ảnh và form đều có viền nét đứt (dashed border) và 4 góc thêu chữ `✕`.
   - Nút hành động mang tên riêng: **"🧵 KHÂU LẠI LỜI NHỚ"**.

3. **Công nghệ nén ảnh thông minh & Đám mây Cloud Firestore**:
   - Người dùng tải bất kỳ ảnh nào lên, website sẽ tự động nén ảnh xuống cỡ tối ưu (~50 KB) mà vẫn giữ độ nét cao.
   - Lưu trữ trực tiếp lên Google Cloud Firestore hoàn toàn miễn phí, không phát sinh chi phí và chịu tải hàng chục nghìn lượt truy cập đồng thời.

4. **Khu vực Nhà Tài Trợ ("Những Sợi Chỉ Đồng Hành")**:
   - Trưng bày theo các hạng: *Kim Cương, Bạch Kim, Vàng, Bảo trợ truyền thông*.
   - Khung "Sponsored Story" kể câu chuyện nhân văn của thương hiệu.
   - Form tiếp nhận đề xuất tài trợ trực tiếp trên web.

5. **Quy trình Kiểm duyệt Bảo mật (Admin Dashboard)**:
   - Bài đăng từ người dùng sẽ ở trạng thái **Chờ duyệt (Pending)** để bảo vệ nội dung dự án.
   - Ban Tổ Chức truy cập `admin.html` với mã PIN bí mật: **`davkhinaochauve`**.
   - Bài sau khi duyệt sẽ lập tức xuất hiện đồng thời trên cả trang chủ và trang triển lãm cho tất cả mọi người trên toàn cầu cùng xem.

---

## 🚀 Cách mở và trải nghiệm thực tế

### Cách 1: Trải nghiệm trực tiếp trên Internet (Khuyên dùng)
Bạn và mọi người có thể mở link ngay trên điện thoại hoặc máy tính ở bất kỳ đâu:

1. **Gửi bài viết & ảnh**:
   - Truy cập: https://hwudat.github.io/khi-nao-chau-ve/upload.html
   - Chọn ảnh kỷ niệm, viết lời nhắn, chọn cảm xúc và bấm **"🧵 KHÂU LẠI LỜI NHỚ"**.

2. **Ban Tổ Chức duyệt bài**:
   - Truy cập: https://hwudat.github.io/khi-nao-chau-ve/admin.html
   - Nhập mã PIN: **`davkhinaochauve`** và bấm Đăng Nhập.
   - Tại danh sách bài chờ duyệt, bấm nút **"✅ Duyệt bài"** (hoặc gắn nhãn tài trợ / từ chối).

3. **Xem triển lãm công khai**:
   - Truy cập: https://hwudat.github.io/khi-nao-chau-ve/gallery.html
   - Bức ảnh và lời nhắn vừa được duyệt sẽ xuất hiện ngay trên bảng ghim triển lãm. Nhấp vào bài viết để phóng to xem chi tiết.

### Cách 2: Mở và chỉnh sửa cục bộ trên máy tính
1. Thư mục mã nguồn lưu tại: `D:\Web dự án Khi nào cháu về\`
2. Bạn có thể mở bất kỳ file HTML nào bằng trình duyệt (Chrome, Cốc Cốc, Edge, v.v.).
3. Khi có chỉnh sửa mới, chỉ cần chạy lệnh `git add .`, `git commit -m "..."`, `git push origin main` để cập nhật lên trang web trực tuyến.
