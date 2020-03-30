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
        border: none;
        float: left;
        margin: 5px;
    }

    .notification-title span {
        font-size: 14px;
        font-weight: 100;
    }

    .notification-title {
        line-height: 1.3;
        padding: 2px 5px;
        display: inline-block;
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
        font-size: 14px;
        border: none;
        font-weight: bold;
        text-align: center;
        margin-left: 6px;
        margin-top: 10px;
        padding: 0 4px;
        border-radius: 3px;
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