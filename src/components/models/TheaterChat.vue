<template>

    <div class="theater_chat">

        <div class="col-container pull-left">

            <div class="title-border-bottom pb-2">
                <strong class="side-component-title">
                    <div class="users_title">
                        <i class="icofont-ui-chat text-primary mr-2"></i>
                        Chat
                    </div>
                </strong>
            </div>

            <div class="chat-container">
                <div class="chat-messages">
                    <div class="logs">

                        <div v-for="chat in chats" v-if="chats.length > 0">

                            <div class="message" v-if="chat.type === 'EMSG_LOG_MESSAGE'">
                                <span>{{ chat.data }}</span>
                            </div>

                            <div class="u-msg message" v-if="chat.type === 'EMSG_CHATS' || chat.type === 'EMSG_CHAT_MESSAGE'">

                                <div class="u-avatar pull-left">
                                    <img :src="apiBaseUrl + '/uploads/avatars/' + chat.user.avatar + '.png'"
                                         alt="Josh" />
                                </div>
                                <span class="u-name text-primary">
                                    {{ chat.user.fullname }}
                                </span>
                                <span> : </span>
                                <div class="msg">{{ chat.data }}</div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>

        <div class="users pull-right">

            <div class="user" v-for="member in members" v-if="members.length > 0">
                <div class="online">
                    <img :src="apiBaseUrl + '/uploads/avatars/' + member.avatar + '.png'"
                         class="theater_connected_user_avatar"
                         :alt="member.fullname" />
                </div>
            </div>

        </div>

        <div class="chat-input">
            <input class="chat-box-text"
                      placeholder="Send a message"
                      multiple="multiple"
                      @keyup.enter.exact="sendMessage" />
        </div>

    </div>

</template>

<style>

    .users {
        position: absolute;
        right: 0;
        background: #007bff;
        border-radius: 20px;
        padding: 3px;
        margin: 0 9px;
    }

    .col-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        padding: 10px 55px 0 20px;
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
        border-radius: 50%;
        margin: 0 5px;
    }

    .users > .user {
        border-radius: 20px;
        padding: 0;
        margin: 0 0 5px 0;
    }

    .users > .user:last-child {
        margin: 0;
    }

    img.theater_connected_user_avatar {
        width: 25px;
        background: #FFFFFF;
        border-radius: 50%;
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
        overflow-anchor: none;
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
        width: 320px;
        background: #181818;
        height: 100%;
        padding: 10px 0 10px 0;
    }

</style>

<script>

    import $ from "jquery";
    import {bus} from "../../main";
    import {websocket} from "../../store/ws";
    import {Packet} from "../../protocol/protobuf/packet";
    import {protobuf, enums} from "../../protocol/protobuf/base";

    export default {
        props: ['theater'],
        data() {
            return {
                chats: [],
                ws: null,
                members: [],
            }
        },
        methods: {
            sendMessage() {

                let messageInput = $(".chat-box-text");
                let msg = messageInput.val();

                if (msg !== ""){

                    messageInput.val("");

                    if (this.ws !== null){

                        // let newMessage = {
                        //     type: enums.EmsgChatMessage,
                        //     data: {
                        //         name: "chats",
                        //         value: msg
                        //     }
                        // };

                        // let chat = ChatMessage.create(newMessage);
                        // let buffer = ChatMessage.encode(chat).finish();
                        //
                        // console.log(buffer);

                        // let chat = { type: enums.EmsgChatMessage, data: msg };
                        // this.ws.send(buffer);

                        // newMessage.user = this.$store.state.user;
                        // this.chats.push(newMessage);
                    } else {
                        console.log(`Websocket connection: ${this.ws}`);
                    }
                }
            },
            changeMemberState(user, state) {
                let userIndex = this.findMember(user.id);
                if (state === 1){
                    if (userIndex === -1){
                        this.members.push(user);
                    }
                } else {
                    if (userIndex > -1) {
                        this.members.splice(userIndex, 1);
                    }
                }
            },
            findMember(user_id) {
                for (let index = 0; index <= this.members.length - 1; index++){
                    if (this.members[index].id === user_id){
                        return index
                    }
                }
                return -1
            }
        },
        mounted() {

            bus.$on("theater-connected", (members) => {

                this.members = members;
                this.ws = websocket.theater.ws;

                console.log(`Connected to theater[${this.theater.id}] ws!`);

                this.ws.onmessage = (message) => {
                    let packet = new Packet(message.data);
                    switch (packet.emsg) {
                        case enums.EMSG.THEATER_UPDATE_USER:
                            let decoded = protobuf.PersonalStateMsgEvent.decode(packet.data);
                            this.changeMemberState(decoded.user, decoded.state);
                            break;
                    }
                };

            });
        }
    }

</script>