import { createRouter, createWebHistory } from 'vue-router';
import SignUpView from '../views/SignUpView.vue';
import SignInView from '../views/SignInView.vue';
import TodosView from '../views/TodosView.vue';

let token = localStorage.getItem('authToken');
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodosView,
      beforeEnter: (to, from, next) => {
        if (token) {
          next();
        } else {
          next('/signin');
        }
      },
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
  ],
});

export default router;
