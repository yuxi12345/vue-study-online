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
          <h2 class="section-title">📖 课程大纲</