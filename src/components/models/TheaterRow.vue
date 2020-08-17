<template>
    
    <li v-bind:key="actualTheater.id">
        <router-link :to="{ name: 'theater', params: { user: actualTheater.user.username } }"
            class="theater-sidemenu"
            v-title="actualTheater.user.username + ': ' + actualTheater.description"
            title-placement="right">
                <img :src="cdnUrl + '/avatars/' + actualTheater.user.avatar + '.png'"
                    :alt="actualTheater.user.fullname" />
        </router-link>
    </li>

</template>

<script>

    export default {
        props: ['theater'],
        data() {
            return {
                actualTheater: null
            }
        },
        methods: {
            updateUser(user) {
                this.actualTheater.user = user
            }
        },
        created() {
            this.actualTheater = this.theater
        }
    }

</script>