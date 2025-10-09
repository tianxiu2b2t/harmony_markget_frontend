<script setup lang="ts">
import { ref } from 'vue';
import Panel from './components/Panel.vue';

const lastUpdated = ref('2023-12-01 00:00:00');

</script>

<template>
    <Panel>
		<h2>华为应用市场看板 数据收集自 appgallery api 不保证来源的准确性、完整性和真实性 仅供参考</h2>
		<span class="lastUpdated">最后更新: {{ lastUpdated }}</span>
	</Panel>
</template>

<style>
.dashboard-control {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.lastUpdated {
	color: #DDD;
}
</style>
