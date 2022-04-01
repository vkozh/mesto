import './index.css';
import {
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
  linkAvatarInput

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
    authorization: 'd0163cf8-cfab-4a34-ac21-cc13d220d7ff',
    'Content-Type': 'application/json'
   },
   renderLoading: renderLoading
  });

function renderLoading(isLoading, button, text){
  isLoading
  ? button.textContent = "Сохранение..."
  : button.textContent = text;
}

function createCard(item, position) {
  const card = new Card(item, '#card', popupOpenImg.open, popupDeleteCard.open, toggleLike);
  const cardElement = card.generateCard();
  items.addItem(cardElement, position);
}

function toggleLike(cardId, updateLikes, isLiked) {
  if (isLiked)
    api.deleteLike(cardId)
    .then(data => updateLikes(data.likes.length, false));
  else
    api.setLike(cardId)
    .then(data => updateLikes(data.likes.length, true));
}

function openEditProfilePopup() {
  //очищаем ошибки
  formEditProfileValidator.hideInputError(nameInput);
  formEditProfileValidator.hideInputError(jobInput);
  formEditProfileValidator.disableSubmitButton(buttonSubmitEditProfilePopup);
  //заполняем поля
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().job;
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

const settingsValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const user = new UserInfo({
  userNameSelector: '.profile__name-text',
  userAboutSelector: '.profile__about-me',
  userAvatarSelector: '.profile__avatar'
});

api.getUser().then(data =>
  user.setUserInfo(data.name, data.about, data.avatar)
)

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (e, {
  inputName,
  inputJob
}) => {
  e.preventDefault();
  api.editProfile(inputName, inputJob, buttonSubmitEditProfilePopup)
    .then(data => user.setUserInfo(data.name, data.about, data.avatar));
  popupEditProfile.close();
});

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', (e, {
  inputLink
}) => {
  e.preventDefault();
  api.changeAvatar(inputLink, buttonSubmitEditAvatarPopup)
  .then(data => user.setUserInfo(data.name, data.about, data.avatar));
  popupEditAvatar.close();
})

const popupAddCard = new PopupWithForm('.popup_type_add-card', (e, {
  inputTitle,
  inputLink
}) => {
  e.preventDefault();
  api.addCard(inputTitle, inputLink, buttonSubmitAddCardPopup)
    .then(data => createCard(data, 'prepend'));
  popupAddCard.close();
});

const popupOpenImg = new PopupWithImage('.popup-full-img');

const popupDeleteCard = new PopupForCard('.popup_type_delete-card', (e, deleteCard, cardId) => {
  e.preventDefault();
  deleteCard();
  api.deleteCard(cardId);
  popupDeleteCard.close();
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
});