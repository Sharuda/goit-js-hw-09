import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const TIMER_DELAY = 1000;
let intervalIdTimer = null;
let selectedDate = null;
let currentDate = null;

const dateInput = document.querySelector('#datetime-picker');
const btnStartTimer = document.querySelector('[data-start]');
const daysTextEl = document.querySelector('[data-days]');
const hoursTextEl = document.querySelector('[data-hours]');
const minutesTextEl = document.querySelector('[data-minutes]');
const secondsTextEl = document.querySelector('[data-seconds]');

btnStartTimer.disabled = true;
btnStartTimer.addEventListener('click', timerStart);

let remainingTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateCheck(selectedDates);
  },
};

flatpickr(dateInput, options);

Report.info('Please, choose a date and click on start');

function onDateCheck(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();

  if (selectedDate > currentDate) {
    btnStartTimer.disabled = false;
    Report.success('Click on start!');
    return;
  }
  Report.failure('Please, choose a date in the future');
}

function timerStart() {
  intervalIdTimer = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalIdTimer);
      btnStartTimer.disabled = true;
      dateInput.disabled = false;
      return;
    } else {
      btnStartTimer.disabled = true;
      dateInput.disabled = true;
      currentDate += 1000;
      remainingTime = Math.floor(selectedDate - currentDate);
      convertMs(remainingTime);
    }
  }, TIMER_DELAY);
}

function createMarkup({ days, hours, minutes, seconds }) {
  daysTextEl.textContent = `${days}`;
  hoursTextEl.textContent = `${hours}`;
  minutesTextEl.textContent = `${minutes}`;
  secondsTextEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  createMarkup({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}
