export enum IMenubarStatus {
    PCE, // 电脑展开
    PCN, // 电脑合并
    PHE, // 手机展开
    PHN // 手机合并
}
export interface ISetting {
    theme: number
    showTags: boolean
    color: {
        primary: string
    }
    usePinyinSearch: boolean
    mode: 'horizontal' | 'vertical' // 导航模式
}
export interface DeptParam {
    deptName: string,
}
export interface LoginParam {
    username: string,
    password: string
}
export interface IgetuserRes {
    buttonMenus: string[]
    name: string
    role: Array<string>
}
export interface IMenubar {
    status: IMenubarStatus
    menuList: Array<IMenubarList>
    isPhone: boolean
}
export interface IUserInfo {
    name: string,
    role: string[],
    buttonMenus:string[],
}
export interface IDeptInfo {
    deptId?: number,
    deptName: string
}
export interface ITags {
    tagsList: Array<ITagsList>
    cachedViews: string[]
    isNocacheView: boolean
}
export interface IStatus {
    isLoading: boolean
    ACCESS_TOKEN: string
}
export interface FStyle {
    size: number
    style?: string
}
export interface ILayout {
    // 左侧导航栏
    menubar: IMenubar
    // 用户信息
    userInfo: IUserInfo
    deptInfo:IDeptInfo
    // 标签栏
    tags: ITags
    setting: ISetting
    status:IStatus,
    fontSetting:FStyle,
}
export interface IMenubarList {
    parentId?: number | string
    id?: number | string
    name: string
    path: string
    redirect?: string | {name: string}
    meta: {
        icon: string
        title: string
        permission?: string[]
        activeMenu?: string // 路由设置了该属性，则会高亮相对应的侧边栏
        noCache?: boolean // 页面是否不缓存
        hidden?: boolean // 是否隐藏路由
        alwaysShow?: boolean // 当子路由只有一个的时候是否显示当前路由
    }
    component: (() => Promise<typeof import('*.vue')>) | string
    children?: Array<IMenubarList>
}

export interface ITagsList {
    name: string
    title: string
    path: string
    isActive: boolean
}