export const openModal = (popupElement) => {
  popupElement.classList.add("popup_is-animated");
  setTimeout(() => {
    popupElement.classList.add("popup_is-opened");
  }, 0);
  document.addEventListener("keydown", keyEscCloseModalHandler);
  document.addEventListener("click", closeModalOnOverlay);
};

export const closeModal = (popupElement) => {
  popupElement.classList.remove("popup_is-opened");
  setTimeout(() => {
    popupElement.classList.remove("popup_is-animated");
  }, 1000);
  document.removeEventListener("keydown", keyEscCloseModalHandler);
  document.removeEventListener("click", closeModalOnOverlay);
};

const closeModalOnOverlay = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
};

const keyEscCloseModalHandler = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};
