export default class Api {
    constructor(url, authorization) {
        this._url = url;
        this._authorization = authorization;
    }

    _mainFetch(path, method, ...params) {
        return fetch(`${this._url}${path}`, {
                method: method,
                headers: {
                    authorization: this._authorization,
                },
                params
            })
            .then(res => {
                if (res.ok)
                    return res.json();
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .catch(err => `Ошибка ${err}`);
    }

    getUser() {
        return this._mainFetch('/users/me', 'GET');
    }

    getCards() {
        return this._mainFetch('/cards', 'GET');
    }

    editProfile(name, about) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(res => {
                if (res.ok)
                    return res.json();
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .catch(err => `Ошибка ${err}`);
    }


    addCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(res => {
            if (res.ok)
                return res.json();
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .catch(err => `Ошибка ${err}`);
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

    changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._authorization
                },
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then(res => {
                if (res.ok)
                    return res.json();
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .catch(err => `Ошибка ${err}`);
    }
}