import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import ReviewDetail from './ReviewDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
  },
  {
    path: '/review/:id',
    name: 'ReviewDetail',
    component: ReviewDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
