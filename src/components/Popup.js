export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);//DOM-элемент попапа, заданный по селектору
    this._handleEscClose = this._handleEscClose.bind(this);//привязываем контекст метода к экземпляру класса
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);//удаляем обработчик события клавиши Esc
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {// закрыть попап при клике на кнопку или вне области попапа
    this._popup.addEventListener('click', (event) => {
      if (
        event.target.classList.contains('popup__close-button') ||
        event.target.classList.contains('popup')
      ) {
        this.close();
      }
    });
  }
}
