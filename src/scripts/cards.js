export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

import { closeModal } from "./modal.js";

const template = document.querySelector("#card-template").content;
const modalTypeNewCard = document.querySelector(".popup_type_new-card");

const createCard = (cardData, cardDeleteCallback, cardLikeCallback) => {
  const cardTemplate = template.cloneNode(true);
  const deleteButton = cardTemplate.querySelector(".card__delete-button");
  const likeButton = cardTemplate.querySelector(".card__like-button");
  cardTemplate.querySelector(".card__image").src = cardData.link;
  cardTemplate.querySelector(".card__image").alt = cardData.name;
  cardTemplate.querySelector(".card__title").textContent = cardData.name;
  deleteButton.addEventListener("click", cardDeleteCallback);
  likeButton.addEventListener("click", cardLikeCallback);
  return cardTemplate;
}

const handleLikeButtonClick = (evt) => {
  const card = evt.target.closest(".card");
  const likeButton = card.querySelector(".card__like-button");
  likeButton.classList.toggle("card__like-button_is-active");
};

const handleDeleteButtonClick = (evt) => {
  const card = evt.target.closest(".card");
  card.remove();
};

export const renderCards = (card) => {
  const placesList = document.querySelector(".places__list");
  card.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      handleDeleteButtonClick,
      handleLikeButtonClick
    );
    placesList.appendChild(cardElement);
  });
};

const addCardToList = (cardData) => {
  const placesList = document.querySelector(".places__list");
  const cardElement = createCard(
    cardData,
    handleDeleteButtonClick,
    handleLikeButtonClick
  );
  placesList.prepend(cardElement);
}

export const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const cardObject = {
    name: evt.target.place__name.value,
    link: evt.target.link.value,
  };
  initialCards.unshift(cardObject);
  closeModal(modalTypeNewCard);
  evt.target.place__name.value = "";
  evt.target.link.value = "";
  addCardToList(cardObject);
}
