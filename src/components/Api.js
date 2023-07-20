export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers['authorization'];
  }

  async _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка ${res.status}`);
  }

  async _fetchData(url, options) {
    try {
      const response = await fetch(url, options);
      return this._handleResponse(response);
    } catch (error) {
      throw new Error('Ошибка сети');
    }
  }

  async getUserInfoApi() {
    return this._fetchData(`${this._url}/users/me`, {
      headers: this._headers
    });
  }

  async setUserInfoApi(data) {
    return this._fetchData(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  async getInitialCards() {
    return this._fetchData(`${this._url}/cards`, {
      headers: this._headers
    });
  }

  async putNewCard(data) {
    return this._fetchData(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            name: data.name,
            link: data.link
        })
    });
  }

  async deleteCard(cardId) {
    return this._fetchData(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  // Функция отправки лайка на сервер
  async pushCardLike(cardId) {
    return this._fetchData(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  // Функция удаления лайка с сервера
  async removeCardLike(cardId) {
    return this._fetchData(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
  }
}
