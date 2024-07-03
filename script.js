document.addEventListener("DOMContentLoaded", initializeGame);

function initializeGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // ゲームボードを初期化
    const cardImages = [
        '/src/card_joker.png', // 鬼カード
        '/src/card_normal.png', '/src/card_normal.png',
        '/src/card_normal.png', '/src/card_normal.png',
        '/src/card_normal.png', '/src/card_normal.png',
        '/src/card_normal.png', '/src/card_normal.png'
    ];
    cardImages.sort(() => Math.random() - 0.5); // カードをシャッフル

    cardImages.forEach(image => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.image = image; // カードの画像をデータ属性に保存
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    const cardType = this.dataset.image;
    this.style.backgroundImage = `url('${cardType}')`;
    this.classList.add('flipped');
    setTimeout(() => {
    if (cardType === '/src/card_joker.png') {
        playSound('oniCardSound');
        showModal('あなたの負けです！');
        disableAllCards();
    } else {
        playSound('safeCardSound');
        checkWinCondition();
    }
    }, 100);  // 100ミリ秒の遅延
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play();
}

function disableAllCards() {
    document.querySelectorAll('.card').forEach(card => {
        card.removeEventListener('click', flipCard);
        card.style.pointerEvents = 'none';
    });
}

function checkWinCondition() {
    const allFlipped = document.querySelectorAll('.card.flipped').length;
    const totalCards = document.querySelectorAll('.card').length;
    if (allFlipped === totalCards - 1) {
        showModal('おめでとう！ゲーム勝利！');
        playSound('VictorySound');
        disableAllCards();
    }
}

function toggleMusic() {
    const bgm = document.getElementById('bgm');
    if (bgm.paused) {
        bgm.play();
    } else {
        bgm.pause();
    }
}

function showModal(result) {
    const modal = document.getElementById("modal");
    const message = document.getElementById("resultMessage");
    message.textContent = result;
    modal.style.display = "block";

    const close = document.querySelector(".close");
    close.onclick = function() {
        modal.style.display = "none";
        initializeGame();
    };

    // ウィンドウ外をクリックしたときにモーダルを閉じる
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}