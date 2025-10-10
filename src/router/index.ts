import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import AppDetail from '../views/AppDetail.vue';
import Help from '../views/Help.vue';
import Submit from '../views/Submit.vue';
import Contact from '../views/Contact.vue';

// 路由规则
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard'  // 根路径重定向到仪表板
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: '华为应用市场看板'
    }
  },
  {
    path: '/app/:appId',  // 动态路由参数：应用ID
    name: 'AppDetail',
    component: AppDetail,
    meta: {
      title: '应用详情 | 华为应用市场看板'
    },
    props: true  // 将路由参数映射为组件props
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
    meta: {
      title: '帮助信息 | 华为应用市场看板'
    }
  },
  {
    path: '/submit',
    name: 'Submit',
    component: Submit,
    meta: {
      title: '投稿 | 华为应用市场看板'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: '问题反馈 | 华为应用市场看板'
    }
  },
  // 所有未匹配的路由重定向到静态404页面
  {
    path: '/:pathMatch(.*)*',
    beforeEnter: (to, from, next) => {
      // 跳转到静态404页面（需放在public目录）
      window.location.href = '/404.html';
    }
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // 使用HTML5 history模式
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    // 页面跳转时滚动到顶部
    return savedPosition || { top: 0 };
  }
});

// 全局前置守卫：设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default router;