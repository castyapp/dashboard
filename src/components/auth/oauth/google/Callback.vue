<template>
    <div>
        <notifications group="auth" position="top center" :max="1" />
        <vue-topprogress ref="topProgress" />
        <h5>{{ status }}</h5>
    </div>
</template>

<script>

    export default {
        name: "GoogleOAUTHCallback",
        data() {
            return {
                status: "Hang on, we are linking your account ..."
            }
        },
        mounted() {

            this.$refs.topProgress.start();

            this.$store.dispatch("OAUTHCallback", {
                service: "google",
                code: this.$route.query.code,
            }).then(() => {

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

            }).catch(() => {

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
    }

</script>