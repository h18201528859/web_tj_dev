<template>
  <div>
    省详情
    <a-button @click="JumpToDetail">稽核详情</a-button>
  </div>
</template>

<script>
export default {
  methods: {
    JumpToDetail() {
      this.$store.dispatch("setCurrentBread", [
        {
          path: "checkdetail",
          breadcrumbName: "稽核详情",
        },
      ]);
      this.$router.push({
        path: "/checkdetail",
      });
    },
  },
};
</script>

<style>
</style>