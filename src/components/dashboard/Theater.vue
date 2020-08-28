<template>

    <div class="theater-div">

        <div class="v-loading">
            <EllipsisLoader :loading="theaterLoading" class="v-loading" :color="'#316bff'" />
        </div>

        <div class="theater-page" v-if="ready">

            <div class="theater-title-container pb-2">
                
                <div class="side-component-title">

                    <img :src="this.cdnUrl + '/avatars/' + this.theater.user.avatar + '.png'"
                         :alt="this.theater.user.fullname"
                         class="theater-avatar" />

                    <div class="theater-top-details">
                        <strong class="ml-1">
                            <i class="icofont-verification-check verified-badge" v-if="theater.user.verified"></i>
                            {{ theater.user.fullname }}
                        </strong>
                        <small class="theater-description">
                            {{ theater_description }}
                        </small>
                    </div>

                </div>

                <div class="theater-top-actions">

                    <div v-if="!loggedIn">
                        <VueLoadingButton
                                @click.native="goToLogin"
                                type="button"
                                class="btn-theater-action">
                            <i class="icofont-plus"></i>
                            Login To Follow
                        </VueLoadingButton>
                    </div>

                    <div v-else-if="user.id !== theater.user.id">
                        <VueLoadingButton
                                v-if="theater.followed"
                                @click.native="unfollowTheater"
                                :loading="followLoading"
                                type="button"
                                class="btn-theater-action bg-success">
                            <i class="icofont-check"></i>
                            Following
                        </VueLoadingButton>
                        <VueLoadingButton v-else
                                @click.native="followTheater"
                                :loading="followLoading"
                                type="button"
                                class="btn-theater-action">
                            <i class="icofont-plus"></i>
                            Follow
                        </VueLoadingButton>
                    </div>

                    <div v-else>
                        <VueLoadingButton
                                @click.native="scrollTo('#settings')"
                                type="button"
                                class="btn-theater-action">
                            <i class="icofont-gears"></i>
                            Settings
                        </VueLoadingButton>
                    </div>

                </div>

            </div>

            <div class="clearfix"></div>

            <VideoPlayer :theater="theater" :subtitles="subtitles" ref="VideoPlayer" />
            <TheaterChat :ready="ready" :theater="theater" />
            <TheaterSettings :theater="theater" v-if="loggedIn && theater.user.id === user.id" ref="TheaterSettings" />

        </div>

    </div>

</template>

<style>

    .media-source-preview > img {
        width: 100px;
        border-radius: 3px;
        float: left;
    }

    .media-source-preview {
        background: #131212;
        margin-top: 20px;
        border-radius: 4px;
        padding: 10px;
        display: flex;
        width: 100%;
    }

    .preview-info {
        margin: 5px 10px;
        width: 100%;
    }

    .preview-info > span {
        float: left;
        clear: both;
    }

    .preview-source-icon {
        float: right;
        font-size: 39px;
        color: white;
        padding: 0 15px;
    }

</style>

<style scoped>

    .form-group {
        margin-bottom: 0 !important;
    }

    button.btn-follow {
        padding: 3px 5px;
        margin-top: 5px !important;
    }

    .theater-top-actions {
        position: absolute;
        right: 315px;
        top: 17px;
    }

    .theater-top-details {
        display: block;
        float: left;
        margin-left: 5px;
    }

    img.theater-avatar {
        width: 40px;
        background: #151515;
        float: left;
        background: #FFFFFF;
        border-radius: 15px;
    }

    small.theater-description {
        clear: both;
        display: flex;
        padding-left: 5px;
    }

    img.theater_connected_user_avatar {
        width: 25px;
        background: #272929;
        border-radius: 50%;
        float: left;
        margin-right: 6px;
    }

    span.user_name {
        font-size: 14px;
        font-weight: bold;
    }

    .th-invite-btn {
        padding: 1px 5px !important;
        margin: -7px 0 !important;
    }

    .theater-title-container {
        padding: 10px;
        display: flex;
    }

    .form-dark > .form-group input.subtitle-language {
        float: left;
        background: #202020 !important;
    }

    button.choose-subtitle-btn:hover {
        background: #141313 !important;
        color: #6c757d;
    }

    .subtitles {
        margin: 8px 0;
    }

    button.choose-subtitle-btn {
        background: #202020;
        color: #6c757d;
        border-radius: 3px;
        border: none;
        padding: 7px 20px;
        margin-left: 10px;
    }

    .subtitle {
        width: 100%;
        margin: 0 0 10px 0;
    }

    button.plus-subtitle-btn {
        background: #077bff;
        border: none;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 100;
        color: #ffffff;
        margin-left: 2px;
    }

    button.remove-subtitle-btn {
        border: none;
        padding: 5px 15px;
        background: transparent;
        color: #F44336;
    }

</style>

<script>

    import $ from "jquery";
    import {proto} from 'casty-proto/pbjs/ws.bundle'
    import TheaterWebsocket from '../../store/theater.ws'
    import {EllipsisLoader} from 'vue-spinners-css'
    import VideoPlayer from '../models/VideoPlayer'
    import TheaterChat from '../models/TheaterChat'
    import VueLoadingButton from 'vue-loading-button'
    import TheaterSettings from '../models/TheaterSettings'

    export default {
        components: {
            VideoPlayer,
            TheaterChat,
            VueLoadingButton,
            TheaterSettings,
            EllipsisLoader
        },
        data() {
            return {
                socket: null,
                theater: {},
                ready:   false,
                members: [],
                theater_description: null,
                theaterLoading: false,
                loadingMembers: true,
                loading: false,
                followLoading: false,
                mediaSourceUri: null,
                mediaSourceLoading: false,
                subtitles: [],
                poster: null,
                errors: {},
            }
        },
        methods: {
            getStateName(state) {
                switch (state) {
                    case 1:  return "online";
                    case 2:  return "busy";
                    case 3:  return "idle";
                    default: return "offline"
                }
            },
            scrollTo(elementId) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(elementId).offset().top
                }, 500);
            },
            goToLogin() {
                this.$router.push({ path: '/login' });
            },
            followTheater() {
                this.followLoading = true;
                this.$store.dispatch("followTheater", this.theater.id).then(response => {
                    this.$bus.$emit('new-theater-followed', this.theater);
                    this.theater.followed = true;
                    this.followLoading = false;
                }).catch(err => {
                    console.log("Could not follow!");
                    this.followLoading = false;
                })
            },
            unfollowTheater() {
                this.followLoading = true;
                this.$store.dispatch("unfollowTheater", this.theater.id).then(response => {
                    this.$bus.$emit('new-theater-unfollowed', this.theater);
                    this.theater.followed = false;
                    this.followLoading = false;
                }).catch(err => {
                    console.log("Could not unfollow!");
                    this.followLoading = false;
                })
            },
            loadTheater(resolve = () => {}) {
                this.$store.dispatch('getTheater', this.$route.params.user).then(theater => {
                    if (theater.followed === undefined){
                        theater.followed = false
                    }
                    this.theater = theater;
                    this.theater_description = this.theater.description
                    resolve(theater)
                }).catch(() => {
                    this.theaterLoading = false;
                });
            },
            hasMediaSource() {
                return Object.keys(this.theater.media_source).length > 0
            }
        },
        mounted() {

            if (this.loggedIn) {
                this.$bus.$emit('updated_friends_list_state', 'close');
            }

            this.$on(proto.EMSG[proto.EMSG.THEATER_UPDATED], () => {
                this.loadTheater()
            });

            this.theaterLoading = true;
            this.loadTheater(theater => {

                this.socket = new TheaterWebsocket(this).connect(theater.id);
                this.ready = true;
                this.theaterLoading = false;

                this.$on('new-theater-member', ({user, state}) => {
                    console.log(`New theater member state: ${user}:${state}`);
                });

                this.$on("new-theater-members", members => {
                    if (members.length > 0){
                        this.members = members;
                        console.log(`New theater members:`, members);
                    }
                    this.loadingMembers = false;
                });

                if (this.$refs.TheaterSettings !== undefined) {
                    this.$refs.TheaterSettings.setSubtitlesLoading(true)
                }

                if (this.hasMediaSource()) {
                    this.$store.dispatch('getSubtitles', this.theater.media_source.id).then(subtitles => {
                        this.subtitles = subtitles
                        this.$refs.TheaterSettings.setSubtitles(subtitles)
                    }).catch(() => {
                        this.$refs.TheaterSettings.setSubtitles([])
                    })
                } else {
                    this.$refs.TheaterSettings.setSubtitles([])
                }

            })

            this.$on('theater-description-changed', desc => {
                this.theater_description = desc
            });

            this.$bus.$on("new-media-source", mediaSource => {
                this.$refs.TheaterSettings.setSubtitlesLoading(true)
                this.$store.dispatch('getSubtitles', mediaSource.id).then(subtitles => {
                    this.subtitles = subtitles
                    this.$refs.TheaterSettings.setSubtitles(subtitles)
                }).catch(() => {
                    this.$refs.TheaterSettings.setSubtitles([])
                })
            });

            this.$bus.$on('user-updated', updatedUser => {
                if (this.theater.user.id === updatedUser.id) {
                    this.theater.user = updatedUser
                }
            });

        },
        activated() {
            if (this.loggedIn) {
                this.$bus.$emit('updated_friends_list_state', 'close');
            }
        },
        destroyed() {
            this.members = [];
            if (this.socket !== null) {
                this.socket.disconnect();
            }
            if (this.loggedIn) {
                this.$bus.$emit('updated_friends_list_state', 'open');
            }
        }
    }

</script>