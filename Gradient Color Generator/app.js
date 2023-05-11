/**
 * 1. Changing box gradient with inputs color
 * 2. Working on select box direction
 * 3. Uptate css code of textarea
 * 4. Genarate random color when click button refresh
 * 5. Working on copy button
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputColors = $$('.colors input');
const gradientBox = $('.gradient-box');
const selectedDirection = $('.select-box select');
const optionDirection = $$('.select-box select option');
const txtArea = $('textarea');
const btnRefresh = $('.buttons .refresh');
const btnCopyCode = $('.buttons .copy');

// console.log(gradientBox);

const app = {
    getRandomColor: function() {
        const randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
        return `#${randomColor}`
    },
    generateColor: function(isRandom) {
        if(isRandom) {
            inputColors[0].value = this.getRandomColor();
            inputColors[1].value = this.getRandomColor();
        }
        const gradient = `linear-gradient( ${selectedDirection.value}, ${inputColors[0].value}, ${inputColors[1].value})`;
        gradientBox.style.background = gradient;
        txtArea.textContent = `backround: ${gradient}`;
    },
    copyCode: function() {
        navigator.clipboard.writeText(txtArea.value);
        btnCopyCode.innerText = `Copied Code`;
        setTimeout(() => {
            btnCopyCode.innerText = `Copy Code`
        }, 1500)
    },
    handlerEvent: function() {
        // Changing box gradient with inputs color
        inputColors.forEach((input) => {
            input.oninput = () => this.generateColor(false)
        })

        // Working on select box direction
        selectedDirection.onchange = () => this.generateColor(false)

        //Genarate random color when click button refresh
        btnRefresh.onclick = () => this.generateColor(true)

        // Working on copy button
        btnCopyCode.onclick = this.copyCode
    },
    start: function() {
        this.handlerEvent();
    }
}
app.start();
