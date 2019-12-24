import router from './router'
import { getToken, removeToken } from '@/utils/auth' // get token from cookie
import store from './store/index'
const whiteList = [
  'PersonalDetails',
  'PersonalCard',
  'PersonalTask',
  'PersonalAward',
  'PersonalCash',
  'PersonalPrize',
  'PersonalVideo',
  'PersonalVip',
  'PersonalSafe',
  'SafeIndex',
  'SafePassWd',
  'SafeEmail',
  'SafeIdentity',
  'SafeAddress',
  'SafePhone',
  'Fun28Index',
  'Fun28Trend',
  'Fun28Methods',
  'Fun28Details',
  'Fun28Auto',
  'Fun28Bet',
  'Fun16Bet',
  'FunMall',
  'Fun',
  'VideoDeatils',
  'TimeCard'
] // no redirect whitelist
const blackList = [
  'Fun28Index',
  'Fun28Trend',
  'Fun28Methods',
  'Fun28Details',
  'Fun28Auto',
  'Fun28Bet',
  'Fun16Bet',
  'FunMall',
  'Fun'
]
router.beforeEach((to, from, next) => {
  //   determine whether the user has logged in
  const hasToken = getToken('ttz_token')
  if (hasToken) {
    store.dispatch('user/getInfo')
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: from.path })
    } else {
      if (blackList.indexOf(to.name) == -1) {
        next()
      } else {
        if (getToken('ttz_hmd') == 'true') {
          next('/')
        } else {
          next()
        }
      }
    }
  } else {
    // /* has no token*/
    if (whiteList.indexOf(to.name) == -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      next('/')
      store.commit('app/getLoginBox', true)
      store.commit('app/setLoginOrReg', true)
      //   other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      // next(`/`)
    }
    store.commit('user/SET_INFO','')
  }
})
