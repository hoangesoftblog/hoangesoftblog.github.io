<template>
    <div class="inline-block px-2 py-0.5 rounded-full text-slate-100 bg-red-400">
        <slot></slot>
    </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({

});
</script>