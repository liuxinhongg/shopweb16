import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import page from '@/views/page'

Vue.use(Router)

const router = new Router({
        mode: "history",
        routes: [{
                path: '/',
                redirect: "/login"
            },
            {
                path: '/login',
                name: 'login',
                component: login
            },
            {
                path: '/register',
                name: 'register',
                component: register
            },
            {
                path: '/page',
                name: 'page',
                component: page
            }
        ]
    })
    // 导航守卫
    // 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');

        if (token === 'null' || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});
export default router;