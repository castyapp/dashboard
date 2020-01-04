import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from "./api"

Vue.use(Vuex);

axios.defaults.baseURL = `${config.schema}://${config.baseURL}/${config.version}`;

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        user: {},
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
        retrieveToken: (state, token, refreshed_token) => {
            state.token = token;
            state.refreshed_token = refreshed_token;
        },
        destroyToken: (state) => {
            state.token = null;
            state.user = {};
            localStorage.removeItem("access_token");
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
        refreshTokenAndGetUser(context) {

            let access_token = `Bearer ${context.state.refreshed_token}`;

            return new Promise((resolve, reject) => {
                axios.put('/auth/@create', null, {
                    headers: {
                        "Authorization": access_token,
                    },
                }).then(response => {

                    const token = response.data.result.token,
                        refreshed_token = response.data.result.refreshed_token;

                    localStorage.setItem('access_token', token);
                    localStorage.setItem('refreshed_token', refreshed_token);
                    context.commit('retrieveToken', token, refreshed_token);

                    this.getUser(context).then(response => {
                        let user = response.data.result;
                        context.commit('addUserData', user);
                    }).catch(reject);

                    resolve(token)

                }).catch(reject)
            })
        },
        getHealth(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/sys/@health')
                    .then(resolve)
                    .catch(reject)
            })
        },
        getFriendsList(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/user/@friends')
                    .then(resolve)
                    .catch(reject)
            })
        },
        getAccessories(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/user/@accessories')
                    .then(resolve)
                    .catch(reject)
            })
        },
        getWeeklyChart(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/charts/@week')
                    .then(resolve)
                    .catch(reject)
            })
        },
        getLogs(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/user/@logs')
                    .then(resolve)
                    .catch(reject)
            })
        },
        getUser(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/user/@me')
                    .then(resolve)
                    .catch(reject)
            })
        },
        refreshToken(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.refreshed_token;

            return new Promise((resolve, reject) => {
                axios.put('/auth/@create')
                    .then(resolve)
                    .catch(reject)
            })
        },
        searchUser(context, keyword) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get(`/user/@search?keyword=${keyword}`)
                    .then(resolve)
                    .catch(reject)
            })
        },
        getFriend(context, friend_id) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get(`/user/@friends/${friend_id}`)
                    .then(resolve)
                    .catch(reject)
            })
        },
        getMessages(context, user_id) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get(`/user/@messages/${user_id}`)
                    .then(resolve)
                    .catch(reject)
            })
        },
        sendMessage(context, message) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            const params = new URLSearchParams();
            params.append('content', message.content);

            return new Promise((resolve, reject) => {
                axios.post(`/user/@messages/${message.to}`, params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(resolve).catch(reject)
            })
        },
        getTheaterMembers(context, theater_id) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get(`/user/@theaters/${theater_id}/members`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(resolve).catch(reject);
            })
        },
        getTheater(context, theater_id) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get(`/user/@theaters/${theater_id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(resolve).catch(reject);
            })
        },
        getTheaters(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/user/@theaters', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
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
                    params.append('poster', theater.poster, theater.poster.filename);
                }

                axios.post('/user/@theaters', params, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
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
                        'Content-Type': 'application/x-www-form-urlencoded'
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
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {

                    const token = response.data.result.token,
                        refreshed_token = response.data.result.refreshed_token;

                    localStorage.setItem('access_token', token);
                    localStorage.setItem('refreshed_token', refreshed_token);
                    context.commit('retrieveToken', token, refreshed_token);

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
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {

                    const token = response.data.result.token,
                        refreshed_token = response.data.result.token;

                    localStorage.setItem('access_token', token);
                    localStorage.setItem('refreshed_token', refreshed_token);
                    context.commit('retrieveToken', token, refreshed_token);

                    resolve(response)
                }).catch(reject);
            })
        }
    }
});