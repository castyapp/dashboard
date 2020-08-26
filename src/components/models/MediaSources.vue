<template>

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
                                placeholder="Enter your media source uri here"
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
                            <i class="icofont-vimeo"></i>
                            <i class="icofont-film"></i>
                        </div>

                        <VueLoadingButton
                            v-if="mediaSources.length === 0"
                            @click.native="loadMediaSources"
                            :loading="mediaSourcesLoading"
                            type="button"
                            class="btn btn-outline-primary m-2">
                            MediaSource History
                        </VueLoadingButton>
                        
                        <div class="media-sources" v-if="!mediaSourcesLoading && showMediaSources">

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

</template>

<style>

    span.selected-preview-title.new-media-source-title {
        margin: 12px 5px;
        font-size: 17px;
    }

    .media-sources {
        width: 100%;
        margin-bottom: 15px;
    }

    .media-sources > .media-source {
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

    .media-source > span.media-source-title {
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
            newMediaSourceUri(value) {
                if (value !== null || value !== ""){
                    this.parseMediaSourceUri()
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

                }).catch(() => {
                    this.saveNewMediaLoading = false;
                });

            },
            parseMediaSourceUri() {

                this.newMediaSource.loading = true;
                this.newMediaSource.loaded = false;
                this.newMediaSource.data = {};

                this.$store.dispatch("parseMediaSourceUri", this.newMediaSourceUri).then(response => {
                    this.newMediaSource.loaded = true;
                    this.newMediaSource.data = response.data.result;
                    this.newMediaSource.loading = false;
                }).catch(() => {
                    this.newMediaSource.loading = false;
                });

            },
            loadMediaSources() {

                this.showMediaSources = true;
                this.mediaSourcesLoading = true;
                this.mediaSources = [];

                this.$store.dispatch("loadMediaSources").then(response => {
                    this.mediaSources = response.data.result;
                    this.mediaSourcesLoading = false;
                }).catch(() => {
                    this.mediaSourcesLoading = false;
                });

            },
            openMediaSourcesModal() {
                $("#mediaSource").modal();
                // this.loadMediaSources();
            },
        }     
    }

</script>