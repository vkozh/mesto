import Popup from "./Popup.js";
import {
    popupFormSelector
} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector(popupFormSelector);
    }

    _getInputValues() {
        const inputs = Array.from(this._popupForm.querySelectorAll('.popup__input'))
        const inputsObject = {};
        inputs.forEach(input => inputsObject[input.name] = input.value);
        return inputsObject;
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