import { axiosget } from "../../../../utils/http";

const actions = {
    getHeadData({ commit }) {
        axiosget("/portal/business/getcheckfee").then(
            (res) => {
                if (+res.code === 200) {
                    commit("updateHeadData", res.body);
                } else {
                    console.error("数据错了");
                }
            },
            () => {
                console.error("error");
            }
        );
    },
    getUpdateCityTitle({ commit }, title){
        commit('updateCityTitle', title);
    },
    getElecfeeTableData({ commit }) {
        axiosget("/portal/business/getelecfeetable").then(
            (res) => {
                if (+res.code === 200) {
                    commit("updateElecfeeTable", res.data);
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
