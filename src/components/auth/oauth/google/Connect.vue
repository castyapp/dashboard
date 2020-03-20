<template>
    <div>
        <h5>Redirecting...</h5>
    </div>
</template>

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
        name: "GoogleOAUTH",
        mounted() {
            location.replace(redirect_url);
        }
    }

</script>