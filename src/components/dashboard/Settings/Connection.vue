<template>

    <div class="connection mr-2 full-width" :class="'connection-' + connection.color">
        <div class="connection-title pull-left">
            <i :class="'icofont-' + connection.icon"></i> 
            <span>Connect your {{ connection.service }} account</span>
        </div>
        <router-link class="pull-right" :to="{ name: `${connection.service}_oauth_connect` }" target="_blank">
            Connect
        </router-link>
    </div>

</template>

<style>

    .connection {
        background: #1c1c1c;
        clear: both;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        display: flow-root;
    }

    .connection-title {
        margin: 5px;
    }

    .connection-title > i {
        font-size: 25px;
        margin-right: 10px;
        float: left;
    }

    .connection > a {
        border: 0;
        background: #252626;
        color: #fff;
        border-radius: 4px;
        padding: 5px 10px;
        text-decoration: none;
    }

    .connection > a:hover {
        text-decoration: none;
        background: #131212;
        color: #fff;
    }

</style>

<script>

    export default {
        name: "Connection",
        props: ['connection'],
        methods: {
            connect() {
                this.$router.push({ 
                    name: `${this.connection.service}_oauth_connect`,
                });
            },
        }
    }

</script>