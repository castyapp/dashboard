<template>

    <div class="friend-invite">

        <img :src="apiBaseUrl + '/uploads/avatars/' + notification.from_user.avatar + '.png'" class="avatar" :alt="notification.from_user.fullname" />

        <div class="notification-details">

            <div class="notification-title">
                <span>New friend request:</span>
                <div class="nc-new-friend-name">
                    {{ notification.from_user.fullname }}
                </div>
            </div>

            <VueLoadingButton class="nc-button nc-btn-accept-fr"
                              v-if="!notification.data.accepted"
                              @click.native="acceptFriendRequest($event, notification.data.id)">
                Accept
            </VueLoadingButton>

            <span class="fr-accepted" v-else>
                Accepted
                <i class="icofont-check"></i>
            </span>

        </div>

    </div>

</template>

<style>

    .spinner span {
        border: 3px solid #FFFFFF !important;
        border-color: #FFFFFF transparent transparent transparent !important;
    }

</style>

<style>

    .nc-btn-accept-fr {
        font-size: 14px !important;
        font-weight: 100 !important;
        padding: 2px 5px !important;
        margin: 7px !important;
    }

    button.nc-button.nc-btn-accept-fr.vue-loading-button.loading {
        padding-right: 25px !important;
    }

    button.nc-button.nc-btn-accept-fr.vue-loading-button.loading > span.spinner {
        right: 10px !important;
        top: 7px !important;
    }

    span.fr-accepted {
        float: right;
        margin: 7px;
        font-size: 14px;
        color: #4CAF50;
    }

</style>

<script>

    import {bus} from "../../../main";
    import VueLoadingButton from 'vue-loading-button'

    export default {
        props: ['notification'],
        data() {
            return {
                loading: false,
            }
        },
        components: {
            VueLoadingButton,
        },
        methods: {
            acceptFriendRequest(event, requestID) {
                if (!this.notification.accepted) {
                    this.loading = true;
                    this.$store.dispatch("acceptFriendRequest", requestID).then(() => {
                        bus.$emit("new-friend", this.notification.from_user);
                        this.$notify({
                            group: 'dashboard',
                            type: 'success',
                            text: "Friend request accepted successfully!",
                            title: "Success",
                            duration: 2000,
                        });
                        this.$parent.$parent.close();
                        this.notification.data.accepted = true;
                        this.loading = false;
                    }).catch(() => {
                        this.$notify({
                            group: 'dashboard',
                            type: 'error',
                            text: "Something went wrong, please try again later!",
                            title: "Failed",
                            duration: 2000,
                        });
                        this.loading = false;
                    });
                }
            }
        },
    }

</script>