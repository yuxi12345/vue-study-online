import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import UserProfile from './components/UserProfile.vue';
import UserPreferences from './components/UserPreferences.vue';
import CoursePlayer from './components/CoursePlayer.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: UserProfile },
    { path: '/preferences', component: UserPreferences },
    { path: '/', redirect: '/login' }, // 默认重定向到登录页
    { path: '/courses', component: () => import('./components/CourseList.vue') },
    { path: '/courses/:id', component: () => import('./components/CourseDetail.vue') },
    { path: '/courses/:id/learn', component: CoursePlayer }, // 新增学习界面路由
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

