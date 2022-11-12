
import service from "@/utils/request"
import { IArticle } from "./@types/IArticle";

/**
 * @description: 新增文章
 * @params {} params
 * @return {Promise}
 */
 export const createArticle = (data: IArticle): Promise<any> => {
    return service({
        url: "/bb/web/article/create",
        method: "POST",
        data
    });
};

/**
 * @description: 删除文章
 * @params {} params
 * @return {Promise}
 */
 export const removeArticle = (params: {id: number}): Promise<any> => {
    return service({
        url: "/bb/web/article/removeById",
        method: "POST",
        params
    });
};
