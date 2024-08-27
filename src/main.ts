import {createApp} from 'vue'
import App from './App.vue'
// import {Button, Icon, NavBar, Search, Tabbar, TabbarItem, Tag} from 'vant';
import Vant from 'vant';
import {createRouter, createWebHistory} from "vue-router";
import routes from "./config/routes.ts";
import 'vant/lib/index.css';
import './global.css'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App);
app.use(Vant);
app.use(router)
app.mount('#app');


