<template>
  <div>
    <div @click="dateShow">选择日期</div>
    <div @click="stockShow">选择库存</div>
    <selectStock v-show="stockIsShow"></selectStock>
    <page name="分页" :flip="paging.flip" :total="paging.total" :page="paging.page" @selectPage="selectPage"></page>
    <selectDate></selectDate>
  </div>
</template>

<script>
  import selectDate from '#/component/selectDate.vue'
  import selectStock from '#/component/selectStock.vue'
  import page from '#/component/pagination.vue'

  let vm; //留住this
  export default {
    name: "plugin", //定义模块名称
    components: {selectDate, selectStock, page},
    data() {
      return {
        paging: {
          flip: 2,
          total: 10,
          page: 1
        },
        stockIsShow: false
      } //定义模块变量
    },
    methods: {
      dateShow() {
        let opt = {
          date: '',
          left: 100,
          top: 50
        };
        opt.callback = (msg) => {
          console.log('msg:', msg)
        };
        vm.$root.$emit('selectDate', opt)
      },
      selectPage(page) {
        // console.log('page:', page)
        vm.paging.page = page
      },
      stockShow() {
        vm.stockIsShow = !vm.stockIsShow;
      }
    },//方法定义区
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

<style scoped>

</style>
