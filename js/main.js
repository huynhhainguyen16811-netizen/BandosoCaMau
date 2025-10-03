document.addEventListener('DOMContentLoaded', () => {

    // --- 1. KHAI BÁO BIẾN & DOM ELEMENTS ---
    const dom = {
        loader: document.getElementById('loader'),
        sidebar: document.getElementById('info-sidebar'),
        mapContainer: document.getElementById('map'),
        quizForm: document.getElementById('quiz-form'),
        // Thêm các element bị thiếu để sửa lỗi
        coopBtn: document.getElementById('coop-btn'), 
        // Modals
        welcomeModal: document.getElementById('welcome-modal'),
        culturalModal: document.getElementById('cultural-modal'),
        notificationModal: document.getElementById('notification-modal'),
        tourModal: document.getElementById('tour-modal'),
    };

    const state = {
        map: null,
        markers: {},
        currentPointData: null,
        currentTour: { polyline: null, animatedIcon: null, timer: null },
    };

    // --- 2. KHỞI TẠO ỨNG DỤNG ---
    function initializeApp() {
        initMap();
        loadMapData();
        setupEventListeners();
        showWelcomeModal();
    }

    // --- 3. KHỞI TẠO BẢN ĐỒ ---
    function initMap() {
        state.map = L.map(dom.mapContainer, { zoomControl: false }).setView([9.22, 105.5], 10);
        L.control.zoom({ position: 'bottomright' }).addTo(state.map);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 20
        }).addTo(state.map);
    }

    // --- 4. TẢI DỮ LIỆU & HIỂN THỊ ĐIỂM ---
    function loadMapData() {
        setTimeout(() => {
            mapData.points.forEach(point => {
                const icon = L.icon({
                    iconUrl: `images/icons/${point.icon}.png`, iconSize: [45, 45],
                    iconAnchor: [22, 45], popupAnchor: [0, -45],
                    className: point.is_locked ? 'map-icon locked' : 'map-icon'
                });
                const marker = L.marker(point.toa_do, { icon }).addTo(state.map);
                marker.pointData = point;
                state.markers[point.id] = marker;
                marker.bindTooltip(point.ten, { className: 'custom-tooltip', direction: 'top', offset: [0, -45] });
                if (!point.is_locked) marker.on('click', onMarkerClick);
            });
            dom.loader.style.opacity = '0';
            setTimeout(() => dom.loader.style.display = 'none', 700);
        }, 1500);
    }

    // --- 5. XỬ LÝ SỰ KIỆN ---
    function setupEventListeners() {
        document.getElementById('close-sidebar-btn').addEventListener('click', hideSidebar);
        document.getElementById('tour-link').addEventListener('click', (e) => { e.preventDefault(); showTourModal(); });
        dom.quizForm.addEventListener('submit', handleQuizSubmit);
        dom.coopBtn.addEventListener('click', () => showNotificationModal("Đây là tính năng mô phỏng giúp học sinh hiểu về kết nối cung-cầu."));
        
        document.querySelectorAll('.close-modal-btn').forEach(btn => btn.addEventListener('click', hideAllModals));
        document.getElementById('start-explore-btn').addEventListener('click', hideAllModals);

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.tab-btn.active').classList.remove('active');
                document.querySelector('.tab-content.active').classList.remove('active');
                btn.classList.add('active');
                document.getElementById(btn.dataset.tab).classList.add('active');
            });
        });

        // UX Nâng cao: Tự động đóng sidebar khi click ra ngoài bản đồ
        state.map.on('click', () => {
            if (!dom.sidebar.classList.contains('hidden')) {
                hideSidebar();
            }
        });
    }

    function onMarkerClick(e) {
        L.DomEvent.stopPropagation(e); // Ngăn sự kiện click trên map
        const data = e.target.pointData;
        state.map.flyTo(e.latlng, 13, { animate: true, duration: 1.5 });
        if (data.loai === 'van-hoa') {
            showCulturalModal(data);
        } else {
            showSidebar(data);
        }
    }

    function handleQuizSubmit(e) {
        e.preventDefault();
        const selected = dom.quizForm.querySelector('input[name="quiz-option"]:checked');
        const resultEl = document.getElementById('quiz-result');

        if (!selected) {
            resultEl.textContent = "Bạn chưa chọn đáp án!";
            resultEl.style.color = 'var(--tertiary-color)';
            return;
        }

        if (selected.value === state.currentPointData.giao_duc_stem.cau_hoi_quiz.dap_an_dung) {
            resultEl.textContent = "🎉 Chính xác! Một địa điểm mới đã được mở khóa.";
            resultEl.style.color = '#2a9d8f';
            unlockNextPoint();
            setTimeout(hideSidebar, 2000);
        } else {
            resultEl.textContent = "🤔 Sai rồi, bạn hãy suy nghĩ và thử lại nhé!";
            resultEl.style.color = 'var(--tertiary-color)';
        }
    }

    // --- 6. QUẢN LÝ GIAO DIỆN (UI) ---
    function showSidebar(data) {
        state.currentPointData = data;
        // Populate content
        document.getElementById('point-title').textContent = data.ten;
        document.getElementById('point-media').innerHTML = `<img src="${data.kinh_te.hinh_anh[0]}" alt="${data.ten}">`;
        document.getElementById('point-description').textContent = data.kinh_te.mo_ta;
        document.getElementById('point-story').textContent = data.kinh_te.cau_chuyen;
        document.getElementById('htx-name').textContent = data.ket_noi.ten_htx;
        document.getElementById('htx-representative').textContent = data.ket_noi.dai_dien;
        document.getElementById('htx-phone').textContent = data.ket_noi.sdt;
        document.getElementById('htx-product').textContent = data.ket_noi.san_pham;
        document.getElementById('stem-title').textContent = data.giao_duc_stem.tieu_de;
        document.getElementById('stem-content').textContent = data.giao_duc_stem.noi_dung;

        // Populate Quiz
        const quiz = data.giao_duc_stem.cau_hoi_quiz;
        document.getElementById('quiz-question').textContent = quiz.cau;
        document.getElementById('quiz-options').innerHTML = quiz.dap_an.map(opt => 
            `<label><input type="radio" name="quiz-option" value="${opt}"> ${opt}</label>`
        ).join('');
        document.getElementById('quiz-result').textContent = '';

        dom.sidebar.classList.remove('hidden');
    }

    function hideSidebar() { dom.sidebar.classList.add('hidden'); }
    function hideAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
    }
    
    function showWelcomeModal() {
        if (!sessionStorage.getItem('visited')) {
            dom.welcomeModal.classList.remove('hidden');
            sessionStorage.setItem('visited', 'true');
        }
    }

    function showCulturalModal(data) {
        document.getElementById('cultural-title').textContent = data.ten;
        document.getElementById('cultural-media-content').innerHTML = data.van_hoa.media_html;
        document.getElementById('cultural-description').textContent = data.van_hoa.mo_ta;
        dom.culturalModal.classList.remove('hidden');
    }

    function showNotificationModal(message) {
        document.getElementById('notification-message').textContent = message;
        dom.notificationModal.classList.remove('hidden');
    }

    // --- 7. GAMIFICATION & "WOW" EFFECTS ---
    function unlockNextPoint() {
        const pointToUnlock = mapData.points.find(p => p.is_locked);
        if (pointToUnlock) {
            pointToUnlock.is_locked = false;
            const marker = state.markers[pointToUnlock.id];
            marker.getElement().classList.remove('locked');
            marker.on('click', onMarkerClick);
            createStarburstEffect(marker.getLatLng());
        }
    }

    function createStarburstEffect(latlng) {
        const point = state.map.latLngToContainerPoint(latlng);
        const burstContainer = document.createElement('div');
        burstContainer.className = 'starburst';
        burstContainer.style.left = `${point.x}px`;
        burstContainer.style.top = `${point.y}px`;

        for (let i = 0; i < 12; i++) {
            const star = document.createElement('div');
            star.style.transform = `rotate(${i * 30}deg) translateY(-20px)`;
            star.style.animation = `starburst-anim 0.7s ${i * 0.02}s ease-out forwards`;
            burstContainer.appendChild(star);
        }
        document.getElementById('map-container').appendChild(burstContainer);
        setTimeout(() => burstContainer.remove(), 1000);
        
        // CSS for animation needs to be in JS because it's dynamic
        if (!document.getElementById('starburst-style')) {
            const style = document.createElement('style');
            style.id = 'starburst-style';
            style.innerHTML = `
            @keyframes starburst-anim {
                0% { transform: rotate(var(--angle)) translateY(-20px) scale(1); opacity: 1; }
                100% { transform: rotate(var(--angle)) translateY(-80px) scale(0); opacity: 0; }
            }`;
            document.head.appendChild(style);
        }
        burstContainer.querySelectorAll('div').forEach((star, i) => {
            star.style.setProperty('--angle', `${i * 30}deg`);
        });
    }

    // --- 8. TOUR KHÁM PHÁ HOẠT HÌNH ---
    function showTourModal() {
        const container = document.getElementById('tour-options-container');
        container.innerHTML = tourData.map(tour =>
            `<div class="tour-option" data-tour-id="${tour.id}"><h3>${tour.ten}</h3><p>${tour.mo_ta}</p></div>`
        ).join('');
        container.querySelectorAll('.tour-option').forEach(el => {
            el.addEventListener('click', (e) => {
                const tourId = e.currentTarget.dataset.tourId;
                const tour = tourData.find(t => t.id === tourId);
                startAnimatedTour(tour.diem_den);
            });
        });
        dom.tourModal.classList.remove('hidden');
    }

    function startAnimatedTour(pointIds) {
        hideAllModals();
        if (state.currentTour.timer) clearTimeout(state.currentTour.timer);
        if (state.currentTour.polyline) state.map.removeLayer(state.currentTour.polyline);
        if (state.currentTour.animatedIcon) state.map.removeLayer(state.currentTour.animatedIcon);

        const latlngs = pointIds.map(id => state.markers[id]?.getLatLng()).filter(p => p);
        if (latlngs.length < 2) return;

        state.currentTour.polyline = L.polyline([], { color: '#e76f51', weight: 5, opacity: 0.9 }).addTo(state.map);
        
        const animatedIconHtml = '<div class="tour-pulse-icon"></div>';
        if (!document.querySelector('style#tour-icon-style')) {
            const style = document.createElement('style');
            style.id = 'tour-icon-style';
            style.innerHTML = `
            .tour-pulse-icon { width: 16px; height: 16px; background: #e76f51; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 10px #000; }
            .tour-pulse-icon::after { content:''; display:block; width: 100%; height:100%; border-radius:50%; background: #e76f51; animation: pulse 1.5s infinite; }
            @keyframes pulse { 0% { transform: scale(0.8); opacity: 0.8; } 70% { transform: scale(2); opacity: 0; } 100% { opacity: 0; } }`;
            document.head.appendChild(style);
        }
        
        state.currentTour.animatedIcon = L.marker(latlngs[0], {
            icon: L.divIcon({ html: animatedIconHtml, className: '', iconSize: [16, 16] })
        }).addTo(state.map);

        state.map.flyToBounds(L.polyline(latlngs).getBounds(), { padding: L.point(70, 70), duration: 2 });

        let currentIndex = 0;
        const totalDuration = 2000; // ms per segment

        function animate() {
            if (currentIndex >= latlngs.length - 1) {
                setTimeout(() => state.map.removeLayer(state.currentTour.animatedIcon), 1000);
                return;
            };

            const start = latlngs[currentIndex];
            const end = latlngs[currentIndex + 1];
            let startTime = performance.now();
            
            function step(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / totalDuration, 1);
                
                const currentLatLng = [
                    start.lat + (end.lat - start.lat) * progress,
                    start.lng + (end.lng - start.lng) * progress
                ];
                
                state.currentTour.animatedIcon.setLatLng(currentLatLng);
                state.currentTour.polyline.setLatLngs([...state.currentTour.polyline.getLatLngs().slice(0, currentIndex), currentLatLng]);
                
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    state.currentTour.polyline.addLatLng(end); // Ensure final point is exact
                    currentIndex++;
                    const pointData = mapData.points.find(p => p.id === pointIds[currentIndex]);
                    state.markers[pointData.id].openTooltip();
                    state.currentTour.timer = setTimeout(animate, 500);
                }
            }
            requestAnimationFrame(step);
        }
        
        state.markers[pointIds[0]].openTooltip();
        state.currentTour.timer = setTimeout(animate, 2000); // Wait for map to fly to bounds
    }

    // --- 9. CHẠY ỨNG DỤNG ---
    initializeApp();
});