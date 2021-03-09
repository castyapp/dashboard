<template>
  <li class="context-menu-item">
    <slot />
  </li>
</template>

<script>
export default {}
</script>

<style scoped>
.context-menu-item {
  display: block;
  position: relative;
  background: #131212;
  color: #eeeeee;
  text-decoration: none;
  font-size: 13px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  padding: 7px 10px;
  margin: 5px 0;
  border-radius: 4px;
}
.context-menu-item:hover, .context-menu-item:focus {
  background: #2c2c2d;
  color: #eeeeee;
  outline: none;
}
</style>

