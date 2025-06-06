<template>
    <div class="discussion-forum">
        <h1>课程讨论区</h1>

        <el-form class="post-form" @submit.prevent>
            <el-form-item>
                <el-input v-model="newPost.title" placeholder="帖子标题" />
            </el-form-item>
            <el-form-item>
                <el-input type="textarea" v-model="newPost.content" placeholder="帖子内容" />
            </el-form-item>
            <el-form-item>
                <el-select v-model="newPost.category" placeholder="选择分类">
                    <el-option label="课程疑问" value="课程疑问" />
                    <el-option label="学习技巧" value="学习技巧" />
                    <el-option label="学习心得" value="学习心得" />
                </el-select>
            </el-form-item>
            <el-button type="primary" @click="submitPost">发布帖子</el-button>
        </el-form>

        <div class="posts">
            <div v-for="post in posts" :key="post.id" class="post">
                <h3>{{ post.title }}</h3>
                <p>{{ post.content }}</p>
                <p><strong>分类:</strong> {{ post.category }}</p>
                <el-button @click="likePost(post)">点赞 ({{ post.likes }})</el-button>
                <div class="comments">
                    <h4>评论</h4>
                    <el-input v-model="newComment[post.id]" placeholder="添加评论" />
                    <el-button type="primary" @click="submitComment(post.id)">提交评论</el-button>
                    <div v-for="comment in post.comments" :key="comment.id" class="comment">
                        <p>{{ comment.content }}</p>
                        <el-button type="danger" @click="deleteComment(comment.id)">删除</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-button type="primary" round><router-link to="/nav">返回</router-link></el-button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            posts: [],
            newPost: {
                title: '',
                content: '',
                category: '',
            },
            newComment: {},
        };
    },
    methods: {
        async fetchPosts() {
            const response = await axios.get('http://47.76.51.193:8383/api/posts');
            this.posts = response.data;
        },
        async submitPost() {
            if (!this.newPost.title || !this.newPost.content || !this.newPost.category) {
                this.$message.error('请填写完整的帖子信息！');
                return;
            }

            await axios.post('http://47.76.51.193:8383/api/posts', this.newPost);
            this.newPost = { title: '', content: '', category: '' };
            this.fetchPosts();
            this.$message.success('帖子发布成功！');
        },
        async likePost(post) {
            await axios.post(`http://47.76.51.193:8383/api/posts/${post.id}/like`);
            post.likes++;
        },
        async submitComment(postId) {
            const commentContent = this.newComment[postId];
            if (!commentContent) {
                this.$message.error('评论内容不能为空！');
                return;
            }

            await axios.post(`http://47.76.51.193:8383/api/posts/${postId}/comments`, { content: commentContent });
            this.newComment[postId] = ''; // 清空评论输入框
            this.fetchPosts();
            this.$message.success('评论提交成功！');
        },
        async deleteComment(commentId) {
            const postId = this.posts.find(post => post.comments.some(comment => comment.id === commentId)).id;
            await axios.delete(`http://47.76.51.193:8383/api/posts/${postId}/comments/${commentId}`);
            this.fetchPosts(); // 重新获取帖子和评论
            this.$message.success('评论删除成功！');
        },
    },
    created() {
        this.fetchPosts();
    },
};
</script>

<style scoped>
.discussion-forum {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.post-form,
.post {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    /* 更柔和的背景色 */
}

h1 {
    color: #4CAF50;
    /* 课程讨论区标题颜色 */
    text-align: center;
    /* 标题居中 */
}

.comments {
    margin-top: 10px;
}

.comment {
    padding: 5px;
    border-top: 1px solid #eee;
}
</style>
