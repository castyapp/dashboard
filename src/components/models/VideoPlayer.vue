<template>

    <div class="vide-player">

        <div v-if="!autoPlayEnabled" class="autoplay-warning">
            Consider enable auto-play on your browser!
        </div>

        <div v-else>
            <video id="theater" class="full-width"></video>
        </div>

        <small class="movie-creator" v-if="theater.movie.length !== undefined">
            <i class="icofont-clock-time"></i>
            <span>
                {{ secondsToHms(theater.movie.length) }}
            </span>
        </small>

    </div>

</template>

<style scoped>

    .autoplay-warning {
        background: #000000;
        padding: 170px;
        height: 400px;
        text-align: center;
        font-size: 22px;
        z-index: -1;
    }

</style>

<script>

    import "plyr/dist/plyr.css";

    import Plyr from 'plyr';
    import {bus} from "../../main";

    import canAutoPlay from 'can-autoplay';

    import {emit} from "./../../protocol/messages";
    import {enums, protobuf} from "../../protocol/protobuf/base";

    export default {
        props: ['theater'],
        data() {
            return {
                autoPlayEnabled: true,
                player: null,
            }
        },
        methods: {
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
            },
            mountVideoPlayer() {
                let socketConnection = this.$parent.socket.ws;

                this.player = new Plyr('#theater', {
                    poster: `${this.apiBaseUrl}/uploads/posters/${this.theater.movie.poster}.png`,
                    autoplay: false,
                });

                this.player.fromSocket = false;

                bus.$on(enums.EMSG[enums.EMSG.THEATER_PLAY], packet => {
                    let decoded = protobuf.TheaterVideoPlayer.decode(packet.data);
                    if (decoded.userId !== undefined) {
                        if (decoded.userId !== this.user.id) {
                            this.player.fromSocket = true;
                            this.player.currentTime = decoded.currentTime;
                            this.player.play();
                            console.log("Request to play at: ", decoded.currentTime);
                        }
                    }
                });

                bus.$on(enums.EMSG[enums.EMSG.THEATER_PAUSE], packet => {
                    let decoded = protobuf.TheaterVideoPlayer.decode(packet.data);
                    if (decoded.userId !== undefined) {
                        if (decoded.userId !== this.user.id) {
                            this.player.fromSocket = true;
                            this.player.currentTime = decoded.currentTime;
                            this.player.pause();
                            console.log("Request to pause at: ", decoded.currentTime);
                        }
                    }
                });

                this.player.on('play', () => {
                    console.log(`Played at ${this.player.currentTime}!`);
                    if (!this.player.fromSocket) {
                        emit(socketConnection, enums.EMSG.THEATER_PLAY, protobuf.TheaterVideoPlayer, {
                            theaterId:     this.theater_id,
                            userId:        this.user.id,
                            currentTime:   this.player.currentTime,
                            source:        this.player.source,
                        });
                    } else {
                        this.player.fromSocket = false;
                    }
                });

                this.player.on('pause', () => {
                    console.log(`Paused at ${this.player.currentTime}!`);
                    if (!this.player.fromSocket) {
                        emit(socketConnection, enums.EMSG.THEATER_PAUSE, protobuf.TheaterVideoPlayer, {
                            theaterId:     this.theater_id,
                            userId:        this.user.id,
                            currentTime:   this.player.currentTime,
                            source:        this.player.source,
                        });
                    } else {
                        this.player.fromSocket = false;
                    }
                });

                // check if theater's movie type is youtube
                if (this.theater.movie.type === 1){
                    this.player.source = {
                        type: 'video',
                        sources: [
                            {
                                src: this.theater.movie.uri,
                                provider: 'youtube',
                            },
                        ],
                    };
                } else {
                    this.player.source = {
                        type: 'video',
                        sources: [
                            {
                                src: this.theater.movie.uri,
                                type: 'video/mp4',
                                size: 720,
                            },
                        ],
                    };
                }
            }
        },
        mounted() {
            this.mountVideoPlayer();
        }
    }

</script>