<template>

    <div class="connection mr-2 full-width" :class="{ 'connected': connection.connected }">

        <div class="connection-title pull-left">

            <i :style="'color: ' + getServiceColor(connection.service) " 
                :class="'icofont-' + connection.service"></i> 
            
            <span v-if="connection.connected">
                <strong>Connected:</strong> 
                {{ connection.data.name }}
            </span>

            <span v-else>
                Connect your {{ connection.service }} account
            </span>

        </div>

        <button v-if="connection.connected" 
            class="pull-right disconnect-btn"
            :style="'background-color: ' + connectBtnColor"
            @mouseover="onMouseOverConnectedBtn($event)"
            @mouseleave="onMouseLeaveConnectedBtn($event)">
            {{ connectBtnText }} 
            <i :class="connectBtnIcon"></i>
        </button>

        <router-link v-else
            class="pull-right" 
            :to="{ name: `${connection.service}_oauth_connect`, query:{'ref': 'dashboard'} }">
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
        background: url('../../../assets/icons/social/discord-color.svg');
        width: 25px;
        height: 25px;
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: 2px;
    }

</style>

<script>

    import $ from 'jquery'

    export default {
        name: "Connection",
        props: ['connection'],
        data() {
            return {
                connectBtnText: 'Connected',
                connectBtnIcon: 'icofont-check',
                connectBtnColor: '#28a745'
            }
        },
        methods: {
            onMouseOverConnectedBtn(event) {
                this.connectBtnText = 'Disconnect'
                this.connectBtnIcon = 'icofont-close'
                this.connectBtnColor = '#dc3545'
            },
            onMouseLeaveConnectedBtn(event) {
                this.connectBtnText = 'Connected'
                this.connectBtnIcon = 'icofont-check'
                this.connectBtnColor = '#28a745'
            },
            getServiceColor(service) {
                switch (service) {
                    case 'spotify': return '#1DB954'; break;
                    case 'discord': return '#FFFFFF'; break;
                    default: return '#FFFFFF';
                }
            }
        }
    }

</script>