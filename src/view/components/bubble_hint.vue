<template lang="">
  <div class="bubble" v-show="show">
    <p>{{hint_msg}}</p>
  </div>
</template>
<script>
/**
    * 气泡提示
    * 调用：
    *    1. import bubble_hint from './bubble_hint.vue';       //通用组件
    *    2. 注册组件
    *       let vm = new Vue({
    *         el: 'body',
    *         component:{
    *         	'bubble_hint': bubble_hint
    *         },
    *         ready: function() {
    *           this.$broadcast('show_tips', '我是提示气泡');
    *           ...
    *       },
    *        ...
    *       )}
    *    3. 页面初始化组件
    *        <bubble_hint></bubble_hint>
	*
	*/
module.exports = {
  data() {
    return {
      show: false,
      hint_msg: ''
    };
  },
  created() {
    //   this.time_cart();
    // console.log('createsadasd')
    bus.$on('bubble',(msg)=>{this.time_hint(msg);})
  },
  methods: {
    time_hint(msg) {
      var self = this;
      self.hint_msg = msg;
      self.show = true;
      setTimeout(()=>{
          self.hint_msg = '';
          self.show = false;
      }, 2000);
    }
  }
};
</script>
<style>
/*气泡提示---------------------------------------------------------------------------------------------*/

.bubble {
    position: fixed;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    border: 1px solid rgb(100, 100, 100);
    background-color: rgb(100, 100, 100);
    z-index: 99999;
}

.bubble p {
    margin: 0;
    padding: 15px 30px;
    color: rgb(255, 255, 255);
    white-space: nowrap;
    font-size: 0.28rem;
}

/*气泡提示完---------------------------------------------------------------------------------------------*/
</style>
