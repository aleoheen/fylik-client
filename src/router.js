import Vue from 'vue'
import Router from 'vue-router'

import HomePage from './views/home.vue';
import AboutPage from './views/about.vue';
import ContactsPage from './views/contacts.vue';
import ErrorPage from './views/error.vue';

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage
		},
		{
			path: '/about',
			name: 'about',
			component: AboutPage
		},
		{
			path: '/contacts',
			name: 'contacts',
			component: ContactsPage
		},
		{
			path: '*',
			name: 'error',
			component: ErrorPage
		},
	]
})
