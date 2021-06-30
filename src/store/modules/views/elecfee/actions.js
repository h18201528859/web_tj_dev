import { axiospost } from "../../../../utils/http";
import API from "../../../../const/apis";
const actions = {
    getHeadData({ commit }) {
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
    },
    getElecfeeTableData({ commit, rootState }, params) {
        commit("updateDetailTableLoading", true);
        const targetParams = Object.assign(
            rootState.elecfee.checkallParams,
            params
        );
        commit("updateParams", targetParams);
        commit("updateCurrentPage", targetParams);
        axiospost(API.getStatistics, targetParams).then(
            (res) => {
                if (+res.ret_code === 0) {
                    commit("updateElecfeeTable", {
                        data: res.ret_data.prv_data,
                        alldataTable: res.ret_data.all_data,
                        total: Number(res.ret_data.prv_data_len),
                    });
                    if (+targetParams.page_size === 10) {
                        commit("updateTopTen", {
                            data: res.ret_data.prv_data,
                        });
                    }
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
    getEchartsEleTableData({ commit, rootState }, params) {
        commit("updateDetailTableLoading", true);
        const targetParams = Object.assign(
            rootState.elecfee.checkEchartsPrvParams,
            params,
            { page_size: 31 }
        );
        commit("updateParams", targetParams);
        commit("updateCurrentPage", targetParams);
        axiospost(API.getImageStatistics, targetParams).then(
            (res) => {
                if (+res.ret_code === 0) {
                    commit("updateEchartsElecfeeTable", {
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
    getElecImgTableData({ commit, rootState }, params) {
        commit("updateDetailTableLoading", true);
        const targetParams = Object.assign(
            rootState.elecfee.checkImgParams,
            params
        );
        commit("updateParams", targetParams);
        commit("updateCurrentPage", targetParams);
        axiospost(API.getImageStatistics, targetParams).then(
            (res) => {
                if (+res.ret_code === 0) {
                    if (+targetParams.page_size === 31) {
                        console.log(
                            targetParams.page_size,
                            res.ret_data.prv_data,
                            "++++++"
                        );
                        commit("updateEchartsElecfeeTable", {
                            data: res.ret_data.prv_data,
                            total: Number(res.ret_data.prv_data_len),
                        });
                    } else {
                        commit("updateElecfeeTable", {
                            data: res.ret_data.prv_data,
                            alldataTable: res.ret_data.all_data,
                            total: Number(res.ret_data.prv_data_len),
                        });
                    }

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
