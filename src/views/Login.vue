<template>
  <div class="login">
    <h1>This is login page</h1>
    <a-button type="primary" @click="jumpToHome">Login</a-button>
  </div>
</template>
<script>
export default {
  methods: {
    jumpToHome() {
      this.$router.push({
        path: "/checkall",
      });
    },
  },
};
</script>
