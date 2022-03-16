import Popup from "./Popup.js";
import {
    popupFormSelector,
    popupInputNameSelector,
    popupInputJobSelector
} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector(popupFormSelector);
    }

    _getInputValues() {
        return (Array.from(this._popupForm.querySelectorAll('.popup__input')).map(el => el.value));
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