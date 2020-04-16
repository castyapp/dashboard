<template>
    <div class="oauth-connect-container">
        <ring-loader :loading="true" :color="'#ffffff'" />
        <p>Redirecting to Google...</p>

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

    let client_id = process.env.VUE_APP_API_GOOGLE_CLIENT_ID,
        redirect_uri = process.env.VUE_APP_API_GOOGLE_REDIRECT_URI;

    let redirect_url = "https://accounts.google.com/o/oauth2/auth?" +
        "access_type=offline&" +
        `client_id=${client_id}&` +
        `redirect_uri=${redirect_uri}&` +
        "response_type=code&" +
        "scope=profile+email+openid&" +
        "state=state";

    export default {
        name: "google-oauth",
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