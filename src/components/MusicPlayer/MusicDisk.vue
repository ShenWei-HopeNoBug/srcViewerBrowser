<template>
  <div class="disk" :class="{'disk-playing':isPlaying}">
    <label for="file"
           class="disk-cover"
           ref="cover"
           :style="{
              transform:stopMatrix,
              backgroundImage:coverUrl?`url(${coverUrl})`:''
           }"
    />
    <!--    <input type="text">-->
  </div>
</template>

<script>
  import test from '../../assets/media/img/loadError.jpg'

  export default {
    name: "MusicDisk",
    data() {
      return {
        isPlaying: false,
        stopMatrix:'',
        coverUrl:''
      }
    },
  }
</script>

<style lang="less" scoped>
  .disk {
    position: relative;
    //圆形居中
    padding-top: 100%;
    border-radius: 100%;
    overflow: hidden;
    transform: translateY(-50%) scale(0.88);
    transform-origin: center bottom;

    transition: all 0.6s ease;
  }

  .disk-cover {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background-image: radial-gradient(circle, #444 0%, #333 100%);
    background-size: cover;
    background-position: center;
  }

  .disk-cover::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-image: linear-gradient(45deg, white, #dabad1);
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
  }

  .disk-playing {
    transform: translateY(-50%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
    0 20px 20 px -10px rgba(108, 29, 171, 0.3);

    .disk-cover {
      animation: rotate infinite 6s linear;
    }
  }

  @keyframes rotate {
    from{
      transform: rotate(0deg)
    }
    to{
      transform: rotate(360deg);
    }
  }
</style>