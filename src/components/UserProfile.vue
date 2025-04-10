<template>
    <div class="profile-container">
        <h2 class="title">个人信息</h2>
        <form @submit.prevent="updateProfile" class="profile-form">
            <div class="profile-picture" @click="triggerFileInput">
                <input 
                    type="file" 
                    ref="fileInput" 
                    @change="onFileChange" 
                    class="file-input" 
                    accept="image/*"
                />
                <div class="avatar-container">
                    <img 
                        v-if="avatar" 
                        :src="avatar" 
                        alt="Profile Picture" 
                        class="avatar"
                        :class="{ 'avatar-hover': !isUploading }"
                    />
                    <div v-else class="avatar-placeholder">
                        <span>+</span>
                    </div>
                    <div v-if="isUploading" class="upload-overlay">
                        <div class="spinner"></div>
                    </div>
                </div>
                <p class="upload-hint">点击更换头像</p>
            </div>

            <div class="form-group">
                <label for="nickname" class="label">昵称</label>
                <input 
                    type="text" 
                    v-model="nickname" 
                    placeholder="请输入昵称" 
                    class="input-field" 
                    id="nickname"
                    @focus="animateInput"
                />
            </div>

            <div class="form-group">
                <label for="gender" class="label">性别</label>
                <select 
                    v-model="gender" 
                    class="input-field" 
                    id="gender"
                    @focus="animateInput"
                >
                    <option class="tip" value="" disabled>选择性别</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                    <option value="其他">其他</option>
                </select>
            </div>

            <div class="form-group">
                <label for="bio" class="label">简介</label>
                <textarea 
                    v-model="bio" 
                    placeholder="请输入个人简介" 
                    class="textarea-field" 
                    id="bio"
                    @focus="animateInput"
                ></textarea>
                <div class="char-counter">{{ bio.length }}/100</div>
            </div>

            <button 
                type="submit" 
                class="submit-button"
                :disabled="isSubmitting"
                :class="{ 'button-loading': isSubmitting }"
            >
                <span v-if="!isSubmitting">更新信息</span>
                <span v-else>更新中...</span>
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const nickname = ref('');
const gender = ref('');
const bio = ref('');
const avatar = ref(null);
const fileInput = ref(null);
const isUploading = ref(false);
const isSubmitting = ref(false);

const triggerFileInput = () => {
    fileInput.value.click();
};

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        isUploading.value = true;
        // 模拟上传过程
        setTimeout(() => {
            const reader = new FileReader();
            reader.onload = (e) => {
                avatar.value = e.target.result;
                isUploading.value = false;
            };
            reader.readAsDataURL(file);
        }, 1500);
    }
};

const updateProfile = () => {
    isSubmitting.value = true;
    console.log('更新个人信息:', {
        nickname: nickname.value,
        gender: gender.value,
        bio: bio.value,
        avatar: avatar.value,
    });
    
    // 模拟API调用
    setTimeout(() => {
        isSubmitting.value = false;
    }, 2000);
};

const animateInput = (event) => {
    const input = event.target;
    input.style.transform = 'scale(1.02)';
    setTimeout(() => {
        input.style.transform = 'scale(1)';
    }, 300);
};
</script>

<style scoped>
.profile-container {
    max-width: 500px;
    margin: 30px auto;
    padding: 30px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.tip{
    color: #2c3e50;
}
.title {
    text-align: center;
    margin-bottom: 30px;
    color: #2c3e50;
    font-size: 24px;
    font-weight: 500;
}

.profile-form {
    display: flex;
    flex-direction: column;
}

.profile-picture {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    cursor: pointer;
}

.file-input {
    display: none;
}

.avatar-container {
    position: relative;
    width: 120px;
    height: 120px;
    margin-bottom: 10px;
}

.avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #f1f1f1;
    transition: all 0.3s ease;
}

.avatar-hover:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ccc;
    transition: all 0.3s ease;
}

.avatar-placeholder span {
    font-size: 36px;
    color: #999;
}

.upload-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spinner {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(66, 185, 131, 0.2);
    border-top-color: #42b983;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.upload-hint {
    color: #7f8c8d;
    font-size: 14px;
    margin-top: 5px;
}

.form-group {
    margin-bottom: 20px;
}

.label {
    display: block;
    margin-bottom: 8px;
    color: #34495e;
    font-size: 14px;
    font-weight: 500;
}

.input-field,
.textarea-field {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    color: #7f8c8d;
    background-color: #f9f9f9;
    transition: all 0.3s ease;
    height: 50px; /* 统一高度 */
    box-sizing: border-box; /* 确保内边距和边框包含在宽度内 */
}

.input-field:focus,
.textarea-field:focus {
    border-color: #42b983;
    background-color: #fff;
    box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
    outline: none;
}

.input-field::placeholder,
.textarea-field::placeholder {
    color: #95a5a6;
    opacity: 1; /* 确保提示文字不透明 */
}

.textarea-field {
    min-height: 100px;
    resize: vertical;
    height: auto; /* 允许文本区域高度自适应 */
}

.char-counter {
    text-align: right;
    font-size: 12px;
    color: #95a5a6;
    margin-top: 5px;
}

.submit-button {
    padding: 12px;
    margin-top: 10px;
    border: none;
    border-radius: 8px;
    background-color: #42b983;
    color: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.submit-button:hover:not(:disabled) {
    background-color: #36a77a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.submit-button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
}

.button-loading {
    color: transparent;
}

@media (max-width: 600px) {
    .profile-container {
        padding: 20px;
        margin: 20px 15px;
    }
    
    .avatar-container {
        width: 100px;
        height: 100px;
    }
}
</style>