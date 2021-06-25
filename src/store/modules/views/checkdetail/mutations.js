const mutations = {
    updateCheckAllDetail(state, data) {
        state.checkallDetail = data.ret_data.prv_data;
        state.detailTotal = Number(data.ret_data.prv_data_len) || 0;
    },
    updateCurrentPage(state, data) {
        state.detailPage = data.page;
        state.detailPagesize = data.page_size;
    },
    updateDetailTableLoading(state, loading) {
        state.detailTableLoading = loading;
    },
    updateParams(state, data) {
        //把更改的参数传进来，然后生成新的参数对象
        state.checkParams = data;
    },
};
export default mutations;
