import Vue from 'vue'
import VTitle from 'v-title'
import Master from '@/Master'
import routes from '@/routes'
import 'v-title/lib/element-ui'
import linkify from 'vue-linkify'
import VueRouter from 'vue-router'
import apiConfig from '@/store/api'
import {store} from '@/store/store'
import VueChatScroll from 'vue-chat-scroll'
import Notifications from 'vue-notification'
import vueTopProgress from 'vue-top-progress'
import {proto} from 'libcasty-protocol-js/commonjs'

Vue.config.productionTip = false;

Vue.use(VTitle);
Vue.use(VueRouter);
Vue.use(VueChatScroll);
Vue.use(Notifications);
Vue.use(vueTopProgress);
Vue.directive('linkified', linkify);

const router = new VueRouter({
  mode: 'history',
  routes,
});

//import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap-select/dist/js/bootstrap-select.js";
import "bootstrap-select/dist/css/bootstrap-select.css";
import "animate.css/animate.min.css";
import "@/assets/css/app.css";
import "@/assets/css/icofont.css";

import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
import userSocket from "@/store/user.ws";

Vue.use(VueLoaders);

router.beforeEach(async (to, _, next) => {
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

router.beforeEach(async (__, _, next) => {
  if (store.getters.loggedIn) {
    if (store.state.user == null){
      await store.dispatch("getUser").then(async user => {

        await store.dispatch("getTheater").then(theater => {
          user.theater = theater;
          store.state.user = user;
        })

      }).catch(() => {
        store.dispatch("refreshToken").catch(async () => {
          await store.dispatch('logout').then(() => {
            localStorage.removeItem("user");
            userSocket.disconnect();
            router.push({ name: 'login', params: {
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
  next()
});

Vue.mixin({
  data() {
    return {
      get loggedIn() {
        return store.getters.loggedIn && this.user !== null
      },
      get cdnUrl() {
        return `${apiConfig.cdnUrl}/uploads`;
      },
      get user() {
        return store.state.user;
      },
    }
  },
  methods: {
    timeNow() {
      return Math.round(new Date().getTime()) / 1000
    },
    setTitle(title) {
      document.title = title;
    },
    addToTitle(title) {
      document.title = `${title} - ${document.title}`;
    },
    getStringSub(str, length) {
      if (str.length > length) {
        return `${str.substring(0, length)} ...`
      }
      return str
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
    },
    getMediaSourceTypeName(mediaSource) {
      switch (mediaSource.type) {
        case proto.MediaSource.Type.YOUTUBE: return "Youtube";
        case proto.MediaSource.Type.DOWNLOAD_URI: return "Download Uri";
        case proto.MediaSource.Type.SPOTIFY: return "Spotify";
        case proto.MediaSource.Type.M3U8: return "M3U8";
        default: return "Unknown";
      }
    },
    humanizeDuration(duration) {

      let dateObj = new Date(duration * 1000),
        hours = dateObj.getUTCHours(),
        minutes = dateObj.getUTCMinutes(),
        seconds = dateObj.getSeconds();

      return hours.toString().padStart(2, '0') + ':' + 
        minutes.toString().padStart(2, '0') + ':' + 
        seconds.toString().padStart(2, '0');
    },
    convertTimeHHMMSS(val) {
      let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);
      return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
    },
    getMediaSourceTypeIcon(mediaSource) {
      switch (mediaSource.type) {
        case proto.MediaSource.Type.YOUTUBE: return "icofont-youtube-play";
        case proto.MediaSource.Type.DOWNLOAD_URI: return "icofont-external-link";
        case proto.MediaSource.Type.M3U8: return "icofont-external-link";
        case proto.MediaSource.Type.SPOTIFY: return "icofont-spotify";
        default: return "Unknown";
      }
    },
  },
});

// Global event bus
const eventBus = new Vue()
Vue.prototype.$bus = eventBus;

new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { Master },
  template: '<Master />'
});

export const bus = eventBus;
