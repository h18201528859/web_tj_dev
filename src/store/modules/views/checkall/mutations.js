const mutations = {
    updateHeadData(state, data) {
        state.headData = data;
    },
    updateCharts(state, data) {
        state.lineData[0] = data.total_number;
        state.pieData[0].value = data.total_number;
    },
    updateCheckAllTable(state, data) {
        state.checkallTable = data;
    },
    updateCheckAllDetail(state, data) {
        state.checkallDetail = data.body;
        state.detailTotal = data.total;
    },
    updateCurrentPage(state, data) {
        state.detailPage = data.page;
        state.detailPagesize = data.pageSize;
    },
    updateDetailTableLoading(state, loading) {
        state.detailTableLoading = loading;
    },
};
export default mutations;
