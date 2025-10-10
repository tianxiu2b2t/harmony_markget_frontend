<template>
  <div id="app">
    <!-- 路由出口：所有匹配的组件将在这里渲染 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
// 根组件无需额外逻辑，主要用于路由出口
</script>

<style>
/* 全局样式可在此定义 */
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 100%);
}
</style>