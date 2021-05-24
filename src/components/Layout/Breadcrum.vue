<template>
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
  data() {
    return {
      routes: this.breadcrumbArr,
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
  },
};
</script>
