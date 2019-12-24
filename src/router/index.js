import Vue from 'vue'
import Router from 'vue-router'
// import { resolve } from 'dns';

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  mode: "history",
  routes: [
    { //跳转游戏中间页
      path: '/rgs',
      name: 'Rgs',
      component: resolve => require(['@/view/common/rgsflex'], resolve),
      meta: {
        keepAlive: true
      }
    },
    { //首页
      path: '/',
      name: 'Index',
      component: resolve => require(['@/view/index'], resolve)
    },

    {
      path: '/new',  //新人专区
      name: 'New',
      component: resolve => require(['@/view/news/news'], resolve)
    },
    {
      path: '/game', //试玩专区
      component: resolve => require(['@/view/game/game'], resolve),
      children: [
        {
          path: '/',
          name: 'GameIndex',
          component: resolve => require(['@/view/game/index'], resolve),
        },
        {
          path: 'details',
          name: 'GameDetails',
          component: resolve => require(['@/view/common/details'], resolve)
        },
      ]
    },
    {
      path: '/card',//棋牌试玩
      component: resolve => require(['@/view/card/card'], resolve),
      children: [
        {
          path: '/',
          name: 'CardIndex',
          component: resolve => require(['@/view/card/index'], resolve),
        },
        {
          path: 'details',
          name: 'CardDetails',
          component: resolve => require(['@/view/common/details'], resolve)
        }
      ]
    },
    {
      path: '/fun',//娱乐大厅
      name: 'Fun',
      component: resolve => require(['@/view/fun/fun'], resolve),
    },
    { //28页面
      path: '/fun/fun28',
      name: 'Fun28',
      redirect: { name: 'Fun28Index' },
      component: resolve => require(['@/view/fun/fun28/fun28'], resolve),
      children: [
        {
          path: '/fun/fun28/index',
          name: 'Fun28Index',
          component: resolve => require(['@/view/fun/fun28/fun28index'], resolve),
        },
        {
          path: '/fun/fun28/trend',
          name: 'Fun28Trend',
          component: resolve => require(['@/view/fun/fun28/fun28trend'], resolve),
        },
        {
          path: '/fun/fun28/methods',
          name: 'Fun28Methods',
          component: resolve => require(['@/view/fun/fun28/fun28methods'], resolve),
        },
        {
          path: '/fun/fun28/details',
          name: 'Fun28Details',
          component: resolve => require(['@/view/fun/fun28/fun28details'], resolve),
        },
        {
          path: '/fun/fun28/auto',
          name: 'Fun28Auto',
          component: resolve => require(['@/view/fun/fun28/fun28auto'], resolve),
        },
        {
          path: '/fun/fun28/fun28bet',
          name: 'Fun28Bet',
          component: resolve => require(['@/view/fun/fun28/fun28bet'], resolve),
        },
        {
          path: '/fun/fun28/fun16bet',
          name: 'Fun16Bet',
          component: resolve => require(['@/view/fun/fun28/fun16bet'], resolve),
        },
        {
          path: '/fun/fun28/fun28result',
          name: 'Fun28Result',
          component: resolve => require(['@/view/fun/fun28/fun28result'], resolve),
        }
      ]
    },
    {//抽奖中心
      path: '/fun/mall',
      name: 'FunMall',
      redirect: { name: 'HappyDraw' },
      component: resolve => require(['@/view/fun/mall/mall'], resolve),
    },

    { //兑换奖品
      path: '/fun/mall/details',
      name: 'FunMallDetails',
      component: resolve => require(['@/view/fun/mall/details'], resolve),
    },
    {//VIP页面
      path: '/vip',
      name: 'Vip',
      component: resolve => require(['@/view/vip/vip'], resolve)
    },

    // {//活动1 //已关闭活动
    //   path:'/activity/firstmall',
    //   name:'FirstMall',
    //   component: resolve => require(['@/view/activity/star/firstmall'],resolve),
    //   meta:{
    //     keepAlive: true
    //   }
    // },
    // {//活动2 //已关闭活动
    //   path:'/activity/secondmall',
    //   name:'SecondMall',
    //   component: resolve => require(['@/view/activity/star/secondmall'],resolve),
    //   meta:{
    //     keepAlive: true
    //   }
    // },
    // {//活动3 //已关闭活动
    //   path: '/activity/thirdmall',
    //   name: 'ThirdMall',
    //   component: resolve => require(['@/view/activity/star/thirdmall'], resolve),
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    // 活动4 //已关闭活动
    // {
    //   path: '/activity/fourmall',
    //   name: 'Fourmall',
    //   redirect: { name: 'FourmallIndex' },
    //   component: resolve => require(['@/view/activity/star/fourmall'], resolve),
    //   children: [
    //     {
    //       //活动4首页
    //       path: '/',
    //       name: 'FourmallIndex',
    //       component: resolve => require(['@/view/activity/newactivity/index'], resolve),
    //       meta: {
    //         keepAlive: true
    //       }
    //     },
    //     {
    //       //文字素材详情页
    //       path: '/activity/fourmall/fontdetail',
    //       name: 'Fontdetail',
    //       component: resolve => require(['@/view/activity/newactivity/fontdetail'], resolve),
    //       meta: {
    //         keepAlive: true
    //       }
    //     },
    //     {
    //       //上传页面
    //       path: '/activity/fourmall/upload',
    //       name: 'Upload',
    //       component: resolve => require(['@/view/activity/newactivity/upload'], resolve),
    //       meta: {
    //         keepAlive: true
    //       }
    //     }
    //   ]
    // },
    {//活动5
      path: '/activity/fivemall',
      name: 'FiveMall',
      component: resolve => require(['@/view/activity/star/fivemall'], resolve),
    },
    // 下载落地页
    {
      path:'/activity/download',
      name:'Download',
      component:resolve => require(['@/view/activity/download/index'], resolve),
      meta: {
          keepAlive: true
      }
    },
    // {//老用户回归 //已关闭活动
    //   path: '/activity/oldfriend',
    //   name: 'OldFriend',
    //   component: resolve => require(['@/view/activity/oldfriend/index'], resolve),
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    //开宝箱活动
    {
      path:'/activity/treasure',
      name:'OpenBox',
      component: resolve => require(['@/view/activity/openbox/index'], resolve),
      meta:{
        keepAlive:true
      }
    },
    //召唤远古神灵活动
    {
      path:'/activity/ancient',
      name:'Ancient',
      component: resolve => require(['@/view/activity/ancient/index'], resolve),
      meta:{
        keepAlive:true
      }
    },
    //solo活动
    {
      path:'/activity/recreation',
      name:'Recreation',
      component: resolve => require(['@/view/activity/recreation/index'], resolve),
      meta:{
        keepAlive:true,
        act:true
      }
    },
    // {//整点福利卡 //已关闭活动
    //   path: '/activity/timecard',
    //   name: 'TimeCard',
    //   component: resolve => require(['@/view/activity/timecard/index'], resolve),
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    {//抽奖新
      path: '/activity/happydraw',
      name: 'HappyDraw',
      component: resolve => require(['@/view/activity/happydraw/index'], resolve),
    },
    {//活动5
      path: '/activity/forge',
      name: 'Forge',
      component: resolve => require(['@/view/activity/forge/index'], resolve),
      meta: {
        keepAlive: true
      }
    },
    // { //活动 //已关闭活动
    //   path: '/activity',
    //   name: 'Activity',
    //   component: resolve => require(['@/view/activity/star/index'], resolve),
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    // {
    //   //中秋活动 //已关闭活动
    //   path: '/activity/midautumn',
    //   name: 'Autumn',
    //   component: resolve => require(['@/view/activity/midautumn/index'], resolve),
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    // {
    //   //每日有赏 //已关闭活动
    //   path: '/activity/dayreward',
    //   name: 'DayReward',
    //   component: resolve => require(['@/view/activity/dayreward/index'], resolve),
    //   meta: {
    //     keepAlive: true
    //   }
    // },


    {//个人中心
      path: '/personal',
      name: 'Personal',
      redirect: { name: 'PersonalDetails' },
      component: resolve => require(['@/view/personal/personal'], resolve),
      children: [
        { //游戏试玩
          path: '/personal/Details',
          name: 'PersonalDetails',
          component: resolve => require(['@/view/personal/child/game'], resolve),
        },
        { //棋牌试玩
          path: '/personal/card',
          name: 'PersonalCard',
          component: resolve => require(['@/view/personal/child/card'], resolve),
        },
        { //影视专区
          path: '/personal/video',
          name: 'PersonalVideo',
          component: resolve => require(['@/view/personal/child/video'], resolve),
        },
        { //任务
          path: '/personal/task',
          name: 'PersonalTask',
          component: resolve => require(['@/view/personal/child/task'], resolve),
        },
        { //用户账户
          path: '/personal/award',
          name: 'PersonalAward',
          component: resolve => require(['@/view/personal/child/award'], resolve),
        },
        { //兑换
          path: '/personal/cash',
          name: 'PersonalCash',
          component: resolve => require(['@/view/personal/child/cash'], resolve),
        },
        { //我的奖品
          path: '/personal/prize',
          name: 'PersonalPrize',
          component: resolve => require(['@/view/personal/child/prize'], resolve),
        },
        { //vip管理
          path: '/personal/vip',
          name: 'PersonalVip',
          component: resolve => require(['@/view/personal/child/vip'], resolve),
        },
        {
          path: '/personal/safe',
          name: 'PersonalSafe',
          component: resolve => require(['@/view/personal/child/safe'], resolve),
          redirect: { name: 'SafeIndex' },
          children: [
            {//安全中心
              path: '/safe/index',
              name: 'SafeIndex',
              component: resolve => require(['@/view/personal/safe/index'], resolve),
            },
            {//修改密码
              path: '/safe/passwd',
              name: 'SafePassWd',
              component: resolve => require(['@/view/personal/safe/passwd'], resolve),
            },
            { //绑定邮箱
              path: '/safe/email',
              name: 'SafeEmail',
              component: resolve => require(['@/view/personal/safe/email'], resolve),
            },
            { //绑定身份信息
              path: '/safe/identity',
              name: 'SafeIdentity',
              component: resolve => require(['@/view/personal/safe/identity'], resolve),
            },
            { //联系地址
              path: '/safe/address',
              name: 'SafeAddress',
              component: resolve => require(['@/view/personal/safe/address'], resolve),
            },
            { //绑定手机
              path: '/safe/phone',
              name: 'SafePhone',
              component: resolve => require(['@/view/personal/safe/phone'], resolve),
            },
            { //用户头像
              path: '/safe/userhead',
              name: 'UserHead',
              component: resolve => require(['@/view/personal/safe/userhead'], resolve),
            },
            { //修改昵称
              path: '/safe/nickname',
              name: 'Nickname',
              component: resolve => require(['@/view/personal/safe/nickname'], resolve),
            }
          ]
        }
      ]
    },
    { //好友招募
      path: '/recruit',
      name: 'Recruit',
      component: resolve => require(['@/view/recruit/recruit'], resolve)
    },
    { //推广范文，详情
      path: '/recruit/example',
      name: 'RecruitExample',
      component: resolve => require(['@/view/recruit/example'], resolve)
    },

    { //客服中心
      path: '/service',
      name: 'Service',
      component: resolve => require(['@/view/service/service'], resolve)
    },
    { //客服中心详情页
      path: '/service/details',
      name: 'ServiceDetails',
      component: resolve => require(['@/view/service/details'], resolve)
    },
    { //忘记密码
      path: '/forgetpass',
      name: 'ForgetPass',
      component: resolve => require(['@/view/personal/safe/forgetpass'], resolve)
    },
    { //公告详情
      path: '/noticelist',
      name: 'NoticeList',
      component: resolve => require(['@/view/common/noticelist'], resolve)
    },
    { //公告xiangqingye 
      path: '/noticelist/details',
      name: 'NoticeDetails',
      component: resolve => require(['@/view/common/noticedetails'], resolve)
    },
    { //后台登录前台
      path: '/backindexgofront',
      name: 'BackIndex',
      component: resolve => require(['@/view/backindex'], resolve),
      meta: {
        keepAlive: true
      }
    },
    { //服务协议
      path: '/protocal',
      name: 'Protocal',
      component: resolve => require(['@/view/common/protocal'], resolve),
    },
    { //联系我们
      path: '/connectme',
      name: 'Connectme',
      component: resolve => require(['@/view/common/connectme'], resolve),
    },
    //影视专区
    {
      path: '/video',
      name: 'Video',
      redirect: { name: 'VideoHome' },
      component: resolve => require(['@/view/video'], resolve),
      children: [
        {//主页
          path: '/video/home',
          name: 'VideoHome',
          component: resolve => require(['@/view/video/home'], resolve),
        },
        {
          path: '/video/details',
          name: 'VideoDeatils',
          component: resolve => require(['@/view/video/details'], resolve),
        }
      ]
    },
    {
      path: '*',
      component: resolve => require(['@/view/index'], resolve)
    }
  ]
})
