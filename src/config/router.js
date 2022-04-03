import Vue from 'vue'
import Router from 'vue-router'
import tpl from '@/views/tpl'
import view404 from '@/views/view404'

import userCenter from '@/views/userCenter'
import userInfo from '@/views/userInfo'
import memberLevel from '@/views/memberLevel'
import accountBalance from '@/views/accountBalance'
// import virtualIntegral from '@/views/virtualIntegral'
import accountPoints from '@/views/accountPoints'
import pointsDetails from '@/views/pointsDetails'
import accountCoupon from '@/views/accountCoupon'
import secondhandGoods from '../views/secondhandGoods/secondhandGoods'
import index from '../views/index'
import log_on from "../views/info/log_on";
import addGoods from "../views/secondhandGoods/addGoods";
import schollShopGoods from "../views/shopGoods/schollShopGoods";
import localtionPage from "../views/shopGoods/localtionPage";
import createNewLocaltion from "../views/shopGoods/createNewLocaltion";
import createNewOrder from "../views/shopGoods/createNewOrder";
import myOrder from "../views/myOrder";

Vue.use(Router);

// 默认重定向路由
const defaultRouter = [{
  path: '/',
  name: 'tpl',
  component: tpl,
  meta: {
    title: '项目模板'
  }
}];

// views路由集合
const routerList = [{
  path: '/userCenter',
  name: 'userCenter',
  component: userCenter,
  meta: {
    title: '用户中心'
  }
},
  {
    path: '/localtionPage',
    name: 'localtionPage',
    component: localtionPage,
    meta: {
      title: '收货地址'
    }
  },  {
    path: '/createNewOrder',
    name: 'createNewOrder',
    component: createNewOrder,
    meta: {
      title: '确认订单'
    }
  }, {
    path: '/myOrder',
    name: 'myOrder',
    component: myOrder,
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/createNewLocaltion',
    name: 'createNewLocaltion',
    component: createNewLocaltion,
    meta: {
      title: '收货地址编辑'
    }
  },
  {
  path: '/userInfo',
  name: 'userInfo',
  component: userInfo,
  meta: {
    title: '用户信息'
  }
}, {
  path: '/memberLevel',
  name: 'memberLevel',
  component: memberLevel,
  meta: {
    title: '会员等级'
  }
}, {
  path: '/accountPoints',
  name: 'accountPoints',
  component: accountPoints,
  meta: {
    title: '用户积分'
  }
}, {
  path: '/pointsDetails',
  name: 'pointsDetails',
  component: pointsDetails,
  meta: {
    title: '积分明细'
  }
}, {
  path: '/accountCoupon',
  name: 'accountCoupon',
  component: accountCoupon,
  meta: {
    title: '优惠券'
  }
}, {
  path: '/accountBalance',
  name: 'accountBalance',
  component: accountBalance,
  meta: {
    title: '账户余额'
  }
},
  {
    path: '/secondhandGoods',
    name: 'secondhandGoods',
    component: secondhandGoods,
    meta: {
      title: '二手商品'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'log_on',
    component: log_on,
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/addGoods',
    name: 'addGoods',
    component: addGoods,
    meta: {
      title: '发布商品'
    }
  },
  {
    path: '/shopGoods',
    name: 'shopGoods',
    component: schollShopGoods,
    meta: {
      title: '宿舍网店'
    }
  }
];

// 页面404路由
const errorRouter = [{
  path: '/*',
  name: 'view404',
  component: view404,
  meta: {
    title: '网页走丢了'
  }
}];

const router = new Router({
  routes: defaultRouter.concat(routerList.concat(errorRouter))
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  next()
});

export default router
