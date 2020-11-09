<template>

    <div class="friends_list" :class="state">

        <div class="friends-actions">
            <ul>
                <li :class="{ 'active': selected === 'friends' }">
                    <button @click="openTab('friends')">Friends</button>
                </li>
                <li :class="{ 'active': selected === 'search' }">
                    <button @click="openTab('search')">Add Friend</button>
                </li>
                <li :class="{ 'active': selected === 'pending' }">
                    <button @click="openTab('pending')">Pending</button>
                </li>
            </ul>
        </div>

        <div class="search_friends clearfix" v-show="selected === 'search'">
            <div class="search_container">
                <input type="text"
                    v-model="search_keyword"
                    title="search"
                    class="pull-left search_box"
                    placeholder="Search for a friend" />
            </div>
        </div>

        <ul class="mt-2 friends_list_ul pending-list" v-show="selected === 'pending'">

            <div class="v-loading">
                <EllipsisLoader :loading="!loadedPendingFriendRequests" class="v-loading" :color="'#316bff'" />
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

        <ul class="mt-2 friends_list_ul" v-show="selected === 'search'">

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

        <ul class="mt-2 friends_list_ul" v-show="selected === 'friends'">

            <div v-if="loading" class="content-loading">
                <VueContentLoading :width="230" :height="55" primary="#333" secondary="#181818" :key="i" v-for="i in 10">
                    <circle cx="20" cy="20" r="20"></circle>
                    <rect x="55" y="9" rx="9" ry="9" width="170" height="20"></rect>
                </VueContentLoading>
            </div>

            <div v-if="!loading" v-show="friends.length === 0">
                You have no friends here right now :(
            </div>

            <!-- Online Friends -->
            <FriendRow ref="friends" :key="friend.id" v-for="friend in orderedFriends" :friend="friend" />

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
        width: 255px;
        background: #181818;
        height: 100%;
        padding: 8px 10px;
        left: 65px;
    }

    .friends_list.close {
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
        margin: 10px 0 15px;
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

    import FriendRow from './FriendRow'
    import userSocket from '../../store/user.ws'
    import FriendsActions from './FriendsActions'
    import {proto} from 'casty-proto/pbjs/ws.bundle'
    import {EllipsisLoader} from 'vue-spinners-css'
    import VueLoadingButton from 'vue-loading-button'
    import {VueContentLoading} from 'vue-content-loading'
    
    export default {
        name: "FriendsList",
        components: {
            VueContentLoading,
            FriendsActions,
            EllipsisLoader,
            VueLoadingButton,
            FriendRow
        },
        data() {
            return {
                state: "open",
                friends: [],
                loadedPendingFriendRequests: false,
                pendingFriendRequests: [],
                search_result: [],
                search_keyword: null,
                loading: true,
                notifications: {
                    data: [],
                    unread_count: 0,
                },
                selected: 'friends',
            }
        },
        computed: {
            orderedFriends() {
                return this.friends.slice(0).sort(friend => {
                    if (friend.state === proto.PERSONAL_STATE.OFFLINE) {
                        return 1
                    }
                    return -1
                })
            }
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
                    this.$bus.$emit("new-friend", this.pendingFriendRequests[index].friend);
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
            setFriends(friends) {
                this.loading = false;
                if (friends !== null){
                    this.friends = [];
                    friends.forEach(friend => {
                        friend.state = proto.PERSONAL_STATE.OFFLINE
                        this.friends.push(friend)
                    })
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

                // update friend state in FriendRow component
                const currentIndex = this.$refs.friends.findIndex(friend => friend.$vnode.key === event.user.id);
                const component = this.$refs.friends[currentIndex]
                component.updateState(event.state)
            },
            updateFriendActivity(event) {
                // update friend activity in FriendRow component
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
                
                // update friend in FriendRow component
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

            this.$bus.$on('updated_friends_list_state', newState => {
                this.state = newState;
            });

            userSocket.connect();

            this.$bus.$on(proto.EMSG[proto.EMSG.USER_UPDATED], data => {
                let decoded = proto.User.decode(data);
                this.updateFriend(decoded);
                this.$bus.$emit("user-updated", decoded);
            });

            this.$bus.$on(proto.EMSG[proto.EMSG.FRIEND_REQUEST_ACCEPTED], data => {
                let decoded = proto.FriendRequestAcceptedMsgEvent.decode(data);
                decoded.friend.activity = undefined;
                this.$bus.$emit("new-friend", decoded.friend);
            });

            this.$bus.$on("new-friend", friend => {
                this.$parent.friends.push(friend);
            });

            await this.$store.dispatch("getFriendsList").then(friends => {
                this.setFriends(friends);
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
                let friend = JSON.parse(decoded.from);

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