<template>
    <div class="preferences-container">
        <h2 class="title">学习偏好设置</h2>
        <form @submit.prevent="savePreferences" class="preferences-form">
            <label for="interests" class="label">感兴趣的领域:</label>
            <input type="text" v-model="interests" placeholder="输入感兴趣的领域" class="input-field" id="interests" />

            <label for="studyTime" class="label">学习时间:</label>
            <input type="text" v-model="studyTime" placeholder="输入学习时间" class="input-field" id="studyTime" />

            <button type="submit" class="submit-button">保存偏好</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const interests = ref('');
const studyTime = ref('');

const savePreferences = () => {
    // 这里可以添加偏好保存逻辑，例如 API 调用
    console.log('保存的偏好:', { interests: interests.value, studyTime: studyTime.value });
};
</script>

<style scoped>
.preferences-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
}

.title {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.preferences-form {
    display: flex;
    flex-direction: column;
}

.label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

.input-field {
    padding: 10px;
    margin: 10px 0 20px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.input-field:focus {
    border-color: #42b983;
    outline: none;
}

.submit-button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #42b983;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #36a77a;
}
</style>
