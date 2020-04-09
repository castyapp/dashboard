<template>

    <div class="library p-2">

        <div class="title-border-bottom pb-2">
            <strong class="side-component-title">
                <i class="icofont-share-boxed mr-2"></i>
                Shared With You
                <i class="icofont-refresh pull-right refresh-btn" @click="loadTheaters"></i>
            </strong>
            <small class="border-left-title">
                You can see shared theaters here.
            </small>
        </div>

        <div class="v-loading">
            <EllipsisLoader :loading="loading" class="v-loading" :color="'#316bff'" />
        </div>

        <div class="movie-list row" v-if="theaters.length > 0">

            <TheaterCard :key="theater.id" :theater="theater" v-for="theater in theaters" />
            
        </div>

        <div class="alert alert-darker" v-if="!loading && theaters.length === 0 ">
            <i class="icofont-warning-alt"></i>
            Nobody shared any theaters with you!
        </div>

    </div>

</template>

<script>

    import TheaterCard from '../models/TheaterCard';
    import { EllipsisLoader } from 'vue-spinners-css';

    export default {
        data(){
            return {
                theaters: [],
                loading: true,
            }
        },
        components: {
            EllipsisLoader,
            TheaterCard,
        },
        methods: {
            loadTheaters() {
                this.loading = true;
                this.theaters = [];
                this.$store.dispatch("getSharedTheaters").then(response => {
                    this.loading = false;
                    this.theaters = response.data.result;
                }).catch(() => {
                    this.loading = false;
                });
            },
        },
        activated() {
            if (this.$route.params.reload) {
                this.loadTheaters();
            }
        },
        mounted() {
            this.loadTheaters();
        }
    }

</script>