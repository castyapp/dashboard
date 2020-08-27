<template>

    <div class="dashboard scrollable">

        <notifications group="dashboard" position="top center" :max="1" />

        <vue-topprogress ref="topProgress" />

        <Sidemenu />

        <FriendsList v-if="loggedIn" />

        <div class="main-container">
            <router-view name="theater" :key="$route.fullPath" ref="routerView" />
            <keep-alive>
                <router-view name="dashboard" :key="$route.fullPath" ref="routerView" />
            </keep-alive>
        </div>

        <ContextMenu ref="menu" v-if="loggedIn">

            <template slot-scope="{ type, contextData }">

                <div class="friend-menu" v-show="type === 'friend-menu'">

                    <ContextMenuItem @click.native="goToTheater(contextData)">
                        <i class="icofont-movie mr-1"></i>
                        Go to Theater
                    </ContextMenuItem>

                    <ContextMenuItem @click.native="startConversation(contextData)">
                        <i class="icofont-chat mr-1"></i>
                        Send Message
                    </ContextMenuItem>

                    <ContextMenuItem @click.native="$refs.menu.close">
                        <i class="icofont-ui-mute mr-1"></i>
                        Mute Notifications
                    </ContextMenuItem>

                    <ContextMenuItem @click.native="$refs.menu.close">
                        <i class="icofont-trash mr-1"></i>
                        Remove Friend
                    </ContextMenuItem>

                </div>

                <div class="friend-menu" v-show="type === 'theater-actions'">

                    <ContextMenuItem @click.native="goToTheater(contextData.id)">
                        <i class="icofont-ui-play mr-1"></i>
                        Go to theater
                    </ContextMenuItem>

                    <ContextMenuItem @click.native="inviteModal(contextData)">
                        <i class="icofont-arrow-left mr-1"></i>
                        Invite a Friend
                    </ContextMenuItem>

                    <!-- <ContextMenuItem @click.native="$refs.menu.close">
                       <i class="icofont-edit mr-1"></i>
                       Edit
                    </ContextMenuItem> -->

                    <ContextMenuItem class="remove-red-btn" @click.native="removeTheaterModal(contextData)">
                       <i class="icofont-trash mr-1"></i>
                       Remove
                    </ContextMenuItem>

                </div>

                <div class="usermenu-actions-menu" v-show="type === 'usermenu-actions'">

                    <div class="logged-in-as">
                        Logged in as: {{ user.fullname }}
                    </div>

                    <ContextMenuItem @click.native="redirect('settings')">
                        <i class="icofont-gears mr-1"></i>
                        Settings
                    </ContextMenuItem>

                    <ContextMenuItem @click.native="openLogoutModal()">
                        <i class="icofont-logout mr-1"></i>
                        Logout
                    </ContextMenuItem>

                </div>

            </template>

        </ContextMenu>

        <div class="modal modal-dark fade" id="removeTheaterModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" v-if="selectedForRemove !== null">
                    <div class="modal-body pb-0">
                        <h5>
                            Are you sure you want remove <span class="th-bold-title">{{ selectedForRemove.title }}</span> theater ?
                        </h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-danger" data-dismiss="modal">
                            No, Never mind!
                        </button>
                        <VueLoadingButton
                            @click.native="removeTheater"
                            :loading="removeLoading"
                            class="btn btn-outline-success"
                            :disabled="this.selectedForRemove === null">
                            <span>Yes, Im sure!</span>
                        </VueLoadingButton>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal modal-dark fade" id="logoutModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body pb-0">
                        <h5>
                            Are you sure you want to logout from this account?
                        </h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-danger" data-dismiss="modal">
                            No, im gonna stay!
                        </button>
                        <button type="button" class="btn btn-outline-success" @click="redirectWithModal('logout')">
                            Yeah, get me out!
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal modal-dark fade" id="inviteFriendToTheaterModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">

                <div class="modal-content" v-if="selectForInvite !== null">

                    <div class="modal-header pb-0">

                        <div class="pull-left pt-2">
                            <i class="icofont-user pull-left mr-2 invite-ico"></i>
                            <span>Invite your friends to theater</span>
                        </div>

                        <div class="pull-right">

                            <VueLoadingButton
                                    @click.native="inviteSelectedFriends"
                                    :loading="inviteLoading"
                                    class="btn btn-primary full-width"
                                    :disabled="selectedFriends.length === 0">
                                <span>Send</span>
                            </VueLoadingButton>

                        </div>

                    </div>

                    <div class="modal-body pr-3 pl-3 pt-0 m-0">

                        <Multiselect
                                class="mt-3"
                                v-model="selectedFriends"
                                :multiple="true"
                                placeholder="Search for a friend to send an invite"
                                :option-height="104"
                                :searchable="true"
                                :internal-search="true"
                                :hide-selected="true"
                                :clearOnSelect="true"
                                :custom-label="searchItemsLabel"
                                :track-by="'fullname'"
                                :options="friends">

                            <template slot="option" slot-scope="props">

                                <img class="option__image"
                                     :src="cdnUrl +  '/avatars/' + props.option.avatar + '.png'"
                                     :alt="props.option.fullname">


                                <div class="option__desc">
                                    <span class="option__title">
                                        {{ props.option.fullname }}
                                    </span>
                                </div>

                            </template>

                            <span slot="noResult">Oops! No friends found. Consider changing the search query.</span>

                        </Multiselect>

                    </div>

                </div>
            </div>
        </div>

    </div>

</template>

<style>

    .th-bold-title {
        background: #8a8c8a;
        padding: 0 5px;
        border-radius: 5px;
        font-size: 17px;
        font-weight: bold;
        color: #000000;
    }

    .invite-ico {
        font-size: 20px;
        color: #007bff;
    }
    
    .modal-header {
        border-bottom: none !important;
        display: inline-block !important;
    }

</style>

<script>

    import $ from "jquery";
    import Sidemenu from '../models/Sidemenu';
    import FriendsList from '../models/FriendsList';
    import ContextMenu from './../models/context-menu/ContextMenu';
    import ContextMenuItem from './../models/context-menu/ContextMenuItem';

    import Multiselect from 'vue-multiselect'
    import "../../assets/css/vue-multiselect.css";

    import VueLoadingButton from 'vue-loading-button'

    export default {
        name: "Dashboard",
        components: {
            Sidemenu,
            FriendsList,
            ContextMenu,
            ContextMenuItem,
            Multiselect,
            VueLoadingButton,
        },
        data() {
            return {
                selectedFriends: [],
                friends: [],
                selectForInvite: null,
                inviteLoading: false,
                removeLoading: false,
                selectedForRemove: null,
            }
        },
        methods: {
            startConversation(user) {
                let path = `/messages/${user.username}`;
                if (path !== this.$route.path){
                    this.$router.push({path})
                }
                this.$refs.menu.close();
            },
            searchItemsLabel({ fullname }) {
                return `${fullname}`
            },
            redirect(route_name){
                if (route_name !== this.$route.name){
                    this.$router.push({ name: route_name });
                }
                this.$refs.menu.close();
            },
            redirectWithModal(route_name){
                this.$router.push({ name: route_name }).then(() => {
                    $("#logoutModal").modal('hide');
                });
            },
            openLogoutModal() {
                this.$refs.menu.close();
                $("#logoutModal").modal();
            },
            goToTheater(user) {
                this.$refs.menu.close();
                this.$router.push({ path: `/${user.username}` });
            },
            removeTheater() {

                this.removeLoading = true;

                this.$store.dispatch("removeTheater", this.selectedForRemove.id).then(() => {

                    this.$notify({
                        group: 'dashboard',
                        type: 'success',
                        text: "Theater removed successfully!",
                        title: "Success",
                        duration: 2000,
                    });

                    this.$refs.routerView.removeTheaterFromArray(this.selectedForRemove.id);

                    this.removeLoading = false;
                    $("#removeTheaterModal").modal('hide');

                }).catch(() => {

                    this.$notify({
                        group: 'dashboard',
                        type: 'error',
                        text: "Something went wrong, please try again later!",
                        title: "Failed",
                        duration: 2000,
                    });

                    this.removeLoading = false;

                });

            },
            removeTheaterModal(theater) {
                this.selectedForRemove = theater;
                this.$refs.menu.close();
                if (this.selectedForRemove != null){
                    $("#removeTheaterModal").modal();
                }
            },
            setFriends(friends) {
                if (friends !== null){
                    this.friends = friends;
                    this.$emit("got-friends", friends);
                }
            },
            inviteModal(theater) {
                this.selectForInvite = theater;
                this.$refs.menu.close();
                if (this.selectForInvite != null){
                    $("#inviteFriendToTheaterModal").modal();
                }
            },
            inviteSelectedFriends() {

                this.inviteLoading = true;

                let selectedFriendIds = [];
                this.selectedFriends.forEach(selectedFriend => {
                    selectedFriendIds.push(selectedFriend.id);
                });

                this.$store.dispatch("inviteFriendToTheater", {
                    friend_ids: selectedFriendIds,
                    theater_id: this.selectForInvite.id,
                }).then(() => {

                    this.$notify({
                        group: 'dashboard',
                        type: 'success',
                        text: "Invatations sent successfully!",
                        title: "Success",
                        duration: 2000,
                    });

                    this.inviteLoading = false;
                    $("#inviteFriendToTheaterModal").modal('hide');

                }).catch(() => {

                    this.$notify({
                        group: 'dashboard',
                        type: 'error',
                        text: "Something went wrong, please try again later!",
                        title: "Failed",
                        duration: 2000,
                    });

                    this.inviteLoading = false;

                });

            }
        },
        mounted() {
            $("#inviteFriendToTheaterModal").on('hidden.bs.modal', () => {
                this.selectForInvite = null;
                this.selectedFriends = [];
            });
            this.$bus.$on('start-progress-bar', () => {
                this.$refs.topProgress.start();
            });
            this.$bus.$on('stop-progress-bar', () => {
                this.$refs.topProgress.done();
            });
            let notify = this.$route.params.notify;
            if (notify != null){
                this.$notify(notify);
            }
        }
    }

</script>