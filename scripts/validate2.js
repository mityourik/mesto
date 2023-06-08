function enableValidation(settings) {
  // Функция для сообщения об ошибке валидации
  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }

  // Функция для скрытия сообщения об ошибке валидации
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
  }

  // Функция для проверки валидности поля ввода
  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле ввода невалидно вывести сообщение об ошибке
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // иначе скрываем сообщение об ошибке
      hideInputError(formElement, inputElement);
    }
  }

  // Функция для установки обработчиков событий на форму
  function setEventListeners(formElement) {
    const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const submitButton = formElement.querySelector(settings.submitButtonSelector);

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // При вводе проверяем валидность и состояние формы
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputElements, submitButton);
      });
    });

    formElement.addEventListener('submit', (evt) => {
      // отмена отправлки формы по дефолту
      evt.preventDefault();
    });
  }

  // Функция для переключения состояния кнопки
  function toggleButtonState(inputElements, submitButton) {
    // Проверка полей на валидность
    const isFormValid = inputElements.every((inputElement) => inputElement.validity.valid);
    // установил состояние кнопки в зависимости от валидности
    submitButton.disabled = !isFormValid;
    submitButton.classList.toggle(settings.activeButtonClass, isFormValid);
  }

  // Функция для включения валидации формы
  function enableValidationForForm(formSelector, settings) {
    const formElements = document.querySelectorAll(formSelector);
    formElements.forEach((formElement) => {
      setEventListeners(formElement, settings);
    });
  }

  // Функция для сброса ошибок валидации инпутов в форме
  function resetErrors(formElement, settings) {
    const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));

    inputElements.forEach((inputElement) => {
      hideInputError(formElement, inputElement, settings);
    });
  }

  // вызов функции валидации для указанной формы
  enableValidationForForm(settings.formSelector, settings);

  // Возврат объекта с методом resetErrors для сброса ошибок валидации в других функциях закрытия в глобальной области
  return {
    resetErrors: (formElement) => resetErrors(formElement, settings)
  };
}

// Настройки валидации
const validationSettings = {
  formSelector: '.popup__profile-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  activeButtonClass: 'popup__save-button_valid',// по дефолту у меня невалидная кнопка
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'// у меня нет такого класса, но прописал его тут чтобы ссылаться
};

// объявил переменную в глобальной видимости
const validation = enableValidation(validationSettings);