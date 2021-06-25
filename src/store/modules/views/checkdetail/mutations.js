const mutations = {
    updateCheckAllDetail(state, data) {
        state.checkallDetail = data.ret_data.prv_data;
        state.detailTotal = data.ret_data.prv_data.length || 0;
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
