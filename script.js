document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. ローディング画面の制御
    // ==========================================
    const loadingScreen = document.getElementById('loading');
    
    // ページ読み込み完了時、または一定時間（1.5秒）経過後にフェードアウト
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('loaded');
        }, 1500); // 1500ミリ秒 = 1.5秒間ロックなアニメーションを見せる
    });

    // ==========================================
    // 1. スクロールフェードイン アニメーション
    // ==========================================
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
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
    // 2. ギャラリー カルーセルの無限ループ処理
    // ==========================================
    const track = document.getElementById('carouselTrack');
    
    if(track) {
        const cloneContent = track.innerHTML;
        track.innerHTML += cloneContent;
    }

});