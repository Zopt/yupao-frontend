import {UserType} from "../models/user";


let currentUser:UserType;


const getCurrentUserState = () => {
    return currentUser;
}
const setCurrentUserState = (user:UserType) => {
    return currentUser = user;
}


export { setCurrentUserState, getCurrentUserState };