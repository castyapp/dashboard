<template>
    <div>
        <h5>Redirecting...</h5>
    </div>
</template>

<script>

    let client_id = process.env.VUE_APP_API_DISCORD_CLIENT_ID,
        redirect_uri = process.env.VUE_APP_API_DISCORD_REDIRECT_URI;

    let redirect_url = "https://discordapp.com/api/oauth2/authorize?" +
        `client_id=${client_id}&` +
        `redirect_uri=${redirect_uri}&` +
        "response_type=code&" +
        "scope=identify%20email";

    export default {
        name: "DiscordOAUTH",
        mounted() {
            location.replace(redirect_url);
        }
    }

</script>