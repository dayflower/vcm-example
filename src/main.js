import Vue from 'vue'
import '@/plugins/bootstrap-vue'
import '@/plugins/vue-codemirror'
import App from '@/App.vue'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
