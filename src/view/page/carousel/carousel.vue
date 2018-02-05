<template lang="">
  <div id="demo1">
    <!--on-off平移动画-->
    <div style="position: relative;height: 45px;">
      <transition name="on-off">
      <div v-if="show" class="demo1" @click="onoff()" key="d1">on</div>
      <div v-if="!show" class="demo1" @click="onoff()" key="d2">off</div>
      </transition>
    </div>

    <!--v-bind:css="false"-->
    <transition name="bounce">
      <p v-if="show1" class="show1">Look at me!</p>
    </transition>
    <button @click="tran1">Toggle show</button>

    <!--左右滑动轮播-->
    <div class="carousel">
      <!--使用transition-group,必须指定唯一的key值-->
      <transition-group tag="ul" :name="name"
                                  v-on:before-enter="beforeEnter" 
                                  v-on:enter="enter"
                                  v-on:after-enter="afterEnter"
                                  v-on:before-leave="beforeLeave"
                                  v-on:leave="leave"
                                  v-on:after-leave="afterLeave">
      <li v-for="(item,index) in photos" :key="index" v-if="index == showIndex">
          <img :src="item" :alt="index">
      </li>
      </transition-group>
    </div>
    <div>
      左右切换
      <button @click="pre('carousel-left')">上一张</button>
      <button @click="next('carousel-right')">下一张</button> 渐进渐出
      <button @click="pre('gra')">上一张</button>
      <button @click="next('gra')">下一张</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      show1: true,
      name: "carousel-right",
      photos: [
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1794894692,1423685501&fm=116&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1237679276,3516486176&fm=116&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3432487329,2901563519&fm=116&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4126257507,3957500859&fm=116&gp=0.jpg"
      ],
      showIndex: 0,
      isalow: true
    };
  },
  mounted() {},
  methods: {
    onoff() {
      this.show = !this.show;
    },
    tran1() {
      this.show1 = !this.show1;
    },
    pre(name) {
      if (!this.isalow) return;
      var length = this.photos.length;
      this.isalow = false;
      this.setTransitionName(name);
      if (this.showIndex == 0) {
        this.showIndex = length - 1;
      } else {
        this.showIndex -= 1;
      }
    },
    next(name) {
      if (!this.isalow) return;
      var length = this.photos.length;
      this.isalow = false;
      this.setTransitionName(name);
      if (this.showIndex == length - 1) {
        this.showIndex = 0;
      } else {
        this.showIndex += 1;
      }
    },
    setTransitionName(name) {
      //设置 轮播 transition的name值
      this.name = name;
    },
    // 过渡 的javascript钩子
    beforeEnter() {
      console.log("beforeEnter");
    },
    enter() {
      console.log("enter");
    },
    afterEnter() {
      this.isalow = true;
      console.log("afterEnter");
    },
    beforeLeave() {
      console.log("beforeLeave");
    },
    leave() {
      console.log("leave");
    },
    afterLeave() {
      console.log("afterLeave");
    }
  }
};
</script>
<style>
#demo1 {
  margin-left: 100px;
}
.demo1 {
  width: 60px;
  border: 1px solid #888;
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}
/*on/off切换*/
/*
        v-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
        v-enter-active: 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。
        v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
        v-leave-active: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。
    */
.on-off-enter-active {
  transition: all 1s ease;
}
.on-off-leave-active {
  transform: translateX(60px);
  opacity: 0;
  transition: all 1s ease;
}
.on-off-enter {
  transform: translateX(-60px);
  opacity: 0;
}

.show1 {
  width: 100px;
}
.bounce-enter-active {
  animation: bounce-in 0.7s;
}
.bounce-leave-active {
  animation: bounce-out 0.7s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
/*轮播css*/
.carousel {
  width: 400px;
  height: 400px;
  overflow: hidden;
  position: relative;
}
.carousel li {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
img {
  width: 100%;
  height: 100%;
}
.carousel-right-enter-active {
  transition: all 0.7s ease;
}
.carousel-right-leave-active {
  transform: translateX(-100%);
  transition: all 0.7s ease;
}
.carousel-right-enter {
  transform: translateX(100%);
  opacity: 0;
}
.carousel-left-enter-active {
  transition: all 0.7s ease;
}
.carousel-left-leave-active {
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.7s ease;
}
.carousel-left-enter {
  transform: translateX(-100%);
}
/*渐进渐出*/
.gra-enter-active {
  transition: all 1s ease;
}
.gra-leave-active {
  opacity: 0;
  transition: all 1s ease;
}
.gra-enter {
  opacity: 0;
}
</style>