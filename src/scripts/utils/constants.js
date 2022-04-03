export const cardSelector = '#card';
//селекторы попапов
export const popupSelector = {
    editProfile: '.popup_type_edit-profile',
    addCard: '.popup_type_add-card',
    editAvatar: '.popup_type_edit-avatar',
    fullImg: '.popup-full-img',
    deleteCard: '.popup_type_delete-card',
}
//селекторы элеметов попапов
export const popupImgSelectorImage = '.popup-full-img__img';
export const popupImgSelectorText = '.popup-full-img__text';
export const popupButtonCLoseSelector = '.popup__icon-close';
export const popupFormSelector = '.popup__form';
export const popupInputNameSelector = '.popup__input_type_name';
export const popupInputJobSelector = '.popup__input_type_job';
export const popupInputTitleSelector = '.popup__input_type_title';
export const popupInputLinkSelector = '.popup__input_type_link';
export const popupInputLinkAvatarSelector = '.popup__input_type_avatar-link';
//профиль пользователя
export const userSelector = {
    nameSelector: '.profile__name-text',
    aboutSelector: '.profile__about-me',
    avatarSelector: '.profile__avatar'
}
//контейнер для карточек
export const listElementsSelector = '.elements';
// Попапы
export const popupEditProfile = document.querySelector(popupSelector.editProfile);
export const popupAddCard = document.querySelector(popupSelector.addCard);
export const popupEditAvatar = document.querySelector(popupSelector.editAvatar);
// Кнопки
export const buttonSubmitSelector = '.popup__submit-button';
export const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
export const buttonOpenEditAvatarPopup = document.querySelector('.profile__edit-avatar-button');
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
export const buttonSubmitAddCardPopup = popupAddCard.querySelector(buttonSubmitSelector);
export const buttonSubmitEditProfilePopup = popupEditProfile.querySelector(buttonSubmitSelector);
export const buttonSubmitEditAvatarPopup = popupEditAvatar.querySelector(buttonSubmitSelector);
// Формы
export const form = {
    editProfile: popupEditProfile.querySelector(popupFormSelector),
    addCard: popupAddCard.querySelector(popupFormSelector),
    editAvatar: popupEditAvatar.querySelector(popupFormSelector)
}
// Поля форм
export const nameInput = form.editProfile.querySelector(popupInputNameSelector);
export const jobInput = form.editProfile.querySelector(popupInputJobSelector);
export const titleInput = form.addCard.querySelector(popupInputTitleSelector);
export const linkInput = form.addCard.querySelector(popupInputLinkSelector);
export const linkAvatarInput = form.editAvatar.querySelector(popupInputLinkAvatarSelector);
// Начальные настройки
export const settingsValidation = {
    formSelector: popupFormSelector,
    inputSelector: '.popup__input',
    submitButtonSelector: buttonSubmitSelector,
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};
// Текстовые константы
export const TEXT_LOADING = 'Сохранение...';
export const TOKEN = 'd0163cf8-cfab-4a34-ac21-cc13d220d7ff';