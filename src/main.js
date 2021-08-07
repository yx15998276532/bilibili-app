import Vue from 'vue'
import { Icon } from 'element-ui';
import App from './App.vue'

Vue.config.productionTip = false

Vue.component(Icon.name, Icon);

new Vue({
  render: h => h(App),
}).$mount('#app')