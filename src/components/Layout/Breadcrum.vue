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
    <span class="city-wrap" v-if="isProvince">
      <a-select
        style="width: 120px"
        @change="handleChange"
        :value="defaultCity"
      >
        <a-select-option
          v-for="i in provinceCode"
          :key="i.code"
          :value="i.code"
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
      isProvince: (state) => state.breadcrum.isProvince,
    }),
  },
  watch: {
    "$route.path"() {
      this.defaultCity = this.$route.query.cityId;
    },
  },
  data() {
    return {
      routes: this.breadcrumbArr,
      provinceCode,
      defaultCity: "",
    };
  },
  mounted() {
    const currentCity = this.$route.query.cityId;
    this.defaultCity = currentCity;
  },
  methods: {
    ...mapMutations("elecfee", ["updateCityId"]),
    ...mapActions("provincefee", [
      "getHeadData",
      "getUpdateCityTitle",
      "getProElecfeeTableData",
      "getElecImgTableData",
    ]),
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
      this.updateCityId("QG");
      this.$store.commit("setBreadcrumb", updateBread);
    },
    getCodeVerIndex(code) {
      let strName;
      provinceCode.find((item) => {
        if (item.code == code) {
          strName = item.name.length >= 3 ? item.name.slice(0, 2) : item.name;
        }
      });
      return strName;
    },
    getCodeName(name) {
      let codeName;
      provinceCode.find((item) => {
        const newName =
          item.name.length >= 3 ? item.name.slice(0, 2) : item.name;
        if (newName == name) {
          codeName = item.code;
        }
      });
      return codeName;
    },
    handleChange(name) {
      this.defaultCity = name;
      const cityName = this.getCodeVerIndex(name);
      console.log(cityName, name, "--->");
      const nowUpdataCityId = this.getCodeName(name);
      this.updateCityId(nowUpdataCityId);
      this.getUpdateCityTitle(cityName);
      if (name !== "") {
        const searchParam = { prv_code: name };
        this.getHeadData(searchParam);
        this.getProElecfeeTableData(searchParam);
        this.getElecImgTableData(searchParam);
        this.$store.commit("replaceBreadcrumb", [
          {
            path: "/provincefee",
            breadcrumbName: `${cityName}电费稽核`,
          },
        ]);
        this.$router.push({
          path: `/provincefee`,
          query: {
            cityId: name,
            cityName: cityName,
          },
        });
      } else {
        window.location.hash = "/elecfee";
      }
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
