<template>
  <div class="bread-box">
    <a-breadcrumb :routes="breadcrumbArr">
      <template slot="itemRender" slot-scope="{ route, routes, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <span v-else>
          <a
            @click="JumptobreadLink"
            :href="`#/${
              paths.length === 1
                ? paths[0]
                : paths.length === 0
                ? ''
                : paths[paths.length - 1]
            }`"
          >
            {{ route.breadcrumbName }}
          </a>
          <!-- <a @click="JumptobreadLink" :href="`#/${JSON.stringify(paths)}`">
          {{ route.breadcrumbName }}
        </a> -->
        </span>
      </template>
    </a-breadcrumb>
    <span class="city-wrap" v-if="cityId !== '-1'">
      <a-select
        :defaultValue="cityId !== '-1' && cityArr[cityId].name"
        style="width: 120px"
        @change="handleChange"
      >
        <a-select-option v-for="i in cityArr" :key="i.id" :value="i.name">
          {{ i.name }}
        </a-select-option>
      </a-select>
    </span>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Breadcrum",
  mounted() {},
  computed: {
    ...mapState({
      breadcrumbArr: (state) => state.breadcrum.breadcrumbArr,
    }),
  },
  watch: {
    "$route.path": function () {
      const { cityId = "-1" } = this.$route.params;
      this.cityId = cityId;
    },
  },
  data() {
    return {
      routes: this.breadcrumbArr,
      cityId: "-1",
      cityArr: [
        { name: "全国", id: 0 },
        { name: "北京", id: 1 },
        { name: "上海", id: 2 },
        { name: "广州", id: 3 },
        { name: "深圳", id: 4 },
        { name: "河北", id: 5 },
        { name: "河南", id: 6 },
        { name: "湖南", id: 7 },
        { name: "江苏", id: 8 },
        { name: "湖北", id: 9 },
        { name: "广西", id: 10 },
        { name: "广东", id: 11 },
        { name: "江西", id: 12 },
      ],
    };
  },
  methods: {
    JumptobreadLink(e) {
      let hashStr = e.target.hash.substr(2);
      const matchedStr = hashStr.match(/\/(\S*)/);
      const currentHash = matchedStr ? matchedStr[1] : hashStr;
      ///更新url的操作
      this.$router.push({
        path: currentHash,
      });
      let updateBread = this.breadcrumbArr;
      //更新面包屑的操作
      updateBread.map((bread, i) => {
        if (bread.path === currentHash) {
          updateBread = updateBread.splice(0, i + 1);
        }
      });
      this.$store.commit("setBreadcrumb", updateBread);
    },
    handleChange(key) {
      console.log(key);
    },
  },
};
</script>
<style lang="less" scoped>
.bread-box {
  display: flex;
  position: relative;
  .city-wrap {
    position: absolute;
    right: 20px;
  }
}
</style>
