export default class UserInfo {
    constructor({
        userNameSelector,
        userAboutSelector
    }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userAboutElement = document.querySelector(userAboutSelector);
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            job: this._userAboutElement.textContent
        }
    }

    setUserInfo(name, job) {
        this._userNameElement.textContent = name;
        this._userAboutElement.textContent = job;
    }
}