const userSumOfMoney = document.getElementById("user-cash");
const userBetSpan = document.getElementById("user-bet");
const userBetAmount = document.getElementById("bet-amount");
const rangeBar = document.getElementById("range-bar");
const btnMakeBet = document.getElementById("confirm-btn");
const rangeBarContainer = document.getElementById("range-bar-container");
const chooseCoinContainer = document.getElementById("choose-coin-container");
const btnHeads = document.getElementById("btn-heads");
const btnTail = document.getElementById("btn-tail");
const mainHeading = document.getElementById("main-heading");
const subHeading = document.getElementById("sub-heading");
const coin = document.getElementById("coin");
const videoContainer = document.getElementById("video-container");
const video = document.getElementById("video");
const btnVideo = document.getElementById("play-video");

rangeBar.addEventListener("input", () => updateBet(rangeBar.value));
btnMakeBet.addEventListener("click", makeTheBet);
btnHeads.addEventListener("click", () => flipTheCoin("heads"));
btnTail.addEventListener("click", () => flipTheCoin("tail"));
btnVideo.addEventListener("click", playVideo);

let audioLoss = new Audio("./public/sounds/Boosoundeffect.mp3");
let audioWrong = new Audio("./public/sounds/wrong.mp3");
let audioRight = new Audio("./public/sounds/right.mp3");
let userSum = 0;
getData();
let toggle = false;

userSumOfMoney.innerHTML = userSum;
updateBet(rangeBar.value);

async function getData() {
  try {
    const data = await fetchData();
    userSum = data.sumOfMoney;
    userSumOfMoney.innerHTML = userSum;
    return;
  } catch (error) {
    return error.message;
  }
}

function updateBet(value) {
  userBetAmount.innerHTML = value;
  userBetSpan.innerHTML = value;
}

function isToggle() {
  if (toggle === false) {
    rangeBarContainer.className = "d-none";
    chooseCoinContainer.className = "center";
    subHeading.innerHTML = "Select heads or tail";
    toggle = true;
    return;
  }
  rangeBarContainer.className = "center";
  chooseCoinContainer.className = "d-none";
  subHeading.innerHTML = "Select the amount of money you want to bet on";
  toggle = false;
}

function makeTheBet() {
  coin.className = "d-none";
  isToggle();
  userSum = userSum - rangeBar.value;
  userSumOfMoney.innerHTML = userSum;
  subHeading.innerHTML = "Select heads or tail";
}

async function flipTheCoin(term) {
  try {
    const result = await getRandomNum();
    coin.setAttribute("class", "coin animate-heads");
    isToggle();
    setTimeout(() => {
      if (term === result) return win();
      return lost();
    }, 3000);
  } catch (result) {
    coin.setAttribute("class", "coin animate-tails");
    isToggle();
    setTimeout(() => {
      if (term === result) return win();
      return lost();
    }, 3000);
  }
}

function win() {
  const win = rangeBar.value * 2;
  userSum = userSum + win;
  userSumOfMoney.innerHTML = userSum;
  rangeBar.max = userSum;
  audioRight.play();
}

function lost() {
  if (userSum === 0) return userLostAllHisMoney();
  audioWrong.play();
  rangeBar.max = userSum;
  updateBet(rangeBar.value);
}

function userLostAllHisMoney() {
  rangeBarContainer.className = "d-none";
  chooseCoinContainer.className = "d-none";
  toggle = false;
  audioLoss.play();
  subHeading.innerHTML =
    "Oops you seem to be running out of money Click on the link below, watch the video and win one hundred dollars";
  videoContainer.className = "row mb-4";
  coin.className = "d-none";
}

function playVideo() {
  btnVideo.setAttribute("disabled", "disabled");
  video.play();
  setTimeout(() => {
    videoContainer.className = "d-none";
    rangeBarContainer.className = "center";
    reset();
  }, 34000);
}

function reset() {
  userSum = 100;
  userSumOfMoney.innerHTML = 100;
  rangeBar.max = 100;
  rangeBar.value = 50;
  updateBet(rangeBar.value);
  subHeading.innerHTML = "Select the amount of money you want to bet on";
}
