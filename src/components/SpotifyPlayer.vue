<template>

  <div>

    <div class="theater-summary-info pl-3 pr-3" v-if="theater.media_source.title">
      <strong class="pull-left">
        Listening To {{ getStringSub(theater.media_source.title, 50) }} on Spotify
      </strong>
    </div>

    <div v-if="!autoPlayEnabled" class="autoplay-warning">
      Consider enable auto-play on your browser!
    </div>

    <div class="spotify-player-container">

      <div class="spotify-player-overlay" v-if="overlay.show">
        {{ overlay.title }}
        <button class="btn btn-success" v-if="overlay.event === 'state_changed'">
          {{ overlay.btnText }}
        </button>
        <router-link class="btn btn-success" v-if="overlay.event === 'login'" :to="{ name: 'login' }">
          {{ overlay.btnText }}
        </router-link>
        <router-link class="btn btn-success" v-if="overlay.event === 'connect'" :to="{ name: 'settings' }">
          {{ overlay.btnText }}
        </router-link>
      </div>

      <div class="spotify-player">

        <div class="spotify-poster">
          <img class="pull-left" 
               :src="cdnUrl + '/posters/' + theater.media_source.banner + '.png'"
               :alt="theater.media_source.title" />

          <RippleLoader :loading="playerLoading" class="play-loading" :color="'#FFFFFF'" />

          <div class="player-btns" v-if="!playerLoading">

            <button class="play-btn" v-if="!playing" @click="playTrack">
              <i class="icofont-play-alt-1"></i>
            </button>

            <button class="play-btn" v-if="playing" @click="pauseTrack">
              <i class="icofont-pause"></i>
            </button>

          </div>
        </div>

        <div class="m-2 ml-3 full-width">
          <i class="icofont-spotify spotify-icon"></i>
          <div class="spotify-details">
            <strong class="spotify-title clearfix">{{ theater.media_source.title }}</strong>
            <small class="spotify-artist">{{ theater.media_source.artist }}</small>
          </div>
          <div class="splayer-controls">
            <div class="progress-box">
              <div class="splayer-current-time pull-left mr-2">
                {{ currentTime }}
              </div>
              <div class="splayer-bg-progress" @click="seek">
                <div id="seek-progress-bar" class="splayer-progress-bar pull-left">
                  <div class="sprogress" :style="'width: ' + percentComplete + '%'"></div>
                </div>
              </div>
              <div class="splayer-current-time pull-left ml-2">
                {{ durationTime }}
              </div>
              <button type="button" class="speaker-btn pull-left ml-2">
                <i class="icofont-ui-volume"></i>
              </button>
              <div class="volume-bar">
                <div class="splayer-progress-bar">
                  <div class="sprogress"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<style>

.progress-box {
  display: flex;
  height: 0;
  margin: 5px 0;
}

.spotify-player-overlay {
  background: #000000ba;
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 25px;
  font-size: 20px;
  z-index: 9;
}

.spotify-progress-bar.volume-bar {
  width: 100px;
  float: right;
  position: absolute;
  right: 18px;
}

.spotify-poster > img {
  width: 90px;
}

.theater-summary-info {
  background: #3eb954;
  padding: 4px;
  display: flow-root;
}

.spotify-player {
  background: #000000;
  color: #ffffff;
  display: flex;
  padding-right: 10px;
}

i.spotify-icon {
  position: initial;
  float: right;
  font-size: 21px;
  margin: 5px;
}

.spotify-details {
  display: grid;
}

.player-btns {
  position: absolute;
  padding: 17px 20px;
}

.play-loading {
  position: absolute !important;
  left: 10px;
  margin-top: 10px;
}

.player-btns > button {
  border-radius: 50%;
  background: transparent;
  color: #FFFFFF;
  font-size: 40px;
  font-weight: 100;
  border: none;
  text-align: center;
}

.volume-icon {
  position: absolute;
  bottom: 0px;
  left: -26px;
  top: -9px;
  font-size: 20px;
}

.splayer-progress-bar {
  width: 100%;
  height: 4px;
  background: #202020;
}

.sprogress {
  background: #FFFFFF;
  height: 4px;
  width: 0;
  border-radius: 6px;
  /* transition: width 3s; */
}

.progress-box {
  display: flex;
  margin-top: 6px;
}

.volume-bar {
  width: 130px;
  padding: 8px 5px;
}

button.speaker-btn {
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 20px;
  float: left;
  padding: 0 6px;
  display: flex;
}

.splayer-thumb {
  width: 10px;
  height: 10px;
  background: #3eb954;
  position: absolute;
  border-radius: 50%;
}

.splayer-bg-progress:hover > .splayer-progress-bar > .sprogress {
  background: #3eb954 !important;
}

.splayer-bg-progress {
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
}

.spotify-player-container {
  position: relative;
}

.spotify-poster {
  width: 90px;
  height: 90px;
}

</style>

<script>

import log from '@/store/logging'

export default {
  name: 'SpotifyPlayer',
  props: ['theater'],
  components: {

  },
  data() {
    return {
      ws: null,
      track: null,
      connection: null,
      autoPlayEnabled: true,
      device_id: null,
      overlay: {
        show: false,
        title: "",
        event: null,
        btnText: null,
      },
      currentSeconds: 0,
      durationSeconds: 0,
      playing: false,
      previousVolume: 35,
      volume: 100,
      loaded: false,
      playingInterval: null,
      playerReady: false,
      alreadyPlayed: false,
      player: null,
      playerLoading: false,
      stopped: false,
    }
  },
  computed: {
    currentTime() {
      return this.convertTimeHHMMSS(this.currentSeconds / 1000);
    },
    durationTime() {
      return this.convertTimeHHMMSS(this.durationSeconds / 1000);
    },
    percentComplete() {
      return (this.currentSeconds / this.durationSeconds) * 100;
    },
    muted() {
      return this.volume / 100 === 0;
    }
  },
  methods: {
    setMediaSource(media_source) {
      this.theater.media_source = media_source;
      this.stopTrack().then(this.getTrack);
    },
    play(position) {
      console.log(`Should play at: ${position}`);
      this.currentSeconds = position
      if (this.playingInterval === null) {
        this.playing = true;
        this.playingInterval = setInterval(() => {
          this.currentSeconds += 100
        }, 100)
      }
      this.playerLoading = false;
    },
    pause(position) {
      console.log(`Should pause at: ${position}`);
      this.currentSeconds = position
      clearInterval(this.playingInterval);
      this.playingInterval = null;
      this.playing = false;
      this.playerLoading = false;
    },
    mute() {
      if (this.muted) {
        return this.volume = this.previousVolume;
      }
      this.previousVolume = this.volume;
      this.volume = 0;
    },
    seekPosition(position) {
      this.player.seek(position);
    },
    async seek(e) {
      const progressBar = $("#seek-progress-bar")[0]
      var percent = e.offsetX / progressBar.offsetWidth;
      const seek = Math.round(percent * this.durationSeconds)
      this.currentSeconds = seek;
      if (this.playing) {
        this.player.seek(seek);
      }
    },
    appendSpotifyScript() {
      return new Promise((resolve) => {
        var spotifyScript = document.createElement("script");
        spotifyScript.type = "text/javascript";
        spotifyScript.src = "https://sdk.scdn.co/spotify-player.js";
        $('head').append(spotifyScript);
        resolve();
      });
    },
    getTrack() {
      const paramsStr = this.theater.media_source.uri.replace("https://open.spotify.com/", "")
      const params = paramsStr.split("/");
      const payload = {
        service: `${params[0]}s`, 
        id: params[1],
        access_token: this.connection.access_token,
      };
      this.$store.dispatch('getSpotifyTrack', payload).then(({response, access_token}) => {
        this.track = response.data;
        this.currentSeconds = 0;
        this.durationSeconds = this.track.duration_ms;
        this.connection.access_token = access_token;
        if (this.player === null) {
          this.mountSpotifyPlayer()
        }
      }).catch(console.log);
    },
    playTrack() {
      if (this.playerReady) {
        this.playerLoading = true;
        if (this.alreadyPlayed) {
          this.player.resume().then(() => {
            console.log('Resumed!');
          });
        } else {
          const payload = {
            spotify_uris: [`spotify:${this.track.type}:${this.track.id}`],
            device_id: this.device_id,
            access_token: this.connection.access_token,
          };
          this.$store.dispatch('playOnSpotify', payload).then(({response, access_token}) => {
            this.connection.access_token = access_token;
            this.stopped = false;
            this.seekPosition(this.currentSeconds)
          });
          this.alreadyPlayed = true;
        }
      }
    },
    stopTrack() {
      return new Promise(resolve => {
        this.stopped = true;
        this.pause(0)
        this.pauseTrack()
        this.alreadyPlayed = false;
        resolve()
      });
    },
    pauseTrack() {
      this.requestedPause = true;
      this.player.pause().then(() => {
        console.log('Paused!');
      });
    },
    mountSpotifyPlayer() {

      this.player = new Spotify.Player({
        name: 'Casty',
        getOAuthToken: cb => {
          this.$store.dispatch('refreshConnectionToken', 'spotify').then(response => {
            const access_token = response.data.result[0].access_token;
            cb(access_token);
          });
        }
      });

      // Error handling
      this.player.addListener('initialization_error', ({message}) => { 
        console.error(message); 
      });

      this.player.addListener('authentication_error', ({message}) => { 
        console.error(message); 
      });

      this.player.addListener('account_error', ({message}) => { 
        console.error(message); 
      });

      this.player.addListener('playback_error', ({message}) => {
        console.error(this.requestedPlay, message);
      });

      // Playback status updates
      this.player.addListener('player_state_changed', state => { 
        if (state !== null) {
          log("SPOTIFY WEB-PLAYBACK", `State Changed`, "yellow");
          console.log(state);
          if (!this.stopped) {
            this.currentSeconds = state.position;
            if (state.paused) {
              this.pause(state.position)
            } else {
              this.play(state.position)
            }
          }
        }
      });

      // Ready
      this.player.addListener('ready', ({ device_id }) => {
        this.device_id = device_id;
        log("SPOTIFY WEB-PLAYBACK", `Ready with Device ID ${device_id}`, "green");
        // this.playTrack();
        this.playerReady = true;
        this.playerLoading = false;
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }) => {
        log("SPOTIFY WEB-PLAYBACK", `Device ID has gone offline ${device_id}`, "red");
        this.playerReady = false;
        this.playerLoading = true;
      });

      // Connect to the player!
      this.player.connect();
    },
    initSpotify() {
      this.playerLoading = true;
      this.$parent.$on('theater-connected', socket => {
        this.ws = socket.ws;
        this.connectedAt = this.timeNow()
      })
      if (this.loggedIn) {
        window.onSpotifyWebPlaybackSDKReady = () => {
          log("SPOTIFY WEB-PLAYBACK", "Spotify Web-Playback SDK is ready", "green");
          this.$store.dispatch('userConnection', 'spotify').then(response => {
            this.connection = response.data.result[0]
            this.getTrack();
          }).catch(err => {
            log("SPOTIFY WEB-PLAYBACK", `Device ID has gone offline`, "red");
            this.overlay.show = true;
            this.overlay.event = "connect"
            this.overlay.btnText = "Connect your spotify premium account to listen along"
            this.overlay.title = null;
            this.playerLoading = false;
          })
        }
      }
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.appendSpotifyScript().then(this.initSpotify)
    } else {
      this.overlay.show = true;
      this.overlay.event = "login"
      this.overlay.btnText = "Login to listen along"
      this.overlay.title = null;
    }
  },
  deactivated() {
    if (this.player !== null) {
      this.player.disconnect();
    }
    this.destroy();
  },
  destroyed() {
    if (this.player !== null) {
      this.player.disconnect();
    }
  }
}

</script>
