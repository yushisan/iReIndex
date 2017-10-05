// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

//默认样式清除及第三方图标引入
import './assets/css/style.css'
import './assets/less/font-awesome.less'
import './assets/css/font.less'


//引入animate.css动效库
import 'animate.css/animate.min.css'


new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})

