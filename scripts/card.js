export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;//название карточки
    this._link = data.link;//ссылка на изображение карточки
    this._templateSelector = templateSelector;//селектор шаблона карточки
    this._handleCardClick = handleCardClick;//сallback для обработки клика для просмотра фото
  }

  // Получаем шаблон карточки
  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.elements__cell').cloneNode(true);
  }

  // Установка обработчиков событий на элементы карточки
  _setEventListeners() {
    this._element.querySelector('.elements__like-button').addEventListener('click', () => {
      this._toggleLike();//переключение состояния лайка
    });

    this._element.querySelector('.elements__trash-button').addEventListener('click', () => {
      this._deleteCard();//удалить карточку
    });

    this._element.querySelector('.elements__photo').addEventListener('click', () => {
      this._handleImageClick();//обработка клика по изображению карточки
    });
  }

  // функция для переключения состояния лайка карточки
  _toggleLike() {
    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-image_enabled');
  }

  // Удаления карточки
  _deleteCard() {
    this._element.remove();
  }

  // Обработка клика по изображению карточки
  _handleImageClick() {
    const cardImage = this._element.querySelector('.elements__photo');
    const name = cardImage.alt.replace('Изображение ', '');
    const link = cardImage.src;
    this._handleCardClick(name, link); //callback функции для обработки клика по фото
  }

  // публичный метод для генерирования карточки
  generateCard() {
    this._element = this._getTemplate();//получить шаблон
    const cardImage = this._element.querySelector('.elements__photo');
    const cardName = this._element.querySelector('.elements__title');

    cardImage.src = this._link;//ссылка на изображение
    cardImage.alt = 'Изображение ' + this._name;//атрибут alt для изображения
    cardName.textContent = this._name;//установить название карточки

    this._setEventListeners();//установить обработчики событий на элементы карточки

    return this._element;//возвращаем созданную карточку
  }
}
