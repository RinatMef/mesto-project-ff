import "./pages/index.css";
import { createCard } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  fetchUserData,
  patchUserData,
  fetchCards,
  postCard,
  removeCard,
  removeLike,
  addLike,
  patchUserAvatar,
} from "./components/api.js";

const modalTypeEdit = document.querySelector(".popup_type_edit");
const modalTypeNewCard = document.querySelector(".popup_type_new-card");
const editModalButton = document.querySelector(".profile__edit-button");
const newItemModalButton = document.querySelector(".profile__add-button");
const closeModalButtons = document.querySelectorAll(".popup__close");
const nameUser = document.querySelector(".profile__title");
const nameJob = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__image");
const editProfileForm = document.forms.edit__profile;
const newCardForm = document.forms.new__place;
const newAvatarForm = document.forms.new__avatar;
const modalTypeImage = document.querySelector(".popup_type_image");
const modalTypeNewAvatar = document.querySelector(".popup_type_new-avatar");
const modalTypeImageData = modalTypeImage.querySelector(".popup__image");
const modalTypeImageCaption = modalTypeImage.querySelector(".popup__caption");
const placesList = document.querySelector(".places__list");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__form__input-error_active",
};

//обрабочики событий

const handleEditAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  const avatarLink = newAvatarForm.link.value;

  addButtonPreloader(true, evt);
  patchUserAvatar(avatarLink)
    .then(() => {
      userAvatar.style["background-image"] = `url('${avatarLink}')`;
    })
    .catch((err) => {
      console.error("Произошла ошибка:", err);
    })
    .finally(() => {
      addButtonPreloader(false, evt);
      closeModal(modalTypeNewAvatar);
      newAvatarForm.reset;
    });
};

const addButtonPreloader = (isLoading, evt) => {
  if (isLoading) {
    evt.submitter.textContent = "Сохранение...";
  } else {
    evt.submitter.textContent = "Сохранить";
  }
};

// отправляет данные на сервер, получает ответ и отображает изменения на странице
const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  const userName = editProfileForm.name.value;
  const userAbout = editProfileForm.description.value;
  addButtonPreloader(true, evt);
  patchUserData(userName, userAbout)
    .then((data) => {
      nameUser.textContent = data.name;
      nameJob.textContent = data.about;
      editProfileForm.name.value = nameUser.textContent;
      editProfileForm.description.value = nameJob.textContent;
    })
    .catch((err) => {
      console.error("Произошла ошибка:", err);
    })
    .finally(() => {
      addButtonPreloader(false, evt);
      closeModal(modalTypeEdit);
    });
};

//функция проверки лайка карточки в DOM и ее отображение

const checkLikedOnCard = (
  likeButton,
  likeCount,
  removeLike,
  addLike,
  cardId
) => {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    removeLike(cardId)
      .then((data) => {
        likeCount.textContent = data.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    addLike(cardId)
      .then((data) => {
        likeCount.textContent = data.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.error("Произошла ошибка:", err);
      });
  }
};

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  addButtonPreloader(true, evt);
  const cardObject = {
    name: evt.target.place__name.value,
    link: evt.target.link.value,
  };
  postCard(cardObject.name, cardObject.link)
    .then((card) => {
      const cardData = {
        name: card.name,
        link: card.link,
        alt: card.name,
        _id: card._id,
        owner: {
          _id: card.owner._id,
        },
        likes: card.likes || [],
      };
      addCardToList(
        cardData,
        handleCardRemove,
        handleModalTypeImage,
        removeLike,
        addLike,
        checkLikedOnCard
      );
      addButtonPreloader(false, evt);
      closeModal(modalTypeNewCard);
      evt.target.reset();
    })
    .catch((err) => {
      console.error("Произошла ошибка:", err);
      addButtonPreloader(false, evt);
    });
};

const handleModalTypeImage = (evt) => {
  const cardImage = evt.target;
  if (cardImage) {
    modalTypeImageData.src = cardImage.src;
    modalTypeImageData.alt = cardImage.alt;
    modalTypeImageData.textContent = cardImage.alt;
    modalTypeImageCaption.textContent = cardImage.alt;
    openModal(modalTypeImage);
  }
};

// слушатели событий
userAvatar.addEventListener("click", (evt) => {
  newAvatarForm.reset;
  openModal(modalTypeNewAvatar);
  clearValidation(newAvatarForm, validationConfig);
});

newAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);

editProfileForm.addEventListener("submit", handleEditFormSubmit);

editModalButton.addEventListener("click", () => {
  editProfileForm.name.value = nameUser.textContent;
  editProfileForm.description.value = nameJob.textContent;
  openModal(modalTypeEdit);
  clearValidation(editProfileForm, validationConfig);
});

newItemModalButton.addEventListener("click", (evt) => {
  openModal(modalTypeNewCard);
  clearValidation(newCardForm, validationConfig);
});

newCardForm.addEventListener("submit", handleAddCardSubmit);

closeModalButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

const renderCards = (cards) => {
  cards.reverse().forEach((cardData) => {
    addCardToList(cardData);
  });
};

const addCardToList = (cardData) => {
  const cardElement = createCard(
    cardData,
    handleCardRemove,
    handleModalTypeImage,
    removeLike,
    addLike,
    checkLikedOnCard
  );
  placesList.prepend(cardElement);
};

//обработчик удаления карточки
const handleCardRemove = (evt) => {
  const card = evt.target.closest(".card");
  const id = card.id;

  removeCard(id)
    .then(() => {
      card.remove();
    })
    .catch((err) => console.error("Произошла ошибка:", err));
}

const getInitialCards = () => {
  fetchCards()
    .then((res) => {
      renderCards(res);
    })
    .catch((err) => console.log(err));
}

// функция, отображающая данные пользователя на странице
const renderUserData = () => {
  fetchUserData()
    .then((data) => {
      nameUser.textContent = data.name;
      nameJob.textContent = data.about;
      userAvatar.style["background-image"] = `url("${data.avatar}")`;
      editProfileForm.name.value = data.name;
      editProfileForm.description.value = data.about;
    })
    .catch((err) => console.error("Произошла ошибка:", err));
}

const promises = [renderUserData, getInitialCards];
Promise.all(promises)
  .then((resArr) => resArr.forEach((res) => res()))
  .catch((err) => console.error("Произошла ошибка:", err));

enableValidation(validationConfig);
