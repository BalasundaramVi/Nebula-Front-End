import Home from './components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'homeLink',
    component: Home,
  },
  { path: '*', redirect: '/' },
];

export default routes;
