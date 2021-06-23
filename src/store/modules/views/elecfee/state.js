const state = {
    cityTitle: {
        surveyTitle: "电费稽核概况",
        provinceTitle: "各省缴费单金额统计TOP10",
        scoreTitle: "各评分区间占比",
        tabProvinceTitle: "各省缴费单金额统计TOP10",
    },
    currentType: "1",
    checkallParams: {
        start_time: "",
        end_time: "",
        scope: "0",
        prv_array: "",
        object: "0",
        score: "1,2,3,4",
        page: 1,
        page_size: 10,
    },
    checkPrvParams: {
        start_time: "",
        end_time: "",
        scope: "2",
        prv_code: "",
        object: "0",
        score: "1,2,3,4",
        page: 1,
        page_size: 10,
    },
    checkElecfeeAllTable: [],
    cityId: "QG",
    elecfeeDetail: [],

    headData: [],
    elecfeeTable: [],
    provinceTable: [],
    detailTotal: 0,
    detailPage: 1,
    detailPagesize: 10,
    detailTableLoading: false,
};

export default state;
