<template>

    <form class="login-form"
          action="#"
          @submit.prevent="submit">

        <div class="form-group">
            <label for="username"></label>
            <input type="text"
                   class="form-control"
                   id="username"
                   placeholder="E-mail Address or Username"
                   autofocus="autofocus"
                   v-model="user"
                   required="required"
                   autocomplete="username" />
            <small v-if="errors.username" class="text-danger pull-left text-left">
                <span class="clearfix" :key="'username-err-' + i" v-for="(err, i) in errors.username">
                    {{ err }}
                </span>
            </small>
        </div>

        <div class="form-group login-bottom-action-buttons">
            <div class="buttons">

                <VueHcaptcha :sitekey="$parent.sitekey" 
                    @verify="onCaptchaVerified" 
                    @expired="onCaptchaExpired"
                    @error="onCaptchaExpired" />

                <VueLoadingButton
                        type="submit"
                        :loading="loading"
                        class="btn btn-primary full-width"
                        :disabled="loading">
                    <span>Submit</span>
                </VueLoadingButton>

            </div>

        </div>

    </form>

</template>

<script>

    const jQuery = require('jquery')
    import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
    import VueLoadingButton from 'vue-loading-button'

    export default {
        name: 'login',
        components: {
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

            submit() {},

        },
        mounted() {
            this.setTitle("Reset Password • Casty");
            let err = this.$route.params.err;
            if (err != null){
                this.$notify(err);
            }
        }
    }

</script>