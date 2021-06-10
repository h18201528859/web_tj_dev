const state = {
   cityTitle : {
        surveyTitle: '电费稽核概况',
        provinceTitle: '各省缴费单金额统计TOP10',
        scoreTitle: '各评分区间占比',
        tabProvinceTitle: '各省缴费单金额统计TOP10'
    },
    checkallParams: {
        start_time: "",
        end_time: "",
        scope: "1",
        object: "0",
        page: 1,
        pageSize: 10,
    },
    checkElecfeeAllTable:{},
    cityId: '-1',
    elecfeeDetail: [],
    headData: [],
    elecfeeTable: [],
    detailTotal: 0,
    detailPage: 1,
    detailPagesize: 10,
    detailTableLoading: false,
};

export default state;
