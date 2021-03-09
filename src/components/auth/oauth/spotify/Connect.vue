<template>
  <div class="oauth-connect-container">
    <RingLoader :loading="true" :color="'#ffffff'" />
      <p>Redirecting to Spotify...</p>

      <router-link v-if="!hideBackBtn" :to="{name: 'login'}" class="btn btn-primary">
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

import RingLoader from '@/components/RingLoader';

let client_id = process.env.VUE_APP_API_SPOTIFY_CLIENT_ID,
  redirect_uri = process.env.VUE_APP_API_SPOTIFY_REDIRECT_URI;

export default {
  name: "spotify-oauth",
  components: {
    RingLoader,
  },
  data() {
    return {
      state: null,
      timeoutId: 0,
      hideBackBtn: false,
    }
  },
  created() {
    this.state = this.$parent.getNewState();
    if (this.$route.query.ref == "dashboard") {
      this.hideBackBtn = true;
      localStorage.setItem(`spotify-oauth-${this.state}`, this.$route.query.ref)
    }
  },
  mounted() {
    this.setTitle(`Redirecting to Spotify...`);
    const redirect_url = "https://accounts.spotify.com/authorize?" +
      `client_id=${client_id}&` +
      `redirect_uri=${redirect_uri}&` +
      `state=${this.state}&` +
      "response_type=code&" +
      "scope=user-read-private+user-read-email+user-read-playback-state+user-modify-playback-state+user-library-read+playlist-read-private+streaming+user-read-currently-playing";
    this.timeoutId = setTimeout(() => {
      location.replace(redirect_url);
    }, 2000)
  },
  destroyed() {
    clearTimeout(this.timeoutId)
  }
}

</script>
