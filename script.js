document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. 📸 完全修正版：中央大きめ出現 → 四方爆発スキャッター
    // ==========================================
    const photoContainer = document.getElementById('loadingPhotoContainer');
    const loadingScreen = document.getElementById('loading');
    
    const imageSources = [
        'img/BEAT POP1.webp', 'img/BEAT POP2.webp', 'img/BEAT POP3.webp', 
        'img/BEAT POP4.webp', 'img/BEAT POP5.webp', 'img/BEAT POP6.webp', 
        'img/BEAT POP7.webp', 'img/BEAT POP8.webp', 'img/BEAT POP9.webp', 
        'img/BEAT POP10.webp'
    ];
    
    if (photoContainer) {
        const totalPhotos = 32; 
        
        for (let i = 0; i < totalPhotos; i++) {
            const img = document.createElement('img');
            img.src = imageSources[i % imageSources.length];
            img.classList.add('loading-photo');
            
            // 放射状のランダム角度を計算
            const angle = Math.random() * Math.PI * 2;
            
            // 1. 【最初から中央エリアに大きめで集まるための範囲指定】
            // 完全な画面の中心（50%, 50%）から、半径0px〜150pxの範囲に綺麗に散らして配置
            const midDistance = Math.random() * 150; 
            const offsetX = Math.cos(angle) * midDistance;
            const offsetY = Math.sin(angle) * midDistance;
            
            // 2. 【最後に四方に吹っ飛んで画面外へ消え去る位置】
            // コンテナが中央基準になったため、900px〜1200px飛ばせば完全に画面外へ消滅します
            const scatterDistance = Math.random() * 300 + 900; 
            const scatterX = Math.cos(angle) * scatterDistance;
            const scatterY = Math.sin(angle) * scatterDistance;
            
            const randomRotation = Math.random() * 30 - 15; // ゆるい初期の傾き
            const randomDelay = Math.random() * 1.0; // 浮かび上がるバラバラの時間差遅延
            
            // CSS変数に適用
            img.style.setProperty('--offsetX', `${offsetX}px`);
            img.style.setProperty('--offsetY', `${offsetY}px`);
            img.style.setProperty('--scatterX', `${scatterX}px`);
            img.style.setProperty('--scatterY', `${scatterY}px`);
            img.style.setProperty('--rot', `${randomRotation}deg`);
            img.style.animationDelay = `${randomDelay}s`;
            
            photoContainer.appendChild(img);
        }
    }
    
    // 写真が一斉に外側へ弾け飛び、完全に消え去るタイミング（2.5秒後）で
    // ローディング画面をフェードアウトさせ、背後の綺麗な左下タイトルのメイン画面へと繋ぎます。
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('loaded');
            }
        }, 2500); 
    });

    // ==========================================
    // 1. 🌌 背景浮遊パーティクルの自動生成
    // ==========================================
    const particleContainer = document.getElementById('particle-container');
    
    if (particleContainer) {
        const particleCount = 25; 
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 4 + 2; 
            const posX = Math.random() * 100; 
            const delay = Math.random() * 8; 
            const duration = Math.random() * 6 + 6; 
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}vw`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particleContainer.appendChild(particle);
        }
    }

    // ==========================================
    // 2. スクロールフェードイン アニメーション
    // ==========================================
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // ==========================================
    // 3. ギャラリー カルーセルの無限ループ処理
    // ==========================================
    const track = document.getElementById('carouselTrack');
    
    if (track) {
        const cloneContent = track.innerHTML;
        track.innerHTML += cloneContent;
    }

});