import Vue from 'vue'
import VTitle from 'v-title'
import routes from './routes'
import 'v-title/lib/element-ui'
import VueRouter from 'vue-router'
import apiConfig from './store/api'
import { store } from './store/store'
import VueChatScroll from 'vue-chat-scroll'
import Notifications from 'vue-notification'
import vueTopProgress from 'vue-top-progress'
import Master from './components/layouts/Master'
import * as VueSpinnersCss from "vue-spinners-css"
import GSignInButton from 'vue-google-signin-button'
const {Status} = require("@stackpath/node-grpc-error-details");

Vue.config.productionTip = false;

Vue.use(VTitle);
Vue.use(VueRouter);
Vue.use(GSignInButton);
Vue.use(VueChatScroll);
Vue.use(Notifications);
Vue.use(VueSpinnersCss);
Vue.use(vueTopProgress);
Vue.use(require('vue-jalali-moment'));

// process.env.VUE_APP_API_GOOGLE_ANALYTICS_TRACK_ID

const router = new VueRouter({
    mode: 'history',
    routes,
});

import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-select/dist/js/bootstrap-select.js";
import "bootstrap-select/dist/css/bootstrap-select.css";
import "animate.css/animate.min.css";
import "./assets/css/app.css";
import "./assets/css/icofont.css";

import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
import {websocket} from "./store/ws";
Vue.use(VueLoaders);

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({ name: 'dashboard' });
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
            if (store.state.user == null){
                await store.dispatch("getUser").then(user => {
                    store.state.user = user;
                }).catch(err => {

                    console.log(err);

                    // instead of this store call you would put your code to get new token
                    store.dispatch("refreshToken").then(response => {
                        console.log("Refreshed: ", response);
                    }).catch(async err => {
                        console.log("Not Refreshed", err);
                        await store.dispatch('logout').then(() => {
                            localStorage.removeItem("user");
                            websocket.user.disconnect();
                            bus.$router.push({ name: 'login', params: {
                                err: {
                                    group: 'auth',
                                    type: 'error',
                                    text: "Login failed, Try to login again!",
                                    title: "Failed",
                                    duration: 2000,
                                }
                            }});
                        });
                    });

                });
            }
        }
    }
    next()
});

Vue.mixin({
    data() {
        return {
            get cdnUrl() {
                return `${apiConfig.cdnUrl}/uploads`;
            },
            get user() {
                return store.state.user;
            }
        }
    },
    methods: {
        getGrpcErrors(error) {
            const str = atob(error.metadata['grpc-status-details-bin']);
            let utf8Encode = new TextEncoder();
            const bytes = utf8Encode.encode(str);
            const status = Status.deserializeBinary(bytes);
            let errors = {};
            const decoder = new TextDecoder("utf-8");
            status.getDetailsList().forEach(err => {
                errors[err.getTypeUrl()] =
                    decoder.decode(err.getValue());
            })
            return errors;
        },
        log(message, color) {
            color = color || "black";
            switch (color) {
                case "success":  
                    color = "Green"; 
                    break;
                case "info":     
                    color = "DodgerBlue";  
                    break;
                case "error":   
                    color = "Red";     
                    break;
                case "warning":  
                    color = "Orange";   
                    break;
            }
            console.log("%c" + message, "color:" + color);
        }
    },
});

let newVueApp = new Vue({
    el: '#app',
    router: router,
    store: store,
    components: { Master },
    template: '<Master />'
});

window.eventBus = newVueApp;
export const bus = newVueApp;