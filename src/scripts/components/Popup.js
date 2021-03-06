import {
    popupButtonCLoseSelector
} from '../utils/constants.js'

export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.open = this.open.bind(this)
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _closeOnOverlay(e) {
        if (e.target === e.currentTarget) {
            this.close();
        }
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector(popupButtonCLoseSelector).addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', (e) => this._closeOnOverlay(e))
    }
}