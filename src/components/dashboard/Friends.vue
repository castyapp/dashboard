<template>

    <div class="friends p-2">

        <div class="no-conversation-alert">
            <i class="icofont-ui-text-chat"></i>
            <h4>Select a conversation to chat!</h4>
        </div>

    </div>

</template>

<style>

    .no-conversation-alert > i {
        font-size: 50px;
        margin-bottom: 20px;
    }

    .no-conversation-alert {
        text-align: center;
        opacity: 0.3;
        position: absolute;
        height: 100%;
        left: 0;
        right: 0;
        top: 0;
        align-items: center;
        align-content: center;
        display: grid;
        margin-left: 295px;
    }

</style>

<script>

    export default {
        name: "Friends",
        data() {
            return {
                friends: [],
                loading: true,
            }
        },
        mounted() {
            this.$bus.$emit('updated_friends_list_state', 'open');
        },
        activated() {
            this.$bus.$emit('updated_friends_list_state', 'open');
        }
    }

</script>