<template>

  <div class="form-group">

    <ContextMenu ref="remove_media_source" v-if="loggedIn">
    <template slot-scope="{ type, contextData }">

      <div class="usermenu-actions-menu" v-show="type === 'delete-theater-confirmation'">

        <div class="logged-in-as">
          Confirmation!
        </div>

        <ContextMenuItem @click.native="removeMediaSource(contextData)" class="bg-danger">
        <i class="icofont-trash mr-1"></i>
        Delete this media
        </ContextMenuItem>

      </div>

    </template>
    </ContextMenu>
    <!--<div class="modal modal-dark fade" id="removeMediaSourceModal" tabindex="-1" role="dialog">-->
    <!--<div class="modal-dialog modal-dialog-centered" role="document">-->
    <!--<div class="modal-content" v-if="selectedForRemove !== null">-->
    <!--<div class="modal-body pb-0">-->
    <!--<h5>-->
    <!--<span class="clearfix">Are you sure you want remove</span>-->
    <!--<span class="th-bold-title">-->
    <!--{{ getStringSub(selectedForRemove.title, 45) }}-->
    <!--</span>-->
    <!--</h5>-->
    <!--</div>-->
    <!--<div class="modal-footer">-->
    <!--<button type="button" class="btn btn-outline-danger" data-dismiss="modal">-->
    <!--No, Never mind!-->
    <!--</button>-->
    <!--<VueLoadingButton-->
    <!--@click.native="removeMediaSource"-->
    <!--:loading="removeLoading"-->
    <!--class="btn btn-outline-success"-->
    <!--:disabled="this.selectedForRemove === null">-->
    <!--<span>Yes, Im sure!</span>-->
    <!--</VueLoadingButton>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <div class="media-source-container">
      <div class="add-media-source-title pull-left">
        <i class="icofont-link mr-1"></i>
        Media Sources
      </div>
    </div>

    <form class="form-dark">
      <div class="form-group p-0">
        <div class="media-sources-icons">
          <i class="icofont-spotify"></i>
          <i class="icofont-youtube-play"></i>
          <i class="icofont-film"></i>
        </div>
        <input type="text"
               class="mt-3 form-control"
               id="media_source"
               v-model="newMediaSourceUri"
               placeholder="Enter your media source uri here"
               required="required"
               autocomplete="off" />
      </div>
    </form>

    <div class="media-sources">

      <button v-if="connectSpotifyAlert" @click="connectSpotifyAccount" class="spotify-account-alert-btn">
        <i class="icofont-spotify"></i>
        <span>Connect your spotify account to continue</span>
      </button>

      <div v-if="loading"> Loading... </div>

      <div class="media-source-preview mb-3" v-if="newMediaSource.loaded">

        <img v-if="newMediaSource.data.banner !== undefined"
             class="preview-select-ms"
             :src="newMediaSource.data.banner"
             :alt="newMediaSource.data.title" />

        <div v-else class="default-preview-banner">
          <i class="icofont-ui-movie"></i>
        </div>

        <div class="preview-info">
          <div class="form-dark">
            <div class="form-group p-0 editable-preview-title">
              <input type="text"
                     v-model="newMediaSource.data.title"
                     class="form-control" />
            </div>
          </div>
          <div class="preview-duration" v-if="newMediaSource.data.length !== 0">
            <span class="badge badge-warning">
              <i class="icofont-clock-time"></i>
              {{ humanizeDuration(newMediaSource.data.length * 1000) }}
            </span>
          </div>
        </div>
        <div class="preview-change">
          <VueLoadingButton
            type="button"
            @click.native="saveNewMedia(newMediaSource)"
            :loading="saveNewMediaLoading"
            class="btn-theater-action">
          Select
          </VueLoadingButton>
        </div>
      </div>


      <div class="media-sources-list selected-media-source">
        <MediaSource class="selected-media-source"
                     :mediaSource="theater.media_source"
                     :selected="true" />
      </div>

      <div class="media-sources-list media-sources-scrollable" 
           v-if="!mediaSourcesLoading && showMediaSources">

        <MediaSource :key="'media-source-' + ms.id"
           v-for="ms in mediaSources"
           :selectedMediaSourceId="theater.media_source.id"
           :mediaSource="ms" 
           :selected="false" />

      </div>

    </div>

  </div>

</template>

<style>

.media-source-preview {
  background: #131212;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  width: 100%;
}

span.selected-preview-title.new-media-source-title {
  margin: 12px 5px;
  font-size: 17px;
}

.media-sources-list {
  width: 100%;
}

.media-sources-scrollable {
  max-height: 300px;
  overflow-y: auto;
}

.media-sources-list > .media-source {
  width: 100%;
  background: #131212;
  border-radius: 5px;
  display: flow-root;
  align-content: center;
}

/* .media-sources-list > .media-source:last-child {
margin-bottom: 5px;
} */

.media-sources-list > span.media-source-title {
  float: left;
  margin-top: 5px;
}

.media-source-container {
  display: flow-root;
  align-items: center;
}

.preview-duration {
  clear: both;
  float: left;
}

.btn-save-new-media {
  display: flex;
  align-items: center;
  float: right;
  position: absolute;
  right: 100px;
  margin: 10px 0;
}

.editable-preview-title,
.form-dark > .form-group.editable-preview-title input {
  background: #181818 !important;
  cursor: pointer;
}

.media-sources-icons {
  position: absolute;
  right: 335px;
  margin-top: 7px;
}

.media-sources-icons > i {
  font-size: 25px;
  color: #333;
  margin: 0 5px;
}

.th-bold-title {
  background: #8a8c8a;
  padding: 5px;
  border-radius: 5px;
  font-size: 17px;
  font-weight: bold;
  color: #000000;
  margin-top: 10px !important;
  display: inline-block;
}

img.preview-select-ms {
  width: 82px !important;
  height: 50px;
  margin: 15px 0;
}

input#media_source {
  padding-right: 110px;
}

.spotify-account-alert-btn {
  padding: 10px;
  background: #1DB954;
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 16px;
  border: none;
  width: 100%;
}

.spotify-account-alert-btn > i {
  font-size: 20px;
  margin-right: 5px;
}

.spotify-account-alert-btn:hover {
  background: #148a3e;
  color: #FFFFFF;
  text-decoration: none;
}

.selected-media-source {
  margin-top: 15px;
}

</style>

<script>

import $ from 'jquery'
import MediaSource from '../models/MediaSource'
import VueLoadingButton from 'vue-loading-button'
import ContextMenu from '../models/context-menu/ContextMenu';
import ContextMenuItem from '../models/context-menu/ContextMenuItem';

export default {
  name: "MediaSources",
  props: ['theater'],
  components: {
    MediaSource,
    VueLoadingButton,
    ContextMenu,
    ContextMenuItem,
  },
  data() {
    return {
      loading: false,
      connectSpotifyAlert: false,
      hasSpotifyConnection: null,
      spotifyConnection: null,

      loadedMediaSources: false,
      removeLoading: false,

      mediaSources: [],
      mediaSourcesLoading: false,
      newMediaSourceUri: null,
      newMediaSource: {
        loading: false,
        loaded: false,
        data: {},
      },
      saveNewMediaLoading: false,
      showMediaSources: true,
    }
  },
  watch: {
    newMediaSourceUri() {
      if (this.newMediaSourceUri !== null && this.newMediaSourceUri !== ""){
        this.parseMediaSourceUri()
      } else {
        this.loading = false;
        this.newMediaSource.loaded = false;
        this.newMediaSource.data = {};
        this.connectSpotifyAlert = false;
      }
    },
  },
  methods: {

    connectSpotifyAccount() {
      $("#mediaSource").modal('hide');
      this.$router.push({ 
        name: 'spotify_oauth_connect', 
        query: {
          ref: 'dashboard',
        }
      })
    },

    saveNewMedia(mediaSource) {

      this.saveNewMediaLoading = true;

      let payload = {
        title: mediaSource.data.title,
        uri:   mediaSource.data.uri,
      };

      if (this.hasSpotifyConnection) {
        payload.accessToken = this.spotifyConnection.access_token
      }

      this.$store.dispatch("saveNewMediaSource", payload).then(response => {

        let mediaSource = response.data.result;
        this.saveNewMediaLoading = false;

        this.mediaSources.push(mediaSource);
        this.theater.media_source = mediaSource;

        // empty the parse media source
        this.loading = false;
        this.newMediaSource.loaded = false;
        this.newMediaSource.data = {};
        this.newMediaSourceUri = null;

        if (!this.showMediaSources) {
          this.loadMediaSources()
        }

        this.$bus.$emit('new-media-source', mediaSource);

        $("#mediaSource").modal('hide');

      }).catch(() => {
        this.saveNewMediaLoading = false;
      });

    },

    getSpotifyConnection() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('userConnection', 'spotify').then(response => {
          const connection = response.data.result[0]
          this.hasSpotifyConnection = true;
          this.spotifyConnection = connection;
          resolve(connection)
        }).catch(err => {
          this.hasSpotifyConnection = false;
          this.spotifyConnection = null;
          reject(err)
        })
      });
    },

    async parseSpotifyEpisode(episode_id) {
      if (this.hasSpotifyConnection === null) {
        await this.getSpotifyConnection().catch(err => {
          console.log("Could not find spotify connection");
        });
      }
      if (this.hasSpotifyConnection) {
        // parsing here
        const payload = { 
          service: 'episodes', 
          id: episode_id,
          access_token: this.spotifyConnection.access_token,
        };
        await this.$store.dispatch('getSpotifyTrack', payload).then(({response, access_token}) => {
          const episode = response.data;
          this.newMediaSource.loaded = true;
          this.spotifyConnection.access_token = access_token;
          this.newMediaSource.data = {
            title:  episode.name,
            length: Math.round(episode.duration_ms / 1000),
            banner: episode.images[1].url,
            type:   6,
            uri:   `https://open.spotify.com/episode/${episode_id}`,
          };
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      } else {
        console.log("You need connect your spotify account");
        this.loading = false;
        this.connectSpotifyAlert = true;
      }
    },

    async parseSpotifyTrack(track_id) {
      if (this.hasSpotifyConnection === null) {
        await this.getSpotifyConnection().catch(err => {
          console.log("Could not find spotify connection");
        });
      }
      if (this.hasSpotifyConnection) {
        // parsing here
        const payload = { 
          service: 'tracks', 
          id: track_id, 
          access_token: this.spotifyConnection.access_token,
        };
        await this.$store.dispatch('getSpotifyTrack', payload).then(({response, access_token}) => {
          const track = response.data;
          this.newMediaSource.loaded = true;
          this.spotifyConnection.access_token = access_token;
          this.newMediaSource.data = {
            title:  track.name,
            length: Math.round(track.duration_ms / 1000),
            banner: track.album.images[1].url,
            type:   6,
            uri:   `https://open.spotify.com/track/${track_id}`,
          };
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      } else {
        this.loading = false;
        this.connectSpotifyAlert = true;
      }
    },

    parseMediaSourceUri() {

      this.connectSpotifyAlert = false;
      this.loading = true;
      this.newMediaSource.loaded = false;
      this.newMediaSource.data = {};

      // check if media source type is spotify
      const regex = /spotify:(episode|track):(.*)/s;
      let sMatch;
      if ((sMatch = regex.exec(this.newMediaSourceUri)) !== null) {
        if (sMatch.length === 3) {
          switch (sMatch[1]) {
            case "episode": this.parseSpotifyEpisode(sMatch[2]); break;
            case "track": this.parseSpotifyTrack(sMatch[2]); break;
            default: this.loading = false; break;
          }
        }
      } else {
        try {
          let url = new URL(this.newMediaSourceUri)
          switch (url.hostname) {
            case "open.spotify.com":
              const parsed = url.pathname.split("/")
              switch (parsed[1]) {
                case "episode": this.parseSpotifyEpisode(parsed[2]); break;
                case "track": this.parseSpotifyTrack(parsed[2]); break;
                default: this.loading = false; break;
              }
              break
            default:
              this.$store.dispatch("parseMediaSourceUri", url.href).then(response => {
                this.newMediaSource.loaded = true;
                this.newMediaSource.data = response.data.result;
                this.loading = false;
              }).catch(() => {
                this.loading = false;
              });
              break;
          }
        } catch (error) {
          this.loading = false;
        }
      }
    },

    loadMediaSources() {

      this.showMediaSources = true;
      this.loading = true;
      this.mediaSourcesLoading = true;
      this.mediaSources = [];
      this.loadedMediaSources = false;

      this.$store.dispatch("loadMediaSources").then(response => {
        this.mediaSources = response.data.result;
        this.mediaSourcesLoading = false;
        this.loadedMediaSources = true;
        this.loading = false;
      }).catch(() => {
        this.mediaSourcesLoading = false;
        this.loading = false;
      });

    },

    openMediaSourcesModal() {
      $("#mediaSource").modal();
      if (!this.loadedMediaSources) {
        this.loadMediaSources();   
      }
    },

    removeMediaSource(mediaSource) {
      this.$refs.remove_media_source.close();
      this.removeLoading = true;

      this.$store.dispatch("removeMediaSource", mediaSource.id).then(() => {

        this.$notify({
          group: 'dashboard',
          type: 'success',
          text: "MediaSource removed successfully!",
          title: "Success",
          duration: 2000,
        });

        this.removeMediaSourceFromArray(mediaSource);

        //mediaSources

        this.removeLoading = false;
        $("#removeMediaSourceModal").modal('hide');

      }).catch(err => {

        console.log(err);

        this.$notify({
          group: 'dashboard',
          type: 'error',
          text: "Something went wrong, please try again later!",
          title: "Failed",
          duration: 2000,
        });

        this.removeLoading = false;

      });

    },

    removeMediaSourceFromArray(mediaSource) {
      const currentIndex = this.mediaSources.findIndex(ms => ms.id === mediaSource.id);
      this.mediaSources.splice(currentIndex, 1)
    },

    showRemoveMediaSourceModal($event, media_source) {
      this.$refs.remove_media_source.open($event, 'delete-theater-confirmation', media_source)
    },

  },
  mounted() {
    this.loadMediaSources()
    $(document).on('show.bs.modal', '.modal', function () {
      var zIndex = 1040 + (10 * $('.modal:visible').length);
      $(this).css('z-index', zIndex);
      setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
      }, 0);
    });
  }
}

</script>
