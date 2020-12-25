<template>

  <div class="sidemenu">

    <div class="logo">
      <img src="../../assets/icons/brand.svg" alt="Brand" />
    </div>

    <div class="scrollable-menu">
      <ul class="menu" v-if="loggedIn">

        <li>
          <router-link :to="{ name: 'dashboard' }" v-title="'Friends'" title-placement="right" v-title.delay="'title'">
            <i class="icofont-users"></i>
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'settings' }" v-title="'Settings'" title-placement="right">
            <i class="icofont-ui-settings"></i>
          </router-link>
        </li>

        <li class="bottom-line-sidemenu"></li>

        <li>
          <router-link :to="{ path: `/${this.user.username}` }" v-title="'Your Theater'" title-placement="right">
            <i class="icofont-movie"></i>
          </router-link>
        </li>

        <TheaterRow :key="'th-' + theater.user.id" v-for="theater in theaters" :theater="theater" ref="theaters" />

      </ul>
    </div>

    <ul class="menu" v-if="!loggedIn">
      <li>
        <router-link :to="{ name: 'login' }" v-title="'Login'" title-placement="right">
          <i class="icofont-user"></i>
        </router-link>
      </li>
    </ul>

    <div class="footer" v-if="loggedIn">

      <NotificationCenter ref="notifs" :notifications="notifications" />

      <a class="user-avatar-button" @click.prevent.stop="actionsBtn($event)">
        <div class="online">
          <img :src="cdnUrl + '/avatars/' + user.avatar + '.png'"
             class="avatar"
             :alt="user.fullname" />
          <i class="sidemenu-state state-dot"></i>
        </div>
      </a>

    </div>

  </div>

</template>

<script>

import TheaterRow from './TheaterRow'
import {proto} from 'casty-proto/pbjs/ws.bundle'
import NotificationCenter from './NotificationCenter'

export default {
  components: {
    NotificationCenter,
    TheaterRow
  },
  data() {
    return {
      theaters: [],
      notifications: {
        data: [],
        unread_count: 0,
      },
    }
  },
  methods: {
    actionsBtn($event) {
      this.$parent.$refs.menu.open($event, 'usermenu-actions', {})
    },
    redirect(name) {
      this.$router.push({ name });
    },
    addTheater(theater) {
      if (theater.user.id === this.user.id){
        return
      }
      const existed = false;
      for (let i = 0; i < this.theaters.length; i++) {
        if (theater.id === this.theaters[i].id) {
          existed = truebreak
          break
        } else {
          continue
        }
      }
      if (!existed) {
        this.theaters.push(theater);
      }
    },
    removeTheater(theater) {
      if (theater.user.id === this.user.id){
        return
      }
      for (let i = 0; i < this.theaters.length; i++) {
        if (theater.id === this.theaters[i].id) {
          this.theaters.splice(i, 1)
          break
        }
      }
    },
    async getNotifications() {
      this.notifications = {
        data: [],
        unread_count: 0,
      };
      await this.$store.dispatch("getNotifications").then(response => {
        this.notifications.unread_count = response.data.result.unread_count;
        let notifications = response.data.result.notifications;
        notifications.forEach((notif, index) => {
          notifications[index].data = JSON.parse(notif.data);
        });
        this.notifications.data = notifications;
      }).catch(console.log);
    },
    readNotification(id) {
      this.notifications.data.forEach((notification, index) => {
        if (notification.id === id){
          this.notifications.data[index].read = true;
          this.notifications.unread_count --;
        }
      })
    },
  },
  async mounted() {
    if (this.loggedIn) {

      this.$bus.$on(proto.EMSG[proto.EMSG.NEW_NOTIFICATION], () => {
        this.getNotifications();
      });

      this.$store.dispatch("followedTheaters").then(response => {
        this.theaters = response.data.result;
      })

      this.$bus.$on('new-theater-unfollowed', this.removeTheater)
      this.$bus.$on('new-theater-followed', this.addTheater)

      this.$bus.$on("updated-user", user => {
        this.user = user;
      });

      this.$bus.$on('updated-avatar', avatar => {
        this.user.avatar = avatar;
      });

      this.$bus.$on('user-updated', user => {
        if (this.theaters.length !== 0) {
          const currentIndex = this.$refs.theaters.findIndex(th => th.$vnode.key === `th-${user.id}`);
          const component = this.$refs.theaters[currentIndex]
          component.updateUser(user)
        }
      })

      await this.getNotifications();
    }
  }
}

</script>

<style>

.bottom-line-sidemenu {
  border-bottom: 2px solid #252626;
  margin: 10px 0;
}

.theater-sidemenu > img {
  width: 40px;
  border-radius: 50%;
  border: 2px solid #202020;
  height: 40px;
}

li.custom-btn-menu > a {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #FFFFFF !important;
  background: #316bff !important;
  border: 0;
  cursor: pointer;
}

li.custom-btn-menu > a > i {
  font-size: 20px;
  margin: 0 auto;
}

.footer {
  width: 100%;
  background: #151515;
  position: absolute;
  left: 0;
  bottom: 0;
}

img.avatar {
  width: 40px;
  border: 0;
  margin: 10px auto;
}

ul.menu {
  margin: 0;
  padding: 0;
  list-style: none;
}

ul.menu > li:first-child {
  margin: 5px 0;
}

ul.menu > li {
  cursor: pointer;
}

ul.menu > li > a {
  font-size: 20px;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  padding: 10px;
  margin: 10px 3px;
  background: #343435;
  border-radius: 50%;
  opacity: 0.6;
  padding: 0;
  width: 39px;
  height: 39px;
  text-align: center;
  display: grid;
  align-content: center;
}

ul.menu > li:hover > a {
  opacity: 1;
}

/* ul.menu li > .router-link-exact-active.router-link-active:after {
content: ' ';
width: 0;
height: 0;
border-top: 5px solid transparent;
border-bottom: 5px solid transparent;
border-right: 7px solid #333333;
position: absolute;
right: 0;
margin-top: 16px;
} */

ul.menu > li > a.router-link-exact-active {
  color: #FFFFFF;
  background: #316cff;
  opacity: 1;
}

li.custom-btn-menu > a {
  background: #316cff;
}

.sidemenu {
  padding: 10px;
  background-size: contain;
  z-index: 1;
  width: 65px;
  transition: width .25s ease-in-out 0s;
  left: 0;
  position: fixed;
  background: #151515;
  text-align: center;
  -webkit-app-region: drag;
  top: 0;
  bottom: 0;
}

.user-avatar-button {
  cursor: pointer;
}

.user-avatar-button:hover > .user-menu-hover {
  display: block;
}

.user-menu-hover {
  display: none;
  position: absolute;
  left: 65px;
  bottom: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 150px;
}

.user-menu-hover > li {
  padding: 0;
  text-align: left;
  margin: 5px 0;
}

.user-menu-hover > li > a, .user-menu-hover > li > button {
  text-decoration: none;
  background: #181818;
  padding: 5px 10px;
  text-align: left;
  color: #eeeeee;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  border: none;
}

.user-menu-hover > li > a:hover, .user-menu-hover > li > button:hover {
  background: #333333;
}

img.theater-sidemenu-avatar {
  width: 20px;
  border-radius: 50%;
}

</style>
