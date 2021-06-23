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
    <span class="city-wrap" v-if="cityId !== 'QG'">
      <a-select
        :defaultValue="cityId !== 'QG' && this.getCodeVerIndex(cityId)"
        style="width: 120px"
        @change="handleChange"
      >
<<<<<<< HEAD
        <a-select-option v-for="(i) in provinceCode" :key="i.code" :value="i.code">
=======
        <a-select-option
          v-for="(i, index) in provinceCode"
          :key="index"
          :value="index"
        >
>>>>>>> 2102481ef61fe09f70148853a4eb924c819bf85c
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
<<<<<<< HEAD
  mounted(){
     const { params:{ cityId = 'QG' },name = 'elecfee'} = this.$route;
     if(name=="elecfeecitydetail"){
       setTimeout(()=>{

        const cityName =this.getCodeVerIndex(cityId)// this.provinceCode[cityId].name;
=======
  mounted() {
    const {
      params: { cityId = "-1" },
      name = "elecfee",
    } = this.$route;
    if (name == "elecfeecitydetail") {
      setTimeout(() => {
        const cityName = this.provinceCode[cityId].name;
>>>>>>> 2102481ef61fe09f70148853a4eb924c819bf85c
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
<<<<<<< HEAD
  watch:{
    '$route.path':function(){
      const { name='elecfee' } = this.$route;
      if(name!=='elecfeecitydetail'){
         this.updateCityId('QG');
         this.getUpdateCityTitle('');
=======
  watch: {
    "$route.path": function () {
      const { name = "elecfee" } = this.$route;
      if (name !== "elecfeecitydetail") {
        this.updateCityId("-1");
        this.getUpdateCityTitle("");
>>>>>>> 2102481ef61fe09f70148853a4eb924c819bf85c
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
      this.updateCityId("QG");
      this.$store.commit("setBreadcrumb", updateBread);
    },
<<<<<<< HEAD
     getCodeVerIndex(code){
       let strName;
        provinceCode.find(item=>{
          if(item.code==code){
            strName = item.name.length>=3?item.name.slice(0,2):item.name
          }
        })
       return strName;
    },
     getCodeName(name){
     let codeName;
     provinceCode.find(item=>{
         const newName = item.name.length>=3?item.name.slice(0,2):item.name;
          if(newName==name){
            codeName = item.code
          }
        })
       return codeName;
    },
    handleChange(name) {
      const cityName = this.getCodeVerIndex(name);
      const nowUpdataCityId = this.getCodeName(name)
      this.updateCityId(nowUpdataCityId);
=======
    handleChange(key) {
      // console.log(this.elecfeeTable, key);
      const cityName = this.elecfeeTable[key].prv_name;
      this.updateCityId(key);
>>>>>>> 2102481ef61fe09f70148853a4eb924c819bf85c
      this.getUpdateCityTitle(cityName);
      this.$store.commit("replaceBreadcrumb", [
        {
          path: "/elecfee/elecfeeCityDetail",
          breadcrumbName: `${cityName}电费稽核`,
        },
      ]);
      this.$router.push({
        name: "elecfeecitydetail",
        path: `/elecfee/elecfeeCityDetail/:cityId` + name,
        params: {
          cityId: name,
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
