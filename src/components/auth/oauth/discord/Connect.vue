<template>
    <div>
        <h5>Redirecting...</h5>
    </div>
</template>

<script>

    let redirect_url = "https://discordapp.com/api/oauth2/authorize?" +
        "client_id=592544135383351335&" +
        "redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Foauth%2Fdiscord%2Fcallback&" +
        "response_type=code&" +
        "scope=identify%20email";

    export default {
        name: "DiscordOAUTH",
        mounted() {
            location.replace(redirect_url);
        }
    }

</script>