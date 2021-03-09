<template>

  <div id="settings">

    <div class="ml-3 mr-3 height-full">

      <div class="title-border-bottom pt-3">
        <strong class="side-component-title">
          <i class="icofont-gear mr-2"></i>
          Settings
        </strong>
        <small class="border-left-title">
          You can configure your theater here
        </small>
      </div>

      <div class="clearfix"></div>

      <div class="form-dark">

        <MediaSources :theater="theater" ref="mediaSources" />

        <div class="form-group">

          <label for="theater_name">
            <i class="icofont-ui-movie mr-1"></i>
            Theater description
          </label>

          <input type="text"
                 class="form-control"
                 id="theater_name"
                 v-model="theater_description"
                 placeholder="Enter your theater description here [youtube|spotify]"
                 required="required"
                 autocomplete="off" />

        </div>

        <div class="form-group" v-if="theater.media_source.type === 4 && $parent.hasMediaSource()">

          <label for="movie_subtitles">
            <i class="icofont-cc mr-1"></i>
            Theater movie subtitles
            <small class="text-warning">optional</small>
          </label>
          <div class="clearfix"></div>

          <div class="v-loading">
            <Spinner :loading="subtitlesLoading" class="v-loading" :color="'#316bff'" />
          </div>

          <div v-if="!subtitlesLoading">

            <div class="subtitles">

              <div class="subtitle row" :key="index" v-for="(subtitle, index) in subtitles">

                <div class="col-md-3 pull-left">
                  <input :disabled="subtitle.uploading || subtitle.uploaded || subtitle.fromApi"
                     :id="'subtitle-lang-' + index"
                     type="text"
                     class="form-control subtitle-language "
                     placeholder="Language"
                     v-model="subtitle.lang"
                     autocomplete="off" 
                     required />
                </div>

                <input :disabled="subtitle.uploading || subtitle.uploaded || subtitle.fromApi"
                     :id="'subtitle-' + index"
                     type="file"
                     class="form-control hidden"
                     autocomplete="off"
                     @change="onChangeSubtitle($event, index)" 
                     required />

                <div class="col-md-6 pull-left">
                  <button
                    :disabled="subtitle.uploading || subtitle.uploaded || subtitle.fromApi"
                    type="button" 
                    class="choose-subtitle-btn" 
                    @click="onClickAddSubtitle(index)">

                    {{ subtitle.file.name !== undefined ? subtitle.file.name : 'Choose your subtitle' }}
                    <i class="icofont-file-text"></i>

                  </button>
                </div>

                <div class="col-md-2 pull-left">
                  <RingLoader class="file-uploading-spinner pull-left" 
                              :color="'#316cff'" 
                              :size="25"
                              :loading="subtitle.uploading" />

                  <button type="button" 
                          class="remove-subtitle-btn pull-left" 
                          v-if="(subtitle.file.name !== undefined || index !== 0) && !subtitle.uploading" 
                          @click="removeSubtitle(index)">
                    <i class="icofont-trash"></i>
                  </button>

                  <i v-if="subtitle.uploaded" 
                     class="succeed-upload-subtitle icofont-check text-success pull-left"></i>

                </div>

              </div>

            </div>

            <div class="clearfix"></div>

            <button type="button" class="plus-subtitle-btn mt-2" @click="addSubtitle" v-if="subtitles.length < 4">
              <i class="icofont-plus"></i>
              Add another one
            </button>

          </div>

        </div>

        <div class="form-group">

          <label>
            <i class="icofont-safety-hat mr-1"></i>
            Select your Theater Privacy
          </label>
          <div class="clearfix"></div>

          <span>You can config who can join the theater</span>
          <DropdownMenu :config="privacy_config"
               @setSelectedOption="setNewPrivacyOption($event)"
               class="mt-2" />

          <div v-if="errors.privacy" class="text-danger text-left errors">
            <p>{{ errors.privacy }}</p>
          </div>

        </div>

        <div class="form-group">

          <label>
            <i class="icofont-safety-hat mr-1"></i>
            Select your Theater Video Player Access
          </label>
          <div class="clearfix"></div>

          <span>You can config who can control the video player, for example: Pause, Play, Forward</span>
          <DropdownMenu :config="player_access_config"
               @setSelectedOption="setNewVideoPlayerAccessOption($event)"
               class="mt-2" />

          <div v-if="errors.player_access_control" class="text-danger text-left errors">
            <p>{{ errors.player_access_control }}</p>
          </div>

        </div>

        <VueLoadingButton 
                                                   ref="saveBtn"
                                                   @click.native="saveChanges" 
                                                   type="button" 
                                                   :loading="saveLoading"
                                                   class="btn btn-primary m-2 pull-right" 
                                                   :disabled="!hasChanges">
        Save changes
        </VueLoadingButton>

      </div>

    </div>

  </div>

</template>

<style>

.succeed-upload-subtitle {
  padding: 6px;
  font-size: 20px;
}

.file-uploading-spinner.ml-2 {
  padding: 7px 0;
}

.bg-accent-dark {
  background: #131212;
}

.default-preview-banner {
  background: #333333;
  width: 150px;
  height: 60px;
  border-radius: 4px;
  text-align: center;
  align-content: center;
  display: grid;
  font-size: 40px;
  color: #131212;
}

.preview-change {
  float: right;
  font-size: 39px;
  color: white;
  padding: 0 15px;
  align-items: center;
  align-content: center;
  display: flex;
}

span.preview-title {
  width: 360px;
  text-align: left;
}

.loading-media-sources {
  margin: 20px;
}

.settings-contents {
  display: flow-root;
}

.settings-menu {
  width: 210px;
  /*background: #151515;*/
  margin: 20px;
  height: 100vh;
}

.settings-menu > ul > li > a {
  width: 100%;
  margin: 5px 0;
  border-radius: 4px;
  padding: 4px 10px;
  float: left;
  text-decoration: none;
  color: #FFFFFF;
}

.settings-menu > ul > li > a > i {
  float: right;
  margin-top: 3px;
}

.settings-menu > ul > li > a:hover,
.settings-menu > ul > li > a.active {
  background: #316cff;
}

.settings-menu > ul {
  padding: 10px;
  margin: 0;
  list-style: none;
  background: #181818;
  display: grid;
  border-radius: 5px;
}

.form-dark > .form-group input.subtitle-language {
  float: left;
  background: #202020 !important;
}

button.choose-subtitle-btn:hover {
  background: #141313 !important;
  color: #6c757d;
}

.subtitles {
  margin: 8px 0;
}

button.choose-subtitle-btn {
  background: #202020;
  color: #6c757d;
  border-radius: 3px;
  border: none;
  padding: 7px 10px;
  width: 100%;
}

.subtitle {
  width: 100%;
  margin: 0 0 10px 0;
}

button.plus-subtitle-btn {
  background: #077bff;
  border: none;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 100;
  color: #ffffff;
  margin-left: 2px;
}

button.remove-subtitle-btn {
  border: none;
  padding: 5px 10px;
  background: transparent;
  color: #F44336;
}

.media-source-preview > img {
  width: 132px;
  border-radius: 3px;
  float: left;
}

</style>

<script>

import MediaSources from './MediaSources'
import VueLoadingButton from 'vue-loading-button'
import {proto} from 'casty-proto/pbjs/ws.bundle'
import DropdownMenu from './dropdown-menu/DropdownMenu'
import Spinner from './Spinner'
import RingLoader from './RingLoader'

export default {
  name: 'theater-settings',
  props: ['theater'],
  components: {
    VueLoadingButton,
    DropdownMenu,
    MediaSource,
    RingLoader,
    Spinner,
    MediaSources,
  },
  data() {
    return {

      show_all_media_sources: false,

      hasChanges: false,
      saveLoading: false,

      theater_description: null,

      newMediaSourceUri: null,
      newMediaSource: {
        loading: false,
        loaded: false,
        data: {},
      },

      saveNewMediaLoading: false,

      mediaSourcesLoading: false,
      mediaSources: [],

      errors: {},

      poster: null,
      movie_banner: null,
      movie_file: null,

      subtitles: [
        {
          lang: "",
          file: {},
          uploading: false,
          uploaded: false,
        },
      ],
      subtitlesLoading: true,

      privacy: {},
      privacy_config: {
        options: [
          {
            id: proto.PRIVACY.PUBLIC,
            value: "Public",
            icon: "icofont-globe",
            description: "Everybody has access to your theater!"
          },
          {
            id: proto.PRIVACY.FRIENDS,
            value: "Friends",
            icon: "icofont-users",
            description: "Only your friends have access to your theater!"
          },
          {
            id: proto.PRIVACY.PRIVATE,
            value: "Private",
            icon: "icofont-user",
            description: "Only you have access to your theater!"
          },
        ],
        placeholder: "Public",
        borderRadius: "3px",
        backgroundColor: "#131212",
        border: "none",
        textColor: "#eeeeee",
        textSize: 14,
      },

      player_access_control: {},
      player_access_config: {
        options: [
          {
            id: proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_EVERYONE,
            value: "Public",
            icon: "icofont-globe",
            description: "Everybody can control theater's video player!"
          },
          {
            id: proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_FRIENDS,
            value: "Friends",
            icon: "icofont-users",
            description: "Only your friends have access to theater's video player!"
          },
          {
            id: proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_USER,
            value: "Private",
            icon: "icofont-user",
            description: "Only you can control theater's video player!"
          },
        ],
        placeholder: "Public",
        borderRadius: "3px",
        backgroundColor: "#131212",
        border: "none",
        textColor: "#eeeeee",
        textSize: 14,
      },

      changes: {
        description: false,
        privacy: false,
        video_player_access: false,
      },

    }
  },
  watch: {
    theater_description(description) {
      this.$parent.$emit('theater-description-changed', description);
      if (description !== null && description !== "") {
        if (this.theater.description !== description) {
          this.changes.description = true
        } else {
          this.changes.description = false
        }
      }
    },
    changes: {
      deep: true,
      handler() {
        this.checkChanges();
      },
    },
  },
  methods: {
    setSubtitlesLoading(loading) {
      this.subtitlesLoading = loading
    },

    setSubtitles(subtitles) {
      this.setSubtitlesLoading(false)
      if (subtitles.length > 0) {
        this.subtitles = []
        subtitles.forEach(subtitle => {
          subtitle.uploading = false
          subtitle.uploaded = false
          subtitle.fromApi = true
          subtitle.file = {name: `${subtitle.file}.vtt`}
          this.subtitles.push(subtitle)
        });
      } else {
        this.subtitles = [
          {
            lang: "",
            file: {},
            uploading: false,
            uploaded: false,
          },
        ]
      }
    },

    async saveChanges() {
      const data = {
        form: {
          description: this.theater_description,
          privacy: this.privacy.id,
          video_player_access: this.player_access_control.id,
        },
        changes: this.changes,
      }
      this.saveLoading = true;
      await this.$store.dispatch('updateTheater', data).then(response => {

        if (this.changes.description) {
          this.theater.description = data.form.description
          this.changes.description = false
        }
        if (this.changes.privacy) {
          this.theater.privacy = data.form.privacy
          this.changes.privacy = false
        }
        if (this.changes.video_player_access) {
          this.theater.video_player_access = data.form.video_player_access
          this.changes.video_player_access = false
        }

        this.$notify({
          group: 'dashboard',
          type: 'success',
          text: "Theater updated successfully!",
          title: "Success",
          duration: 2000,
        });

      }).catch(() => {
        this.$notify({
          group: 'dashboard',
          type: 'error',
          text: "Validation error!",
          title: "Failed",
          duration: 2000,
        });
      })

      this.saveLoading = false;
    },

    checkChanges() {
      if(this.changes.description || this.changes.video_player_access || this.changes.privacy) {
        this.hasChanges = true
      } else {
        this.hasChanges = false
      }
    },

    setNewPrivacyOption(selectedOption) {
      this.privacy_config.placeholder = selectedOption.value;
      this.privacy = selectedOption;
      if (this.theater.privacy !== selectedOption.id) {
        this.changes.privacy = true
      } else {
        this.changes.privacy = false
      }
    },

    setNewVideoPlayerAccessOption(selectedOption) {
      this.player_access_config.placeholder = selectedOption.value;
      this.player_access_control = selectedOption;
      if (this.theater.video_player_access !== selectedOption.id) {
        this.changes.video_player_access = true
      } else {
        this.changes.video_player_access = false
      }
    },

    onDropInMovieBanner(e) {
      e.stopPropagation();
      e.preventDefault();
      let files = e.dataTransfer.files;
      this.readMovieBannerFile(files[0]);
    },

    onChangeMovieBanner(e) {
      let files = e.target.files;
      this.readMovieBannerFile(files[0]);
    },

    readMovieBannerFile(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.movie_banner = e.target.result;
        this.poster       = file;
      };
      reader.readAsDataURL(file);
    },

    removeBanner() {
      this.movie_banner = null;
    },

    onClickFileInput(e) {
      $(e.target).find("input[type=file]").trigger("click");
    },

    openMediaSourcesModal() {
      this.$refs.mediaSources.openMediaSourcesModal();
    },

    async onChangeSubtitle(e, index) {
      let files = e.target.files;
      this.subtitles[index].file = files[0];
      this.subtitles[index].uploading = true

      const form = {
        subtitle: this.subtitles[index],
        media_source_id: this.theater.media_source.id,
      }

      await this.$store.dispatch('uploadSubtitle', form).then(() => {
        this.subtitles[index].uploaded = true
      }).catch(console.log)

      this.subtitles[index].uploading = false
    },

    onClickAddSubtitle(index) {
      if (this.subtitles[index].lang === '') {
        $(`input#subtitle-lang-${index}`).focus()
        $(`input#subtitle-lang-${index}`)
          .addClass('shake animated')
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
            $(`input#subtitle-lang-${index}`).removeClass('shake animated');
          });
      } else {
        $(`input#subtitle-${index}`).trigger("click");
      }
    },

    removeSubtitle(index) {
      if (index === 0) {
        if (this.subtitles.length > 1) {
          this.subtitles.splice(index, 1)
        } else {
          this.subtitles[index].lang = ""
          this.subtitles[index].file = {}
          this.subtitles[index].uploading = false
          this.subtitles[index].uploaded = false
        }
      } else {
        this.subtitles.splice(index, 1)
      }
    },

    addSubtitle() {
      if (this.subtitles.length < 4) {
        this.subtitles.push({
          lang: "",
          file: {},
          uploading: false,
          uploaded: false,
        });
      }
    },

  },
  mounted() {
    this.theater_description = this.theater.description;

    switch (this.theater.privacy) {
      case proto.PRIVACY.PRIVATE:
        this.privacy = {
          id: proto.PRIVACY.PRIVATE,
          value: "Private",
          icon: "icofont-user",
          description: "Only you have access to your theater!"
        };
        this.privacy_config.placeholder = "Private";
        break
      case proto.PRIVACY.FRIENDS:
        this.privacy = {
          id: proto.PRIVACY.FRIENDS,
          value: "Friends",
          icon: "icofont-users",
          description: "Only your friends have access to your theater!"
        };
        this.privacy_config.placeholder = "Friends";
        break
      case proto.PRIVACY.PUBLIC:
        this.privacy = {
          id: proto.PRIVACY.PUBLIC,
          value: "Public",
          icon: "icofont-globe",
          description: "Everybody has access to your theater!"
        };
        this.privacy_config.placeholder = "Public";
        break
    }

    switch (this.theater.video_player_access) {
      case proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_USER:
        this.player_access_control = {
          id: proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_USER,
          value: "Private",
          icon: "icofont-user",
          description: "Only you can control theater's video player!"
        };
        this.player_access_config.placeholder = "Private";
        break
      case proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_FRIENDS:
        this.player_access_control = {
          id: proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_FRIENDS,
          value: "Friends",
          icon: "icofont-users",
          description: "Only your friends have access to theater's video player!"
        };
        this.player_access_config.placeholder = "Friends";
        break
      case proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_EVERYONE:
        this.player_access_control = {
          id: proto.VIDEO_PLAYER_ACCESS.ACCESS_BY_EVERYONE,
          value: "Public",
          icon: "icofont-globe",
          description: "Everybody can control theater's video player!"
        };
        this.player_access_config.placeholder = "Public";
        break
    }

  },
}

</script>
