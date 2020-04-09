<template>

    <div class="friends_list" :class="status">

        <div class="title-border-bottom pb-2">
            <strong class="side-component-title">
                <div class="friends_title">

                    <i class="icofont-users-social mr-2"></i>
                    <span>Friends</span>

                    <NotificationCenter :notifications="notifications" />

                    <button type="button" class="friends-menu-btn pull-right" @click="toggleSearchBox">
                        <i class="icofont-search-1 search_icon"></i>
                    </button>

                </div>
            </strong>
        </div>

        <div class="search_friends clearfix" style="display: none">
            <div class="search_container">
                <input type="text"
                       v-model="search_keyword"
                       title="search"
                       class="pull-left search_box"
                       placeholder="Type the username of a friend" />
            </div>
        </div>

        <ul class="mt-2 search_result" style="display: none">

            <li class="offline" :key="user.id" v-for="user in search_result">
                <a class="friend">
                    <div class="avatar">
                        <img :src="apiBaseUrl + '/uploads/avatars/' + user.avatar + '.png'"
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

        <div v-if="loading" class="content-loading">
            <VueContentLoading :width="230" :height="55" primary="#333" secondary="#181818" :key="i" v-for="i in 10">
                <circle cx="20" cy="20" r="20"></circle>
                <rect x="55" y="9" rx="9" ry="9" width="170" height="20"></rect>
            </VueContentLoading>
        </div>

        <ul class="mt-2 friends_list_ul">

            <li v-if="!loading" v-show="friends.length === 0">
                You have no friends here right now :(
            </li>

            <li :data-id="friend.id" 
            :key="friend.id"
            :class="getStateName(friend.state)" v-for="friend in friends"
            @contextmenu.prevent="$parent.$refs.menu.open($event, 'friend-menu', friend)">

                <router-link class="friend"
                             :to="{ name: 'messages', params: { friend_id: friend.username, friend }}">

                    <div class="avatar">
                        <img :src="apiBaseUrl + '/uploads/avatars/' + friend.avatar + '.png'"
                             alt="Avatar" />
                        <i class="state-dot"></i>
                    </div>

                    <div class="innerDetails">
                        <div class="username">
                            <strong>{{ friend.fullname }}</strong>
                        </div>
                        <div class="activity" v-if="friend.activity !== undefined && friend.state === 1">
                            Watching
                            <strong>{{ friend.activity.activity.substring(0,23) + "..." }}</strong>
                        </div>
                    </div>

                    <span :data-friend-badge-id="friend.id"
                          class="unread-badge-friendlist d-none">0</span>

                </router-link>

            </li>

        </ul>

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

    .friends_list_ul > li > .friend {
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

    .friends_list > ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .friends_list > ul > li {
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .friends_list > ul > li > .friend > .avatar {
        width: 35px;
        border-radius: 50%;
        float: left;
        position: relative;
        margin: 5px 10px 5px 5px;
    }

    .friends_list > ul > li.offline > .friend {
        opacity: 0.5;
    }

    .friends_list > ul > li > .friend > .avatar > img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
    }

    .friends_list > ul > li:hover {
        opacity: 1;
    }

    .friends_list > ul > li:hover > .friend,
    .friends_list > ul > li > .friend.router-link-active {
        background: #333333 !important;
        opacity: 1 !important;
    }

    .friends_list > ul > li > .friend {
        color: #fff;
        display: flex;
        border-radius: 5px;
        text-decoration: none;
        align-items: center;
    }

    .friends_list {
        position: fixed;
        top: 0;
        right: 0;
        width: 250px;
        background: #181818;
        height: 100%;
        padding: 13px;
    }

    .friends_list.close {
        display: none;
    }

    button.friends-menu-btn {
        color: #969696;
        border-radius: 50%;
        background: #313131;
        border: none;
        width: 32px;
        height: 30px;
        font-size: 15px;
        margin-left: 10px;
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

</style>

<script>

    import $ from "jquery";
    import {bus} from "../../main";
    import {websocket} from "../../store/ws";
    import {proto} from 'casty-proto/pbjs/proto';
    import {VueContentLoading} from 'vue-content-loading';
    import NotificationCenter from "./NotificationCenter";

    export default {
        props: ['status'],
        components: {
            VueContentLoading,
            NotificationCenter,
        },
        data() {
            return {
                friends: [],
                search_result: [],
                search_keyword: null,
                loading: true,
                notifications: {
                    data: [],
                    unread_count: 0,
                },
            }
        },
        methods: {
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
            getStateName(state) {
                switch (state) {
                    case 1: return "online";
                    case 2: return "busy";
                    case 3: return "idle";
                    default:
                        return "offline"
                }
            },
            setFriends(friends) {
                this.loading = false;
                if (friends !== null){
                    this.friends = friends;
                    this.$parent.setFriends(friends);
                }
            },
            clearFriendsList() {
                this.friends = [];
            },
            toggleSearchBox() {
                let searchFriendsBox = $(".search_friends");
                let friendsList = $(".friends_list_ul");
                let searchIcon = $("i.search_icon");
                let searchResultBox = $(".search_result");
                let searchInput = $(".search_box").get(0);

                if (searchFriendsBox.hasClass("opened")) {
                    searchIcon.removeClass("icofont-close");
                    searchIcon.addClass("icofont-search-1");
                    searchFriendsBox.removeClass("opened");
                    friendsList.show();
                    searchResultBox.hide();
                } else {
                    searchFriendsBox.addClass("opened");
                    friendsList.hide();
                    searchIcon.removeClass("icofont-search-1");
                    searchIcon.addClass("icofont-close");
                    searchInput.focus();
                    searchResultBox.show();
                }
            },
            removeAllClassesEx(element, class_name) {
                let classes = ["online", "offline", "idle", "busy"];
                classes.forEach(classN => {
                    if (classN !== class_name){
                        element.removeClass(classN);
                    }
                });
            },
            changeUserState(user, state) {
                let friendElement = this.findFriendById(user.id);
                let stateClass = this.getStateName(state);
                this.removeAllClassesEx(friendElement, stateClass);
                friendElement.addClass(stateClass);
            },
            findFriendById(id) {
                return $(`[data-id="${id}"]`);
            },
            findFriendBadgeById(id) {
                return $(`[data-friend-badge-id="${id}"]`);
            },
            startConversation(user) {
                this.$router.push({
                    path: `/messages/${user.id}`
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
            }
        },
        watch: {
            search_keyword(value) {
                this.search_result = [];
                if (value.length > 3){
                    this.$store.dispatch("searchUser", value).then(response => {
                        if (response.status === 200){
                            this.search_result = response.data.result;
                        }
                    });
                }
            }
        },
        mounted() {
            websocket.user.connect();

            bus.$on(proto.EMSG[proto.EMSG.FRIEND_REQUEST_ACCEPTED], data => {
                let decoded = proto.FriendRequestAcceptedMsgEvent.decode(data);
                decoded.friend.activity = undefined;
                bus.$emit("new-friend", decoded.friend);
            });

            bus.$on("new-friend", friend => {
                this.friends.push(friend);
            });

            this.$store.dispatch("getFriendsList").then(response => {
                this.clearFriendsList();
                this.setFriends(response.data.result);
            });

            bus.$on("open-message-page", friend => {
                let friendElement = this.findFriendBadgeById(friend.id);
                let currentCount = parseInt(friendElement.text());
                if (currentCount !== 0) {
                    friendElement.addClass("d-none");
                    friendElement.text(0);
                }
            });

            bus.$on(proto.EMSG[proto.EMSG.CHAT_MESSAGES], data => {

                let decoded = proto.ChatMsgEvent.decode(data);
                bus.$emit(proto.EMSG[proto.EMSG.NEW_CHAT_MESSAGE], decoded);
                let friend = JSON.parse(decoded.from);

                if (this.$route.name !== "messages") {
                    if (this.$route.params.friend_id !== friend.username) {
                        let friendElement = this.findFriendBadgeById(friend.id);
                        let currentCount = parseInt(friendElement.text());
                        friendElement.removeClass("d-none");
                        friendElement.text(currentCount + 1);
                    }
                }

            });

            bus.$on(proto.EMSG[proto.EMSG.NEW_NOTIFICATION], () => {
                this.getNotifications();
            });

            bus.$on(proto.EMSG[proto.EMSG.PERSONAL_STATE_CHANGED], data => {
                let decoded = proto.PersonalStateMsgEvent.decode(data);
                bus.$emit('friend-state-changed', decoded);
                this.changeUserState(decoded.user, decoded.state);
            });

            this.getNotifications();
        },
        destroyed() {
            websocket.user.disconnect();
        }
    }

</script>