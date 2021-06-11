import { axiospost } from "../../../../utils/http";
import API from "../../../../const/apis";
const actions = {
    getHeadData({ commit }) {
        axiospost(API.getElecSum).then(
            (res) => {
                if (+res.ret_code === 10000) {
                    commit("updateHeadData", res.ret_data);
                } else {
                    console.error("数据错了");
                }
            },
            () => {
                console.error("error");
            }
        );
    },
    getUpdateCityTitle({ commit }, title) {
        commit("updateCityTitle", title);
    },
    getElecfeeTableData({ commit, rootState }, params) {
        commit("updateDetailTableLoading", true);
        const targetParams = Object.assign(
            rootState.checkall.checkallParams,
            params
        );
        commit("updateParams", targetParams);
        commit("updateCurrentPage", targetParams);
        // console.log(targetParams, "===>请求参数");
        axiospost(API.getStatistics, targetParams).then(
            (res) => {
                // console.log(res);
                if (+res.ret_code === 10000) {
                    commit("updateElecfeeAllTable", res.ret_data.all_data);
                    commit("updateElecfeeTable", res.ret_data.prv_data);
                    setTimeout(() => {
                        commit("updateDetailTableLoading", false);
                    }, 300);
                } else {
                    commit("updateDetailTableLoading", false);
                    console.error("数据错了");
                }
            },
            () => {
                commit("updateDetailTableLoading", false);
                console.error("error");
            }
        );
    },
};

export default actions;
