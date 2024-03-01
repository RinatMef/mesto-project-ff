function createCard(cardData, cardDeleteCallback) {
  const cardTemplate = document.querySelector("#card-template").content.cloneNode(true);
  const deleteButton = cardTemplate.querySelector(".card__delete-button");

  cardTemplate.querySelector(".card__image").src = cardData.link;
  cardTemplate.querySelector(".card__title").textContent = cardData.name;

  deleteButton.addEventListener("click", cardDeleteCallback);
  
  return cardTemplate;
  console.log(cardTemplate)
}

function handleDelete(event) {
  const card = event.target.closest(".card");
  card.remove();
}

function renderingCards(card) {
  const placesList = document.querySelector(".places__list");

  card.forEach(function (cardData) {
    const cardElement = createCard(cardData, handleDelete);
    placesList.appendChild(cardElement);
  });
}

renderingCards(initialCards);
