document.addEventListener('DOMContentLoaded', () => {
    // スクロール時に要素を下からフワッと表示させる（フェードイン）処理
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15, // 要素が15%見えたら発火
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // クラスを追加してCSSのアニメーションを動かす
                entry.target.classList.add('appear');
                // 一度表示されたら監視を終了する
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});