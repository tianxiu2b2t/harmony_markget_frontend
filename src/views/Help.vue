<template>
    <div class="px-4 py-6 max-w-4xl mx-auto">
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
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg shadow-md border border-blue-100 dark:border-blue-900 p-6 mb-8">
            <h1 class="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">帮助信息</h1>
            <p class="text-gray-600 dark:text-gray-400">华为应用市场看板使用指南与常见问题解答</p>
        </div>

        <!-- 帮助内容 -->
        <div class="space-y-8">
            <!-- 关于本项目 -->
            <section class="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-6">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    关于本项目
                </h2>
                <div class="pl-7">
                    <p class="mb-3 text-gray-700 dark:text-gray-300">华为应用市场看板是一个数据统计与分析工具，通过收集华为应用市场的公开数据，为开发者和用户提供应用相关的统计信息。</p>
                    <p class="text-gray-700 dark:text-gray-300">数据来源：华为应用市场公开API，本工具不保证数据的准确性、完整性和真实性，仅供参考。</p>
                </div>
            </section>

            <!-- 功能说明 -->
            <section class="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-6">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    主要功能
                </h2>
                <div class="pl-7 space-y-4">
                    <div>
                        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-1">数据统计</h3>
                        <p class="text-gray-600 dark:text-gray-400">展示应用总数、元服务总数、开发者总数等关键指标的统计数据。</p>
                    </div>
                    <div>
                        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-1">排行榜</h3>
                        <p class="text-gray-600 dark:text-gray-400">提供下载量排名前20的应用列表，以及排除华为系应用后的下载量排名。</p>
                    </div>
                    <div>
                        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-1">应用详情</h3>
                        <p class="text-gray-600 dark:text-gray-400">查看应用的详细信息，包括下载量、评分、支持设备、版本信息等。</p>
                    </div>
                    <div>
                        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-1">趋势分析</h3>
                        <p class="text-gray-600 dark:text-gray-400">展示应用下载量的变化趋势和增量趋势图表。</p>
                    </div>
                    <div>
                        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-1">应用查询</h3>
                        <p class="text-gray-600 dark:text-gray-400">通过包名或App ID查询应用信息并提交到数据库。</p>
                    </div>
                </div>
            </section>

            <!-- 常见问题 -->
            <section class="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-6">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    常见问题
                </h2>
                <div class="pl-7 space-y-4">
                    <div>
                        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-1">数据多久更新一次？</h3>
                        <p class="text-gray-600 dark:text-gray-400">系统会定期更新数据，通常每24小时更新一次。您也可以点击"刷新数据"按钮手动触发更新。</p>
                    </div>
                    <div>
                        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-1">为什么某些应用没有数据？</h3>
                        <p class="text-gray-600 dark:text-gray-400">可能是因为该应用未被收录，或者华为应用市场未提供该应用的公开数据。您可以通过"投稿"功能提交应用信息。</p>
                    </div>
                    <div>
                        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-1">如何查询特定应用？</h3>
                        <p class="text-gray-600 dark:text-gray-400">点击"投稿"按钮，输入应用的包名（Package Name）或App ID即可查询并提交应用信息。</p>
                    </div>
                    <div>
                        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-1">数据来源是什么？</h3>
                        <p class="text-gray-600 dark:text-gray-400">数据来源于华为应用市场的公开API，本工具仅做数据展示和分析，不修改原始数据。</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script