import { createRouter, createWebHistory } from 'vue-router';

// layout
import Layout from '../layouts/Layout.vue';

// pages
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: Dashboard }
    ],
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
