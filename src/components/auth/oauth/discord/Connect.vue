<template>
  <div class="oauth-connect-container">
    <RingLoader :loading="true" :color="'#ffffff'" />
      <p>Redirecting to Discord...</p>

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

import RingLoader from '@/components/RingLoader'

let client_id = process.env.VUE_APP_API_DISCORD_CLIENT_ID,
  redirect_uri = process.env.VUE_APP_API_DISCORD_REDIRECT_URI;

export default {
  name: "discord-oauth",
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
      localStorage.setItem(`discord-oauth-${this.state}`, this.$route.query.ref)
    }
  },
  mounted() {
    this.setTitle(`Redirecting to Discord...`);
    let redirect_url = "https://discordapp.com/api/oauth2/authorize?" +
      `client_id=${client_id}&` +
      `state=${this.state}&` +
      `redirect_uri=${redirect_uri}&` +
      "response_type=code&" +
      "scope=identify%20email";
    this.timeoutId = setTimeout(() => {
      location.replace(redirect_url);
    }, 2000)
  },
  destroyed() {
    clearTimeout(this.timeoutId)
  }
}

</script>
