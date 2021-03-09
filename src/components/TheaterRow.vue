<template>

  <li :data-id="theater.id"
    :class="stateClass"
    @contextmenu.prevent="$parent.$parent.$refs.menu.open($event, 'friend-menu', theater.user)">

    <router-link 
      class="theater"
      :to="{ name: 'theater', params: { user: theater.user.username }}">

      <div class="avatar">
        <img :src="cdnUrl + '/avatars/' + theater.user.avatar + '.png'"
           alt="Avatar" />
        <i class="state-dot"></i>
      </div>

      <div class="innerDetails">
        <div class="username">
          <strong>{{ theater.user.fullname }}</strong>
        </div>
        <div class="activity" v-if="hasActivity">
          {{ activity }}
        </div>
      </div>

    </router-link>

  </li>

</template>

<script>

import {proto} from 'casty-proto/pbjs/ws.bundle'

export default {
  name: "TheaterRow",
  props: ['theater'],
  data() {
    return {
      state: proto.PERSONAL_STATE.ONLINE,
      hasActivity: false,
      activity: '',
      badgeCount: 0,
      stateClass: 'offline',
    }
  },
  watch: {
    badgeCount() {
      if (this.badgeCount !== 0) {
        this.addToTitle(`(${this.badgeCount}) New message`);
        this.$bus.$emit("play-notif");
      }
    }
  },
  methods: {
    updateFriend(theater) {
      this.theater = theater
    },
    getStateName(state) {
      switch (state) {
        case proto.PERSONAL_STATE.ONLINE: return "online";
        case proto.PERSONAL_STATE.BUSY: return "busy";
        case proto.PERSONAL_STATE.IDLE: return "idle";
        default:
          return "offline"
      }
    },
    updateState(state) {
      this.state = state
      switch (state) {
        case proto.PERSONAL_STATE.ONLINE: 
          this.stateClass = "online";
          break
        case proto.PERSONAL_STATE.BUSY: 
          this.stateClass = "busy";
          break
        case proto.PERSONAL_STATE.IDLE:
          this.stateClass = "idle";
          break
        default:
          this.stateClass = "offline";
          break
      }
    },
    updateActivity(event) {
      if (!event.activity.hasOwnProperty('activity') && event.activity.activity === "") {
        this.hasActivity = false;
        this.activity = '';
      } else {
        this.hasActivity = true;
        this.activity = `Watching ${this.getStringSub(event.activity.activity, 18)}`
      }   
    },
    addBadgeCount() {
      this.badgeCount++
    },
    removeBadgeCount() {
      this.badgeCount = 0
    }
  },
}

</script>
