import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/view/Home'
import AppPage from '@/view/AppPage'
import PcPage from '@/view/PcPage'
import VideoPage from '@/view/VideoPage'
import DevicePage from '@/view/DevicePage'
import MyDetail from '@/view/MyDetail'

Vue.use(Router)

export default new Router({
	// mode: 'history',
	// base: '/iReIndex/',
	// history模式里用，要不然找不到文件夹，因为不是#号判断
	routes: [
		{
			path: '/',
			redirect: '/Home',
		},
		{
			path: '/Home',
			name: 'Home',
			component: Home
		},
		{
			path: '/App',
			name: 'AppPage',
			component: AppPage
		},
		{
			path: '/PC',
			name: 'PcPage',
			component: PcPage
		},
		{
			path: '/Video',
			name: 'VideoPage',
			component: VideoPage
		},
		{
			path: '/Device',
			name: 'DevicePage',
			component: DevicePage
		},
		// {
		// 	path: '/detail',
		// 	name: 'AppDetail',
		// 	component: MyDetail,

		// }
		{
			path: '/PC/detail',
			name: 'PCDetail',
			component: MyDetail,

		},
		{
			path: '/App/detail',
			name: 'AppDetail',
			component: MyDetail,

		}
		
	]
})