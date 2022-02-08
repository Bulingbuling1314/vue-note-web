import service from "@/utils/request"
import { IGetUserInfo } from "./@types/IUser";

/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */

// export const getUserInfo = (params: IGetUserInfo) => {
//   return service({
//     url: "/public/mock/user.json",
//     method: "GET",
//     params,
//   });
// };