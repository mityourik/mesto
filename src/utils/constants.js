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

// // Массив с начальными карточками
// export const initialCards = [
//     {
//       name: 'Майк',
//       link: 'https://images.unsplash.com/photo-1688758748460-0926142d4dc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60'
//     },
//     {
//       name: 'Март',
//       link: 'https://images.unsplash.com/photo-1688758748450-a5c4d68a45e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60'
//     },
//     {
//       name: 'Тишка',
//       link: 'https://i.postimg.cc/P5tNmF7C/2.jpg'
//     },
//     {
//       name: 'Рэй',
//       link: 'https://i.postimg.cc/L6FJssBB/3.jpg'
//     },
//     {
//       name: 'Тришка',
//       link: 'https://i.postimg.cc/28dVLf0p/4.jpg'
//     },
//     {
//       name: 'Бонни',
//       link: 'https://i.postimg.cc/mZHcR9Mg/5.jpg'
//     },
//     {
//       name: 'Робинзон',
//       link: 'https://i.postimg.cc/Y0FzTNJm/IMG-20160402-WA0001-Original.jpg'
//     },
//     {
//       name: 'Март и Тришка',
//       link: 'https://i.postimg.cc/JhVwDKQG/DSC-0216-Original.jpg'
//     },
//     {
//       name: 'Бояра, Мотя и Рэй слева направо',
//       link: 'https://i.postimg.cc/Gt274s8M/5e0e3964-5340-435f-aa1a-c5bbd627ef4c.jpg'
//     },
//     {
//       name: 'Рэй зарулем',
//       link: 'https://i.postimg.cc/zBp2DkBb/a0a399e3-72a8-4f18-8bbe-84a873954eac.jpg'
//     }
// ];