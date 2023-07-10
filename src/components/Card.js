export class Card {
  constructor({ data, templateSelector, handleCardClick }) {
    this._name = data.name; // название карточки
    this._link = data.link; // ссылка на изображение карточки
    this._templateSelector = templateSelector; // селектор шаблона карточки
    this._handleCardClick = handleCardClick; // callback для обработки клика для просмотра фото

    this._element = this._getTemplate(); // сохраняем элемент карточки
    this._cardImage = this._element.querySelector('.elements__photo'); // сохраняем элемент изображения
    this._likeButton = this._element.querySelector('.elements__like-button'); // сохраняем кнопку лайка

    this._setEventListeners(); // устанавливаем обработчики событий на элементы карточки
  }

  // Получаем шаблон карточки
  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.elements__cell').cloneNode(true);
  }

  // Установка обработчиков событий на элементы карточки
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike(); // переключение состояния лайка
    });

    this._element.querySelector('.elements__trash-button').addEventListener('click', () => {
      this._deleteCard(); // удалить карточку
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(); // обработка клика по изображению карточки
    });
  }

  // функция для переключения состояния лайка карточки
  _toggleLike() {
    this._likeButton.classList.toggle('elements__like-image_enabled');
  }

  // Удаления карточки
  _deleteCard() {
    this._element.remove();
  }

  // Обработка клика по изображению карточки
  _handleImageClick() {
    this._handleCardClick(this._name, this._link); // callback функции для обработки клика по фото
  }

  // публичный метод для генерирования карточки
  generateCard() {
    const cardName = this._element.querySelector('.elements__title');

    this._cardImage.src = this._link; // ссылка на изображение
    this._cardImage.alt = 'Изображение ' + this._name; // атрибут alt для изображения
    cardName.textContent = this._name; // установить название карточки

    return this._element; // возвращаем созданную карточку
  }
}
