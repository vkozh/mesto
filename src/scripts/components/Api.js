export default class Api {
    constructor(){}

    getUser(){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-39/users/me', {
            method: 'GET',
            headers: {
                authorization: ''
            }
        })
        .then(res => {
            if(res.ok)
                return res.json();
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .catch(err => `Ошибка ${err}`);
    }

    getCards(){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-39/cards', {
            method: 'GET'
        })
        .then(res => {
            if(res.ok)
                return res.json();
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .catch(err => `Ошибка ${err}`);
    }

    editProfile(name, about){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-39/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => {
            if(res.ok)
                return res.json();
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .catch(err => `Ошибка ${err}`);
    }

    addCard(){}

    deleteCard(cardId){
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-39/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: ''
            },
        })
        .then(res => {
            if(res.ok)
                return res.json();
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .catch(err => `Ошибка ${err}`);
    }

    setLike(cardId){
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-39/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: ''
            },
        })
        .then(res => {
            if(res.ok)
                return res.json();
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .catch(err => `Ошибка ${err}`);
    }

    deleteLike(cardId){
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-39/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: ''
            },
        })
        .then(res => {
            if(res.ok)
                return res.json();
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .catch(err => `Ошибка ${err}`);
    }

    changeAvatar(avatar){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-39/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: ''
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(res => {
            if(res.ok)
                return res.json();
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .catch(err => `Ошибка ${err}`);
    }
}