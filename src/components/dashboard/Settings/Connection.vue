<template>

    <div class="connection mr-2 full-width" :class="{ 'connected': connection.connected }">

        <div class="connection-title pull-left">

            <i :class="'icofont-' + connection.service"></i> 
            
            <span v-if="connection.connected">
                <strong>Connected:</strong> {{ connection.data.name }}
            </span>

            <span v-else>
                Connect your {{ connection.service }} account
            </span>

        </div>

        <button v-if="connection.connected" 
            class="pull-right disconnect-btn"
            @mouseover="onMouseOverConnectedBtn($event)"
            @mouseleave="onMouseLeaveConnectedBtn($event)">
            Connected 
            <i class="icofont-link-alt"></i>
        </button>

        <router-link v-else
            class="pull-right" 
            :to="{ name: `${connection.service}_oauth_connect`, query:{'ref': 'dashboard'} }" target="_blank">
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

    .connection > a, 
    .connection > button.disconnect-btn {
        border: 0;
        background: #252626;
        color: #fff;
        border-radius: 4px;
        padding: 5px 10px;
        text-decoration: none;
    }

    .connection > a:hover, 
    .connection > button.disconnect-btn:hover {
        text-decoration: none;
        background: #131212;
        color: #fff;
    }

    .connection.connection-spotify.connected {
        background: #1DB954;
        color: #FFFFFF;
    }

    .connection.connection-google.connected {
        background: #FFFFFF;
        color: black;
    }

    .connection.connection-discord.connected {
        background: #7289DA;
        color: #FFFFFF;
    }

    i.icofont-google {
        background: url('../../../assets/icons/social/google.png');
        width: 23px;
        height: 20px;
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: 3px;
    }

    i.icofont-discord {
        background: url('../../../assets/icons/social/discord-brand.png');
        width: 20px;
        height: 20px;
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: 3px;
        margin-top: 4px;
        margin-right: 13px;
    }

</style>

<script>

    import $ from 'jquery'

    export default {
        name: "Connection",
        props: ['connection'],
        methods: {
            onMouseOverConnectedBtn(event) {
                event.target.innerHTML = 'Disconnect <i class="icofont-link-broken"></i>'
            },
            onMouseLeaveConnectedBtn(event) {
                event.target.innerHTML = 'Connected <i class="icofont-link-alt"></i>'
            }
        }
    }

</script>