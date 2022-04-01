export default class Api {
    constructor({baseUrl, headers, renderLoading}) {
        this._url = baseUrl;
        this._headers = headers;
        this._renderLoading = renderLoading;
    }

    _fetchMain(path, method) {
        return fetch(`${this._url}${path}`, {
                method: method,
                headers: this._headers
            })
            .then(res => {
                if (res.ok)
                    return res.json();
                return Promise.reject(`Ошибка ${res.status}`);
            });
    }

    _fetchProfile(path, method, bodyObject, button) {
        const text = button.textContent;
        this._renderLoading(true, button);
        return fetch(`${this._url}${path}`, {
                method: method,
                headers: this._headers,
                body: JSON.stringify(bodyObject)
            })
            .then(res => {
                if (res.ok)
                    return res.json();
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .finally(() => this._renderLoading(false, button, text));
    }

    getUser() {
        return this._fetchMain('/users/me', 'GET');
    }

    getCards() {
        return this._fetchMain('/cards', 'GET');
    }

    editProfile(name, about, button) {
        return this._fetchProfile('/users/me', 'PATCH', {
            name: name,
            about: about
        }, button);
    }

    addCard(name, link, button) {
        return this._fetchProfile('/cards', 'POST', {
            name: name,
            link: link
        }, button);
    }

    deleteCard(cardId) {
        return this._fetchMain(`/cards/${cardId}`, 'DELETE');
    }

    setLike(cardId) {
        return this._fetchMain(`/cards/${cardId}/likes`, 'PUT');
    }

    deleteLike(cardId) {
        return this._fetchMain(`/cards/${cardId}/likes`, 'DELETE');
    }

    changeAvatar(avatar, button) {
        return this._fetchProfile('/users/me/avatar', 'PATCH', {
            avatar: avatar
        }, button);
    }
}