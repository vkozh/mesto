import './index.css';
import {
  cardSelector,
  settingsValidation,
  listElementsSelector,
  popupSelector,
  form,
  userSelector,
  buttonOpenEditProfilePopup,
  buttonOpenEditAvatarPopup,
  buttonOpenAddCardPopup,
  buttonSubmitEditProfilePopup,
  buttonSubmitAddCardPopup,
  buttonSubmitEditAvatarPopup,
  nameInput,
  jobInput,
  TEXT_LOADING,
  TOKEN

} from '../scripts/utils/constants.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Card from "../scripts/components/Card.js";
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import ConfirmationPopup from '../scripts/components/ConfirmationPopup';
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
  isLoading ?
    button.textContent = TEXT_LOADING :
    button.textContent = text;
}

function toggleLike(card) {
  if (card.isLiked)
    api.deleteLike(card.getId())
    .then(data => card.updateLikes(data.likes.length, false))
    .catch(err => console.log(`Ошибка ${err}`));
  else
    api.setLike(card.getId())
    .then(data => card.updateLikes(data.likes.length, true))
    .catch(err => console.log(`Ошибка ${err}`));
}

function openEditProfilePopup() {
  //очищаем ошибки
  formValidators[form.editProfile.getAttribute('name')].resetValidation();
  //заполняем поля
  const {
    name,
    job
  } = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  popupEditProfile.open();
}

function openAddCardPopup() {
  //очищаем ошибки
  formValidators[form.addCard.getAttribute('name')].resetValidation();
  popupAddCard.open();
}

function openEditAvatarPopup() {
  //очищаем ошибки
  formValidators[form.editAvatar.getAttribute('name')].resetValidation();
  popupEditAvatar.open();
}

const popupEditProfile = new PopupWithForm(popupSelector.editProfile, (e, {
  inputName,
  inputJob
}) => {
  e.preventDefault();
  api.editProfile(inputName, inputJob, buttonSubmitEditProfilePopup)
    .then(data => {
      user.setUserInfo(data);
      popupEditProfile.close()
    })
    .catch(err => console.log(`Ошибка ${err}`));
});

const popupEditAvatar = new PopupWithForm(popupSelector.editAvatar, (e, {
  inputLink
}) => {
  e.preventDefault();
  api.changeAvatar(inputLink, buttonSubmitEditAvatarPopup)
    .then(data => {
      user.setUserInfo(data);
      popupEditAvatar.close();
    })
    .catch(err => console.log(`Ошибка ${err}`));
})

const popupAddCard = new PopupWithForm(popupSelector.addCard, (e, {
  inputTitle,
  inputLink
}) => {
  e.preventDefault();
  api.addCard(inputTitle, inputLink, buttonSubmitAddCardPopup)
    .then(data => {
      cardSection.addItem(data, 'prepend');
      popupAddCard.close();
    })
    .catch(err => console.log(`Ошибка ${err}`));
});

const popupOpenImg = new PopupWithImage(popupSelector.fullImg);

const popupDeleteCard = new ConfirmationPopup(popupSelector.deleteCard, (e, card) => {
  e.preventDefault();
  api.deleteCard(card.getId())
    .then(() => {
      card.delete();
      popupDeleteCard.close();
    })
    .catch(err => console.log(`Ошибка ${err}`));
});

// Валидаторы форм
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

enableValidation(settingsValidation);

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

const user = new UserInfo(userSelector);

let cardSection;
Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cards]) => {
    // установка данных пользователя
    user.setUserInfo(userData);
    // отрисовка карточек
    cardSection = new Section({
      items: cards,
      renderer: (item) => {
        const card = new Card(item, cardSelector, popupOpenImg.open, popupDeleteCard.open, toggleLike, user.getUserInfo().id);
        return card.generateCard();
      }
    }, listElementsSelector);
    cardSection.renderItems();
  })
  .catch(err => console.log(`Ошибка ${err}`));