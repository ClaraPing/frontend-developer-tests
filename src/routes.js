import { lazy } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';
const TestPage = lazy(()=> import('@/pages/TestPage'));

const routerConfig = [
  {
    path: '/Clara',
    component: BasicLayout,
    children: [

      {
        path: '/TestPage',
        component: TestPage
      },

      {
        path: '/',
        redirect: '/Clara/TestPage'
      }
    ],
  },
  {
    path: '/',
    redirect: '/Clara'
  },
];

export default routerConfig;
