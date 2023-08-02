import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dash'
  },
  {
    path: '/dash/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/dash/resume'
      },
      {
        path: 'resume',
        component: () => import('@/views/ResumePage.vue')
      },
      {
        path: 'events',
        component: () => import('@/views/EventsPage.vue')
      },
      {
        path: 'tasks',
        component: () => import('@/views/TasksPage.vue')
      },
      {
        path: 'notes',
        component: () => import('@/views/NotesPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
