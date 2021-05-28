import { axiosget } from "../../../../utils/http";
const actions = {
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
    getUpdateCityTitle({ commit }, title){
        commit('updateCityTitle', title)
    }
};

export default actions;
