export default class UserInfo {
    constructor({
        nameSelector,
        aboutSelector,
        avatarSelector
    }) {
        this._userNameElement = document.querySelector(nameSelector);
        this._userAboutElement = document.querySelector(aboutSelector);
        this._userAvatarSelector = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            job: this._userAboutElement.textContent,
            avatar: this._userAvatarSelector.src
        }
    }

    setUserInfo({name, about, avatar}) {
        this._userNameElement.textContent = name;
        this._userAboutElement.textContent = about;
        this._userAvatarSelector.src = avatar;
    }
}