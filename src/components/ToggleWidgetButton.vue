<template>
  
  <button class="toggleWidget pull-right" @click="toggle">
    <i class="icofont-minus" v-if="widgetShow"></i>
    <i class="icofont-plus" v-else></i>
  </button>

</template>

<style scoped>

.toggleWidget {
  border: none;
  color: #FFF;
  font-size: 14px;
  background: #0e1115;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  text-align: center;
  padding-top: 0px;
}

</style>

<script>

export default {
  name: 'ToggleWidgetButton',
  props: ['widgetShow'],
  methods: {
    toggle() {
      this.$emit('onToggle', !this.widgetShow)
    },
  },
  mounted() {
    
  }
}

</script>
