<template>

    <div class="theater-invite">

        <img :src="cdnUrl + '/avatars/' + notification.fromUser.avatar + '.png'" class="avatar" :alt="notification.fromUser.fullname" />

        <div class="notification-details">
            <div class="notification-title">
                <span>New theater invite from:</span>
                <div class="nc-new-friend-name">
                    {{ notification.fromUser.fullname }}
                </div>
            </div>
            <div class="nc-th">
                <div class="theater-image">
                    <div class="default-nc-poster" v-if="notification.data.movie.poster === 'default'">
                        <i class="poster icofont-file-mov"></i>
                    </div>
                    <img v-else
                         :src="cdnUrl + '/posters/' + notification.data.movie.poster + '.png'"
                         alt="Poster" />
                </div>
                <div class="th-details">
                    <span class="th-name">
                        {{ notification.data.title }}
                    </span>
                </div>
                <button class="nc-button nc-btn-join-th" 
                    @click="joinTheater(notification.data)">
                    Join <i class="icofont-plus"></i>
                </button>
            </div>
        </div>

    </div>

</template>

<script>

    export default {
        props: ['notification'],
        methods: {
            joinTheater(theater) {
                this.$router.push({ path: `/theater/${theater.id}` });
            }
        }
    }

</script>