const mutations = {
    updateHeadData(state, data) {
        state.headData = data;
    },
    updateElecfeeTable(state, data) {
        state.elecfeeTable = data;
    },
    updateElecfeeAllTable(state, data) {
        state.checkElecfeeAllTable = data;
    },
    updateCheckAllDetail(state, data) {
        state.elecfeeDetail = data.body;
        state.detailTotal = data.total;
    },
    updateCurrentPage(state, data) {
        state.detailPage = data.page;
        state.detailPagesize = data.pageSize;
    },
    updateDetailTableLoading(state, loading) {
        state.detailTableLoading = loading;
    },
    updateParams(state, data) {
        //把更改的参数传进来，然后生成新的参数对象
        state.checkallParams = data;
    },
    updateCityTitle(state, cityName) {
        const initCityTitle = {
            surveyTitle: "电费稽核概况",
            provinceTitle: "各省缴费单金额统计TOP10",
            scoreTitle: "各评分区间占比",
            tabProvinceTitle: "各省缴费单金额统计TOP10",
        };
        const {
            surveyTitle,
            provinceTitle,
            scoreTitle,
            tabProvinceTitle,
        } = initCityTitle;
        const oData = {
            surveyTitle: cityName + surveyTitle,
            provinceTitle: cityName + provinceTitle,
            scoreTitle,
            tabProvinceTitle: cityName + tabProvinceTitle,
        };
        state.cityTitle = oData;
    },
    updateCityId(state, id) {
        state.cityId = id;
    },
};
export default mutations;
