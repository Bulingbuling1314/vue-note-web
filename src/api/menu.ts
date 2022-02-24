import service from "@/utils/request"
import { IGetUserInfo } from "./@types/IUser";

/**
 * @description: 获取所有用户
 * @params {} params
 * @return {Promise}
 */
export const getMenu = (): Promise<any> => {
    return service({
        url: "/bb/web/menu/get",
        method: "GET"
    });
};
