import './index.css';

import { Card } from "../components/Card.js";
import { validationSettings, popupTypeSelector, profileConfig, apiConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/API.js';
import { PopupWithQuestion } from '../components/PopupWithQuestion.js';

// Создаем экземпляр класса UserInfo и передаем настройки
const userInfo = new UserInfo({
  nameSelector: profileConfig.profileTitle,
  descriptionSelector: profileConfig.profileParagraph,
  selectorUserAvatar: profileConfig.profileImage
});

// переменная текста в прелодерах
const SAVE_MESSAGE = 'Сохранение...';

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> API

let userCurrentId;//для хранения идентификатора текущего пользователя

const api = new Api(apiConfig);//экз класса с конфигом

// собираем данные пользователя и карточек с сервера
async function fetchData() {
  try {
      const resUser = await api.getUserInfoApi();
      let resCard = await api.getInitialCards();
      resCard = resCard.reverse();  // перевернул массив
      userCurrentId = resUser._id;
      userInfo.setUserInfo(resUser);
      userInfo.setUserAvatar(resUser);
      cardList.renderItems(resCard, userCurrentId)
  } catch (err) {
      alert(err)
  }
}

fetchData();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> профиль

// Получаем необходимые элементы DOM
const editProfileButton = document.querySelector('.profile__edit-button');
const nameInputElement = document.querySelector('[name="profile-input_name"]');
const descrInputElement = document.querySelector('[name="profile-input_description"]');

// экз класса PopupWithForm для установки userInfo
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

// Слушатель клика на кнопку редактирования профиля
editProfileButton.addEventListener('click', () => {
  const defaultUserInfo = userInfo.getUserInfo();
  nameInputElement.value = defaultUserInfo.name;
  descrInputElement.value = defaultUserInfo.about;
  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

// Добавляем обработчики событий
editProfilePopup.setEventListeners();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> карточки

// Получаем необходимый DOM для клика по кнопке новой карточки
const addNewCardButton = document.querySelector('.profile__add-icon');

// Создаем экземпляр попапа превью и передаем слушатели
const popupContentPreview = new PopupWithImage(popupTypeSelector.popupContentPreview);
popupContentPreview.setEventListeners();

// открыть попап новой карточки
addNewCardButton.addEventListener('click', () => {
  addNewCardValidator.resetValidation();
  popupContentCell.open();
})

// Функция создания новой карточки
function createCard(data, user) {
  const card = new Card({
    data: data,
    userId: user,
    templateSelector: '.template-cell',
    handleCardClick: (name, link) => {
      popupContentPreview.open({ name, link });
    },
    handleCardDelete: (cardId, cardElement) => {
      popupContentConfirm.open(cardId, cardElement);
    },
    handleCardLike: async (cardId) => {
      try {
        const res = await api.pushCardLike(cardId);
        card.setLikesCount(res);
      } catch (err) {
        alert(err);
      }
    },
    handleLikeDelete: async (cardId) => {
      try {
        const res = await api.removeCardLike(cardId);
        card.setLikesCount(res);
      } catch (err) {
        alert(err);
      }
    }
  });

  return card.generateCard();
}


// экз класса для отрисовки карточек
const cardList = new Section({
  renderer: (item, user) => {
    const cardElement = createCard(item, user);
    cardList.addItem(cardElement);
  }
}, '.elements__cards');

// экз класса для создания новой карточки из попапа
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
      cardList.addItem(newCardElement);
    } catch (error) {
      console.error('Ошибка поста карты', error);
    }
  }
});

// Добавление обработчиков событий и отображение попапа
popupContentCell.setEventListeners();

//попап подтверждения удаления
const popupContentConfirm = new PopupWithQuestion({
  popupSelector: popupTypeSelector.popupContentConfirm,
  submitCallback: async (id, card) => {
    popupContentConfirm.renderPreloader(true, 'карточка всё...');
    try {
      await api.deleteCard(id);
      card.deleteCard();
      popupContentConfirm.close();
    } catch (err) {
      alert(err)
    } finally {
      popupContentConfirm.renderPreloader(false);
    }
  }
})

popupContentConfirm.setEventListeners();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> редактирование аватара
const editAvatarButton = document.querySelector('.profile__image');

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
    } catch (error) {
      console.error('Ошибка установки аватара', error);
    } finally {
      popupEditAvatar.renderPreloader(false);
    }
  }
});

//слущатель клика и валидаця
editAvatarButton.addEventListener('click', () => {
  formSetNewAvatarValidator.resetValidation();
  popupEditAvatar.open();
});

popupEditAvatar.setEventListeners();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> валидация форм

const formEditProfile = document.querySelector('[name="profile-form"]');
const formAddNewCard = document.querySelector('[name="elements-form"]');
const formSetNewAvatar = document.querySelector('[name="avatar-form"]');

const formSetNewAvatarValidator = new FormValidator(validationSettings, formSetNewAvatar);
const addNewCardValidator = new FormValidator(validationSettings, formAddNewCard);
const editProfileValidator = new FormValidator(validationSettings, formEditProfile);
formSetNewAvatarValidator.enableValidation();
addNewCardValidator.enableValidation();
editProfileValidator.enableValidation();