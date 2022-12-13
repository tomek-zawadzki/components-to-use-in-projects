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
