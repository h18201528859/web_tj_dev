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
            console.log(path,state.breadcrumbArr)
            if(state.breadcrumbArr.length<=2){
               state.breadcrumbArr = state.breadcrumbArr.concat(path);
            }else{
                const newBreadPath = state.breadcrumbArr.slice(0,state.breadcrumbArr.length-1);
                state.breadcrumbArr = newBreadPath.concat(path);
            }
        },
        replaceBreadcrumb(state,path){
            console.log(path)
            const newBreadPath = state.breadcrumbArr.slice(0,state.breadcrumbArr.length-1);
            state.breadcrumbArr = newBreadPath.concat(path);
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
