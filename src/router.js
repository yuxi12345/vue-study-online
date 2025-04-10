import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import UserProfile from './components/UserProfile.vue';
import UserPreferences from './components/UserPreferences.vue';
import CourseList from './components/CourseList.vue';
import CourseDetail from './components/CourseDetail.vue';
import CoursePlayer from './components/CoursePlayer.vue'; // 新增学习界面路由
import TextCoursePlayer from './components/TextCoursePlayer.vue'; // 新增文字课程路由
import CourseDiscussion from './components/CourseDiscussion.vue'; // 新增讨论区路由
import CourseQA from './components/CourseQA.vue'; // 新增问答区路由
import DataDashboard from './components/DataDashboard.vue';



const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: UserProfile },
    { path: '/preferences', component: UserPreferences },
    { path: '/', redirect: '/login' }, // 默认重定向到登录页
    { path: '/courses', component: CourseList },
    { path: '/courses/:id/learn', component: CoursePlayer }, // 新增学习界面路由
    { path: '/courses/:id/text-learn', component: TextCoursePlayer }, // 新增文字课程路由
    {
        path: '/courses/:id',
        component: CourseDetail,
        children: [
          {
            path: 'discussion',
            component: CourseDiscussion
          },
          {
            path: 'qa',
            component: CourseQA
          }
        ]
      },
    { path: '/dashboard', component: DataDashboard },
    
      ]


const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;