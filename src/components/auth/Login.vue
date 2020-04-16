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
                <span class="clearfix" v-for="err in errors.username">
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
                <span class="clearfix" v-for="err in errors.password">
                    {{ err }}
                </span>
            </small>
        </div>

        <div class="form-group login-bottom-action-buttons">
            <div class="buttons">
                <VueRecaptcha :sitekey="sitekey"
                              ref="recaptcha"
                              @verify="onCaptchaVerified"
                              @expired="onCaptchaExpired"
                              size="invisible"
                              :loadRecaptchaScript="true" />

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

    const jQuery = require("jquery");
    import VueRecaptcha from 'vue-recaptcha';
    import VueLoadingButton from 'vue-loading-button'
    import OAuthButtons from "./oauth/OAuthButtons";

    export default {
        name: 'login',
        components: {
            VueRecaptcha,
            VueLoadingButton,
            OAuthButtons,
        },
        data() {
            return {
                loading: false,
                errors: {},
                user: '',
                pass: '',
                sitekey: process.env.VUE_APP_API_RECAPTCHA_KEY,
            }
        },
        methods: {
            onCaptchaVerified(recaptchaToken) {

                this.loading = true;

                jQuery('#serverError').removeClass();

                this.$parent.$refs.topProgress.start();

                this.$store.dispatch('createAuthToken', {
                    user: this.user,
                    pass: this.pass,
                    gToken: recaptchaToken,
                }).then(() => {

                    this.errors = {};
                    this.loading = false;
                    this.$parent.serverError = "";
                    // this.$parent.successMessage = 'Login successfully! Please wait ...';

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

                    if (typeof error.response !== "undefined"){

                        if (error.response.data.message) {
                            this.errors = {};
                            this.$parent.serverError = error.response.data.message;
                        } else {
                            this.errors = error.response.data.result;
                            this.$parent.serverError = "Invalid credentials!";
                        }

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

                    }

                    this.$parent.$refs.topProgress.done();
                    this.$refs.recaptcha.reset();

                });

            },
            onCaptchaExpired() {
                this.$refs.recaptcha.reset();
            },
            login() {
                this.$refs.recaptcha.execute();
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