import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('./views/Dashboard.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('./views/Contact.vue')
        },
        {
            path: '/help',
            name: 'help',
            component: () => import('./views/Help.vue')
        },
        {
            path: '/submit',
            name: 'submit',
            component: () => import('./views/Submit.vue')
        },
        {
            path: '/app/:appId',
            name: 'app',
            component: () => import('./views/AppDetail.vue')
        }
    ]
})

const app = createApp(App);
app.use(router);  // 注册路由
app.mount('#app');