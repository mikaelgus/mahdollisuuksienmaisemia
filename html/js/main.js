let buttons = document.querySelectorAll(".gradientBtn");
let alwaysOnButton = document.querySelectorAll(".alwaysOnGradiant");
const colorScale = chroma
  .scale(["#FF00F5", "#00F0FF", "#00FF19", "#FAFF00"])
  .domain([0, 0.7, 0.6, 0.9]);

const bodyHeight = window.innerHeight;
const bodyWidth = document
  .querySelector("body")
  .getBoundingClientRect().width;

function colorButtons() {
  buttons.forEach((button) => {
    button.onmouseover = function (event) {
      addButtonColor(button);
    };
    button.onmouseleave = function () {
      button.style = ``;
      button.classList.remove("gradiantButton");
    };
  });
}

function changeAlwaysOnButtonColor() {
  alwaysOnButton.forEach((button) => {
    addButtonColor(button);
  });
}

function addButtonColor(button) {
  let height = button.getBoundingClientRect().y;
  let width = button.getBoundingClientRect().x;
  let percentageLeftCorner =
    (height / bodyHeight + width / bodyWidth) / 2;
  let percentageRightCorner =
    ((height + button.offsetHeight) / bodyHeight +
      (button.offsetWidth + width) / bodyWidth) /
    2;

  // button.style.borderStyle = `solid`;
  button.classList.add("gradiantButton");
  button.style.borderImage = `linear-gradient(120deg,${colorScale(
    percentageLeftCorner
  )},${colorScale(percentageRightCorner)}) 10`;
}
colorButtons();
changeAlwaysOnButtonColor();

window.addEventListener("scroll", function () {
  changeAlwaysOnButtonColor();
});
let toggled = false;
document
  .querySelector(".audioButton")
  .addEventListener("click", (event) => {
    if (!toggled) {
      event.target.classList.add("paused");
      document.getElementById("player").play();
      toggled = true;
    } else {
      event.target.classList.remove("paused");
      document.getElementById("player").pause();
      toggled = false;
    }
  });

var openmodal = document.querySelectorAll(".modal-open");
for (var i = 0; i < openmodal.length; i++) {
  openmodal[i].addEventListener("click", function (event) {
    event.preventDefault();
    modalToggle(event);
  });
}

const overlay = document.querySelector(".modal-overlay");
overlay.addEventListener("click", modalToggle);
const modalTitle = document.querySelector("#modal-title")
const modalImage = document.querySelector("#modal-image")
const modalDesc = document.querySelector("#modal-desc")

var closemodal = document.querySelectorAll(".modal-close");
for (var i = 0; i < closemodal.length; i++) {
  closemodal[i].addEventListener("click", modalToggle);
}

document.onkeydown = function (evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = evt.key === "Escape" || evt.key === "Esc";
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape && document.body.classList.contains("modal-active")) {
    modalToggle();
  }
};

function modalToggle(event) {
    let dataElement
    if(event != undefined){
        dataElement = event.currentTarget.dataset
        console.log(event.currentTarget.dataset.titleText)
        modalTitle.innerHTML = dataElement.titleText
        modalDesc.innerHTML = dataElement.descText
        modalImage.src = dataElement.modalImage
    }
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");
  body.classList.toggle("modal-active");
}

