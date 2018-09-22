import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Member from '@/components/Member'
import PreviewStudent from '@/components/PreviewStudent'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'dashboard',
			component: Dashboard
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/member',
			name: 'Member',
			component: Member
		},
		{
			path: '/preview/student/:id',
			name: 'PreviewStudent',
			component: PreviewStudent
		}
	]
})