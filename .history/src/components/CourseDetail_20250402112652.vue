<template>
  <!-- 全局提示弹窗 -->
  <div class="toast-container">
    <transition-group name="toast">
      <div v-for="msg in messages" 
           :key="msg.id"
           class="toast"
           :class="msg.type">
        {{ msg.text }}
      </div>
    </transition-group>

  <!-- 主容器 -->
  <div class="course-wrapper">
    <!-- 核心内容区 -->
    <main class="course-main">
      <!-- 课程头图 -->
      <div class="course-hero">
        <h1 class="course-title">{{ course.title }}</h1>
        <div class="course-meta">
          <span class="rating">⭐ {{ (course.rating ?? 0).toFixed(1) }}</span>
          <span class="students">👥 {{ course.students }}人学习</span>
        </div>
      </div>

      <!-- 视频预览 -->
      <div class="video-container">
        <iframe :src="course.videoUrl" 
                frameborder="0" 
                allowfullscreen
                title="课程预览视频"></iframe>
      </div>

      <!-- 操作按钮组 -->
      <div class="action-container">
        <button class="btn btn-primary" 
                @click="handlePurchase"
                v-if="!purchased">
          🛒 立即购买 ¥{{ course.price }}
        </button>
        <button class="btn btn-success" 
                v-else
                disabled>
          ✓ 已购买
        </button>
        
        <div class="secondary-actions">
          <button class="btn btn-icon" 
                  :class="{ 'active': isFavorited }"
                  @click="toggleFavorite">
            <span v-if="isFavorited">❤️ 已收藏</span>
            <span v-else>♡ 收藏</span>
          </button>
          <button class="btn btn-icon" 
                  :class="{ 'active': isInPlan }"
                  @click="toggleStudyPlan">
            <span v-if="isInPlan">📚 已加入计划</span>
            <span v-else>📚 学习计划</span>
          </button>
        </div>
      </div>

      <!-- 学习按钮 -->
      <div class="action-container">
        <router-link :to="`/courses/${course.id}/learn`" class="btn btn-primary">
          开始学习（视频）
        </router-link>
        <router-link :to="`/courses/${course.id}/text-learn`" class="btn btn-primary">
          开始学习（文字）
        </router-link>
      </div>
      
      <!-- 课程详情 -->
      <div class="course-detail">
        <!-- 大纲模块 -->
        <section class="detail-section">
          <h2 class="section-title">📖 课程大纲</h2>
          <ul class="chapter-list">
            <li v-for="(chapter, index) in course.chapters" 
                :key="index"
                class="chapter-item">
              <span class="chapter-index">第{{ index + 1 }}章</span>
              {{ chapter }}
            </li>
          </ul>
        </section>

        <!-- 评价模块 -->
        <section class="detail-section">
          <h2 class="section-title">💬 学员评价</h2>
          <div v-for="review in course.reviews" 
               :key="review.id"
               class="review-card">
            <p class="review-content">{{ review.content }}</p>
            <div class="review-footer">
              <span class="review-author">{{ review.author }}</span>
              <span class="review-date">{{ review.date }}</span>
            </div>
          </div>
        </section>

        <!-- 常见问题 -->
        <section class="detail-section">
          <h2 class="section-title">❓ 常见问题</h2>
          <div v-for="qa in course.faqs" 
               :key="qa.question"
               class="faq-card">
            <div class="faq-question">Q: {{ qa.question }}</div>
            <div class="faq-answer">A: {{ qa.answer }}</div>
          </div>
        </section>
      </div>
    </main>

    <!-- 侧边信息栏 -->
    <aside class="course-sidebar">
      <div class="info-card">
        <img :src="course.cover" 
             alt="课程封面" 
             class="course-cover">
        <div class="info-group">
          <label>👨🏫 讲师</label>
          <p class="info-content">{{ course.instructor }}</p>
        </div>
        <div class="info-group">
          <label>📚 分类</label>
          <p class="info-content">{{ course.category }}</p>
        </div>
        <div class="info-group">
          <label>⏳ 时长</label>
          <p class="info-content">{{ course.duration }}小时</p>
        </div>
      </div>
    </aside>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 课程数据
const course = ref({
  id: 1,
  title: 'Vue3 入门实战',
  category: '编程',
  cover: 'https://via.placeholder.com/300x200',
  instructor: '张老师',
  rating: 4.8,
  students: 1520,
  duration: 24,
  price: 299,
  videoUrl: 'https://example.com/video',
  chapters: [
    'Vue3 核心语法',
    '组合式API实战',
    '状态管理进阶',
    '工程化配置',
    '项目实战'
  ],
  reviews: [
    { 
      id: 1, 
      author: '前端开发者', 
      content: '课程结构清晰，项目案例非常实用',
      date: '2024-03-15'
    }
  ],
  faqs: [
    {
      question: '需要哪些前置知识？',
      answer: '需掌握HTML/CSS和JavaScript基础'
    }
  ]
});

// 交互状态
const isFavorited = ref(false);
const isInPlan = ref(false);
const purchased = ref(false);

// 消息系统
const messages = ref([]);
let toastId = 0;

const showToast = (text, type = 'success') => {
  const id = toastId++;
  messages.value.push({ id, text, type });
  
  setTimeout(() => {
    messages.value = messages.value.filter(msg => msg.id !== id);
  }, 3000);
};

// 核心交互
const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
  showToast(
    isFavorited.value ? '已加入收藏' : '已取消收藏',
    isFavorited.value ? 'success' : 'info'
  );
};

const toggleStudyPlan = () => {
  isInPlan.value = !isInPlan.value;
  showToast(
    isInPlan.value ? '已加入学习计划' : '已移出学习计划',
    isInPlan.value ? 'success' : 'info'
  );
};

const handlePurchase = () => {
  purchased.value = true;
  showToast('🎉 购买成功！课程已添加到学习中心', 'success');
};
</script>

<style scoped>
/* 基础布局 */
.course-wrapper {
  max-width: 1280px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;
}

/* 主内容区 */
.course-main {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  padding: 2rem;
}

.course-hero {
  text-align: center;
  margin-bottom: 2rem;
}

.course-title {
  font-size: 2.25rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.course-meta {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  color: #666;
  font-size: 0.95rem;
}

/* 视频容器 */
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.video-container iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
}

/* 操作按钮 */
.action-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: #00c853;
  color: white;
  font-size: 1.1rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,200,83,0.3);
}

.btn-success {
  background: #4caf50;
  color: white;
  cursor: default;
}

.btn-icon {
  background: none;
  color: #666;
  padding: 0.5rem 1rem;
}

.btn-icon.active {
  color: #00c853;
  background: rgba(0,200,83,0.1);
}

/* 详情模块 */
.detail-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.section-title {
  font-size: 1.25rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

/* 侧边栏 */
.course-sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.course-cover {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.info-group {
  margin: 1rem 0;
}

.info-group label {
  color: #666;
  font-size: 0.9rem;
}

.info-content {
  color: #1a1a1a;
  font-weight: 500;
  margin-top: 0.25rem;
}

/* 提示系统 */
.toast-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
}

.toast {
  width: 280px;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  backdrop-filter: blur(4px);
}

.toast.success {
  background: rgba(76,175,80,0.9);
}

.toast.info {
  background: rgba(33,150,243,0.9);
}

/* 动画效果 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20%);
}

@media (max-width: 768px) {
  .course-wrapper {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
  
  .course-sidebar {
    order: -1;
    margin-bottom: 2rem;
  }
  
  .course-main {
    padding: 1.5rem;
  }
}
</style>