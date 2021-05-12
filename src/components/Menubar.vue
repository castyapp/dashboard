<template>
  
  <div class="menubar">

    <div class="logo">
      <img src="@/assets/icons/brand.svg" alt="Brand" />
      <strong class="brand-text">Casty</strong>
    </div>

    <div class="menuuser">
      
      <NotificationCenter ref="notifs" :notifications="notifications" class="notifications-button" />

      <a class="user-avatar-button" @click.prevent.stop="actionsBtn($event)">
        <strong>
          {{ user.fullname }}
        </strong>
        <img :src="cdnUrl + '/avatars/' + user.avatar + '.png'" :alt="user.fullname" />
      </a>

    </div>

  </div>

</template>

<style scoped>

  .notifications-button {
    float: left;
    display: flex;
    margin: 0 10px 0 0;
  }

  .menuuser > a.user-avatar-button {
    background: #3f51b5;
    display: flex;
    float: right;
    border-radius: 10px;
  }

  .menuuser > a.user-avatar-button > strong {
    margin: 3px 10px;
    color: #FFFFFF;
  }

  .menuuser > a.user-avatar-button > img {
    float: right;
    width: 30px;
    height: 30px;
    border-radius: 30%;
  }

  .logo {
    float: left;
    font-size: 20px;
    display: flex;
  }

  .logo > img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
  }

  .brand-text {
    margin-left: 7px;
    margin-top: 1px;
  }

  .menuuser {
    float: right;
  }

  .menubar {
    padding: 8px 10px;
    background: #0b0e11;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9;
  }

</style>

<script>
  
  import NotificationCenter from './NotificationCenter'
  import { proto } from 'libcasty-protocol-js/commonjs'
  
  export default {
    name: 'Menubar',
    components: {
      NotificationCenter,
    },
    data() {
      return {
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

        this.$bus.$on("updated-user", user => {
          this.user = user;
        });

        this.$bus.$on('updated-avatar', avatar => {
          this.user.avatar = avatar;
        });

        await this.getNotifications();
      }
    }
  }

</script>

