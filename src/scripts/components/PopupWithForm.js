import Popup from "./Popup.js";
import {
    popupFormSelector,
    TEXT_LOADING,
    buttonSubmitSelector
} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector(popupFormSelector);
        this._inputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._button = this._popup.querySelector(buttonSubmitSelector);
        this._initialButtonText = this._button.textContent;
    }

    renderLoading(isLoading) {
        isLoading ?
            this._button.textContent = TEXT_LOADING :
            this._button.textContent = this._initialButtonText;
    }

    _getInputValues() {
        const inputsObject = {};
        this._inputs.forEach(input => inputsObject[input.name] = input.value);
        return inputsObject;
    }

    setInputValues(data) {
        this._inputs.forEach(input => input.value = data[input.name]);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => this._handleFormSubmit(e, this._getInputValues()));
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}