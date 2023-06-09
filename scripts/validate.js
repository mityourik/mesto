function enableValidation(settings) {
  // Функция для отображения сообщения об ошибке
  function showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }

  // функция для скрытия сообщения об ошибке
  function hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
  }

  // проверки валидности поля ввода
  function checkInputValidity(inputElement) {
    const errorElement = inputElement.parentElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement, errorElement);
    }
  }

  // обработчики событий на форму и поля ввода
  function setEventListeners(formElement) {
    // получил список элементов ввода в форме
    function getInputElements() {
      return Array.from(formElement.querySelectorAll(settings.inputSelector));
    }

    // получение элемента кнопки
    function getSubmitButton() {
      return formElement.querySelector(settings.submitButtonSelector);
    }

    // функция для изменения состояния кнопки
    function toggleButtonState(inputElements, submitButton) {
      const isFormValid = inputElements.every((inputElement) => inputElement.validity.valid);
      submitButton.disabled = !isFormValid;
      submitButton.classList.toggle(settings.activeButtonClass, isFormValid);
    }

    // Функция для обработки события ввода
    function handleInputEvent(inputElement) {
      checkInputValidity(inputElement);
      toggleButtonState(inputElements, submitButton);
    }

    const inputElements = getInputElements();
    const submitButton = getSubmitButton();

    // Установка слушателей на каждое поле ввода
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        handleInputEvent(inputElement);
      });
    });

    // Отмена отправки
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    // Изначальное изменение состояния кнопки
    toggleButtonState(inputElements, submitButton);
  }

  // Функция для включения валидации на каждой форме
  function enableValidate(formElement) {
    // Функция для скрытия всех сообщений об ошибках в форме
    function hideAllErrors() {
      const inputElements = getInputElements();
      inputElements.forEach((inputElement) => {
        const errorElement = inputElement.parentElement.querySelector(`#${inputElement.id}-error`);
        hideInputError(inputElement, errorElement);
      });
    }

    // Функция для получения списка элементов ввода в форме
    function getInputElements() {
      return Array.from(formElement.querySelectorAll(settings.inputSelector));
    }

    hideAllErrors();
    setEventListeners(formElement);
  }

  // Включение валидации для каждой формы, указанной в настройках
  const formElements = document.querySelectorAll(settings.formSelector);
  formElements.forEach((formElement) => {
    enableValidate(formElement);
  });
}
