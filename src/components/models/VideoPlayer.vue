<template>
    <div class="vide-player">
        <video id="theater" class="full-width"></video>
    </div>
</template>

<script>

    import "plyr/dist/plyr.css";
    import Plyr from 'plyr';

    export default {
        props: ['movie'],
        data() {
            return {
                player: null,
            }
        },
        mounted() {

            this.player = new Plyr('#theater', {
                poster: `${this.apiBaseUrl}/uploads/posters/${this.movie.poster}.png`,
            });

            this.player.source = {
                type: 'video',
                sources: [
                    {
                        src: this.movie.movie_uri,
                        type: 'video/mp4',
                        size: 720,
                    },
                ],
            };
        }
    }

</script>