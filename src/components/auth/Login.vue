<template>

  <form class="login-form"
        action="#"
        @submit.prevent="login">

    <div class="form-group">
      <label for="username"></label>
      <input type="text"
             class="form-control"
             id="username"
             name="user"
             placeholder="E-mail Address or Username"
             autofocus="autofocus"
             v-model="user"
             required="required"
             autocomplete="user" />
      <small v-if="errors.username" class="text-danger pull-left text-left">
        <span class="clearfix" :key="'username-err-' + i" v-for="(err, i) in errors.username">
          {{ err }}
        </span>
      </small>
    </div>

    <div class="form-group">
      <label for="password"></label>
      <input type="password"
             id="password"
             class="form-control"
             name="password"
             placeholder="Password"
             v-model="pass"
             required="required"
             autocomplete="current-password" />

      <small v-if="errors.password" class="text-danger pull-left text-left">
        <span class="clearfix" :key="'password-err-' + i" v-for="(err, i) in errors.password">
          {{ err }}
        </span>
      </small>
    </div>

    <div class="form-group login-bottom-action-buttons">
      <div class="buttons">

        <VueHcaptcha v-if="$parent.recaptchaEnabled"
                     :sitekey="$parent.sitekey" 
                     @verify="onCaptchaVerified" 
                     @expired="onCaptchaExpired"
                     @error="onCaptchaExpired" />

        <VueLoadingButton
          type="submit"
          :loading="loading"
          class="btn btn-primary full-width"
          :disabled="loading">
        <span>Login</span>
        </VueLoadingButton>

      </div>

      <OAuthButtons />

    </div>

  </form>

</template>

<script>
import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
import VueLoadingButton from 'vue-loading-button'
import OAuthButtons from '@/components/auth/oauth/OAuthButtons'

export default {
  name: 'login',
  components: {
    VueHcaptcha,
    VueLoadingButton,
    OAuthButtons,
  },
  data() {
    return {
      recaptcha: {
        token: null,
        valid: false,
      },
      loading: false,
      errors: {},
      user: '',
      pass: '',
    }
  },
  methods: {
    onCaptchaVerified(response) {
      this.recaptcha = {
        valid: true,
        token: response,
      };
    },
    login() {


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

      this.loading = true;

      this.$parent.$refs.serverError.className = ''

      this.$parent.$refs.topProgress.start();

      const payload = {user: this.user, pass: this.pass};
      if (this.$parent.recaptchaEnabled) {
        payload.recaptchaToken = this.recaptcha.token
      }

      this.setTitle("Logging in ...");
      this.$store.dispatch('login', payload).then(() => {

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

        setTimeout(() => {
          this.$parent.$refs.topProgress.done();
          this.$router.push({ name: 'dashboard' })
        }, 1000);

      }).catch(error => {

        this.loading = false;
        if (error.response.status === 420) {
          this.errors = error.response.data.result
          if (this.errors.recaptcha) {
            this.$parent.serverError = this.errors.recaptcha[0];
          } else {
            this.$parent.serverError = "Unauthorized";
          }
        } else {
          this.$parent.serverError = "Unauthorized";
        }

        this.password = '';
        this.$parent.successMessage = '';
        this.$parent.$refs.serverError.className = 'shake animated'
        this.$parent.$refs.topProgress.done();
        this.setTitle("Login • Casty");

      });

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
    },
  },
  mounted() {
    this.setTitle("Login • Casty");
    let notify = this.$route.params.notify;
    if (notify != null){
      this.$notify(notify);
    }
  }
}

</script>
