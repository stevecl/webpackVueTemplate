<template>
  <!--主要容器开始-->
  <div class="select-stock" :style="{'width': width +'px','height': height + 'px'}">
    <div class="title">请选择购买时间</div>
    <div class="stock" :style="{'height': height - 20 +'px'}">
      <div class="change-month">
        <img src="../../assets/images/stock-arrow.png"
             @click="prevMonth">
        <img src="../../assets/images/stock-arrow.png"
             @click="nextMonth">
        <div :style="{'height':'30px','line-height':'30px'}">
          {{cur_year}}年 {{cur_month+1}}月
        </div>
      </div>
      <div class="table-title">
        <table border="0" cellspacing="0"
               :style="{'height':((height - 20 < 300 ? 300 : height - 20) - 30) +'px'}">
          <thead>
          <tr>
            <td>日</td>
            <td>一</td>
            <td>二</td>
            <td>三</td>
            <td>四</td>
            <td>五</td>
            <td>六</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="rows in dateList">
            <td
              :class="{'not-select': col.attr === 'false', 'selected': checkDateSelect(col.date)}"
              v-for="(col, idx) in rows"
              @click="selectedDate(col)">
              <span class="date">{{col.date | parseDate}}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!--主要容器结束-->
</template>

<script>
  let vm; //留住this
  export default {
    name: 'stock', //定义模块名称
    props: {

    },
    data() {
      return {
        width: 1120,
        height: 315,
        dateList: [],
        stockList: [],
        checkList: [],

        cur_month: 3,  // 0-11
        cur_year: 2018,
        cur_date: 28,

      } //定义模块变量
    },
    methods: {
      // 根据日期生成所需数据列表
      render() {
        vm.dateList = [];
        let year = vm.cur_year, month = vm.cur_month;
        let fullDay = new Date(year, month + 1, 0).getDate(), //当月总天数
          startWeek = new Date(year, month, 1).getDay(), //当月第一天是周几
          total = (fullDay + startWeek) % 7 === 0 ? (fullDay + startWeek) : fullDay + startWeek + (7 - (fullDay + startWeek) % 7),//元素总个数
          // lastMonthDay = new Date(year, month, 0).getDate(), //上月最后一天
          eleTemp = [];
        for (let i = 0; i < total; i++) {
          if (i < startWeek) {
            eleTemp.push(' ')
          } else if (i < (startWeek + fullDay)) {
            let _day = i + 1 - startWeek;
            eleTemp.push(new Date(year, month, _day).format('yyyy-MM-dd'))
          } else {
            eleTemp.push(' ')
          }
        }
        // console.log('当月总日：',eleTemp)
        for (let row = 0; row < 6; row++) {
          let _week = [];
          eleTemp.forEach((val, ins, arr) => {
            if (ins < 7 && arr[ins + row * 7]) {
              let _obj = {};
              _obj.date = arr[ins + row * 7];
              _obj.attr = vm.judgeDate(arr[ins + row * 7]) ? 'true' : 'false';
              _week.push(_obj)
            }
          });
          _week.length !== 0 && vm.dateList.splice(vm.dateList.length, 0, _week);
        }
        console.log('dateList:', vm.dateList)
      },
      // 判断该天是否在所选择范围内
      judgeDate(date) {
        if (date === ' ') {
          return false
        }
        let _date = new Date();
        // 默认时间比对 参考为当天 00:00:00
        let nowTime = new Date(_date.getFullYear(), _date.getMonth(), _date.getDate(), 0, 0, 0).getTime();
        let comTime = new Date(vm.cur_year, vm.cur_month, new Date(date).getDate()).getTime();
        return comTime >= nowTime;
      },
      nextMonth() {
        vm.cur_month += 1;
        vm.cur_month === 12 && vm.cur_year++ && (vm.cur_month = 0);
        vm.getGoodsStock(vm.cur_year, vm.cur_month)
      },
      prevMonth() {
        vm.cur_month -= 1;
        vm.cur_month === -1 && vm.cur_year-- && (vm.cur_month = 11);
        vm.getGoodsStock(vm.cur_year, vm.cur_month)
      },
      // 选择日期
      selectedDate(col) {
        if (col.attr === 'false') {
          return
        }
        if (col.isSelected) {
          // 取消选择
          if (vm.checkDateSelect(col.date)) {
            for (let i = 0; i < vm.checkList.length; i++) {
              if (vm.checkList[i].date === col.date) {
                col.isSelected = false;
                vm.checkList.splice(i, 1);
                return
              }
            }
          }
          return;
        }
        col.isSelected = true;
        vm.checkList.push(col)
      },
      // 获取库存信息
      getGoodsStock(year, month) {
        // let now = new Date(year, month, 1);
        // let da = new Date(year, month + 1, 0).getDate();
        // let end = new Date(year, month, da);
        vm.stockList = [];
        vm.render();
      },
      setDate() {
        vm.cur_year = new Date().getFullYear();
        vm.cur_month = new Date().getMonth();
        vm.cur_date = new Date().getDate();
      },
      checkDateSelect(date) {
        let result = false;
        vm.checkList.forEach((val) => {
          if (date === val.date) {
            result = true
          }
        });
        return result;
      }
    },//方法定义区
    watch: {},//变量监听
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
      vm.setDate();
      vm.getGoodsStock(vm.cur_year, vm.cur_month)
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
    filters: {
      parseDate(value) {
        if (new Date(value).format('yyyy-MM-dd') === new Date().format('yyyy-MM-dd')) {
          return '今天'
        }
        return value.split('-')[2]
      }
    }
  }
</script>
<style scoped lang="scss">
  .select-stock {
    .title {
      min-width: 800px;
      width: 100%;
      height: 20px;
      color: #333;
      font-size: 16px;
      line-height: 16px;
    }
    .stock {
      min-height: 300px;
      width: 50%;
      float: left;
      .change-month {
        width: 100%;
        height: 10%;
        background-color: #3e81d3;
        position: relative;
        img {
          position: absolute;
          top: 0;
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
        img:nth-child(1) {
          transform: rotate(180deg);
          left: 0;
        }
        img:nth-child(2) {
          right: 0;
        }
        div {
          width: 100%;
          text-align: center;
          color: #fff;
          font-size: 14px;
        }
      }
      .table-title {
        width: 100%;
        table {
          width: 100%;
          height: 100%;
          thead {
            background-color: #e6e6e6;
            tr {
              td {
                text-align: center;
                color: #333;
                font-size: 14px;
                line-height: 25px;
                width: 40px;
              }
              td:first-child, td:last-child {
                color: #ffa224;
              }
            }
          }
          tbody {
            tr {
              td {
                position: relative;
                text-align: center;
                border-right: 1px #e6e6e6 solid;
                border-bottom: 1px #e6e6e6 solid;
                cursor: pointer;
              }
              td.not-select {
                color: #B7B4B4;
                cursor: default;
              }
              td.selected {
                background-color: rgba(62, 129, 211, .9);
                color: #fff;
                span {
                  color: #fff;
                  border-color: #fff;
                }
              }
              td.no-cursor {
                cursor: default;
              }
              td:first-child {
                border-left: 1px #e6e6e6 solid;
              }
            }
          }
        }
      }
    }
  }
</style>
