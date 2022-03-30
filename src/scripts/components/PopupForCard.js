import Popup from "./Popup";
import {
    popupFormSelector
} from '../utils/constants.js';

export default class PopupForCard extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector(popupFormSelector);
    }

    open(deleteCard, id) {
        this._deleteCard = deleteCard;
        this._cardId = id;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => this._handleFormSubmit(e, this._deleteCard, this._cardId));
    }
}