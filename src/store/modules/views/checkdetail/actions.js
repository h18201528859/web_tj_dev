import { axiospost } from "../../../../utils/http";
import API from "../../../../const/apis";

const actions = {
    getCheckallDetailData({ commit }, { type = 1, params }) {
        //type:
        // 1：缴费单+全国
        // 2：缴费单+省份
        // 3：电表+全国
        // 4：电表+省份
        //

        commit("updateCurrentPage", {
            page: params.page,
            page_size: params.page_size,
        });
        commit("updateDetailTableLoading", true);
        let api = API.getStatistics;
        switch (type) {
            case 1:
                api = API.getStatistics;
                break;
            case 2:
                api = API.getPrvStatistics;
                break;
            case 3:
                api = API.getImageStatistics;
                break;
            case 4:
                api = API.getImgPrvStatistics;
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
