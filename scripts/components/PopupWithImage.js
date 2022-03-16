import Popup from "./Popup.js";
import { popupImgSelectorImage, popupImgSelectorText } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._popupImg = this._popup.querySelector(popupImgSelectorImage);
        this._popupImgText = this._popup.querySelector(popupImgSelectorText);
        this.open = this.open.bind(this);
    }

    open(title, link){
        this._popupImg.src = link;
        this._popupImg.alt = title;
        this._popupImgText.textContent = title;
        super.open();
    }
}