<template>
  <div class="qa-container">
    <h2 class="course-title">问答社区</h2>
    <div class="question-form">
      <h3>提出问题</h3>
      <form @submit.prevent="addQuestion">
        <label for="questionTitle">标题:</label>
        <input type="text" v-model="questionTitle" id="questionTitle" required class="input-field" />
        <label for="questionContent">内容:</label>
        <textarea v-model="questionContent" id="questionContent" required class="textarea-field"></textarea>
        <button type="submit" class="submit-button">提问</button>
      </form>
    </div>
    <div class="questions-section">
      <h3>热门问题</h3>
      <div v-for="question in hotQuestions" :key="question.id" class="question-card">
        <h4>{{ question.title }}</h4>
        <p>{{ question.content }}</p>
        <div class="question-meta">
          <span>作者: {{ question.author }}</span>
          <span>时间: {{ question.date }}</span>
        </div>
        <div class="answers-section">
          <h4>回答</h4>
          <form @submit.prevent="addAnswer(question)">
            <textarea v-model="question.answer" placeholder="添加回答..." class="textarea-field"></textarea>
            <button type="submit" class="submit-button">回答</button>
          </form>
          <div v-for="answer in question.answers" :key="answer.id" class="answer-card">
            <p>{{ answer.content }}</p>
            <div class="answer-meta">
              <span>作者: {{ answer.author }}</span>
              <span>时间: {{ answer.date }}</span>
              <button @click="toggleBestAnswer(question, answer)" class="best-answer-button" :class="{ 'active': answer.best }">
                {{ answer.best ? '最佳回答' : '设为最佳' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3>最新问题</h3>
      <div v-for="question in latestQuestions" :key="question.id" class="question-card">
        <h4>{{ question.title }}</h4>
        <p>{{ question.content }}</p>
        <div class="question-meta">
          <span>作者: {{ question.author }}</span>
          <span>时间: {{ question.date }}</span>
        </div>
        <div class="answers-section">
          <h4>回答</h4>
          <form @submit.prevent="addAnswer(question)">
            <textarea v-model="question.answer" placeholder="添加回答..." class="textarea-field"></textarea>
            <button type="submit" class="submit-button">回答</button>
          </form>
          <div v-for="answer in question.answers" :key="answer.id" class="answer-card">
            <p>{{ answer.content }}</p>
            <div class="answer-meta">
              <span>作者: {{ answer.author }}</span>
              <span>时间: {{ answer.date }}</span>
              <button @click="toggleBestAnswer(question, answer)" class="best-answer-button" :class="{ 'active': answer.best }">
                {{ answer.best ? '最佳回答' : '设为最佳' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';

const questionTitle = ref('');
const questionContent = ref('');
const questions = ref([]);

onMounted(() => {
  const savedQuestions = localStorage.getItem('questions');
  if (savedQuestions) {
    questions.value = JSON.parse(savedQuestions);
  }
});

watch(questions, (newQuestions) => {
  localStorage.setItem('questions', JSON.stringify(newQuestions));
}, { deep: true });

const addQuestion = () => {
  const newQuestion = {
    id: Date.now(),
    title: questionTitle.value,
    content: questionContent.value,
    author: '用户', // 可以从用户信息中获取
    date: new Date().toLocaleString(),
    answers: [],
    answer: ''
  };
  questions.value.push(newQuestion);
  questionTitle.value = '';
  questionContent.value = '';
};

const addAnswer = (question) => {
  const newAnswer = {
    id: Date.now(),
    content: question.answer,
    author: '用户', // 可以从用户信息中获取
    date: new Date().toLocaleString(),
    best: false
  };
  question.answers.push(newAnswer);
  question.answer = '';
};

const toggleBestAnswer = (question, answer) => {
  question.answers.forEach(a => a.best = false);
  answer.best = true;
};

const hotQuestions = computed(() => {
  return questions.value
    .filter(q => q.answers.some(a => a.best))
    .sort((a, b) => b.answers.filter(a => a.best).length - a.answers.filter(a => a.best).length);
});

const latestQuestions = computed(() => {
  return questions.value
    .sort((a, b) => new Date(b.date) - new Date(a.date));
});
</script>

<style scoped>
.qa-container {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
}

.course-title {
  font-size: 2.25rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
}

.question-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.question-form h3 {
  margin-bottom: 10px;
  color: #333;
}

.question-form label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.question-form .input-field {
  padding: 10px;
  margin: 10px 0 20px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
  width: 100%;
}

.question-form .input-field:focus {
  border-color: #42b983;
  outline: none;
}

.question-form .textarea-field {
  padding: 10px;
  margin: 10px 0 20px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
  width: 100%;
  height: 100px;
}

.question-form .textarea-field:focus {
  border-color: #42b983;
  outline: none;
}

.question-form .submit-button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.question-form .submit-button:hover {
  background-color: #36a77a;
}

.questions-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.questions-section h3 {
  margin-bottom: 10px;
  color: #333;
}

.question-card {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.question-card h4 {
  margin-top: 0;
  color: #333;
}

.question-card p {
  margin: 10px 0;
  color: #666;
}

.question-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 0.9em;
}

.answers-section {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.answers-section h4 {
  margin-top: 0;
  color: #333;
}

.answer-card {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.answer-card p {
  margin: 10px 0;
  color: #666;
}

.answer-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 0.9em;
}

<style