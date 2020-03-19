<template>
    <div class="vide-player">
        <video id="theater" class="full-width"></video>
        <small class="movie-creator">
            <i class="icofont-clock-time"></i>
            <span v-if="theater.movie.length === undefined">N/A</span>
            <span v-else>{{ secondsToHms(theater.movie.length) }}</span>
        </small>
    </div>
</template>

<script>

    import "plyr/dist/plyr.css";

    import Plyr from 'plyr';
    import {bus} from "../../main";
    import {emit} from "./../../protocol/messages";
    import {enums, protobuf} from "../../protocol/protobuf/base";

    export default {
        props: ['theater'],
        data() {
            return {
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
            }
        },
        mounted() {

            let socketConnection = this.$parent.socket.ws;

            this.player = new Plyr('#theater', {
                poster: `${this.apiBaseUrl}/uploads/posters/${this.theater.movie.poster}.png`,
            });

            bus.$on(enums.EMSG[enums.EMSG.THEATER_PLAY], packet => {
                let decoded = protobuf.TheaterVideoPlayer.decode(packet.data);
                this.player.currentTime = decoded.currentTime;
                this.player.play();
                console.log("Request to play", decoded);
            });

            bus.$on(enums.EMSG[enums.EMSG.THEATER_PAUSE], packet => {
                let decoded = protobuf.TheaterVideoPlayer.decode(packet.data);
                this.player.currentTime = decoded.currentTime;
                this.player.pause();
                console.log("Request to pause", decoded);
            });

            this.player.on('play', () => {
                console.log(`Played at ${this.player.currentTime}!`);
                emit(socketConnection, enums.EMSG.THEATER_PLAY, protobuf.TheaterVideoPlayer, {
                    theaterId:     this.theater_id,
                    userId:        this.user.id,
                    currentTime:   this.player.currentTime,
                    source:        this.player.source,
                });
            });

            this.player.on('pause', () => {
                console.log(`Paused at ${this.player.currentTime}!`);
                emit(socketConnection, enums.EMSG.THEATER_PAUSE, protobuf.TheaterVideoPlayer, {
                    theaterId:     this.theater_id,
                    userId:        this.user.id,
                    currentTime:   this.player.currentTime,
                    source:        this.player.source,
                });
            });

            this.player.source = {
                type: 'video',
                sources: [
                    {
                        src: this.theater.movie.movie_uri,
                        type: 'video/mp4',
                        size: 720,
                    },
                ],
            };
        }
    }

</script>