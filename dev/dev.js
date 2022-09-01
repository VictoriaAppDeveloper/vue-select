import Vue from 'vue'
import Dev from './Dev.vue'
import Mock from '../mocks'

Mock.init()
Vue.config.productionTip = false

new Vue({
  render: (h) => h(Dev),
}).$mount('#app')
