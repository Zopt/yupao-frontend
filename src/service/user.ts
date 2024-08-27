import myAxios from "../plugins/myAxios.ts";
import {getCurrentUserState, setCurrentUserState} from "../states/user.ts";


export const getCurrentUser = async () => {
    const currentUserState =  getCurrentUserState();
    if (currentUserState) {
        return currentUserState;
    }
    if (!currentUserState) {
        const res =  await myAxios.get('/user/current');
        if (res.data.code === 0) {
            setCurrentUserState(res.data.data);
            return res.data.data;
        }
        return ;
    }
}

