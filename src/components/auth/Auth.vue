<template>

  <div class="auth">

    <div class="login_container">

      <notifications group="auth" position="top center" :max="1" />

      <vue-topprogress ref="topProgress" />

        <div class="logo">
          <img src="../../assets/icons/brand.svg"
               alt="Brand"
               class="img-logo"/>
          <span class="brand-name">Casty</span>
        </div>

        <div class="alert alert-success"
             v-if="successMessage">
          <strong>{{ successMessage }}</strong>
        </div>

        <div id="serverError">
          <div class="alert alert-danger" v-if="serverError">
            <strong>{{ serverError }}</strong>
          </div>
        </div>

        <div class="actions">
          <router-link :to="{ name: 'login' }">
            Login
          </router-link>
          <router-link :to="{ name: 'register' }">
            Register
          </router-link>
          <router-link :to="{ name: 'iforgot' }">
            Forgot password?
          </router-link>
        </div>

        <router-view name="auth" />

          <div class="text-center p-2">2020 Casty.ir</div>

    </div>

  </div>

</template>

<script>

let recaptchaEnabled = false;
if (process.env.VUE_APP_API_RECAPTCHA_ENABLED === "true") {
  recaptchaEnabled = true;
}

export default {
  props: {
    dataSuccessMessage: {
      type: String,
    }
  },
  data() {
    return {
      serverError: '',
      successMessage: this.dataSuccessMessage,
      recaptchaEnabled: recaptchaEnabled,
      sitekey: process.env.VUE_APP_API_RECAPTCHA_SITE_KEY,
    }
  }
}

</script>
