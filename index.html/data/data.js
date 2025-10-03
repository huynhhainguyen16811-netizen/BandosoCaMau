const mapData = {
    "points": [
        {
            "id": "tom_su_bac_lieu",
            "ten": "Vùng Nuôi Tôm Sú Công Nghiệp Bạc Liêu",
            "loai": "kinh-te", "icon": "tom",
            "toa_do": [9.2934, 105.723],
            "kinh_te": {
                "hinh_anh": ["images/tom.jpg"],
                "mo_ta": "Bạc Liêu là một trong những thủ phủ tôm của Việt Nam, nổi tiếng với mô hình nuôi tôm sú công nghiệp, mang lại giá trị kinh tế cao và góp phần lớn vào kim ngạch xuất khẩu của tỉnh.",
                "cau_chuyen": "Câu chuyện về 'Vua tôm' Sáu Ngoãn là một huyền thoại. Từ hai bàn tay trắng, ông đã xây dựng nên một cơ ngơi tôm giống và thương phẩm khổng lồ, truyền cảm hứng cho nhiều thế hệ nông dân."
            },
            "ket_noi": { "ten_htx": "HTX Tôm Sạch Bạc Liêu", "dai_dien": "Ông Trần Văn An", "sdt": "0987.654.321", "san_pham": "Tôm sú, Tôm thẻ" },
            "giao_duc_stem": {
                "tieu_de": "Bài toán thực tế: Thử làm chủ đầm tôm",
                "noi_dung": "Một đầm tôm rộng 1ha cần chi phí: Giống (15 triệu), Thức ăn (40 triệu), Nhân công & Thuốc (10 triệu). Sản lượng dự kiến là 4 tấn/ha, giá bán 180.000đ/kg. Hãy tính lợi nhuận!",
                "cau_hoi_quiz": { "cau": "Tổng chi phí cho một vụ tôm trong bài toán là bao nhiêu?", "dap_an": ["A. 55 triệu", "B. 65 triệu", "C. 75 triệu"], "dap_an_dung": "B. 65 triệu" }
            },
            "is_locked": false
        },
        {
            "id": "dien_gio_hoabinh",
            "ten": "Nhà máy Điện gió Hòa Bình",
            "loai": "kinh-te", "icon": "dien-gio",
            "toa_do": [9.158, 105.539],
            "kinh_te": {
                "hinh_anh": ["images/dien-gio.jpg"],
                "mo_ta": "Cánh đồng điện gió Hòa Bình là một trong những dự án năng lượng tái tạo lớn nhất cả nước, không chỉ tạo ra nguồn điện sạch mà còn là một điểm du lịch check-in hấp dẫn.",
                "cau_chuyen": "Anh kỹ sư Minh chia sẻ: 'Mỗi lần nhìn những cánh quạt quay đều trong gió, tôi lại thấy tự hào vì góp phần tạo ra năng lượng sạch cho quê hương, giảm thiểu ô nhiễm môi trường.'"
            },
            "ket_noi": { "ten_htx": "Tập đoàn Năng lượng Tái tạo", "dai_dien": "Ban Quản lý Dự án", "sdt": "0291.3.123.456", "san_pham": "Năng lượng điện" },
            "giao_duc_stem": {
                "tieu_de": "Thử thách Vật lý: Năng lượng sạch từ gió",
                "noi_dung": "Một tua-bin gió có công suất 2.5 MW. Giả sử nó hoạt động ở 80% công suất trong 1 giờ. Lượng điện đó đủ cho bao nhiêu hộ gia đình sử dụng trong 1 ngày (biết mỗi hộ dùng 4 kWh/ngày)?",
                "cau_hoi_quiz": { "cau": "Trong 1 giờ, tua-bin trên tạo ra bao nhiêu kWh điện?", "dap_an": ["A. 2000 kWh", "B. 2500 kWh", "C. 800 kWh"], "dap_an_dung": "A. 2000 kWh" }
            },
            "is_locked": true
        },
        {
            "id": "muoi_bac_lieu",
            "ten": "Vùng làm muối Bạc Liêu",
            "loai": "kinh-te", "icon": "muoi",
            "toa_do": [9.200, 105.730],
            "kinh_te": {
                "hinh_anh": ["images/muoi.jpg"],
                "mo_ta": "Nghề làm muối ở Bạc Liêu đã có từ hàng trăm năm. Hạt muối ở đây nổi tiếng trắng trong, đậm đà nhờ nắng và gió biển đặc trưng. Các diêm dân cần cù lao động trên những cánh đồng muối trắng xóa.",
                "cau_chuyen": "Bí quyết của hạt muối Bạc Liêu nằm ở khâu phơi nắng. Người diêm dân phải 'trông trời, trông đất, trông mây', canh đúng con nước và độ nắng để cho ra hạt muối chất lượng nhất."
            },
            "ket_noi": { "ten_htx": "HTX Muối Diêm Điền", "dai_dien": "Bà Nguyễn Thị Lan", "sdt": "0912.345.678", "san_pham": "Muối hạt, Muối i-ốt" },
            "giao_duc_stem": {
                "tieu_de": "Khám phá Hóa học: Sự kết tinh của muối",
                "noi_dung": "Nước biển được đưa vào ruộng và phơi dưới nắng. Nước bốc hơi, nồng độ muối tăng dần đến mức bão hòa và kết tinh thành những hạt muối rắn. Quá trình này gọi là gì?",
                "cau_hoi_quiz": { "cau": "Hiện tượng nước chuyển từ lỏng sang hơi gọi là gì?", "dap_an": ["A. Đông đặc", "B. Bay hơi", "C. Ngưng tụ"], "dap_an_dung": "B. Bay hơi" }
            },
            "is_locked": true
        },
        {
            "id": "nha_hat_cao_van_lau",
            "ten": "Nhà hát Cao Văn Lầu",
            "loai": "van-hoa", "icon": "don-kim",
            "toa_do": [9.288, 105.732],
            "van_hoa": {
                "media_html": "<iframe width='100%' height='315' src='https://www.youtube.com/embed/jH_rRBo_lT4' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>",
                "mo_ta": "Nhà hát Cao Văn Lầu có hình dáng 3 chiếc nón lá, là biểu tượng của nghệ thuật Đờn ca tài tử Nam Bộ. Đây là nơi tôn vinh cố nhạc sĩ Cao Văn Lầu, cha đẻ của bản 'Dạ Cổ Hoài Lang' bất hủ."
            },
            "is_locked": false
        }
    ]
};

const tourData = [
    {
        id: "tour_nang_luong",
        ten: "Hành Trình Năng Lượng Xanh",
        mo_ta: "Khám phá quá trình tạo ra năng lượng sạch từ những cánh đồng điện gió và tìm hiểu về ngành muối truyền thống của Bạc Liêu.",
        diem_den: ["dien_gio_hoabinh", "muoi_bac_lieu"]
    },
    {
        id: "tour_van_hoa",
        ten: "Giai điệu Phương Nam",
        mo_ta: "Lắng đọng cùng những giai điệu đờn ca tài tử bất hủ và tìm hiểu về ngành kinh tế chủ lực của vùng đất Bạc Liêu.",
        diem_den: ["nha_hat_cao_van_lau", "tom_su_bac_lieu"]
    }
];