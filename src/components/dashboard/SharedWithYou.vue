<template>

    <div class="weekly-chart p-2">

        <div class="title-border-bottom pb-2">
            <strong class="side-component-title">
                <i class="icofont-share-boxed mr-2"></i>
                Shared With You
                <i class="icofont-refresh pull-right refresh-btn" @click="getTheaters"></i>
            </strong>
            <small class="border-left-title">
                You can see your theaters that people shared with you here.
            </small>
        </div>

        <div class="v-loading">
            <EllipsisLoader :loading="loading" class="v-loading" :color="'#316bff'" />
        </div>

        <div class="movie-list row" v-if="theaters.length > 0">

            <div :key="theater.id" class="card card-movie text-white" 
            v-for="theater in theaters">

                <div class="poster">

                    <div class="default-movie-poster" v-if="theater.movie.poster === 'default'">
                        <i class="icofont-file-mov"></i>
                    </div>

                    <img v-else :src="apiBaseUrl + '/uploads/posters/' + theater.movie.poster + '.png'" alt="Poster" />

                    <span class="movie-title">{{ theater.title }}</span>
                    <div class="movie-progress">
                        <div class="progress">
                            <div class="progress-bar"
                                 role="progressbar"
                                 style="width: 10%"
                                 aria-valuenow="100"
                                 aria-valuemin="0"
                                 aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>

                <div class="card-header">
                    <i class="play-btn icofont-play-alt-1 pull-left" @click="goToTheater(theater.id)"></i>
                    <strong class="pull-left ml-2">

                        <small class="movie-creator">
                            Created by:
                            <span v-if="theater.user.id === user.id">You</span>
                            <span v-else>{{ theater.user.fullname }}</span>
                        </small>

                        <small class="movie-creator">
                            Duration:
                            <span v-if="theater.movie.length === undefined">0</span>
                            <span v-else>{{ theater.movie.length }}</span>
                        </small>

                    </strong>
                    <i class="more-btn icofont-navigation-menu pull-right"
                       @click.prevent.stop="actionsBtn($event, theater)"></i>
                </div>

            </div>

        </div>

        <div class="alert alert-darker" v-if="!loading && theaters.length === 0 ">
            <i class="icofont-warning-alt"></i>
            Nobody shared any theaters with you!
        </div>

    </div>

</template>

<style scoped>

    .refresh-btn {
        cursor: pointer;
    }

    .default-movie-poster {
        width: 100%;
        height: 100%;
        text-align: center;
        align-items: center;
        align-content: center;
        display: grid;
    }

    .default-movie-poster > i {
        font-size: 100px;
        color: #316cff;
    }

    .movie-progress {
        position: absolute;
        width: 100%;
    }

    .progress {
        height: 3px !important;
        border-radius: 0;
        background-color: #333333;
    }

    .more-btn {
        padding: 5px;
        font-size: 18px;
        cursor: pointer;
        margin: 5px 0;
    }

    span.movie-title {
        position: absolute;
        left: 10px;
        top: 10px;
        background: #181818;
        border-radius: 5px;
        padding: 2px 5px;
    }

    .service > i {
        float: left;
    }

    .movie-list {
        margin: 0;
    }

    .poster {
        height: 215px;
    }

    .card-movie > .poster > img {
        width: 100%;
        height: 100%;
        border-top-right-radius: .25rem;
        border-top-left-radius: .25rem;
        background: #181818;
        object-fit: cover;
    }

    .card-movie {
        border: 0;
        background: #333 !important;
        margin: 10px;
        width: 250px;
    }

    .movie-creator {
        color: #6c757d;
        margin-bottom: 0;
        display: block;
    }

    .card > .card-header {
        background-color: transparent !important;
        border: 0;
        padding: 10px;
    }

    .play-btn {
        font-size: 30px;
        cursor: pointer;
        margin-top: 3px;
    }

    .play-btn:hover, .more-btn:hover {
        color: #316cff;
    }

</style>

<script>

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
        },
        methods: {
            goToTheater(theater_id) {
                this.$router.push({ path: `theater/${theater_id}` });
            },
            actionsBtn($event, theater) {
                this.$parent.$refs.menu.open($event, 'theater-actions', theater)
            },
            getTheaters() {
                this.loading = true;
                this.theaters = [];
                this.$store.dispatch("getTheaters").then(response => {
                    this.loading = false;
                    this.theaters = response.data.result;
                }).catch(() => {
                    this.loading = false;
                });
            },
        },
        mounted() {
            this.getTheaters();
        }
    }

</script>