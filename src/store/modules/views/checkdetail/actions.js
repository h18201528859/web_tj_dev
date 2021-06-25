import { axiospost } from "../../../../utils/http";
import API from "../../../../const/apis";

const actions = {
    getCheckallDetailData({ commit, rootState }, { type = 1, params }) {
        const targetParams = Object.assign(
            rootState.checkdetail.checkParams,
            params
        );
        commit("updateParams", targetParams);
        commit("updateCurrentPage", targetParams);
        commit("updateDetailTableLoading", true);
        let api = API.getStatistics;
        //type:
        // 1：缴费单+全国
        // 2：电表+全国
        //
        switch (type) {
            case 1:
                api = API.getStatistics;
                break;
            case 2:
                api = API.getImageStatistics;
                break;
            default:
                break;
        }
        axiospost(api, params).then(
            (res) => {
                if (+res.ret_code === 0) {
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
