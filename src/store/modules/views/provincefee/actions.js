import { axiospost } from "../../../../utils/http";
import API from "../../../../const/apis";
const actions = {
    getHeadData({ commit }, params) {
        axiospost(API.getElecPrvSum, params).then(
            (res) => {
                if (+res.ret_code === 0) {
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

    getProElecfeeTableData({ commit, rootState }, params) {
        commit("updateDetailTableLoading", true);
        const targetParams = Object.assign(
            rootState.provincefee.checkPrvParams,
            params
        );
        commit("updateParams", targetParams);
        commit("updateCurrentPage", targetParams);
        // console.log(targetParams, "===>请求参数");
        axiospost(API.getPrvStatistics, targetParams).then(
            (res) => {
                if (+res.ret_code === 0) {
                    commit("updatePrvTable", {
                        alldataTable: res.ret_data.all_data,
                        data: res.ret_data.preg_data,
                        total: Number(res.ret_data.preg_data_len),
                    });
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
    getElecImgTableData({ commit, rootState }, params) {
        commit("updateDetailTableLoading", true);
        const targetParams = Object.assign(
            rootState.provincefee.checkEchartsPrvParams,
            params
        );
        commit("updateParams", targetParams);
        commit("updateCurrentPage", targetParams);
        axiospost(API.getImgPrvStatistics, targetParams).then(
            (res) => {
                if (+res.ret_code === 0) {
                    commit("updateElecfeeTable", {
                        alldataTable: res.ret_data.all_data,
                        data: res.ret_data.preg_data,
                        total: Number(res.ret_data.preg_data_len),
                    });
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
