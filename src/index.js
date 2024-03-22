import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { renderCards, handleAddCardSubmit } from "./scripts/cards.js";
import { openModal, closeModal, closeModalOnOverlay, keyEscCloseModalHandler } from "./scripts/modal.js";

const modalTypeEdit = document.querySelector(".popup_type_edit");
const modalTypeNewCard = document.querySelector(".popup_type_new-card");
const modalTypeImage = document.querySelector('.popup_type_image');
const editModalButton = document.querySelector(".profile__edit-button");
const newItemModalButton = document.querySelector(".profile__add-button");
const closeModalButtons = document.querySelectorAll(".popup__close");
const nameInput = document.querySelector(".profile__title");
const nameJob = document.querySelector(".profile__description");
const editProfile = document.forms.edit__profile;

const handleEditFormSubmit= (evt) => {
  evt.preventDefault();
  nameInput.textContent = editProfile.name.value;
  nameJob.textContent = editProfile.description.value;
  closeModal(modalTypeEdit);
}

modalTypeEdit.addEventListener("submit", handleEditFormSubmit);

editModalButton.addEventListener("click", () => {
  editProfile.name.value = nameInput.textContent;
  editProfile.description.value = nameJob.textContent;
  openModal(modalTypeEdit);

  document.addEventListener('keydown', keyEscCloseModalHandler);
});



newItemModalButton.addEventListener("click", () => {
  openModal(modalTypeNewCard);
  document.addEventListener('keydown', keyEscCloseModalHandler);
});

const handleModalTypeImage = (evt) => {
  const cardImage = evt.target.closest(".card__image");
  if (cardImage) {
    modalTypeImage.querySelector('.popup__image').src = cardImage.src;
    modalTypeImage.querySelector('.popup__image').alt = cardImage.alt;
    modalTypeImage.querySelector('.popup__caption').textContent = cardImage.alt;
    openModal(modalTypeImage);
    document.addEventListener('keydown', keyEscCloseModalHandler);
  }
}

document.addEventListener('click', closeModalOnOverlay);
document.addEventListener('click', handleModalTypeImage);
modalTypeNewCard.addEventListener("submit", handleAddCardSubmit);


closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const openedModal = button.closest(".popup_is-opened");
    if (openedModal.classList.contains('popup_type_new-card')) {
      closeModal(openedModal);
      openedModal.querySelector('[name="place__name"]').value = "";
      openedModal.querySelector('[name="link"]').value = "";
    } else if (openedModal) {
      closeModal(openedModal);
    }
  });
});


renderCards(initialCards);

