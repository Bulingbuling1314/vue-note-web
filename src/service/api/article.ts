import { IResponse, IArticle } from "../interface";
import service from "../request"

/**
 * @description: 新增文章
 * @params {} params
 * @return {Promise}
 */
export const articleSave = (article: IArticle): Promise<IResponse<unknown>> => {
    return service({
        url: "/web/article/save",
        method: "POST",
        data: article
    });
};

/**
 * @description: 删除文章
 * @params {} params
 * @return {Promise}
 */
export const articleRemove = (params: { id: number }): Promise<IResponse<unknown>> => {
    return service({
        url: "/web/article/removeById",
        method: "POST",
        params
    });
};
