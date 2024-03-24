import "./pages/index.css";
import { initialCards } from "./components/initialCards.js";
import { renderCards, addCardToList } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

const modalTypeEdit = document.querySelector(".popup_type_edit");
const modalTypeNewCard = document.querySelector(".popup_type_new-card");
const editModalButton = document.querySelector(".profile__edit-button");
const newItemModalButton = document.querySelector(".profile__add-button");
const closeModalButtons = document.querySelectorAll(".popup__close");
const nameInput = document.querySelector(".profile__title");
const nameJob = document.querySelector(".profile__description");
const editProfileForm = document.forms.edit__profile;
const newCardForm = document.forms.new__place;
const modalTypeImage = document.querySelector(".popup_type_image");
const modalTypeImageData = modalTypeImage.querySelector(".popup__image");

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  nameInput.textContent = editProfileForm.name.value;
  nameJob.textContent = editProfileForm.description.value;
  closeModal(modalTypeEdit);
};

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const cardObject = {
    name: evt.target.place__name.value,
    link: evt.target.link.value,
  };
  closeModal(modalTypeNewCard);
  evt.target.reset();
  addCardToList(cardObject, handleModalTypeImage);
};

const handleModalTypeImage = (evt) => {
  const cardImage = evt.target.closest(".card__image");
  if (cardImage) {
    modalTypeImageData.src = cardImage.src;
    modalTypeImageData.alt = cardImage.alt;
    modalTypeImageData.textContent = cardImage.alt;
    openModal(modalTypeImage);
  }
};

editProfileForm.addEventListener("submit", handleEditFormSubmit);

editModalButton.addEventListener("click", () => {
  editProfileForm.name.value = nameInput.textContent;
  editProfileForm.description.value = nameJob.textContent;
  openModal(modalTypeEdit);
});

newItemModalButton.addEventListener("click", () => {
  openModal(modalTypeNewCard);
});

newCardForm.addEventListener("submit", handleAddCardSubmit);

closeModalButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

renderCards(initialCards, handleModalTypeImage);
