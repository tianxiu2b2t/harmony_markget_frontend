<template>
    <div :class="`bg-gradient-to-r ${bgFrom} ${bgTo} dark:${darkBgFrom} dark:${darkBgTo} rounded-lg shadow-md border ${borderColor} dark:${darkBorderColor}`" :style="{ height: containerHeight }">
        <div class="p-4 border-b" :class="`${borderColor} dark:${darkBorderColor}`">
            <h5 class="text-lg font-semibold" :class="`${titleColor} dark:${darkTitleColor}`">{{ title }}</h5>
        </div>
        <div class="overflow-x-auto">
            <div class="p-2 chart-container" style="min-width: 1720px; height: 292px;" :key="`${darkMode}`">
                <VChart ref="chartRef" :option="chartOptions" :theme="darkMode ? 'dark' : 'light'" autoresize/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, LegendComponent } from 'echarts/components'
import type { TopDownloadApp } from '../types'
import { useRouter } from 'vue-router'
import { formatNumber } from '../utils'
import { darkMode } from '../constants'

use([CanvasRenderer, BarChart, LegendComponent, GridComponent])

const router = useRouter()
const chartOptions = ref({})
const chartRef = ref()
const props = defineProps<{
    title: string
    value: TopDownloadApp[]
    bgFrom: string
    bgTo: string
    borderColor: string
    titleColor: string
    darkBgFrom: string
    darkBgTo: string
    darkBorderColor: string
    darkTitleColor: string
    containerHeight?: string
    yAxisMin?: boolean
}>()

watch(() => props.value, (newVal) => {
    const val = newVal.sort((a, b) => b[1].download_count - a[1].download_count)
    const xAxisData = val.map(item => item[0].name)
    const min = Math.min(...val.map(item => item[1].download_count))
    const max = Math.max(...val.map(item => item[1].download_count))
    chartOptions.value = {
        backgroundColor: 'transparent',
        xAxis: {
            data: xAxisData,
            axisLabel: { rotate: 22.5 }
        },
        grid: {
            left: '3%',
            right: '2%',
            top: '5%',
            bottom: '3%',
        },
        yAxis: {
            max: Math.round(max * 1.05),
            ...(props.yAxisMin ? { min: Math.max(Math.round(min * 0.95), 0) } : {})
        },
        series: [
            {
                barWidth: '30px',
                barGap: '24%',
                name: '下载数',
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    formatter: (params: any) =>
                        `{icon${params.dataIndex}|}\n{value${params.dataIndex}|${formatNumber(params.value)}}`,
                    rich: Object.fromEntries(
                        val.map((item, index) => [
                            `icon${index}`,
                            {
                                height: 24,
                                width: 24,
                                backgroundColor: {
                                    image: item[0].icon_url
                                }
                            }
                        ])
                    )
                },
                data: val.map(item => ({
                    value: item[1].download_count,
                    app_id: item[0].app_id
                }))
            }
        ]
    }
})

onMounted(() => {
    chartRef.value?.chart.on("click", (params: any) => {
        router.push(`/app/${params.data.app_id}`)
    })
})
</script>
