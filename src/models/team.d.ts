/**
 * 用户类型
 */
import {UserType} from "./user";

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
/**
 * 队伍类别
 */
export type TeamType = {
    id:number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    //todo 定义枚举值更规范
    status: number;
    createTime:Date;
    updateTime:Date;
    createUser?:UserType;
    hasJoin?: boolean;
    hasJoinNum?: number;
};