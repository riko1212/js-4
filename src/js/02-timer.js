// const TIMER_DEDLINE = new Date(2023, 8, 9);
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.success('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
      const setTimer = () => {
        timer.timerDedline = selectedDates[0];
        timer.start();
      };

      btnStart.addEventListener('click', setTimer);
    }
  },
});

const timer = {
  intrvalId: null,
  timerDedline: null,
  rootSelector: document.querySelector('.timer'),
  start() {
    this.intrvalId = setInterval(() => {
      const diff = this.timerDedline - Date.now();
      if (diff <= 0) {
        this.stop();
        return;
      }
      const { days, hours, minutes, seconds } = this.getTimeComponents(diff);
      this.rootSelector.querySelector('[data-days]').textContent =
        this.pad(days);
      this.rootSelector.querySelector('[data-hours]').textContent =
        this.pad(hours);
      this.rootSelector.querySelector('[data-minutes]').textContent =
        this.pad(minutes);
      this.rootSelector.querySelector('[data-seconds]').textContent =
        this.pad(seconds);
      console.log(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intrvalId);
  },
  getTimeComponents(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },
  pad(value) {
    return String(value).padStart(2, 0);
  },
};

// setTimeout(() => {
//   timer.stop();
// }, 5000);
