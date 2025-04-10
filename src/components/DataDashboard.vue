<template>
  <div class="dashboard">
    <h2>数据看板</h2>
    <div class="charts">
      <div class="chart-card">
        <h3>课程销量</h3>
        <div class="chart-placeholder"></div>
      </div>
      <div class="chart-card">
        <h3>用户活跃度</h3>
        <div class="chart-placeholder"></div>
      </div>
    </div>
  </div>
</template>

<style>
.charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-placeholder {
  height: 300px;
  background: #f5f5f5;
  border-radius: 8px;
}
</style>