/**
 * 用户类型
 */

export type CurrentUser = {
    id?:number
    userName?:string
    userAccount?: string;
    avatarUrl?: string;
    profile?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userStatus?:number;
    userRole?:number;
    plantCode?:string;
    tags ?: string[];
    createTime?:Date;
};

export type UserType = {
    id?:number
    userName?:string
    userAccount?: string;
    avatarUrl?: string;
    profile?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userStatus?:number;
    userRole?:number;
    plantCode?:string;
    tags ?: string;
    createTime?:Date;
};