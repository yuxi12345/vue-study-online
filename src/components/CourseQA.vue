<template>
  <div class="course-qa">
    <!-- 问答社区头部 -->
    <div class="qa-header">
      <h3>{{ course.title }} 问答社区</h3>
      <el-button type="primary" @click="showQuestionDialog = true" v-permission="'student'">
        <i class="el-icon-question"></i> 我要提问
      </el-button>
    </div>

    <!-- 问题排序筛选 -->
    <div class="filter-bar">
      <el-radio-group v-model="sortType">
        <el-radio-button label="hot">热门问题</el-radio-button>
        <el-radio-button label="new">最新问题</el-radio-button>
        <el-radio-button label="unresolved">未解决</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 问题列表 -->
    <div class="question-list">
      <div v-for="question in sortedQuestions" :key="question.id" class="question-item">
        <el-card shadow="hover">
          <!-- 问题头部 -->
          <div class="question-header">
            <el-tag v-if="question.hasBestAnswer" type="success" effect="dark" class="status-tag">
              <i class="el-icon-success"></i> 已解决
            </el-tag>
            <h4 class="question-title">{{ question.title }}</h4>
            <el-tag type="warning" class="reward-tag">
              <i class="el-icon-coin"></i> 悬赏 {{ question.reward }} 积分
            </el-tag>
          </div>

          <!-- 更新问题内容展示 -->
          <div class="question-content">
            <p>{{ question.content }}</p>
            <div class="question-meta">
              <el-avatar :size="32" :src="question.avatar"></el-avatar>
              <span class="author">{{ question.author }}</span>
              <span class="time">{{ formatTime(question.createTime) }}</span>
              <span class="answers-count">回答 {{ question.answers.length }}</span>
            </div>
          </div>

          <!-- 回答列表 -->
          <div class="answer-list">
            <div v-for="answer in question.answers" :key="answer.id" class="answer-item"
              :class="{ 'best-answer': answer.isBest }">
              <div class="answer-header">
                <el-avatar :size="28" :src="answer.avatar"></el-avatar>
                <div class="answer-meta">
                  <span class="author">{{ answer.author }}</span>
                  <el-tag v-if="answer.isBest" type="success" size="mini">
                    最佳答案
                  </el-tag>
                </div>
                <div class="answer-actions">
                  <el-button :icon="Star" circle :type="answer.isLiked ? 'primary' : ''"
                    @click="toggleLike(answer)"></el-button>
                  <span class="likes-count">{{ answer.likes }}</span>
                </div>
              </div>
              <div class="answer-content">{{ answer.content }}</div>
            </div>
          </div>

          <!-- 回答输入框 -->
          <div class="answer-input">
            <el-input v-model="newAnswer" placeholder="写下你的回答..." type="textarea" :rows="3">
              <template #append>
                <el-button type="primary" @click="submitAnswer(question)">
                  提交回答
                </el-button>
              </template>
            </el-input>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 提问对话框 -->
    <el-dialog v-model="showQuestionDialog" title="提问">
      <el-form :model="newQuestion" label-width="80px">
        <el-form-item label="问题标题" required>
          <el-input v-model="newQuestion.title" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="问题描述" required>
          <el-input v-model="newQuestion.content" type="textarea" :rows="5" maxlength="500" show-word-limit />
        </el-form-item>
        <el-form-item label="悬赏积分">
          <el-input-number v-model="newQuestion.reward" :min="0" :max="100" label="积分"></el-input-number>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showQuestionDialog = false">取消</el-button>
        <el-button type="primary" @click="submitQuestion">提交问题</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { Star } from '@element-plus/icons-vue'

const course = inject('currentCourse')
const sortType = ref('hot') // 排序方式：hot/new/unresolved

const formatTime = timestamp => {
  return new Date(timestamp).toLocaleString()
}

// 模拟数据
const questions = ref([
  {
    id: 1,
    title: 'Vue3响应式原理实现细节',
    content: '能否详细讲解Proxy的实现机制？',
    reward: 50,
    author: '学员A',
    avatar: 'https://example.com/avatar1.jpg',
    createTime: 1719878400000,
    answers: [
      {
        id: 1,
        content: 'Vue3使用Proxy替代Object.defineProperty...',
        author: '张老师',
        avatar: 'https://example.com/teacher.jpg',
        likes: 25,
        isBest: true,
        createTime: 1719882000000
      }
    ],
    hasBestAnswer: true
  }
])
const newQuestion = ref({ title: '', content: '', reward: 0 })
const newAnswer = ref('')

// 排序后的问题列表
const sortedQuestions = computed(() => {
  return questions.value
    .filter(q => {
      if (sortType.value === 'unresolved') return !q.hasBestAnswer
      return true
    })
    .sort((a, b) => {
      if (sortType.value === 'hot') return b.answers.length - a.answers.length
      if (sortType.value === 'new') return b.createTime - a.createTime
      return 0
    })
})

// 提交问题
const submitQuestion = () => {
  questions.value.unshift({
    id: Date.now(),
    ...newQuestion.value,
    author: '当前用户',
    avatar: 'https://example.com/avatar.jpg',
    createTime: Date.now(),
    answers: [],
    hasBestAnswer: false
  })
  showQuestionDialog.value = false
  newQuestion.value = { title: '', content: '', reward: 0 }
}

// 提交回答
const submitAnswer = (question) => {
  if (!newAnswer.value.trim()) return

  question.answers.push({
    id: Date.now(),
    content: newAnswer.value,
    author: '当前用户',
    avatar: 'https://example.com/avatar.jpg',
    likes: 0,
    isLiked: false,
    isBest: false,
    createTime: Date.now()
  })
  newAnswer.value = ''
}

// 标记最佳答案（需要讲师权限）
const markBestAnswer = (question, answer) => {
  if (!question.hasBestAnswer) {
    answer.isBest = true
    question.hasBestAnswer = true
    // 发放积分奖励逻辑
  }
}
</script>

<style scoped>
.course-qa {
  margin-top: 40px;
}

.qa-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.question-item {
  margin-bottom: 20px;
}

.question-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.question-title {
  margin: 0;
  flex-grow: 1;
}

.reward-tag {
  margin-left: auto;
}

.answer-item {
  padding: 16px;
  margin: 12px 0;
  border-radius: 8px;
  background: #f8f9fa;
}

.best-answer {
  border-left: 3px solid #67c23a;
  background: #f0f9eb;
}

.answer-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.answer-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
}

.answer-input {
  margin-top: 20px;
}
</style>