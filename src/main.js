import Vue from 'vue'
import routes from './routes'
import VueRouter from 'vue-router'
import apiConfig from './store/api'
import { store } from './store/store'
import VueChatScroll from 'vue-chat-scroll'
import Notifications from 'vue-notification'
import vueTopProgress from 'vue-top-progress'
import Master from './components/layouts/Master'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueChatScroll);
Vue.use(Notifications);
Vue.use(vueTopProgress);
Vue.use(require('vue-jalali-moment'));

let newVueApp = new Vue();

window.eventBus = newVueApp;
export const bus = newVueApp;

const router = new VueRouter({
    mode: 'history',
    routes,
});

import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import "./assets/css/app.css";
import "./assets/css/icofont.css";

import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
import axios from "axios/index";

Vue.component('loader', VueLoaders.component);

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({ name: 'dashboard' })
        } else {
            next()
        }
    } else {
        next()
    }
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.loggedIn) {

            if (localStorage.getItem("user") === null){
                await store.dispatch("getUser").then(response => {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.result)
                    );
                });
            }

            let user = await localStorage.getItem("user");
            if (user !== null){
                store.state.user = JSON.parse(user);
            }

        }
    }
    next()
});

axios.interceptors.response.use(response => { return response }, async error => {

    if (error.config.url.includes("twitch")) {
        return config
    }

    // This function is part of a promise chain.
    // It needs to return a value or another promise so the caller knows when it
    // has completed.

    // Pass all non 401s back to the caller.
    if (error.response.status !== 401) {
        return Promise.reject(error);
    }

    if (store.getters.loggedIn && store.getters.token !== null) {

        await store.dispatch('refreshTokenAndGetUser').then(token => {

            error.hasRefreshedToken = true;
            error.config.headers['Authorization'] = 'Bearer ' + token;
            return Promise.reject(error);

        }).catch(err => {

            console.log(err);

            store.dispatch('logout').then(() => {
                router.push({
                    name: 'login',
                    params: {
                        err: {
                            group: 'auth',
                            type: 'success',
                            text: "Login again!",
                            title: "Success",
                            duration: 2000,
                        }
                    },
                });
            });

            return Promise.reject(error);
        });

    }

    return Promise.reject(error);
});

// axios.interceptors.response.use(config => {
//
//     console.log(config);
//
//     return config
//
// }, async error => {
//
//     if (store.getters.loggedIn && error.request.status === 401){
//
//         let request = axios.request(error.config);
//
//         request.catch(error => {
//             return Promise.reject(error);
//         });
//
//         return Promise.reject(error);
//     }
//
//     // let req = axios.request(error.config);
//     // console.log(req);
//
//     return Promise.reject(error);
//
//     if (error.message === "Network Error"){
//
//         // store.dispatch("logout").then(() => {
//         //     router.push({ name: 'login' }).then( () => {
//         //         Vue.notify({
//         //             group: 'auth',
//         //             type: 'error',
//         //             text: "Please try again later!",
//         //             title: "Network error.",
//         //             duration: 2000,
//         //         });
//         //     });
//         // }).catch(console.log);
//         return
//     }
//
//     if (!store.getters.loggedIn) {
//         return Promise.reject(error)
//     }
//
//     if (error.request !== undefined && error.request.responseURL.includes('auth') || error.request.responseURL.includes('oauth')) {
//         return Promise.reject(error)
//     }
//
//     if (error.request !== undefined && store.getters.token !== null) {
//
//         if (store.getters.loggedIn && error.request.status === 401){
//             return axios.request(error.config);
//         }
//
//         return Promise.reject(error)
//
//     } else {
//         store.dispatch("logout").then(() => {
//             router.push({name: 'login'});
//         }).catch(console.log)
//     }
//
//     return Promise.reject(error)
//
// });

Vue.mixin({
    data() {
        return {
            get apiBaseUrl() {
                return `${apiConfig.schema}://${apiConfig.baseURL}`;
            },
            get user() {
                return store.state.user;
            }
        }
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    components: { Master },
    template: '<Master />'
});