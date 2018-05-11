<template>
  <div class="jishi_pagination">
    <ul>
      <li @click="selectPage(paging.page - 1)" v-if="paging.page > 1 && paging.total > 2">上一页</li>
      <template v-for="idx in paging.total">
        <!--总数大于 翻页数*2+1 时-->
        <template v-if="paging.total > paging.flip * 2 + 1">
          <template v-if="idx === 1 && paging.page > paging.flip">
            <li @click="selectPage(idx)">
              {{idx}}
            </li>
            <!--选中页>翻页数+1 时显示-->
            <li class="noShow" v-if="paging.page > paging.flip + 2">
              ...
            </li>
          </template>
          <!--当前渲染页 <= 选中页 + 翻页数 && >= 选中页 - 翻页数 时显示-->
          <template v-else-if="idx <= paging.page + paging.flip && idx >= paging.page - paging.flip">
            <li :class="{'check': idx === paging.page}" @click="selectPage(idx)">
              {{idx}}
            </li>
          </template>
          <template v-else-if=" idx === paging.total && paging.page < paging.total - paging.flip">
            <!--选中页<总页数-翻页数-1 时显示-->
            <li class="noShow" v-if="paging.page < paging.total - paging.flip - 1">
              ...
            </li>
            <li @click="selectPage(idx)">
              {{idx}}
            </li>
          </template>
        </template>
        <template v-else-if="paging.total <= paging.flip * 2 + 1">
          <li :class="{'check': idx === paging.page}" @click="selectPage(idx)">
            {{idx}}
          </li>
        </template>
      </template>
      <li @click="selectPage(paging.page + 1)" v-if="paging.page < paging.total && paging.total > 2">下一页</li>
    </ul>
  </div>
</template>

<script>
  let vm;
  export default {
    name: "pagination",
    props: {
      flip: {
        type: Number,
        default: 3
      },
      total: {
        type: Number,
        default: 0
      },
      page: {
        type: Number,
        default: 1
      },
      row: {
        type: Number,
        default: 10
      },
      name: {
        type: String,
        default: '分页'
      }
    },
    data() {
      return {
        width: 0,
        names: '',
        paging: {
          flip: 0,//左右跳页数
          total: 0,//总页数
          page: 0,//当前选中页
        },
      }
    },
    watch: {
      'total'(now) {
        vm.paging.total = now;
      },
      'page'(now) {
        vm.paging.page = now;
      },
      'flip'(now) {
        vm.paging.flip = now;
      }
    },
    methods: {
      init(){
        vm.paging.flip = vm.flip;
        vm.paging.total = vm.total;
        vm.paging.page = vm.page;
        vm.names = vm.name;
      },
      selectPage(page) {
        vm.$emit('selectPage', page, vm.name);
      },
    },
    beforeCreate() {//el 和 data 并未初始化
    },
    beforeMount() {//完成了 el 和 data 初始化
    },
    mounted() {//完成挂载
      vm = this; //留住this  由于该组件会多处使用，所以 在每次激活的时候刷新 vm 的指向
      vm.init();
    },
    activated() {//组件激活时,此生命周期只在<keep-alive>标签内生效
      vm = this; //留住this  由于该组件会多处使用，所以 在每次激活的时候刷新 vm 的指向
      vm.init();
    },
    deactivated() {//组件停用时,此生命周期只在<keep-alive>标签内生效

    }
  }
</script>

<style scoped lang="scss">
  .jishi_pagination {
    width: 100%;
    height: 30px;
    margin: auto;
    text-align: center;
    ul {
      display: inline-block;
      list-style: none;
      height: 30px;
      overflow-y: hidden;
      margin: auto;
      li {
        float: left;
        min-width: 30px;
        height: 30px;
        border: 1px #e6e6e6 solid;
        margin: 0 4px;
        padding: 0 4px;
        text-align: center;
        line-height: 28px;
        font-size: 14px;
        color: #333333;
        cursor: pointer;
        box-sizing: border-box;
        &:active {
          background-color: #e6e6e6;
        }
      }
      .check {
        border: 1px #ffa224 solid;
        background-color: #ffa224;
        color: #fff;
      }
      .noShow {
        border: 0;
        &:active {
          background-color: #fff;
        }
      }
    }
  }
</style>
