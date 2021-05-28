const mutations = {
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
    updateCityTitle(state, data){
        state.cityTitle = data;
    }
};
export default mutations;
