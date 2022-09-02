import Vue from 'vue'
import Dev from './Dev.vue'
import Mock from '../mocks'
import { vfmPlugin } from 'vue-final-modal'

Mock.init()
Vue.config.productionTip = false
Vue.use(vfmPlugin)

new Vue({
  render: (h) => h(Dev),
}).$mount('#app')
