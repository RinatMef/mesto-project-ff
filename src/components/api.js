const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-11/',
  headers: {
    authorization: 'a7574e94-9952-403a-9a36-eac9e02b7546',
    'Content-Type': 'application/json'
  }
}

export let userID;

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
    headers: config.headers
  });
};

export const fetchUserData = () => {
  return request(`${config.baseUrl}users/me`, {
    method: "GET",
    headers: config.headers
  }).then((res) => {
    fetchUserId(res["_id"]);
    return res;
  });
};

const fetchUserId = (id) => {
  userID = id;
};

export const patchUserData = (userName, userAbout) => {
  return request(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  }).then((res) => {
    return res;
  });
};

export const postCard = (title, link) => {
  return request(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      link: link
    })
  }).then((res) => {
    console.log(res)
    return res;
  });
};

export const removeCard = (cardId) => {
  return request(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
.then((res) => {
  return res;
});
};

export const removeLike = (cardId) => {
  return request(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then((res) => {
    console.log(res);
    return res;
  });
};

export const addLike = (cardId) => {
  return request(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then((res) => {
    console.log(res);
    return res;
  });
};

export const patchUserAvatar = (link) => {
  return request(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  });
};
