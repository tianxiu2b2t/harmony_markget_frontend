<template>
    <div class="px-4 py-6 max-w-2xl mx-auto">
        <!-- 头部导航 -->
        <div class="mb-6">
            <button @click="$router.push('/dashboard')" class="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 mb-4">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                返回仪表板
            </button>
        </div>

        <!-- 页面标题 -->
        <div class="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 rounded-lg shadow-md border border-orange-100 dark:border-orange-900 p-6 mb-8">
            <h1 class="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-2">应用投稿</h1>
            <p class="text-gray-600 dark:text-gray-400">提交应用信息到数据库，帮助我们完善应用市场看板</p>
        </div>

        <!-- 投稿表单 -->
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-6 mb-6">
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- 链接解析 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">华为应用市场链接 (可选)</label>
                    <div class="flex gap-2">
                        <input
                            type="url"
                            v-model="link"
                            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="例如: https://appgallery.huawei.com/app/detail?id=com.example.app"
                        >
                        <button
                            type="button"
                            @click="parseLink"
                            class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            解析
                        </button>
                    </div>
                    <p v-if="linkError" class="mt-1 text-sm text-red-600">{{ linkError }}</p>
                </div>

                <!-- 包名输入 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        应用包名 (Package Name)
                        <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        v-model="pkgName"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="例如: com.example.app"
                    >
                    <p v-if="pkgError" class="mt-1 text-sm text-red-600">{{ pkgError }}</p>
                </div>

                <!-- App ID 输入 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        App ID (可选，包名优先)
                    </label>
                    <input
                        type="text"
                        v-model="appId"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="例如: C100000000"
                    >
                    <p v-if="appIdError" class="mt-1 text-sm text-red-600">{{ appIdError }}</p>
                </div>

                <!-- 用户名 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        您的昵称 (可选)
                    </label>
                    <input
                        type="text"
                        v-model="username"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="方便我们联系您（可选）"
                    >
                </div>

                <!-- 备注信息 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        备注信息 (可选)
                    </label>
                    <textarea
                        v-model="remark"
                        rows="3"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="可以填写应用的特殊信息或您的建议"
                    ></textarea>
                </div>

                <!-- 提交按钮 -->
                <div>
                    <button
                        type="submit"
                        :disabled="loading"
                        class="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-600 text-white text-sm font-medium rounded-md hover:from-orange-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                    >
                        <span v-if="loading" class="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        {{ loading ? '提交中...' : '提交应用' }}
                    </button>
                </div>
            </form>
        </div>

        <!-- 结果展示 -->
        <div v-if="showResult" class="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">查询结果</h3>
            <div v-if="result.error" class="text-red-500 mb-4">{{ result.error }}</div>

            <div v-else-if="result.data" class="space-y-4">
                <div class="flex items-center space-x-3">
                    <img 
                        :src="result.data.info.icon_url || '/img/default-app-icon.png'" 
                        alt="应用图标" 
                        class="w-12 h-12 rounded-md object-cover"
                    >
                    <div>
                        <h4 class="font-semibold text-gray-900 dark:text-gray-100">{{ result.data.info.name }}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">包名: {{ result.data.info.pkg_name }}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            评分: {{ result.data.rating?.average_rating || 'N/A' }} 
                            ({{ result.data.rating?.total_ratings || 0 }} 人评价)
                        </p>
                        <div class="flex flex-wrap gap-1 mt-1">
                            <span v-if="result.data.new_app" class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs">是新APP！</span>
                            <span v-if="result.data.new_info" class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs">基本信息有更新</span>
                            <span v-if="result.data.new_metric" class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs">指标数据有更新</span>
                            <span v-if="result.data.new_rating" class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs">评分有更新</span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div><strong>下载量:</strong> {{ formatDownloadCount(result.data.metric.download_count || 0) }}</div>
                    <div v-if="result.data.metric.size_bytes"><strong>大小:</strong> {{ formatSize(result.data.metric.size_bytes) }}                    </div>
                    <div v-if="result.data.metric.version"><strong>版本:</strong> {{ result.data.metric.version }}</div>
                    <div v-if="result.data.metric.price"><strong>价格:</strong> {{ result.data.metric.price }}</div>
                    <div v-if="result.data.info.developer_name"><strong>开发者:</strong> {{ result.data.info.developer_name }}</div>
                    <div v-if="result.data.info.kind_name"><strong>分类:</strong> {{ result.data.info.kind_name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { formatSize } from '../utils';

const link = ref('');
const pkgName = ref('');
const appId = ref('');
const username = ref('');
const remark = ref('');
const loading = ref(false);
const showResult = ref(false);
const result = ref<any>({});

const linkError = ref('');
const pkgError = ref('');
const appIdError = ref('');

onMounted(() => {
    const savedUsername = localStorage.getItem('submitUsername');
    if (savedUsername) {
        username.value = savedUsername;
    }
});

const parseLink = () => {
    linkError.value = '';
    const inputLink = link.value.trim();
    if (!inputLink) return;

    const regex = /(?<=id=)[\w\.]+/;
    const match = inputLink.match(regex);
    if (match) {
        pkgName.value = match[0];
    } else {
        linkError.value = '无法从链接中提取包名，请检查链接格式';
    }
};

const validateInputs = (): boolean => {
    let isValid = true;
    pkgError.value = '';
    appIdError.value = '';

    if (!pkgName.value.trim() && !appId.value.trim()) {
        pkgError.value = '包名或App ID必须填写其中一个';
        isValid = false;
    }

    if (pkgName.value.trim()) {
        const pkgRegex = /^[a-zA-Z0-9_\.]+$/;
        if (!pkgRegex.test(pkgName.value.trim())) {
            pkgError.value = '包名格式不正确';
            isValid = false;
        }
    }

    return isValid;
};

const formatDownloadCount = (count: number): string => {
    if (count > 10000) {
        return (count / 10000).toFixed(1) + '万';
    }
    return count.toString();
};

const handleSubmit = async () => {
    if (!validateInputs()) return;

    try {
        loading.value = true;
        showResult.value = false;

        const submitData: any = {};
        if (pkgName.value.trim()) {
            submitData.pkg_name = pkgName.value.trim();
        } else if (appId.value.trim()) {
            submitData.app_id = appId.value.trim().startsWith('C') 
                ? appId.value.trim() 
                : 'C' + appId.value.trim();
        }

        if (username.value.trim() || remark.value.trim()) {
            submitData.comment = {};
            if (username.value.trim()) {
                submitData.comment.user = username.value.trim();
                localStorage.setItem('submitUsername', username.value.trim());
            }
            if (remark.value.trim()) {
                submitData.comment.comment = remark.value.trim();
            }
        }

        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)
        });

        const data = await response.json();
        result.value = data;
        showResult.value = true;

        if (data.success) {
            remark.value = '';
        }
    } catch (error) {
        console.error('提交失败:', error);
        result.value = { error: '提交失败，请稍后重试' };
        showResult.value = true;
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
input,
textarea {
    transition: border-color 0.2s ease-in-out;
}

input:focus,
textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.dark input,
.dark textarea {
    background-color: #1f2937;
    color: #f3f4f6;
    border-color: #4b5563;
}
</style>
