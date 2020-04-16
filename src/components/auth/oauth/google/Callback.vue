<template>

    <div class="oauth-connect-container">

        <notifications group="auth" position="top center" :max="1" />
        <vue-topprogress ref="topProgress" />

        <div v-if="loading">
            <ring-loader :loading="loading" :color="'#ffffff'" />
            <p>Verifying your Google account...</p>
        </div>

        <div v-if="verified" class="verified">
            <i class="icofont-check text-success"></i>
            <p>Your Google account verified successfully!</p>

            <div class="redirect-dash">
                <span>Redirecting to dashboard </span>
                <ring-loader :color="'#ffffff'" :size="20" />
            </div>
        </div>

    </div>

</template>

<style scoped>

    .verified > i {
        font-size: 100px;
    }

    .redirect-dash {
        font-size: 15px;
        font-weight: 100;
        display: inline-flex;
        color: #FFFFFF !important;
    }

    .redirect-dash > span {
        margin-right: 5px;
    }

    .verified {
        color: #37a745;
    }

</style>

<script>

    export default {
        name: "google-oauth-callback",
        data() {
            return {
                timeoutId: 0,
                loading: true,
                verified: false,
            }
        },
        methods: {
            verify() {
                this.$store.dispatch("OAUTHCallback", {
                    service: "google",
                    code: this.$route.query.code,
                }).then(() => {

                    this.loading = false;

                    this.$notify({
                        group: 'auth',
                        type: 'success',
                        text: "Login successfully! Please wait ...",
                        title: "Success",
                        duration: 2000,
                    });

                    this.verified = true;

                    setTimeout(() => {
                        this.$refs.topProgress.done();
                        this.$router.push({ name: 'dashboard' })
                    }, 1000);

                }).catch(() => {

                    this.loading = false;

                    this.$router.push({
                        name: "login",
                        params: {
                            err: {
                                group: 'auth',
                                type: 'error',
                                text: "Unauthorized!",
                                title: "Failed",
                                duration: 2000,
                            }
                        },
                    });

                    this.$refs.topProgress.done();
                });
            }
        },
        mounted() {
            this.$refs.topProgress.start();
            this.timeoutId = setTimeout(this.verify, 2000)
        },
        destroyed() {
            clearTimeout(this.timeoutId)
        }
    }

</script>