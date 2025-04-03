import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import UserProfile from './components/UserProfile.vue';
import UserPreferences from './components/UserPreferences.vue';
import CourseList from './components/CourseList.vue';
import CourseDetail from './components/CourseDetail.vue';
import CoursePlayer from './components/CoursePlayer.vue'; // 新增学习界面路由
import TextCoursePlayer from './components/TextCoursePlayer.vue'; // 新增文字课程路由

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: UserProfile },
    { path: '/preferences', component: UserPreferences },
    { path: '/', redirect: '/login' }, // 默认重定向到登录页
    { path: '/courses', component: CourseList },
    { path: '/courses/:id', component: CourseDetail },
    { path: '/courses/:id/learn', component: CoursePlayer }, // 新增学习界面路由
    { path: '/courses/:id/text-learn', component: TextCoursePlayer }, // 新增文字课程路由
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;