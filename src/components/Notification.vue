<template>

  <div>
    <FriendRequest :notification="notification" 
    v-if="notification.type === 1" />
    <TheaterInvite :notification="notification" 
    v-if="notification.type === 2" />
  </div>

</template>

<style>

.notification > div > div > .avatar {
  width: 30px;
  height: 30px;
  border: none;
  float: left;
  margin: 5px;
}

.notification-title span {
  font-size: 14px;
  font-weight: 100;
}

.notification-title {
  width: 219px;
  font-weight: 600;
  padding: 0 8px;
  text-align: left;
}

.nc-new-friend-name {
  font-weight: 100;
  font-size: 13px;
  text-align: left;
}

button.nc-button {
  float: right;
  background: #4CAF50;
  color: #ffffff;
  font-size: 14px !important;
  border: none;
  font-weight: bold;
  text-align: center;
  border-radius: 3px;
  width: 85px;
  padding: 6px 2px !important;
  height: 30px;
  margin-top: 6px !important;
}

button.nc-btn-accept-fr {
  background: #4CAF50;
  margin-right: 5px;
}

button.nc-btn-decline-fr {
  background: #4CAF50;
}

i.avatar {
  font-size: 30px;
  color: #306cff;
}

.nc-th {
  background: #181818;
  padding: 10px 5px;
  border-radius: 2px;
  display: block;
  height: 80px;
  margin: 5px 0 5px 42px;
}

.default-nc-poster {
  width: 55px;
}

.default-nc-poster > i.poster {
  font-size: 60px;
}

button.nc-btn-join-th {
  background: #306cff;
  margin: 0 5px 0 0;
}

.theater-image img {
  height: 62px;
  margin-left: 5px;
  border-radius: 4px;
}

.th-details {
  float: left;
  font-size: 14px;
}

.theater-image {
  float: left;
  margin-right: 10px;
}

.no-notifications {
  background: #202020;
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  margin-top: 5px;
  font-size: 14px;
  font-weight: 100;
}

.notification-details {
  display: flex;
}

</style>

<script>

import TheaterInvite from "./notifications/TheaterInvite";
import FriendRequest from "./notifications/FriendRequest";

export default {
  props: ['notification'],
  components: {
    FriendRequest,
    TheaterInvite,
  }
}

</script>
