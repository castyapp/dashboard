<template>

    <div class="media_sources_actions">

        <div class="modal modal-dark fade" id="removeMediaSourceModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" v-if="selectedForRemove !== null">
                    <div class="modal-body pb-0">
                        <h5>
                            <span class="clearfix">Are you sure you want remove</span>
                            <span class="th-bold-title">
                                {{ getStringSub(selectedForRemove.title, 45) }}
                            </span>
                        </h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-danger" data-dismiss="modal">
                            No, Never mind!
                        </button>
                        <VueLoadingButton
                            @click.native="removeMediaSource"
                            :loading="removeLoading"
                            class="btn btn-outline-success"
                            :disabled="this.selectedForRemove === null">
                            <span>Yes, Im sure!</span>
                        </VueLoadingButton>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal modal-dark fade" id="mediaSource" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">

                    <div class="modal-body pb-0">

                        <h5>Manage your media sources</h5>

                        <form class="form-dark">
                            <div class="form-group p-0">
                                <label for="media_source" class="pull-left">
                                    <i class="icofont-ui-movie mr-1"></i>
                                    Media Source Uri
                                </label>
                                <input type="text"
                                    class="form-control"
                                    id="media_source"
                                    v-model="newMediaSourceUri"
                                    placeholder="Enter your media source uri here [youtube|spotify|download-uri]"
                                    required="required"
                                    autocomplete="off" />
                            </div>
                        </form>

                        <div class="media-sources">

                            <div v-if="newMediaSource.loading">
                                Loading...
                            </div>

                            <div class="media-source-preview mb-3" v-if="newMediaSource.loaded">

                                <img v-if="newMediaSource.data.banner !== undefined" 
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
                                            {{ $parent.getHumanDuration(newMediaSource.data.length * 1000) }}
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

                            <div class="media-sources-icons">
                                <i class="icofont-spotify"></i>
                                <i class="icofont-youtube-play"></i>
                                <i class="icofont-film"></i>
                            </div>

                            <VueLoadingButton
                                v-if="!loadedMediaSources"
                                @click.native="loadMediaSources"
                                :loading="mediaSourcesLoading"
                                type="button"
                                class="btn btn-outline-primary mb-4">
                                MediaSource History
                            </VueLoadingButton>
                            
                            <div class="media-sources-list" v-if="!mediaSourcesLoading && showMediaSources">

                                <MediaSource class="selected-media-source"
                                    :mediaSource="theater.media_source"
                                    :selected="true" />

                                <MediaSource :key="'media-source-' + ms.id"
                                    v-for="ms in mediaSources"
                                    :selectedMediaSourceId="theater.media_source.id"
                                    :mediaSource="ms" 
                                    :selected="false" />

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style>

    span.selected-preview-title.new-media-source-title {
        margin: 12px 5px;
        font-size: 17px;
    }

    .media-sources-list {
        width: 100%;
        margin-bottom: 15px;
        max-height: 400px;
        overflow-y: auto;
        padding: 10px;
    }

    .media-sources-list > .media-source {
        width: 100%;
        background: #131212;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        display: flow-root;
        align-content: center;
    }

    .media-source > button {
        float: right;
        padding: 1px 7px;
        margin-top: 3px;
    }

    .media-sources-list > span.media-source-title {
        float: left;
        margin-top: 5px;
    }

    span.media-source-title {
        text-align: left;
    }

    .badge.badge-primary.external-link > a {
        color: #fff;
    }

    .badge.badge-primary.external-link {
        margin-left: 5px;
    }

    .media-source-details > img {
        width: 60px;
        height: 35px;
        border-radius: 4px;
        margin-right: 10px;
    }

    .media-source-details {
        float: left;
        align-items: center;
        display: flex;
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

    .media-source.selected-media-source {
        background: #1a7bff;
    }

    .selected-btn {
        margin: 5px !important;
    }

    .editable-preview-title,
    .form-dark > .form-group.editable-preview-title input {
        background: #181818 !important;
        cursor: pointer;
    }

    .media-sources-icons {
        margin: 20px 0;
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

</style>

<script>

    import $ from 'jquery'
    import MediaSource from '../models/MediaSource'
    import VueLoadingButton from 'vue-loading-button'

    export default {
        name: "MediaSources",
        props: ['theater'],
        components: {
            MediaSource,
            VueLoadingButton,
        },
        data() {
            return {

                hasSpotifyConnection: null,
                spotifyConnection: null,

                loadedMediaSources: false,
                removeLoading: false,
                selectedForRemove: null,

                mediaSources: [],
                mediaSourcesLoading: false,
                newMediaSourceUri: null,
                newMediaSource: {
                    loading: false,
                    loaded: false,
                    data: {},
                },
                saveNewMediaLoading: false,
                showMediaSources: false,
            }
        },
        watch: {
            newMediaSourceUri() {
                if (this.newMediaSourceUri !== null && this.newMediaSourceUri !== ""){
                    this.parseMediaSourceUri()
                } else {
                    this.newMediaSource.loading = false;
                    this.newMediaSource.loaded = false;
                    this.newMediaSource.data = {};
                }
            },
        },
        methods: {
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
                    this.newMediaSource.loading = false;
                    this.newMediaSource.loaded = false;
                    this.newMediaSource.data = {};
                    this.newMediaSourceUri = null;

                    if (!this.showMediaSources) {
                        this.loadMediaSources()
                    }

                }).catch(() => {
                    this.saveNewMediaLoading = false;
                });

            },

            getSpotifyConnection() {
                return new Promise((resolve, reject) => {
                    this.$store.dispatch('userConnection', 'spotify').then(response => {
                        const connection = response.data.result[0]
                        resolve(connection)
                        this.hasSpotifyConnection = true;
                        this.spotifyConnection = connection;
                    }).catch(err => {
                        reject(err)
                        this.hasSpotifyConnection = false;
                        this.spotifyConnection = null;
                    })
                });
            },

            async parseSpotifyEpisode(episode_id) {
                if (this.hasSpotifyConnection === null) {
                    await this.getSpotifyConnection();
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
                            length: episode.duration_ms / 1000,
                            banner: episode.images[1].url,
                            type:   6,
                            uri:   `https://open.spotify.com/episode/${episode_id}`,
                        };
                        this.newMediaSource.loading = false;
                    }).catch(() => {
                        this.newMediaSource.loading = false;
                    });
                } else {
                    console.log("You need connect your spotify account");
                    this.newMediaSource.loading = false;
                }
            },

            async parseSpotifyTrack(track_id) {
                if (this.hasSpotifyConnection === null) {
                    await this.getSpotifyConnection();
                }
                if (this.hasSpotifyConnection) {
                    // parsing here
                    const payload = { 
                        service: 'tracks', 
                        id: track_id, 
                        access_token: this.spotifyConnection.access_token,
                    };
                    await this.$store.dispatch('getSpotifyTrack', payload).then(response => {
                        const track = response.data;
                        this.newMediaSource.loaded = true;
                        this.newMediaSource.data = {
                            title:  track.name,
                            length: Math.round(track.duration_ms) / 1000,
                            banner: track.album.images[1].url,
                            type:   6,
                            uri:   `https://open.spotify.com/track/${track_id}`,
                        };
                        this.newMediaSource.loading = false;
                    }).catch(() => {
                        this.newMediaSource.loading = false;
                    });
                } else {
                    console.log("You need connect your spotify account");
                    this.newMediaSource.loading = false;
                }
            },

            parseMediaSourceUri() {

                this.newMediaSource.loading = true;
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
                            default: this.newMediaSource.loading = false; break;
                        }
                    }
                } else {
                    let urlParsed = new URL(this.newMediaSourceUri)
                    if (urlParsed.hostname === "open.spotify.com") {
                        const parsed = urlParsed.pathname.split("/")
                        switch (parsed[1]) {
                            case "episode": this.parseSpotifyEpisode(parsed[2]); break;
                            case "track": this.parseSpotifyTrack(parsed[2]); break;
                            default: this.newMediaSource.loading = false; break;
                        }
                    } else {
                        this.$store.dispatch("parseMediaSourceUri", this.newMediaSourceUri).then(response => {
                            this.newMediaSource.loaded = true;
                            this.newMediaSource.data = response.data.result;
                            this.newMediaSource.loading = false;
                        }).catch(() => {
                            this.newMediaSource.loading = false;
                        });
                    }
                }
            },

            loadMediaSources() {

                this.showMediaSources = true;
                this.mediaSourcesLoading = true;
                this.mediaSources = [];
                this.loadedMediaSources = false;

                this.$store.dispatch("loadMediaSources").then(response => {
                    this.mediaSources = response.data.result;
                    this.mediaSourcesLoading = false;
                    this.loadedMediaSources = true;
                }).catch(() => {
                    this.mediaSourcesLoading = false;
                });

            },

            openMediaSourcesModal() {
                $("#mediaSource").modal();
            },

            removeMediaSource() {

                this.removeLoading = true;

                this.$store.dispatch("removeMediaSource", this.selectedForRemove.id).then(() => {

                    this.$notify({
                        group: 'dashboard',
                        type: 'success',
                        text: "MediaSource removed successfully!",
                        title: "Success",
                        duration: 2000,
                    });

                    this.removeMediaSourceFromArray(this.selectedForRemove);

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

            removeMediaSourceFromArray(media_source) {
                const currentIndex = this.mediaSources.findIndex(ms => ms.id === media_source.id);
                this.mediaSources.splice(currentIndex, 1)
            },

            showRemoveMediaSourceModal(media_source) {
                this.selectedForRemove = media_source;
                if (this.selectedForRemove != null){
                    $("#removeMediaSourceModal").modal();
                }
            },
            
        },
        mounted() {
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