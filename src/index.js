import './pages/index.css';
import { initialCards } from './scripts/cards';

const template = document.querySelector("#card-template").content;

function createCard(cardData, cardDeleteCallback) {
    const cardTemplate = template.cloneNode(true);
    const deleteButton = cardTemplate.querySelector(".card__delete-button");

    cardTemplate.querySelector(".card__image").src = cardData.link;
    cardTemplate.querySelector(".card__image").alt = cardData.name;
    cardTemplate.querySelector(".card__title").textContent = cardData.name;

    deleteButton.addEventListener("click", cardDeleteCallback);

    return cardTemplate;
}

function handleDeleteButtonClick(event) {
    const card = event.target.closest(".card");
    card.remove();
}

function renderCards(card) {
    const placesList = document.querySelector(".places__list");

    card.forEach(function (cardData) {
        const cardElement = createCard(cardData, handleDeleteButtonClick);
        placesList.appendChild(cardElement);
    });
}

renderCards(initialCards);