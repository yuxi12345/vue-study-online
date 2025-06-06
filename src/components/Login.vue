<template>
    <div class="login-container">
        <h2>登录</h2>
        <form @submit.prevent="login" class="login-form">
            <input type="text" v-model="email" placeholder="邮箱" required class="input-field" />
            <input type="password" v-model="password" placeholder="密码" required class="input-field" />
            <button type="submit" class="submit-button" :disabled="loading">{{ loading ? '登录中...' : '登录' }}</button>
        </form>
        <p class="register-link">
            没有账号? <router-link to="/register">注册</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'; // 引入 Element Plus 的消息提示
import axios from 'axios';

// 定义响应式变量
const email = ref(''); // 使用 email 代替 username
const password = ref('');
const router = useRouter();
const loading = ref(false); // 加载状态

// 登录函数
const login = async () => {
    loading.value = true; // 开始加载
    try {
        const response = await axios.post('http://47.76.51.193:8383/api/users/login', null, {
            params: {
                email: email.value,
                password: password.value
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            
            // 处理成功登录逻辑，例如重定向到主页
            ElMessage.success('登录成功！');
            router.push('/nav'); // 替换为您的主页路由
        }
    } catch (error) {
        if (error.response) {
            console.error('响应错误:', error.response.data);
            ElMessage.error(error.response.data.message || '登录失败，请重试。');
        } else {
            console.error('其他错误:', error.message);
            ElMessage.error('发生错误，请重试。');
        }
    } finally {
        loading.value = false; // 完成加载
    }
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
