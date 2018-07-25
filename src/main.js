// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/style/reset.less'
import './assets/style/common.css'

import Vue from 'vue'
import App from './App'
import router from './servies/router'
import util from './servies/utils/util'
import eventBus from './servies/utils/bus'

window.util = util;
window.Bus = eventBus;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
