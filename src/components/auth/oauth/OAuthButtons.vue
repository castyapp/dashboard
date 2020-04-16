<template>
    <div class="oauthButtons">
        <button type="button" class="clickable oauthBtn oauthGoogleBtn" @click="GoogleOAUTHPage">
            <img src="@/assets/icons/social/google.png" alt="Google" />
            Continue with Google
        </button>
        <button type="button" class="clickable oauthBtn oauthDiscordBtn" @click="DiscordOAUTHPage">
            <i class="discord-icon"></i>
            Continue with Discord
        </button>
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
        padding: 8px 15px !important;
    }

    .oauthGoogleBtn > img {
        width: 15px;
    }

    .oauthDiscordBtn {
        background-color: #7289DA;
        color: #fff;
        padding: 8px 15px !important;
        border: none;
    }

    i.discord-icon {
        background: url("../../../assets/icons/social/discord-brand.png");
        width: 18px;
        height: 13px;
        display: block;
        background-size: cover;
        float: left;
        margin: 5px 6px 5px 0;
    }

    .oauthButtons > button {
        margin: 5px auto;
        font-weight: bold;
    }

    .oauthButtons {
        text-align: center;
    }

</style>

<script>

    export default {
        name: 'oauth-buttons',
        methods: {
            GoogleOAUTHPage() {
                this.$router.push({ name: "google_oauth_connect" });
            },
            DiscordOAUTHPage() {
                this.$router.push({ name: "discord_oauth_connect" });
            }
        }
    }

</script>