<template>

    <div class="oauth-connect-container">

        <notifications group="auth" position="top center" :max="1" />
        <vue-topprogress ref="topProgress" />

        <div v-if="loading">
            <ring-loader :loading="loading" :color="'#ffffff'" />
            <p>Verifying your Spotify account...</p>
        </div>

        <div v-if="verified" class="verified">
            <i class="icofont-check text-success"></i>
            <p>Your Spotify account verified successfully!</p>

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
        name: "SpotifyOauthCallback",
        data() {
            return {
                timeoutId: 0,
                loading: true,
                verified: false,
            }
        },
        methods: {
            verify() {

                const ref = localStorage.getItem(`spotify-oauth-${this.$route.query.state}`)

                this.$store.dispatch("OAUTHCallback", {
                    service: "spotify",
                    code: this.$route.query.code,
                }).then(() => {

                    this.loading = false;
                    this.verified = true;

                    if (ref === 'dashboard') {
                        this.$notify({
                            group: 'auth',
                            type: 'success',
                            text: "Your Spotify account connected successfully!",
                            title: "Success",
                            duration: 2000,
                        });
                        setTimeout(() => {
                            this.$refs.topProgress.done();
                            this.$router.push({ name: 'settings' })
                        }, 1000);
                    } else {
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
                    }

                }).catch(() => {

                    this.loading = false;
                    this.$refs.topProgress.done();

                    if (ref === 'dashboard') {
                        this.$router.push({
                            name: "settings",
                            params: {
                                err: {
                                    group: 'dashboard',
                                    type: 'error',
                                    text: "Could not connect your Spotify account!",
                                    title: "Failed",
                                    duration: 2000,
                                }
                            },
                        });
                    } else {
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
                    }

                });

            }
        },
        mounted() {
            this.$refs.topProgress.start();
            this.timeoutId = setTimeout(this.verify, 2000)
        },
        destroyed() {
            clearTimeout(this.timeoutId)
            localStorage.removeItem(`spotify-oauth-${this.$route.query.state}`)
        }
    }

</script>