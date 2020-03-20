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
                   required="required" />
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
                   required="required" />

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
                <button class="btn btn-primary">Login</button>
                <a class="btn">Forget password?</a>
            </div>

            <div class="oauthButtons">

                <strong>Or you can sign in with:</strong>

                <button type="button" class="clickable oauthBtn oauthGoogleBtn" @click="GoogleOAUTHPage">
                    <i class="icofont-google-plus"></i>
                    Google
                </button>

                <button type="button" class="clickable oauthBtn oauthDiscordBtn" @click="DiscordOAUTHPage">
                    <i class="discord-icon"></i>
                    Discord
                </button>

            </div>

        </div>

    </form>

</template>

<script>

    const jQuery = require("jquery");
    import VueRecaptcha from 'vue-recaptcha';

    export default {
        name: 'login',
        components: {
            VueRecaptcha,
        },
        data() {
            return {
                errors: {},
                user: '',
                pass: '',
                sitekey: process.env.VUE_APP_API_RECAPTCHA_KEY,
            }
        },
        methods: {
            onCaptchaVerified(recaptchaToken) {

                jQuery('#serverError').removeClass();

                this.$parent.$refs.topProgress.start();

                this.loading = true;

                this.$store.dispatch('createAuthToken', {
                    user: this.user,
                    pass: this.pass,
                    gToken: recaptchaToken,
                }).then(() => {

                    this.errors = {};
                    this.loading = false;
                    this.$parent.serverError = "";
                    this.$parent.successMessage = 'Login successfully! Please wait ...';

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
                            this.$parent.serverError = "Please correct the following error(s) in form!";
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
            GoogleOAUTHPage() {
                this.$router.push({ name: "google_oauth_connect" });
            },
            DiscordOAUTHPage() {
                this.$router.push({ name: "discord_oauth_connect" });
            }
        },
        mounted() {
            let err = this.$route.params.err;
            if (err != null){
                this.$notify(err);
            }
        }
    }

</script>