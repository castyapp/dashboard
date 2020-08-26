<template>

    <div class="media-source" v-if="mediaSource.id !== selectedMediaSourceId">

        <div class="media-source-details">

            <img v-if="mediaSource.banner !== undefined && mediaSource.banner !== 'default'"
                :src="cdnUrl + '/posters/' + mediaSource.banner + '.png'"
                :alt="mediaSource.title" />

            <div v-else class="small-default-preview-banner">
                <i class="icofont-ui-movie"></i>
            </div>

            <span class="media-source-title">
                {{ mediaSource.title }}
            </span>
            <div class="badge badge-primary external-link">
                <a :href="mediaSource.uri" target="_blank">
                    <i :class="getMediaSourceTypeIcon(mediaSource)"></i>
                    {{ getMediaSourceTypeName(mediaSource) }}
                </a>
            </div>
        </div>

        <div class="selected-btn pull-right text-white" v-if="selected">
            <i class="icofont-check"></i>
            Selected
        </div>

        <button
            v-if="!selected"
            @click="select"
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

</style>

<script>

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
            select() {
                this.loading = true;
                this.$store.dispatch("selectNewMediaSource", this.mediaSource.id).then(response => {
                    this.loading = false;
                    this.$bus.$emit('new-media-source', response.data.result);
                }).catch(() => {
                    this.loading = false;
                });
            },
        },
    }

</script>