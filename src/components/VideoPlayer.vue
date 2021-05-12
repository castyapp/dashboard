<template>

  <div class="video-player">

    <div class="theater-summary-info pl-3 pr-3" v-if="theater.media_source.title">
      <strong class="pull-left">
        Watching {{ getStringSub(this.theater.media_source.title, 35) }}
      </strong>
    </div>

    <div v-if="!autoPlayEnabled" class="autoplay-warning">
      Consider enable auto-play on your browser!
    </div>

    <div v-else>
      <video id="theater" class="full-width" crossorigin></video>
    </div>

  </div>

</template>

<style scoped>

video#theater {
  background: #000000;
}

.theater-summary-info {
  background: #3f51b5;
  padding: 4px;
  display: flow-root;
}

.members-loading-spinner {
  float: right;
  margin-left: 20px;
}

.members-loading {
  background: #0e1115;
  color: #ffffff;
  padding: 10px 20px;
  position: absolute;
  top: 75px;
  border-radius: 3px;
  font-size: 15px;
  box-shadow: 2px 3px 12px #000;
  margin-left: 10px;
}

.autoplay-warning {
  background: #000000;
  padding: 170px;
  height: 400px;
  text-align: center;
  font-size: 22px;
  z-index: -1;
}

</style>

<script>

import 'plyr/dist/plyr.css'

import Hls from 'hls.js'
import Plyr from 'plyr'
import log from '@/store/logging'
import { proto } from 'libcasty-protocol-js/commonjs'
import {emit} from 'casty-proto/protocol/protocol'

export default {
  name: 'video-player',
  props: ['theater', 'subtitles'],
  data() {
    return {
      buffered: false,
      buffering: false,
      ws: null,
      autoPlayEnabled: true,
      player: null,
      syncing: true,
      synced: false,
      user: {},
      canAccessVideoPlayer: false,
      sentSyncMeAt: null,
    }
  },
  computed: {
    mediaSourceTheaterTitle() {
      const title = this.getStringSub(this.theater.media_source.title, 50);
      if (this.theater.media_source.type === proto.MediaSource.Type.SPOTIFY) {
        return `Listening To ${title} on Spotify`;
      } 
      return `Watching ${title}`;
    }
  },
  methods: {
    sync() {
      if (this.theater.media_source.type === proto.MediaSource.Type.YOUTUBE) {
        this.sentSyncMeAt = this.timeNow()
        log("VIDEO PLAYER", "Sending sync request...", "yellow");
        emit(this.ws, proto.EMSG.SYNC_ME, proto.TheaterVideoPlayer, {});
      }
    },
    onPlaying() {
      log("VIDEO PLAYER", `Playing at ${this.player.currentTime}!`, 'green');
      if (!this.player.fromSocket) {
        if (this.canAccessVideoPlayer) {
          emit(this.ws, proto.EMSG.THEATER_PLAY, proto.TheaterVideoPlayer, {
            theaterId:     this.theater_id,
            userId:        this.user.id,
            currentTime:   this.player.currentTime,
            state:         proto.TheaterVideoPlayer.State.PLAYING,
          });
        }
      } else {
        console.log("Request to play while on socket mode!");
        this.player.fromSocket = false;
      }
    },
    onPaused() {
      log("VIDEO PLAYER", `Paused at ${this.player.currentTime}!`, 'green');
      if (!this.player.fromSocket) {
        if (this.canAccessVideoPlayer) {
          emit(this.ws, proto.EMSG.THEATER_PAUSE, proto.TheaterVideoPlayer, {
            theaterId:     this.theater_id,
            userId:        this.user.id,
            currentTime:   this.player.currentTime,
            state:         proto.TheaterVideoPlayer.State.PAUSED,
          });
        }
      } else {
        console.log("Request to play while on socket mode!");
        this.player.fromSocket = false;
      }
    },
    gatewayOnPlay(packet) {
      let decoded = proto.TheaterVideoPlayer.decode(packet.data);
      if (decoded.userId !== undefined) {
        if (decoded.userId !== this.user.id || !this.$store.getters.loggedIn) {
          this.player.fromSocket = true;
          this.player.currentTime = decoded.currentTime;
          this.player.play();
          console.log("Request to play at: ", decoded.currentTime);
        }
      }
    },
    gatewayOnPause(packet) {
      let decoded = proto.TheaterVideoPlayer.decode(packet.data);
      if (decoded.userId !== undefined) {
        if (decoded.userId !== this.user.id || !this.$store.getters.loggedIn) {
          this.player.fromSocket = true;
          this.player.currentTime = decoded.currentTime;
          this.player.pause();
          console.log("Request to pause at: ", decoded.currentTime);
        }
      }
    },
    onSynced(packet) {

      console.log("onSynced called");

      let decoded = proto.TheaterVideoPlayer.decode(packet.data);

      this.player.synced = true;
      this.player.fromSocket = true;

      let currentTime = decoded.currentTime;
      if (decoded.state === proto.TheaterVideoPlayer.State.PLAYING) {
        log("VIDEO PLAYER", "Theater is in playing state, Appending waiting to buffer time to current_time!", "yellow");
        const wastedWhileConnecting = this.timeNow() - this.connectedAt
        currentTime = (decoded.currentTime + wastedWhileConnecting);
      }

      this.player.currentTime = currentTime;

      switch (decoded.state) {
        case proto.TheaterVideoPlayer.State.PLAYING:
          log("VIDEO PLAYER", `Should play at ${currentTime}!`, 'green');
          this.player.fromSocket = false;
          this.player.play()
          break
        case proto.TheaterVideoPlayer.State.PAUSED:
          log("VIDEO PLAYER", `Should pause at ${currentTime}!`, 'green');
          this.player.fromSocket = false;
          this.player.pause()
          break
      }

      log("VIDEO PLAYER", `Client Synced!`, 'green');

    },
    disableVideoPlayer() {
      console.log("Disabling video player");
      this.player.muted = true
    },
    enableVideoPlayer() {
      console.log("Enabling video player");
      this.player.muted = false
    },
    mountVideoPlayer() {

      let videoPlayerOptions = {}
      this.canAccessVideoPlayer = false

      switch (this.theater.video_player_access) {
        case proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_EVERYONE:
          this.canAccessVideoPlayer = true
          break
        case proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_FRIENDS:
          this.canAccessVideoPlayer = this.$store.getters.loggedIn
          break
        case proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_USER:
          if (this.$store.getters.loggedIn){
            this.canAccessVideoPlayer = this.user.id === this.theater.user.id
          }
          break
      }

      if (this.canAccessVideoPlayer) {
        videoPlayerOptions = {
          debug: false,
          autoplay: false,
          controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen'
          ],
          settings: [
            'captions',
            'quality',
          ],
          captions: {
            active: true,
            language: 'auto',
            update: true,
          },
        }
      } else {
        videoPlayerOptions = {
          debug: false,
          autoplay: false,
          controls: [
            'play-large',
            'play',
            'current-time',
            'mute',
            'volume',
            'captions',
            'settings',
            'airplay',
            'fullscreen'
          ],
          settings: [
            'captions',
            'quality',
          ],
          captions: {
            active: true,
            language: 'auto',
            update: true,
          },
        }
      }

      if (this.theater.media_source.type === proto.MediaSource.Type.M3U8) {
        // videoPlayerOptions.controls = [
        //     'play-large',
        //     'play',
        //     'mute',
        //     'volume',
        //     'captions',
        //     'settings',
        //     'airplay',
        //     'fullscreen'
        // ]
      }

      this.player = new Plyr('#theater', videoPlayerOptions);

      this.player.fromSocket = false;

      this.player.on('ready', () => {
        log("VIDEO PLAYER", "VideoPlayer Ready!", "green");
        this.sync();
      })

      this.$on('buffering', () => {
        this.buffering = true;
        log("VIDEO PLAYER", "VideoPlayer Buffering...", "yellow");
      });

      this.$on('buffered', () => {
        log("VIDEO PLAYER", "VideoPlayer buffered!", "yellow");
        this.buffering = false;
      });

      this.player.on('statechange', event => {
        switch (event.detail.code) {
          case 3: if (!this.buffering) this.$emit('buffering'); break
          case 1: if(this.buffering) this.$emit("buffered"); break
        }
      })

      if (this.theater.media_source.type !== proto.MediaSource.Type.M3U8) {
        //this.$parent.$on(proto.EMSG[proto.EMSG.SYNCED], this.onSynced);
        this.$parent.$on(proto.EMSG[proto.EMSG.THEATER_PLAY], this.gatewayOnPlay);
        this.$parent.$on(proto.EMSG[proto.EMSG.THEATER_PAUSE], this.gatewayOnPause);
      }

      this.player.on('ended', () => {
        log("VIDEO PLAYER", 'video ended!', 'red');
      });

      if (this.loggedIn) {
        if (this.theater.media_source.type !== proto.MediaSource.Type.M3U8) {
          this.player.on('playing', this.onPlaying);
          this.player.on('pause', this.onPaused);
        }
      }

      this.setMediaSource(this.theater.media_source);
    },
    setMediaSource(mediaSource) {

      let tracks = [];
      this.subtitles.forEach(subtitle => {
        tracks.push({
          kind: 'captions',
          label: subtitle.lang,
          srclang: subtitle.lang,
          src: `${this.cdnUrl}/subtitles/${subtitle.file}.vtt`,
        });
      });

      if (mediaSource.uri != null){

        switch (mediaSource.type) {
          case proto.MediaSource.Type.YOUTUBE:
            this.player.source = {
              type: 'video',
              sources: [
                {
                  src: mediaSource.uri,
                  provider: 'youtube',
                },
              ],
            };
            break
          case proto.MediaSource.Type.DOWNLOAD_URI:
            this.player.source = {
              type: 'video',
              sources: [
                {
                  src: mediaSource.uri,
                  type: 'video/mp4',
                  size: 720,
                },
              ],
              tracks: tracks
            };
            break
          case proto.MediaSource.Type.M3U8:
            if (!Hls.isSupported()) {
              this.player.media.src = mediaSource.uri;
            } else {
              const hls = new Hls();
              hls.loadSource(mediaSource.uri);
              hls.attachMedia(this.player.media);
              window.hls = hls;
              this.player.on('languagechange', () => {
                setTimeout(() => hls.subtitleTrack = this.player.currentTrack, 50);
              });
              this.player.play()
            }
            break
        }

      }

    },
  },
  mounted() {
    this.$parent.$on('theater-connected', socket => {
      this.ws = socket.ws;
      this.mountVideoPlayer();
      this.connectedAt = this.timeNow()
    })
  },
  deactivated() {
    if (this.player !== null) {
      this.player.destroy();
    }
    this.destroy();
  },
  destroyed() {
    if (this.player !== null) {
      this.player.destroy();
    }
  }
}

</script>
