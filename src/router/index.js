import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Member from '@/components/Member'
import PreviewStudent from '@/components/PreviewStudent'
import Diagram from '@/components/Diagram'
import DiagramList from '@/components/DiagramList'

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
			path: '/member',
			name: 'Member',
			component: Member
		},
		{
			path: '/preview/student/:id',
			name: 'PreviewStudent',
			component: PreviewStudent
		},
		{
			path: '/diagram',
			name: 'DiagramList',
			component: DiagramList
		},
		{
			path: '/diagram/:id',
			name: 'Diagram',
			component: Diagram
		}
	]
})