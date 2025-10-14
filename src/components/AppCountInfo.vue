<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg shadow-md border border-rose-100 p-6 text-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
            <div class="py-3">
                <h5 class="text-rose-600 text-sm font-medium">已爬取总数</h5>
                <h3 class="text-2xl font-bold text-rose-800 transition-all duration-500 hover:text-rose-600">{{ prop.value?.app_count.total || 0 }}</h3>
            </div>
        </div>
        <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-md border border-orange-100 p-6 text-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
            <div class="py-3">
                <h5 class="text-amber-600 text-sm font-medium">应用总数</h5>
                <h3 class="text-2xl font-bold text-amber-800 transition-all duration-500 hover:text-amber-600">{{ prop.value?.app_count.apps || 0}}</h3>
            </div>
        </div>
        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg shadow-md border border-emerald-100 p-6 text-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
            <div class="py-3">
                <h5 class="text-emerald-600 text-sm font-medium">元服务总数</h5>
                <h3 class="text-2xl font-bold text-emerald-800 transition-all duration-500 hover:text-emerald-600">{{ prop.value?.app_count.atomic_services || 0}}</h3>
            </div>
        </div>
        <div class="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg shadow-md border border-indigo-100 p-6 text-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
            <div class="py-3">
                <h5 class="text-indigo-600 text-sm font-medium">开发者总数</h5>
                <h3 class="text-2xl font-bold text-indigo-800 transition-all duration-500 hover:text-indigo-600">{{ prop.value?.developer_count || 0}}</h3>
            </div>
        </div>
    </div>    
</template>

<script setup lang="ts">
import type { MarkgetInfo } from '../types';

const prop = defineProps({
    value: {
        type: Object as () => MarkgetInfo,
    }
})
</script>