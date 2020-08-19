<template>

    <form class="login-form"
          action="#"
          @submit.prevent="login">

        <div class="form-group">
            <label for="username"></label>
            <input type="text"
                   class="form-control"
                   id="username"
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

                <VueHcaptcha :sitekey="$parent.sitekey" 
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

    const jQuery = require('jquery')
    import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
    import VueLoadingButton from 'vue-loading-button'
    import OAuthButtons from './oauth/OAuthButtons'

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

                if (this.recaptcha.valid) {
                    this.$notify({
                        group: 'auth',
                        type: 'error',
                        text: "Captcha is invalid!",
                        title: "Failed",
                        duration: 2000,
                    });
                    return
                }

                this.loading = true;

                jQuery('#serverError').removeClass();

                this.$parent.$refs.topProgress.start();

                this.$store.dispatch('login', {
                    user: this.user,
                    pass: this.pass,
                    recaptchaToken: this.recaptcha.token,
                }).then(() => {

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

                }).catch(err => {

                    this.loading = false;

                    this.$parent.serverError = "Unauthorized";

                    this.password = '';
                    this.$parent.successMessage = '';

                    jQuery('#serverError')
                        .addClass('shake animated')
                        .one('webkitAnimationEnd' +
                            ' mozAnimationEnd ' +
                            'MSAnimationEnd ' +
                            'oanimationend ' +
                            'animationend', () => {

                            jQuery(this).removeClass();
                        });

                    this.$parent.$refs.topProgress.done();
                    
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
            let err = this.$route.params.err;
            if (err != null){
                this.$notify(err);
            }
        }
    }

</script>