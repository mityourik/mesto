export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings; // объект настроек для валидации формы
    this._formElement = formElement; // DOM-элемент формы
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)); // массив полей ввода формы
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector); // элемент кнопки отправки формы
  }

  // Показать сообщение об ошибке валидации
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass); // добавить класс ошибки к полю ввода
    errorElement.textContent = errorMessage; // установить текст сообщения об ошибке
    errorElement.classList.add(this._settings.errorClass); // видимость ошибки
  }

  // Скрыть сообщение об ошибке валидации
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  // Проверка валидности поля ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage); // если невалидно - показать сообщение об ошибке
    } else {
      this._hideInputError(inputElement); // если поле валидно - скрыть сообщение
    }
  }

  // Изменение состояния кнопки сабмита в зависимости от валидности полей
  _toggleButtonState() {
    const isValid = this._inputList.every((inputElement) => inputElement.validity.valid); // проверка каждого поля на валидность
    if (isValid) {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass); // если все поля валидны - кнопка валидна
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass); // иначе - добавить невалидный статус
      this._buttonElement.disabled = true;
    }
  }

  // Сброс состояния валидации формы (добавлено для повторных открытий форм и скрытия ошибок)
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); // скрыть сообщение об ошибке
    });
    this._toggleButtonState(); // переключить статутс кнопки сабмита
  }

  // Установка обработчиков событий на поля ввода
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement); // проверить валидность поля ввода при его изменении
        this._toggleButtonState(); // изменить состояние кнопки отправки
      });
    });
  
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault(); // отменить отправку
    });
  
    this._toggleButtonState(); // изначально установить состояние кнопки отправки
  }

  // Включение валидации формы
  enableValidation() {
    this._setEventListeners(); // установить обработчики событий на поля ввода и слушателя события submit
    this.resetValidation(); // сбросить состояние формы валидации
  }
}