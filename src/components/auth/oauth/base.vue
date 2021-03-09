<template>
  <div class="p-4">
    <router-view name="oauth" />
  </div>
</template>

<script>

export default {
  name: "OAuthentication",
  methods: {
    getNewState() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
  },    
}

</script>
