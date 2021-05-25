const mutations = {
    updateHeadData(state, data) {
        state.headData = data;
    },
    updateCheckAllTable(state, data) {
        state.checkallTable = data;
    },
    updateCheckAllDetail(state, data) {
        state.checkallDetail = data.body;
        state.detailPage = data.total;
    },
};
export default mutations;
