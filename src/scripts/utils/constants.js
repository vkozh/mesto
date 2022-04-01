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
//контейнер для карточек
export const listElementsSelector = '.elements';
// Попапы
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
// Кнопки
export const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
export const buttonOpenEditAvatarPopup = document.querySelector('.profile__edit-avatar-button');
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
export const buttonSubmitAddCardPopup = popupAddCard.querySelector('.popup__submit-button');
export const buttonSubmitEditProfilePopup = popupEditProfile.querySelector('.popup__submit-button');
export const buttonSubmitEditAvatarPopup = popupEditAvatar.querySelector('.popup__submit-button');
// Формы
export const formEditProfile = popupEditProfile.querySelector(popupFormSelector);
export const formAddCard = popupAddCard.querySelector(popupFormSelector);
export const formEditAvatar = popupEditAvatar.querySelector(popupFormSelector);
// Поля форм
export const nameInput = formEditProfile.querySelector(popupInputNameSelector);
export const jobInput = formEditProfile.querySelector(popupInputJobSelector);
export const titleInput = formAddCard.querySelector(popupInputTitleSelector);
export const linkInput = formAddCard.querySelector(popupInputLinkSelector);
export const linkAvatarInput = formEditAvatar.querySelector(popupInputLinkAvatarSelector);
// начальные настройки
export const settingsValidation = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };

export const TEXT_LOADING = 'Сохранение...'