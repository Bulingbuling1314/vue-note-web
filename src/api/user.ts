import service from "@/utils/request"
import { IGetUserInfo, IResponse } from "./@types/IUser";

/**
 * @description: 获取所有用户
 * @params {} params
 * @return {Promise}
 */
export const getAllUser = (): Promise<any> => {
    return service({
        url: "/api/bb/web/user/get",
        method: "GET"
    });
};


/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */

export const login = (data: IGetUserInfo): Promise<any> => {
    return service({
        url: "/api/bb/web/user/login",
        method: "POST",
        data,
    });
};

