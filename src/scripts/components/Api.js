export default class Api {
    constructor({baseUrl, headers, renderLoading}) {
        this._url = baseUrl;
        this._headers = headers;
        this._renderLoading = renderLoading;
    }

    _mainFetch(path, method) {
        return fetch(`${this._url}${path}`, {
                method: method,
                headers: this._headers
            })
            .then(res => {
                if (res.ok)
                    return res.json();
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .catch(err => `Ошибка ${err}`);
    }

    _profileFetch(path, method, bodyObject, button) {
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
            .catch(err => `Ошибка ${err}`)
            .finally(() => this._renderLoading(false, button, text));
    }

    getUser() {
        return this._mainFetch('/users/me', 'GET');
    }

    getCards() {
        return this._mainFetch('/cards', 'GET');
    }

    editProfile(name, about, button) {
        return this._profileFetch('/users/me', 'PATCH', {
            name: name,
            about: about
        }, button);
    }

    addCard(name, link, button) {
        return this._profileFetch('/cards', 'POST', {
            name: name,
            link: link
        }, button);
    }

    deleteCard(cardId) {
        return this._mainFetch(`/cards/${cardId}`, 'DELETE');
    }

    setLike(cardId) {
        return this._mainFetch(`/cards/${cardId}/likes`, 'PUT');
    }

    deleteLike(cardId) {
        return this._mainFetch(`/cards/${cardId}/likes`, 'DELETE');
    }

    changeAvatar(avatar, button) {
        return this._profileFetch('/users/me/avatar', 'PATCH', {
            avatar: avatar
        }, button);
    }
}