// 2025.6.5
// 正常调用
<template>
  <div class="course-list-container">
    <h2 class="text-2xl font-bold mb-5">课程中心</h2>

    <form @submit.prevent="addCourse" class="add-course-form mb-5">
      <input v-model="newCourse.title" type="text" placeholder="课程标题" required class="input-field" />
      <input v-model="newCourse.instructor" type="text" placeholder="授课老师" required class="input-field" />
      <input v-model="newCourse.duration" type="number" placeholder="课程时长（分钟）" required class="input-field" />
      <input v-model="newCourse.url" type="text" placeholder="课程链接" required class="input-field" />
      <button type="submit" class="submit-button">添加课程</button>
    </form>

    <div v-if="loading" class="loading-message">加载中...</div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <table v-if="!loading && courses.length" class="course-table">
      <thead>
        <tr>
          <th>课程 ID</th>
          <th>课程标题</th>
          <th>授课老师</th>
          <th>课程时长 (分钟)</th>
          <th>视频播放</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td>{{ course.id }}</td>
          <td>{{ course.title }}</td>
          <td>{{ course.instructor }}</td>
          <td>{{ course.duration }}</td>
          <td>
            <a :href="course.url" target="_blank" class="video-link">观看视频</a>
          </td>
          <td>
            <button @click="removeCourse(course.id)" class="action-button delete-button">删除</button>
            <button @click="editCourse(course)" class="action-button edit-button">编辑</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <el-button type="primary" round><router-link to="/nav">返回</router-link></el-button>

    <div v-if="editingCourse" class="edit-course-form">
      <h3 class="text-xl font-semibold mb-4">编辑课程</h3>
      <input v-model="editingCourse.title" type="text" placeholder="课程标题" required class="input-field" />
      <input v-model="editingCourse.instructor" type="text" placeholder="授课老师" required class="input-field" />
      <input v-model="editingCourse.duration" type="number" placeholder="课程时长" required class="input-field" />
      <input v-model="editingCourse.url" type="url" placeholder="课程链接" required class="input-field" />
      <button @click="updateCourse" class="submit-button">更新课程</button>
      <button @click="cancelEdit" class="cancel-button">取消</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const courses = ref([]);
const newCourse = ref({ title: '', instructor: '', duration: '', url: '' });
const editingCourse = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchCourses = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get('http://47.76.51.193:8383/api/courses');
    courses.value = response.data;
  } catch (err) {
    error.value = '获取课程失败';
  } finally {
    loading.value = false;
  }
};

const addCourse = async () => {
  loading.value = true;
  error.value = null;
  try {
    await axios.post('http://47.76.51.193:8383/api/courses', newCourse.value);
    newCourse.value = { title: '', instructor: '', duration: '', url: '' };
    await fetchCourses();
  } catch (err) {
    error.value = '添加课程失败';
  } finally {
    loading.value = false;
  }
};

const removeCourse = async (id) => {
  loading.value = true;
  error.value = null;
  try {
    await axios.delete(`http://47.76.51.193:8383/api/courses/${id}`);
    await fetchCourses();
  } catch (err) {
    error.value = '删除课程失败';
  } finally {
    loading.value = false;
  }
};

const editCourse = (course) => {
  editingCourse.value = { ...course };
};

const updateCourse = async () => {
  loading.value = true;
  error.value = null;
  try {
    await axios.put(`http://47.76.51.193:8383/api/courses/${editingCourse.value.id}`, {
      title: editingCourse.value.title,
      instructor: editingCourse.value.instructor,
      duration: editingCourse.value.duration,
      url: editingCourse.value.url
    });
    await fetchCourses();
    editingCourse.value = null;
  } catch (err) {
    error.value = '更新课程失败';
  } finally {
    loading.value = false;
  }
};

const cancelEdit = () => {
  editingCourse.value = null;
};

onMounted(fetchCourses);
</script>

<style scoped>
.course-list-container {
  max-width: 700px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h2 {
  color: #333;
}

.input-field {
  padding: 12px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.submit-button {
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #36a77a;
}

.loading-message {
  text-align: center;
  color: #007bff;
}

.error-message {
  color: red;
  text-align: center;
}

.course-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.video-link {
  color: #007bff;
  text-decoration: none;
}

.video-link:hover {
  text-decoration: underline;
}

.action-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button {
  background-color: #e57373;
  color: white;
  margin-right: 5px;
}

.edit-button {
  background-color: #64b5f6;
  color: white;
}

.delete-button:hover {
  background-color: #ef5350;
}

.edit-button:hover {
  background-color: #42a5f5;
}

.edit-course-form {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}
</style>
