<template>

  <div class="theaters_list" :class="state">

    <div class="friends-actions chat-title-border-bottom">
      <ul>
        <li :class="{ 'active': selected === 'theaters' }">
          <button @click="openTab('theaters')">
            <i class="icofont-ui-movie"></i>
            Theaters
          </button>
        </li>
        <li :class="{ 'active': selected === 'search' }">
          <button @click="openTab('search')">
            <i class="icofont-search-1"></i>
            Search
          </button>
        </li>
        <!--<li :class="{ 'active': selected === 'pending' }">-->
          <!--<button @click="openTab('pending')">Pending</button>-->
        <!--</li>-->
      </ul>
    </div>

    <div class="pl-2 pr-2">

      <div class="search_friends clearfix" v-show="selected === 'search'">
        <div class="search_container">
          <input type="text"
                 v-model="search_keyword"
                 title="search"
                 class="pull-left search_box"
                 placeholder="Search for a theater" />
        </div>
      </div>

      <ul class="mt-2 theaters_list_ul pending-list" v-show="selected === 'pending'">

        <div class="v-loading">
          <Spinner :loading="!loadedPendingFriendRequests" class="v-loading" :color="'#316bff'" />
        </div>

        <li v-if="loadedPendingFriendRequests" v-show="pendingFriendRequests.length === 0">
          You have no pending requests here!
        </li>

        <li class="offline" :key="request.friend.id" v-for="(request, index) in pendingFriendRequests">
          <a class="friend">
            <div class="avatar">
              <img :src="cdnUrl + '/avatars/' + request.friend.avatar + '.png'"
                 alt="Avatar" />
            </div>
            <div class="innerDetails">
              <div class="username pull-left">
                <strong>{{ request.friend.fullname }}</strong>
              </div>
              <VueLoadingButton class="friend_request_accept_btn pull-right"
                                @click.native="acceptFriendRequest($event, request, index)">
              Accept
              </VueLoadingButton>
            </div>
          </a>
        </li>

      </ul>

      <ul class="mt-2 theaters_list_ul" v-show="selected === 'search'">

        <li class="offline" :key="user.id" v-for="user in search_result">
          <a class="friend">
            <div class="avatar">
              <img :src="cdnUrl + '/avatars/' + user.avatar + '.png'"
                 alt="Avatar" />
            </div>
            <div class="innerDetails">
              <div class="username pull-left">
                <strong>{{ user.fullname }}</strong>
              </div>
              <button class="friend_request_btn pull-right" @click="sendFriendRequest(user)">
                <i class="icofont-plus"></i>
              </button>
            </div>
          </a>
        </li>

      </ul>

      <ul class="theaters_list_ul" v-show="selected === 'theaters'">

        <div v-if="loading" class="content-loading">
          <VueContentLoading :width="230" :height="55" primary="#333" secondary="#181818" :key="i" v-for="i in 10">
          <circle cx="20" cy="20" r="20"></circle>
          <rect x="55" y="9" rx="9" ry="9" width="170" height="20"></rect>
          </VueContentLoading>
        </div>

        <div class="text-center mt-3" v-if="!loading" v-show="theaters.length === 0">
          No theater followed yet!
        </div>

        <TheaterRow 
          ref="theaters" 
          :key="theater.id" 
          v-for="theater in theaters" 
          :theater="theater" />

      </ul>

    </div>

  </div>

</template>

<style>

.friend-context-menu {
  background: #FAFAFA;
  border: 1px solid #BDBDBD;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 250px;
  z-index: 999999;
}

.friend-context-menu li {
  border-bottom: 1px solid #E0E0E0;
  margin: 0;
  padding: 5px 35px;
}

.friend-context-menu li:last-child {
  border-bottom: none;
}

.friend-context-menu li:hover {
  background: #1E88E5;
  color: #FAFAFA;
}

.theaters_list_ul {
  padding: 0;
}

.theaters_list_ul > li > .theater {
  cursor: pointer;
}

.search_friends.opened {
  display: block !important;
}

.search_friends > form {
  margin: 0;
  padding: 0;
}

.innerDetails {
  width: 100%;
}

button.friend_request_btn {
  padding: 2px 7px;
  border: 0;
  display: flex;
  border-radius: 4px;
  color: #ffffff;
  background: transparent;
}

.friend_request_accept_btn {
  border: 0;
  display: flex;
  border-radius: 4px;
  color: #ffffff;
  background: #28a745;
  margin: 9px !important;
  font-size: 14px !important;
  padding: 1px 7px !important;
}

.search_friends > .search_container > input {
  background: #202020;
  border: 0;
  border-radius: 4px;
  color: #eeeeee;
  outline: none;
  padding: 5px;
  width: 100%;
}

.username, .activity {
  display: flex;
}

.activity {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 11px;
  line-height: 13px;
  font-weight: 400;
}

.activity > strong {
  margin-left: 5px;
  font-weight: bolder;
}

.username > strong {
  font-size: 14px;
  min-width: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.theaters_list > ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.theaters_list > ul > li {
  margin-bottom: 5px;
  border-radius: 5px;
}

ul.theaters_list_ul > li > .theater > .avatar {
  width: 35px;
  border-radius: 50%;
  float: left;
  position: relative;
  margin: 5px 10px 5px 5px;
}

ul.theaters_list_ul > li.offline > .theater {
  opacity: 0.5;
}

ul.theaters_list_ul > li > .theater > .avatar > img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

ul.theaters_list_ul > li:hover {
  opacity: 1;
}

ul.theaters_list_ul > li:hover > .theater,
ul.theaters_list_ul > li > .theater.router-link-active {
  background: #333333 !important;
  opacity: 1 !important;
}

ul.theaters_list_ul > li > .theater {
  color: #fff;
  display: flex;
  border-radius: 5px;
  text-decoration: none;
  align-items: center;
}

.theaters_list {
  position: fixed;
  top: 0;
  width: 255px;
  background: #181818;
  height: 100%;
  left: 65px;
}

.theaters_list.close {
  display: none;
}

span.unread_count_notifications {
  background: red;
  border-radius: 50%;
  font-size: 11px;
  width: 17px;
  height: 17px;
  text-align: center;
  padding: 2px;
  font-weight: bold;
  position: absolute;
  color: #ffffff;
  margin-top: 9px;
  margin-left: -7px;
}

.friends-actions {
  padding: 17px 0 !important;
  margin: 0 10px;
  display: flex;
}

.friends-actions > ul {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

.friends-actions > ul > li {
  float: left;
}

.friends-actions > ul > li > button {
  color: #ffffff;
  padding: 2px 8px;
  margin: 0 3px;
  border-radius: 4px;
  font-size: 14px;
  border: none;
  background: transparent;
}

.friends-actions > ul > li > button:hover,
.friends-actions > ul > li.active > button {
  text-decoration: none;
  background: #316cff;
  color: #ffffff;
}

.pending-list > li > a > .innerDetails > .username {
  margin: 10px 0;
}

</style>

<script>

import TheaterRow from '@/components/TheaterRow'
import userSocket from '@/store/user.ws'
import {proto} from 'casty-proto/pbjs/ws.bundle'
import VueLoadingButton from 'vue-loading-button'
import {VueContentLoading} from 'vue-content-loading'
import Spinner from '@/components/Spinner'

export default {
  name: "TheatersList",
  components: {
    VueContentLoading,
    Spinner,
    VueLoadingButton,
    TheaterRow
  },
  data() {
    return {
      state: "open",
      theaters: [],
      loadedPendingFriendRequests: false,
      pendingFriendRequests: [],
      search_result: [],
      search_keyword: null,
      loading: true,
      notifications: {
        data: [],
        unread_count: 0,
      },
      selected: 'theaters',
    }
  },
  computed: {
    /*orderedFriends() { return this.friends.slice(0).sort(friend => {*/
        /*if (friend.state === proto.PERSONAL_STATE.OFFLINE) {*/
          /*return 1*/
        /*}*/
        /*return -1*/
      /*})*/
    /*}*/
  },
  methods: {
    openTab(tabName) {
      if (tabName === 'pending') {
        if (!this.loadedPendingFriendRequests) {
          this.$store.dispatch('getPendingFriendRequestsList').then(requests => {
            this.pendingFriendRequests = requests
            this.loadedPendingFriendRequests = true
          });
        }
      }
      this.selected = tabName
    },
    acceptFriendRequest(event, request, index) {
      this.loading = true;
      this.$store.dispatch("acceptFriendRequest", request.request_id).then(() => {
        this.pendingFriendRequests.splice(index, 1)
        this.$notify({
          group: 'dashboard',
          type: 'success',
          text: "Friend request accepted successfully!",
          title: "Success",
          duration: 2000,
        });
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.$notify({
          group: 'dashboard',
          type: 'error',
          text: "Something went wrong, please try again later!",
          title: "Failed",
          duration: 2000,
        });
        this.loading = false;
      });
    },
    sendFriendRequest(user) {
      this.$store.dispatch("sendFriendRequest", user.id).then(() => {

        this.$notify({
          group: 'dashboard',
          type: 'success',
          text: "FriendRequest sent successfully!",
          title: "Success",
          duration: 2000,
        });

        this.search_keyword = "";
        this.toggleSearchBox();

      }).catch(err => {

        if (err.response.status === 409){
          this.$notify({
            group: 'dashboard',
            type: 'error',
            text: "Friend request sent already!",
            title: "Failed",
            duration: 4000,
          });
        } else {
          this.$notify({
            group: 'dashboard',
            type: 'error',
            text: "Failed to send request, Please tray again later!",
            title: "Failed",
            duration: 2000,
          });
        }

        this.search_keyword = "";
        this.toggleSearchBox();

      });
    },
    setTheaters(theaters) {
      this.loading = false;
      if (theaters !== null){
        this.theaters = theaters;
      }
    },
    startConversation(user) {
      this.$router.push({ path: `/messages/${user.id}` })
    },
    readNotification(id) {
      this.notifications.data.forEach((notification, index) => {
        if (notification.id === id){
          this.notifications.data[index].read = true;
          this.notifications.unread_count --;
        }
      })
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
    updateFriendState(event) {
      // update friend state in list
      const friendIndex = this.friends.findIndex(friend => friend.id === event.user.id);
      this.friends[friendIndex].state = event.state

      // update friend state in TheaterRow component
      const currentIndex = this.$refs.friends.findIndex(friend => friend.$vnode.key === event.user.id);
      const component = this.$refs.friends[currentIndex]
      component.updateState(event.state)
    },
    updateFriendActivity(event) {
      // update friend activity in TheaterRow component
      const currentIndex = this.$refs.friends.findIndex(friend => friend.$vnode.key === event.user.id);
      const component = this.$refs.friends[currentIndex]
      component.updateActivity(event) 
    },
    updateFriend(user) {
      // update friend
      const friendIndex = this.friends.findIndex(friend => friend.id === user.id);
      const oldFriend = this.friends[friendIndex]
      user.state = oldFriend.state
      this.friends[friendIndex] = user

      console.log("UserUpdated: ", user);

      // update friend in TheaterRow component
      const currentIndex = this.$refs.friends.findIndex(friend => friend.$vnode.key === user.id);
      const component = this.$refs.friends[currentIndex]
      component.updateFriend(user) 
    }
  },
  watch: {
    search_keyword(value) {
      this.search_result = [];
      if (value.length > 3){
        this.$store.dispatch("searchUser", value).then(users => {
          this.search_result = users;
        });
      }
    }
  },
  async mounted() {

    //this.$bus.$on('updated_friends_list_state', newState => {
    //  this.state = newState;
    //});

    userSocket.connect();

    this.$bus.$on(proto.EMSG[proto.EMSG.USER_UPDATED], data => {
      let decoded = proto.User.decode(data);
      this.updateFriend(decoded);
      this.$bus.$emit("user-updated", decoded);
    });

    this.$bus.$on(proto.EMSG[proto.EMSG.NEW_FRIEND], data => {
      let friend = proto.User.decode(data);
      this.friends.push(friend);
    });

    await this.$store.dispatch("followedTheaters").then(response => {
      this.setTheaters(response.data.result)
    });

    this.$bus.$on("open-message-page", friend => {
      const currentIndex = this.$refs.friends.findIndex(f => f.$vnode.key === friend.id);
      const component = this.$refs.friends[currentIndex]
      if (component.badgeCount !== 0) {
        component.removeBadgeCount()
      }
    });

    this.$bus.$on(proto.EMSG[proto.EMSG.CHAT_MESSAGES], data => {

      let decoded = proto.ChatMsgEvent.decode(data);
      this.$bus.$emit(proto.EMSG[proto.EMSG.NEW_CHAT_MESSAGE], decoded);
      let friend = decoded.reciever;

      if (this.$route.path !== `/messages/${friend.username}`) {
        if (this.$route.params.friend_id !== friend.username && friend.username !== this.user.username) {
          const currentIndex = this.$refs.friends.findIndex(f => f.$vnode.key === friend.id);
          const component = this.$refs.friends[currentIndex]
          component.addBadgeCount()
        }
      }

    });

    this.$bus.$on('remove-friend-badge', friend_id => {
      const currentIndex = this.$refs.friends.findIndex(f => f.$vnode.key === friend_id);
      const component = this.$refs.friends[currentIndex]
      component.removeBadgeCount()
    });

    this.$bus.$on(proto.EMSG[proto.EMSG.NEW_NOTIFICATION], () => {
      this.getNotifications();
    });

    this.$bus.$on(proto.EMSG[proto.EMSG.PERSONAL_ACTIVITY_CHANGED], data => {
      if (data !== null){
        let decoded = proto.PersonalActivityMsgEvent.decode(data);
        this.updateFriendActivity(decoded)
      }
    });

    this.$bus.$on(proto.EMSG[proto.EMSG.PERSONAL_STATE_CHANGED], data => {
      if (data !== null){
        let decoded = proto.PersonalStateMsgEvent.decode(data);
        this.$bus.$emit('friend-state-changed', decoded);
        this.updateFriendState(decoded);
      }
    });

    await this.getNotifications();
  },
  destroyed() {
    userSocket.disconnect();
  }
}

</script>
