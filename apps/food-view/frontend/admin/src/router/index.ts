import { createRouter, createWebHistory } from 'vue-router';
// import PlaceManagementComponent from '@/components/place.vue';
import DashboardComponent from '@/views/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardComponent,
    },
    {
      path: '/places',
      name: 'placeManagement',
      component: () => import('@/views/PlaceManagementSection.vue'),
    }
  ]
})

export default router
