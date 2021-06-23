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
    updateCheckAllDetail(state, { data, length }) {
        state.checkallDetail = data;
        state.detailTotal = Number(length);
    },
    updateParams(state, data) {
        //把更改的参数传进来，然后生成新的参数对象
        state.checkallParams = data;
    },
    updateCurrentPage(state, data) {
        state.detailPage = data.page;
        state.detailPagesize = data.page_size;
    },
    updateDetailTableLoading(state, loading) {
        state.detailTableLoading = loading;
    },
};
export default mutations;
