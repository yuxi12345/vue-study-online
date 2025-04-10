<template>
  <div class="course-interaction">
    <!-- 讨论区头部 -->
    <div class="interaction-header">
      <h3>{{ course.title }} 讨论区</h3>
      <el-button 
        type="primary" 
        @click="showPostDialog = true"
        v-permission="'student'">
        <i class="el-icon-edit"></i> 发新帖
      </el-button>
    </div>

    <!-- 帖子分类筛选 -->
    <div class="filter-bar">
      <el-radio-group v-model="selectedCategory">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button 
          v-for="cat in categories" 
          :key="cat" 
          :label="cat">
          {{ cat }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <!-- 帖子列表 -->
    <div class="post-list">
      <div v-for="post in filteredPosts" :key="post.id" class="post-item">
        <el-card shadow="hover">
          <div class="post-header">
            <el-tag :type="getCategoryStyle(post.category)" size="small">
              {{ post.category }}
            </el-tag>
            <h4 class="post-title">{{ post.title }}</h4>
            <div class="post-meta">
              <el-avatar :size="32" :src="post.avatar"></el-avatar>
              <span class="author">{{ post.author }}</span>
              <span class="time">{{ formatTime(post.createTime) }}</span>
            </div>
          </div>

          <div class="post-content">
            {{ post.content }}
          </div>

          <div class="post-actions">
            <el-button 
              :icon="Star" 
              :type="post.isLiked ? 'primary' : ''"
              @click="toggleLike(post)">
              {{ post.likes }} 点赞
            </el-button>
            <el-button 
              :icon="ChatDotRound"
              @click="toggleComments(post.id)">
              {{ post.comments.length }} 评论
            </el-button>
          </div>

          <!-- 评论区域 -->
          <div v-if="activePostId === post.id" class="comment-section">
            <div v-for="comment in post.comments" :key="comment.id" class="comment-item">
              <el-avatar :size="28" :src="comment.avatar"></el-avatar>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="author">{{ comment.author }}</span>
                  <span class="time">{{ formatTime(comment.time) }}</span>
                </div>
                <p>{{ comment.content }}</p>
              </div>
            </div>
            
            <el-input 
              v-model="newComment" 
              placeholder="写下你的评论..."
              class="comment-input">
              <template #append>
                <el-button type="primary" @click="submitComment(post)">发送</el-button>
              </template>
            </el-input>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 发帖对话框 -->
    <el-dialog v-model="showPostDialog" title="发布新帖">
      <el-form :model="newPost" label-width="80px">
        <el-form-item label="标题" required>
          <el-input v-model="newPost.title" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="分类" required>
          <el-select v-model="newPost.category">
            <el-option 
              v-for="cat in categories" 
              :key="cat" 
              :label="cat" 
              :value="cat" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" required>
          <el-input 
            v-model="newPost.content" 
            type="textarea" 
            :rows="5"
            maxlength="500" 
            show-word-limit />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showPostDialog = false">取消</el-button>
        <el-button type="primary" @click="submitPost">发布</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { Star, Comment } from '@element-plus/icons-vue'

const ChatDotRound = Comment
const course = inject('currentCourse')
const categories = ['课程疑问', '学习技巧', '资源分享', '其他']
const selectedCategory = ref('all')
const activePostId = ref(null)
const newComment = ref('')

// 模拟数据
const posts = ref([
  {
    id: 1,
    title: '关于组件通信的问题',
    content: '如何在Vue3中实现跨组件通信？',
    category: '课程疑问',
    likes: 15,
    comments: [
      {
        id: 1,
        content: '可以使用provide/inject方法',
        author: '张老师',
        time: Date.now()
      }
    ],
    avatar: 'https://example.com/avatar.jpg',
    author: '学员A',
    createTime: Date.now()
  }
])
const newPost = ref({ title: '', category: '', content: '' })

// 过滤后的帖子
const filteredPosts = computed(() => {
  return posts.value.filter(post => 
    selectedCategory.value === 'all' || 
    post.category === selectedCategory.value
  )
})

// 获取分类样式
const getCategoryStyle = (category) => {
  const styles = {
    '课程疑问': 'danger',
    '学习技巧': 'warning',
    '资源分享': 'success',
    '其他': 'info'
  }
  return styles[category] || 'info'
}

// 提交评论
const submitComment = (post) => {
  if (!newComment.value.trim()) return
  
  post.comments.push({
    id: Date.now(),
    content: newComment.value,
    author: '当前用户',
    avatar: 'https://example.com/avatar.jpg',
    time: Date.now()
  })
  newComment.value = ''
}
</script>

<style scoped>
.course-interaction {
  margin-top: 40px;
}

.interaction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.post-item {
  margin-bottom: 20px;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.post-title {
  margin: 0;
  flex-grow: 1;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #909399;
}

.comment-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.comment-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.comment-content {
  flex-grow: 1;
}

.comment-header {
  color: #909399;
  margin-bottom: 4px;
}
</style>