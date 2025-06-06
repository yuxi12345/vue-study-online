<template>
  <div class="text-learn-container">
    <h1>{{ course.title }} - 文字学习</h1>
    <div v-html="course.content"></div>
    <el-button type="primary" >
        <router-link to="/detail">返回详情页</router-link>
    </el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const courseId = route.params.id;

const course = ref({
  id: courseId,
  title: 'Vue3入门实战',
  content: 'Vue3是一个用于构建用户界面的渐进式JavaScript框架。它被设计为可以逐步采用，同时保持灵活性和高效性。Vue3引入了许多新特性和改进，包括组合式API、Teleport、Fragments等。这些新特性使得Vue3更加强大和灵活，同时也保持了与Vue2的兼容性。'
});

onMounted(() => {
  // 这里可以添加获取课程详细信息的逻辑
});

</script>

<style scoped>
.text-learn-container {
  text-align: center;
  padding: 40px;
}

.text-content {
  max-width: 80%;
  margin: 20px auto;
  text-align: left;
}

.el-button {
  margin-top: 20px; /* 添加一些间距 */
}
</style>



