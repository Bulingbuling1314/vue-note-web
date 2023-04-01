
import service from "../request"
// import { IArticle, IResult } from "../interface";

/**
 * @description: 新增文章
 * @params {} params
 * @return {Promise}
 */
export const articleSave = (article: IArticle): Promise<IResult<unknown>> => {
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
export const articleRemove = (params: { id: number }): Promise<IResult<unknown>> => {
    return service({
        url: "/web/article/removeById",
        method: "POST",
        params
    });
};
