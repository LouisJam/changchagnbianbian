<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu } from '@element-plus/icons-vue'
import RibbonTitle from '@/components/RibbonTitle.vue'
import UserMenu from '@/components/UserMenu.vue'
import Staff from '@/views/Staff.vue'

const router = useRouter()
const route = useRoute()

const NAV_ITEMS = [
  { name: 'Home', path: '/', label: '首页', icon: '🏠' },
  { name: 'Staff', path: '/staff', label: '员工介绍', icon: '👥' },
  { name: 'Food', path: '/food', label: '饮品甜品', icon: '☕' },
  { name: 'NoteWall', path: '/note-wall', label: '留言墙', icon: '💬' },
  { name: 'EmojiWall', path: '/emoji-wall', label: '表情包墙', icon: '😺' },
  { name: 'BestStaff', path: '/best-staff', label: '最佳员工榜', icon: '🏆' },
]

const CAROUSEL_SLIDES = [
  { id: 1, gradient: 'linear-gradient(135deg,#82d5bb 0%,#19c8b9 50%,#f7cd67 100%)', label: '🐱 萌宠下午茶' },
  { id: 2, gradient: 'linear-gradient(135deg,#f8a6b2 0%,#e18c6f 50%,#f7cd67 100%)', label: '🐶 撸猫撸狗天堂' },
  { id: 3, gradient: 'linear-gradient(135deg,#889df0 0%,#b77dee 50%,#82d5bb 100%)', label: '🌿 治愈系空间' },
  { id: 4, gradient: 'linear-gradient(135deg,#8ac68a 0%,#d1da49 50%,#ecdf52 100%)', label: '☕ 精品手冲咖啡' },
]

const ANNOUNCEMENTS = [
  { id: 1, date: '2026-06-05', title: '端午假期营业时间调整', content: '6月8日至6月10日营业时间调整为 10:00 - 20:00，欢迎携宠前来！' },
  { id: 2, date: '2026-06-01', title: '新品上市：芒果椰椰拿铁', content: '夏日限定芒果椰椰拿铁现已上市，第二杯半价，快来尝鲜～' },
  { id: 3, date: '2026-05-28', title: '会员积分兑换活动', content: '即日起至月底，积分可兑换限定宠物周边，详情咨询店内员工。' },
]

const FEATURED_STICKIES = [
  { id: 1, text: '店里的橘猫太可爱了！', author: '小鱼', color: 'app-pink' },
  { id: 2, text: '拿铁拉花绝了 ☕', author: '阿狸', color: 'app-yellow' },
  { id: 3, text: '周末带狗子来社交', author: '旺财妈', color: 'app-teal' },
  { id: 4, text: '甜品也好好吃！', author: '甜甜', color: 'app-orange' },
]

const FEATURED_EMOJIS = [
  { id: 1, emoji: '😸', name: '扁扁微笑' },
  { id: 2, emoji: '🐾', name: '肉垫印' },
  { id: 3, emoji: '☕', name: '咖啡喵' },
  { id: 4, emoji: '🍰', name: '甜品喵' },
  { id: 5, emoji: '🌸', name: '春日喵' },
]

const STORE_INTRO =
  '我们希望能有一个机会，可以和自己心爱的小狗朝夕相处。而这份小小的愿望，慢慢长成了一个更大的梦想——打造一个健康、舒适的人宠社交空间。在这里，喜欢狗狗的朋友可以放松地和它们互动；而平时忙碌的铲屎官，也能安心地把狗狗托付给我们，让它们在这里结交同伴、收获人类的喜爱。希望您在这家小店里，不仅能喝到好喝的饮品，更能收获一段温暖治愈的时光。我们都相信，有些幸福，是小狗给的。'

const PLACEHOLDER_META = {
  Food: { titleColor: 'app-orange', pattern: 'app-orange', icon: '☕', label: '饮品甜品' },
  NoteWall: { titleColor: 'app-pink', pattern: 'app-pink', icon: '💬', label: '留言墙' },
  EmojiWall: { titleColor: 'app-blue', pattern: 'app-blue', icon: '😺', label: '表情包墙' },
  BestStaff: { titleColor: 'app-yellow', pattern: 'app-yellow', icon: '🏆', label: '最佳员工榜' },
  UserCenter: { titleColor: 'app-teal', pattern: 'app-teal', icon: '👤', label: '个人中心' },
}

const isMobile = ref(false)
const drawerOpen = ref(false)
const user = ref(null)
const loginOpen = ref(false)
const loginMode = ref('login')
const carouselIdx = ref(0)
const typewriterCount = ref(0)
const now = ref(new Date())
const activeAnnounce = ref(String(ANNOUNCEMENTS[0].id))

let carouselTimer = null
let clockTimer = null
let typewriterTimer = null

const isHome = computed(() => route.name === 'Home')
const placeholder = computed(() => PLACEHOLDER_META[route.name] || null)
const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const clockH = computed(() => String(now.value.getHours()).padStart(2, '0'))
const clockM = computed(() => String(now.value.getMinutes()).padStart(2, '0'))
const typewriterText = computed(() => STORE_INTRO.slice(0, typewriterCount.value))

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

function navigate(item) {
  if (route.name === item.name) return
  router.push(item.path)
  drawerOpen.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function openLogin() {
  loginOpen.value = true
}

function handleLoginSuccess() {
  user.value = { id: `u_${Date.now()}`, nickname: `岛民${Math.floor(Math.random() * 1000)}` }
  loginOpen.value = false
}

function handleLogout() {
  user.value = null
}

function carouselPrev() {
  carouselIdx.value = (carouselIdx.value - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length
}

function carouselNext() {
  carouselIdx.value = (carouselIdx.value + 1) % CAROUSEL_SLIDES.length
}

function startTypewriter() {
  clearTimeout(typewriterTimer)
  typewriterCount.value = 0
  const tick = () => {
    if (typewriterCount.value < STORE_INTRO.length) {
      typewriterCount.value += 1
      typewriterTimer = setTimeout(tick, 30)
    }
  }
  tick()
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  carouselTimer = setInterval(() => {
    carouselIdx.value = (carouselIdx.value + 1) % CAROUSEL_SLIDES.length
  }, 4000)
  clockTimer = setInterval(() => {
    now.value = new Date()
  }, 1000)
  startTypewriter()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  clearInterval(carouselTimer)
  clearInterval(clockTimer)
  clearTimeout(typewriterTimer)
})

watch(isHome, (val) => {
  if (val) startTypewriter()
})
</script>

<template>
  <div class="home-page animal-cursor">
    <svg class="clip-svg" aria-hidden="true">
      <defs>
        <clipPath id="animal-modal-clip" clipPathUnits="objectBoundingBox">
          <path d="M0.501,0.005 L0.501,0.005 L0.523,0.005 L0.549,0.006 C0.704,0.01,0.796,0.017,0.825,0.027 L0.827,0.028 C0.872,0.045,0.939,0.044,0.978,0.17 C1,0.254,1,0.365,0.99,0.505 L0.988,0.513 C0.979,0.558,0.971,0.598,0.965,0.633 C0.956,0.689,0.979,0.77,0.964,0.865 C0.953,0.928,0.921,0.966,0.869,0.979 C0.821,0.986,0.773,0.992,0.726,0.995 L0.712,0.996 L0.694,0.997 C0.648,1,0.586,1,0.507,1 L0.501,1 L0.464,1 C0.385,1,0.325,0.998,0.283,0.995 C0.234,0.992,0.184,0.987,0.133,0.979 C0.081,0.966,0.05,0.928,0.039,0.865 C0.023,0.77,0.047,0.689,0.037,0.633 C0.031,0.595,0.023,0.552,0.013,0.505 C-0.006,0.365,-0.002,0.254,0.024,0.17 C0.064,0.045,0.13,0.045,0.174,0.028 L0.175,0.028 C0.204,0.017,0.303,0.009,0.474,0.005 L0.501,0.005" />
        </clipPath>
      </defs>
    </svg>

    <div class="page-shell">
      <aside v-if="!isMobile" class="sidebar">
        <div class="sidebar-brand">🐾 肠肠扁扁</div>
        <el-button
          v-for="item in NAV_ITEMS"
          :key="item.name"
          text
          class="nav-item"
          :class="{ active: route.name === item.name }"
          @click="navigate(item)"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </el-button>
      </aside>

      <header v-if="isMobile" class="mobile-header">
        <el-button text class="menu-btn" @click="drawerOpen = true">
          <el-icon :size="22" color="#794f27"><Menu /></el-icon>
        </el-button>
        <span class="mobile-title">肠肠扁扁</span>
        <UserMenu :user="user" :is-mobile="true" @login="openLogin" @logout="handleLogout" />
      </header>

      <div class="drawer-overlay" :class="{ open: drawerOpen }" @click="drawerOpen = false" />

      <nav class="mobile-drawer" :class="{ open: drawerOpen }">
        <div class="drawer-brand">🐾 肠肠扁扁</div>
        <el-button
          v-for="item in NAV_ITEMS"
          :key="`m-${item.name}`"
          text
          class="nav-item"
          :class="{ active: route.name === item.name }"
          @click="navigate(item)"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </el-button>
      </nav>

      <div class="main-area">
        <div v-if="!isMobile" class="top-bar">
          <UserMenu :user="user" :is-mobile="false" @login="openLogin" @logout="handleLogout" />
        </div>

        <main class="main-content">
          <div v-if="isHome">
            <div class="section-title">
              <RibbonTitle color="app-teal" size="large">肠肠扁扁宠咖</RibbonTitle>
            </div>

            <div class="hero-row">
              <div class="carousel-wrap">
                <div class="carousel">
                  <div
                    v-for="(slide, i) in CAROUSEL_SLIDES"
                    :key="slide.id"
                    class="carousel-slide"
                    :class="{ active: i === carouselIdx }"
                    :style="{ background: slide.gradient }"
                  >
                    <span class="carousel-label">{{ slide.label }}</span>
                  </div>
                  <div class="carousel-arrows">
                    <el-button class="ai-btn ai-btn--small ai-btn--default" @click="carouselPrev">‹</el-button>
                    <el-button class="ai-btn ai-btn--small ai-btn--default" @click="carouselNext">›</el-button>
                  </div>
                  <div class="carousel-dots">
                    <el-button
                      v-for="(slide, i) in CAROUSEL_SLIDES"
                      :key="`dot-${slide.id}`"
                      circle
                      class="carousel-dot"
                      :class="{ active: i === carouselIdx }"
                      @click="carouselIdx = i"
                    />
                  </div>
                </div>
              </div>

              <div class="store-info">
                <el-card shadow="never" class="ai-card ai-card--pattern-app-teal store-card">
                  <div class="store-card-title">
                    <RibbonTitle color="app-green" size="small">店铺介绍</RibbonTitle>
                  </div>
                  <div class="info-row">
                    <span class="info-label">📍 地址</span>
                    <span>湖南省长沙市天心区赤岭路82号细巷子湘银嘉园1栋107</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">🕐 营业</span>
                    <span>周二至周日 13:00-21:00</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">📞 电话</span>
                    <span>19217392520</span>
                  </div>
                  <hr class="ai-divider ai-divider--dashed-brown" />
                  <p class="store-intro">{{ typewriterText }}</p>
                </el-card>
                <div v-if="!isMobile" class="ai-time">
                  <div class="ai-time-date">
                    <div class="ai-time-weekday">{{ weekdays[now.getDay()] }}</div>
                    <div class="ai-time-md">{{ now.getMonth() + 1 }}/{{ now.getDate() }}</div>
                  </div>
                  <div class="ai-time-clock">
                    {{ clockH }}<span class="ai-time-colon">:</span>{{ clockM }}
                  </div>
                </div>
              </div>
            </div>

            <div class="announce-section">
              <div class="announce-heading">
                <RibbonTitle color="app-yellow" size="middle">店铺公告</RibbonTitle>
              </div>
              <el-collapse v-if="isMobile" v-model="activeAnnounce" accordion class="announce-collapse">
                <el-collapse-item
                  v-for="a in ANNOUNCEMENTS"
                  :key="a.id"
                  :name="String(a.id)"
                  :title="`${a.date}  ${a.title}`"
                >
                  <p class="announce-body">{{ a.content }}</p>
                </el-collapse-item>
              </el-collapse>
              <el-card v-else shadow="never" class="ai-card ai-card--pattern-app-yellow store-card">
                <div class="announce-list">
                  <div
                    v-for="(a, i) in ANNOUNCEMENTS"
                    :key="a.id"
                    class="announce-item"
                    :class="{ bordered: i > 0 }"
                  >
                    <div class="announce-date">
                      {{ a.date }}
                      <span v-if="i === 0" class="announce-new">最新</span>
                    </div>
                    <div class="announce-title">{{ a.title }}</div>
                    <p class="announce-body">{{ a.content }}</p>
                  </div>
                </div>
              </el-card>
            </div>

            <hr class="ai-divider ai-divider--line-teal" />

            <div class="featured-section">
              <div class="featured-row">
                <div class="featured-col">
                  <div class="featured-head">
                    <RibbonTitle color="app-pink" size="small">精选便利贴</RibbonTitle>
                    <el-button link class="ai-btn ai-btn--small ai-btn--link" @click="navigate(NAV_ITEMS[3])">
                      查看更多 →
                    </el-button>
                  </div>
                  <div class="sticky-scroll">
                    <div
                      v-for="s in FEATURED_STICKIES"
                      :key="s.id"
                      class="sticky-card"
                      @click="navigate(NAV_ITEMS[3])"
                    >
                      <el-card shadow="never" :class="['ai-card', `ai-card--pattern-${s.color}`]">
                        <p class="sticky-text">"{{ s.text }}"</p>
                        <span class="sticky-author">— {{ s.author }}</span>
                      </el-card>
                    </div>
                  </div>
                </div>
                <div class="featured-col">
                  <div class="featured-head">
                    <RibbonTitle color="app-blue" size="small">热门表情包</RibbonTitle>
                    <el-button link class="ai-btn ai-btn--small ai-btn--link" @click="navigate(NAV_ITEMS[4])">
                      查看更多 →
                    </el-button>
                  </div>
                  <div class="emoji-scroll">
                    <div
                      v-for="e in FEATURED_EMOJIS"
                      :key="e.id"
                      class="emoji-card"
                      @click="navigate(NAV_ITEMS[4])"
                    >
                      <el-card shadow="never" class="ai-card ai-card--pattern-app-blue">
                        <div class="emoji-thumb">{{ e.emoji }}</div>
                        <p class="emoji-name">{{ e.name }}</p>
                      </el-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Staff v-else-if="route.name === 'Staff'" />

          <div v-else-if="placeholder" class="placeholder-page">
            <RibbonTitle :color="placeholder.titleColor" size="large">
              {{ placeholder.icon }} {{ placeholder.label }}
            </RibbonTitle>
            <p class="placeholder-tip">此页面正在建设中，敬请期待～</p>
            <el-card shadow="never" :class="['ai-card', `ai-card--pattern-${placeholder.pattern}`, 'placeholder-card']">
              <p>功能即将上线，可以先在首页逛逛店铺介绍和公告哦！</p>
            </el-card>
          </div>
        </main>

        <div class="page-footer">
          <div class="ai-footer-tree" />
        </div>
      </div>
    </div>

    <el-dialog
      v-model="loginOpen"
      :title="loginMode === 'login' ? '微信扫码登录' : '注册账号'"
      width="480px"
      class="login-dialog"
      align-center
      destroy-on-close
    >
      <p class="login-desc">基于 CloudBase 微信网页扫码登录（演示模式）</p>
      <div class="login-qr">微信扫码<br />登录区域</div>
      <p class="login-tip">请使用微信扫描二维码登录</p>
      <div class="login-switch">
        <el-button link class="ai-btn ai-btn--small ai-btn--link" @click="loginMode = loginMode === 'login' ? 'register' : 'login'">
          {{ loginMode === 'login' ? '没有账号？去注册' : '已有账号？去登录' }}
        </el-button>
      </div>
      <template #footer>
        <el-button class="ai-btn ai-btn--middle ai-btn--default" @click="loginOpen = false">取消</el-button>
        <el-button class="ai-btn ai-btn--middle ai-modal-confirm" @click="handleLoginSuccess">模拟登录成功</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped src="./home.page.css"></style>
