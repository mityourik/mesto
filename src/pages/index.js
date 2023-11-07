import './index.css';   //>>>>>>>>>>>>>>>>> ИМПОРТЫ МОДУЛЕЙ

import { Api } from '../components/Api.js';
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithQuestion } from '../components/PopupWithQuestion.js';
import { validationSettings, popupTypeSelector, profileConfig, apiConfig } from "../utils/constants.js";

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ИМПОРТ УТИЛИТАРНЫХ ПЕРЕМЕННЫХ

import { editAvatarButton, addNewCardButton, formEditProfile, 
formAddNewCard, formSetNewAvatar, editProfileButton, nameInputElement,
avatarInputElement, descrInputElement } from '../utils/constants.js';

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ

const SAVE_MESSAGE = 'Сохранение...';
let userCurrentId;//для хранения идентификатора текущего пользователя

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ОБЪЯВЛЕНИЕ ФУНКЦИЙ

// получить данные пользователя и массива карточек с сервера
async function fetchProfileAndCards() {
  try {
    const [resUser, resCard] = await Promise.all([api.getUserInfoApi(), api.getInitialCards()]);
    resCard.reverse(); // перевернул входящий массив
    userCurrentId = resUser._id;
    userInfo.setUserInfo(resUser);
    userInfo.setUserAvatar(resUser);
    cardsSection.renderItems(resCard)
  } catch (err) {
      alert(err)
  }
}

// Функция создания новой карточки
function createCard(data, user) {
  const card = new Card({
    data: data,
    userId: user,
    templateSelector: '.template-cell',
    handleCardClick: (name, link) => {
      popupContentPreview.open({ name, link });
    },
    handleCardDelete: (cardElement) => {//передавать только экземпляр класса
      popupContentConfirm.open(cardElement);
    },
    handleCardLike: async (cardId) => {
      try {
        const res = await api.pushCardLike(cardId);
        card.setLikesCount(res.likes);
        card.toggleLikeState(true);//обновить лайки после успешного запроса
      } catch (err) {
        alert(err);
      }
    },
    handleLikeDelete: async (cardId) => {
      try {
        const res = await api.removeCardLike(cardId);
        card.setLikesCount(res.likes);
        card.toggleLikeState(false);
      } catch (err) {
        alert(err);
      }
    }
  });

  return card.generateCard();
}

// открыть попап редактирования профиля и установить данные
function handleEditProfileButtonClick() {
  const defaultUserInfo = userInfo.getUserInfo();
  nameInputElement.value = defaultUserInfo.name;
  descrInputElement.value = defaultUserInfo.about;
  editProfileValidator.resetValidation();
  editProfilePopup.open();
}

// открыть попап для создания пользовательской карточки
function handleAddNewCardButtonClick() {
  addNewCardValidator.resetValidation();
  popupContentCell.open();
}

// открыть попап для редактирования аватара и установить данные
function handleEditAvatarButtonClick() {
  const defaultUserInfo = userInfo.getUserInfo();
  avatarInputElement.value = defaultUserInfo.avatar;
  formSetNewAvatarValidator.resetValidation();
  popupEditAvatar.open();
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ

// экземпляр класса UserInfo и передаем настройки
const userInfo = new UserInfo({
  nameSelector: profileConfig.profileTitle,
  descriptionSelector: profileConfig.profileParagraph,
  selectorUserAvatar: profileConfig.profileImage
});

// экземпляр класса API с конфигом
const api = new Api(apiConfig);

// экземпляр класса PopupWithForm для установки userInfo
const editProfilePopup = new PopupWithForm({
  popupSelector: popupTypeSelector.popupContentProfile,
  submitHandler: async (formData) => { 
    const name = formData['profile-input_name']; 
    const about = formData['profile-input_description'];
    editProfilePopup.renderPreloader(true, SAVE_MESSAGE);
    try {
      const res = await api.setUserInfoApi({ name, about });
      userInfo.setUserInfo(res);
      editProfilePopup.close();
    } catch (err) {
      alert(err)
    } finally {
      editProfilePopup.renderPreloader(false);
    }
  }
});

// экземпляр попапа превью
const popupContentPreview = new PopupWithImage(popupTypeSelector.popupContentPreview);

// экземпляр класса для отрисовки карточек
const cardsSection = new Section({
  renderer: (item) => {
    const cardElement = createCard(item, userCurrentId);
    cardsSection.addItem(cardElement);
  }
}, '.elements__cards');

// экземпляр класса для создания новой карточки из попапа
const popupContentCell = new PopupWithForm({
  popupSelector: popupTypeSelector.popupContentCell,
  submitHandler: async (formData) => {
    const cardData = {
      name: formData['elements_input_name'],
      link: formData['elements_input_link']
    };
    popupContentCell.renderPreloader(true, SAVE_MESSAGE);
    try {
      const newCard = await api.putNewCard(cardData);
      const newCardElement = createCard(newCard, userCurrentId);
      cardsSection.addItem(newCardElement);
      popupContentCell.close();
      return newCard;//возвращаем данные новой карточки
    } catch (error) {
      console.error('Ошибка поста карты', error);
    } finally {
      popupContentCell.renderPreloader(false);
    }
  }
});

const popupContentConfirm = new PopupWithQuestion({
  popupSelector: popupTypeSelector.popupContentConfirm,
  submitCallback: async (card) => { // передал карточку
    const cardId = card.getId(); // получил id из объекта card
    popupContentConfirm.renderPreloader(true, 'карточка всё...');
    try {
      await api.deleteCard(cardId);
      card.deleteCard();
      popupContentConfirm.close();
    } catch (err) {
      alert(err)
    } finally {
      popupContentConfirm.renderPreloader(false);
    }
  }
})

// экземпляр класса для попапа редактирования аватара
const popupEditAvatar = new PopupWithForm({
  popupSelector: popupTypeSelector.popupContentAvatar,
  submitHandler: async (formData) => {
    const avatarData = {
      avatar: formData['input_avatar_link']
    };
    popupEditAvatar.renderPreloader(true, SAVE_MESSAGE);
    try {
      const newInfo = await api.patchUserAvatar(avatarData);
      userInfo.setUserAvatar(newInfo);
      popupEditAvatar.close();
      return newInfo;
    } catch (error) {
      console.error('Ошибка установки аватара', error);
      alert(`Ошибка установки аватара: ${error.message}`);
      return false;
    } finally {
      popupEditAvatar.renderPreloader(false);
    }
  }
});

// экземпляры класса для валидации форм попапов
const formSetNewAvatarValidator = new FormValidator(validationSettings, formSetNewAvatar);
const addNewCardValidator = new FormValidator(validationSettings, formAddNewCard);
const editProfileValidator = new FormValidator(validationSettings, formEditProfile);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ОБРАБОТЧИКИ И ВЫЗОВ ФУНКЦИЙ

editProfileButton.addEventListener('click', handleEditProfileButtonClick);
addNewCardButton.addEventListener('click', handleAddNewCardButtonClick);
editAvatarButton.addEventListener('click', handleEditAvatarButtonClick);

popupEditAvatar.setEventListeners();
editProfilePopup.setEventListeners();
popupContentCell.setEventListeners();
popupContentPreview.setEventListeners();
popupContentConfirm.setEventListeners();

// валидация форм
formSetNewAvatarValidator.enableValidation();
addNewCardValidator.enableValidation();
editProfileValidator.enableValidation();

// вызов функции получения данных с сервера
fetchProfileAndCards();