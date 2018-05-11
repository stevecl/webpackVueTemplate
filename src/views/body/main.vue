<template>
  <div class="main-page">
    <div>this is main page</div>
    <ul>
      <li><router-link :to="'plugin'">plugin</router-link></li>
      <li><router-link :to="'home'">test1</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  let vm; //留住this
  export default {
    // name: "main", //定义模块名称
    data() {
      return {} //定义模块变量
    },
    methods: {},//方法定义区
    /**
     * 生命周期
     **/
    beforeCreate() {//el 和 data 并未初始化
      vm = this//留住this
    },
    created() {//完成了 data 数据的初始化，el没有
    },
    beforeMount() {//完成了 el 和 data 初始化
    },
    mounted() { //完成挂载
    },
    beforeUpdate() {//更新前,
    },
    updated() {//更新后,
    },
    beforeDestroy() {//销毁前,
    },
    destroyed() {//销毁后
    },
    activated() {//组件激活时,此生命周期只在<keep-alive>标签内生效
    },
    deactivated() {//组件停用时,此生命周期只在<keep-alive>标签内生效
    },
  }
</script>

<style scoped lang="scss">
  .main-page {
    ul{
      display: inline-block;
      margin: 50px 100px;
      li{
        cursor: pointer;
      }
    }
  }
</style>
