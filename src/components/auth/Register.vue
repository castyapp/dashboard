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
                   required="required" />

            <small v-if="errors.fullname" class="text-danger fa-pull-left text-left">
                    <span class="clearfix">
                        {{ errors.fullname }}
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
                   required="required" />

            <small v-if="errors.username" class="text-danger fa-pull-left text-left">
                <span class="clearfix" v-for="err in errors.username">
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
                   required="required" />

            <small v-if="errors.email" class="text-danger fa-pull-left text-left">
                <span class="clearfix" v-for="err in errors.email">
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
                   required="required" />

            <small v-if="errors.password" class="text-danger fa-pull-left text-left">
                <span class="clearfix" v-for="err in errors.password">
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
                   required="required" />

            <small v-if="errors.password_confirmation" class="text-danger fa-pull-left text-left">
                <span class="clearfix" v-for="err in errors.password_confirmation">
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
                <button class="btn btn-primary">Register</button>
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

    export default {
        name: 'register',
        props: {
            dataSuccessMessage: {
                type: String,
            }
        },
        data() {
            return {
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
        mounted() {
            let err = this.$route.params.err;
            if (err != null){
                this.$notify(err);
            }
        },
        methods: {
            onCaptchaVerified(recaptchaToken) {
                jQuery('#serverError').removeClass();

                this.$parent.$refs.topProgress.start();

                this.$parent.loading = true;

                this.$store.dispatch('register', {
                    fullname: this.fullname,
                    email: this.email,
                    username: this.username,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    gToken: recaptchaToken,
                }).then(() => {

                    this.errors = {};
                    this.$parent.loading = false;
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

                    this.$parent.loading = false;

                    if (typeof error.response !== "undefined"){

                        if (error.response.data.message) {
                            this.errors = {};
                            this.$parent.serverError = error.response.data.message;
                        } else {
                            this.errors = error.response.data.result;
                            this.$parent.serverError = "Please correct the following error(s) in form!";
                        }

                        this.password = '';
                        this.password_confirmation = '';
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
                })
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
        }
    }
</script>