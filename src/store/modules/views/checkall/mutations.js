const mutations = {
    updateHeadData(state, data) {
        state.headData = data;
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
