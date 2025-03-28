<template>
    <div class="profile-container">
        <h2 class="title">个人信息</h2>
        <form @submit.prevent="updateProfile" class="profile-form">
            <div class="profile-picture">
                <input type="file" @change="onFileChange" class="file-input" />
                <img v-if="avatar" :src="avatar" alt="Profile Picture" class="avatar" />
                <p v-else>请上传头像</p>
            </div>

            <label for="nickname" class="label">昵称:</label>
            <input type="text" v-model="nickname" placeholder="请输入昵称" class="input-field" id="nickname" />

            <label for="gender" class="label">性别:</label>
            <select v-model="gender" class="input-field" id="gender">
                <option value="" disabled>选择性别</option>
                <option value="男">男</option>
                <option value="女">女</option>
                <option value="其他">其他</option>
            </select>

            <label for="bio" class="label">简介:</label>
            <textarea v-model="bio" placeholder="请输入个人简介" class="textarea-field" id="bio"></textarea>

            <button type="submit" class="submit-button">更新信息</button>
        </form>
        <h3 class="record-title">学习记录</h3>
        <ul class="learning-records">
            <li v-for="course in learningRecords" :key="course.id" class="record-item">{{ course.name }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const nickname = ref('');
const gender = ref('');
const bio = ref('');
const avatar = ref(null);
const learningRecords = ref([
    { id: 1, name: '课程1' },
    { id: 2, name: '课程2' },
]);

const updateProfile = () => {
    console.log('更新个人信息:', {
        nickname: nickname.value,
        gender: gender.value,
        bio: bio.value,
        avatar: avatar.value,
    });
    // 在这里可以添加 API 调用进行用户信息更新
};

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            avatar.value = e.target.result; // 将文件内容转换为数据URL
        };
        reader.readAsDataURL(file);
    }
};
</script>

<style scoped>
.profile-container {
    max-width: 500px;
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

.profile-form {
    display: flex;
    flex-direction: column;
}

.profile-picture {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.file-input {
    margin-bottom: 10px;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 10px;
}

.label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

.input-field,
.textarea-field {
    padding: 10px;
    margin: 10px 0 20px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.input-field:focus,
.textarea-field:focus {
    border-color: #42b983;
    outline: none;
}

.textarea-field {
    min-height: 100px;
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

.record-title {
    margin-top: 30px;
    text-align: center;
    color: #333;
}

.learning-records {
    list-style-type: none;
    padding: 0;
}

.record-item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
</style>
