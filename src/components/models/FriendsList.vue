<template>

    <div class="friends_list p-3" :class="status">

        <div class="title-border-bottom pb-2">
            <strong class="side-component-title">
                <div class="friends_title">
                    <i class="icofont-users-social text-primary mr-2"></i>
                    Friends
                    <i class="search_icon icofont-search-1 mr-2 pull-right"
                       @click="openSearchBox"></i>
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

            <li class="offline" v-for="user in search_result">
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

        <ul class="mt-2 friends_list_ul">

            <li v-show="friends.length === 0">
                You have no friends here right now :(
            </li>

            <li :class="getStateName(friend.state)" v-for="friend in friends"
                @contextmenu.prevent="$parent.$refs.menu.open($event, 'friend-menu', friend)">

                <router-link class="friend"
                             :to="{ name: 'messages', params: { friend_id: friend.username, friend }}">

                    <div class="avatar">
                        <img :src="apiBaseUrl + '/uploads/avatars/' + friend.avatar + '.png'"
                             alt="Avatar" />
                        <i class="state-dot" v-if="friend.state !== undefined && friend.state !== 0"></i>
                    </div>

                    <div class="innerDetails">
                        <div class="username">
                            <strong>{{ friend.fullname }}</strong>
                        </div>
                        <!--<div class="activity" v-show="friend.activity !== 0">-->
                            <!--Watching-->
                            <!--<strong>See [S#1] [E#1]</strong>-->
                        <!--</div>-->
                    </div>

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

</style>

<script>

    import $ from "jquery";
    import {bus} from "../../main";
    import {Reader} from "protobufjs";
    import {websocket} from "../../store/ws";
    import {protobuf, enums} from "../../protocol/protobuf/base";
    import {Packet} from "../../protocol/protobuf/packet";

    export default {
        props: ['status'],
        components: {
        },
        data() {
            return {
                ws: null,
                friends: [],
                search_result: [],
                search_keyword: null,
            }
        },
        methods: {
            friendHandler(e, user) {
                console.log(user);
                e.preventDefault();
            },
            sendFriendRequest(user) {
                this.$store.dispatch("sendFriendRequest", user.id).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            },
            getStateName(state) {
                if (state === 1){
                    return "online"
                }
                if (state === 2){
                    return "busy"
                }
                if (state === 3){
                    return "idle"
                }
                return "offline"
            },
            setFriends(friends) {
                if (friends !== null){
                    this.friends = friends;
                    this.friends.sort(this.sortFriends);
                }
            },
            sortFriends(a, b){
                let stateA = a.state,
                    stateB = b.state;
                if(!stateA && stateB) return 1;
                if(stateA && !stateB) return -1;
                return 0;
            },
            clearFriendsList() {
                this.friends = [];
            },
            openSearchBox() {
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
            changeUserState(user_id, state) {
                for (let i = 0; i <= this.friends.length - 1; i++) {
                    if (this.friends[i].id === user_id){
                        this.friends[i].state = state;
                    }
                }
            },
            startConversation(user) {
                this.$router.push({
                    path: `/messages/${user.id}`
                })
            },
        },
        watch: {
            search_keyword(value) {
                this.search_result = [];
                if (value.length > 3){
                    this.$store.dispatch("searchUser", value).then(response => {
                        this.search_result = response.data.result;
                    });
                }
            }
        },
        mounted() {

            websocket.user.connect();

            bus.$on("got-friends", friends => {
                this.clearFriendsList();
                this.setFriends(friends);
            });

            bus.$on(enums.EMSG[enums.EMSG.PERSONAL_STATE_CHANGED], data => {
                let decoded = protobuf.PersonalStateMsgEvent.decode(data);
                this.changeUserState(decoded.userId, decoded.state);
            });

        },
        destroyed() {
            websocket.user.disconnect();
        }
    }

</script>

<style>

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
        width: 100%;
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
        padding: 10px;
    }

    .friends_list.close {
        display: none;
    }

</style>