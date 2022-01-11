// Находим имя и род деятельности из профиля в DOM
let profileName = document.querySelector('.profile__name-text');
let profileJob = document.querySelector('.profile__about-me');
// Находим попап в DOM
let popup = document.querySelector('.popup');
// Находим кнопки в DOM
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__icon-close');
// Находим форму в DOM
let formElement = popup.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

//вешаем обработчики на клики
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

//открыть попап
function openPopup() {
    popup.classList.add('popup_opened');
    //подставляем значения полей
    nameInput.value = profileName.innerHTML;
    jobInput.value = profileJob.innerHTML;
}

//закрыть попап
function closePopup() {
    popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
    closePopup();
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', formSubmitHandler);

//клик по сердечку
let likes = document.querySelectorAll('.element__like');
likes.forEach((like) => {
    like.addEventListener('click', ()=>{
        like.classList.toggle('element__like_active');
    })
})