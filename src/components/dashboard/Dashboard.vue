<template>

    <div class="dashboard scrollable">

        <notifications group="dashboard" position="top center" :max="1" />

        <vue-topprogress ref="topProgress" />

        <Sidemenu />

        <div class="main-container">
            <router-view name="theater" />
            <keep-alive>
                <router-view name="dashboard" :key="$route.fullPath" />
            </keep-alive>
        </div>

        <FriendsList :status="fl_status" />

        <ContextMenu ref="menu">

            <template slot-scope="{ type, contextData }">

                <div class="friend-menu" v-show="type === 'friend-menu'">

                    <ContextMenuItem @click.native="startConversation(contextData)">
                        <i class="icofont-chat mr-1"></i>
                        Send Message
                    </ContextMenuItem>

                    <ContextMenuItem @click.native="$refs.menu.close">
                        <i class="icofont-arrow-left mr-1"></i>
                        Invite to Theater
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

                    <ContextMenuItem @click.native="$refs.menu.close">
                        <i class="icofont-trash mr-1"></i>
                        Remove Theater
                    </ContextMenuItem>

                </div>

                <div class="friend-menu" v-show="type === 'usermenu-actions'">

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

        <div class="modal modal-dark fade" id="inviteFriendToTheaterModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">

                <div class="modal-content" v-if="selectForInvite !== null">

                    <div class="modal-header pb-0">

                        <div class="pull-left pt-2">
                            <i class="icofont-user pull-left mr-2 invite-ico"></i>
                            <span>Invite your friends to theater</span>
                        </div>

                        <div class="pull-right">

                            <button type="button"
                                    class="btn btn-primary full-width"
                                    @click="inviteSelectedFriends"
                                    :disabled="selectedFriends.length === 0">

                                <span>
                                    Send
                                    <i class="icofont-arrow-right"></i>
                                </span>
                            </button>

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
                                     :src="apiBaseUrl +  '/uploads/avatars/' + props.option.avatar + '.png'"
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
    import {store} from "../../store/store";
    import Sidemenu from '../models/Sidemenu';
    import FriendsList from '../models/FriendsList';
    import ContextMenu from './../models/context-menu/ContextMenu';
    import ContextMenuItem from './../models/context-menu/ContextMenuItem';

    import Multiselect from 'vue-multiselect'
    import "../../assets/css/vue-multiselect.css";

    export default {
        components: {
            Sidemenu,
            FriendsList,
            ContextMenu,
            ContextMenuItem,
            Multiselect,
        },
        data() {
            return {
                fl_status: "open",
                selectedFriends: [],
                friends: [],
                selectForInvite: null,
            }
        },
        methods: {
            startConversation(user) {
                this.$refs.menu.close();
                this.$router.push({
                    path: `/messages/${user.username}`
                })
            },
            searchItemsLabel({ fullname }) {
                return `${fullname}`
            },
            redirect(route_name){
                this.$refs.menu.close();
                this.$router.push({ name: route_name });
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
            goToTheater(theater_id) {
                this.$refs.menu.close();
                this.$router.push({ path: `theater/${theater_id}` });
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
                console.log("Invited!");
            }
        },
        created() {
            this.$on('fl:status', (status) => {
                this.fl_status = status;
            });
        },
        mounted() {
            $("#inviteFriendToTheaterModal").on('hidden.bs.modal', () => {
                this.selectForInvite = null;
                this.selectedFriends = [];
            });
        }
    }

</script>