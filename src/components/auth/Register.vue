<template>

    <div class="mt-5">

        <notifications group="auth" position="top center" :max="1" />
        <notifications group="error" position="top center" :max="1" />

        <vue-topprogress ref="topProgress" />

        <form class="col-md-4 offset-md-4 login-form text-center"
              action="#"
              @submit.prevent="register">

            <h2>Register</h2>

            <div class="alert alert-success"
                 v-if="successMessage">
                <strong>{{ successMessage }}</strong>
            </div>

            <div id="serverError">
                <div class="alert alert-danger" v-if="serverError">
                    <strong>{{ serverError }}</strong>
                </div>
            </div>

            <div class="form-group">
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
                <input type="text"
                       class="form-control"
                       id="username"
                       name="username"
                       placeholder="Username"
                       autofocus="autofocus"
                       v-model="username"
                       required="required" />

                <small v-if="errors.username" class="text-danger fa-pull-left text-left">
                    <span class="clearfix">
                        {{ errors.username }}
                    </span>
                </small>
            </div>

            <div class="form-group">
                <input type="email"
                       class="form-control"
                       id="email"
                       name="email"
                       placeholder="Email"
                       autofocus="autofocus"
                       v-model="email"
                       required="required" />

                <small v-if="errors.email" class="text-danger fa-pull-left text-left">
                    <span class="clearfix">
                        {{ errors.email }}
                    </span>
                </small>
            </div>

            <div class="form-group">
                <input type="password"
                       class="form-control"
                       name="password"
                       placeholder="Password"
                       v-model="password"
                       required="required" />

                <small v-if="errors.password" class="text-danger fa-pull-left text-left">
                    <span class="clearfix">
                        {{ errors.password }}
                    </span>
                </small>
            </div>

            <div class="form-group">
                <input type="password"
                       class="form-control"
                       name="password_confirmation"
                       placeholder="Password Confirmation"
                       v-model="password_confirmation"
                       required="required" />

                <small v-if="errors.password_confirmation" class="text-danger fa-pull-left text-left">
                    <span class="clearfix">
                        {{ errors.password_confirmation }}
                    </span>
                </small>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span class="lds-ring-container" v-if="loading">
                        <span class="lds-ring">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </span>
                    Register
                </button>
            </div>

            <span>
                Looking for login?
                <router-link :to="{ name: 'login' }">
                    Click here!
                </router-link>
            </span>

        </form>

    </div>
</template>

<script>

    const $ = require("jquery");

    export default {
        name: 'register',
        props: {
            dataSuccessMessage: {
                type: String,
            }
        },
        data() {
            return {
                errors: {},
                username: '',
                fullname: '',
                email: '',
                password: '',
                password_confirmation: '',
                loading: false,
                serverError: '',
                successMessage: this.dataSuccessMessage,
            }
        },
        mounted() {
            let err = this.$route.params.err;
            if (err != null){
                this.$notify(err);
            }
        },
        methods: {
            register() {

                $('#serverError').removeClass();

                this.$refs.topProgress.start();

                this.loading = true;

                this.$store.dispatch('register', {
                    fullname: this.fullname,
                    email: this.email,
                    username: this.username,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                }).then(() => {

                    this.errors = {};
                    this.loading = false;
                    this.serverError = "";
                    // this.successMessage = 'Login successfully! Please wait ...';

                    this.$notify({
                        group: 'auth',
                        type: 'success',
                        text: "Login successfully! Please wait ...",
                        title: "Success",
                        duration: 2000,
                    });

                    setTimeout(() => {
                        this.$refs.topProgress.done();
                        this.$router.push({ name: 'dashboard' })
                    }, 1000);

                }).catch(error => {

                    this.loading = false;

                    if (typeof error.response !== "undefined"){

                        if (error.response.data.message) {
                            this.errors = {};
                            this.serverError = error.response.data.message;
                        } else {
                            this.errors = error.response.data.result;
                            this.serverError = "Please correct the following error(s) in form!";
                        }

                        this.password = '';
                        this.successMessage = '';

                        $('#serverError')
                            .addClass('shake animated')
                            .one('webkitAnimationEnd' +
                                ' mozAnimationEnd ' +
                                'MSAnimationEnd ' +
                                'oanimationend ' +
                                'animationend', () => {

                                $(this).removeClass();
                            });

                    }

                    this.$refs.topProgress.done();
                })
            }
        }
    }
</script>