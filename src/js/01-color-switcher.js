// 1.Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону < body > на
// випадкове значення, використовуючи інлайн стиль.Натисканням на кнопку «Stop» зміна кольору фону
// повинна зупинятися.

// 2.Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.querySelector('body');
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

let idInterval = null;
let isActiveBtnStart = false;

btnStartEl.addEventListener('click', () => {
  isActiveBtnStart = true;

  if (isActiveBtnStart) {
    btnStartEl.setAttribute('disabled', 'disabled');
  }

  idInterval = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStopEl.addEventListener('click', () => {
  clearInterval(idInterval);
  btnStartEl.removeAttribute('disabled');

  isActiveBtnStart = false;
});
