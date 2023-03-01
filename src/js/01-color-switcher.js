const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let intervalId;
const startRandomColor = () => {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    console.log(getRandomHexColor());
  }, 1000);
  startBtn.disabled = true;
};

const stopRandomColor = () => {
  clearInterval(intervalId);
  startBtn.disabled = false;
};

startBtn.addEventListener('click', startRandomColor);
stopBtn.addEventListener('click', stopRandomColor);
