// утилитарные константы применяемы в основном файле index.js
export const editAvatarButton = document.querySelector('.profile__image');
export const addNewCardButton = document.querySelector('.profile__add-icon');
export const formEditProfile = document.querySelector('[name="profile-form"]');
export const formAddNewCard = document.querySelector('[name="elements-form"]');
export const formSetNewAvatar = document.querySelector('[name="avatar-form"]');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const nameInputElement = document.querySelector('[name="profile-input_name"]');
export const avatarInputElement = document.querySelector('[name="input_avatar_link"]');
export const descrInputElement = document.querySelector('[name="profile-input_description"]');

// объект настроек для валидации форм
export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorClass: 'popup__error_visible',
    inputErrorClass: 'popup__input_error',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_invalid'
};

//селекторы попапов
export const popupTypeSelector = {
  popupContentProfile: '.popup_content_profile',
  popupContentPreview: '.popup_content_preview',
  popupContentCell: '.popup_content_cell',
  popupContentAvatar: '.popup_content_avatar',
  popupContentConfirm: '.popup_content_confirm'
};

//селекторы для настроек редактирования профиля
export const profileConfig = {
  profileTitle: '.profile__title',
  profileParagraph: '.profile__paragraph',
  profileImage: '.profile__image'//добаил селектор ава АПИ
};

// API config для доступа
export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers:{
    'Content-Type': "application/json",
    authorization: 'a2b723e3-a104-4268-8462-81c1140190b0'
  }
}
