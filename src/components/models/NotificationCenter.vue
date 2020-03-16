<template>

    <div class="nc-container" v-click-outside="close">

        <button type="button" class="friends-menu-btn" @click="toggle">
            <i class="icofont-bell-alt"></i>
            <span class="unread_count_notifications" v-if="notifications.unread_count > 0">
                {{ notifications.unread_count }}
            </span>
        </button>

        <div class="notification-center" v-show="opened">

            <div class="nc-title">
                <button class="mark-all-as-read-btn">
                    Mark all as read
                </button>
                <span class="text-left">Notifications</span>
            </div>

            <div class="notifications" v-if="!loading && notifications.data.length > 0">

                <div class="notification"
                     :key="notification.id"
                     v-for="notification in notifications.data"
                     :class="{ unread: !notification.read }">

                    <Notification :notification="notification" />

                </div>

            </div>

            <div class="no-notifications" v-if="!loading && notifications.data.length === 0">
                You have no notifications yet!
            </div>

            <vue-loaders-ball-beat class="notification-spinner" v-if="loading" />

        </div>

    </div>

</template>

<style>

    .notification-center {
        z-index: 1;
        position: absolute;
        background: #141212;
        width: 350px;
        right: 50px;
        margin-top: 7px;
        padding: 5px;
        border-radius: 3px;
        max-height: 400px;
    }

    .notification-center > .nc-title {
        border-bottom: 2px solid #ffffff14;
        padding: 5px;
        text-align: left;
        margin-bottom: 3px;
    }

    button.mark-all-as-read-btn {
        float: right;
        background: #181818;
        color: #ffffff;
        border: none;
        font-size: 12px;
        border-radius: 3px;
    }

    .notifications {
        overflow: auto;
        max-height: 300px;
    }

    .notification.unread {
        background: #202020;
    }

    .notification {
        padding: 5px;
        border-bottom: 2px solid #202020;
        margin-bottom: 4px;
    }

    .notification:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }

    .notification-spinner {
        margin: 20px auto;
        display: table !important;
    }

    .nc-container {
        display: inline-block;
    }

</style>

<script>

    import Notification from "./Notification";
    import ClickOutside from 'vue-click-outside';

    export default {
        name: 'NotificationCenter',
        props: ['notifications'],
        data() {
            return {
                opened: false,
                loading: true,
                loaded_once: false,
            }
        },
        directives: {
            ClickOutside,
        },
        components: {
            Notification,
        },
        methods: {
            loadNotification() {
                this.notifications.data.forEach(async (_, index) => {
                    if (!this.notifications.data[index].hasOwnProperty("read")){
                        this.notifications.data[index].read = false;
                    }
                    if (!this.notifications.data[index].hasOwnProperty("accepted")){
                        this.notifications.data[index].accepted = false;
                    }
                    if (!this.notifications.data[index].hasOwnProperty("loaded")){
                        this.notifications.data[index].loaded = false;
                    }
                    if (this.notifications.data[index].type === 1) {
                        await this.$store.dispatch("getFriendRequest", this.notifications.data[index].extra).then(response => {
                            this.notifications.data[index].accepted = response.data.result.accepted;
                            this.notifications.data[index].loaded = true;
                        }).catch(() => {
                            // this.notifications.data.splice(1, index);
                        });
                    } else if(this.notifications.data[index].type === 2) {
                        await this.$store.dispatch("getTheater", this.notifications.data[index].extra).then(response => {
                            this.notifications.data[index].theater = response.data.result;
                            this.notifications.data[index].loaded = true;
                        }).catch(() => {
                            // this.notifications.data.splice(1, index);
                        });
                    }
                    if (index === (this.notifications.data.length - 1)){
                        this.loading = false;
                        this.loaded_once = true;
                    }
                });
            },
            toggle() {
                this.opened = !this.opened;
                if (!this.loaded_once){
                    this.loadNotification();
                }
            },
            close() {
                this.opened = false;
            }
        }
    }

</script>














