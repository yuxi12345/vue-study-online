import { createRouter, createWebHistory } from 'vue-router';
import CourseList from './components/CourseList.vue';
import nav from './components/nav.vue';
import CourseDetail from './components/CourseDetail.vue';
import CourseList2 from './components/CourseList22.vue';
import Learn from './components/Learn.vue';
import TextLearn from './components/TextLearn.vue';
const routes = [
  
  {
    path: '/userinfo',
    component:()=>import('@/components/UserInfo.vue')

  },
  {
    path: '/dis',
    component: () => import('@/components/DiscussionForum.vue')

  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue')

  },
  {

    path: '/detail',
    component: CourseDetail
  },
  {

    path: '/list2',
    component: CourseList2
  },
  {
    path: '/:catchAll(.*)', // 捕获所有未匹配的路由
    component: () => import('@/components/NotFound.vue'), // 404 页面组件
  },
  {
    path: '/studentList',
    component: () => import('@/components/StudentList.vue'), // 动态导入
    
  },
  {
    path: '/login',
    component: () => import('@/components/Login.vue'), // 动态导入
  },
  {
    path: '/register',
    component: () => import('@/components/Register.vue'), // 动态导入
  },
  {
    path: '/',
    redirect: '/login', // 默认重定向到登录页
  },
  {
    path: '/courses',
    component: CourseList,
   
  },
  {
    path: '/courses/:id/learn',
    name: 'Learn',
    component: Learn
  },
  {
    path: '/courses/:id/text-learn',
    name: 'TextLearn',
    component: TextLearn
  },
  {
    path: '/nav',
    name: 'Nav',
    component: nav,
    
  },
  {
    path: '/player',
    name: 'player',
    component: () => import('@/components/CoursePlayer.vue'), // 动态导入

  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
