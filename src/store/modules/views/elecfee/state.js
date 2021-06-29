const state = {
    cityTitle: {
        surveyTitle: "电费稽核概况",
        provinceTitle: "各省缴费单金额统计TOP10",
        scoreTitle: "各评分区间占比",
        tabProvinceTitle: "各省缴费单金额统计TOP10",
    },
    alldataTable: {
        total_amount: 0,
        pass_number: 0,
        notpass_number: 0,
        zerotosix: 0,
        sixtoeight: 0,
        eighttonine: 0,
        ninetoten: 0,
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
    checkImgParams: {
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
    checkEchartsPrvParams: {
        start_time: "",
        end_time: "",
        scope: "2",
        prv_code: "",
        object: "0",
        score: "1,2,3,4",
        page: 1,
        page_size: 31,
    },
    checkElecfeeAllTable: [],
    cityId: "QG",
    elecfeeDetail: [],

    headData: [],
    elecfeeTable: [],
    EchartsEleTable: [],
    provinceTable: [],
    detailTotal: 0,
    detailPage: 1,
    detailPagesize: 10,
    detailTableLoading: false,
};

export default state;
