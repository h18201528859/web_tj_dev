<template>
  <div>
    <p>电费稽核</p>
    <a-button @click="JumpToDetail">稽核详情</a-button>
    <a-button @click="JumpToProvince">省级详情</a-button>
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
    JumpToProvince() {
      this.$store.dispatch("setCurrentBread", [
        {
          path: "provincefee",
          breadcrumbName: "省级详情",
        },
      ]);
      this.$router.push({
        path: "/provincefee",
      });
    },
  },
};
</script>


<style>
</style>