<template>
  
  <div class="voice-control-state">

    <div class="sidebar-title">
      VOICE CONNECTIONS
      <ToggleWidgetButton ref="toggle" :widgetShow="widgetShow" />
    </div>

    <div class="clearfix"></div>

    <div v-if="widgetShow">

      <div class="voice-connections">
        <VoiceConnection v-bind:key="conn.user.id" v-for="conn in voiceConnections" :conn="conn" />
      </div>

      <div v-if="voiceConnections.length === 0" class="no-voice-connections">
        No one's connected to voice server
      </div>

    </div>

    <div class="clearfix"></div>

    <div class="voice-state-actions">

      <button @click="connect" @mouseover="mouseOverConnectBtn" @mouseleave="mouseLeaveConnectBtn" class="join-btn" :class="voiceState.connectBtn.state">
        <!--<i class="icofont-phone"></i>-->
        {{ voiceState.connectBtn.text }}
      </button>

      <div class="pull-right voice-actions-buttons">

        <button @click="toggleMute">
          <i v-if="voiceState.state.muted" class="icofont-mic-mute muted"></i>
          <i v-else class="icofont-mic"></i>
        </button>

        <button @click="toggleDeafen">
          <i v-if="voiceState.state.deafened" class="icofont-volume-mute muted"></i>
          <i v-else class="icofont-volume-up"></i>
        </button>

      </div>

    </div>

  </div>

</template>

<style scoped>

.no-voice-connections {
  background: #0e0f12;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 13px;
}

.voice-actions-buttons > button > i.muted {
    color: #dc3545;
}

button.join-btn {
  background: #0e0f12;
  border: 0;
  border-radius: 5px;
  padding: 3px 6px;
  color: #b3b3b3;
  font-size: 12px;
  font-weight: bold;
  float: left;
}

.voice-actions-buttons {
  margin-top: 10px;
}

.voice-actions-buttons > button:hover {
  background: #22252a;
}

.voice-actions-buttons > button {
  background: #0e0f12;
  color: #b2b2b2;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  margin-right: 5px;
  font-weight: 100;
}

.voice-state-actions {
  /*background: #0e1013;*/
  padding: 10px;
  margin-top: 10px;
  display: grid;
}

.voice-control-state {
    background: #151a21;
    position: fixed;
    width: 205px;
    max-height: 310px;
    display: flex;
    flex-direction: column;
    bottom: 0;
}

.voice-connections {
  padding: 0 10px;
  overflow-y: auto;
  max-height: 180px;
}

.voice-control > div.join-btn {
  background: #3f51b5;
  margin: -3px 10px;
  border-radius: 5px;
  padding: 2px 5px;
  font-size: 14px;
  font-style: initial;
  cursor: pointer;
}

button.join-btn.connecting, 
button.join-btn.awaiting_endpoint,
button.join-btn.reconnecting {
  background: #cb8f23 !important;
  color: #000;
}

.join-btn.connected {
  background: #30d54a !important;
  color: #000;
}

.join-btn.disconnected,
.join-btn.disconnect {
  background: #d53038 !important;
  color: #000;
}

</style>

<script>

import VoiceConnection from './VoiceConnection';
import ToggleWidgetButton from './ToggleWidgetButton.vue';
import log from '@/store/logging'

export default {
  name: 'VoiceConnections',
  props: ['theater'],
  data() {
    return {
      widgetShow: true,
      voiceState: null, 
      signaller: null,

      voiceState: {
        state: {
          state: 0,
          deafened: false,
          muted: true,
        },
        connectBtn: {
          state: null,
          text: 'Connect',
        },
      },

      voiceConnections: [

        /*{*/
          /*id: "1",*/
          /*muted: false,*/
          /*deafen: false,*/
          /*[>talking: true,<]*/
          /*user: {*/
            /*fullname: "Josh",*/
            /*avatar: "49123759939030791645",*/
          /*},*/
        /*},*/

      ],
    }
  },

  components: {
    VoiceConnection,
    ToggleWidgetButton,
  },

  methods: {

    toggleMute() {
      this.voiceState.state.muted = !this.voiceState.state.muted;
    },
    toggleDeafen() {
      this.voiceState.state.deafened = !this.voiceState.state.deafened;
    },

    mouseOverConnectBtn() {
      if (this.voiceState.connectBtn.state === 'connected') {
        this.voiceState.connectBtn.text = 'Disconnect';
        this.voiceState.connectBtn.state = 'disconnect';
      }
    },
    mouseLeaveConnectBtn() {
      if (this.voiceState.connectBtn.state === 'disconnect') {
        this.voiceState.connectBtn.text = 'Connected';
        this.voiceState.connectBtn.state = 'connected';
      }
    },

    connect() {
      this.voiceState.connectBtn.text = 'Awaiting endpoint...';
      this.voiceState.connectBtn.state = 'awaiting_endpoint';

      setTimeout(() => {

        this.voiceState.connectBtn.text = 'Connecting...';
        this.voiceState.connectBtn.state = 'connecting';

        setTimeout(() => {
          this.voiceState.connectBtn.text = 'Connected';
          this.voiceState.connectBtn.state = 'connected';
        }, 2000)

      }, 2000)

    },

    joinRoom() {
      
      if (this.voiceState === "connected") {
        return
      }

      this.voiceState = "awaiting_endpoint"
      this.signaller = new WebSocket("ws://localhost:3000")

      const peerConfig = {
        bundlePolicy: "max-bundle",
        rtcpMuxPolicy : "require",
        iceServers: [
          {
            urls: "turn:78.47.129.161:3478?transport=udp",
            credential: "12345",
            username: "josh",
          },
        ]
      }

      const constraints = {audio: true, video: false};

      window.RTCPeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      window.RTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
      window.RTCIceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      let peer = new RTCPeerConnection(peerConfig)
      let iceGatherCompleted = false;

      peer.onicecandidate = event => {
        //When The Ice Gathering is complete
        if (event.target.iceGatheringState == "complete" && !iceGatherCompleted) {
          log("MEDIA SERVER", `ICE GATHER FINISHED`, 'green');
          let offer = peer.localDescription
          log("MEDIA SERVER", `SENDING OFFER`, 'green');
          this.signaller.send(JSON.stringify({
            type: "join",
            data: btoa(JSON.stringify(offer)),
            user_id: this.user.id,
            room_id: this.theater.id,
          }))
          iceGatherCompleted = true
        }
      }

      peer.oniceconnectionstatechange = (state) => {

        if (state.target.iceConnectionState === "checking") {
          this.voiceState = "connecting"
        }

        if (state.target.iceConnectionState === "disconnected") {
          this.voiceState = "disconnected"
        }

        if (state.target.iceConnectionState === "connected") {
          this.voiceState = "connected"
          this.voiceConnections.push({
            muted: false,
            deafen: false,
            user: this.user,
          })
        }

        log("MEDIA SERVER", `CONNECTION NEW STATE ${state.target.iceConnectionState}`, 'green');
      }

      peer.ontrack = event => {
        console.log(`New track: `, event)
        if (event.track.kind == "audio") {
          let newRemoteAudio = document.createElement("audio");
          newRemoteAudio.setAttribute("controls", "controls")
          newRemoteAudio.srcObject = event.streams[0];
          newRemoteAudio.play();
          document.getElementById("voices").appendChild(newRemoteAudio);
        }
      }

      this.signaller.onopen = () => {

        log("MEDIA SERVER", `Connected to media.server[${this.user.id}] gateway!`, 'green');

        navigator.mediaDevices.getUserMedia(constraints).then(stream => {

          stream.getTracks().forEach(track => peer.addTrack(track, stream));

          peer.createOffer()
            .then(sdp => peer.setLocalDescription(sdp))

        }).catch(error => console.log(error));

      }

      this.signaller.onmessage = message => {

        let packet = JSON.parse(message.data)

        if (packet.type == 'answer') {
          let answer = new RTCSessionDescription(JSON.parse(atob(packet.data)))
          peer.setRemoteDescription(answer)
            .then(() => {
              log("MEDIA SERVER", `SetRemoteDescription`, 'green');
            })
            .catch(console.error)
        }

        if (packet.type == "icecandidate") {
          let newIceCandidate = new RTCIceCandidate(packet.data)
          peer.addIceCandidate(newIceCandidate)
            .then(() => {
              log("MEDIA SERVER", `NEW ICE CANDIDATE`, 'green');
            })
            .catch(console.log)
        }

        if (packet.type == "negotiationneeded") {

          let offer = new RTCSessionDescription(JSON.parse(atob(packet.data)))
          peer.setRemoteDescription(offer).then(() => {

            peer.createAnswer().then(answer => {

              log("MEDIA SERVER", `NEW ANSWER DESCRIPTION`, 'green');

              peer.setLocalDescription(answer).then(() => {

                let answer = btoa(JSON.stringify(peer.localDescription));

                this.signaller.send(JSON.stringify({
                  type: "relaySessionDescription",
                  data: answer,
                  user_id: this.user.id,
                  room_id: this.theater.id,
                }))

              })

            })

          }).catch(console.log)

        }

      }


    }

  },

  mounted() {

    this.$refs.toggle.$on('onToggle', toggle => {
      this.widgetShow = toggle;
    })

  }
}

</script>
