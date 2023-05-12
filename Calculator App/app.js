

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const wrapper = $('.wrapper')
const btnChangeTheme = $('.choose-theme input')
const inputExpression = $('.screen-expression input');
const result = $('.screen-result p')
const buttons = $$('.btn')

const app = {
    changeTheme: function () {
        btnChangeTheme.onclick = () => {
            wrapper.classList.toggle('light-theme');
            $('.choose-theme p').textContent = wrapper.classList.contains('light-theme') ? 'Dark mode' : 'Light mode';
        }
    },
    handlerEvents: function() {
        buttons.forEach((button) => {
            button.onclick = () => {
                switch (button.textContent) {
                    case '1':
                        inputExpression.value += '1';
                        result.textContent = '0'
                        break;
                    case '2':
                        inputExpression.value += '2';
                        result.textContent = '0'
                        break;
                    case '3':
                        inputExpression.value += '3';
                        result.textContent = '0'
                        break;
                    case '4':
                        inputExpression.value += '4';
                        break;
                    case '5':
                        inputExpression.value += '5';
                        result.textContent = '0'
                        break;
                    case '6':
                        inputExpression.value += '6';
                        result.textContent = '0'
                        break;
                    case '7':
                        inputExpression.value += '7';
                        result.textContent = '0'
                        break;
                    case '8':
                        inputExpression.value += '8';
                        result.textContent = '0'
                        break;
                    case '9':
                        inputExpression.value += '9';
                        result.textContent = '0'
                        break;
                    case '0':
                        inputExpression.value += '0';
                        result.textContent = '0'
                        break;
                    case '+':
                        inputExpression.value += '+';
                        result.textContent = '0'
                        break;
                    case '-':
                        inputExpression.value += '-';
                        result.textContent = '0'
                        break;
                    case 'x':
                        inputExpression.value += '*';
                        result.textContent = '0'
                        break;
                    case '/':
                        inputExpression.value += '/';
                        result.textContent = '0'
                        break;
                    case '**':
                        inputExpression.value += '**';
                        result.textContent = '0'
                        break;
                    case '.':
                        inputExpression.value += '.';
                        result.textContent = '0'
                        break;
                    case 'C':
                        inputExpression.value = '';
                        result.textContent = '0'
                        break;
                    case '%':
                        inputExpression.value += '%';
                        result.textContent = '0'
                        break;
                    case ':':
                        inputExpression.value = inputExpression.value.substring(0, inputExpression.value.length - 1);
                        result.textContent = '0'
                        break;
                    case '=':
                        if(Number.isInteger(Number(eval(inputExpression.value))))
                            result.textContent = eval(inputExpression.value)
                        else 
                            result.textContent = Number(eval(inputExpression.value)).toFixed(4);
                        break;
                }
            }
        })
    },

    start: function() {
        this.handlerEvents();
        this.changeTheme();
    }
}

app.start();