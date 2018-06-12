import './assets/style/reset.less'
import './assets/style/common.css'

import Vue from 'vue';
import App from './views/app.vue'
import router from './serves/router'
import util from './serves/utils/util'
import eventBus from './serves/utils/bus'

window.util = util;
window.Bus = eventBus;

let vm = new Vue({
	// el: '#app',
	router,
	render: h => h(App)
});

// console.log('PRODUCTION:', PRODUCTION);
vm.$mount('#app');