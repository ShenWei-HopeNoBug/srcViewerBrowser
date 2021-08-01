<template>
  <div class="control">
    <div class="control-btn" @click="togglePlay">
      <span class="play-btn">{{isPlaying?'暂停':'播放'}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MusicControl",
    props: {
      isPlaying: {required: true},
      togglePlay: {required: true}
    }
  }
</script>

<style scoped>

</style>