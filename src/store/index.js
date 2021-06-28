import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/components/login";
import breadcrum from "./modules/components/breadcrum";
import checkall from "./modules/views/checkall";
import checkdetail from "./modules/views/checkdetail";
import elecfee from "./modules/views/elecfee";
import provincefee from "./modules/views/provincefee";
// import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const store = new Vuex.Store({
    // plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
    modules: {
        login,
        breadcrum,
        checkall,
        checkdetail,
        elecfee,
        provincefee,
    },
});

export default store;
