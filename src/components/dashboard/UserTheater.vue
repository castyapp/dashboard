<template>
</template>

<script>
    export default {
        mounted() {
            if (this.loggedIn) {
                this.$router.push({
                    path: `/${this.user.username}`
                })
            } else {
                this.$router.push({ name: 'login' })
            }
        },
    }
</script>