<template>

  <div class="messages-section p-2">

    <div class="messages pl-2 pr-2">

      <div class="title-border-bottom pb-2" v-if="friend !== null">
        <strong>
          <i class="icofont-user"></i>
          {{ friend.fullname }}
          <i class="state-dot-circle"></i>
        </strong>
      </div>

      <div class="v-loading">
        <Spinner :loading="loading" class="v-loading" :color="'#316bff'" />
      </div>

      <div ref="chats" class="chats">
        <div class="message" :data-id="index"
             :key="message.id"
             :class="{
                      'sm-user': isLastOneThisUser(index),
                      'waiting-for-response': message.waitingForResponse,
                      }"
             v-for="(message, index) in messages">

          <div class="small-avatar">
            <img :src="cdnUrl + '/avatars/' + message.sender.avatar + '.png'"
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
              <div class="message-text" v-linkified v-else>{{ message.content }}</div>
            </div>
          </div>

        </div>
      </div>

      <div class="chat-input-message" v-show="!loading">
        <div ref="textbox"
             @input="onMessageInput"
             class="send-input-messager"
             @keyup.enter.exact="sendMessage"
             @keydown="onKeydownInputMessage"
             contenteditable />
        </div>

      </div>

    </div>

</template>

<style scoped>

.emote-picker-messages-box {
  position: absolute;
  bottom: 0;
  margin-bottom: 170px;
  right: 375px;
}

.choose-emote {
  position: absolute;
  right: 375px;
  font-size: 20px;
  margin-top: 25px;
  color: #757575;
}

.choose-emote:hover {
  color: #FFFFFF;
}

.messages-section {
  height: 100vh;
}

.col-msg-container {
  height: 100%;
}

.messages {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
}

.message:first-child {
  margin-top: 10px !important;
}

.message.sm-user {
  margin: 0 !important;
  padding: 0 10px !important;
  border-top: none !important;
}

.message:first-child {
  border-top: none !important;
  margin-top: 0px !important;
}

.message {
  padding-top: 15px !important;
  margin-top: 10px;
  padding: 10px !important;
}

.message:hover {
  background: #2f30306b;
}

.message-user-name {
  /* margin-bottom: 10px; */
  /* margin-top: 10px; */
  color: #b3b3b3;
  /* border-bottom: 1px solid #333334; */
  /* padding-bottom: 10px; */
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
  flex-grow: 12;
  flex-shrink: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.chats .chat-inner {
  height: 100%;
  overflow: auto;
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

.message.sm-user > .message-content-container {
  margin-left: 40px;
}

.message-content > .message-text {
  white-space: pre-wrap;
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

.chat-input-message {
  flex-grow: 1;
  flex-shrink: 0;
  min-height: 50px;
  max-height: 150px;
  overflow-y: auto;
}

.send-input-messager {
  width: 100%;
  line-height: 25px;
  padding: 10px;
  margin: 0;
  background: #0e1115;
  border: 0;
  border-radius: 5px;
  outline: none;
  color: #FFFFFF;
  overflow-x: auto;
  padding-right: 50px;
}

.small-avatar {
  width: 30px;
  float: left;
}

.small-avatar > img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.message.waiting-for-response {
  opacity: 0.3;
}

</style>

  <script>

import moment from 'moment-timezone'
import userSocket from '@/store/user.ws'
import { proto } from 'libcasty-protocol-js/commonjs'
import TheaterMessage from '@/components/TheaterMessage'
import Spinner from '@/components/Spinner'

export default {
  name: 'Message',
  data() {
    return {
      messageInput: "",
      friend: null,
      messages: [],
      loading: true,
    }
  },
  components: {
    TheaterMessage,
    Spinner,
  },
  methods: {
    newline() {
      this.$refs.textbox.innerText = `${this.messageInput}\n`;
    },
    onKeydownInputMessage(e) {
      if (!e) {
        e = window.event;
      }
      var keyCode = e.which || e.keyCode,
        target = e.target || e.srcElement;
      if (keyCode === 13 && !e.shiftKey) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
        target.innerHTML = '';
      }
    },
    onMessageInput(e) {
      this.messageInput = e.target.innerText;
    },
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
      this.$refs.textbox.innerText = "";
      userSocket.sendMessage(this.messageInput, this.friend.username);
      // let message = {
      //     content,
      //     sender: this.user,
      //     reciever: this.friend,
      //     waitingForResponse: true,
      //     created_at: {
      //         seconds: Math.floor(Date.now() /1000),
      //     },
      // };
      // if (this.messages == null){
      //     this.messages = [];
      // }
      // this.messages.push(message);
      this.scrollToEnd();
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
    },
    scrollToEnd() {
      const container = this.$refs.chats;
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
  },
  activated() {
    if (this.friend !== null) {
      this.$bus.$emit("remove-friend-badge", this.friend.id);
      this.$bus.$emit("open-message-page", this.friend)
    }
    this.$bus.$emit('updated_friends_list_state', 'open');
  },
  async mounted() {

    this.$bus.$emit('updated_friends_list_state', 'open');

    this.messages = [];
    let friend_username = this.$route.params.friend_id;

    if (this.$route.params.friend !== undefined) {
      this.friend = this.$route.params.friend;
    }

    if (this.friend === null){
      await this.$store.dispatch("getFriend", friend_username).then(friend => {
        this.friend = friend;
        this.setTitle(`${friend.fullname} (@${friend.username}) • Casty`);
      });
    }

    this.$bus.$emit("remove-friend-badge", this.friend.id);
    this.scrollToEnd();

    let v = this;
    this.$store.dispatch("getMessages", friend_username).then(messages => {
      this.messages = messages;
      this.loading = false;
      v.$parent.$emit("ready");
    });

    this.$bus.$on(proto.EMSG[proto.EMSG.NEW_CHAT_MESSAGE], decoded => {
      if (decoded.sender.id === this.friend.id){
        let message = {
          id: decoded.id,
          content: new TextDecoder("utf-8").decode(decoded.message),
          sender: decoded.sender,
          created_at: decoded.createdAt,
        };
        if (this.messages == null){
          this.messages = [];
        }
        this.messages.push(message);
      }
      if (decoded.sender.id === this.user.id) {
        let message = {
          id: decoded.id,
          content: new TextDecoder("utf-8").decode(decoded.message),
          sender: this.user,
          reciever: this.friend,
          created_at: decoded.createdAt,
        };
        if (this.messages == null){
          this.messages = [];
        }
        this.messages.push(message);
      }
    });

    this.$bus.$on('user-updated', updatedUser => {
      if (this.friend.id === updatedUser.id) {
        this.friend = updatedUser
      }
    });
  },
  destroyed() {
    this.friend = null;
    this.messages = [];
  }
};
</script>
