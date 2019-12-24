
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import game from './modules/game'
import vip from './modules/vip'
import card from './modules/card'
import fun from './modules/fun'
import news from './modules/news'
import personal from './modules/personal'
import activity from './modules/activity'
import video from './modules/video'
import happydraw from './modules/happydraw'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    game,
    vip,
    card,
    fun,
    news,
    personal,
    activity,
    video,
    happydraw
  },
})

export default store