<script setup>
defineProps({
  user: { type: Object, default: null },
  isMobile: { type: Boolean, default: false },
})

defineEmits(['login', 'logout'])
</script>

<template>
  <div class="user-center">
    <template v-if="!user">
      <el-button class="ai-btn ai-btn--small ai-btn--primary" @click="$emit('login')">登录</el-button>
      <el-button v-if="!isMobile" class="ai-btn ai-btn--small ai-btn--primary" @click="$emit('login')">注册</el-button>
    </template>
    <el-dropdown v-else :trigger="isMobile ? 'click' : 'hover'" placement="bottom-end" popper-class="user-dropdown-popper">
      <div class="user-avatar" :title="user.nickname">{{ user.nickname?.[0] || 'U' }}</div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item disabled>{{ user.nickname }}</el-dropdown-item>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>收藏夹</el-dropdown-item>
          <el-dropdown-item divided @click="$emit('logout')">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
