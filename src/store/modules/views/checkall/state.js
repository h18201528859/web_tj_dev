const state = {
    headData: [],
    lineData: [0, 0, 0],
    pieData: [
        { value: 0, name: "电费" },
        { value: 0, name: "铁塔服务费" },
        { value: 0, name: "租费" },
    ],
    checkallTable: [], //全国表格数据
    checkallParams: {
        start_time: "",
        end_time: "",
        scope: "1",
        object: "0",
        page: 1,
        pageSize: 10,
    },
    checkallDetail: [], //稽核详情表格数据
    detailTotal: 0, //详情表格全部记录条数
    detailPage: 1,
    detailPagesize: 10,
    detailTableLoading: false,
};

export default state;
