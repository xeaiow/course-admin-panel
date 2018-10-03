import Vue from 'vue'
import App from './App'
import router from './router'
import HighchartsVue from 'highcharts-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JsonExcel from 'vue-json-excel'
 
Vue.use(VueAxios, axios)
Vue.component('downloadExcel', JsonExcel)

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'


Vue.use(HighchartsVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
