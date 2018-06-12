<template>
  <div id="root">
    <!--<p>{{msg}}</p>-->
    <!--<img src="../assets/images/test/img1.jpg" alt="">-->
    <router-view></router-view>
    <!-- <video src="./../assets/xxx.mp4"></video> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello Vue!"
    };
  },
  computed: {},
  mounted() {
    console.log("App.vue mounted~");
  },
  methods: {}
};
</script>

<style scoped lang="less">
#root {
  // color: red;
  display: flex;
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
