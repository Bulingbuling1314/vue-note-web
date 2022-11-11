/**
 *  文章
 * */
 export interface IArticle {
    /** id */
    id: number
    /** 标题 */
    title: string
    /** 作者 */
    author: string
    /** 简介 */
    intro: string
    /** 创建时间 */
    createDate: string
    /** 更新时间 */
    updateDate: string
    /** 子菜单 */
    children?: Array<IArticle>
  }
  