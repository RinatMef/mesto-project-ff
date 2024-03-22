export const openModal = (popupElement) => {
  popupElement.classList.add("popup_is-animated");
  setTimeout(() => {
    popupElement.classList.add("popup_is-opened");
  }, 0);
};

export const closeModal = (popupElement) => {
  popupElement.classList.remove("popup_is-opened");
  setTimeout(() => {
    popupElement.classList.remove("popup_is-animated");
  }, 1000);
};

export const closeModalOnOverlay = (evt) => {
  if (evt.target.classList.contains("popup")) {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal.classList.contains("popup_type_new-card")) {
      closeModal(openedModal);
      openedModal.querySelector('[name="place__name"]').value = "";
      openedModal.querySelector('[name="link"]').value = "";
    } else if (openedModal) {
      closeModal(openedModal);
    }
  }
};

export const keyEscCloseModalHandler = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal.classList.contains("popup_type_new-card")) {
      closeModal(openedModal);
      openedModal.querySelector('[name="place__name"]').value = "";
      openedModal.querySelector('[name="link"]').value = "";
    } else if (openedModal) {
      closeModal(openedModal);
    }
  }
};
