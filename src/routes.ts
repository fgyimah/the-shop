import { lazy } from 'react';
import { RouteConfig } from 'react-router-config';
import MainLayout from './layouts/MainLayout';

const routes: RouteConfig[] = [
	{
		path: '',
		component: MainLayout,
		routes: [
			{ path: '/', exact: true, component: lazy(() => import('./pages/Home')) },
			{
				path: '/cart',
				exact: true,
				component: lazy(() => import('./pages/Cart')),
			},
			{ path: '/products', exact: true, component: lazy(() => import('./pages/Home')) },
			{
				path: '/products/:id',
				exact: true,
				component: lazy(() => import('./pages/ProductDetail')),
			},
		],
	},
];

export default routes;
