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

                    <!-- <ContextMenuItem @click.native="$refs.menu.close">
                        <i class="icofont-trash mr-1"></i>
                        Remove Friend
                    </ContextMenuItem> -->

                </div>

                <div class="usermenu-actions-menu" v-show="type === 'usermenu-actions'">

                    <div class="logged-in-as">
                        Logged in as: {{ user.fullname }}
                    </div>
                    
                    <div class="actions-activity">
                        <div class="actions-states">
                            <button class="action-state action-online action-selected">
                                <i class="state-dot-icon"></i>
                                Online
                                <i class="selected-icon icofont-check-alt"></i>
                            </button>
                            <button class="action-state action-idle">
                                <i class="state-dot-icon"></i>
                                Idle
                            </button>
                            <button class="action-state action-busy">
                                <i class="state-dot-icon"></i>
                                Busy
                            </button>
                            <button class="action-state action-invisible">
                                <i class="state-dot-icon"></i>
                                Invisible
                            </button>
                        </div>
                        <div class="custom-control custom-switch mt-3">
                            <input type="checkbox"
                                class="custom-control-input"
                                id="trust_switch"
                                checked />
                            <label class="custom-control-label" for="trust_switch">
                                Show my activity
                            </label>
                        </div>
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

    </div>

</template>

<style>

    .invite-ico {
        font-size: 20px;
        color: #007bff;
    }
    
    .modal-header {
        border-bottom: none !important;
        display: inline-block !important;
    }

    .actions-activity {
        padding: 10px 5px 15px 5px;
        border-bottom: 1px solid #1e1e1f;
    }

    .actions-states {
        border-bottom: 1px solid #1e1e1f;
        padding-bottom: 5px;
    }

    button.action-state {
        width: 100%;
        padding: 3px;
        margin-bottom: 5px;
        font-size: 13px;
        border-radius: 3px;
        list-style: none;
        text-align: left;
        border: none;
        color: #FFFFFF;
        background: transparent;
    }

    button.action-state:hover {
        background: #202020;
    }

    .state-dot-icon {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        display: block;
        float: left;
        margin: 5px 7px 0 5px;
        background: #393939;
    }

    .action-online > i {
        background: #28a745;
    }

    .action-idle > i {
        background: #ffc107;
    }

    .action-busy > i {
        background: #dc3545;
    }

    .action-invisible > i {
        background: #333333;
    }

    .action-selected {
        background: #1e1e1f !important;
    }

    .selected-icon {
        float: right;
        background: transparent !important;
        font-size: 20px;
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
                notifSound: new Audio(require('../../assets/sounds/notif.mp3')),
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
            this.setTitle("Dashboard • Casty");
            $("#inviteFriendToTheaterModal").on('hidden.bs.modal', () => {
                this.selectForInvite = null;
                this.selectedFriends = [];
            });
            this.$bus.$on('start-progress-bar', () => {
                this.$refs.topProgress.start();
            });
            this.$bus.$on('play-notif', () => {
                this.notifSound.play();
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