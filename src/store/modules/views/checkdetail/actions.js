import { axiospost } from "../../../../utils/http";
import API from "../../../../const/apis";

const actions = {
    getCheckallDetailData({ commit }, { page, pageSize }) {
        commit("updateCurrentPage", { page, pageSize });
        commit("updateDetailTableLoading", true);
        axiospost(API.getStatistics, {
            page,
            pageSize,
        }).then(
            (res) => {
                if (+res.ret_code === 10000) {
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
