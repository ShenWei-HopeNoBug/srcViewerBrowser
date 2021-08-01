<template>
  <div class="progress" :class="{ progress__playing: isPlaying }">
    <h2 class="progress_title">{{ name}}</h2>
    <p class="progress_text">
      {{ position}} / {{ duration}}
    </p>
    <div class="progress_line">
      <span :style="{ width: progress }"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MusicProgress",
    props: {
      isPlaying: {required: true},
      duration: {
        default() {
          return 0.001
        }
      },
      position: {
        default() {
          return 0;
        }
      },
    },
    data() {
      return {
        name: '',
      }
    },
    mounted() {
      const draw = () => {
        requestAnimationFrame(draw)
        // const progress = this.player.position / this.player.duration
        // this.progress = (progress * 100).toFixed(2) + '%'
        // this.position = this.player.position
        // this.duration = this.player.duration
        this.name = 'lalala'
      }

      draw();
    },
    computed: {
      progress() {
        const progress = this.position / this.duration
        return (progress * 100).toFixed(2) + '%'
      }
    }
  }
</script>

<style lang="less" scoped>
  .progress {
    padding-left: 123px;
    padding-right: 12px;
    height: 100%;
    border-radius: 6px 6px 0 0;
    background-color: rgba(255, 255, 255, 0.5);
    transition: all 0.6s ease;
  }

  //播放时向上弹出
  .progress__playing {
    transform: translateY(-100%);
  }

  .progress_title {
    padding-top: 6px;
    font-size: 12px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .progress_text {
    padding-top: 2px;
    padding-left: 2px;
    font-size: 12px;
    font-weight: bold;
    color: #ccc;
    transform: scale(0.6);
    transform-origin: left top;
  }

  //进度条外壳
  .progress_line {
    height: 3px;
    border-radius: 3px;
    overflow: hidden;
    background-color: #ddd;
  }

  //进度条内
  .progress_line span {
    display: block;
    height: 100%;
    background-color: #ec51a5;
  }
</style>