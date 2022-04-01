export default class Api {
    constructor({
        baseUrl,
        headers,
        renderLoading
    }) {
        this._url = baseUrl;
        this._headers = headers;
        this._renderLoading = renderLoading;
    }

    _fetch(path, method, bodyObject, button) {
        if (bodyObject === undefined)
            return fetch(`${this._url}${path}`, {
                    method: method,
                    headers: this._headers
                })
                .then(this._checkResponse);
        else {
            const text = button.textContent;
            this._renderLoading(true, button);
            return fetch(`${this._url}${path}`, {
                    method: method,
                    headers: this._headers,
                    body: JSON.stringify(bodyObject)
                })
                .then(this._checkResponse)
                .finally(() => this._renderLoading(false, button, text));
        }
    }

    _checkResponse(res) {
        if (res.ok)
            return res.json();
        return Promise.reject(`Ошибка ${res.status}`);
    }


    getUser() {
        return this._fetch('/users/me', 'GET');
    }

    getCards() {
        return this._fetch('/cards', 'GET');
    }

    editProfile(name, about, button) {
        return this._fetch('/users/me', 'PATCH', {
            name: name,
            about: about
        }, button);
    }

    addCard(name, link, button) {
        return this._fetch('/cards', 'POST', {
            name: name,
            link: link
        }, button);
    }

    deleteCard(cardId) {
        return this._fetch(`/cards/${cardId}`, 'DELETE');
    }

    setLike(cardId) {
        return this._fetch(`/cards/${cardId}/likes`, 'PUT');
    }

    deleteLike(cardId) {
        return this._fetch(`/cards/${cardId}/likes`, 'DELETE');
    }

    changeAvatar(avatar, button) {
        return this._fetch('/users/me/avatar', 'PATCH', {
            avatar: avatar
        }, button);
    }
}