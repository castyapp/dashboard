<template>
    <div class="oauthButtons">
        <button type="button" class="clickable oauthBtn oauthGoogleBtn" @click="GoogleOAUTHPage">
            <img src="@/assets/icons/social/google.png" alt="Google" />
            Continue with Google
        </button>
        <button type="button" class="clickable oauthBtn oauthSpotifyBtn" @click="SpotifyOAUTHPage">
            <i class="icofont-spotify"></i>
            Continue with Spotify
        </button>
        <!-- <button type="button" class="clickable oauthBtn oauthDiscordBtn" @click="DiscordOAUTHPage">
            <i class="discord-icon"></i>
            Continue with Discord
        </button> -->
    </div>
</template>

<style>

    .oauthBtn {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
    }

    .oauthGoogleBtn {
        background-color: #FFFFFF;
        border: 1px solid #d5d5d5;
        color: #333;
        padding: 10px;
    }

    .oauthGoogleBtn > img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        float: left;
    }

    .oauthDiscordBtn {
        background-color: #7289DA;
        color: #fff;
        padding: 10px;
        border: none;
    }

    i.discord-icon {
        background: url("../../../assets/icons/social/discord-white.svg");
        width: 25px;
        height: 25px;
        display: block;
        background-size: cover;
        float: left;
        margin-right: 5px;
    }

    .oauthButtons > button {
        margin: 5px auto;
        font-weight: bold;
    }

    .oauthButtons {
        text-align: center;
    }

    .oauthSpotifyBtn {
        background: #1DB954;
        color: #FFFFFF;
        border: none;
        padding: 10px;
    }

    .oauthBtn.oauthSpotifyBtn > i {
        float: left;
        font-size: 25px;
        margin-right: 7px;
    }

</style>

<script>

    export default {
        name: 'oauth-buttons',
        methods: {
            SpotifyOAUTHPage() {
                this.$router.push({ name: "spotify_oauth_connect" });
            },
            GoogleOAUTHPage() {
                this.$router.push({ name: "google_oauth_connect" });
            },
            DiscordOAUTHPage() {
                this.$router.push({ name: "discord_oauth_connect" });
            }
        }
    }

</script>