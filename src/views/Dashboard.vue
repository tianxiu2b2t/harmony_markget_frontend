<template>
    <div class="mb-6">
        <div class="
                bg-gradient-to-r 
                dark:bg-gradient-to-r 
                from-blue-50 
                dark:from-blue-950 
                to-indigo-50 
                dark:to-indigo-950 
                rounded-lg 
                shadow-md 
                border 
                border-blue-100 
                dark:border-blue-900 
                transition-all 
                duration-300 
                hover:shadow-lg
            ">
            <div class="px-5 py-4">
                <h1 class="
                    text-2xl 
                    font-semibold 
                    text-indigo-900 
                    dark:text-indigo-100 
                    mb-3 
                    animate-pulse
                ">
                    华为应用市场看板 数据收集自 appgallery api 不保证来源的准确性、完整性和真实性 仅供参考
                </h1>
                <div class="flex flex-col sm:flex-row justify-start sm:justify-between items-center gap-4">
                    <div class="flex flex-wrap justify-start items-center gap-1 sm:gap-3 w-full sm:w-auto">
                        <button @click="refreshData" class="inline-flex items-center px-4 py-2 bg-gradient-to-r dark:bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-md hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                </path>
                            </svg>
                            刷新数据
                        </button>
                        <button @click="goHelp" class="inline-flex items-center px-4 py-2 bg-gradient-to-r dark:bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-medium rounded-md hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg>
                            帮助信息
                        </button>
                        <button class="inline-flex items-center px-4 py-2 bg-gradient-to-r dark:bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium rounded-md hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                        @click="goContact">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                </path>
                            </svg>
                            问题反馈&amp;交流
                        </button>
                        <button @click="goSubmit" class="inline-flex items-center px-4 py-2 bg-gradient-to-r dark:bg-gradient-to-r from-orange-500 to-yellow-600 text-white text-sm font-medium rounded-md hover:from-orange-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                            投稿
                        </button>
                        <button @click="changeDark" class="inline-flex items-center px-4 py-2 bg-gradient-to-r dark:bg-gradient-to-r from-gray-500 to-gray-400 text-white text-sm font-medium rounded-md hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <!-- 太阳图标（亮色模式） -->
                                <path class="dark:hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                <!-- 月亮图标（暗色模式） -->
                                <path class="hidden dark:block" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                            </svg>
                            切换主题
                        </button>
                    </div>
                    <span class="text-gray-500 dark:text-gray-300 text-sm">最后获取数据时间: {{ lastUpdated }}</span>
                </div>
            </div>
        </div>
    </div>

    <AppCountInfo :value="marketInfo"/>
    <div class="grid grid-cols-1 gap-4 mb-4" style="min-height: 384px" :class="{'lg:grid-cols-3': isLargeScreen}">
        <div>
            <AppTotalStarChart :value="stars"/>
        </div>
        <div>
            <AppSdkPie title="应用目标 sdk 分布" :value="targetSdk"/>
        </div>
        <div>
            <AppSdkPie title="应用最小 sdk 分布" :value="minSdk"/>
        </div>
    </div>
    <div class="mb-6">
        <AppDownloadChart
            title="总下载榜"
            :value="topDownload"
            bgFrom="from-blue-50"
            bgTo="to-cyan-50"
            borderColor="border-blue-100"
            titleColor="text-blue-800"
            darkBgFrom="from-blue-950"
            darkBgTo="to-cyan-950"
            darkBorderColor="border-blue-900"
            darkTitleColor="text-blue-200"
            containerHeight="100%"
            :yAxisMin="true"
        />
    </div>
    <div class="mb-6">
        <AppDownloadChart
          title="非华为应用/内置应用下载榜"
          :value="topDownloadOutHuawei"
          bgFrom="from-teal-50"
          bgTo="to-emerald-50"
          borderColor="border-teal-100"
          titleColor="text-teal-800"
          containerHeight="354px"
          darkBgFrom="from-teal-950"
          darkBgTo="to-emerald-950"
          darkBorderColor="border-teal-900"
          darkTitleColor="text-teal-200"
          :yAxisMin="true"
        />
    </div>


    <AppSearchList :total_apps="marketInfo.app_count.total"/>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { fetchMinSdkPie, fetchTargetSdkPie, markgetInfo, starCharts, topDownloadHuawei, topDownloadWithoutHuawei } from '../api';
import { type TopDownloadApp, type MarkgetInfo, type StarCharts, type SdkPie } from '../types';
import { responseTimestamp } from '../constants';
import AppCountInfo from '../components/AppCountInfo.vue';
import AppDownloadChart from '../components/AppDownloadChart.vue';
import AppTotalStarChart from '../components/AppTotalStarChart.vue';
import AppSearchList from '../components/AppSearchList.vue';
import { useRouter } from 'vue-router';
import AppSdkPie from '../components/AppSdkPie.vue';

const lastUpdated = ref<string>('');
const router = useRouter();

const marketInfo = ref<MarkgetInfo>({
    app_count: {
        apps: 0,
        atomic_services: 0,
        total: 0
    },
    developer_count: 0
});
const topDownload = ref<TopDownloadApp[]>([]);
const topDownloadOutHuawei = ref<TopDownloadApp[]>([]);
const minSdk = ref<SdkPie[]>([]);
const targetSdk = ref<SdkPie[]>([]);
const stars = ref<StarCharts>({
    star_1: 0,
    star_2: 0,
    star_3: 0,
    star_4: 0,
    star_5: 0
});
const isLargeScreen = ref(window.innerWidth >= 1520);

async function refreshMarketInfo() {
    marketInfo.value = await markgetInfo();
}
async function refreshTopDownloadApp() {
    topDownload.value = await topDownloadHuawei();
    topDownloadOutHuawei.value = await topDownloadWithoutHuawei();
}
async function refreshStarCharts() {
    stars.value = await starCharts();
}
async function refreshSdkPie() {
    await Promise.all([minSdk.value, targetSdk.value] = await Promise.all([fetchMinSdkPie(), fetchTargetSdkPie()]));
}
function goContact() {
    router.push('/contact')
}
function goHelp() {
    router.push('/help')
}
function goSubmit() {
    router.push('/submit')
}
function changeDark() {
    document.documentElement.classList.toggle("dark")
}
watch(responseTimestamp, (newValue) => {
    lastUpdated.value = newValue?.toLocaleString() || '';
})
function refreshData() {
    refreshMarketInfo();
    refreshTopDownloadApp();
    refreshStarCharts();
    refreshSdkPie();
}
onMounted(() => {
    refreshData();
    const handleResize = () => {
        console.log(window.innerWidth)
        isLargeScreen.value = window.innerWidth >= 1520;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
})
</script>