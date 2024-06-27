const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondDegrees = ((seconds/60)*360)+90;
  secondHand.style.transform = `rotate(${secondDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins/60)*360)+90;
  minuteHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((mins/12)*360)+90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);
