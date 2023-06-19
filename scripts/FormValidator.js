export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;//объект настроек для валидации формы
    this._formElement = formElement;//DOM-элемент формы
  }

  // Показать сообщение об ошибке валидации
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);//добавить класс ошибки к полю ввода
    errorElement.textContent = errorMessage;//установить текст сообщения об ошибке
    errorElement.classList.add(this._settings.errorClass);//видимость ошибки
  }

  // Скрыть сообщение об ошибке валидации
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  // Проверка валидноси поля ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);//если невалидно - показать сообщение об ошибке
    } else {
      this._hideInputError(inputElement);//если поле валидно - скрыть сообщение
    }
  }

  // Изменение состояния кнопки сабмита в зависимости от валидности полей
  _toggleButtonState(inputList, buttonElement) {
    const isValid = inputList.every((inputElement) => inputElement.validity.valid);//проверка каждое поле валидно
    if (isValid) {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);//если все поля валидны - кнопка валидна
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this._settings.inactiveButtonClass);//иначе - добавить невалидный статус
      buttonElement.disabled = true;
    }
  }

  // Сброс состояния валидации формы(добавлено для повторных открытий форм и скрывания ошибок)
  _resetValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);//скрыть сообщения об ошибке для каждого поля ввода
    });

    this._toggleButtonState(inputList, buttonElement);//изменить состояние кнопки отправки формы
  }

  // Установка обработчиков событий на поля ввода
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));//массив полей ввода формы
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);//проверить валидность поля ввода при его изменении
        this._toggleButtonState(inputList, buttonElement);//изменить состояние кнопки сабмита
      });
    });

    this._toggleButtonState(inputList, buttonElement);//изначально установить состояние кнопки сабмита
  }

  // Включени валидации формы
  enableValidation() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();//отменить отправку
    });

    this._resetValidation();//сбросить состояние формы валидации
    this._setEventListeners();//обработчики событий на поля ввода
  }
}