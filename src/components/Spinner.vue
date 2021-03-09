<template>

  <div class="lds-ellipsis" v-if="loading">
    <div :style="'background: rgb(' + color + ')'"></div>
    <div :style="'background: rgb(' + color + ')'"></div>
    <div :style="'background: rgb(' + color + ')'"></div>
    <div :style="'background: rgb(' + color + ')'"></div>
  </div>

</template>

<style scoped>

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1-data-v-e484af18 0.6s infinite;
  }

  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

</style>

<script>
  export default {
    name: "Spinner",
    props: ['loading', 'color'],
  }
</script>
