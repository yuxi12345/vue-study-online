<template>
    <el-container class="container">
        <el-header>
            <h1 class="title">学生列表</h1>
        </el-header>
        <el-main>
            <h2 class="form-title">{{ editingStudent ? '编辑学生' : '添加学生' }}</h2>
            <el-form @submit.prevent="submitForm" class="student-form" :model="form" ref="formRef">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" required></el-input>
                </el-form-item>

                <el-form-item label="年龄" prop="age">
                    <el-input-number v-model="form.age" :min="1" required></el-input-number>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" native-type="submit">{{ editingStudent ? '更新' : '添加' }}</el-button>
                </el-form-item>
            </el-form>

            <el-divider></el-divider>

            <el-table :data="paginatedStudents" style="width: 100%">
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="age" label="年龄" width="100"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button size="small" type="warning" @click="editStudent(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="confirmDeleteStudent(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination background layout="prev, pager, next" :total="students.length" :page-size="pageSize"
                :current-page="currentPage" @current-change="currentPage = $event">
            </el-pagination>
        </el-main>
    </el-container>

    <el-button type="primary" round><router-link to="/nav">返回</router-link></el-button>

</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

export default {
    name: 'StudentList',
    setup() {
        const students = ref([]);
        const form = ref({ name: '', age: null });
        const editingStudent = ref(null);
        const currentPage = ref(1);
        const pageSize = 5;

        // 获取所有学生
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://47.76.51.193:8383/api/students');
                students.value = await response.json();
            } catch (error) {
                console.error('获取学生失败:', error);
            }
        };

        // 计算分页后的学生列表
        const paginatedStudents = computed(() => {
            const start = (currentPage.value - 1) * pageSize;
            return students.value.slice(start, start + pageSize);
        });

        // 添加学生
        const addStudent = async () => {
            try {
                const response = await fetch('http://47.76.51.193:8383/api/students', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form.value),
                });
                const newStudent = await response.json();
                students.value.push(newStudent);
                resetForm();
                ElMessage.success('学生添加成功！');
            } catch (error) {
                console.error('添加学生失败:', error);
            }
        };

        // 更新学生
        const updateStudent = async (studentId) => {
            try {
                const response = await fetch(`http://47.76.51.193:8383/api/students/${studentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form.value),
                });
                const updatedStudent = await response.json();
                const index = students.value.findIndex(student => student.id === studentId);
                students.value[index] = updatedStudent;
                resetForm();
                ElMessage.success('学生更新成功！');
            } catch (error) {
                console.error('更新学生失败:', error);
            }
        };

        // 确认删除学生
        const confirmDeleteStudent = (studentId) => {
            ElMessageBox.confirm('此操作将永久删除该学生, 是否继续?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                deleteStudent(studentId);
            }).catch(() => {
                ElMessage.info('已取消删除');
            });
        };

        // 删除学生
        const deleteStudent = async (studentId) => {
            try {
                await fetch(`http://47.76.51.193:8383/api/students/${studentId}`, {
                    method: 'DELETE',
                });
                students.value = students.value.filter(student => student.id !== studentId);
                ElMessage.success('学生删除成功！');
            } catch (error) {
                console.error('删除学生失败:', error);
            }
        };

        // 编辑学生信息
        const editStudent = (student) => {
            editingStudent.value = student.id;
            form.value.name = student.name;
            form.value.age = student.age;
        };

        // 提交表单
        const submitForm = () => {
            if (editingStudent.value) {
                updateStudent(editingStudent.value);
            } else {
                addStudent();
            }
        };

        // 重置表单
        const resetForm = () => {
            form.value.name = '';
            form.value.age = null;
            editingStudent.value = null;
        };

        // 组件挂载后获取学生列表
        onMounted(fetchStudents);

        return {
            students,
            form,
            editingStudent,
            currentPage,
            pageSize,
            paginatedStudents,
            fetchStudents,
            addStudent,
            updateStudent,
            confirmDeleteStudent,
            deleteStudent,
            editStudent,
            submitForm,
            resetForm,
        };
    },
};
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    text-align: center;
    color: #2c3e50;
}

.form-title {
    margin-top: 20px;
    color: #2c3e50;
}

.student-form {
    margin-bottom: 20px;
}
</style>
