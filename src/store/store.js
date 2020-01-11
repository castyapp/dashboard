import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from "./api"

Vue.use(Vuex);

axios.defaults.baseURL = `${config.schema}://${config.baseURL}/${config.version}`;

export const store = new Vuex.Store({
    state: {
        refreshed_token: localStorage.getItem('refreshed_token') || null,
        token: localStorage.getItem('access_token') || null,
        user: null,
    },
    getters: {
        loggedIn: (state, getters) => {
            return getters.token !== null
        },
        token: state => {
            if (state.token === "null" || state.token === null || state.token === ""){
                return null
            }
            return state.token
        },
        user: state => state.user,
    },
    mutations: {
        retrieveToken: (state, {token, refreshed_token}) => {
            state.token = token;
            localStorage.setItem('access_token', state.token);
            state.refreshed_token = refreshed_token;
            localStorage.setItem('refreshed_token', refreshed_token);
        },
        destroyToken: (state) => {
            state.token = null;
            state.user = {};
            localStorage.removeItem("access_token");
            localStorage.removeItem("refreshed_token");
        },
        addUserData: (state, data) => {
            state.user = data;
            localStorage.setItem('user', JSON.stringify(data));
        }
    },
    actions: {
        logout(context) {
            context.commit("destroyToken");
        },
        getFriendsList(context) {
            return new Promise((resolve, reject) => {
                axios.get('/user/@friends', {
                    headers: {
                        'Authorization': `Bearer ${context.state.token}`
                    },
                }).then(resolve).catch(reject)
            })
        },
        getUser(context) {
            return new Promise((resolve, reject) => {
                axios.get('/user/@me', {
                    headers: {
                        'Authorization': `Bearer ${context.state.token}`
                    },
                }).then(resolve).catch(reject)
            })
        },
        refreshToken(context) {
            return new Promise((resolve, reject) => {
                axios.put('/auth/@create', {}, {
                    skipAuthRefresh: true,
                    headers: {
                        "Authorization": `Bearer ${context.state.refreshed_token}`,
                    },
                }).then(response => {
                    context.commit('retrieveToken', response.data.result);
                    resolve(response)
                }).catch(reject)
            });
        },
        searchUser(context, keyword) {
            return new Promise((resolve, reject) => {
                axios.get(`/user/@search?keyword=${keyword}`, {
                    headers: {
                        'Authorization': `Bearer ${context.state.token}`
                    },
                }).then(response => {
                    if (response !== undefined){
                        resolve(response)
                    }
                }).catch(reject)
            })
        },
        getFriend(context, friend_id) {
            return new Promise((resolve, reject) => {
                axios.get(`/user/@friends/${friend_id}`, {
                    headers: {
                        'Authorization': `Bearer ${context.state.token}`
                    },
                }).then(resolve).catch(reject)
            })
        },
        getMessages(context, user_id) {
            return new Promise((resolve, reject) => {
                axios.get(`/user/@messages/${user_id}`, {
                    headers: {
                        'Authorization': `Bearer ${context.state.token}`
                    },
                }).then(resolve).catch(reject)
            })
        },
        sendMessage(context, message) {

            const params = new URLSearchParams();
            params.append('content', message.content);

            return new Promise((resolve, reject) => {
                axios.post(`/user/@messages/${message.to}`, params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${context.state.token}`,
                    }
                }).then(resolve).catch(reject)
            })
        },
        getTheaterMembers(context, theater_id) {
            return new Promise((resolve, reject) => {
                axios.get(`/user/@theaters/${theater_id}/members`, {
                    headers: {
                        'Authorization': `Bearer ${context.state.token}`
                    },
                }).then(resolve).catch(reject);
            })
        },
        getTheater(context, theater_id) {
            return new Promise((resolve, reject) => {
                axios.get(`/user/@theaters/${theater_id}`, {
                    headers: {
                        'Authorization': `Bearer ${context.state.token}`
                    },
                }).then(resolve).catch(reject);
            })
        },
        getTheaters(context) {
            return new Promise((resolve, reject) => {
                axios.get('/user/@theaters', {
                    headers: {
                        'Authorization': `Bearer ${context.state.token}`
                    },
                }).then(resolve).catch(reject);
            })
        },
        createTheater(context, theater) {

            return new Promise((resolve, reject) => {

                let params = new FormData();
                params.append('title', theater.title);
                params.append('movie_uri', theater.movie_uri);
                params.append('privacy', theater.privacy);
                params.append('video_player_access', theater.player_access);

                if (theater.poster !== null){
                    params.append(
                        'poster',
                        theater.poster,
                        theater.poster.filename
                    );
                }

                axios.post('/user/@theaters', params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${context.state.token}`,
                    }
                }).then(resolve).catch(reject);

            })
        },
        sendFriendRequest(context, friend_id) {

            return new Promise((resolve, reject) => {
                const params = new URLSearchParams();
                params.append('friend_id', friend_id);
                axios.post('/user/@friends', params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${context.state.token}`,
                    }
                }).then(resolve).catch(reject);
            })
        },
        register(context, data) {

            return new Promise((resolve, reject) => {

                const params = new URLSearchParams();

                params.append('email', data.email);
                params.append('fullname', data.fullname);
                params.append('username', data.username);
                params.append('password', data.password);
                params.append('password_confirmation', data.password_confirmation);

                axios.post('/user/@create', params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${context.state.token}`,
                    }
                }).then(response => {
                    context.commit('retrieveToken', response.data.result);
                    resolve(response)
                }).catch(reject);
            })
        },
        createAuthToken(context, credentials) {

            return new Promise((resolve, reject) => {

                const params = new URLSearchParams();

                params.append('username', credentials.username);
                params.append('password', credentials.password);

                axios.post('/auth/@create', params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${context.state.token}`,
                    }
                }).then(response => {
                    context.commit('retrieveToken', response.data.result);
                    resolve(response)
                }).catch(reject);
            })
        }
    },
});