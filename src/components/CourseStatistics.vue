<template>
    <div>
        <h3>课程统计</h3>
        <el-card>
            <p>课程销量: {{ statistics.sales }}</p>
            <p>学员活跃度: {{ statistics.activeUsers }}</p>
        </el-card>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const statistics = ref({ sales: 0, activeUsers: 0 });

        const fetchStatistics = async () => {
            const response = await axios.get('/api/course-statistics');
            if (response.data.success) {
                statistics.value = response.data.data;
            }
        };

        onMounted(fetchStatistics);

        return { statistics };
    },
};
</script>

<style scoped>
/* 添加样式 */
</style>
  
