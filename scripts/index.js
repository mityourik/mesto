import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

//объект настроек для валидации форм
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__error_visible',
  inputErrorClass: 'popup__input_error',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid'
};

//объявление переменных
const elementsItem = document.querySelector('.elements__cards');
const buttonAddNewCell = document.querySelector('.profile__add-icon');
const popupContentCell = document.querySelector('.popup_content_cell');
const buttonClosePopupCell = document.querySelector('.button_close_cell');
const formCreateCell = document.querySelector('[name="elements-form"]');
const inputNameCell = formCreateCell.querySelector('[name="elements_input_name"]');
const inputLinkCell = formCreateCell.querySelector('[name="elements_input_link"]');
const popupContentPreview = document.querySelector('.popup_content_preview');
const buttonClosePreview = document.querySelector('.button_close_preview');
const buttonPopupOpen = document.querySelector('.profile__popup-open');
const popupProfile = document.querySelector('.popup_content_profile');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const profileForm = document.querySelector('[name="profile-form"]');
const profileNameField = profileForm.querySelector('[name="profile-input_name"]');
const profileDescripField = profileForm.querySelector('[name="profile-input_description"]');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');
let cellFormValidator;
let profileFormValidator; 

// Перебор массива и добавление карточек initialCards в разметку с использованием нового класса
initialCards.forEach(function (card) {
  const newCardElement = renderNewCard(card.name, card.link); // Использование функции renderNewCard()
  elementsItem.appendChild(newCardElement);
});

// функции открытия-закрытия попапов
const openPopup = (popupToOpen) => {
  popupToOpen.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKeydown); // обработчик события для Esc
  cellFormValidator = new FormValidator(validationSettings, formCreateCell); // Присваивание значения переменной
  cellFormValidator.enableValidation(); // включение валидации для формы formCreateCell
};

const closePopup = (popupToClose) => {
  popupToClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKeydown); // удалил обработчик события для Esc
};

//логика для закрытия через esc
const handleEscKeydown = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

// Обработчик события для открытия попапа создания карточки + удалить ошибки валидации
buttonAddNewCell.addEventListener('click', () => {
  openPopup(popupContentCell);
  formCreateCell.reset();
});

// Обработчик события для закрытия попапа карточки
buttonClosePopupCell.addEventListener('click', () => {
  closePopup(popupContentCell);
});

// функция для создания пользовательской карточки
function renderNewCard(name, link) {
  const data = { name, link };
  const newCard = new Card(data, '.template-cell', openImagePopup);
  const cardElement = newCard.generateCard();
  return cardElement;
}

formCreateCell.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = inputNameCell.value;
  const link = inputLinkCell.value;

  // Создать новую карточку с использованием значений из полей формы
  const newCardElement = renderNewCard(name, link);

  // Добавить новую карточку в начало списка
  elementsItem.prepend(newCardElement);

  // Закрыть попап
  closePopup(popupContentCell);
});

// Закрытие попапов по клику в оверлей
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// Функция для превью фото карточки
function openImagePopup(name, link) {
  const previewImage = popupContentPreview.querySelector('.popup__image-preview');
  const previewName = popupContentPreview.querySelector('.popup__preview-name');

  previewImage.src = link;
  previewImage.alt = 'Изображение ' + name;
  previewName.textContent = name;

  openPopup(popupContentPreview);
}

//слушатель для закрывания при клике по крестику попапа превью
buttonClosePreview.addEventListener('click', () => {
  closePopup(popupContentPreview);
});

// функции для открытия-закрытия окна редактирования профиля
function openProfilePopup() {
  openPopup(popupProfile);
  profileNameField.value = profileTitle.textContent;
  profileDescripField.value = profileParagraph.textContent;
  profileFormValidator = new FormValidator(validationSettings, profileForm); // Присваивание значения переменной
  profileFormValidator.enableValidation();// включение валидации для формы profileForm
}

function closeProfilePopup() {
  closePopup(popupProfile);
}

//обработчики открыть-закрыть окно редактирования профиля
buttonPopupOpen.addEventListener('click', () => {
  openProfilePopup();
});

profileCloseButton.addEventListener('click', closeProfilePopup);

// слушатель события для сабмита формы сохранения профиля
profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileTitle.textContent = profileNameField.value;
  profileParagraph.textContent = profileDescripField.value;
  closeProfilePopup();
});