import Mock from 'mockjs';

const Random = Mock.Random;

// 模拟课程统计数据
Mock.mock('/api/course-statistics', 'get', {
    success: true,
    data: {
        sales: Random.integer(100, 1000), // 课程销量
        activeUsers: Random.integer(100, 500), // 学员活跃度
    },
});

// 模拟用户统计数据
Mock.mock('/api/user-statistics', 'get', {
    success: true,
    data: {
        newUsers: Random.integer(50, 200), // 新增用户数
        retentionRate: Random.float(0, 100, 2, 2), // 用户留存率
    },
});
