<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import ListPlace from '@/components/place.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/archived/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  
  <RouterView />
</template>

<style scoped>

</style>
