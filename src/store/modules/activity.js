import {userTaskInfo,boxInfo,boxRankInfo,boxStatusInfo,allTasksInfo,poolAwardUrl,tgSlide,autumnUrl,autumnWeekAward,
    autumnRank,autumnPopRank,forgeLog,dayRewardData,dayRewardAwardList,oldFriendData,openBoxInfo,openBoxDetail
    ,ancientAct
} from '@/api/http'
const state = {
    fream:false,
    userTasks:{}, //用户任务完成信息
    getKeyInfo:{}, //用户令牌
    boxInfo:{},  // 开启宝箱
    thirdPopMallShow:false,
    userBoxInfo:[],
    userRankInfo:{},
    boxStatusData:{},
    boxOpenInfo:{},
    allTasksInfo:[],
    poolAward:[],
    poolRank:[],
    slideData:[],
    framePop:false,
    framePopMsg:'',
    msgType:0,
    msgWorryInfo:{},
    framePopType:'',
    autumnData:[],
    autumnWeekAward:[],
    midPopStatus:false,
    midPopMsg:'',
    midPopType:'',       //awardPop  //tablepop,
    autumnRank:[],
    autumnPopRank:[],
    autumnUserInfo:{},
    rankInfo:{},
    forgeLogData:[],
    dayRewardPopShow:false,
    dayRewardPopType:'',
    dayRewardPopMsg:'',
    dayRewardPopData:[],
    dayRewardData:'',
    oldFriendData:{},
    openBoxInitData:{},
    openBoxDetail:[],
    ancientInfo:{}
}

const mutations = {
    setFream(state,payload){
        state.fream = payload
    },
    setUserTasks(state,payload){
        state.userTasks = payload
    },
    setUserKeyInfo(state,payload){
        state.getKeyInfo = payload
    },
    setUserKeyInfo(state,payload){
        state.boxInfo = payload
    },
    setThirdMallPop(state,payload)
    {
        state.thirdPopMallShow = payload
    },
    setUserBoxInfo(state,payload){
        state.userBoxInfo = payload
    },
    setUserRankInfo(state,payload){
        state.userRankInfo = payload
    },
    setBoxStatusInfo(state,payload){
        state.boxStatusData = payload
    },
    setOpenBoxInfo(state,payload){
        state.boxOpenInfo = payload
    },
    setAllTasksInfo(state,payload){
        state.allTasksInfo = payload
    },
    setPoolAward(state,payload){
        state.poolAward = payload
    },
    setPoolRank(state,payload){
        state.poolRank = payload
    },
    setSlideData(state,payload)
    {
        state.slideData = payload
    },
    setFramePop(state,payload){
        state.framePop = payload
    },
    setFramePopMsg(state,payload){
        state.framePopMsg = payload
    },
    setFramePopType(state,payload){
        state.framePopType = payload
    },
    setAutumnData(state,payload){
        state.autumnData = payload
    },
    setAutumnWeekAward(state,payload){
        state.autumnWeekAward = payload
    },
    setMidPopStatus(state,payload){
        state.midPopStatus = payload
    },
    setMidPopMsg(state,payload){
        state.midPopMsg = payload
    },
    setMidPopType(state,payload){
        state.midPopType = payload
    },
    setAutumnRank(state,payload){
        state.autumnRank = payload
    },
    setAutumnPopRank(state,payload){
        state.autumnPopRank = payload
    },
    setAutumnUserInfo(state,payload){
        state.autumnUserInfo = payload
    },
    setRankInfo(state,payload){
        state.rankInfo = payload
    },
    setForgeLogData(state,payload){
        state.forgeLogData = payload
    },
    setMsgType(state,payload){
        state.msgType = payload
    },
    setMsgWorryInfo(state,payload){
        state.msgWorryInfo = payload
    },
    setDayRewardPopShow(state,payload){
        state.dayRewardPopShow = payload
    },
    setDayRewardPopType(state,payload){
        state.dayRewardPopType = payload
    },
    setDayRewardPopMsg(state,payload){
        state.dayRewardPopMsg = payload
    },
    setDayRewardPopData(state,payload){
        state.dayRewardPopData = payload
    },
    setDayRewardData(state,payload){
        state.dayRewardData = payload
    },
    setOldFriendData(state,payload){
        state.oldFriendData = payload
    },
    setOpenBoxInitData(state,payload){
        state.openBoxInitData = payload
    },
    setOpenBoxDetail(state,payload){
        state.openBoxDetail = payload
    },
    setAncientInfo(state,payload){
        state.ancientInfo = payload
    }
}
const actions = {
    getUserTaskInfo({commit},payload){   //获取用户任务信息
        return new Promise((resolve,reject)=>{
            userTaskInfo(payload).then(res=>{
                let params = res.Data
                commit('setUserTasks',params)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getUserBoxInfo({commit},payload){
        return new Promise((resolve,reject)=>{
            boxInfo(payload).then(res=>{
                let params = res.Data
                commit('setUserBoxInfo',params)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getUserRankInfo({commit},payload){
        return new Promise((resolve,reject)=>{
            boxRankInfo(payload).then(res=>{
                let params = res.Data
                commit('setUserRankInfo',params)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getBoxStatusInfo({commit},payload){
        return new Promise((resolve,reject)=>{
            boxStatusInfo(payload).then(res=>{
                let params = res.Data
                commit('setBoxStatusInfo',params)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getAllTasksInfo({commit},payload){
        return new Promise((resolve,reject)=>{
            allTasksInfo(payload).then(res=>{
                let params = res.Data
                commit('setAllTasksInfo',params)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getPoolAward({commit},payload){
        return new Promise((resolve,reject)=>{
            poolAwardUrl(payload).then(res=>{
                const poolAward = res.Data.PoolAward;
                const newData = poolAward.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                const arr = []
                for(let item of newData){
                    arr.push(item)
                }
                commit('setPoolAward',arr)
                commit('setPoolRank',res.Data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getSlideData({commit},payload){
        return new Promise((resolve,reject) => {
            tgSlide(payload).then((res)=>{
                commit('setSlideData',res.Data.Lists)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getAutumnData({commit},payload){
        return new Promise((resolve,reject) => {
            autumnUrl(payload).then((res)=>{
                if(res.Code === 200){
                    commit('setAutumnData',res.Data.TaskInfo)
                    commit('setAutumnUserInfo',res.Data.UserInfo)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getAutumnWeekAward({commit},payload){
        return new Promise((resolve,reject) => {
            autumnWeekAward(payload).then((res)=>{
                if(res.Code===200){
                    commit('setAutumnWeekAward',res.Data)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getAutumnRank({commit},payload){
        return new Promise((resolve,reject) => {
            autumnRank(payload).then((res)=>{
                if(res.Code===200){
                    commit('setAutumnRank',res.Data.RankList)
                    commit('setRankInfo',res.Data.UserInfo)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getAutumnPopRank({commit},payload){
        return new Promise((resolve,reject) => {
            autumnPopRank(payload).then((res)=>{
                if(res.Code===200){
                    commit('setAutumnPopRank',res.Data)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getForgeLogData({commit},payload){
        return new Promise((resolve,reject) => {
            forgeLog(payload).then((res)=>{
                if(res.Code===200){
                    commit('setForgeLogData',res.Data)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getDayRewardData({commit},payload){
        return new Promise((resolve,reject) => {
            dayRewardData(payload).then((res)=>{
                if(res.Code===200){
                    // console.log(res.Data)
                    commit('setDayRewardData',res.Data)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getDayRewardPopData({commit},payload){
        return new Promise((resolve,reject) => {
            dayRewardAwardList(payload).then((res)=>{
                if(res.Code===200){
                    commit('setDayRewardPopData',res.Data)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getOldFriendData({commit},payload){
        return new Promise((resolve,reject) => {
            oldFriendData(payload).then((res)=>{
                if(res.Code===200){
                    commit('setOldFriendData',res.Data)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getOpenBoxInitData({commit},payload){
        return new Promise((resolve,reject) => {
            openBoxInfo(payload).then((res)=>{
                if(res.Code===200){
                    commit('setOpenBoxInitData',res.Data)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getBoxDetailInfo({commit,payload}){
        return new Promise((resolve,reject) => {
            openBoxDetail(payload).then((res)=>{
                if(res.Code===200){
                    commit('setOpenBoxDetail',res.Data)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getAncientInfo({commit,payload}){
        return new Promise((resolve,reject) => {
            ancientAct(payload).then((res)=>{
                if(res.Code===200){
                    commit('setAncientInfo',res.Data)
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}

  