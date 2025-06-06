<template>
    <div class="register-container">
        <h2 class="title">注册</h2>
        <form @submit.prevent="registerUser" class="register-form">
            <input type="text" v-model="email" placeholder="邮箱" required class="input-field" />
            <input type="password" v-model="password" placeholder="密码" required class="input-field" />
            <input type="password" v-model="confirmPassword" placeholder="确认密码" required class="input-field" />
            <button type="submit" class="submit-button" :disabled="loading">{{ loading ? '注册中...' : '注册' }}</button>
        </form>
        <p class="login-link">
            已有账号? <router-link to="/login">登录</router-link>
        </p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'; // 引入 Element Plus 的消息提示
import axios from 'axios'; // 引入 axios

// 定义响应式变量
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const loading = ref(false); // 加载状态

const router = useRouter();

const registerUser = async () => {
    errorMessage.value = '';

    if (password.value !== confirmPassword.value) {
        errorMessage.value = '密码不匹配，请重新输入。';
        return;
    }

    // 验证邮箱格式
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(email.value)) {
        errorMessage.value = '请输入有效的邮箱地址';
        return;
    }

    loading.value = true; // 开始加载

    try {
        const response = await axios.post('http://47.76.51.193:8383/api/users/register', {
            name: email.value, // 假设 name 使用 email
            email: email.value,
            password: password.value
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            ElMessage.success('注册成功！'); // 弹出注册成功提示
            router.push('/login'); // 注册成功后跳转到登录页面
        } else {
            errorMessage.value = response.data.message;
        }
    } catch (error) {
        // 处理 Axios 错误
        if (error.response) {
            console.error('响应错误:', error.response.data);
            errorMessage.value = error.response.data.message || '注册失败，请重试。';
        } else if (error.request) {
            console.error('请求未响应:', error.request);
            errorMessage.value = '请求未响应，请检查网络。';
        } else {
            console.error('其他错误:', error.message);
            errorMessage.value = '发生错误，请重试。';
        }
    } finally {
        loading.value = false; // 结束加载
    }
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

.error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
}
</style>
