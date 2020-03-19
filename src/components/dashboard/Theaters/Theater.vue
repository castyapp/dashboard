<template>

    <div>

        <div class="members">

            <div class="title-border-bottom pb-2">
                <strong class="side-component-title">
                    <div class="users_title">
                        <i class="icofont-users text-primary mr-2"></i>
                        Members
                    </div>
                </strong>
            </div>

            <div class="member" :key="member.id" v-for="member in members">
                <div class="online">
                    <img :src="apiBaseUrl + '/uploads/avatars/' + member.avatar + '.png'"
                         class="theater_connected_user_avatar"
                         :alt="member.fullname" />
                    <span class="user_name">{{ member.fullname }}</span>
                </div>
            </div>

            <div v-if="loadingMembers" class="members-loading">
                <VueContentLoading :width="230" :height="55" primary="#333" secondary="#181818" :key="i" v-for="i in 10">
                    <circle cx="17" cy="17" r="17"></circle>
                    <rect x="47" y="9" rx="9" ry="9" width="170" height="17"></rect>
                </VueContentLoading>
            </div>

        </div>

        <div class="theater-page">

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

            <VideoPlayer :theater="theater" v-if="ready" />
            <TheaterChat :theater="theater" :ready="ready" />

        </div>

    </div>

</template>

<style>

    .members {
        width: 200px;
        background: #181818;
        float: left;
        position: absolute;
        left: 65px;
        top: 0;
        height: 100%;
        z-index: 9;
        padding: 20px 10px 10px;
    }

    .members > .member {
        padding: 2px;
        border-radius: 4px;
        margin-bottom: 5px;
    }

    .members > .member:last-child {
        margin: 0;
    }

    .members > .member:hover {
        background: #1f1e1e;
    }

    .theater-page {
        padding-left: 210px !important;
        padding-top: 10px;
        margin-right: 5px;
    }

    img.theater_connected_user_avatar {
        width: 25px;
        background: #FFFFFF;
        border-radius: 50%;
        float: left;
        margin-right: 5px;
    }

    span.user_name {
        font-size: 14px;
        font-weight: bold;
    }

</style>

<script>

    import $ from "jquery";
    import {bus} from "../../../main";
    import {websocket} from "../../../store/ws";
    import VideoPlayer from "../../models/VideoPlayer";
    import TheaterChat from "../../models/TheaterChat";
    import {VueContentLoading} from 'vue-content-loading';

    export default {
        components: {
            VideoPlayer,
            TheaterChat,
            VueContentLoading
        },
        data() {
            return {
                socket: null,
                theater: {},
                ready:   false,
                members: [],
                loadingMembers: true,
            }
        },
        methods: {
            changeMemberState(user, state) {
                let userIndex = this.findMember(user.id);
                if (state === 1){
                    if (userIndex === -1){
                        this.members.push(user);
                    }
                } else {
                    if (userIndex > -1) {
                        this.members.splice(userIndex, 1);
                    }
                }
            },
            findMember(user_id) {
                for (let index = 0; index <= this.members.length - 1; index++){
                    if (this.members[index].id === user_id){
                        return index
                    }
                }
                return -1
            }
        },
        mounted() {

            let theater_id = this.$route.params.theater_id;

            bus.$on("new-theater-members", members => {
                if (members.length > 0){
                    this.members = members;
                }
                this.loadingMembers = false;
            });

            this.socket = websocket.theater.connect(theater_id);

            bus.$on('new-theater-member', ({user, state}) => {
                this.changeMemberState(user, state);
            });

            this.$parent.$emit('fl:status', 'close');
            $(".main-container").css( { marginRight : "300px" } );

            this.$store.dispatch("getTheater", theater_id).then(response => {
                this.ready = true;
                this.theater = response.data.result;
            }).catch(console.log);
        },
        destroyed() {
            this.members = [];
            this.$parent.$emit('fl:status', 'open');
            $(".main-container").css( { marginRight : "250px" } );
            this.socket.disconnect();
            bus.$emit("theater-disconnected", this.socket);
        },
    }

</script>