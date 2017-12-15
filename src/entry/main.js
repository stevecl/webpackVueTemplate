import '../assets/style/common'
import VueRouter from "vue-router";
import routerConfig from '../service/router/router';
import bus from '../service/bus';

import App from '../view/page/main/app';
// const App = require('../view/app.vue').default;
// const App = (resolve)=> {require(['../view/app.vue'], resolve)};

import bubble_hint from '../view/components/bubble_hint';
Vue.component('bubbleHint',bubble_hint);
Vue.component('loading',()=>System.import('../view/components/loading'));

import Vue from 'vue';
import axios from 'axios';
window.bus = bus;
Vue.prototype.$http = axios;

Vue.use(VueRouter);
// 创建路由实例
const router = new VueRouter({
    routes: routerConfig
});
window.bus = new Vue();

let vm = new Vue({
    router,
    render: h => h(App)
});
vm.$mount('#app');
