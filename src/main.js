import * as echarts from 'echarts';
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'


import '@/icons' // icon
import '@/permission' // permission control


import basicContainer from './components/basic-container/main';
import basicContainerBack from './components/back/index';
import basicPagination from './components/pagination/index';
import basicNothing from './components/nothing/index';


import * as filters from './utils/filters';

Object.keys(filters).forEach(key => {
  console.log(key, 'key');
  Vue.filter(key, filters[key])
})

Vue.prototype.$echarts = echarts;
Vue.component('basicContainer', basicContainer);
Vue.component('basicContainerBack', basicContainerBack);
Vue.component('basicContainerBack', basicContainerBack);
Vue.component('basicPagination', basicPagination);
Vue.component('basicNothing', basicNothing);

Vue.use(window.AVUE, {
  size: 'small',
  tableSize: 'small',
});
Vue.use(ELEMENT)

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
