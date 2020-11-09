<template>

    <div class="theater_chat">

        <div class="col-container pull-left">

            <div class="chat-title-border-bottom pb-2">
                <strong class="side-component-title">
                    <i class="icofont-ui-chat mr-2"></i>
                    <span class="ml-1">Chat</span>
                </strong>
            </div>

            <div class="chat-container">

                <div class="chat-messages">

                    <div class="logs" v-chat-scroll v-if="ready">

                        <div :key="chat.id" class="theater-chat-message" v-for="chat in chats">

                            <div class="message welcome-msg" v-if="chat.type === 'WELCOME_MESSAGE'">
                                <span>Welcome to chat!</span>
                            </div>

                            <div class="message" v-if="chat.type === 'EMSG_LOG_MESSAGE'">
                                <span>{{ chat.data }}</span>
                            </div>

                            <div class="u-msg message" v-if="chat.type === 'EMSG_CHATS' || chat.own_message">

                                <div class="u-avatar pull-left">
                                    <img :src="cdnUrl + '/avatars/' + chat.user.avatar + '.png'"
                                         alt="Josh" />
                                </div>
                                <span class="u-name text-primary">
                                    {{ chat.user.fullname }}
                                </span>
                                <span> : </span>
                                <div class="msg">{{ chat.message }}</div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div class="chat-input" v-if="loggedIn">
            <input class="chat-box-text"
                   placeholder="Write a message"
                   multiple="multiple"
                   @keyup.enter.exact="sendMessage" />
            <button class="btn btn-primary btn-send-chat-msg">Send</button>
        </div>

    </div>

</template>

<style>

    .btn-send-chat-msg {
        padding: 3px 8px !important;
        float: right;
        margin-top: 15px;
    }

    .col-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        padding: 10px;
    }

    .u-msg > .u-name {
        font-size: 14px;
        line-height: 2;
        font-weight: bold;
    }

    .u-msg > .msg {
        font-size: 15px;
        display: inline;
        white-space: pre-wrap;      /* CSS3 */
        white-space: -moz-pre-wrap; /* Firefox */
        white-space: -pre-wrap;     /* Opera <7 */
        white-space: -o-pre-wrap;   /* Opera 7 */
        word-wrap: break-word;      /* IE */
    }

    .u-avatar > img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin: 0 5px;
    }

    .chat-input {
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 15px;
    }

    .message {
        width: 100%;
        clear: both;
        padding: 5px 0;
    }

    .logs {
        flex-grow: 1;
        height: 100%;
        overflow: auto;
    }

    .chat-messages {
        height: 100%;
        overflow:auto;
    }

    .chat-container {
        width: 100%;
        height: 100%;
        padding: 0 0 125px 0;
    }

    .chat-box-text {
        width: 100%;
        background: #202020;
        border: 0;
        border-radius: 5px;
        color: #eeeeee;
        margin-top: 10px;
        outline: none;
        max-height: 91px;
        min-height: 40px;
        overflow-x: hidden;
        padding-bottom: 1rem;
        padding-left: 1rem;
        padding-top: 1rem;
        resize: none;
    }

    .theater_chat {
        position: fixed;
        top: 0;
        right: 0;
        width: 300px;
        background: #151515;
        height: 100%;
    }

    .message.welcome-msg {
        width: 275px;
        font-size: 15px;
        font-weight: bold;
        margin: 0 5px 5px;
        padding-top: 0;
    }

</style>

<script>

    import $ from 'jquery'
    import log from '../../store/logging'
    import {proto} from 'casty-proto/pbjs/ws.bundle'
    import {Packet} from 'casty-proto/protocol/packet'
    
    export default {
        props: ['theater', 'ready'],
        data() {
            return {
                chats: [],
                theaterWebsocket: null,
                members: [],
            }
        },
        methods: {
            sendMessage() {
                let messageInput = $(".chat-box-text");
                let msg = messageInput.val();
                if (msg !== ""){
                    messageInput.val("");
                    if (this.theaterWebsocket.ws !== null){
                        let newMessage = {
                            type: proto.EMSG.NEW_CHAT_MESSAGE,
                            message: msg
                        };
                        this.theaterWebsocket.sendMessage(msg);
                    } else {
                        console.log(`Websocket connection: ${this.theaterWebsocket.ws}`);
                    }
                }
            },
            changeMemberState(user, state) {
                this.$parent.$emit('new-theater-member', {user, state})
            },
            newChatMessage(chatMsg) {
                this.chats.push({
                    type: 'EMSG_CHATS',
                    user: chatMsg.user,
                    message: new TextDecoder("utf-8").decode(chatMsg.message)
                });
            },
        },
        mounted() {

            this.chats.push({ type: 'WELCOME_MESSAGE' });

            this.$parent.$on("theater-connected", (socket) => {

                this.theaterWebsocket = socket;

                log("THEATER GATEWAY", `Connected to theater[${this.theater.id}] gateway!`, 'green');

                this.theaterWebsocket.ws.onmessage = (message) => {

                    let packet = new Packet(message.data);

                    switch (packet.emsg) {
                        case proto.EMSG.THEATER_MEMBERS:
                            let membersDecoded = proto.TheaterMembers.decode(packet.data);
                            this.$parent.$emit("new-theater-members", membersDecoded.members);
                            break;
                        case proto.EMSG.MEMBER_STATE_CHANGED:
                            let decoded = proto.PersonalStateMsgEvent.decode(packet.data);
                            this.changeMemberState(decoded.user, decoded.state);
                            break;
                        case proto.EMSG.CHAT_MESSAGES:
                            let chatMsg = proto.ChatMsgEvent.decode(packet.data);
                            this.newChatMessage(chatMsg);
                            break;
                        default:
                            this.$parent.$emit(proto.EMSG[packet.emsg], packet);
                            break
                    }

                };

            });
        }
    }

</script>