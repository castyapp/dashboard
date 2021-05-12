<template>

  <div id="settings">
    <TheaterUpdate :theater="theater" v-if="theater.user.id === user.id" />
  </div>

</template>

<style>

</style>

<script>

import TheaterUpdate from './TheaterUpdate'

export default {
  name: 'TheaterSettings',
  props: ['theater'],
  components: {
    TheaterUpdate,
  },
}

</script>
