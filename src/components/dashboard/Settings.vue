<template>

    <div class="settings p-2">
        <div class="row">
            <Profile />
            <ChangePassword />
        </div>
    </div>

</template>

<style>

    .settings {
        margin-left: 265px !important;
        margin-right: 10px;
    }

    form.form-dark > .form-group > input.form-control-disabled {
        background: #1b1b1b !important;
    }

</style>

<script>

    import Profile from "./Settings/Profile";
    import ChangePassword from "./Settings/ChangePassword";

    export default {
        components: {
            Profile,
            ChangePassword,
        },
        activated() {
            this.$bus.$emit('updated_friends_list_state', 'open');
        },
        mounted() {
            this.$bus.$emit('updated_friends_list_state', 'open');
        }
    }

</script>