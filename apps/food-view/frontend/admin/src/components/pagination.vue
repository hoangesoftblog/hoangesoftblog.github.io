<template>
    <div class="pagination">
        <button @click="changePage(-1)" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="changePage(1)" :disabled="!hasNext">Next</button>
    </div>
</template>
  
<script lang="ts">
export default {
    props: {
        currentPage: Number,
        totalPages: Number,
        hasNext: Boolean,
    },
    methods: {
        changePage(value: number) {
            this.$emit("update-page", this.currentPage + value);
        },
    },
};
</script>
  
<style>
/* Styles go here */
</style>
  