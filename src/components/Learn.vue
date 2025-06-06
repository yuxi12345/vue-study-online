<template>
  <div class="learn-container">
    <h1>{{ course.title }} - 视频学习</h1>
    <video controls width="80%" style="margin: 20px auto;">
      <source :src="course.videoUrl" type="video/mp4">
      您的浏览器不支持 video 标签。
    </video>
    <p>{{ course.description }}</p>
    <el-button type="primary">
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
  description: '本课程将介绍Vue3的基础知识和实战技巧，帮助您快速上手Vue3开发。',
  videoUrl: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4' // 替换为实际视频URL
});

onMounted(() => {
  // 这里可以添加获取课程详细信息的逻辑
});

</script>

<style scoped>
.learn-container {
  text-align: center;
  padding: 40px;
}

video {
  display: block;
}
</style>



