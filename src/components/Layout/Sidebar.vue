<template>
  <div class="layout-siderbar">
    <a-menu
      theme="dark"
      mode="inline"
      :default-selected-keys="defaultSelectedKeys"
      :default-open-keys="defaultOpenKeys"
      :selectedKeys="selectedKeys"
      @click="clickMenu"
    >
      <a-sub-menu v-for="menu in menus" :key="menu.key">
        <span slot="title">
          <a-icon :type="menu.iconType" />
          <span>{{ menu.name }}</span>
        </span>
        <template v-if="menu.isChildren">
          <a-menu-item v-for="menuItem in menu.children" :key="menuItem.key">
            <span>{{ menuItem.name }}</span>
          </a-menu-item>
        </template>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
import { mapState } from "vuex";
import util from "../../utils/utils";
import MENUITEM from "../../const/menu";

export default {
  name: "Sidebar",
  data() {
    return {
      menus: [],
      defaultSelectedKeys: ["checkall"],
      defaultOpenKeys: [""],
      selectedKeys: [""],
    };
  },
  computed: {
    ...mapState({
      breadcrumbArr: (state) => state.breadcrum.breadcrumbArr,
    }),
  },
  created() {
    this.menus = MENUITEM.menuItems;
  },
  beforeMount() {
    this.getCurrentMenu();
  },

  methods: {
    updateCurrentBreads() {
      const currentHash = location.hash.substr(2);
      let targetMenuArr = [];
      this.menus.map((menuItem) => {
        if (menuItem.key === currentHash) {
          this.selectedKeys = [currentHash];
        } else {
          if (menuItem.isChildren) {
            menuItem.children.map((item) => {
              if (item.key === currentHash) {
                targetMenuArr.push(menuItem.key, item.key);
              }
            });
          }
        }
      });
      this.selectedKeys = targetMenuArr;
      this.$store.dispatch("getCurrentBread", {
        breads: targetMenuArr,
        menus: this.menus,
      });
    },
    getCurrentMenu() {
      window.addEventListener("hashchange", () => {
        // console.log("hashchange");
        this.updateCurrentBreads();
      });
      //禁止掉浏览器的后退行为
      window.addEventListener("popstate", () => {
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", function () {
          history.pushState(null, null, document.URL);
        });
      });
      window.onbeforeunload = () => {
        window.localStorage.setItem(
          "lastBreads",
          JSON.stringify(this.breadcrumbArr)
        );
      };
      window.onload = () => {
        const lastBread = window.localStorage.getItem("lastBreads");
        this.$store.commit("setBreadcrumb", JSON.parse(lastBread));
        let currentMenu = [];
        this.breadcrumbArr.map((item) => {
          currentMenu.push(item.path || "");
        });
        this.defaultSelectedKeys = currentMenu;
        this.selectedKeys = currentMenu;
      };
    },
    clickMenu(e) {
      let routePath = e.keyPath[0];
      this.selectedKeys = e.keyPath;
      let breadArr = e.keyPath;
      breadArr.reverse();
      this.$store.dispatch("getCurrentBread", {
        breads: breadArr,
        menus: this.menus,
      });
      this.$router.push({
        path: `/${routePath}`,
      });
      util.jumpTop();
    },
  },
};
</script>

<style>
.ant-menu-item.ant-menu-item-selected > span {
  color: white;
}
</style>