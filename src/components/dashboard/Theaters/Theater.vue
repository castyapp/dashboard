<template>
    <div class="create_theater p-2">

        <div class="title-border-bottom pb-2">
            <strong class="side-component-title">
                <i class="icofont-ui-movie text-primary mr-2"></i>
                {{ theater.title }}
            </strong>
            <small class="border-left-title">
                Shared by: Josh
            </small>
        </div>

        <div class="clearfix"></div>

        <VideoPlayer :movie="theater.movie" v-if="ready" />
        <TheaterChat :theater="theater" v-if="ready" />

    </div>
</template>

<script>

    import $ from "jquery";
    import {bus} from "../../../main";
    import {websocket} from "../../../store/ws";
    import VideoPlayer from "../../models/VideoPlayer";
    import TheaterChat from "../../models/TheaterChat";

    export default {
        components: {
            VideoPlayer,
            TheaterChat
        },
        data() {
            return {
                user:    {},
                theater: {},
                ready:   false,
            }
        },
        mounted() {
            this.$parent.$emit('fl:status', 'close');
            this.user = this.$store.user;

            let theater_id = this.$route.params.theater_id;

            $(".main-container").css( { marginRight : "320px" } );
            websocket.theater.connect(this.$route.params.theater_id);

            this.$store.dispatch("getTheater", theater_id).then(response => {
                this.ready = true;
                this.theater = response.data.result;
            }).catch(console.log);
        },
        destroyed() {
            this.$parent.$emit('fl:status', 'open');
            $(".main-container").css( { marginRight : "250px" } );
            websocket.theater.disconnect();
        },
    }

</script>