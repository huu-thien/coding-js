/**
 * 1. Bấm nút thì phát ra âm thanh tương ứng
 * 2. Điều chỉnh âm lượng
 * 3. Hiển thị / Ẩn keys
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let listKeys = [];
let audio = new Audio('tunes/a.wav');

const pianoKeys = $$('.piano-keys .key');
const volumeSlider = $('.volume-slider input');
const keysCheckbox = $('.keys-checkbox input');


function playTunes(key) {
    audio.src = `tunes/${key}.wav`
    audio.play();

    const keyActive = $(`[data-key="${key}"]`);
    keyActive.classList.add('active');
    setTimeout(() => {
        keyActive.classList.remove('active');
    }, 150)
}
function pressedKey(e) {
    if(listKeys.includes(e.key)) {
        playTunes(e.key);
    } 
}
function handlerVolume(e) {
    audio.volume = e.target.value;
}
function showHideKeys(e) {
    pianoKeys.forEach((key) => {
        key.classList.toggle('hide');
    })
}

pianoKeys.forEach((key) => {
    key.addEventListener('click', () => playTunes(key.getAttribute('data-key')));
    listKeys.push(key.dataset.key);
})

document.addEventListener('keydown', pressedKey);
volumeSlider.addEventListener('input', handlerVolume);
keysCheckbox.addEventListener('click', showHideKeys);