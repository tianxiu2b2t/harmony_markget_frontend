<template>
    <section class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg shadow-md border border-amber-100 mb-6 transition-all duration-300 hover:shadow-lg">
        <div class="p-6">
            <!-- 搜索区域 -->
            <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h5 class="text-lg font-semibold text-amber-800">应用列表 (施工中, 功能可能出现 bug)</h5>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                    <input v-model="searchText" type="text" class="flex-1 min-w-0 px-3 py-2 border border-amber-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-sm bg-amber-50 placeholder-amber-400" placeholder="搜索应用" />
                    <select v-model="searchKey" class="px-3 py-2 border border-amber-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-sm bg-amber-50 text-amber-700">
                        <option value="name">应用名称</option>
                        <option value="pkg_name">包名</option>
                        <option value="app_id">应用 ID</option>
                        <option value="developer_name">开发者名称</option>
                        <option value="developer_en_name">开发者英文名称</option>
                        <option value="minsdk">最小 sdk</option>
                        <option value="target_sdk">目标 sdk</option>
                        <option value="supplier">供应商</option>
                        <option value="kind_name">类型名</option>
                        <option value="tag_name">标签名</option>
                        <option value="kind_type_name">应用分类</option>
                    </select>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="exactMatch" class="sr-only peer" />
                        <span class="ml-1 text-sm font-medium text-amber-700">精确匹配</span>
                        <div class="ml-2 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                    <button @click="handleSearch" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-medium rounded-md hover:from-amber-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md">搜索</button>
                </div>
            </header>

            <!-- 表格区域 -->
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-amber-200" style="min-width: 1780px">
                    <thead class="bg-gradient-to-r from-amber-100 to-yellow-100">
                        <tr>
                            <th class="px-4 py-3 w-[60px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider">序号</th>
                            <th class="px-4 py-3 w-[180px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider">应用名称</th>
                            <th class="px-4 py-3 w-[160px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider">开发者</th>
                            <th class="px-4 py-3 w-[140px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider">分类</th>
                            <th class="px-4 py-3 w-[140px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider">评分</th>
                            <th class="px-4 py-3 w-[120px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider cursor-pointer hover:bg-amber-200" @click="sortBy('total_star_rating_count')">
                                评分数量 <span class="ml-1 font-bold text-amber-500">{{ sortKey === 'total_star_rating_count' ? (sortDesc ? '↓' : '↑') : '↕' }}</span>
                            </th>
                            <th class="px-4 py-3 w-[120px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider cursor-pointer hover:bg-amber-200" @click="sortBy('download_count')">
                                下载量 <span class="ml-1 font-bold text-amber-500">{{ sortKey === 'download_count' ? (sortDesc ? '↓' : '↑') : '↕' }}</span>
                            </th>
                            <th class="px-4 py-3 w-[120px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider cursor-pointer hover:bg-amber-200" @click="sortBy('bytes_size')">
                                大小 <span class="ml-1 font-bold text-amber-500">{{ sortKey === 'bytes_size' ? (sortDesc ? '↓' : '↑') : '↕' }}</span>
                            </th>
                            <th class="px-4 py-3 w-[160px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider cursor-pointer hover:bg-amber-200" @click="sortBy('last_update_time')">
                                上次数据更新 <span class="ml-1 font-bold text-amber-500">{{ sortKey === 'last_update_time' ? (sortDesc ? '↓' : '↑') : '↕' }}</span>
                            </th>
                            <th class="px-4 py-3 w-[140px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider cursor-pointer hover:bg-amber-200" @click="sortBy('app_crawl_time')">
                                应用爬取时间 <span class="ml-1 font-bold text-amber-500">{{ sortKey === 'app_crawl_time' ? (sortDesc ? '↓' : '↑') : '↕' }}</span>
                            </th>
                            <th class="px-4 py-3 w-[160px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider cursor-pointer hover:bg-amber-200" @click="sortBy('app_release_time')">
                                应用上架时间 <span class="ml-1 font-bold text-amber-500">{{ sortKey === 'app_release_time' ? (sortDesc ? '↓' : '↑') : '↕' }}</span>
                            </th>
                            <!-- <th class="px-4 py-3 w-[120px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider">大小</th>
                            <th class="px-4 py-3 w-[160px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider">上次数据更新</th>
                            <th class="px-4 py-3 w-[140px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider">应用爬取时间</th>
                            <th class="px-4 py-3 w-[160px] text-left text-xs font-medium text-amber-700 uppercase tracking-wider">应用上架时间</th> -->

                        </tr>
                    </thead>
                    <tbody class="bg-gradient-to-r from-amber-50 to-yellow-50 divide-y divide-amber-100">
                        <tr v-if="loading">
                            <td colspan="11" class="text-center py-6 text-amber-600 text-sm">加载中...</td>
                        </tr>
                        <tr v-else-if="apps.length === 0">
                            <td colspan="11" class="text-center py-6 text-amber-600 text-sm">暂无数据</td>
                        </tr>
                        <tr v-for="(app, index) in apps" :key="app.info.app_id" class="hover:bg-gray-50 cursor-pointer transition-colors" @click="goToAppDetail(app.info.app_id)">
                            <td class="px-4 py-3 text-sm text-gray-900">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
                            <td class="px-4 py-3 flex items-center">
                                <img :src="app.info.icon_url" class="w-6 h-6 mr-2" alt="icon" />
                                <span class="font-medium text-gray-900">{{ app.info.name }}</span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-500">{{ app.info.developer_name || '—' }}</td>
                            <td class="px-4 py-3 text-sm text-blue-800">
                                <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100">{{ app.info.kind_type_name }}-{{ app.info.kind_name }}</span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-900 flex items-center gap-1">
                                <span v-for="i in Math.floor(app.rating?.average_rating || 0)" :key="i">
                                    ★
                                </span>
                                <span v-for="i in 5 - Math.floor(app.rating?.average_rating || 0)" :key="i">
                                    ☆
                                </span>
                                <span> {{ app.rating?.average_rating }}</span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-900">{{ formatNumber(app.rating?.total_star_rating_count || 0) }}</td>
                            <td class="px-4 py-3 text-sm text-gray-900">{{ formatNumber(app.metric.download_count) }}</td>
                            <td class="px-4 py-3 text-sm text-gray-500">{{ formatSize(app.metric.size_bytes || 0) }}</td>
                            <td class="px-4 py-3 text-sm text-gray-500">{{ new Date(app.metric.created_at).toLocaleString() }}</td>
                            <td class="px-4 py-3 text-sm text-gray-500">{{ new Date(app.info.created_at).toLocaleString() }}</td>
                            <td class="px-4 py-3 text-sm text-gray-500">{{ new Date(app.info.listed_at).toLocaleString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 分页区域 -->
            <nav v-if="totalPages > 1" aria-label="Page navigation" class="mt-6">
                <ul class="flex flex-wrap justify-center items-center space-x-2">
                    <!-- 首页 -->
                    <li v-if="currentPage > 1">
                        <button @click="goToPage(1)" class="px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100">首页</button>
                    </li>
                
                    <!-- 上一页 -->
                    <li>
                        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100">上一页</button>
                    </li>
                
                    <!-- 中间页码 -->
                    <li v-for="page in visiblePages" :key="page">
                        <button @click="goToPage(page)" :class="page === currentPage ? 'bg-blue-100 text-blue-800 font-bold' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'" class="px-3 py-2 text-sm rounded-md">{{ page }}</button>
                    </li>
                
                    <!-- 下一页 -->
                    <li>
                        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100">下一页</button>
                    </li>
                
                    <!-- 尾页 -->
                    <li v-if="currentPage < totalPages">
                        <button @click="goToPage(totalPages)" class="px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100">尾页</button>
                    </li>
                
                    <!-- 跳转页 -->
                    <li class="flex items-center space-x-1">
                        <input v-model="jumpPage" type="number" min="1" :max="totalPages" class="px-2 py-2 text-sm border-blue-300 bg-blue-50 text-blue-900 rounded-md w-16 text-center" />
                        <button @click="jumpToPage" class="px-3 py-2 text-sm font-medium rounded-md bg-blue-500 text-white border-blue-500 hover:bg-blue-600">跳转</button>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { defaultAppListParams, type AppListInfo, type AppListParams } from '../types'
import { fetchAppList } from '../api'
import { formatNumber, formatSize } from '../utils'
import { useRouter } from 'vue-router'

// 搜索相关
const searchText = ref('')
const searchKey = ref<AppListParams['search_key']>('name')
const exactMatch = ref(false)

// 排序相关
const sortKey = ref<AppListParams['sort']>('download_count')
const sortDesc = ref<AppListParams['desc']>(true)

// 分页相关
const currentPage = ref(1)
const pageSize = ref(defaultAppListParams.page_size || 20)
const totalCount = ref(0)

// 数据状态
const apps = ref<AppListInfo[]>([])
const loading = ref(false)

const visiblePages = computed(() => {
    const pages: number[] = []
    const total = totalPages.value
    const current = currentPage.value
    const range = 5

    const start = Math.max(1, current - range)
    const end = Math.min(total, current + range)

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }
    return pages
})

const router = useRouter()

const jumpPage = ref<number | null>(null)

function goToAppDetail(appId: string) {
    router.push(`/app/${appId}`)
}

function jumpToPage() {
    if (jumpPage.value && jumpPage.value >= 1 && jumpPage.value <= totalPages.value) {
        goToPage(jumpPage.value)
        jumpPage.value = null
    }
}


// 加载数据
async function loadApps() {
    apps.value = []
    loading.value = true
    const params: AppListParams = {
        page: currentPage.value,
        page_size: pageSize.value,
        sort: sortKey.value,
        desc: sortDesc.value,
        search_key: searchText.value ? searchKey.value : undefined,
        search_value: searchText.value || undefined,
        search_exact: searchText.value ? exactMatch.value : undefined
    }

    try {
        const result = await fetchAppList(params)
        apps.value = result.data
        totalCount.value = result.total_count
    } finally {
        loading.value = false
    }
}

// 排序点击
function sortBy(key: AppListParams['sort']) {
    if (sortKey.value === key) {
        sortDesc.value = !sortDesc.value
    } else {
        sortKey.value = key
        sortDesc.value = true
    }
    currentPage.value = 1
    loadApps()
}

// 搜索点击
function handleSearch() {
    currentPage.value = 1
    loadApps()
}

// 分页跳转
function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        loadApps()
    }
}

// 总页数
const totalPages = computed(() => {
    return Math.max(1, Math.ceil(totalCount.value / pageSize.value))
})

// 初始化加载
onMounted(() => {
    loadApps()
})
</script>
