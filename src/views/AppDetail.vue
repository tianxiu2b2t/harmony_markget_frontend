<template>
  <div class="px-4 py-6">
    <!-- 头部导航 -->
    <div class="mb-6">
      <button @click="$router.push('/dashboard')" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        返回仪表板
      </button>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex justify-center items-center py-16">
      <div class="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- 错误状态 -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <strong class="font-bold">获取数据失败</strong>
      <span class="block sm:inline"> {{ error }}</span>
    </div>

    <!-- 应用详情 -->
    <div v-if="appInfo && !loading && !error">
      <!-- 警告提示 -->
      <div v-if="!getDataSuccess" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <strong class="font-bold">注意!</strong>
        <span class="block sm:inline"> 无法从 AppGallery 获取到最新的数据, 可能应用已经下架</span>
      </div>

      <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 应用图标和操作按钮 -->
          <div class="md:w-1/6 text-center">
            <img 
              :src="appInfo.icon_url || '/img/default-app-icon.png'" 
              class="w-24 h-24 rounded-md mx-auto mb-3" 
              :alt="appInfo.name"
            >
            <p class="text-lg mb-1 text-yellow-500">
              {{ renderStars(appInfo.rating?.average_rating) }}
            </p>
            <p class="text-gray-500 mb-4">
              {{ appInfo.rating?.total_star_rating_count || '无' }} 评分
            </p>
            
            <div class="flex flex-col gap-2">
              <a 
                :href="`https://appgallery.huawei.com/app/detail?id=${appInfo.pkg_name}`" 
                target="_blank" 
                class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                在华为应用市场查看
              </a>
              <button 
                @click="copyCurrentUrl()" 
                class="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                复制当前页面链接
              </button>
              <button 
                @click="shareLink()" 
                class="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
              >
                分享当前页面
              </button>
            </div>
          </div>

          <!-- 应用基本信息 -->
          <div class="md:w-5/6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ appInfo.name || '未知应用' }}</h2>
            <p class="text-gray-600 mb-4">{{ appInfo.developer_name || '未知开发者' }}</p>

            <!-- 标签组 -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {{ appInfo.kind_type_name || '未知' }}-{{ appInfo.kind_name || '未知' }}
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                {{ appMetric?.version }} ({{ appMetric?.version_code }})
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
                目标 api 版本 {{ appMetric?.target_sdk }}
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                最小 api 版本 {{ appMetric?.minsdk }}
              </span>
            </div>

            <!-- 详细信息表格 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <strong>数据更新时间:</strong> {{ formatDate(appMetric?.created_at || '') }}
              </div>
              <div>
                <strong>应用爬取时间:</strong> {{ formatDate(appInfo.created_at) }}
              </div>
              <div>
                <strong>应用上架时间:</strong> {{ appInfo.listed_at ? new Date(appInfo.listed_at).toLocaleDateString() : '未知' }}
              </div>
              <div>
                <strong>应用更新时间:</strong> {{ formatDate(appMetric?.release_date || '') }}
              </div>
              <div>
                <strong>下载量:</strong> {{ formatNumber(appMetric?.download_count || 0) }}
              </div>
              <div>
                <strong>应用大小:</strong> {{ formatSize(appMetric?.size_bytes || 0) }}
              </div>
              <div>
                <strong>App ID:</strong> {{ appInfo.app_id }}
              </div>
              <div>
                <strong>Package Name:</strong> {{ appInfo.pkg_name }}
              </div>
            </div>

            <!-- 支持设备 -->
            <div class="mb-6">
              <p class="font-semibold mb-2">上架终端列表</p>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="code in appInfo.main_device_codes" 
                  :key="code"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800"
                >
                  {{ parseDeviceCode(code) }}
                </span>
              </div>
              <p class="text-gray-500 text-sm mt-2">应用上架终端类型与APP Gallery同步，不代表实际情况</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 下载趋势图表 -->
      <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">下载量变化趋势</h3>
        <div class="chart-container" style="height: 300px;">
          <canvas id="downloadHistoryChart"></canvas>
        </div>
      </div>

      <!-- 下载增量图表 -->
      <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">下载量增量趋势</h3>
        <div class="chart-container" style="height: 300px;">
          <canvas id="downloadIncrementChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Chart from 'chart.js/auto';
import { formatNumber, formatSize, formatDate, renderStars } from '../utils';
import { copy } from 'clipboard';

// 定义类型
interface AppInfo {
  app_id: string;
  name: string;
  pkg_name: string;
  icon_url?: string;
  developer_name?: string;
  kind_type_name?: string;
  kind_name?: string;
  main_device_codes: string[];
  created_at: string;
  listed_at?: string;
  rating?: {
    average_rating: number;
    total_star_rating_count?: number;
  };
}

interface AppMetric {
  version: string;
  version_code: string;
  target_sdk?: string;
  minsdk?: string;
  download_count?: number;
  size_bytes?: number;
  created_at: string;
  release_date: string;
}

// 状态定义
const route = useRoute();
const appId = route.params.appId as string;
const loading = ref(true);
const error = ref('');
const appInfo = ref<AppInfo | null>(null);
const appMetric = ref<AppMetric | null>(null);
const getDataSuccess = ref(true);

// 解析设备代码
const parseDeviceCode = (code: string): string => {
  const deviceMap: Record<string, string> = {
    '0': '手机',
    '3': '智慧屏',
    '4': '平板',
    '7': '智能手表',
    '9': '运动手表',
    '15': '电脑'
  };
  return deviceMap[code] || `未知 ${code}`;
};

// 复制到剪贴板
const copyToClipboard = (text: string) => {
  copy(text);
};
const copyCurrentUrl = () => {
  copyToClipboard(window.location.href);
}

// 分享链接
const shareLink = () => {
  if (navigator.share && appInfo.value) {
    navigator.share({
      title: `分享应用: ${appInfo.value.name}`,
      text: `查看应用详情: ${appInfo.value.name}`,
      url: window.location.href
    }).catch(err => {
      console.error('分享失败:', err);
    });
  } else {
    copy(window.location.href);
    alert('链接已复制，可手动分享');
  }
};

// 加载应用详情
const loadAppDetail = async () => {
  try {
    loading.value = true;
    const response = await fetch(`/api/apps/app_id/${appId}`);
    const data = await response.json();
    
    if (!data.success) {
      error.value = data.data?.error || '未知错误';
      return;
    }

    appInfo.value = data.data.info;
    appMetric.value = data.data.metric;
    getDataSuccess.value = data.data.get_data !== false;
    
    // 加载图表
    loadCharts();
  } catch (err) {
    error.value = '获取应用详情失败，请稍后重试';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// 加载趋势图表
const loadCharts = async () => {
  if (!appInfo.value) return;
  
  try {
    // 下载历史图表
    const historyRes = await fetch(`/api/apps/${appInfo.value.app_id}/download-history`);
    const historyData = await historyRes.json();
    if (historyData.success && historyData.data.length) {
      renderDownloadHistoryChart(historyData.data);
    }

    // 增量图表
    const incrementRes = await fetch(`/api/apps/${appInfo.value.app_id}/download-increment`);
    const incrementData = await incrementRes.json();
    if (incrementData.success && incrementData.data.length) {
      renderIncrementChart(incrementData.data);
    }
  } catch (err) {
    console.error('加载图表失败:', err);
  }
};

// 渲染下载历史图表
const renderDownloadHistoryChart = (data: any[]) => {
  const ctx = document.getElementById('downloadHistoryChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(item => formatDate(item.date)),
      datasets: [{
        label: '下载量',
        data: data.map(item => item.download_count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            callback: (value: any) => formatNumber(value)
          }
        }
      }
    }
  });
};

// 渲染增量图表
const renderIncrementChart = (data: any[]) => {
  const ctx = document.getElementById('downloadIncrementChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => formatDate(item.date)),
      datasets: [{
        label: '下载增量',
        data: data.map(item => item.increment),
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            callback: (value: any) => formatNumber(value)
          }
        }
      }
    }
  });
};

// 页面加载时获取数据
onMounted(() => {
  loadAppDetail();
});
</script>

<style scoped>
.chart-container {
  height: 300px;
  position: relative;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 8px;
}
</style>