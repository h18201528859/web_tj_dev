import { axiosget, axiospost } from "../../../../utils/http";

const actions = {
    getHeadData({ commit }, timeRange) {
        axiospost("/Payment/GetSum", timeRange).then(
            (res) => {
                if (+res.ret_code === 10000) {
                    commit("updateHeadData", res.ret_data);
                } else {
                    console.error(res.ret_message);
                }
            },
            () => {
                console.error("error");
            }
        );
    },
    getCheckallTableData({ commit }) {
        axiosget("/portal/business/getcheckalltable").then(
            (res) => {
                if (+res.code === 200) {
                    commit("updateCheckAllTable", res.data);
                } else {
                    console.error("数据错了");
                }
            },
            () => {
                console.error("error");
            }
        );
    },
    getCheckallDetailData({ commit }, { page, pageSize }) {
        commit("updateCurrentPage", { page, pageSize });
        commit("updateDetailTableLoading", true);
        axiosget("/portal/business/getcheckalldetail", {
            page,
            pageSize,
        }).then(
            (res) => {
                if (+res.code === 200) {
                    commit("updateCheckAllDetail", res);
                    setTimeout(() => {
                        commit("updateDetailTableLoading", false);
                    }, 100);
                } else {
                    commit("updateDetailTableLoading", false);
                }
            },
            () => {
                commit("updateDetailTableLoading", false);
            }
        );
    },
};

export default actions;
