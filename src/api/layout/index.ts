import request from '/@/utils/request'
import { AxiosResponse } from 'axios'
import { IMenubarList, DeptParam, LoginParam, IgetuserRes } from '/@/type/store/layout'

export const login = (param: LoginParam): Promise<AxiosResponse<IResponse<string>>> => {
    return request({
        url: '/api/User/login',
        method: 'post',
        data: param
    })
}
export const queryDeptList = (param: DeptParam): Promise<AxiosResponse<IResponse<string>>> => {
    return request({
        url: '/api/otherPublic/queryDeptList',
        method: 'post',
        data: param
    });
};
export const getUser = (): Promise<AxiosResponse<IResponse<IgetuserRes>>> => {
    return request({
        url: '',
        method: 'get'
    })
}
export const getRouterList = (): Promise<AxiosResponse<IResponse<Array<IMenubarList>>>> => {
    return request({
        url: '',
        method: 'get'
    })
}