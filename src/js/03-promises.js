// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay)
// стільки разів, скільки ввели в поле amount.Під час кожного виклику передай їй номер промісу(position),
//   що створюється, і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс,
//   який виконується або відхиляється через delay часу.Значенням промісу повинен бути об'єкт,
//   в якому будуть властивості position і delay зі значеннями однойменних параметрів.
//   Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати
//   або відхилити.

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmitForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  getResult(inputDelay, inputStep, inputAmount);
  event.currentTarget.reset();
}

function getResult(inputDelay, inputStep, inputAmount) {
  for (let i = 1; i <= inputAmount; i += 1) {
    inputDelay += inputStep;

    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
