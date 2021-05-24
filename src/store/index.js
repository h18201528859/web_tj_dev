import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/components/login";
import breadcrum from "./modules/components/breadcrum";
import checkall from "./modules/views/checkall";
// import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const store = new Vuex.Store({
    // plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
    modules: {
        login,
        breadcrum,
        checkall,
    },
});

export default store;
