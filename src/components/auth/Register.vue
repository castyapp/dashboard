<template>

  <form class="login-form"
        action="#"
        @submit.prevent="register">

    <div class="form-group">
      <label for="fullname"></label>
      <input type="text"
             class="form-control"
             id="fullname"
             name="fullname"
             placeholder="Fullname"
             autofocus="autofocus"
             v-model="fullname"
             required="required"
             autocomplete="fullname" />

      <small :key="'fullname-err-' + i" v-for="(err, i) in errors.fullname" class="text-danger fa-pull-left text-left">
        <span class="clearfix">
          {{ err }}
        </span>
      </small>
    </div>

    <div class="form-group">
      <label for="username"></label>
      <input type="text"
             class="form-control"
             id="username"
             name="username"
             placeholder="Username"
             autofocus="autofocus"
             v-model="username"
             required="required"
             autocomplete="username" />

      <small :key="'username-err-' + i" v-for="(err, i) in errors.username" class="text-danger fa-pull-left text-left">
        <span class="clearfix">
          {{ err }}
        </span>
      </small>
    </div>

    <div class="form-group">
      <label for="email"></label>
      <input type="email"
             class="form-control"
             id="email"
             name="email"
             placeholder="Email"
             autofocus="autofocus"
             v-model="email"
             required="required"
             autocomplete="email" />

      <small :key="'email-err-' + i" v-for="(err, i) in errors.email" class="text-danger fa-pull-left text-left">
        <span class="clearfix">
          {{ err }}
        </span>
      </small>
    </div>

    <div class="form-group">
      <label for="password"></label>
      <input type="password"
             class="form-control"
             name="password"
             id="password"
             placeholder="Password"
             v-model="password"
             required="required"
             autocomplete="password" />

      <small :key="'password-err-' + i" v-for="(err, i) in errors.password" class="text-danger fa-pull-left text-left">
        <span class="clearfix">
          {{ err }}
        </span>
      </small>
    </div>

    <div class="form-group">
      <label for="password_confirmation"></label>
      <input type="password"
             class="form-control"
             name="password_confirmation"
             id="password_confirmation"
             placeholder="Password Confirmation"
             v-model="password_confirmation"
             required="required"
             autocomplete="password" />

      <small :key="'password-conf-err-' + i" 
             v-for="(err, i) in errors.password_confirmation" 
             class="text-danger fa-pull-left text-left">
        <span class="clearfix">
          {{ err }}
        </span>
      </small>
    </div>

    <div class="form-group login-bottom-action-buttons">

      <div class="buttons">

        <VueHcaptcha v-if="$parent.recaptchaEnabled" 
                     ref="captcha"
                     :sitekey="$parent.sitekey" 
                     @verify="onCaptchaVerified" 
                     @expired="onCaptchaExpired"
                     @error="onCaptchaExpired" />

        <VueLoadingButton
          type="submit"
          :loading="loading"
          class="btn btn-primary full-width"
          :disabled="loading">
        <span>Register</span>
        </VueLoadingButton>

      </div>

      <OAuthButtons />
    </div>

  </form>

</template>

<script>

import OAuthButtons from '@/components/auth/oauth/OAuthButtons'
import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
import VueLoadingButton from 'vue-loading-button'

export default {
  name: 'register',
  props: {
    dataSuccessMessage: {
      type: String,
    }
  },
  components: {
    OAuthButtons,
    VueLoadingButton,
    VueHcaptcha,
  },
  data() {
    return {
      recaptcha: {
        token: null,
        valid: false,
      },
      loading: false,
      googleSignInParams: {
        client_id: process.env.VUE_APP_API_GOOGLE_CLIENT_ID,
      },
      errors: {},
      username: '',
      fullname: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  },
  methods: {

    onCaptchaVerified(response) {
      this.recaptcha = {
        valid: true,
        token: response,
      };
    },

    register() {

      if (this.$parent.recaptchaEnabled) {
        if (!this.recaptcha.valid) {
          this.$notify({
            group: 'auth',
            type: 'error',
            text: "Captcha is invalid!",
            title: "Failed",
            duration: 2000,
          });
          return
        }
      }

      this.$parent.$refs.serverError.className = ''

      this.loading = true;
      this.$parent.$refs.topProgress.start();

      const payload = {
        fullname: this.fullname,
        email: this.email,
        username: this.username,
        password: this.password,
        password_confirmation: this.password_confirmation,
      }
      if (this.$parent.recaptchaEnabled) {
        payload.recaptchaToken = this.recaptcha.token
      }

      this.$store.dispatch("register", payload).then(() => {

        this.errors = {};
        this.loading = false;
        this.$parent.serverError = "";

        this.$notify({
          group: 'auth',
          type: 'success',
          text: "Login successfully! Please wait ...",
          title: "Success",
          duration: 2000,
        });

        this.$refs.captcha.reset()

        setTimeout(() => {
          this.$parent.$refs.topProgress.done();
          this.$router.push({ name: 'dashboard' })
        }, 1000);

      }).catch(error => {

        this.loading = false;
        this.$refs.captcha.reset()

        if (error.response.status === 420) {
          this.errors = error.response.data.result
          if (this.errors.recaptcha) {
            this.$parent.serverError = this.errors.recaptcha[0];
          } else {
          this.$parent.serverError = "Please check the form error(s)!";
          this.$parent.$refs.serverError.className = 'shake animated'
          }
        } else {
          this.$parent.serverError = "Could not register at this time!";
        }

        this.password = '';
        this.password_confirmation = '';
        this.$parent.successMessage = '';

        this.$parent.$refs.topProgress.done();
      })
    },
    onCaptchaExpired() {
      this.loading = false;
      this.recaptcha = {
        token: null,
        valid: false,
      };
      this.$notify({
        group: 'auth',
        type: 'error',
        text: "Captcha is invalid!",
        title: "Failed",
        duration: 2000,
      });
      this.$refs.captcha.reset()
    },
    GoogleOAUTHPage() {
      this.$router.push({ name: "google_oauth_connect" });
    },
    DiscordOAUTHPage() {
      this.$router.push({ name: "discord_oauth_connect" });
    }
  },
  mounted() {
    this.setTitle("Register • Casty");
    let notify = this.$route.params.notify;
    if (notify != null){
      this.$notify(notify);
    }
  }
}
</script>
