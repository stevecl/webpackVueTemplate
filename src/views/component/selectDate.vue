<template>
  <div class="select-date-container" :style="{'top':po_top+'px', 'left':po_left+'px'}">
    <div id='select-date-box' class="boxshaw">
    </div>
  </div>
</template>

<script>
  /*
	// 调用 selectDate.show()
	已在根实例上注册，调用:  this.$root.$emit('selectDate', opt)
	参数opt
		{
			date: string 日期初始值(格式  y-m-d || yyyy-mm-dd)
			min: string 日期选择最小值 格式和日期格式相同
			max: string 日期选择最大值
			left: number 初始位置
			top: number
			callback: function(value){} 选择日期后的回调函数，return '2018-4-28'
		}
  */
  import Schedule from './selectDate.js';

  let vm;
  export default {
    data() {
      return {
        name: "selectDate",
        po_top: 100,
        po_left: 100,
        mySchedule: null,
        date: ''
      }
    },
    beforeCreate() {//el 和 data 并未初始化
      vm = this//留住this
    },
    mounted() {
      vm.init();
      vm.$root.$on('selectDate', function (opt) {
        vm.show(opt)
      })
    },
    methods: {
      init() {
        // 初始化
        let ele = document.getElementById('select-date-box');
        vm.mySchedule = new Schedule({
          el: '#select-date-box',
          clickCb: function (y, m, d) {
            vm.date = y + '-' + m + '-' + d;
            vm.goResult && vm.goResult(vm.date);
          }
        });
        // 点击其它区域  隐藏日期选择框
        document.addEventListener('click', function (e) {
          if (!vm.judge(ele, e.target)) {
            ele.style.display = 'none';
          }
        }, true)
      },
      show(opt) {
        vm.po_top = opt.top || 0;
        vm.po_left = opt.left || 0;
        if (opt.callback && typeof opt.callback === 'function') {
          vm.goResult = opt.callback;
        }
        // 防止因位置坐标变化引起的闪动效果
        vm.$nextTick(() => {
          vm.mySchedule && vm.mySchedule.setDate(opt)
        })
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
      }
    }
  }
</script>

<style>
  .select-date-container {
    position: fixed;
    z-index: 99999;
  }
  #select-date-box ul {
    list-style: none;
  }
  #select-date-box {
    width: 240px;
    font-size: 14px;
    display: none;
    background-color: #fff;
  }
  #select-date-box .schedule-hd {
    height: 28px;
    line-height: 28px;
    background-color: #3E81D3;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
  }
  #select-date-box .today {
    flex: 1;
    text-align: center;
  }
  #select-date-box .ul-box {
    overflow: hidden;
  }
  #select-date-box .ul-box > li {
    float: left;
    width: 14.28%;
    box-sizing: border-box;
    text-align: center;
    border-bottom: 1px solid #E0E0E0;
    border-right: 1px solid #E0E0E0;
  }
  #select-date-box .week-ul li {
    height: 24px;
    line-height: 24px;
    border: none;
    border-bottom: 1px solid #E0E0E0;
  }
  #select-date-box .other-month {
    color: #999999;
  }
  #select-date-box .other-month span {
    color: #fff;
    cursor: default;
  }
  #select-date-box .current-month {
    color: #333333;
  }
  #select-date-box .today-style {
    border-radius: 50%;
    background: #FF7624;
  }
  #select-date-box .arrow {
    cursor: pointer;
  }
  #select-date-box .disabled-date {
    background: 0 0 !important;
    color: #d2d2d2 !important;
    cursor: not-allowed !important;
  }
  #select-date-box .dayStyle {
    display: inline-block;
    width: 35px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
  }
  #select-date-box .current-month > .dayStyle:hover {
    background: #FF7624;
    color: #ffffff;
  }
  #select-date-box .today-flag {
    background: #FF7624;
    color: #fff;
  }
  #select-date-box .boxshaw {
    box-shadow: 2px 2px 15px 2px #e3e3e3;
  }
  #select-date-box .selected-style {
    background: #FF7624;
    color: #ffffff;
  }
  #select-date-box #nextMonth {
    position: relative;
    cursor: pointer;
    right: 10px;
  }
  #select-date-box #nextMonth:after, #nextMonth:before {
    border: 7px solid transparent;
    border-left: 9px solid #3E81D3;
    width: 0;
    height: 0;
    position: absolute;
    top: 7px;
    right: -18px;
    content: ' ';
  }
  #select-date-box #nextMonth:before {
    border-left-color: #fff;
    right: -20px;
  }
  #select-date-box #prevMonth {
    position: relative;
    cursor: pointer;
    left: 10px;
  }
  #select-date-box #prevMonth:after, #prevMonth:before {
    border: 7px solid transparent;
    border-right: 9px solid #3E81D3;
    width: 0;
    height: 0;
    position: absolute;
    top: 7px;
    left: -18px;
    content: ' ';
  }
  #select-date-box #prevMonth:before {
    border-right-color: #fff;
    left: -20px;
  }
</style>
