<template>
  <div id="app">
    <header class="app-header">
      <h1 class="app-title">在线学习平台</h1>
      <nav class="app-nav">
        <ul class="nav-list">
          <li class="nav-item">

            <el-button type="primary">
              <router-link to="/register">注册</router-link>
            </el-button>

            <el-button type="danger">
              <router-link to="/login">登录</router-link>
            </el-button>

            
            <el-button type="warning" @click="logout">退出</el-button>




          </li>

        </ul>
      </nav>
    </header>
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">
      <p>school</p>
    </footer>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'; // 如果使用 Element Plus
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
  // 清除 token
  localStorage.removeItem('token');
  // 如果有其他用户数据，也可以清除
  localStorage.removeItem('userData'); // 示例：清除用户数据
  // 提示用户
  ElMessage.success("退出成功，用户数据已删除"); // 使用 Element Plus 的消息提示
  // 重定向到登录页面
  router.push('/login');
};

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  background-color: #f5f5f5;
  min-height: 100vh;
  /* 确保页面高度至少为100vh */
}

.app-header {
  background-color: #42b983;
  color: white;
  padding: 20px 0;
}

.app-title {
  margin: 0;
  font-size: 2em;
}

.app-nav {
  margin-top: 10px;
}

.nav-list {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  /* 水平居中 */
}

.nav-item {
  margin: 0 15px;
  /* 水平间距 */
}

.nav-item a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-item a:hover {
  text-decoration: underline;
  /* 悬停时下划线效果 */
}

.app-main {
  padding: 20px;
}

.app-footer {
  margin-top: auto;
  /* 将footer推到页面底部 */
  padding: 10px 0;
  background-color: #42b983;
  color: white;
}
</style>