import { userId } from "../index";

const template = document.querySelector("#card-template").content;

export const createCard = (
  cardData,
  cardDeleteCallback,
  handleOpenModalTypeImage,
  removeLike,
  addLike,
  checkLikedOnCard
) => {
  const cardTemplate = template.cloneNode(true);
  const cardElement = cardTemplate.querySelector(".card");
  const deleteButton = cardTemplate.querySelector(".card__delete-button");
  const likeButton = cardTemplate.querySelector(".card__like-button");
  const cardImage = cardTemplate.querySelector(".card__image");
  const cardTitle = cardTemplate.querySelector(".card__title");
  const cardLikeQty = cardTemplate.querySelector(".card__like-qty");
  const cardId = cardData["_id"];

  cardElement.setAttribute("id", cardId);

  if (checkLike(cardData.likes, userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (cardData.owner["_id"] === userId) {
    deleteButton.addEventListener("click", (evt) =>
      cardDeleteCallback(evt, cardElement, cardData)
    );
  } else {
    deleteButton.remove();
  }

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeQty.textContent = cardData.likes.length;

  likeButton.addEventListener("click", (evt) => {
    checkLikedOnCard(
      evt.target,
      cardLikeQty,
      removeLike,
      addLike,
      cardData["_id"]
    );
  });
  cardImage.addEventListener("click", (evt) =>
    handleOpenModalTypeImage(evt, cardElement, cardData)
  );
  return cardTemplate;
};

function checkLike(likes, userId) {
  return likes.some((like) => like["_id"] === userId);
}
