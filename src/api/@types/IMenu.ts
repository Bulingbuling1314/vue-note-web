/**
 *  菜单
 * */
export interface IMenuItem {
    /** 菜单名称 */
    "name": string,
    /** 菜单路径 */
    "path": string,
    /** 组件名 */
    "component": string,
    /** other */
    "meta": string,
    /** 子菜单 */
    "children"?: Array<IMenuItem>
}