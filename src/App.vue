<template>
  <div id="app" class="w-100 h-100">
    <router-view/>
  </div>
</template>

<script>
export default {
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontsize = window.innerWidth / 10
  fontsize = fontsize > 50 ? 50 : fontsize
  html.style.fontSize = fontsize + 'px'
})
</script>

<style lang="scss">
#app {
  overflow: hidden;
}
</style>
