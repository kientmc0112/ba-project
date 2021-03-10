import Vue from 'vue'
import Router from 'vue-router'
import token from '@/utils/token'

Vue.use(Router)

function page(path) {
  return () => import(`@/pages/${path}`).then(m => m.default || m);
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: page('Home')
    },
    {
      path: '/login',
      name: 'login',
      component: page('auth/Login')
    },
    {
      path: '/register',
      name: 'register',
      component: page('auth/Register'),
      meta: {
        middleware: 'auth'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['login', 'register'];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = token.getToken();
  if (authRequired && !loggedIn) {
    return next({ name : 'login' });
  } else if (!authRequired && loggedIn) {
    return next({ name : 'home' });
  }
  // if (authRequired) {

  // }
  next();
});

export default router