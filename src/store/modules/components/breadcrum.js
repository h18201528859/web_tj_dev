const router = {
    state: {
        breadcrumbArr: [],
        currentMenu: [],
    },
    mutations: {
        //接受到传入的menu信息，渲染出面包屑
        setBreadcrumb(state, data) {
            state.breadcrumbArr = data;
        },
        updateBreadcrumb(state, path) {
            state.breadcrumbArr = state.breadcrumbArr.concat(path);
        },
        setCurrentMenu(state, data) {
            state.currentMenu = data;
        },
    },
    actions: {
        setCurrentBread({ commit }, paths) {
            commit("updateBreadcrumb", paths);
        },
        getCurrentBread({ commit }, routes) {
            let newArr = [];
            let { breads, menus } = routes;
            menus.map((menuItem) => {
                if (breads.indexOf(menuItem.key) !== -1) {
                    newArr.push({ breadcrumbName: menuItem.name });
                    if (menuItem.isChildren) {
                        menuItem.children.map((menu) => {
                            if (breads.indexOf(menu.key) !== -1) {
                                newArr.push({
                                    path: menu.key,
                                    breadcrumbName: menu.name,
                                });
                            }
                        });
                    }
                }
            });
            commit("setBreadcrumb", newArr);
        },
        getCurrentMenu({ commit }, data) {
            commit("setCurrentMenu", data);
        },
    },
};

export default router;
