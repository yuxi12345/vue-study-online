<template>
    <div>
        <h3>用户统计</h3>
        <el-card>
            <p>新增用户数: {{ statistics.newUsers }}</p>
            <p>用户留存率: {{ statistics.retentionRate }}%</p>
        </el-card>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const statistics = ref({ newUsers: 0, retentionRate: 0 });

        const fetchStatistics = async () => {
            const response = await axios.get('/api/user-statistics');
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
  
