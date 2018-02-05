
<template lang="">
	<div class="loading" v-show="isLoadShow">
		<div class="loading3_1">
			<i class="rect1"></i>
			<i class="rect2"></i>
			<i class="rect3"></i>
			<i class="rect4"></i>
		</div>
		<div class="loading3_2">
			<i class="rect1"></i>
			<i class="rect2"></i>
			<i class="rect3"></i>
			<i class="rect4"></i>
		</div>
		<div class="loading3_3">
			<i class="rect1"></i>
			<i class="rect2"></i>
			<i class="rect3"></i>
			<i class="rect4"></i>
		</div>
	</div>
</template>

<script>
/**
 * loading
 * 调用：
 *    1. var loading = require('../components/loading.vue');       //通用组件
 *    2. 注册组件
 *       let vm = new Vue({
 *         el: 'body',
 *         component:{
 *         	'loading': loading
 *         },
 *         data: {
 *           isLoadShow: true,
 *           ...
 *       },
 *         ...
 *       )}
 *    3. 页面初始化组件
 *       <loading v-bind:is-load-show.sync="isLoadShow"></loading>
 *
 */
module.exports = {
  // props:['isLoadShow'],
  data() {
    return {
      isLoadShow: false
    };
  },
  ready() {
    //console.log(this.isshow);
  },
  created() {
    bus.$on("loading", show => {
      this.isLoadShow = show;
    });
  }
};
</script>
<style scoped>
.loading {
  width: 0.8rem; /*loading 总大小*/
  height: 0.8rem; /*loading 总大小*/
  position: fixed;
  top: 45%;
  z-index: 100000000;
  margin-top: -0.4rem;
  left: 50%;
  margin-left: -0.4rem;
}

.loading i {
  width: 0.15rem; /*圆点大小*/
  height: 0.15rem; /*圆点大小*/
  background-color: #fa9f00;
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.loading3_1,
.loading3_2,
.loading3_3 {
  position: absolute;
  width: 100%;
  height: 100%;
}

.loading3_2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}

.loading3_3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}

.rect1 {
  top: 0;
  left: 0;
}

.rect2 {
  top: 0;
  right: 0;
}

.rect3 {
  right: 0;
  bottom: 0;
}

.rect4 {
  left: 0;
  bottom: 0;
}

.loading3_2 .rect1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.loading3_3 .rect1 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.loading3_1 .rect2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.loading3_2 .rect2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

.loading3_3 .rect2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}

.loading3_1 .rect3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}

.loading3_2 .rect3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}

.loading3_3 .rect3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}

.loading3_1 .rect4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}

.loading3_2 .rect4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}

.loading3_3 .rect4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>