<template>
  <div class="px-4 py-6">
    <!-- 头部信息 -->
    <div class="mb-6">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md border border-blue-100 transition-all duration-300 hover:shadow-lg">
        <div class="px-5 py-4">
          <h1 class="text-2xl font-semibold text-indigo-900 mb-3 animate-pulse">
            华为应用市场看板 数据收集自 appgallery api 不保证来源的准确性、完整性和真实性 仅供参考
          </h1>
          <div class="flex flex-col sm:flex-row justify-start sm:justify-between items-center gap-4">
            <div class="flex flex-wrap justify-start items-center gap-1 sm:gap-3 w-full sm:w-auto">
              <button @click="refreshData" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-md hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                  </path>
                </svg>
                刷新数据
              </button>
              <button @click="$router.push('/help')" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-medium rounded-md hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                  </path>
                </svg>
                帮助信息
              </button>
              <button @click="$router.push('/contact')" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium rounded-md hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                  </path>
                </svg>
                问题反馈&交流
              </button>
              <button @click="$router.push('/submit')" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-600 text-white text-sm font-medium rounded-md hover:from-orange-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                投稿
              </button>
            </div>
            <span class="text-gray-500 text-sm">最后更新: <span>{{ lastUpdate }}</span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg shadow-md border border-rose-100 p-6 text-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
        <div class="py-3">
          <h5 class="text-rose-600 text-sm font-medium">已爬取总数</h5>
          <h3 class="text-2xl font-bold text-rose-800 transition-all duration-500 hover:text-rose-600">
            {{ stats.app_count.total || 0 }}
          </h3>
        </div>
      </div>
      <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-md border border-orange-100 p-6 text-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
        <div class="py-3">
          <h5 class="text-amber-600 text-sm font-medium">应用总数</h5>
          <h3 class="text-2xl font-bold text-amber-800 transition-all duration-500 hover:text-amber-600">
            {{ stats.app_count.apps || 0 }}
          </h3>
        </div>
      </div>
      <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg shadow-md border border-emerald-100 p-6 text-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
        <div class="py-3">
          <h5 class="text-emerald-600 text-sm font-medium">元服务总数</h5>
          <h3 class="text-2xl font-bold text-emerald-800 transition-all duration-500 hover:text-emerald-600">
            {{ stats.app_count.atomic_services || 0 }}
          </h3>
        </div>
      </div>
      <div class="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg shadow-md border border-indigo-100 p-6 text-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
        <div class="py-3">
          <h5 class="text-indigo-600 text-sm font-medium">开发者总数</h5>
          <h3 class="text-2xl font-bold text-indigo-800 transition-all duration-500 hover:text-indigo-600">
            {{ stats.developer_count || 0 }}
          </h3>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-4 transition-all duration-300 hover:shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">下载量排名前20的应用</h3>
          <div class="chart-container" style="height: 300px;">
            <canvas id="topDownloadChart"></canvas>
          </div>
        </div>
      </div>
      <div>
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-4 transition-all duration-300 hover:shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">应用评分分布</h3>
          <div class="chart-container" style="height: 300px;">
            <canvas id="starChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- 非华为应用下载量排名 -->
    <div class="mb-6">
      <div class="bg-white rounded-lg shadow-md border border-gray-200 p-4 transition-all duration-300 hover:shadow-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">非华为应用下载量排名前30</h3>
        <div class="chart-container" style="height: 300px;">
          <canvas id="nonHuaweiDownloadChart"></canvas>
        </div>
      </div>
    </div>

    <!-- 应用列表及搜索功能 -->
    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg shadow-md border border-amber-100 mb-6 transition-all duration-300 hover:shadow-lg">
      <div class="p-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h5 class="text-lg font-semibold text-amber-800 mb-0">应用列表 (施工中, 功能可能出现 bug)</h5>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <button @click="showSearchHelp = true" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-medium rounded-md hover:from-amber-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
              title="搜索帮助">搜索功能帮助</button>
            <input 
              type="text" 
              v-model="searchValue" 
              @keyup.enter="searchApps"
              class="flex-1 min-w-0 px-3 py-2 border border-amber-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-sm bg-amber-50 placeholder-amber-400" 
              placeholder="搜索应用"
            >
            <select 
              v-model="searchKey" 
              class="px-3 py-2 border border-amber-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-sm bg-amber-50 text-amber-700"
            >
              <option value="name" selected>应用名称</option>
              <option value="pkg_name">包名</option>
              <option value="app_id">应用 ID</option>
              <option value="developer_name">开发者名称</option>
              <option value="developer_en_name">开发者英文名称</option>
            </select>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                v-model="searchExact" 
                class="sr-only peer"
              >
              <span class="ml-1 text-sm font-medium text-amber-700">精确匹配</span>
              <div
                class="ml-2 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600">
              </div>
            </label>
            <button 
              @click="searchApps"
              class="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-medium rounded-md hover:from-amber-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              搜索
            </button>
          </div>
        </div>
        
        <!-- 应用表格 -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-amber-200">
            <thead class="bg-gradient-to-r from-amber-100 to-yellow-100">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">序号</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">应用名称</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">开发者</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">分类</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">评分</th>
                <th 
                  @click="sortApps('total_star_rating_count')"
                  class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider cursor-pointer transition-all duration-200 hover:bg-amber-200"
                >
                  评分数量 
                  <span v-if="currentSort.field === 'total_star_rating_count'" class="ml-1 text-amber-500 font-bold">
                    {{ currentSort.desc ? '↓' : '↑' }}
                  </span>
                </th>
                <th 
                  @click="sortApps('download_count')"
                  class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider cursor-pointer transition-all duration-200 hover:bg-amber-200"
                >
                  下载量 
                  <span v-if="currentSort.field === 'download_count'" class="ml-1 text-amber-500 font-bold">
                    {{ currentSort.desc ? '↓' : '↑' }}
                  </span>
                </th>
                <th 
                  @click="sortApps('size_bytes')"
                  class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider cursor-pointer transition-all duration-200 hover:bg-amber-200"
                >
                  大小 
                  <span v-if="currentSort.field === 'size_bytes'" class="ml-1 text-amber-500 font-bold">
                    {{ currentSort.desc ? '↓' : '↑' }}
                  </span>
                </th>
                <th 
                  @click="sortApps('metrics_created_at')"
                  class="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider cursor-pointer transition-all duration-200 hover:bg-amber-200"
                >
                  上次数据更新 
                  <span v-if="currentSort.field === 'metrics_created_at'" class="ml-1 text-amber-500 font-bold">
                    {{ currentSort.desc ? '↓' : '↑' }}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody id="appTableBody" class="bg-gradient-to-r from-amber-50 to-yellow-50 divide-y divide-amber-100">
              <tr v-if="loadingApps">
                <td colspan="9" class="text-center py-12">
                  <div class="inline-block w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </td>
              </tr>
              <tr v-else-if="apps.length === 0">
                <td colspan="9" class="text-center py-8 text-gray-500">没有找到匹配的应用</td>
              </tr>
              <tr v-else v-for="(app, index) in apps" :key="app[0].app_id" class="hover:bg-amber-100/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-700">{{ (currentPage - 1) * PAGE_SIZE + index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img :src="app[0].icon_url" alt="应用图标" class="w-8 h-8 rounded mr-2" @error="handleImageError($event)">
                    <div @click="goToAppDetail(app[0].app_id)" class="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                      {{ app[0].name?.length > 15 ? app[0].name.slice(0, 15) + '...' : app[0].name }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-700">{{ app[0].developer_name || '未知' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-700">{{ app[0].category || '未知' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                  <div class="flex items-center">
                    <span class="star-rating">★</span>
                    <span class="ml-1">{{ app[1].average_star_rating ? app[1].average_star_rating.toFixed(1) : '无' }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-700">{{ formatNumber(app[1].total_star_rating_count || 0) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-700">{{ formatNumber(app[1].download_count || 0) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-700">{{ formatFileSize(app[1].size_bytes || 0) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                  {{ app[1].metrics_created_at ? new Date(app[1].metrics_created_at).toLocaleString() : '未知' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分页 -->
        <nav aria-label="Page navigation" class="mt-6" v-if="totalPages > 1">
          <ul class="flex justify-center space-x-2">
            <li>
              <button 
                @click="changePage(1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-amber-300 rounded-md text-amber-700 hover:bg-amber-100 disabled:opacity-50"
              >
                首页
              </button>
            </li>
            <li>
              <button 
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-amber-300 rounded-md text-amber-700 hover:bg-amber-100 disabled:opacity-50"
              >
                上一页
              </button>
            </li>
            <li v-for="page in visiblePages" :key="page">
              <button 
                @click="changePage(page)"
                :class="currentPage === page ? 'bg-amber-500 text-white' : 'text-amber-700 hover:bg-amber-100'"
                class="px-3 py-1 border border-amber-300 rounded-md"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button 
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border border-amber-300 rounded-md text-amber-700 hover:bg-amber-100 disabled:opacity-50"
              >
                下一页
              </button>
            </li>
            <li>
              <button 
                @click="changePage(totalPages)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border border-amber-300 rounded-md text-amber-700 hover:bg-amber-100 disabled:opacity-50"
              >
                末页
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- 搜索帮助弹窗 -->
    <div v-if="showSearchHelp" class="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full z-50 backdrop-blur-sm transition-opacity duration-300">
      <div class="relative top-8 mx-auto p-5 border border-amber-200 w-11/12 md:w-11/12 lg:w-4/5 xl:w-3/4 shadow-lg rounded-md bg-gradient-to-r from-amber-50 to-yellow-50 max-h-[90vh] overflow-y-auto transition-transform duration-300 transform">
        <div class="mt-3">
          <div class="flex justify-between items-center">
            <h5 class="text-lg font-semibold text-amber-800 bg-gradient-to-r from-amber-200 to-yellow-200 px-4 py-2 rounded-lg shadow-sm">
              搜索功能帮助</h5>
            <button type="button" @click="showSearchHelp = false" class="text-amber-400 hover:text-amber-600 transition-all duration-300 transform hover:rotate-180">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="my-4 space-y-6">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow-sm border border-blue-100">
              <h6 class="text-md font-semibold text-blue-800 mb-2">🔍 搜索类别说明</h6>
              <ul class="text-blue-700 text-sm space-y-2">
                <li><strong>应用名称</strong> (name): 搜索应用的显示名称，如 "微信"。</li>
                <li><strong>包名</strong> (pkg_name): 搜索应用的唯一包标识符，如 "com.tencent.mm"。</li>
                <li><strong>应用 ID</strong> (app_id): 搜索华为应用市场的应用唯一 ID。</li>
                <li><strong>开发者名称</strong> (developer_name): 搜索中文开发者名称。</li>
                <li><strong>开发者英文名称</strong> (developer_en_name): 搜索英文开发者名称。</li>
              </ul>
            </div>
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg shadow-sm border border-green-100">
              <h6 class="text-md font-semibold text-emerald-800 mb-2">⚡ 精确匹配开关</h6>
              <p class="text-emerald-700 text-sm">
                <strong>开启 (勾选)</strong>: 进行精确匹配，只返回完全匹配关键词的结果。<br>
                <strong>关闭 (未勾选)</strong>: 进行模糊搜索，支持部分匹配，提高搜索灵活性。<br> 默认关闭（模糊搜索）。
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-end pt-2">
          <button @click="showSearchHelp = false" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-base font-medium rounded-md shadow-sm hover:from-amber-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Chart from 'chart.js/auto';
import { formatNumber } from '../utils';

// 定义统计数据类型
interface Stats {
    app_count: {
      total: number;
      apps: number;
      atomic_services: number;
    };
    developer_count: number
}

// 定义应用数据类型
interface AppItem {
  [0]: {
    name: string;
    icon_url: string;
    app_id: string;
    developer_name?: string;
    category?: string;
  };
  [1]: {
    download_count: number;
    average_star_rating?: number;
    total_star_rating_count?: number;
    size_bytes?: number;
    metrics_created_at?: string;
  }
}

// 分页配置
const PAGE_SIZE = 10;

// 状态定义
const stats = ref<Stats>({
  app_count: {
    total: 0,
    apps: 0,
    atomic_services: 0,
  },
  developer_count: 0
});
const lastUpdate = ref<string>('');
const router = useRouter();
const preloadedImages = ref<{[key: string]: HTMLImageElement}>({});
const API_BASE = '/api';

// 搜索相关状态
const searchValue = ref('');
const searchKey = ref('name');
const searchExact = ref(false);
const showSearchHelp = ref(false);

// 应用列表相关状态
const apps = ref<AppItem[]>([]);
const loadingApps = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);
const currentSort = ref({
  field: 'download_count',
  desc: true
});

// 刷新数据
const refreshData = async () => {
  try {
    // 重置应用列表状态
    currentPage.value = 1;
    totalPages.value = 1;
    
    // 加载概览和图表
    await loadOverview();
    await loadCharts();
    
    // 加载应用列表
    await loadApps();
    
    // 更新时间
    updateLastUpdate();
  } catch (error) {
    console.error('刷新数据失败:', error);
  }
};

// 加载概览统计
const loadOverview = async () => {
  try {
    const response = await fetch(`${API_BASE}/market_info`);
    const data = await response.json();
    if (data.success) {
      stats.value = data.data;
    }
  } catch (error) {
    console.error('加载概览统计失败:', error);
  }
};

// 更新最后更新时间
const updateLastUpdate = () => {
  lastUpdate.value = new Date().toLocaleString('zh-CN');
};

// 预加载应用图标
const preloadAppImages = async (apps: AppItem[]) => {
  const images: {[key: string]: HTMLImageElement} = {};
  const loadPromises = apps.map((app) => {
    return new Promise<void>((resolve) => {
      const appId = app[0].app_id;
      const iconUrl = app[0].icon_url;
      
      if (!iconUrl) {
        images[appId] = null as unknown as HTMLImageElement;
        resolve();
        return;
      }

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        images[appId] = img;
        resolve();
      };
      img.onerror = () => {
        images[appId] = null as unknown as HTMLImageElement;
        resolve();
      };
      img.src = iconUrl;
    });
  });

  await Promise.all(loadPromises);
  return images;
};

// 加载图表
const loadCharts = async () => {
  try {
    // 下载量排名图表
    const topDownloads = await fetch(`${API_BASE}/rankings/top-downloads?limit=20`);
    const topData = await topDownloads.json();
    if (topData.success) {
      const images = await preloadAppImages(topData.data as AppItem[]);
      preloadedImages.value = {...preloadedImages.value, ...images};
      renderTopDownloadChart(topData.data as AppItem[]);
    }

    // 星级分布图表
    const starDistribution = await fetch(`${API_BASE}/charts/star-distribution`);
    const starData = await starDistribution.json();
    if (starData.success) {
      renderStarChart(starData.data);
    }

    // 非华为应用图表
    const nonHuawei = await fetch(`${API_BASE}/rankings/top-downloads?limit=30&exclude_pattern=huawei`);
    const nonHuaweiData = await nonHuawei.json();
    if (nonHuaweiData.success) {
      const images = await preloadAppImages(nonHuaweiData.data as AppItem[]);
      preloadedImages.value = {...preloadedImages.value, ...images};
      renderNonHuaweiChart(nonHuaweiData.data as AppItem[]);
    }
  } catch (error) {
    console.error('加载图表失败:', error);
  }
};

// 渲染下载量排名图表（带图标）
const renderTopDownloadChart = (data: AppItem[]) => {
  const ctx = document.getElementById('topDownloadChart') as HTMLCanvasElement;
  
  // 图标绘制插件
  const iconPlugin = {
    id: 'iconPlugin',
    afterDatasetsDraw: (chart: any) => {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      
      meta.data.forEach((bar: any, index: number) => {
          const app = data[index];
          if (!app) return;
        const img = preloadedImages.value[app[0].app_id];
        if (!img) return;

        // 计算图标的位置（在柱子顶部）
        const x = bar.x;
        const y = bar.y - 17;
        
        // 绘制图标
        ctx.drawImage(img, x - 10, y - 20, 20, 20);
      });
    }
  };

  // 点击事件插件
  const clickPlugin = {
    id: 'clickPlugin',
    afterEvent: (chart: any, args: any) => {
      const { event } = args;
      if (event.type === 'click') {
        const elements = chart.getElementsAtEventForMode(
          event,
          'nearest', 
          { intersect: true },
          false
        );

        if (elements.length > 0) {
          const elementIndex = elements[0].index;
          const app = data[elementIndex];
          if (app && app[0].app_id) {
            router.push(`/app/${app[0].app_id}`);
          }
        }
      }
    }
  };

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item[0].name?.length > 10 ? item[0].name.slice(0, 10) + '...' : item[0].name),
      datasets: [{
        label: '下载量',
        data: data.map(item => item[1].download_count || 0),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
                callback: (value: number | string) => {
                  if (typeof value === 'number') {
                      return formatNumber(value);
                  } else {
                      return value;
                  }
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: any) => `下载量: ${formatNumber(context.raw)}`
          }
        }
      }
    },
    plugins: [iconPlugin, clickPlugin]
  });
};

// 渲染星级分布图表
const renderStarChart = (data: any) => {
  const ctx = document.getElementById('starChart') as HTMLCanvasElement;
  const starValues = [
    data.star_1 || 0,
    data.star_2 || 0,
    data.star_3 || 0,
    data.star_4 || 0,
    data.star_5 || 0
  ];

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [
        `无评分 (${starValues[0]})`,
        `[1-2)星 (${starValues[1]})`,
        `[2-3)星 (${starValues[2]})`,
        `[3-4)星 (${starValues[3]})`,
        `[4-5]星 (${starValues[4]})`
      ],
      datasets: [{
        data: starValues,
        backgroundColor: [
          '#ef4444', '#f97316', '#eab308', '#22c55e', '#0ea5e9'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
};

// 渲染非华为应用图表（带图标）
const renderNonHuaweiChart = (data: AppItem[]) => {
  const ctx = document.getElementById('nonHuaweiDownloadChart') as HTMLCanvasElement;
  
  // 图标绘制插件
  const iconPlugin = {
    id: 'iconPlugin',
    afterDatasetsDraw: (chart: any) => {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      
      meta.data.forEach((bar: any, index: number) => {
          const app = data[index];
          if (!app) return;
        const img = preloadedImages.value[app[0].app_id];
        if (!img) return;

        // 计算图标的位置（在柱子顶部）
        const x = bar.x;
        const y = bar.y - 17;
        
        // 绘制图标
        ctx.drawImage(img, x - 10, y - 20, 20, 20);
      });
    }
  };

  // 点击事件插件
  const clickPlugin = {
    id: 'clickPlugin',
    afterEvent: (chart: any, args: any) => {
      const { event } = args;
      if (event.type === 'click') {
        const elements = chart.getElementsAtEventForMode(
          event,
          'nearest', 
          { intersect: true },
          false
        );

        if (elements.length > 0) {
          const elementIndex = elements[0].index;
          const app = data[elementIndex];
          if (app && app[0].app_id) {
            router.push(`/app/${app[0].app_id}`);
          }
        }
      }
    }
  };

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item[0].name?.length > 10 ? item[0].name.slice(0, 10) + '...' : item[0].name),
      datasets: [{
        label: '下载量',
        data: data.map(item => item[1].download_count || 0),
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
                callback: (value: number | string) => {
                if (typeof value === 'number') {
                      return formatNumber(value)
                } else {
                      return value;
                }
            }
          }
        }
      }
    },
    plugins: [iconPlugin, clickPlugin]
  });
};

// 加载应用列表
const loadApps = async () => {
  loadingApps.value = true;
  try {
    // 构建API请求URL
    let url = `${API_BASE}/apps/list/${currentPage.value}?sort=${currentSort.value.field}&desc=${currentSort.value.desc}&page_size=${PAGE_SIZE}`;
    if (searchValue.value) {
      url += `&search_key=${encodeURIComponent(searchKey.value)}&search_value=${encodeURIComponent(searchValue.value)}&search_exact=${searchExact.value}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    // 更新分页信息
    if (data.data && data.data.total_count) {
      totalPages.value = Math.ceil(data.data.total_count / PAGE_SIZE);
    }

    apps.value = data.data.data || [];
  } catch (error) {
    console.error('加载应用列表失败:', error);
    apps.value = [];
  } finally {
    loadingApps.value = false;
  }
};

// 搜索应用
const searchApps = () => {
  currentPage.value = 1; // 重置到第一页
  loadApps();
};

// 排序应用
const sortApps = (field: string) => {
  // 如果点击的是当前排序字段，则切换排序方向
  if (currentSort.value.field === field) {
    currentSort.value.desc = !currentSort.value.desc;
  } else {
    // 否则设置新的排序字段，默认降序
    currentSort.value = { field, desc: true };
  }
  currentPage.value = 1; // 重置到第一页
  loadApps();
};

// 切换页码
const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  loadApps();
};

// 计算可见页码（用于分页控件）
const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5; // 最多显示5个页码

  // 总页数小于等于最大可见数，直接显示所有页码
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
    return pages;
  }

  // 总页数大于最大可见数，计算显示范围
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  // 调整结束页码不超过总页数
  if (end > totalPages.value) {
    end = totalPages.value;
    start = end - maxVisible + 1;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// 处理图片加载错误
const handleImageError = (event: Event) => {
  (event.target as HTMLImageElement).src = '/images/default-app-icon.png'; // 替换为默认图标
};

// 跳转到应用详情页
const goToAppDetail = (appId: string) => {
  router.push(`/app/${appId}`);
};

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 页面加载时初始化
onMounted(() => {
  refreshData();
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

.star-rating {
  color: #ffcc00;
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
}

.app-icon {
  width: 32px;
  height: 32px;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>