
const hangulData = {
    vowels: [
        { char: 'ㅏ', romanization: 'a', pronunciation: 'Como la "a" en "casa"', example: '가 (ga)' },
        { char: 'ㅓ', romanization: 'eo', pronunciation: 'Como "aw" en inglés', example: '저 (jeo)' },
        { char: 'ㅗ', romanization: 'o', pronunciation: 'Como la "o" en "oso"', example: '고 (go)' },
        { char: 'ㅜ', romanization: 'u', pronunciation: 'Como la "u" en "uno"', example: '주 (ju)' },
        { char: 'ㅡ', romanization: 'eu', pronunciation: 'Sin equivalente en español', example: '그 (geu)' },
        { char: 'ㅣ', romanization: 'i', pronunciation: 'Como la "i" en "si"', example: '기 (gi)' },
        { char: 'ㅔ', romanization: 'e', pronunciation: 'Como la "e" en "mesa"', example: '네 (ne)' },
        { char: 'ㅐ', romanization: 'ae', pronunciation: 'Entre "e" y "a"', example: '배 (bae)' }
    ],
    consonants: [
        { char: 'ㄱ', romanization: 'g/k', pronunciation: 'Entre "g" y "k"', example: '고 (go)' },
        { char: 'ㄴ', romanization: 'n', pronunciation: 'Como la "n" en "no"', example: '나 (na)' },
        { char: 'ㄷ', romanization: 'd/t', pronunciation: 'Entre "d" y "t"', example: '다 (da)' },
        { char: 'ㄹ', romanization: 'r/l', pronunciation: 'Entre "r" y "l"', example: '라 (ra)' },
        { char: 'ㅁ', romanization: 'm', pronunciation: 'Como la "m" en "mama"', example: '마 (ma)' },
        { char: 'ㅂ', romanization: 'b/p', pronunciation: 'Entre "b" y "p"', example: '바 (ba)' },
        { char: 'ㅅ', romanization: 's', pronunciation: 'Como la "s" en "sol"', example: '사 (sa)' },
        { char: 'ㅈ', romanization: 'j', pronunciation: 'Como la "j" en "jugo"', example: '자 (ja)' }
    ],
    'double-consonants': [
        { char: 'ㄲ', romanization: 'kk', pronunciation: 'G fuerte tensionada', example: '까 (kka)' },
        { char: 'ㄸ', romanization: 'tt', pronunciation: 'D fuerte tensionada', example: '따 (tta)' },
        { char: 'ㅃ', romanization: 'pp', pronunciation: 'B fuerte tensionada', example: '빠 (ppa)' },
        { char: 'ㅆ', romanization: 'ss', pronunciation: 'S fuerte tensionada', example: '싸 (ssa)' },
        { char: 'ㅉ', romanization: 'jj', pronunciation: 'J fuerte tensionada', example: '짜 (jja)' }
    ]
};

let currentCategory = 'vowels';
let currentCharIndex = 0;
let score = 0;
let learned = {
    vowels: new Set(),
    consonants: new Set(),
    'double-consonants': new Set()
};

function updateChar() {
    const data = hangulData[currentCategory][currentCharIndex];
    document.querySelector('.korean-char').textContent = data.char;
    document.querySelector('.romanization').textContent = data.romanization;
    document.querySelector('.pronunciation').textContent = data.pronunciation;
    document.querySelector('.example').textContent = data.example;
    
    // Ocultar información
    document.querySelector('.romanization').style.display = 'none';
    document.querySelector('.pronunciation').style.display = 'none';
    document.querySelector('.example').style.display = 'none';
    
    updateProgress();
}

function toggleInfo() {
    const elements = ['.romanization', '.pronunciation', '.example'];
    elements.forEach(selector => {
        const element = document.querySelector(selector);
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    });
}

function nextChar() {
    currentCharIndex = (currentCharIndex + 1) % hangulData[currentCategory].length;
    updateChar();
}

function markAsKnown() {
    learned[currentCategory].add(currentCharIndex);
    score += 10;
    document.getElementById('score').textContent = score;
    updateProgress();
    nextChar();
}

function markAsUnknown() {
    learned[currentCategory].delete(currentCharIndex);
    updateProgress();
    nextChar();
}

function updateProgress() {
    const progress = (learned[currentCategory].size / hangulData[currentCategory].length) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

function changeCategory() {
    currentCategory = document.getElementById('category').value;
    currentCharIndex = 0;
    updateChar();
}

// Iniciar la aplicación
updateChar();
