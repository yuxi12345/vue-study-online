<template>
  <div class="course-discussion-container">
    <h2 class="course-title">{{ course.title }} - 讨论区</h2>
    <div class="post-form">
      <h3>发布帖子</h3>
      <form @submit.prevent="addPost">
        <label for="postTitle">标题:</label>
        <input type="text" v-model="postTitle" id="postTitle" required class="input-field" />
        <label for="postContent">内容:</label>
        <textarea v-model="postContent" id="postContent" required class="textarea-field"></textarea>
        <label for="postCategory">分类:</label>
        <select v-model="postCategory" id="postCategory" class="input-field">
          <option value="question">课程疑问</option>
          <option value="tip">学习技巧</option>
          <option value="other">其他</option>
        </select>
        <button type="submit" class="submit-button">发布</button>
      </form>
    </div>
    <div class="posts-section">
      <h3>帖子列表</h3>
      <div v-for="post in filteredPosts" :key="post.id" class="post-card">
        <h4>{{ post.title }}</h4>
        <p>{{ post.content }}</p>
        <div class="post-meta">
          <span>分类: {{ post.category }}</span>
          <span>作者: {{ post.author }}</span>
          <span>时间: {{ post.date }}</span>
          <button @click="toggleLike(post)" class="like-button">
            👍 {{ post.likes }}
          </button>
        </div>
        <div class="comments-section">
          <h4>评论</h4>
          <form @submit.prevent="addComment(post)">
            <textarea v-model="post.comment" placeholder="添加评论..." class="textarea-field"></textarea>
            <button type="submit" class="submit-button">评论</button>
          </form>
          <div v-for="comment in post.comments" :key="comment.id" class="comment-card">
            <p>{{ comment.content }}</p>
            <div class="comment-meta">
              <span>作者: {{ comment.author }}</span>
              <span>时间: {{ comment.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const postTitle = ref('');
const postContent = ref('');
const postCategory = ref('question');
const posts = ref([]);

const course = ref({
  id: 1,
  title: 'Vue3 入门实战',
});

onMounted(() => {
  const savedPosts = localStorage.getItem(`posts-${course.value.id}`);
  if (savedPosts) {
    posts.value = JSON.parse(savedPosts);
  }
});

watch(posts, (newPosts) => {
  localStorage.setItem(`posts-${course.value.id}`, JSON.stringify(newPosts));
}, { deep: true });

const addPost = () => {
  const newPost = {
    id: Date.now(),
    title: postTitle.value,
    content: postContent.value,
    category: postCategory.value,
    author: '用户', // 可以从用户信息中获取
    date: new Date().toLocaleString(),
    likes: 0,
    comments: [],
    comment: ''
  };
  posts.value.push(newPost);
  postTitle.value = '';
  postContent.value = '';
  postCategory.value = 'question';
};

const toggleLike = (post) => {
  post.likes += 1;
};

const addComment = (post) => {
  const newComment = {
    id: Date.now(),
    content: post.comment,
    author: '用户', // 可以从用户信息中获取
    date: new Date().toLocaleString()
  };
  post.comments.push(newComment);
  post.comment = '';
};

const filteredPosts = computed(() => {
  return posts.value;
});
</script>

<style scoped>
.course-discussion-container {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
}

.course-title {
  font-size: 2.25rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
}

.post-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.post-form h3 {
  margin-bottom: 10px;
  color: #333;
}

.post-form label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.post-form .input-field {
  padding: 10px;
  margin: 10px 0 20px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
  width: 100%;
}

.post-form .input-field:focus {
  border-color: #42b983;
  outline: none;
}

.post-form .textarea-field {
  padding: 10px;
  margin: 10px 0 20px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
  width: 100%;
  height: 100px;
}

.post-form .textarea-field:focus {
  border-color: #42b983;
  outline: none;
}

.post-form .submit-button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.post-form .submit-button:hover {
  background-color: #36a77a;
}

.posts-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.posts-section h3 {
  margin-bottom: 10px;
  color: #333;
}

.post-card {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.post-card h4 {
  margin-top: 0;
  color: #333;
}

.post-card p {
  margin: 10px 0;
  color: #666;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 0.9em;
}

.like-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.like-button:hover {
  background-color: #36a77a;
}

.comments-section {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.comments-section h4 {
  margin-top: 0;
  color: #333;
}

.comment-card {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.comment-card p {
  margin: 10px 0;
  color: #666;
}

.comment-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 0.9em;
}
</style>