<template>
    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow-md border border-blue-100" style="height: 100%">
        <div class="p-4 border-b border-blue-100">
            <h5 class="text-lg font-semibold text-blue-800 mb-0">总下载榜</h5>
        </div>
        <div class="overflow-x-auto">
            <div class="p-2 chart-container" style="height: 292px;">
                <!-- <canvas id="top_download_chart" width="1384" height="284" style="display: block; box-sizing: border-box; height: 284px; width: 1384px;"></canvas> -->
               <v-chart :option="chartOptions" autoresize ref="chartRef"/>
            </div>
        </div>
    </div>    
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import {
    CanvasRenderer
} from 'echarts/renderers'
import {
    BarChart
} from 'echarts/charts'
import {
    GridComponent,
    LegendComponent
} from 'echarts/components'
import type { TopDownloadApp } from '../types'
import { useRouter } from 'vue-router'
import { formatNumber } from '../utils'


use([
    CanvasRenderer,
    BarChart,
    LegendComponent,
    GridComponent
])

const router = useRouter();

const chartOptions = ref({})
const chartRef = ref()
const props = defineProps({
    value: {
        type: Array as () => TopDownloadApp[],
        default: () => []
    }
})

watch(() => props.value, (newVal) => {
    const val = newVal.sort((a, b) => b[1].download_count - a[1].download_count)
    const xAxisData = val.map(item => item[0].name)
    const min = Math.min(...val.map(item => item[1].download_count))

    chartOptions.value = {
        xAxis: {
            data: xAxisData,
            axisLabel: {
                rotate: 22.5
            }
        },
        grid: {
            left: '3%',
            right: '2%',
            top: '5%',
            bottom: '3%',
        },
        yAxis: {
            min: Math.max(min * 0.95, 0)
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
                    formatter: (params: any) => `{icon${params.dataIndex}|}\n{value${params.dataIndex}|${formatNumber(params.value)}}`,
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
    // let e = chartRef.value?.dispatchAction();
    console.log(chartRef.value?.chart.on("click", (params: any) => {
        router.push(`/app/${params.data.app_id}`)
    }))
})
</script>
