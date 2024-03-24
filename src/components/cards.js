const template = document.querySelector("#card-template").content;
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
  const card = evt.target(".card");
  card.remove();
};

export const renderCards = (cards, method = "append") => {
  cards.forEach((cardData) => {
    addCardToList(cardData, method);
  });
};

export const addCardToList = (
  cardData,
  handleModalTypeImage,
  method = "prepend"
) => {
  const cardElement = createCard(
    cardData,
    handleDeleteButtonClick,
    handleLikeButtonClick,
    handleModalTypeImage
  );
  placesList[method](cardElement);
};
