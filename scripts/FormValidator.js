const validationSettings = {
  formSelector: '.popup__profile-form',
  inputSelector: '.popup__input',
  errorClass: 'popup__error_visible',
  inputErrorClass: 'popup__input_error',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid'
};

// Функция для показа ошибки валидации
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass); // добавить стиль для инпута с ошибкой
  errorElement.textContent = errorMessage; // показать сообщение об ошибке
  errorElement.classList.add(settings.errorClass); // показать спан с ошибкой
}

// Функция для скрытия ошибки валидации
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass); // удалить стиль для инпута с ошибкой
  errorElement.classList.remove(settings.errorClass); // удалить сообщение об ошибке
  errorElement.textContent = ''; // очистить текст ошибки
}

// Функция для проверки валидности поля ввода
function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings); // если поле невалидно - показать ошибку
  } else {
    hideInputError(formElement, inputElement, settings); // если поле валидно - скрыть ошибку
  }
}

// Функция для переключения состояния кнопки в зависимости от валидности полей ввода
function toggleButtonState(inputList, buttonElement, settings) {
  const isValid = inputList.every((inputElement) => inputElement.validity.valid);
  if (isValid) {
    buttonElement.classList.remove(settings.inactiveButtonClass); // если все поля валидны - валидная кнопка
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(settings.inactiveButtonClass); // если одно поле невалидное - невалидная кнопка
    buttonElement.disabled = true;
  }
}

// Функция для установки обработчиков событий на поля ввода формы
function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });

  toggleButtonState(inputList, buttonElement, settings);
}

// Функция для включения валидации на всех формах
function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

// Функция для сброса ошибок валидации при открытии попапа с формой
function resetValidationErrorsIfOpen(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  inputs.forEach((input) => {
    hideInputError(form, input, settings);
  });
}

enableValidation(validationSettings);// вызов функции с настройками

export { validationSettings, resetValidationErrorsIfOpen};