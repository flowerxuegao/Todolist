import App from '../App';

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const write = r => require.ensure([], () => r(require('../page/write/write')), 'write');
const my = r => require.ensure([], () => r(require('../page/my/my')), 'my');
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login');
const reg = r => require.ensure([], () => r(require('../page/login/reg')), 'reg');

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //备忘录
        {
            path: '/home',
            component: home
        },
        //备忘录
        {
         path: '/my',
          component: my
        },
        //写入
        {
          path: '/write',
          component: write
        },
        //登录
        {
          path: '/login',
          component: login
        },
        //注册
        {
          path: '/reg',
          component: reg
        },
    ]
}]
