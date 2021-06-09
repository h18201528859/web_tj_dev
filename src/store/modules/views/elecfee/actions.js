import { axiosget,axiospost } from "../../../../utils/http";

const actions = {
    getHeadData({ commit }) {
        // axiosget("/Payment/GetSum").then(
        //     (res) => {
        //          console.log(res,'res');
        //         if (+res.ret_code === 10000) {
        //             commit("updateHeadData", res.ret_data.all_data);
        //         } else {
        //             console.error("数据错了");
        //         }
        //     },
        //     () => {
        //         console.error("error");
        //     }
        // );
        const data = {
            "total_amount": "234",
            "total_number": "120"
          }
        commit("updateHeadData", data);
    },
    getUpdateCityTitle({ commit }, title){
        commit('updateCityTitle', title);
    },
    getElecfeeTableData({ commit }) {
        axiosget("/POST/Payment/GetStatistics").then(
            (res) => {
                if (+res.code === 200) {
                    commit("updateElecfeeTable", res.ret_data.prv_data);
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