<template>

    <div class="media-source" v-if="mediaSource.id !== selectedMediaSourceId">

        <div class="media-source-details">

            <img v-if="mediaSource.banner !== undefined" :src="mediaSource.banner"
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

        <div class="selected-btn pull-right m-2 text-white" v-if="selected">
            <i class="icofont-check"></i>
            Selected
        </div>

        <VueLoadingButton
                v-else
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
                this.$store.dispatch("selectNewMediaSource", this.mediaSource.id).then(() => {
                    this.loading = false;
                    this.$bus.$emit('new-media-source', this.mediaSource);
                }).catch(() => {
                    this.loading = false;
                });
            },
        },
    }

</script>