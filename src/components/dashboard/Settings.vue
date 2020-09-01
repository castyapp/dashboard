<template>

    <div class="settings p-2">
        <div class="row">
            <Profile />
            <ChangePassword />
        </div>
        <div class="row">
            <Connections />
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

    import Profile from './Settings/Profile'
    import Connections from './Settings/Connections'
    import ChangePassword from './Settings/ChangePassword'

    export default {
        components: {
            Profile,
            ChangePassword,
            Connections,
        },
        activated() {
            this.setTitle(`Settings`);
            this.$bus.$emit('updated_friends_list_state', 'open');
        },
        mounted() {
            this.$bus.$emit('updated_friends_list_state', 'open');
            this.setTitle(`Settings`);
        }
    }

</script>