export default class FormValidator {
    constructor(selectors, form) {
        this._selectors = selectors;
        this._form = form;
    }

    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
        const button = this._form.querySelector(this._selectors.submitButtonSelector);
        this._toggleButtonState(inputList, button);
    
        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this._toggleButtonState(inputList, button);
            })
        });
    }

    _isValid (input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this.hideInputError(input);
        }
    }

    _toggleButtonState(inputList, button) {
        if (this._hasInvalidInput(inputList)) {
            this.disableSubmitButton(button);
        } else {
            this._enableSubmitButton(button);
        }
    }

    _hasInvalidInput = (inputList) => {        
        return inputList.some(input => {
            return !input.validity.valid;
        })
    }

    _enableSubmitButton(button) {
        button.classList.remove(this._selectors.inactiveButtonClass);
        button.disabled = false;
    }

    disableSubmitButton(button) {
        button.classList.add(this._selectors.inactiveButtonClass);
        button.disabled = true;
    }
    
    _showInputError(input) {
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        const errorMessage = input.validationMessage;
    
        input.classList.add(this._selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectors.errorClass);
    }
    
    hideInputError(input) {
        const errorElement = this._form.querySelector(`.${input.id}-error`);
    
        input.classList.remove(this._selectors.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._selectors.errorClass);
    }
}