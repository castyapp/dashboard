<template>
    <div>Logging out ...</div>
</template>

<script>

    import userSocket from "../../store/user.ws";

    export default {
        name: "logout",
        mounted() {
            this.setTitle("Logging out...");
            this.$store.dispatch('logout').then(() => {
                localStorage.removeItem("user");
                userSocket.disconnect();
                this.$router.push({ name: 'login' }).then(() => {
                    this.$notify({
                        group: 'auth',
                        type: 'success',
                        text: "Logout successfully!",
                        title: "Success",
                        duration: 2000,
                    });
                });
            })
        }
    }

</script>