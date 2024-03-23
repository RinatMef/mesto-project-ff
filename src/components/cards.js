import { openModal } from "./modal.js";

const template = document.querySelector("#card-template").content;
const modalTypeImage = document.querySelector(".popup_type_image");
const modalTypeImageData = modalTypeImage.querySelector(".popup__image");
const placesList = document.querySelector(".places__list");

const createCard = (
  cardData,
  cardDeleteCallback,
  cardLikeCallback,
  handleOpenModalTypeImage
) => {
  const cardTemplate = template.cloneNode(true);
  const deleteButton = cardTemplate.querySelector(".card__delete-button");
  const likeButton = cardTemplate.querySelector(".card__like-button");
  const cardImage = cardTemplate.querySelector(".card__image");
  const cardTitle = cardTemplate.querySelector(".card__title");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  deleteButton.addEventListener("click", cardDeleteCallback);
  likeButton.addEventListener("click", cardLikeCallback);
  cardImage.addEventListener("click", handleOpenModalTypeImage);
  return cardTemplate;
};

const handleLikeButtonClick = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

const handleDeleteButtonClick = (evt) => {
  const card = evt.target.closest(".card");
  card.remove();
};

export const renderCards = (card, method = "append") => {
  card.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      handleDeleteButtonClick,
      handleLikeButtonClick,
      handleModalTypeImage
    );
    placesList[method](cardElement);
  });
};

export const addCardToList = (cardData, method = "prepend") => {
  const cardElement = createCard(
    cardData,
    handleDeleteButtonClick,
    handleLikeButtonClick,
    handleModalTypeImage
  );
  placesList[method](cardElement);
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
