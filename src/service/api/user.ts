import service from "../request"
import { ILoginParams, IResponse } from "../interface";

/**
 * @description: 获取所有用户
 * @params {} params
 * @return {Promise}
 */
export const getAllUser = (): Promise<IResponse<unknown>> => {
    return service({
        url: "/web/user/get",
        method: "GET"
    });
};


/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */
export const login = (data: ILoginParams): Promise<any> => {
    return service({
        url: "/web/user/login",
        method: "POST",
        data,
    });
};
export type LoginParams = ILoginParams
