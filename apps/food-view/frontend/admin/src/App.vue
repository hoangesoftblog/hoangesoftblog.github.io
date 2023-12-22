<script setup lang="ts">
import Sidebar from "@/views/Sidebar.vue";
// import PlaceManagementSection from "@/components/place.vue";
// import DashboardSection from "@/components/dashboard.vue";
// import UserManagementSection from "./components/UserManagementSection.vue";
// import ReviewManagementSection from "./components/ReviewManagementSection.vue";

// import { RouterView } from 'vue-router';

// const eventName = "showSection";

// export default {
//   // data() {
//   //   return {
//   //     currentSection: "dashboard",
//   //   };
//   // },
//   // methods: {
//   //   showSection(section: string) {
//   //     this.currentSection = section;
//   //   },
//   // },
//   components: {
//     Sidebar,
//     // PlaceManagementSection,
//     // DashboardSection,

//     // UserManagementSection,
//     // ReviewManagementSection,
//   },
// };
</script>

<template>
  <!-- Sidebar -->
  <Sidebar />
  <!-- Content -->
  <div id="content">
    <RouterView />    
    <!-- <DashboardSection v-if="currentSection === 'dashboard'" /> -->
    <!-- <PlaceManagementSection v-if="currentSection === 'places'" /> -->
    <!-- <UserManagementSection v-if="currentSection === 'users'" /> -->
    <!-- <ReviewManagementSection v-if="currentSection === 'reviews'" /> -->
    
  </div>
</template>


<style>
/* Styles go here */
</style>

