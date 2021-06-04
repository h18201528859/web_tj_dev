const state = {
    headData: [],
    lineData: [0, 0, 0],
    pieData: [
        { value: 0, name: "电费" },
        { value: 0, name: "铁塔服务费" },
        { value: 0, name: "租费" },
    ],
    checkallTable: [],
    checkallDetail: [],
    detailTotal: 0,
    detailPage: 1,
    detailPagesize: 10,
    detailTableLoading: false,
};

export default state;
