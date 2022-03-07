/**
 *  菜单
 * */
export interface IMenuItem {
    /** 菜单名称 */
    "name": string,
    /** 菜单路径 */
    "path": string,
    /** 菜单权限 */
    "role": string,
    /** 菜单类型 */
    "type": string,
    /** 组件名 */
    "component": Object,
    /** 组件名 */
    "parentId": number,
    /** other */
    "meta": string,
    /** 子菜单 */
    "children"?: Array<IMenuItem>
}