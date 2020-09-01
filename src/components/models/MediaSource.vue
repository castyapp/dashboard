<template>

    <div class="media-source" 
        :class="'media-source-' + getMediaSourceService(mediaSource)"
        v-if="mediaSource.id !== selectedMediaSourceId">

        <div class="media-source-details">

            <div class="pull-left">

                <div v-if="mediaSource.banner !== 'default'" class="banner-container">
                    <div :style="'background-image: url(' + cdnUrl + '/posters/' + mediaSource.banner + '.png' + ')'"></div>
                </div>

                <div v-else class="small-default-preview-banner">
                    <i class="icofont-ui-movie"></i>
                </div>

                <div class="badge service-badge external-link mr-3 ml-1">
                    <a :href="mediaSource.uri" target="_blank">
                        <i :class="getMediaSourceTypeIcon(mediaSource)"></i>
                        {{ getMediaSourceTypeName(mediaSource) }}
                    </a>
                </div>                
            </div>

            <div class="media-source-title-box">
                <span class="media-source-title pull-left" :class="{ 'no-artist': !mediaSource.artist}" :title="mediaSource.title">
                    {{ getStringSub(mediaSource.title, 50) }}
                </span>
                <span class="media-source-title pull-left" 
                    v-if="mediaSource.artist" :title="mediaSource.artist">
                    <small>By: {{ getStringSub(mediaSource.artist, 50) }}</small>
                </span>
            </div>

            <div class="ms-actions">
                <button
                    v-if="!selected"
                    @click="$parent.showRemoveMediaSourceModal(mediaSource)"
                    type="button"
                    class="pull-right media-trash-btn">
                    <i class="icofont-trash"></i>
                </button>
                <VueLoadingButton
                    v-if="!selected"
                    @click.native="select"
                    :loading="loading"
                    type="button"
                    class="btn btn-outline-primary m-2">
                    Select
                </VueLoadingButton>
                <div class="selected-btn pull-right" v-if="selected">
                    <i class="icofont-check"></i>
                    Selected
                </div>
            </div>

        </div>

    </div>

</template>

<style scoped>

    .small-default-preview-banner {
        background: #333333;
        width: 60px;
        height: 40px;
        border-radius: 4px;
        text-align: center;
        align-content: center;
        display: grid;
        font-size: 25px;
        color: #131212;
        margin-right: 10px;
    }

    button.media-trash-btn {
        background: transparent;
        border: none;
        color: #dc3545;
        margin: 5px;
    }

    .ms-actions > button {
        float: right;
        padding: 0px 5px;
        margin-top: 7px;
    }

    .banner-container {
        float: left;
        width: 60px;
        height: 60px;
        padding: 5px;
    }

    .banner-container > div {
        background-size: cover;
        height: 100%;
        width: 100%;
        border-radius: 6px;
        background-repeat: no-repeat;
    }

    .media-source-details {
        width: 100%;
    }

    .ms-actions {
        float: right;
        margin: 10px;
    }

    span.media-source-title {
        text-align: left;
    }

    .external-link {
        background: #1a7bff;
        margin: 20px 0;
    }

    /* .media-source-spotify {
        background: rgb(29, 185, 84);
    }

    .media-source-youtube {
        background: #ea4132;
    } */

    .service-badge > a {
        color: #fff;
        font-size: 13px;
    }

    .media-source-download-uri {
        background: #1a7bff;
    }

    .media-source-m3u8 {
        background: #1a7bff;
    }

    .media-source.selected-media-source {
        background: #1a7bff;
    }
    
    .selected-btn {
        display: grid;
        margin-right: 20px;
    }

    .media-source-title-box {
        margin: 6px 0;
        display: grid;
        float: left;
        height: 100%;
        align-items: center;
        align-content: center;
    }

    span.media-source-title.no-artist {
        margin: 12px 0;
    }

</style>

<script>

    import $ from 'jquery'
    import {proto} from 'casty-proto/pbjs/ws.bundle'
    import VueLoadingButton from 'vue-loading-button'

    export default {
        props: ['mediaSource', 'selectedMediaSourceId', 'selected'],
        data() {
            return {
                loading: false,
            }
        },
        components: {
            VueLoadingButton,
        },
        methods: {
            getMediaSourceService(mediaSource) {
                switch (mediaSource.type) {
                    case proto.MediaSource.Type.YOUTUBE: return "youtube";
                    case proto.MediaSource.Type.DOWNLOAD_URI: return "download-uri";
                    case proto.MediaSource.Type.SPOTIFY: return "spotify";
                    case proto.MediaSource.Type.M3U8: return "m3u8";
                    default: return "unknown";
                }
            },
            select() {
                this.loading = true;
                this.$store.dispatch("selectNewMediaSource", this.mediaSource.id).then(response => {
                    this.loading = false;
                    this.$bus.$emit('new-media-source', response.data.result);
                    $("#mediaSource").modal('hide');
                }).catch(() => {
                    this.loading = false;
                });
            },
        },
    }

</script>