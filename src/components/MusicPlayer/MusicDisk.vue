<template>
  <div class="disk" :class="{'disk-playing':isPlaying}">
    <div class="disk-cover"
         :style="{backgroundImage:coverUrl?`url(${coverUrl})`:''}"
    ></div>
  </div>
</template>

<script>
  export default {
    name: "MusicDisk",
    props: {
      isPlaying: {required: true},
      coverUrl: {
        default() {
          return ''
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  //唱片
  .disk {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(95, 23, 101, 0.3);
    position: relative;
    //圆形居中
    padding-top: 100%;
    border-radius: 100%;
    overflow: hidden;
    //变形
    transform: translateY(-20%);
    transform-origin: center;

    transition: all 0.6s ease;

    //唱片封面
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

    //唱片内圆
    &::after {
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 100%;
      position: absolute;
      //居中
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      transform-origin: center;
      background-image: linear-gradient(45deg, white, #dabad1);
      box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
    }
  }

  //播放动画
  .disk-playing {
    transform: translateY(0) scale(0.9);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4),
    0 6px 6px rgba(95, 23, 101, 0.4);

    .disk-cover {
      animation: rotate infinite 6s linear;
    }
  }

  //旋转动画
  @keyframes rotate {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>