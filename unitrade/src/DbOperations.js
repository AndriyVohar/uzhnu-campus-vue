import axios from "axios";
const databaseApiUrl = process.env.VUE_APP_DATABASE_API_URL;
/**
 * Завантажує список даних з бази даних за допомогою HTTP GET запиту.
 *
 * @param {string} name - Назва ендпоінту або шляху до ресурсу бази даних (infos/advertisements/works/users).
 * @returns {Promise<Array>} - Обіцянка (Promise), яка вирішиться масивом даних отриманих з сервера.
 *                     Успішна обіцянка містить масив даних, інакше вона відхиляється з помилкою.
 */
export function loadItemsList(name, pageIndex = null) {
  let url;
  if (pageIndex) {
    url = `${databaseApiUrl}/${name}?page=${pageIndex}`;
  } else {
    url = `${databaseApiUrl}/${name}`;
  }
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
    .then((response) => {
      if (pageIndex) {
        return response.data;
      }
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
/**
 * Завантажує список даних з бази даних за допомогою HTTP GET запиту, обмежений за розділом гуртожитку.
 *
 * @param {string} name - Назва ендпоінту або шляху до ресурсу бази даних (infos/advertisements/works/users).
 * @param {number} dormitory - Номер гуртожитку, за яким обмежується вибірка даних.
 * @returns {Promise<Array>} - Обіцянка (Promise), яка вирішиться масивом даних отриманих з сервера.
 *                     Успішна обіцянка містить масив даних, інакше вона відхиляється з помилкою.
 */
export function loadItemsListByDormitory(name, dormitory, pageIndex = null) {
  let url;
  if (pageIndex) {
    url = `${databaseApiUrl}/${dormitory}/${name}?page=${pageIndex}`;
  } else {
    url = `${databaseApiUrl}/${dormitory}/${name}`;
  }
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
    .then((response) => {
      if (pageIndex) {
        return response.data;
      }
      return response.data.data;
    })
    .catch(() => {
      return Promise.reject(
        "Error fetching items list. Please try again later."
      );
    });
}
/**
 * Додає новий запис у базу даних за допомогою HTTP POST запиту.
 *
 * @param {string} name - Назва ендпоінту або шляху до ресурсу бази даних (infos/advertisements/works/users).
 * @param {Object} data - Об'єкт даних, які будуть відправлені на сервер.
 * @param {String} token - Токен користувача
 * @returns {Promise} - Обіцянка (Promise), яка вирішиться результатом HTTP запиту.
 *                     Успішна обіцянка містить об'єкт відповіді сервера, інакше вона відхиляється з помилкою.
 */
export function addItem(name, data, userGoogleId) {
  return axios
    .post(`${databaseApiUrl}/${name}`, data, {
      headers: {
        "Content-Type": "application/json",
        "User-Google-Id": userGoogleId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
/**
 * Завантажує об'єкт з сервера за вказаною назвою ресурсу та ідентифікатором.
 * @param {string} name - Назва ресурсу для завантаження (infos/advertisements/works/users).
 * @param {number|string} id - Ідентифікатор об'єкта для завантаження.
 * @returns {Promise<Object>} - Об'єкт Promise, який вирішиться об'єктом або вилучить помилку.
 */
export function itemById(name, id) {
  return axios
    .get(`${databaseApiUrl}/${name}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
/**
 * Оновлює об'єкт на сервері за вказаною назвою ресурсу та ідентифікатором.
 * @param {string} name - Назва ресурсу для оновлення.
 * @param {number|string} id - Ідентифікатор об'єкта для оновлення.
 * @param {Object} data - Дані, які слід оновити.
 * @returns {Promise<Object>} - Об'єкт Promise, який вирішиться оновленим об'єктом або вилучить помилку.
 */
export function updateItem(name, id, data, userGoogleId) {
  return axios
    .put(`${databaseApiUrl}/${name}/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        "User-Google-Id": userGoogleId,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
/**
 * Видаляє запис з бази даних за допомогою HTTP DELETE запиту.
 *
 * @param {string} name - Назва ендпоінту або шляху до ресурсу бази даних (infos/advertisements/works/users).
 * @param {number|string} id - Ідентифікатор об'єкта для видалення.
 * @returns {Promise} - Обіцянка (Promise), яка вирішиться результатом HTTP запиту.
 *                     Успішна обіцянка містить об'єкт відповіді сервера, інакше вона відхиляється з помилкою.
 */
export function deleteItem(name, id, userGoogleId) {
  return axios.delete(`${databaseApiUrl}/${name}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      "User-Google-Id": userGoogleId,
    },
  });
}

//===========================
//Special methods
export function advertisementsByUser(id, userGoogleId) {
  return axios
    .get(`${databaseApiUrl}/users/${id}/advertisements`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        "User-Google-Id": userGoogleId,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
