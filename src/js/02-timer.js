import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector(`[data-start]`);

startBtn.addEventListener('click', activ);

let timer = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: (selectedDates) => {
    //new Date() - текущая дата, делает ли эта библиотека преобразования? можно ли записать ниже в if вместо date - options.defaultDate?
    let date = new Date();
    if (date > selectedDates[0]) {
       Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } if (date < selectedDates[0]) {
      startBtn.disabled = false;
      timer = selectedDates[0] - date;
    }
  }
};

function addLeadingZero(num) {
  return ('' + num).padStart(2, '0');
}

function activ(){
  let interval = setInterval(() => {
    let time = convertMs(timer);

    document.querySelector('[data-days]').textContent = time.days;
    document.querySelector('[data-hours]').textContent = addLeadingZero(time.hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(time.minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(time.seconds);
    
    timer -= 1000;

    if (timer < 500) {
      clearTimeout(interval);
}    
  }, 1000);
  
}

flatpickr(input, options) 


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
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}