export default class UserInfo {
    constructor({
        userNameSelector,
        userAboutSelector,
        userAvatarSelector
    }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userAboutElement = document.querySelector(userAboutSelector);
        this._userAvatarSelector = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            job: this._userAboutElement.textContent,
            avatar: this._userAvatarSelector.src
        }
    }

    setUserInfo(name, job, avatar) {
        this._userNameElement.textContent = name;
        this._userAboutElement.textContent = job;
        this._userAvatarSelector.src = avatar;
    }
}