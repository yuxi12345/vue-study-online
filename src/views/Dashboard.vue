<template>
    <div>
        <h1>管理员面板</h1>
        <CourseStatistics />
        <UserStatistics />
    </div>

    <el-button type="primary" round><router-link to="/nav">返回</router-link></el-button>
</template>

<script>
import CourseStatistics from '../components/CourseStatistics.vue';
import UserStatistics from '../components/UserStatistics.vue';

export default {
    components: {
        CourseStatistics,
        UserStatistics,
    },
};
</script>

<style scoped>
/* 添加样式 */
</style>
  
