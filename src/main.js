import Vue from "vue";
import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import * as echarts from "echarts";

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = Axios;

Axios.defaults.headers.post["Content-Type"] = "application/json";

let proEnv = require("../config/pro.env");
if (process.env.NODE_ENV === "development") {
    Axios.defaults.baseURL = "/api";
}
if (process.env.NODE_ENV === "production") {
    Axios.defaults.baseURL = `http://${window.location.hostname}:${proEnv.port}/`;
}

Vue.config.productionTip = false;

Vue.use(antd);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
