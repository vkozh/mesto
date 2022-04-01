import './index.css';
import {
  settingsValidation,
  listElementsSelector,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  buttonOpenEditProfilePopup,
  buttonOpenEditAvatarPopup,
  buttonOpenAddCardPopup,
  buttonSubmitEditProfilePopup,
  buttonSubmitAddCardPopup,
  buttonSubmitEditAvatarPopup,
  nameInput,
  jobInput,
  titleInput,
  linkInput,
  linkAvatarInput,
  TEXT_LOADING,
  TOKEN

} from '../scripts/utils/constants.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Card from "../scripts/components/Card.js";
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupForCard from '../scripts/components/PopupForCard';
import Api from '../scripts/components/Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  },
  renderLoading: renderLoading
});

function renderLoading(isLoading, button, text) {
  isLoading
    ?
    button.textContent = TEXT_LOADING :
    button.textContent = text;
}

function createCard(item, position) {
  const card = new Card(item, '#card', popupOpenImg.open, popupDeleteCard.open, toggleLike);
  const cardElement = card.generateCard();
  items.addItem(cardElement, position);
}

function toggleLike(cardId, updateLikes, isLiked) {
  if (isLiked)
    api.deleteLike(cardId)
    .then(data => updateLikes(data.likes.length, false))
    .catch(err => `Ошибка ${err}`);
  else
    api.setLike(cardId)
    .then(data => updateLikes(data.likes.length, true))
    .catch(err => `Ошибка ${err}`);
}

function openEditProfilePopup() {
  //очищаем ошибки
  formEditProfileValidator.hideInputError(nameInput);
  formEditProfileValidator.hideInputError(jobInput);
  formEditProfileValidator.disableSubmitButton(buttonSubmitEditProfilePopup);
  //заполняем поля
  const { name, job } = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  popupEditProfile.open();
}

function openAddCardPopup() {
  //очищаем ошибки
  formAddCardValidator.hideInputError(titleInput);
  formAddCardValidator.hideInputError(linkInput);
  formAddCardValidator.disableSubmitButton(buttonSubmitAddCardPopup);
  popupAddCard.open();
}

function openEditAvatarPopup() {
  //очищаем ошибки
  formEditAvatarValidator.hideInputError(linkAvatarInput);
  formEditAvatarValidator.disableSubmitButton(buttonSubmitEditAvatarPopup);
  //заполняем поля
  linkAvatarInput.value = user.getUserInfo().avatar;
  popupEditAvatar.open();
}

const user = new UserInfo({
  userNameSelector: '.profile__name-text',
  userAboutSelector: '.profile__about-me',
  userAvatarSelector: '.profile__avatar'
});

api.getUser()
  .then(data => user.setUserInfo(data.name, data.about, data.avatar))
  .catch(err => `Ошибка ${err}`);

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (e, {
  inputName,
  inputJob
}) => {
  e.preventDefault();
  api.editProfile(inputName, inputJob, buttonSubmitEditProfilePopup)
    .then(data => user.setUserInfo(data.name, data.about, data.avatar))
    .catch(err => `Ошибка ${err}`)
    .finally(() => popupEditProfile.close());
});

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', (e, {
  inputLink
}) => {
  e.preventDefault();
  api.changeAvatar(inputLink, buttonSubmitEditAvatarPopup)
    .then(data => user.setUserInfo(data.name, data.about, data.avatar))
    .catch(err => `Ошибка ${err}`)
    .finally(() => popupEditAvatar.close());
})

const popupAddCard = new PopupWithForm('.popup_type_add-card', (e, {
  inputTitle,
  inputLink
}) => {
  e.preventDefault();
  api.addCard(inputTitle, inputLink, buttonSubmitAddCardPopup)
    .then(data => createCard(data, 'prepend'))
    .catch(err => `Ошибка ${err}`)
    .finally(() => popupAddCard.close());
});

const popupOpenImg = new PopupWithImage('.popup-full-img');

const popupDeleteCard = new PopupForCard('.popup_type_delete-card', (e, deleteCard, cardId) => {
  e.preventDefault();
  deleteCard();
  api.deleteCard(cardId)
    .catch(err => `Ошибка ${err}`)
    .finally(() => popupDeleteCard.close());
});

// Валидаторы форм
const formEditProfileValidator = new FormValidator(settingsValidation, formEditProfile);
const formAddCardValidator = new FormValidator(settingsValidation, formAddCard);
const formEditAvatarValidator = new FormValidator(settingsValidation, formEditAvatar)

//Устанавливаем слушателей на попапы
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupOpenImg.setEventListeners();
popupDeleteCard.setEventListeners();

// Обработчики на кнопки открытия форм
buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardPopup.addEventListener('click', openAddCardPopup);
buttonOpenEditAvatarPopup.addEventListener('click', openEditAvatarPopup);

//валидация форм
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formEditAvatarValidator.enableValidation();

let items;
api.getCards().then(data => {
    items = new Section({
      items: data,
      renderer: (item) => {
        createCard(item, 'append');
      }
    }, listElementsSelector);
    items.renderItems();
  })
  .catch(err => `Ошибка ${err}`);