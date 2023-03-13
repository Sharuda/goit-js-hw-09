import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


let selectedDate = null;
let currentDate = null;
let intervalId = null;

const btnStartEl = document.querySelector('[data-start]');
btnStartEl.setAttribute('disabled', '');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const onClose = selectedDates => {
  currentDate = new Date();
  selectedDate = selectedDates[0];
  if (currentDate > selectedDate) {
    Notify.warning('Please choose a date in the future.');
    //    window.alert('ALERT');
    return;
  }
  btnStartEl.removeAttribute('disabled');
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

flatpickr('#datetime-picker', options);

const startCountdown = () => {
  btnStartEl.setAttribute('disabled', '');
  let currentTime = null;
  let countDown = null;
  const stopTime = selectedDate.getTime();

  intervalId = setInterval(() => {
    currentTime = Date.now();
    if (stopTime < currentTime) {
      stopCountdown();
      return;
    }
    countDown = convertMs(stopTime - currentTime);
    daysEl.textContent = addLeadingZero(countDown.days);
    hoursEl.textContent = addLeadingZero(countDown.hours);
    minutesEl.textContent = addLeadingZero(countDown.minutes);
    secondsEl.textContent = addLeadingZero(countDown.seconds);
  }, 1000);
  console.log();
};

const stopCountdown = () => {
  clearInterval(intervalId);
  btnStartEl.removeAttribute('disabled');
};

btnStartEl.addEventListener('click', startCountdown);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
