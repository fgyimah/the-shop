import { lazy } from 'react';
import { RouteConfig } from 'react-router-config';
import MainLayout from './layouts/MainLayout';

const routes: RouteConfig[] = [
	{
		path: '',
		component: MainLayout,
		routes: [{ path: '/', exact: true, component: lazy(() => import('./pages/Home')) }],
	},
];

export default routes;
