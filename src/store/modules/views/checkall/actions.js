import { axiospost } from "../../../../utils/http";
import API from "../../../../const/apis";

const actions = {
    getHeadData({ commit }, timeRange) {
        axiospost(API.getSum, timeRange).then(
            (res) => {
                if (+res.ret_code === 0) {
                    commit("updateHeadData", res.ret_data);
                    commit("updateCharts", res.ret_data);
                } else {
                    console.error(res.ret_message);
                }
            },
            () => {
                console.error("error");
            }
        );
    },
    getCheckallTableData({ commit, rootState }, params = {}) {
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
                if (+res.ret_code === 0) {
                    commit("updateCharts", res.ret_data.all_data);
                    commit("updateCheckAllTable", [res.ret_data.all_data]);
                    commit("updateCheckAllDetail", {
                        data: res.ret_data.prv_data,
                        length: res.ret_data.prv_data_len,
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
