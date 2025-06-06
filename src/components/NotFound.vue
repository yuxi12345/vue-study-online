<template>
    <div class="not-found-container">
        <h1>404 - 页面未找到</h1>
        <p>抱歉，您访问的页面不存在。</p>
        <router-link to="/" class="home-link">返回首页</router-link>
    </div>
</template>

<script setup>
// 如果需要其他逻辑，可以在这里添加
</script>

<style scoped>
.not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    /* 高度为视口高度 */
    text-align: center;
}

h1 {
    font-size: 3em;
    color: #ff0000;
    /* 红色 */
}

p {
    font-size: 1.2em;
}

.home-link {
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.home-link:hover {
    background-color: #0056b3;
    /* 深色背景 */
}
</style>
  
