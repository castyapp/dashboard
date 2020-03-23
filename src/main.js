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
import "animate.css/animate.min.css";
import "./assets/css/app.css";
import "./assets/css/icofont.css";

import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
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
                await store.dispatch("getUser").then(response => {
                    store.state.user = response.data.result;
                });
            }
        }
    }
    next()
});

import "./axios";

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

let newVueApp = new Vue({
    el: '#app',
    router: router,
    store: store,
    components: { Master },
    template: '<Master />'
});

window.eventBus = newVueApp;
export const bus = newVueApp;