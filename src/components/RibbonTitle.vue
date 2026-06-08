<script setup>
defineProps({
  color: { type: String, default: 'default-green' },
  size: { type: String, default: 'middle' },
})

const TITLE_MAP = {
  'default-green': { '--rf': '#27d039', '--rb': '#20992a', '--rk': '#115017', '--rt': '#fff' },
  'app-pink': { '--rf': '#f8a6b2', '--rb': '#e06880', '--rk': '#a03060', '--rt': '#fff' },
  purple: { '--rf': '#b77dee', '--rb': '#9050d0', '--rk': '#5a1a9a', '--rt': '#fff' },
  'app-blue': { '--rf': '#889df0', '--rb': '#5068d8', '--rk': '#2030a0', '--rt': '#fff' },
  'app-yellow': { '--rf': '#f7cd67', '--rb': '#d4a030', '--rk': '#8a6010', '--rt': '#725d42' },
  'app-orange': { '--rf': '#e59266', '--rb': '#c06a30', '--rk': '#7a3a10', '--rt': '#fff' },
  'app-teal': { '--rf': '#82d5bb', '--rb': '#40a880', '--rk': '#186048', '--rt': '#fff' },
  'app-green': { '--rf': '#8ac68a', '--rb': '#509050', '--rk': '#205020', '--rt': '#fff' },
  'app-red': { '--rf': '#fc736d', '--rb': '#d43030', '--rk': '#900010', '--rt': '#fff' },
  'lime-green': { '--rf': '#d1da49', '--rb': '#90a010', '--rk': '#485800', '--rt': '#3d5a1a' },
  'yellow-green': { '--rf': '#ecdf52', '--rb': '#c0b010', '--rk': '#706800', '--rt': '#725d42' },
  brown: { '--rf': '#9a835a', '--rb': '#705830', '--rk': '#3a2810', '--rt': '#fff' },
  'warm-peach-pink': { '--rf': '#e18c6f', '--rb': '#b85a30', '--rk': '#6a2a10', '--rt': '#fff' },
}
</script>

<template>
  <span
    class="ai-title-wrap"
    :class="`ai-title--${size}`"
    :style="TITLE_MAP[color] || TITLE_MAP['default-green']"
  >
    <span class="ai-ribbon-back ai-ribbon-back--left" />
    <span class="ai-ribbon-back ai-ribbon-back--right" />
    <span class="ai-ribbon-fold ai-ribbon-fold--left" />
    <span class="ai-ribbon-fold ai-ribbon-fold--right" />
    <span class="ai-ribbon-front" />
    <span class="ai-ribbon-text"><slot /></span>
  </span>
</template>
