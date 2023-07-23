export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings; 
    this._formElement = formElement; 
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)); 
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector); 
  }

  // Показать сообщение об ошибке валидации
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass); 
    errorElement.textContent = errorMessage; 
    errorElement.classList.add(this._settings.errorClass);
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
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // проверка все ли поля валидны
  _isEveryInputValid() {
    return this._inputList.every((inputElement) => inputElement.validity.valid);
  }

  // Изменение состояния кнопки сабмита в зависимости от валидности полей
  _toggleButtonState() {
    const isValid = this._isEveryInputValid(); 
    if (isValid) {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

  // Сброс состояния валидации формы
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  // Установка обработчиков событий на поля ввода
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Включение валидации формы
  enableValidation() {
    this._setEventListeners();
  }
}