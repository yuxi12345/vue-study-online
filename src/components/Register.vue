<template>
    <div class="register-container">
        <h2 class="title">注册</h2>
        <form @submit.prevent="register" class="register-form">
            <input type="text" v-model="username" placeholder="手机号或邮箱" required class="input-field" />
            <input type="password" v-model="password" placeholder="密码" required class="input-field" />
            <input type="password" v-model="confirmPassword" placeholder="确认密码" required class="input-field" />
            <button type="submit" class="submit-button">注册</button>
        </form>
        <p class="login-link">
            已有账号? <router-link to="/login">登录</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const register = () => {
    if (password.value !== confirmPassword.value) {
        alert('密码不匹配，请重新输入。');
        return;
    }
    // 注册逻辑
    console.log('注册:', username.value, password.value);
    // 在这里可以添加 API 调用进行用户注册
};
</script>

<style scoped>
.register-container {
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

.register-form {
    display: flex;
    flex-direction: column;
}

.input-field {
    padding: 10px;
    margin: 10px 0;
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

.login-link {
    text-align: center;
    margin-top: 10px;
}

.login-link a {
    color: #42b983;
    text-decoration: none;
}

.login-link a:hover {
    text-decoration: underline;
}
</style>
