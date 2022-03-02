export default class FormValidator {
    constructor(selectors, form) {
        this._selectors = selectors;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
        this._button = this._form.querySelector(this._selectors.submitButtonSelector);
    }

    enableValidation() {   
        this._toggleButtonState();
        this._setEventListeners();
    }

    _setEventListeners() {        
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this._toggleButtonState();
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

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    }

    _hasInvalidInput = () => {        
        return this._inputList.some(input => {
            return !input.validity.valid;
        })
    }

    _enableSubmitButton() {
        this._button.classList.remove(this._selectors.inactiveButtonClass);
        this._button.disabled = false;
    }

    disableSubmitButton() {
        this._button.classList.add(this._selectors.inactiveButtonClass);
        this._button.disabled = true;
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