import Vue from "vue";
import VueRouter from "vue-router";

//解决重复点击vue导航报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((error) => {});
};

//layout
import Layout from "../components/Layout/Layout.vue";

// import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

//views
import Checkall from "../views/Checkall/Checkall.vue";
import Elecfee from "../views/Elecfee/Elecfee.vue";
import CheckDetail from "../views/CheckDetail/CheckDetail.vue";
import Provincefee from "../views/Provincefee/Provincefee.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/checkall",
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/checkall",
        component: Layout,
        children: [
            {
                path: "",
                name: "checkall",
                component: Checkall,
            },
        ],
    },
    {
        path: "/checkdetail",
        component: Layout,
        children: [
            {
                path: "",
                name: "checkdetail",
                component: CheckDetail,
            },
        ],
    },
    {
        path: "/elecfee",
        component: Layout,
        children: [
            {
                path: "",
                name: "elecfee",
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ "../views/Elecfee/Elecfee.vue"
                    ),
            },
        ],
    },
    {
        path: "/provincefee",
        component: Layout,
        children: [
            {
                path: "",
                name: "provincefee",
                component: Provincefee,
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;
