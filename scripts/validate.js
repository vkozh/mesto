const showInputError = (form, input, selectors) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    const errorMessage = input.validationMessage;

    input.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
}

const hideInputError = (form, input, selectors) => {
    const errorElement = form.querySelector(`.${input.id}-error`);

    input.classList.remove(selectors.inputErrorClass);
    errorElement.textContent = '0';
    errorElement.classList.remove(selectors.errorClass);
}

const hasInvalidInput = (inputList) => {        
    return inputList.some(input => {
        return !input.validity.valid;
    })
}

const toggleButtonState = (inputList, button, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        button.classList.add(inactiveButtonClass);
    } else {
        button.classList.remove(inactiveButtonClass);
    }
}

//валидация инпута
const isValid = (form, input, selectors) => {
    if (!input.validity.valid) {
        showInputError(form, input, selectors);
    } else {
        hideInputError(form, input, selectors);
    }
}

//обработчики на все элементы формы
const setEventListeners = (form, selectors) => {
    const inputList = Array.from(form.querySelectorAll(selectors.inputSelector));
    const button = form.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, button, selectors.inactiveButtonClass);

    inputList.forEach(input => {
        input.addEventListener('input', () => {
            isValid(form, input, selectors);
            toggleButtonState(inputList, button, selectors.inactiveButtonClass);
        })
    });
}

const enableValidation = (selectors) => {
    const forms = Array.from(document.querySelectorAll(selectors.formSelector));

    forms.forEach(form => {
        setEventListeners(form, selectors);
    });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});