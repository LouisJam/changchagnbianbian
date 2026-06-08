<script setup>
import { ref, computed } from 'vue'
import RibbonTitle from '@/components/RibbonTitle.vue'

/** 员工（萌宠）数据 */
const STAFF_LIST = [
  {
    id: 1,
    name: '扁扁',
    gender: '男孩子',
    birthday: '2020-03-15',
    avatar: '🐱',
    avatarBg: 'linear-gradient(135deg,#f7cd67,#e59266)',
    pattern: 'app-orange',
    intro: '橘猫届的社交达人，最喜欢趴在吧台边陪客人喝咖啡。性格温顺，但看到小鱼干会瞬间变身「闪电侠」。',
    parentMessage: '扁扁来到我们家后，每天都用呼噜声治愈我们。希望他在肠肠扁扁交到更多好朋友！—— 铲屎官小美',
    isBestStaff: true,
  },
  {
    id: 2,
    name: '肠肠',
    gender: '男孩子',
    birthday: '2019-08-22',
    avatar: '🐶',
    avatarBg: 'linear-gradient(135deg,#82d5bb,#19c8b9)',
    pattern: 'app-teal',
    intro: '柯基短腿但能量爆棚，是店里的迎宾担当。擅长用屁股卖萌，接待每一位来店的客人。',
    parentMessage: '肠肠精力旺盛，这里是他释放活力的天堂。感谢店员的耐心陪伴！—— 肠肠爸',
    isBestStaff: true,
  },
  {
    id: 3,
    name: '团子',
    gender: '女孩子',
    birthday: '2021-01-08',
    avatar: '🐩',
    avatarBg: 'linear-gradient(135deg,#f8a6b2,#e18c6f)',
    pattern: 'app-pink',
    intro: '雪白卷毛的小公主，喜欢安静角落晒太阳。对小朋友特别温柔，是亲子客的首选玩伴。',
    parentMessage: '团子性格乖巧，在这里找到了属于自己的小天地。—— 团子妈',
    isBestStaff: false,
  },
  {
    id: 4,
    name: '咖啡',
    gender: '男孩子',
    birthday: '2018-11-30',
    avatar: '🐕',
    avatarBg: 'linear-gradient(135deg,#889df0,#b77dee)',
    pattern: 'app-blue',
    intro: '拉布拉多，名字和店里的拿铁一样温暖。聪明听话，偶尔会帮忙「监督」店员有没有偷懒。',
    parentMessage: '咖啡是我们家的开心果，在这里他变得更开朗了。—— 咖啡主人',
    isBestStaff: false,
  },
  {
    id: 5,
    name: '抹茶',
    gender: '女孩子',
    birthday: '2022-05-18',
    avatar: '🐈',
    avatarBg: 'linear-gradient(135deg,#8ac68a,#d1da49)',
    pattern: 'app-green',
    intro: '英短蓝猫，毛色像抹茶一样清新。高冷外表下藏着粘人属性，熟悉后会主动蹭腿求摸摸。',
    parentMessage: '抹茶慢热但重感情，感谢店员们给了她足够的安全感。—— 抹茶姐',
    isBestStaff: false,
  },
  {
    id: 6,
    name: '布丁',
    gender: '女孩子',
    birthday: '2021-09-03',
    avatar: '🐕‍🦺',
    avatarBg: 'linear-gradient(135deg,#ecdf52,#f7cd67)',
    pattern: 'yellow-green',
    intro: '柴犬妹妹，笑起来像甜甜圈。最爱和肠肠一起「巡逻」店面，是店里的气氛组组长。',
    parentMessage: '布丁每天都盼着来店里玩，这里已经是她第二个家啦！—— 布丁全家',
    isBestStaff: true,
  },
]

const selectedIndex = ref(0)

const currentStaff = computed(() => STAFF_LIST[selectedIndex.value])

/** 品字形三列位置：0 顶部居中，1 左下，2 右下 */
function pinPosition(index) {
  return index % 3
}

function selectStaff(index) {
  selectedIndex.value = index
}
</script>

<template>
  <div class="staff-page">
    <div class="section-title">
      <RibbonTitle color="app-green" size="large">员工介绍</RibbonTitle>
    </div>

    <!-- 上半部：品字形手动滚动速览 -->
    <section class="staff-overview">
      <p class="overview-hint">左右滑动浏览明星员工，点击卡片查看详情</p>
      <div class="pin-viewport">
        <div class="pin-track">
          <el-button
            v-for="(staff, index) in STAFF_LIST"
            :key="staff.id"
            text
            class="pin-card-wrapper"
            :class="[
              `pin-pos-${pinPosition(index)}`,
              { active: selectedIndex === index },
            ]"
            @click="selectStaff(index)"
          >
            <el-card
              shadow="never"
              :class="['staff-preview-card', 'ai-card', `ai-card--pattern-${staff.pattern}`]"
            >
              <span v-if="staff.isBestStaff" class="best-badge">🏆 最佳员工</span>
              <div class="preview-avatar" :style="{ background: staff.avatarBg }">
                {{ staff.avatar }}
              </div>
              <p class="preview-name">{{ staff.name }}</p>
            </el-card>
          </el-button>
        </div>
      </div>
    </section>

    <!-- 下半部：当前员工详情 -->
    <section class="staff-detail">
      <el-card shadow="never" class="ai-card ai-card--pattern-default detail-card">
        <div class="detail-layout">
          <div class="detail-avatar-wrap">
            <div
              class="detail-avatar"
              :style="{ background: currentStaff.avatarBg }"
            >
              {{ currentStaff.avatar }}
            </div>
            <span v-if="currentStaff.isBestStaff" class="detail-best-tag">最佳员工</span>
          </div>

          <div class="detail-body">
            <h2 class="detail-name">{{ currentStaff.name }}</h2>

            <div class="detail-meta">
              <div class="meta-item">
                <span class="meta-label">性别</span>
                <span class="meta-value">{{ currentStaff.gender }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">生日</span>
                <span class="meta-value">{{ currentStaff.birthday }}</span>
              </div>
            </div>

            <div class="detail-block">
              <h3 class="detail-subtitle">
                <RibbonTitle color="app-teal" size="small">自我介绍</RibbonTitle>
              </h3>
              <p class="detail-text">{{ currentStaff.intro }}</p>
            </div>

            <div class="detail-block">
              <h3 class="detail-subtitle">
                <RibbonTitle color="app-pink" size="small">家长寄语</RibbonTitle>
              </h3>
              <p class="detail-text detail-quote">{{ currentStaff.parentMessage }}</p>
            </div>
          </div>
        </div>
      </el-card>
    </section>
  </div>
</template>

<style scoped src="./staff.page.css"></style>
