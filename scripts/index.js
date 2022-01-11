/*

клик по кнопке edit 
показать попап
заполнить поля текущим именем

клик по сохранить
скрыть попап
изменить имя на новое

*/

let profileName = document.querySelector('.profile__name-text');
let profileJob = document.querySelector('.profile__about-me');

let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__icon-close');
// Находим форму в DOM
let formElement = popup.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function openPopup () {
    popup.classList.add('popup_opened');
    nameInput.value = profileName;
    jobInput.value = profileJob;
}

function closePopup(){
    popup.classList.remove('popup_opened');
}



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    // Получите значение полей jobInput и nameInput из свойства value
   // let nameInputValue = nameInput.value;
    let jobInput = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);