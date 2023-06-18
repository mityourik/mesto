import { Card } from "../scripts/card.js";
import { initialCards } from "../scripts/cards.js";
import { validationSettings, resetValidationErrorsIfOpen } from "../scripts/FormValidator.js";

const templateItem = document.querySelector('.template-cell');
const elementsItem = document.querySelector('.elements__cards');

// Проходимся по массиву заданных карточек
initialCards.forEach(function (card) {
  const newCard = new Card(card, '.template-cell', openImagePopup);
  const cardElement = newCard.generateCard();
  elementsItem.appendChild(cardElement);
});

// Пользовательские карточки через popup_content_cell
const buttonAddNewCell = document.querySelector('.profile__add-icon');
const popupContentCell = document.querySelector('.popup_content_cell');
const buttonClosePopupCell = document.querySelector('.button_close_cell');

const openPopup = (popupToOpen) => {
  popupToOpen.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKeydown); // обработчик события для Esc
};

const closePopup = (popupToClose) => {
  popupToClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKeydown); // удалил обработчик события для Esc
};

const handleEscKeydown = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

//функция для сброса значения полей инпута новой карточки
function resetForm() {
  inputNameCell.value = '';
  inputLinkCell.value = '';
}

// Обработчик события для открытия попапа создания карточки + удалить ошибки валидации
buttonAddNewCell.addEventListener('click', () => {
  openPopup(popupContentCell);
  resetForm();
  resetValidationErrorsIfOpen(formCreateCell, validationSettings);
});

// Обработчик события для закрытия попапа карточки
buttonClosePopupCell.addEventListener('click', () => {
  closePopup(popupContentCell);
});

const formCreateCell = document.querySelector('[name="elements-form"]');
const inputNameCell = formCreateCell.querySelector('[name="elements_input_name"]');
const inputLinkCell = formCreateCell.querySelector('[name="elements_input_link"]');

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

// Предпросмотр фото карточки во всплывающем окне
const popupContentPreview = document.querySelector('.popup_content_preview');
const buttonClosePreview = document.querySelector('.button_close_preview');

function openImagePopup(name, link) {
  const previewImage = popupContentPreview.querySelector('.popup__image-preview');
  const previewName = popupContentPreview.querySelector('.popup__preview-name');

  previewImage.src = link;
  previewImage.alt = 'Изображение ' + name;
  previewName.textContent = name;

  openPopup(popupContentPreview);
}

buttonClosePreview.addEventListener('click', () => {
  closePopup(popupContentPreview);
});

// ----- Попап редактирования профиля ПР#4 ----- //
const buttonPopupOpen = document.querySelector('.profile__popup-open');
const popupProfile = document.querySelector('.popup_content_profile');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const profileSaveButton = popupProfile.querySelector('.popup__save-button');
const profileForm = document.querySelector('[name="profile-form"]');
const profileNameField = profileForm.querySelector('[name="profile-input_name"]');
const profileDescripField = profileForm.querySelector('[name="profile-input_description"]');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');

function openProfilePopup() {
  openPopup(popupProfile);
  profileNameField.value = profileTitle.textContent;
  profileDescripField.value = profileParagraph.textContent;
}

function closeProfilePopup() {
  closePopup(popupProfile);
}

//обработчик открыть попап редактировать профиль + скрыть ошибки валидации
buttonPopupOpen.addEventListener('click', () => {
  openProfilePopup();
  resetValidationErrorsIfOpen(profileForm, validationSettings);
});

profileCloseButton.addEventListener('click', closeProfilePopup);

// слушатель события для сабмита формы сохранения профиля
profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileTitle.textContent = profileNameField.value;
  profileParagraph.textContent = profileDescripField.value;
  closeProfilePopup();
});
