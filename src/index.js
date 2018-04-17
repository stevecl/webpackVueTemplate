import './assets/style/reset.sass'
import './assets/style/common.css'

import Vue from 'vue';
import App from './views/app.vue'

var vm = new Vue({
  // el: '#app',
  data() {
    return {
      imgUrl: '啊实打实的'
    }
  },
  mounted(){
    console.log('test')
  },
  render: h => h(App)
})

console.log('PRODUCTION:',PRODUCTION)
vm.$mount('#app');
