<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div :class="collapsed ? 'collapsed-logo' : 'logo'">
        <img id="uncollapsed-logo" v-if="!collapsed" src="@/assets/logo.png" />
        <img
          id="collapsed-logo"
          v-else-if="collapsed"
          src="@/assets/cmcc.png"
        />
      </div>
      <div v-if="!collapsed" class="sub-menu">
        <div class="layout-siderbar__logo">
          <img src="@/assets/jiutian.png" />
        </div>
        <div class="layout-siderbar__title">
          <div class="divide"></div>
          <p>智能稽核平台</p>
          <div class="divide"></div>
        </div>
      </div>

      <Sidebar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="header-operation">
          <div class="header-operation--item">消息中心</div>
          <div class="header-operation--item">帮助中心</div>
          <div class="header-operation--item">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="gotoLogout">
                  <a-icon type="logout" />
                  <span>退出登录</span>
                </a-menu-item>
              </a-menu>
              <span>{{ UserName }}<a-icon type="caret-down" /></span>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <Breadcrum class="layout-breadcrum" />
      <a-layout-content
        :style="{
          minHeight: '100vh',
          margin: '24px',
          minHeight: '280px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Breadcrum from "./Breadcrum";
import Sidebar from "./Sidebar";
export default {
  components: {
    Breadcrum,
    Sidebar,
  },
  data() {
    return {
      collapsed: false,
      UserName: "user name",
    };
  },
  mounted() {
    const loginName = window.sessionStorage.getItem("username");
    this.UserName = loginName;
  },
  methods: {
    gotoLogout() {
      this.$confirm({
        title: "您确定登出吗？",
        content: "登出将不再保存您的个性化内容",
        okText: "确定",
        okButtonProps: {},
        cancelText: "取消",
        onOk() {
          window.location.href = "#/login";
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
  },
};
</script>
<style lang="less">
.ant-layout-sider {
  background: #172b4d;
}
.ant-menu-dark,
.ant-menu-dark .ant-menu-sub {
  background: #172b4d;
}
.ant-menu-item {
  background: #172b4d;
}
.ant-menu-dark.ant-menu-inline .ant-menu-item,
.ant-menu-dark.ant-menu-inline .ant-menu-submenu-title {
  margin: 0;
}
.layout-header {
  height: 56px;
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0;
  box-shadow: 0px -1px 8px 1px rgba(0, 0, 0, 0.2);
  z-index: 2;
}
.layout-breadcrum {
  height: 58px;
  background: #ffffff;
  padding: 20px 24px;
  text-align: left;
}
.layout-header .header-operation {
  margin-right: 24px;
  display: flex;
  .header-operation--item {
    height: 100%;
    padding: 0 16px;
    font-size: 12px;
    border-left: 1px solid #f4f4f4;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #333333;
  }
  .header-operation--item:last-child {
    border-right: 1px solid #f4f4f4;
  }
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  padding: 15px 60px;
  background: #081a39;
}
#components-layout-demo-custom-trigger .logo #uncollapsed-logo {
  width: 90px;
}

.collapsed-logo {
  padding: 14px;
  background: #081a39;
  #collapsed-logo {
    width: 27px;
  }
}

.sub-menu {
  .layout-siderbar__logo {
    height: 32px;
    margin: 16px;
    text-align: center;
    img {
      height: 120%;
    }
  }
  .layout-siderbar__title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    padding: 16px;
    .divide {
      width: 16px;
      height: 1px;
      background: #ffffff;
      opacity: 0.19;
    }
    p {
      margin: 0 16px;
    }
  }
}
.ant-layout-header {
  text-align: left;
}
.ant-menu-item {
  text-align: left;
  color: #d0d0d0;
}
.ant-menu-item span {
  color: #d0d0d0;
  margin-left: 15px;
}
</style>