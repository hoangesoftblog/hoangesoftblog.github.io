<script lang="ts">
import { RouterLink } from 'vue-router';

const eventName = "section";

export default {
    methods: {
        showSection(section: string) {
            this.$emit(eventName, section);
        },
    },
    emits: [eventName]
};
</script>

<template>
    <div>
        <RouterLink to="/"><button class="sidebar-item" @click="showSection('dashboard')">Dashboard</button></RouterLink>
        <RouterLink to="/places"><button class="sidebar-item" @click="showSection('places')">Places</button></RouterLink>
        <RouterLink to="/"><button class="sidebar-item" @click="showSection('users')">Users</button></RouterLink>
        <RouterLink to="/"><button class="sidebar-item" @click="showSection('reviews')">Reviews</button></RouterLink>
    </div>
</template>
  
<style>
/* Styles go here */
</style>