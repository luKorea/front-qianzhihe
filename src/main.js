import * as echarts from 'echarts';
import animated from 'animate.css';
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'



import '@/icons' // icon
import '@/permission' // permission control


import basicContainer from './components/basic-container/main';
import basicContainerBack from './components/back/index';
import basicStudentBack from './components/sutdentBack/index';
import basicPagination from './components/pagination/index';
import basicNothing from './components/nothing/index';
import basicSkeleton from './components/skeleton/index';


import * as filters from './utils/filters';

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$echarts = echarts;
Vue.component('basicContainer', basicContainer);
Vue.component('basicContainerBack', basicContainerBack);
Vue.component('basicStudentBack', basicStudentBack);
Vue.component('basicPagination', basicPagination);
Vue.component('basicNothing', basicNothing);
Vue.component('basicSkeleton', basicSkeleton);



Vue.directive('debounce', {
  inserted(el, binding, vnode) {
    console.log(el, binding, vnode, '防抖');
    let timer = {}
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 2000)
    })
  }
})

Vue.use(window.AVUE, {
  size: 'small',
  tableSize: 'small',
});
Vue.use(ELEMENT)
Vue.use(animated)

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
