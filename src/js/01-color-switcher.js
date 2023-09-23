let changeColorInterval;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function hdrInterval() {
  document.body.style.backgroundColor = getRandomHexColor();
}

const btnStart = document.querySelector('[data-start]');
btnStart.addEventListener('click', (e) => {
  const element = e.currentTarget;
  changeColorInterval = setInterval(hdrInterval, 1000);
  element.setAttribute('disabled', '');
});

const btnStop = document.querySelector('[data-stop]');
btnStop.addEventListener('click', () => {
  clearInterval(changeColorInterval);
  btnStart.removeAttribute('disabled');
});
