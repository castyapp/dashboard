<template>

    <div class="weekly-chart p-2">

        <div class="title-border-bottom pb-2">
            <strong class="side-component-title">
                <i class="icofont-library mr-2"></i>
                Library
                <i class="icofont-refresh pull-right refresh-btn" @click="getTheaters"></i>
            </strong>
            <small class="border-left-title">
                You can see your theaters here.
            </small>
        </div>

        <div class="v-loading">
            <EllipsisLoader :loading="loading" class="v-loading" :color="'#316bff'" />
        </div>

        <div class="movie-list row" v-if="theaters.length > 0">

            <div class="card card-movie text-white" v-for="theater in theaters">

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
                            <i class="icofont-user-alt-3"></i>
                            <div class="th-created-by">
                                {{ theater.user.fullname }}
                                <span v-if="theater.user.id === user.id">(You)</span>
                            </div>
                        </small>

                        <small class="movie-creator">
                            <i class="icofont-clock-time"></i>
                            <span v-if="theater.movie.length === undefined">N/A</span>
                            <span v-else>{{ secondsToHms(theater.movie.length) }}</span>
                        </small>

                    </strong>
                    <i class="more-btn icofont-navigation-menu pull-right"
                       @click.prevent.stop="actionsBtn($event, theater)"></i>
                </div>

            </div>

        </div>

        <div class="alert alert-darker" v-if="!loading && theaters.length === 0 ">
            <i class="icofont-warning-alt"></i>
            You have no theaters here yet!
            <router-link class="btn btn-primary btn-new-theater" :to="{ name: 'create_theater' }">
                <i class="icofont-plus"></i>
                Create a new one
            </router-link>
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
        background: #181818;
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

    .th-created-by {
        display: inline-block;
    }

    small.movie-creator {
        font-size: 13px;
        font-weight: bold;
    }

    small.movie-creator > i {
        margin-right: 3px;
        font-size: 15px;
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
            secondsToHms(d) {
                d = Number(d);
                let h = Math.floor(d / 3600);
                let m = Math.floor(d % 3600 / 60);
                let s = Math.floor(d % 3600 % 60);
                let hours = h.toString().length > 1 ? h.toString() : `0${h.toString()}`;
                let minutes = m.toString().length > 1 ? m.toString() : `0${m.toString()}`;
                let seconds = s.toString().length > 1 ? s.toString() : `0${s.toString()}`;
                if (h === 0){
                    return `${minutes}:${seconds}`;
                }
                return `${hours}:${minutes}:${seconds}`;
            }
        },
        mounted() {
            this.getTheaters();
        }
    }

</script>