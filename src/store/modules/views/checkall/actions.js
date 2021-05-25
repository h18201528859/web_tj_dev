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
        axiosget("/portal/business/getcheckalldetail", {
            page,
            pageSize,
        }).then(
            (res) => {
                if (+res.code === 200) {
                    commit("updateCheckAllDetail", res);
                } else {
                    console.error("数据错了");
                }
            },
            () => {
                console.error("error");
            }
        );
    },
};

export default actions;
