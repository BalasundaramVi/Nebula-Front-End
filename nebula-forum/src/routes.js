import Home from './components/Home.vue';
import Authentication from './components/Authentication.vue'
import Questions from './components/Questions.vue';
import Add from './components/Add.vue';

const routes = [
  {
    path: '/',
    name: 'homeLink',
    component: Home,
  },
  {
    path: '/authentication',
    name: 'authenticationLink',
    component: Authentication,
  },
  {
    path: '/questions',
    name: 'questionLink',
    component: Questions,
  },
  {
    path: '/addQuestion',
    name: 'addLink',
    component: Add,
  },
  { path: '*', redirect: '/' },
];

export default routes;
