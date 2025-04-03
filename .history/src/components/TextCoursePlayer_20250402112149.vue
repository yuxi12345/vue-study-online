<template>
  <div class="text-course-player-container">
    <h2 class="course-title">{{ course.title }}</h2>
    <div class="course-content" v-html="formattedContent"></div>
    <div class="notes-section">
      <h3>笔记</h3>
      <textarea v-model="notes" placeholder="添加笔记..."></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const notes = ref('');

const course = ref({
  id: 1,
  title: 'Vue3 入门实战',
  content: `<p>Vue3 是一个用于构建用户界面的渐进式框架。核心库只关注视图层，并且非常容易上手，同时提供了构建复杂单页应用所需的高级功能。</p>
            <p>Vue3 的组合式API使得代码更加模块化和易于维护。</p>`,
});

const formattedContent = computed(() => {
  return course.value.content.replace(/<p>/g, '<p contenteditable="true" class="editable-paragraph">')
                            .replace(/<\/p>/g, '</p>');
});

onMounted(() => {
  const savedNotes = localStorage.getItem(`notes-${course.value.id}`);
  if (savedNotes) {
    notes.value = savedNotes;
  }
});

watch(notes, (newNotes) => {
  localStorage.setItem(`notes-${course.value.id}`, newNotes);
});
</script>

<style scoped>
.text-course-player-container {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
}

.course-title {
  font-size: 2.25rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
}

.course-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.editable-paragraph {
  outline: none;
  border: none;
  font-size: 16px;
  line-height: 1.5;
}

.notes-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.notes-section h3 {
  margin-bottom: 10px;
  color: #333;
}

.notes-section textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.notes-section textarea:focus {
  border-color: #42b983;
  outline: none;
}
</style>