import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

/** Home 为全局布局壳（导航栏 + 个人中心），子页面在 main-content 内切换 */
const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: '首页' } },
  { path: '/staff', name: 'Staff', component: Home, meta: { title: '员工介绍', page: 'staff' } },
  { path: '/food', name: 'Food', component: Home, meta: { title: '饮品甜品' } },
  { path: '/note-wall', name: 'NoteWall', component: Home, meta: { title: '留言墙' } },
  { path: '/emoji-wall', name: 'EmojiWall', component: Home, meta: { title: '表情包墙' } },
  { path: '/best-staff', name: 'BestStaff', component: Home, meta: { title: '最佳员工榜' } },
  { path: '/user-center', name: 'UserCenter', component: Home, meta: { title: '个人中心' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const baseTitle = '肠肠扁扁 · 宠咖'
  document.title = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle
})

export default router
