const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-11/",
  headers: {
    authorization: "a7574e94-9952-403a-9a36-eac9e02b7546",
    "Content-Type": "application/json",
  },
};


const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

// обработчик ошибок
const checkResponse = (res) => {
  if (res.ok) return res.json();

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const fetchCards = () => {
  return request(`${config.baseUrl}cards`, {
    method: "GET",
    headers: config.headers,
  });
};

export const fetchUserData = () => {
  return request(`${config.baseUrl}users/me`, {
    method: "GET",
    headers: config.headers,
  });
};

export const patchUserData = (userName, userAbout) => {
  return request(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  });
};

export const postCard = (title, link) => {
  return request(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      link: link,
    }),
  });
};

export const removeCard = (cardId) => {
  return request(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const removeLike = (cardId) => {
  return request(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const addLike = (cardId) => {
  return request(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};

export const patchUserAvatar = (link) => {
  return request(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  });
};
