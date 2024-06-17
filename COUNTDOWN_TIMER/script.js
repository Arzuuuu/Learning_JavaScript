const countdownElement = document.getElementById("countdown");
const startbutton = document.getElementById("start");
const stopbutton = document.getElementById("stop");
const resetbutton = document.getElementById("reset");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

stopbutton.disabled = true;
resetbutton.disabled = true;

let interval;
let time = 0;
let timerunning = false;

function applyCountdownStyles() {
  countdownElement.style.fontSize = "3rem";
  countdownElement.style.fontWeight = "bolder";
  countdownElement.querySelector("span").style.borderRadius = "30px";
  countdownElement.querySelector("span").style.padding = "40px";
  countdownElement.querySelector("span").style.paddingLeft = "100px";
  countdownElement.querySelector("span").style.paddingRight = "100px";
  countdownElement.querySelector("span").style.background =
    "linear-gradient(-45deg, pink, blue)";
}

function updatetimer() {
  if (time <= 0) {
    clearInterval(interval);
    timerunning = false;
    countdownElement.textContent = "00:00:00";
    applyCountdownStyles(); // Reapply CSS styles
    stopbutton.disabled = true;
    resetbutton.disabled = true;
    startbutton.disabled = false;
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;

    // Reset input values
    hoursInput.value = "0";
    minutesInput.value = "0";
    secondsInput.value = "0";
  } else {
    time--;
    countdownElement.querySelector("span").textContent = formatTime(time);
  }

  if (time <= 0) {
    startbutton.disabled = false;
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    clearInterval(interval);
    timerunning = false;
    countdownElement.querySelector("span").textContent = "00:00:00";
    countdownElement.style.fontSize = "3rem"; // Reset CSS properties
    stopbutton.disabled = true;
    resetbutton.disabled = true;
    hoursInput.value = "00";
    minutesInput.value = "00";
    secondsInput.value = "00";
    interval = null;
  }
}

function startcountdownElement() {
  if (!timerunning) {
    const inputhours = parseInt(hoursInput.value) || 0;
    const inputmins = parseInt(minutesInput.value) || 0;
    const inputsecs = parseInt(secondsInput.value) || 0;

    if (inputhours === 0 && inputmins === 0 && inputsecs === 0) {
      alert("Please enter a valid time.");
      return;
    }

    time = inputhours * 3600 + inputmins * 60 + inputsecs;
    timerunning = true;
    stopbutton.disabled = false;
    resetbutton.disabled = false;
    startbutton.disabled = true;
    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    interval = setInterval(updatetimer, 1000);
  }
}

function stopcountdownElement() {
  if (timerunning) {
    clearInterval(interval);
    timerunning = false;
    stopbutton.disabled = true;
    resetbutton.disabled = false;
    startbutton.disabled = false;
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
  }
}

function resetcountdownElement() {
  if (!timerunning || timerunning) {
    clearInterval(interval);
    timerunning = false;
    countdownElement.querySelector("span").textContent = "00:00:00";
    countdownElement.style.fontSize = "3rem"; // Reset CSS properties

    hoursInput.value = "00";
    minutesInput.value = "00";
    secondsInput.value = "00";
    stopbutton.disabled = true;
    resetbutton.disabled = true;
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    startbutton.disabled = false;
  }
}

startbutton.addEventListener("click", startcountdownElement);
stopbutton.addEventListener("click", stopcountdownElement);
resetbutton.addEventListener("click", resetcountdownElement);

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const newHours = hours.toString().padStart(2, "0");
  const newMinutes = minutes.toString().padStart(2, "0");
  const newSeconds = seconds.toString().padStart(2, "0");

  return `${newHours}:${newMinutes}:${newSeconds}`;
}
