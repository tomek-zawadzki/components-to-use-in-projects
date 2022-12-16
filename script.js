const presents = document.querySelectorAll(".present");
const boxes = document.querySelectorAll(".drop-list-box");
const presentBox = document.querySelector(".presents-box");
const chosenBox = document.querySelector(".chosen-box");
const sendBtn = document.querySelector(".send-btn");

presents.forEach((present) => {
  present.addEventListener("dragstart", () => {
    present.classList.add("is-dragged");
  });
  present.addEventListener("dragend", () => {
    present.classList.remove("is-dragged");
  });
});

boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();

    const isDragged = document.querySelector(".is-dragged");
    box.appendChild(isDragged);

    leftPresents();
  });
});

const leftPresents = () => {
  const chosenPresents = presentBox.querySelectorAll(".present");
  if (chosenBox.childElementCount > 2) {
    chosenPresents.forEach((present) => {
      present.setAttribute("draggable", "false");
      present.classList.add("present-disabled");
    });
  } else {
    chosenPresents.forEach((present) => {
      present.setAttribute("draggable", "true");
      present.classList.remove("present-disabled");
    });
    sendBtn.disabled = false;
  }
};

// ACCORDION

const accordion = document.querySelector(".accordion");
const accordionBtns = document.querySelectorAll(".accordion-btn");

function openAccordionItems() {
  if (this.nextElementSibling.classList.contains("active")) {
    this.nextElementSibling.classList.remove("active");
  } else {
    closeAccordionItems();
    this.nextElementSibling.classList.toggle("active");
  }
}

function closeAccordionItems() {
  const allActiveItems = document.querySelectorAll(".accordion-info");
  allActiveItems.forEach((item) => item.classList.remove("active"));
}

const clickOutsideAccordion = (e) => {
  if (
    e.target.classList.contains("accordion-btn") ||
    e.target.classList.contains("accordion-info") ||
    e.target.classList.contains("accordion-info-text")
  )
    return;

  closeAccordionItems();
};

accordionBtns.forEach((btn) =>
  btn.addEventListener("click", openAccordionItems)
);

window.addEventListener("click", clickOutsideAccordion);

// SLIDER

const sliderBox = document.querySelector(".slider-box");
const leftSliderBtn = document.querySelector(".btn-left");
const rightSliderBtn = document.querySelector(".btn-right");
const carouselImages = document.querySelectorAll(".slider-img");
const carouselWidth = 800;
const carouselSpeed = 3000;

let index = 0;

const handleCarousel = () => {
  index++;
  changeImage();
};

let startCarousel = setInterval(handleCarousel, carouselSpeed);

const changeImage = () => {
  if (index > carouselImages.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = carouselImages.length - 1;
  }

  sliderBox.style.transform = `translateX(${-index * carouselWidth}px)`;
};

const handleRightArrow = () => {
  index++;
  changeImage();
};

const handleLeftArrow = () => {
  index--;
  changeImage();
};

rightSliderBtn.addEventListener("click", handleRightArrow);
leftSliderBtn.addEventListener("click", handleLeftArrow);

const resetInterval = () => {
  changeImage();
  clearInterval(startCarousel);
  startCarousel = setInterval(handleCarousel, carouselSpeed);
};

// UNWIND SLIDES
const bcg = document.querySelector(".unwind-slides");
const cards = document.querySelectorAll(".card");

function showCard() {
  cards.forEach((card) => {
    card.classList.remove("active");
    this.classList.add("active");
  });

  handleBgColor(this);
}

const handleBgColor = (card) => {
  const season = card.getAttribute("data-season");
  bcg.setAttribute("data-bg", season);
};

cards.forEach((card) => card.addEventListener("click", showCard));

// TYPE TEXT

const modal = document.querySelector(".modal");
const input = document.querySelector(".modal-input");
const modalBtn = document.querySelector(".modal-btn-tt");
const saveBtn = document.querySelector(".save-btn-tt");
const text = document.querySelector(".text-tt");
const errorMsg = document.querySelector(".error-msg");

let inputValue = "To jest testowa wiadomość";
let timeout;
let indexTT = 1;
let speed = 80;

const writingAnimation = () => {
  text.innerHTML = inputValue.slice(0, indexTT);

  indexTT++;

  if (indexTT > inputValue.length) return;

  timeout = setTimeout(writingAnimation, speed);
};

const showModal = () => {
  modal.classList.add("active");
};

const closeModal = () => {
  if (input.value == "") {
    errorMsg.textContent = "Wprowadź tekst";
    return;
  }
  inputValue = input.value;
  modal.classList.remove("active");
  clearStuff();
  writingAnimation();
};

const clearStuff = () => {
  indexTT = 1;
  clearTimeout(timeout);
  input.value = "";
  errorMsg.textContent = "";
};

modalBtn.addEventListener("click", showModal);
saveBtn.addEventListener("click", closeModal);

// writingAnimation();

// ZOOMING PHOTOS
const photo = document.querySelector(".zooming-exercise-img");

const zoomImg = (e) => {
  const x = e.clientX;
  const y = e.clientY;
  // wskazują pozycję kursora w przeglądarce

  const imgX = photo.offsetLeft;
  const imgY = photo.offsetTop;
  // pozycja obrazka

  const newX = (imgX - x) * -1;
  const newY = (imgY - y) * -1;
  // pozycja kursora wewnątrz obrazka

  photo.style.transformOrigin = `${newX}px ${newY}px`;
  photo.classList.add("zoom-img");
};

const resetImg = () => {
  photo.classList.remove("zoom-img");
};

photo.addEventListener("mousemove", zoomImg);
photo.addEventListener("mouseout", resetImg);
