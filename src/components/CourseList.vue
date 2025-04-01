<template>
  <div class="course-list-container">
    <div class="filter-section">
      <select v-model="selectedCategory" class="filter-select">
        <option value="">所有类别</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
      <select v-model="sortBy" class="filter-select">
        <option value="hot">热门程度</option>
        <option value="new">最新发布</option>
      </select>
      <input type="text" v-model="searchQuery" placeholder="搜索课程..." class="search-input" />
    </div>

    <div class="course-grid">
      <div v-for="course in filteredCourses" :key="course.id" class="course-card">
        <router-link :to="`/courses/${course.id}`" class="course-link">
          <img :src="course.cover" :alt="course.title" class="course-cover" />
          <div class="course-info">
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="instructor">讲师: {{ course.instructor }}</p>
            <div class="rating-section">
              <span class="rating">{{ course.rating.toFixed(1) }}</span>
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(course.rating) }">★</span>
              </div>
              <span class="students">({{ course.students }}人)</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const categories = ref(['编程', '语言', '艺术', '设计', '商业']);
const selectedCategory = ref('');
const sortBy = ref('hot');
const searchQuery = ref('');

// 模拟课程数据
const courses = ref([
  {
    id: 1,
    title: 'Vue3 入门实战',
    category: '编程',
    cover: 'https://via.placeholder.com/300x200',
    instructor: '张老师',
    rating: 4.8,
    students: 1520,
    createdAt: '2024-03-01'
  },
  // 更多模拟数据...
]);

const filteredCourses = computed(() => {
  return courses.value
    .filter(course => 
      (selectedCategory.value ? course.category === selectedCategory.value : true) &&
      (course.title.includes(searchQuery.value) || course.instructor.includes(searchQuery.value))
    )
    .sort((a, b) => {
      if (sortBy.value === 'hot') return b.students - a.students;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
});
</script>

<style scoped>
.course-list-container {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
}

.filter-section {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.filter-select, .search-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.course-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.course-card:hover {
  transform: translateY(-5px);
}

.course-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.course-info {
  padding: 15px;
}

.course-title {
  margin: 0 0 10px;
  color: #333;
  font-size: 1.1em;
}

.instructor {
  color: #666;
  margin: 0 0 8px;
  font-size: 0.9em;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  color: #ffd700;
}

.star.filled {
  color: #ffd700;
}

.star:not(.filled) {
  color: #ddd;
}

.students {
  color: #666;
  font-size: 0.9em;
}
</style>