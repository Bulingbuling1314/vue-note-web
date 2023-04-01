import service from "../request"

/**
 * @description: 获取所有菜单
 * @params {} params
 * @return {Promise}
 */
export const getMenu = (): Promise<any> => {
    return service({
        url: "/web/menu/get",
        method: "GET"
    });
};

/**
 * @description: 新增菜单
 * @params {} params
 * @return {Promise}
 */
export const addMenu = (data: any): Promise<any> => {
    return service({
        url: "/web/menu/add",
        method: "POST",
        data
    });
};

/**
 * @description: 删除菜单
 * @params {} params
 * @return {Promise}
 */
export const removeMenu = (params: { id: number }): Promise<any> => {
    return service({
        url: "/bb/web/menu/remove",
        method: "POST",
        params
    });
};
