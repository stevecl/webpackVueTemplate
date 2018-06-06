<template>
  <!--主要容器开始-->
  <div id="select-stock-container" :style="{'top':po_top+'px', 'left':po_left+'px'}" v-show="isShow">
    <div class="stock">
      <div class="change-month">
        <img src="../../assets/images/stock-arrow.png"
             @click="prevMonth">
        <img src="../../assets/images/stock-arrow.png"
             @click="nextMonth">
        <div>{{cur_year}}年 {{cur_month+1}}月</div>
      </div>
      <div class="select-date-box">
        <ul>
          <li class="orange">日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li class="orange">六</li>
        </ul>
        <ul v-for="rows in dateList">
          <li :class="{'not-select': col.attr === 'false'}"
              v-for="(col, idx) in rows"
              @click="selectedDate(col)">
            {{col.date | parseDate}}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!--主要容器结束-->
</template>

<script>
  let vm; //留住this
  export default {
    name: 'selectDates', //定义模块名称
    props: {

    },
    data() {
      return {
        dateList: [],
        checkList: [],

        po_top: 300,
        po_left: 400,
        cur_month: 3,  // 0-11
        cur_year: 2018,
        cur_date: 28,
        isOneMonth: true, // 是否只显示当前月份

        minDate: '1970-1-1', // 日期选择范围 default
        maxDate: '3000-12-28',

        isShow: false,
        backResult: null
      } //定义模块变量
    },
    methods: {
      // 设置参数
      init(option) {
        let date = option.date ? new Date(option.date) : new Date();
        vm.po_top = option.top || vm.po_top;
        vm.po_left = option.left || vm.po_left;
        vm.cur_year = date.getFullYear();
        vm.cur_month = date.getMonth();
        vm.cur_date = date.getDate();
        vm.minDate = option.minDate || vm.minDate;
        vm.maxDate = option.maxDate || vm.maxDate;
        !option.isOneMonth && (vm.isOneMonth = false);
        vm.backResult = option.callback;
        vm.render();
      },
      // 根据日期生成所需数据列表
      render() {
        vm.dateList = [];
        let year = vm.cur_year,
            month = vm.cur_month,
            fullDay = new Date(year, month + 1, 0).getDate(), //当月总天数
            startWeek = new Date(year, month, 1).getDay(), //当月第一天是周几
            total = (fullDay + startWeek) % 7 === 0 ? (fullDay + startWeek) : fullDay + startWeek + (7 - (fullDay + startWeek) % 7),//元素总个数
            lastMonthDay = new Date(year, month, 0).getDate(), //上月最后一天
            eleTemp = [];
        for (let i = 0; i < total; i++) {
          if (i < startWeek) {
            vm.isOneMonth ? eleTemp.push(' ') : eleTemp.push(new Date(year, month - 1, lastMonthDay - startWeek + 1 + i).format('yyyy-MM-dd'))
          } else if (i < (startWeek + fullDay)) {
            let _day = i + 1 - startWeek;
            eleTemp.push(new Date(year, month, _day).format('yyyy-MM-dd'))
          } else {
            vm.isOneMonth ? eleTemp.push(' ') : eleTemp.push(new Date(year, month + 1, i + 1 - (startWeek + fullDay)).format('yyyy-MM-dd'))
          }
        }
        // console.log('当月总日：',eleTemp);
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
        let _year = new Date(date).getFullYear(),
            _month = new Date(date).getMonth(),
            _day = new Date(date).getDate();
        if (date === ' ' || _year !== vm.cur_year || _month !== vm.cur_month) {
          return false
        }
        let min_date = new Date(vm.minDate);
        let max_date = new Date(vm.maxDate);
        // 默认时间比对 参考为当天 00:00:00
        let nowTime = new Date(min_date.getFullYear(), min_date.getMonth(), min_date.getDate(), 0, 0, 0).getTime();
        let endTime = new Date(max_date.getFullYear(), max_date.getMonth(), max_date.getDate(), 0, 0, 0).getTime();
        let comTime = new Date(_year, _month, _day).getTime();
        // console.log('date:',date, comTime >= nowTime);
        return comTime >= nowTime && comTime <= endTime;
      },
      // 判断el元素是否是root元素的后代
      judge(root, el) {
        if (root.compareDocumentPosition)
          return root === el || !!(root.compareDocumentPosition(el) & 16);
        if (root.contains && el.nodeType === 1) {
          return root.contains(el) && root !== el;
        }
        while ((el = el.parentNode))
          if (el === root) return true;
        return false;
      },
      nextMonth() {
        vm.cur_month += 1;
        vm.cur_month === 12 && vm.cur_year++ && (vm.cur_month = 0);
        vm.render();
      },
      prevMonth() {
        vm.cur_month -= 1;
        vm.cur_month === -1 && vm.cur_year-- && (vm.cur_month = 11);
        vm.render();
      },
      // 选择日期
      selectedDate(col) {
        if (col.attr === 'false') {
          return
        }
        vm.backResult && vm.backResult(col.date);
        vm.isShow = false;
      },
      show(option){
        vm.init(option);
        vm.isShow = true
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
      vm.$root.$on('selectDate', function (opt) {
        vm.show(opt);
        // if (opt.callback && typeof opt.callback === 'function') {
        //   vm.goResult = opt.callback;
        // }
      });

      let ele = document.getElementById('select-stock-container');
      // 点击其它区域  隐藏日期选择框
      document.addEventListener('click', function (e) {
        if (!vm.judge(ele, e.target)) {
          vm.isShow = false;
        }
      }, true);
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
        return value.split('-')[2]
      }
    }
  }
</script>
<style scoped lang="scss">
  #select-stock-container {
    position: fixed;
    .stock {
      width: 240px;
      font-size: 14px;
      float: left;
      .change-month {
        width: 100%;
        height: 30px;
        line-height: 30px;
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
      .select-date-box{
        ul{
          li{
            float: left;
            height: 35px;
            line-height: 35px;
            width: 14.28%;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
            border-right: 1px solid #e6e6e6;
            border-bottom: 1px solid #e6e6e6;
          }
          li.not-select{
            cursor: default;
            color: #B7B4B4;
          }
          li:first-of-type{
            border-left: 1px solid #e6e6e6;
          }
          li.orange{
            color: #FF7624;
          }
        }
      }
    }
  }
</style>
