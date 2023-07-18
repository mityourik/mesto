export class Api {
    constructor(config) {// конструктор с настройками доступа
        this._url = config.url;
        this._headers = config.headers;
        this._authorization = config.headers.authorization;
    }

    async _handleResponse(res) {//обработка ответа от сервера
        if (res.ok) {// если ответ содержит данные,
            return res.json();//то возвращаем их в формате JSON
        }
        throw new Error(`Ошибка номер ${res.status}`);//если нет - выброс ошибки
    }

    async _fetchData(url, options) {//функция для выполнения запроса и обработки ответа
        const response = await fetch(url, options);
        return this._handleResponse(response);// Вызов функции для обработки ответа
    }

    async getUserInfoApi() {//метод для получения инф о пользователе
        return this._fetchData(`${this._url}/users/me`, {//_fetchData для выполнения GET-запроса
            headers: { authorization: this._authorization }
        });
    }

    async setUserInfoApi(data) {//метод для установки инф о пользователе
        return this._fetchData(`${this._url}/users/me`, {// возврат заголовков и данных
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            }),
        });
    }
}
