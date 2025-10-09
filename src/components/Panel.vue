<template>
    <div class="pre-panel" :style="{ '--panel-color': props.panelBackgroundColor}">
        <div class="panel">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps({
    panelBackgroundColor: {
        type: String,
        default: '#303030',
    }
})

onMounted(() => {
    // 把 panelBackgroundColor 
})
</script>

<style>
.pre-panel {
    padding: 1rem;
}
.panel {
    background-color: var(--panel-color);
    padding: 1.5rem;
    border-radius: 1rem;
}
</style>