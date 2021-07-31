<template>
  <div class="player">
    <div class="player-disk">
      <MusicDisk/>
    </div>
    <div class="player-control">
      <MusicControl/>
    </div>
    <div class="player-progress"></div>
  </div>
</template>

<script>
  import MusicDisk from "./MusicDisk";
  import MusicControl from "./MusicControl";

  export default {
    name: "MusicPlayer",
    components: {
      MusicDisk,
      MusicControl,
    },
    data() {
      return {}
    },
  }
</script>

<style lang="less" scoped>
  .player {
    position: relative;
    display: flex;
    max-width: 300px;
    max-height: 75px;
    width: 60vw;
    height: 15vw;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12),
    0 20px 20px rgba(95, 23, 101, 0.2);
  }

  .player-disk {
    flex: 1.2;
    padding: 2.4vw;

  }

  .player-control {
    flex: 2;
    padding: 2.4vw 0;
    padding-right: 2.4vw;
  }

  .player-progress {
    position: absolute;
    left: 1.8vw;
    right: 1.8vw;
    top: 0;
    bottom: 5vw;
    z-index: -1;
  }

</style>