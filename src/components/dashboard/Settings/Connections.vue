<template>

  <div class="form-dark col-md-12">

    <div class="form-group">

      <strong class="clearfix">Connections</strong>
      <span>Connect your accounts</span>

      <div class="connections mt-3">

        <Connection v-bind:key="'connection-' + connection.service" 
                    v-for="connection in connections"
                    :connection="connection" />

      </div>

    </div>

  </div>

</template>

<script>

import Connection from './Connection'
import { proto } from 'libcasty-protocol-js/commonjs'

export default {
  name: "Connections",
  data() {
    return {
      connections: {
        //spotify: {
        //  service: 'spotify', 
        //  connected: false,
        //  data: {},
        //},
        google: {
          service: 'google',  
          connected: false,
          data: {},
        },
      },
    }
  },
  components: {
    Connection,
  },
  methods: {
    loadConnections() {
      this.loadedConnections = [];
      this.$store.dispatch('userConnections').then(response => {

        response.data.result.forEach(connection => {
          switch (connection.type) {
            case proto.Connection.Type.GOOGLE:
              this.connections.google.connected = true;
              this.connections.google.data = connection;
              break;
            case proto.Connection.Type.SPOTIFY:
              this.connections.spotify.connected = true;
              this.connections.spotify.data = connection;
              break
              // case proto.Connection.Type.DISCORD:
              //     this.connections.discord.connected = true;
              //     this.connections.discord.data = connection;
              //     break
          }
        })

      }).catch(console.log)
    }
  },
  mounted() {
    this.loadConnections()
  }
}

</script>
