<template>
    <h1>欢迎来到在线学习平台</h1>
    <div class="home">
        <nav class="nav-container">
            <ul class="nav-list">
                <li class="nav-item">
                    <router-link to="/userinfo" class="nav-button">个人信息</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/courses" class="nav-button">课程中心</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/studentList" class="nav-button">学生列表</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/detail" class="nav-button">在线视频</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/list2" class="nav-button">课程列表</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/dis" class="nav-button">讨论区</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/dashboard" class="nav-button">统计</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
// 这里可以添加任何需要的逻辑或状态管理
</script>

<style scoped>
.home {
    text-align: center;
    padding: 40px;
}

.nav-container {
    background-color: #f8f9fa;
    /* 背景颜色 */
    padding: 10px;
    /* 内边距 */
    border-bottom: 1px solid #ddd;
    /* 边框 */
}

.nav-list {
    list-style: none;
    /* 去掉默认的列表样式 */
    padding: 0;
    /* 去掉内边距 */
    margin: 0;
    /* 去掉外边距 */
    display: flex;
    /* 使用 flexbox 布局 */
    justify-content: center;
    /* 水平居中对齐 */
    gap: 15px;
    /* 每个导航项之间的间隙 */
}

.nav-item {
    display: inline;
    /* 使导航项水平排列 */
}

.nav-button {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.nav-button:hover {
    background-color: #e9ecef;
    color: #0056b3;
}
</style>
