<template>

    <div class="messages-section p-2" v-if="friend !== null">

        <div class="title-border-bottom pb-2 offline">
            <strong>
                <i class="icofont-user"></i>
                {{ friend.fullname }}
                <i class="state-dot-circle"></i>
            </strong>
        </div>

        <div class="clearfix"></div>

        <div class="col-msg-container">
            <div class="messages pl-2 pr-2">

                <div class="v-loading">
                    <EllipsisLoader :loading="loading" class="v-loading" :color="'#316bff'" />
                </div>

                <div id="scrollArea" class="chats" v-chat-scroll>

                    <div class="message" :data-id="index" 
                         :key="message.id"
                         :class="{ 'sm-user': isLastOneThisUser(index) }"
                         v-for="(message, index) in messages">

                        <div class="small-avatar">
                            <img :src="apiBaseUrl + '/uploads/avatars/' + message.sender.avatar + '.png'"
                                 alt="Avatar">
                        </div>

                        <div class="message-content-container">
                            <div class="message-user-name">
                                <div>
                                    <span>{{ message.sender.fullname }}</span>
                                    <div class="details pull-right" v-if="!isLastOneThisUser(index)">
                                        <small class="ml-2">
                                            {{ message.created_at.seconds | moment('timezone', 'Asia/Tehran', 'dddd, MMM Do, h:mm a') }}
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div class="message-content">
                                <small class="ml-2 pull-right" v-if="message.edited">(edited)</small>
                                <div v-if="theater_id = hasMetaData(message)">
                                    <TheaterMessage :theater_id="theater_id" />
                                </div>
                                <div v-else>
                                    {{ message.content }}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="clearfix"></div>

                <div class="chat-input-message">
                    <input class="send-input-messager"
                           placeholder="Send a message"
                           @keyup.enter.exact="sendMessage" />
                </div>

            </div>
        </div>

    </div>

</template>

<style scoped>

    .send-input-messager {
        width: 100%;
        margin: 10px 0;
        padding: 5px 10px !important;
        background: #181818;
        border: 0;
        border-radius: 5px;
        outline: none;
        color: #FFFFFF;
        resize: none;
        white-space: nowrap;
        overflow-x: scroll;
    }

    .col-msg-container {
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        height: 100%;
        width: 100%;
        position: fixed;
        padding-right: 330px !important;
    }

    .messages {
        height: 100%;
        width: 100%;
        padding-bottom: 145px !important;
        padding-right: 20px !important;
    }

    .message {
        line-height: 0.9;
        margin-top: 10px;
        padding: 5px 5px 0 5px;
    }

    .message.sm-user.message {
        padding: 0 5px !important;
    }

    .message:first-child {
        margin-top: 0 !important;
    }

    .message.sm-user {
        margin-top: 0 !important;
        padding: 0 !important;
    }

    .message.sm-user {
        border-top: none !important;
    }

    .message:first-child {
        border-top: none !important;
        padding-top: 0 !important;
    }

    .message {
        border-top: 1px solid #333 !important;
        padding-top: 15px !important;
    }

    .message-user-name {
        margin-bottom: 10px;
        margin-top: 10px;
        color: #b3b3b3;
        /*border-bottom: 1px solid #333334;*/
        /*padding-bottom: 10px;*/
    }

    .message.sm-user > .small-avatar,
    .message.sm-user > .message-content-container > .message-user-name {
        display: none;
    }

    .message:last-child {
        margin-bottom: 0 !important;
    }

    .message > .message-content-container > .details,
    .message-content > small {
        color: #b3b3b3;
    }

    .chats {
        height: 100%;
        overflow: auto;
        padding: 10px;
    }

    .messages-container {
        -webkit-box-flex: 1;
        flex-grow: 1;
        height: 100%;
        overflow-anchor: none;
    }

    .message-content-container {
        margin-left: 40px;
    }

    .message-content {
        font-size: 15px;
        display: inline;
        white-space: -moz-pre-wrap; /* Firefox */
        white-space: -pre-wrap;     /* Opera <7 */
        white-space: -o-pre-wrap;   /* Opera 7 */
        word-wrap: break-word;      /* IE */
        line-height: 1.6;
    }

    .title-border-bottom {
        display: inline-block;
        width: 100%;
    }

    strong.user-name-title {
        margin: 7px;
        line-height: 2;
    }

</style>

<style>

    .chat-input-message {
        background: #202020;
        padding: 0 10px;
    }

    .small-avatar {
        width: 30px;
        float: left;
    }

    .small-avatar > img {
        width: 100%;
        border-radius: 50%;
    }

</style>

<script>

    import $ from "jquery";
    import {bus} from "../../../main";
    import moment from 'moment-timezone';
    import {websocket} from "../../../store/ws";
    import {EllipsisLoader} from 'vue-spinners-css';
    import {enums} from "../../../protocol/protobuf/base";
    import TheaterMessage from "../../models/TheaterMessage";

    export default {
        name: 'Message',
        data() {
            return {
                scrolled: false,
                friend: null,
                messages: [],
                loading: true,
            }
        },
        components: {
            TheaterMessage,
            EllipsisLoader,
        },
        methods: {
            hasMetaData(message) {
                let matches = /<(.*?)>/s.exec(message.data);
                if (matches !== null){
                    if (typeof matches[1] !== "undefined"){
                        let match = matches[1].split(":");
                        if (match[0] === "theater"){
                            return match[1];
                        }
                    }
                }
                return false;
            },
            sendMessage() {
                let messageInput = $(".send-input-messager");
                let content = messageInput.val();
                messageInput.val("");
                websocket.user.sendMessage(content, this.friend.username);
                let message = {
                    content,
                    sender: this.user,
                    reciever: this.friend,
                    created_at: {
                        seconds: Math.floor(Date.now() /1000),
                    },
                };
                if (this.messages == null){
                    this.messages = [];
                }
                this.messages.push(message);
            },
            isLastMessageFromThisUser(index) {
                if (index !== 0){
                    let lastIndex = index - 1;
                    return this.messages[lastIndex].sender.id === this.messages[index].sender.id
                }
                return false
            },
            isLastOneThisUser(index) {
                if (this.isLastMessageFromThisUser(index)){
                    return this.isAlmostTheSameTime(index)
                }
                return false
            },
            isAlmostTheSameTime(index) {
                if (index !== 0){

                    let lastIndex = index - 1;
                    let diff = moment(this.messages[index].created_at.seconds)
                        .diff(this.messages[lastIndex].created_at.seconds);

                    return diff <= 300000;
                }
                return false
            }
        },
        mounted() {

            this.messages = [];
            let friend_username = this.$route.params.friend_id;

            if (this.$route.params.friend !== undefined) {
                this.friend = this.$route.params.friend;
            }

            if (this.friend === null){
                this.$store.dispatch("getFriend", friend_username).then(response => {
                    this.friend = response.data.result;
                });
            }

            let v = this;
            this.$store.dispatch("getMessages", friend_username).then(response => {
                this.messages = response.data.result;
                this.loading = false;
                v.$parent.$emit("ready");
            });

            bus.$on(enums.EMSG[enums.EMSG.NEW_CHAT_MESSAGE], decoded => {
                let sender;
                let senderString = decoded.from.trim();
                if (senderString !== '' || senderString !== undefined){
                    sender = JSON.parse(decoded.from.trim());
                }

                let message = {
                    content: String.fromCharCode.apply(String, decoded.message),
                    sender: sender,
                    created_at: decoded.createdAt,
                };
                if (this.messages == null){
                    this.messages = [];
                }
                this.messages.push(message);
            });
        },
        destroyed() {
            this.friend = null;
            this.messages = [];
        }
    };
</script>