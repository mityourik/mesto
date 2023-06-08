const templateItem = document.querySelector('.template-cell');
const elementsItem = document.querySelector('.elements__cards');

function renderNewCard(name, link) {
  const cloneDefaultCard = templateItem.content.cloneNode(true);
  const defaultCardImage = cloneDefaultCard.querySelector('.elements__photo');
  const defaultCardName = cloneDefaultCard.querySelector('.elements__title');
  const defaultCardLikeButton = cloneDefaultCard.querySelector('.elements__like-button');
  const defaultCardTrashButton = cloneDefaultCard.querySelector('.elements__trash-button');
  
  defaultCardImage.src = link;
  defaultCardImage.alt = 'Изображение ' + name;
  defaultCardName.textContent = name;

  defaultCardLikeButton.addEventListener('click', () => {
    defaultCardLikeButton.classList.toggle('elements__like-image_enabled');
  });

  defaultCardTrashButton.addEventListener('click', () => {
    const parentCard = defaultCardTrashButton.closest('.elements__cell');
    parentCard.remove();
  });

  defaultCardImage.addEventListener('click', () => {
    openPopup(popupContentPreview);
    previewImage.src = link;
    previewImage.alt = 'Изображение ' + name;
    previewName.textContent = name;
  });

  return cloneDefaultCard;
}

// Проходимся по массиву карточек
initialCards.forEach(function(card) {
  const cardElement = renderNewCard(card.name, card.link);
  elementsItem.appendChild(cardElement);
});

// Пользовательские карточки через popup_content_cell
const buttonAddNewCell = document.querySelector('.profile__add-icon');
const popupContentCell = document.querySelector('.popup_content_cell');
const buttonClosePopupCell = document.querySelector('.button_close_cell');

// Функция для открытия попап-окна с установкой слушателей
function openPopup(popup) {
  popup.classList.add('popup_opened');
  buttonClosePopupCell.addEventListener('click', () => {
    closePopup(popup);
  });
  document.addEventListener('keydown', (event) => {
    closePopupOnEsc(event, popup);
  });
  formCreateCell.reset();
}

// Функция для закрытия попап-окна с удалением слушателей
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  buttonClosePopupCell.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', closePopupOnEsc);
}

// Функция для закрытия попап-окна через Esc
function closePopupOnEsc(event, popup) {
  if (event.key === 'Escape') {
    closePopup(popup);
  }
}

// Обработчик события для открытия попапа
buttonAddNewCell.addEventListener('click', () => {
  openPopup(popupContentCell);
  validation.resetErrors(popupContentCell);// сброс ошибок на дефолт
});

const formCreateCell = document.querySelector('[name="elements-form"]');
const inputNameCell = formCreateCell.querySelector('[name="elements_input_name"]');
const inputLinkCell = formCreateCell.querySelector('[name="elements_input_link"]');

formCreateCell.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = inputNameCell.value;
  const link = inputLinkCell.value;

  // Создать новую карточку с использованием значений из полей формы
  const newCard = renderNewCard(name, link);

  // Добавить новую карточку в начало списка
  elementsItem.prepend(newCard);

  // Закрыть попап
  closePopup(popupContentCell);
});

// Закрытие попапов по клику в оверлей
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// Предпросмотр фото карточки во всплывающем окне
const popupContentPreview = document.querySelector('.popup_content_preview');
const previewImage = popupContentPreview.querySelector('.popup__image-preview');
const previewName = popupContentPreview.querySelector('.popup__preview-name');
const buttonClosePreview = document.querySelector('.button_close_preview');

buttonClosePreview.addEventListener('click', () => {
  closePopup(popupContentPreview);
});

// Обработчик события для закрытия попапа превью через Esc
document.addEventListener('keydown', (event) => {
  closePopupOnEsc(event, popupContentPreview);
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
  validation.resetErrors(profileForm);
}

function closeProfilePopup() {
  closePopup(popupProfile);
}

buttonPopupOpen.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', closeProfilePopup);

// Обработчик события для закрытия попапа профиля через Esc
document.addEventListener('keydown', (event) => {
  closePopupOnEsc(event, popupProfile);
});

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileTitle.textContent = profileNameField.value;
  profileParagraph.textContent = profileDescripField.value;
  closeProfilePopup();
});