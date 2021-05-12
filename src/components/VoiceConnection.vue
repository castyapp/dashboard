<template>
 
  <div class="voice-connection" :class="{'talking': conn.talking}">
    <img :src="cdnUrl + '/avatars/' + conn.user.avatar + '.png'" 
         class="user-voice-avatar" 
         :alt="conn.user.fullname" />
    <div class="actions-overlay">
      <i v-if="conn.muted" class="icofont-mic-mute"></i>
      <i v-if="conn.deafen" class="icofont-volume-mute"></i>
    </div>
    <strong>
      {{ getStringSub(conn.user.fullname, 12) }}
    </strong>
  </div>

</template>

<style scoped>

.voice-connection {
  display: flex;
  flex-flow: column;
  float: left;
  margin: 5px 8px;
  text-align: center;
  width: 40px;
}

.voice-connection > img.user-voice-avatar {
  border: 2px solid #151a21;
  width: 40px;
  border-radius: 40%;
  background: #0e1115;
}

.voice-connection.talking > img.user-voice-avatar {
  border: 2px solid #3f51b5;
}

.voice-connection > strong {
  margin-top: 5px;
  font-size: 14px;
}

.actions-overlay {
  position: absolute;
  margin: 20px 0;
  width: 40px;
  color: #f44336;
  text-align: right;
  text-shadow: 0 0 6px #000;
  font-weight: lighter;
}

</style>

<script>

export default {
  name: 'VoiceConnections',
  props: ['conn'],
}

</script>
