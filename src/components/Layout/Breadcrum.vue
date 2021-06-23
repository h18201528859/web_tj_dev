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
        :defaultValue="cityId !== '-1' && elecfeeTable[cityId].prv_name"
        style="width: 120px"
        @change="handleChange"
      >
        <a-select-option
          v-for="(i, index) in provinceCode"
          :key="index"
          :value="index"
        >
          {{ i.name }}
        </a-select-option>
      </a-select>
    </span>
  </div>
</template>
<script>
import { provinceCode } from "../../const/constant";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "Breadcrum",
  computed: {
    ...mapState({
      breadcrumbArr: (state) => state.breadcrum.breadcrumbArr,
      elecfeeTable: (state) => state.elecfee.elecfeeTable,
      cityTitle: (state) => state.elecfee.cityTitle,
      cityId: (state) => state.elecfee.cityId,
    }),
  },
  data() {
    return {
      routes: this.breadcrumbArr,
      provinceCode,
    };
  },
  mounted() {
    const {
      params: { cityId = "-1" },
      name = "elecfee",
    } = this.$route;
    if (name == "elecfeecitydetail") {
      setTimeout(() => {
        const cityName = this.provinceCode[cityId].name;
        this.updateCityId(cityId);
        this.getUpdateCityTitle(cityName);
        this.$store.commit("replaceBreadcrumb", [
          {
            path: "/elecfee/elecfeeCityDetail",
            breadcrumbName: `${cityName}电费稽核`,
          },
        ]);
      }, 1000);
    }
  },
  watch: {
    "$route.path": function () {
      const { name = "elecfee" } = this.$route;
      if (name !== "elecfeecitydetail") {
        this.updateCityId("-1");
        this.getUpdateCityTitle("");
      }
    },
  },
  methods: {
    ...mapMutations("elecfee", ["updateCityId"]),
    ...mapActions("elecfee", ["getUpdateCityTitle"]),
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
      this.getUpdateCityTitle("");
      this.updateCityId("-1");
      this.$store.commit("setBreadcrumb", updateBread);
    },
    handleChange(key) {
      // console.log(this.elecfeeTable, key);
      const cityName = this.elecfeeTable[key].prv_name;
      this.updateCityId(key);
      this.getUpdateCityTitle(cityName);
      this.$store.commit("replaceBreadcrumb", [
        {
          path: "/elecfee/elecfeeCityDetail",
          breadcrumbName: `${cityName}电费稽核`,
        },
      ]);
      this.$router.push({
        name: "elecfeecitydetail",
        path: `/elecfee/elecfeeCityDetail/:cityId` + key,
        params: {
          cityId: key,
        },
      });
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
