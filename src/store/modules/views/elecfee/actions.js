import { axiospost } from "../../../../utils/http";
import API from "../../../../const/apis";
const actions = {
    getHeadData({ commit }, params) {
        if (!params.prv_code) {
            axiospost(API.getElecSum, {}).then(
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
        } else {
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
        }
    },
    getUpdateCityTitle({ commit }, title) {
        commit("updateCityTitle", title);
    },
    getElecfeeTableData({ commit, rootState }, params) {
        commit("updateDetailTableLoading", true);
        const targetParams = Object.assign(
            rootState.elecfee.checkallParams,
            params
        );
        commit("updateParams", targetParams);
        commit("updateCurrentPage", targetParams);
        console.log(targetParams, "===>请求参数");
        axiospost(API.getStatistics, targetParams).then(
            (res) => {
                if (+res.ret_code === 0) {
                    commit("updateElecfeeTable", {
                        data: res.ret_data.prv_data,
                        total: Number(res.ret_data.prv_data_len),
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
    getProElecfeeTableData({ commit, rootState }, params) {
        commit("updateDetailTableLoading", true);
        const targetParams = Object.assign(
            rootState.elecfee.checkPrvParams,
            params
        );
        commit("updateParams", targetParams);
        commit("updateCurrentPage", targetParams);
        console.log(targetParams, "===>请求参数");
        axiospost(API.getPrvStatistics, targetParams).then(
            (res) => {
                if (+res.ret_code === 0) {
                    commit("updatePrvTable", {
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
            rootState.elecfee.checkallParams,
            params
        );
        commit("updateParams", targetParams);
        commit("updateCurrentPage", targetParams);
        axiospost(API.getImageStatistics, targetParams).then(
            (res) => {
                if (+res.ret_code === 0) {
                    commit("updateElecfeeTable", {
                        data: res.ret_data.prv_data,
                        total: Number(res.ret_data.prv_data_len),
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
