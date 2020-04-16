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
                <span class="clearfix" v-for="err in errors.username">
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
                    <span>Submit</span>
                </VueLoadingButton>
            </div>

        </div>

    </form>

</template>

<script>

    const jQuery = require("jquery");
    import VueRecaptcha from 'vue-recaptcha';
    import VueLoadingButton from 'vue-loading-button'

    export default {
        name: 'login',
        components: {
            VueRecaptcha,
            VueLoadingButton,
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
                // this.loading = true;
            },
            onCaptchaExpired() {
                this.$refs.recaptcha.reset();
            },
            submit() {
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