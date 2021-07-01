const mutations = {
    updateHeadData(state, data) {
        state.headData = data;
    },
    updateElecfeeTable(state, data) {
        state.elecfeeTable = data.data;
        state.EchartsEleTable = data.data;
        state.alldataTable = data.alldataTable;
        state.detailTotal = data.total;
    },

    updatePrvTable(state, data) {
        state.alldataTable = data.alldataTable;
        state.EchartsEleTable = data.data;
        state.provinceTable = data.data;
        state.detailTotal = data.total;
    },
    updateCurrentPage(state, data) {
        state.detailPage = data.page;
        state.detailPagesize = data.page_size;
    },
    updateDetailTableLoading(state, loading) {
        state.detailTableLoading = loading;
    },
    updateParams(state, data) {
        state.checkPrvParams = data;
    },
    updateType(state, data) {
        state.currentType = data;
    },
    updateCityTitle(state, oParams) {
        let initCityTitle, oData;
        if (typeof oParams == "string") {
            initCityTitle = {
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
            oData = {
                surveyTitle: oParams + surveyTitle,
                provinceTitle: oParams + provinceTitle,
                scoreTitle,
                tabProvinceTitle: oParams + tabProvinceTitle,
            };
        } else {
            initCityTitle = oParams.countryTitle;
            const {
                surveyTitle,
                provinceTitle,
                scoreTitle,
                tabProvinceTitle,
            } = initCityTitle;
            oData = {
                surveyTitle: oParams.cityName + surveyTitle,
                provinceTitle: oParams.cityName + provinceTitle,
                scoreTitle,
                tabProvinceTitle: oParams.cityName + tabProvinceTitle,
            };
        }
        state.cityTitle = oData;
    },
    updateCityId(state, name) {
        state.cityId = name;
    },
};
export default mutations;
