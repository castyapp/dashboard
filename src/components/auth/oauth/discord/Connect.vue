<template>
    <div class="oauth-connect-container">
        <ring-loader :loading="true" :color="'#ffffff'" />
        <p>Redirecting to Discord...</p>

        <router-link :to="{name: 'login'}" class="btn btn-primary">
            Back to authentication page
        </router-link>

    </div>
</template>

<style>

    .oauth-connect-container {
        text-align: center;
        padding: 100px;
    }

    .oauth-connect-container {
        font-size: 20px;
        font-weight: bold;
    }

</style>

<script>

    let client_id = process.env.VUE_APP_API_DISCORD_CLIENT_ID,
        redirect_uri = process.env.VUE_APP_API_DISCORD_REDIRECT_URI;

    let redirect_url = "https://discordapp.com/api/oauth2/authorize?" +
        `client_id=${client_id}&` +
        `redirect_uri=${redirect_uri}&` +
        "response_type=code&" +
        "scope=identify%20email";

    export default {
        name: "discord-oauth",
        data() {
            return {
                timeoutId: 0,
            }
        },
        mounted() {
            this.timeoutId = setTimeout(() => {
                location.replace(redirect_url);
            }, 2000)
        },
        destroyed() {
            clearTimeout(this.timeoutId)
        }
    }

</script>