// commonjs
// const flatpickr = require("flatpickr");
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selDate = new Date();

const picker = flatpickr('#datetime-picker', {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
});

picker.setDate(new Date());

const tagDays = document.querySelector('[data-days]');
const tagHours = document.querySelector('[data-hours]');
const tagMinutes = document.querySelector('[data-minutes]');
const tagSeconds = document.querySelector('[data-Seconds]');
const btnStart = document.querySelector('[data-start]');
let selDataValid = false;

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

  return {
    days, hours, minutes, seconds,
  };
}

function addLeadingZero(value) {
  return value.toString().toString().padStart(2, '0');
}

function hdrInterval() {
  const currDate = Date.now();
  let difDays = Date.now();
  difDays = selDate[0] - currDate;
  tagDays.innerText = addLeadingZero(convertMs(difDays).days);
  tagHours.innerText = addLeadingZero(convertMs(difDays).hours);
  tagMinutes.innerText = addLeadingZero(convertMs(difDays).minutes);
  tagSeconds.innerText = addLeadingZero(convertMs(difDays).seconds);
}

btnStart.addEventListener('click', () => {
  if (selDataValid) {
    setInterval(hdrInterval, 1000);
  }
});

picker.config.onChange.push((selectedDates, dateStr, instance) => {
  selDate = selectedDates;
  picker.setDate(selDate);
  const diff = selDate[0] - Date.now();
  if (diff > 0) {
    selDataValid = true;
  } else {
    Notify.failure('Please choose a date in the future');
    selDataValid = false;
  }
});
