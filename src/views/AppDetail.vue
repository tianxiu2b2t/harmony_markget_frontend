<template>
    <!-- 头部导航 -->
    <div class="mb-6">
      <button @click="$router.push('/dashboard')" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        返回仪表板
      </button>
    </div>
    <div class="mt-3" v-if="appDetailData != null">
        <div class="flex justify-between items-center">
            <h5 id="appDetailTitle" class="text-lg font-semibold text-cyan-900 bg-gradient-to-r from-cyan-200 to-blue-200 px-4 py-2 rounded-lg shadow-sm">应用详情</h5>
        </div>
        <div class="my-4" id="appDetailContent">
            <div class="flex flex-col md:flex-row gap-2">
                <div class="md:w-1/6 text-center md:text-center">
                    <img src="https://appimg-drcn.dbankcdn.com/application/icon144/phone/9062e971ee2f437993c99d598b2abfe8.webp" class="w-24 h-24 app-icon mx-auto item-center" alt="运动健康服务">
                    <p class="mb-1 text-lg">
                        <span v-for="i in Math.floor(appDetailData.rating?.average_rating || 0)" :key="i">
                            ★
                        </span>
                        <span v-for="i in 5 - Math.floor(appDetailData.rating?.average_rating || 0)" :key="i">
                            ☆
                        </span>
                        <span> {{ appDetailData.rating?.average_rating }}</span>
                    </p>
                    <p class="text-gray-500 mb-2">{{ formatNumber((appDetailData.rating?.total_star_rating_count || 0))}} 评分</p>
                    <div class="flex flex-col gap-2">
                        <a :href="`https://appgallery.huawei.com/app/detail?id=${appDetailData.info.pkg_name}`" target="_blank" class="btn-animation mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105">
                            在华为应用市场查看
                        </a>
                        <button @click="copyCurrentUrl()" class="btn-animation px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105">
                            复制当前页面链接并分享
                        </button>
                    </div>
                </div>
                <div class="md:w-5/6">
                    <h4 class="text-2xl font-bold text-gray-900 mb-2">{{ appDetailData.info.name }}</h4>
                    <p class="text-gray-600 mb-4">{{ appDetailData.info.developer_name}}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">{{ appDetailData.info.kind_name}}-{{ appDetailData.info.kind_name }}</span>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">{{ appDetailData.metric.version}} ({{ appDetailData.metric.version_code }})</span>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">目标 api 版本 {{ appDetailData.metric.target_sdk }}</span>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">最小 api 版本 {{ appDetailData.metric.minsdk }}</span>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">编译 api 版本 {{ appDetailData.metric.compile_sdk_version }}</span>
                    </div>
                    <div class="flex flex-wrap -mx-2 mb-2">
                            <p class="w-full md:w-1/2 px-2 py-1"><strong>数据更新时间:</strong> {{ formatDatetime(appDetailData.metric.created_at) }}</p>
                            <p class="w-full md:w-1/2 px-2 py-1"><strong>应用爬取时间:</strong> {{ formatDatetime(appDetailData.info.created_at) }}</p>
                            <p class="w-full md:w-1/2 px-2 py-1"><strong>应用上架时间(可能):</strong> {{ formatDate(appDetailData.info.listed_at) }}</p>
                            <p class="w-full md:w-1/2 px-2 py-1"><strong>应用更新时间:</strong> {{ formatDatetime(appDetailData.metric.release_date)}}</p>
                            <p class="w-full md:w-1/2 px-2 py-1"><strong>下载量:</strong> {{ formatNumber(appDetailData.metric.download_count) }}</p>
                            <p class="w-full md:w-1/2 px-2 py-1"><strong>应用大小:</strong> {{ formatSize(appDetailData.metric.size_bytes) }}</p>
                            <p class="w-full md:w-1/2 px-2 py-1"><strong>App ID:</strong> {{ appDetailData.info.app_id }}</p>
                            <p class="w-full md:w-1/2 px-2 py-1"><strong>Package Name:</strong> {{ appDetailData.info.pkg_name }}</p>
                            <p class="w-full px-2 py-1"><strong>上架终端列表</strong></p>
                            <div class="w-full px-2 py-1 flex flex-wrap gap-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800" v-for="value in mainDevices">
                                    {{ value }}
                                </span>
                            </div>
                            <p class="w-full px-2 py-1 text-gray-500 text-sm">应用上架终端类型与APP Gallery同步，不代表实际情况</p>
                        </div>
                        <hr class="my-4 border-gray-200">
                        <div id="descriptionContainer"><p class="text-gray-700">{{ appDetailData.info.description }}</p></div>
                    </div>
            </div>
            <div class="mt-6">
                <h5 class="text-lg font-semibold text-gray-900 mb-3">下载量变化趋势</h5>
                <div class="chart-container" style="height: 300px;">
                    <canvas id="downloadHistoryChart" width="1318" height="284" style="display: block; box-sizing: border-box; height: 284px; width: 1318px;"></canvas>
                </div>
                <div id="noHistoryMessage" class="text-center py-4 text-gray-500 hidden">暂无历史下载数据</div>
            </div>
            <div class="mt-6">
                <h5 class="text-lg font-semibold text-gray-900 mb-3">下载量增量趋势</h5>
                <div class="chart-container" style="height: 300px;">
                    <canvas id="downloadIncrementChart" width="1318" height="284" style="display: block; box-sizing: border-box; height: 284px; width: 1318px;"></canvas>
                </div>
                <div id="noIncrementMessage" class="text-center py-4 text-gray-500 hidden">暂无历史下载数据</div>
            </div>
        </div>
    </div>
    <div class="mt-3" v-if="appDetailData == null || appMetric == null">
        <!-- loader -->
        <div class="flex justify-center items-center min-h-[300px]">
          <div class="text-center">
            <div class="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-gray-600">加载中...</p>
          </div>
        </div>      
    </div>
</template>

<script setup lang="ts">
import { copy } from 'clipboard';
import { onMounted, ref } from 'vue';
import type { AppDetail, AppDetailMetric } from '../types';
import { fetchAppDetail, fetchAppMetric } from '../api';
import { useRoute, useRouter } from 'vue-router';
import { formatDate, formatDatetime, formatMainDeviceCode, formatNumber, formatSize } from '../utils';
// 接收 router 的 appId
const appId = useRoute().params.appId;
const appDetailData = ref<AppDetail|null>(null);
const appMetric = ref<AppDetailMetric | null>(null);
const mainDevices = ref<string[]>([]);
const router = useRouter();

function copyCurrentUrl() {
    copy(window.location.href);
    // add a success message
    alert('当前链接已复制到剪贴板');
}
onMounted(async () => {
    if (!appId || typeof appId !== 'string') return router.push('/');
    let data = await fetchAppDetail(appId);
    appDetailData.value = data;
    mainDevices.value = data.info.main_device_codes.map((code) => 
        formatMainDeviceCode(code)
    );
    appMetric.value = await fetchAppMetric(data.info.pkg_name);
    console.log(data)
})
</script>