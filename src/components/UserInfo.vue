// 用户个人信息
// 2025.6.5 
// 正常调用
<template>
    <div class="container">
        <h2>用户个人信息</h2>
        <div v-if="loading" class="loading">
            <p>正在加载用户信息...</p>
        </div>
        <div v-else-if="userInfo">
            <form @submit.prevent="updateUserInfo">
                <div class="form-group">
                    <label for="nickname">昵称:</label>
                    <input type="text" id="nickname" v-model="userInfo.nickname" />
                </div>
                <div class="form-group">
                    <label for="gender">性别:</label>
                    <select id="gender" v-model="userInfo.gender">
                        <option value="Male">男</option>
                        <option value="Female">女</option>
                        <option value="Other">其他</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="biography">简介:</label>
                    <textarea id="biography" v-model="userInfo.biography"></textarea>
                </div>

                <button type="submit">更新信息</button>
            </form>

            <h2>更新密码</h2>
            <form @submit.prevent="updatePassword">
                <div class="form-group">
                    <label for="email">电子邮件:</label>
                    <input type="email" id="email" v-model="email" required />
                </div>
                <div class="form-group">
                    <label for="oldPassword">当前密码:</label>
                    <input type="password" id="oldPassword" v-model="oldPassword" required />
                </div>
                <div class="form-group">
                    <label for="newPassword">新密码:</label>
                    <input type="password" id="newPassword" v-model="newPassword" required />
                </div>
                <div class="form-group">
                    <label for="confirmPassword">确认新密码:</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required />
                </div>

                <button type="submit">更新密码</button>
            </form>
            <el-button type="primary" round><router-link to="/nav">返回</router-link></el-button>
        </div>
        <div v-else>
            <p>未找到用户信息。</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userInfo: null, // 存储用户信息
            loading: true, // 加载状态
            username: 'user1', // 替换为实际用户名，例如 'user1'
            email: '', // 用户电子邮件
            oldPassword: '', // 当前密码
            newPassword: '', // 新密码
            confirmPassword: '' // 确认新密码
        };
    },
    created() {
        this.fetchUserInfo(this.username); // 组件创建时获取用户信息
    },
    methods: {
        fetchUserInfo(username) {
            this.loading = true; // 开始加载
            axios.get(`http://47.76.51.193:8383/api/user/${username}`)
                .then(response => {
                    this.userInfo = response.data; // 更新用户信息
                    this.email = this.userInfo.email; // 假设用户信息中有电子邮件
                })
                .catch(error => {
                    console.error("获取用户信息失败:", error);
                })
                .finally(() => {
                    this.loading = false; // 加载完成
                });
        },
        updateUserInfo() {
            axios.put(`http://47.76.51.193:8383/api/user/`, this.userInfo)
                .then(response => {
                    alert("用户信息更新成功!");
                })
                .catch(error => {
                    console.error("更新用户信息失败:", error);
                    alert("更新失败，请稍后重试。");
                });
        },
        updatePassword() {
            // 检查新密码和确认密码是否一致
            if (this.newPassword !== this.confirmPassword) {
                alert("新密码和确认密码不一致！");
                return;
            }

            // 构建更新密码的 URL
            const url = `http://47.76.51.193:8383/api/users/password?email=${encodeURIComponent(this.email)}&oldPassword=${encodeURIComponent(this.oldPassword)}&newPassword=${encodeURIComponent(this.newPassword)}`;

            axios.put(url)
                .then(response => {
                    alert("密码更新成功!");
                    // 清空密码字段
                    this.oldPassword = '';
                    this.newPassword = '';
                    this.confirmPassword = '';
                })
                .catch(error => {
                    console.error("更新密码失败:", error);
                    alert("更新密码失败，请检查当前密码是否正确。");
                });
        },
        parseLearningPreferences(preferences) {
            try {
                const parsed = JSON.parse(preferences);
                return `兴趣领域: ${parsed.interests.join(', ')}，学习时间: ${parsed.study_time}`;
            } catch (error) {
                return "无有效学习偏好";
            }
        }
    }
};
</script>

<style scoped>
/* 样式根据需要自定义 */
body {
    font-family: 'Arial', sans-serif;
    /* 使用系统字体 */
    background-color: #f4f4f4;
    /* 背景颜色 */
    color: #333;
    /* 字体颜色 */
}

.container {
    max-width: 600px;
    /* 限定最大宽度 */
    margin: 0 auto;
    /* 居中 */
    padding: 20px;
    /* 内边距 */
    background: white;
    /* 背景白色 */
    border-radius: 8px;
    /* 圆角 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
}

h2 {
    font-size: 26px;
    /* 标题字体大小 */
    margin-bottom: 20px;
    /* 标题下边距 */
    color: #4CAF50;
    /* 标题颜色 */
}

.loading {
    text-align: center;
    /* 加载信息居中 */
    font-size: 18px;
    /* 加载字体大小 */
}

.form-group {
    margin-bottom: 15px;
    /* 表单组下边距 */
}

label {
    font-weight: bold;
    /* 标签加粗 */
    display: block;
    /* 标签块级显示 */
    margin-bottom: 5px;
    /* 标签下边距 */
}

input,
select,
textarea {
    width: 100%;
    /* 100% 宽度 */
    padding: 10px;
    /* 内边距 */
    border: 1px solid #ccc;
    /* 边框 */
    border-radius: 4px;
    /* 圆角 */
    font-size: 16px;
    /* 字体大小 */
    transition: border-color 0.3s;
    /* 边框颜色过渡 */
}

input:focus,
select:focus,
textarea:focus {
    border-color: #4CAF50;
    /* 聚焦时边框颜色 */
    outline: none;
    /* 去掉轮廓 */
}

button {
    margin-top: 20px;
    /* 按钮上边距 */
    padding: 10px;
    /* 按钮内边距 */
    background-color: #4CAF50;
    /* 按钮背景色 */
    color: white;
    /* 按钮文字颜色 */
    border: none;
    /* 去掉边框 */
    border-radius: 4px;
    /* 圆角 */
    cursor: pointer;
    /* 鼠标指针 */
    font-size: 16px;
    /* 按钮字体大小 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* 按钮阴影 */
    transition: background-color 0.3s, transform 0.2s;
    /* 背景色和变换过渡 */
}

button:hover {
    background-color: #45a049;
    /* 悬停时按钮背景色 */
    transform: translateY(-2px);
    /* 悬停时上移 */
}
</style>
