// 定义一些路由
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import Search from "../pages/Search.vue";
import SearchResult from '../pages/SearchResult.vue';
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserPage from "../pages/UserPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";

const routes = [
    { path: '/', title:"推荐页面", component: Index },
    { path: '/team', title:"伙伴匹配", component: Team },
    { path: '/search', title:"搜索", component: Search },
    { path: '/team/add', title:"添加队伍", component: TeamAddPage },
    { path: '/team/update', title:"队伍更新", component: TeamUpdatePage },
    { path: '/user', title:"用户信息", component: UserPage },
    { path: '/user/update', title:"用户更新", component: UserUpdatePage },
    { path: '/user/edit', title:"用户编辑", component: UserEditPage },
    { path: '/user/login', title:"用户登录", component: UserLoginPage },
    { path: '/user/register', title:"用户注册", component: UserRegisterPage },
    { path: '/user/list', title:"搜索结果", component: SearchResult },
    { path: '/user/team/create', title:"用户创建的队伍", component: UserTeamCreatePage },
    { path: '/user/team/join', title:"用户加入的队伍", component: UserTeamJoinPage },

]

export default routes