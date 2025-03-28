<template>
    <div class="login-container">
        <h2>登录</h2>
        <form @submit.prevent="login" class="login-form">
            <input type="text" v-model="username" placeholder="手机号或邮箱" required class="input-field" />
            <input type="password" v-model="password" placeholder="密码" required class="input-field" />
            <button type="submit" class="submit-button">登录</button>
        </form>
        <p class="register-link">
            没有账号? <router-link to="/register">注册</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const login = () => {
    // 登录逻辑
    console.log('登录:', username.value, password.value);
    // 在这里可以添加 API 调用进行用户登录
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.login-form {
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

.register-link {
    text-align: center;
    margin-top: 10px;
}

.register-link a {
    color: #42b983;
    text-decoration: none;
}

.register-link a:hover {
    text-decoration: underline;
}
</style>
