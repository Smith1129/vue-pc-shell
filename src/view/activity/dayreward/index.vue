<!--  -->
<template>
   <div class='dayreward_box'>
       <head-nav></head-nav>
       <dayreward-pop v-if="dayRewardPopShow"></dayreward-pop>
       <div class="dayreward_content" v-if="dayRewardData">
           <div class="tree">
               <img src="../../../assets/image/lefttree.png" class="img1">
               <img src="../../../assets/image/lefttree2.png" class="img2">
               <img src="../../../assets/image/lefttree3.png" class="img3">
               <img src="../../../assets/image/righttree.png" class="img4">
               <img src="../../../assets/image/righttree2.png" class="img5">
           </div>
           <div class="acttime">活动时间：2019.9.30-11.30</div>
           <div class="userInfo" v-if="userInfo">
                 <span>欢迎您，{{userInfo.Nickname}}</span>
                 <span>已领赏金：<em @click="popShow">{{dayRewardData.Award}}</em></span>
           </div>
           <div class="userInfo" v-else>
               <span>您好，请<em @click="goLogin">【登录】</em></span>
               <span>已领赏金：<em>0</em></span>
           </div>
           <div class="step1">
               <div class="step1_content">
                   <p>单个棋牌或单个页游领取两次奖励可获得一次赏金 (不限步骤,但一键领取算作一次)</p>
                   <div class="step1_packet">
                       <div class="step1_left">
                           <span>领奖次数</span>
                           <span>
                               <em :style="{width:(dayRewardData.TaskList[0].CountInfo/dayRewardData.TaskList[0].Limit)*149 + 'px'}">
                               </em>
                           </span>
                           <span>
                               <em :class="dayRewardData.TaskList[0].Status===0?'unget':''"
                               @click="getAward(dayRewardData.TaskList[0].Rule,dayRewardData.TaskList[0].Status)"
                               >
                                   {{
                                        dayRewardData.TaskList[0].Status===0?'未达到':
                                        dayRewardData.TaskList[0].Status===1?'可领取':
                                        dayRewardData.TaskList[0].Status===2?'已领取':''
                                   }}
                                </em>
                                <em>{{dayRewardData.TaskList[0].Award}}金猪</em>
                               <em>{{dayRewardData.TaskList[0].CountInfo}}/{{dayRewardData.TaskList[0].Limit}}</em>
                           </span>
                       </div>
                       <div class="step1_right">
                           <span>领奖次数</span>
                           <span>
                               <em :style="{width:(dayRewardData.TaskList[1].CountInfo/dayRewardData.TaskList[1].Limit)*149 + 'px'}">
                               </em>
                           </span>
                           <span>
                               <em :class="dayRewardData.TaskList[1].Status===0?'unget':''"
                               @click="getAward(dayRewardData.TaskList[1].Rule,dayRewardData.TaskList[1].Status)"
                               >
                                   {{
                                        dayRewardData.TaskList[1].Status===0?'未达到':
                                        dayRewardData.TaskList[1].Status===1?'可领取':
                                        dayRewardData.TaskList[1].Status===2?'已领取':''
                                   }}
                                </em>
                                <em>{{dayRewardData.TaskList[1].Award}}金猪</em>
                               <em>{{dayRewardData.TaskList[1].CountInfo}}/{{dayRewardData.TaskList[1].Limit}}</em>
                           </span>
                       </div>
                   </div>
               </div>
           </div>
           <div class="step2">
               <div class="step2_content">
                   <p class="title">游戏试玩每日累计领取步骤奖励满5万金猪</p>
                   <div class="step2_left">
                       <p>
                           <span>最新上线页游：</span>
                           <img :src="`//image-material.ttz.com//${dayRewardData.Game.Img}`"
                           @mouseenter="handleMouseEnter(1)"
                           >
                           <transition name="fade">
                            <div class="step2_shadow" v-show="shadowIndex == 10" transiton="fade"
                             @mouseleave="handleMouseLeave(1)"
                            >
                                <span class="step2_shadow_btn" @click="goRouter(1)">立即试玩</span>
                                <!-- <span class="shadow_count">参与人数：{{item.UserCount}}</span> -->
                            </div>
                            </transition>
                       </p>
                       <p>
                           <span>累计金猪</span>
                           <span>
                               <em :class="dayRewardData.TaskList[2].Status!=0?'allstep':''"
                                :style="dayRewardData.TaskList[2].Status===0?
                                {width:(dayRewardData.TaskList[2].CountInfo
                                /dayRewardData.TaskList[2].Limit)*477 + 'px'}
                                :''">
                               </em>
                           </span>
                           <span v-if="dayRewardData.TaskList[2].Status===0" class="redpacket"></span>
                           <span class="count">{{dayRewardData.TaskList[2].CountInfo}}金猪 / {{dayRewardData.TaskList[2].Limit}}金猪</span>
                       </p>
                   </div>
                   <div class="step2_right">
                       <span>
                           <em :class="dayRewardData.TaskList[2].Status===0?'unget':''"
                           @click="getAward(dayRewardData.TaskList[2].Rule,dayRewardData.TaskList[2].Status)"
                           >
                               {{
                                    dayRewardData.TaskList[2].Status===0?'未达到':
                                    dayRewardData.TaskList[2].Status===1?'可领取':
                                    dayRewardData.TaskList[2].Status===2?'已领取':''
                               }}
                           </em>
                           <em>{{dayRewardData.TaskList[2].Award}}金猪</em>
                        </span>
                   </div>
               </div>
           </div>
           <div class="step3">
               <div class="step2_content">
                   <p class="title">单个棋牌每日累计领取步骤奖励满15万金猪</p>
                   <div class="step2_left">
                       <p>
                           <span>最新上线棋牌：</span>
                           <img :src="`//image-material.ttz.com//${dayRewardData.Card.Img}`"
                           @mouseenter="handleMouseEnter(2)"
                           >
                            <transition name="fade">
                            <div class="step2_shadow" v-show="shadowIndex1 == 20" transiton="fade"
                            @mouseleave="handleMouseLeave(2)"
                            >
                                <span class="step2_shadow_btn" @click="goRouter(2)">立即试玩</span>
                                <!-- <span class="shadow_count">参与人数：{{item.UserCount}}</span> -->
                            </div>
                            </transition>
                       </p>
                       <p>
                           <span>累计金猪</span>
                           <span>
                               <em :class="dayRewardData.TaskList[3].Status!=0?'allstep':''"
                                :style="dayRewardData.TaskList[3].Status===0?
                                {width:(dayRewardData.TaskList[3].CountInfo
                                /dayRewardData.TaskList[3].Limit)*477 + 'px'}
                                :''">
                               </em>
                           </span>
                           <span v-if="dayRewardData.TaskList[3].Status===0" class="redpacket"></span>
                           <span class="count">{{dayRewardData.TaskList[3].CountInfo}}金猪 / {{dayRewardData.TaskList[3].Limit}}金猪</span>
                       </p>
                   </div>
                   <div class="step2_right">
                       <span>
                           <em :class="dayRewardData.TaskList[3].Status===0?'unget':''"
                           @click="getAward(dayRewardData.TaskList[3].Rule,dayRewardData.TaskList[3].Status)"
                           >
                               {{
                                    dayRewardData.TaskList[3].Status===0?'未达到':
                                    dayRewardData.TaskList[3].Status===1?'可领取':
                                    dayRewardData.TaskList[3].Status===2?'已领取':''
                               }}
                           </em>
                           <em>{{dayRewardData.TaskList[3].Award}}金猪</em>
                       </span>
                   </div>
               </div>
           </div>
           <div class="dayreward_rule">
               <ul>
                   <li>1. 每日完成对应的任务可获得金猪赏金，若当日未领赏金则次日自动失效</li>
                   <li>2. 游戏试玩活动范围为 所有在线游戏的步骤奖励，含高返游戏（冲级赛、充值返利除外）；</li>
                   <li>3. 棋牌游戏活动范围为 所有在线棋牌的步骤奖励（冲级赛、各类排名榜单除外）；</li>
                   <li>4. 若同时满足了多个任务要求，则能获得多个任务赏金；</li>
                   <li>5. 本活动最终解释权归跳跳猪所有！</li>
               </ul>
           </div>
       </div>
   </div>
</template>

<script>
   //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
   //例如：import 《组件名称》 from '《组件路径》';
import headNav from '../../activity/common/nav';
import dayrewardPop from '../common/dayreward/framepop'
import {dayRewardGetReward} from '@/api/http'
   export default {
      //import引入的组件需要注入到对象中才能使用
      components: {
          headNav,
          dayrewardPop
      },
      data() {
      //这里存放数据
         return {
             shadowIndex:-1,
             shadowIndex1:-1,
         };
      },
      //方法集合
      methods: {
         handleMouseEnter(index){
             if(index===1){
                 this.shadowIndex = 10;
             }else if(index===2){
                 this.shadowIndex1 = 20
             }
         },
         goLogin() {
			this.$store.commit('app/getLoginBox', true);
			this.$store.commit('app/setLoginOrReg', true);
        },
         goRouter(index){
            if(index===1){
                let path = `/game/details?id=${this.dayRewardData.Game.Id}`
                let routeData = this.$router.resolve({ path: path });
                window.open(routeData.href, '_blank');
            }else if(index===2){
                let path = `/card/details?id=${this.dayRewardData.Card.Id}`
                let routeData = this.$router.resolve({ path: path });
                window.open(routeData.href, '_blank');
            }
        },
         handleMouseLeave(index){
             if(index===1){
                 this.shadowIndex = -1;
             }else if(index===2){
                 this.shadowIndex1 = -1;
             }
         },
         popShow(){
             this.$store.dispatch('activity/getDayRewardPopData')
             this.$store.commit('activity/setDayRewardPopShow',true)
             this.$store.commit('activity/setDayRewardPopType','tablePop')
         },
         getData(){
             this.$store.dispatch('activity/getDayRewardData')
         },
         getAward(id,status){
             if(status === 0 || status ===2){
                 return
             }else{
                let payload = {
                    Rule:id
                }
                return new Promise((resolve,reject) => {
                    dayRewardGetReward(payload).then((res)=>{
                        if(res.Code === 200){
                            this.getData()
                            this.$store.commit('activity/setDayRewardPopShow',true)
                            this.$store.commit('activity/setDayRewardPopType','msgPop')
                            this.$store.commit('activity/setDayRewardPopMsg',`领取成功，您已获得赏金${res.Data.Award}金猪`)
                        }else{
                            this.$store.commit('activity/setDayRewardPopShow',true)
                            this.$store.commit('activity/setDayRewardPopType','msgPop')
                            this.$store.commit('activity/setDayRewardPopMsg',`${res.Msg}`)
                        }
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
             }
         }
      },
      //监听属性 类似于data概念
      computed: {
          dayRewardPopShow(){
              return this.$store.state.activity.dayRewardPopShow;
          },
          dayRewardData(){
              return this.$store.state.activity.dayRewardData;
          },
          userInfo() {
            return this.$store.state.user.userInfo;
          }
      },
      //监控data中的数据变化
      watch: {
          userInfo(){
              this.getData()
          }
      },
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
         this.getData()
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
         
      },
   }
</script>
<style lang='scss' scoped>
    @keyframes move {
        0%{
            top: -20px;
        }
        100%{
            top: 2122px;
            transform: rotate(500deg);
        }
    }
    @keyframes move1 {
        0%{
            top: -20px;
        }
        100%{
            top: 2122px;
            transform: rotate(500deg);
        }
    }
    @keyframes move2 {
        0%{
            top: -20px;
        }
        100%{
            top: 2122px;
            transform: rotate(500deg);
        }
    }
    @keyframes move3 {
        0%{
            top: -20px;
        }
        100%{
            top: 2122px;
            transform: rotate(500deg);
        }
    }
    @keyframes move4 {
        0%{
            top: -20px;
        }
        100%{
            top: 2122px;
            transform: rotate(500deg);
        }
    }
    %step2{
        width: 1099px;
        height: 446px;
        position: absolute;
        left: 410px;
        top: 791px;
        padding: 107px 114px 0 94px;
        padding-top: 107px;
        box-sizing: border-box;
        .step2_content{
            .title{
                font-size:14px;
                color:rgba(135,67,68,1);
                line-height:14px;
                text-align: center;
            }
            .step2_left{
                p:nth-child(1){
                    margin-top: 31px;
                    position: relative;
                    span{
                        font-size:16px;
                        font-weight:400;
                        color:rgba(201,83,0,1);
                        position: relative;
                        top: -44px;
                    }
                    img{
                        width: 160px;
                        height: 104px;
                    }
                    .step2_shadow{
                        width: 160px;
                        height: 104px;
                        background: rgba(0,0,0,0.7);
                        border-radius: 2px;
                        position: absolute;
                        top: 0;
                        left: 116px;
                        z-index: 999;
                        .step2_shadow_btn{
                            width: 100px;
                            height: 30px;
                            background:rgba(44,156,254,1);
                            border-radius:2px;
                            cursor: pointer;
                            font-size:14px;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                            text-align: center;
                            line-height: 30px;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%);
                        }
                    }
                }
                p:nth-child(2){
                    position: relative;
                    left: -50px;
                    top: 47px;
                    span:nth-child(1){
                        display: inline-block;
                        width: 104px;
                        height: 106px;
                        background: url('../../../assets/image/stepstart.png') no-repeat;
                        text-align: center;
                        line-height: 95px;
                        font-weight:bold;
                        color:rgba(201,83,0,1);
                        font-size:14px;
                        position: relative;
                        left: 24px;
                        z-index: 100;
                        top: -21px;
                    }
                    span:nth-child(2){
                        display: inline-block;
                        width: 533px;
                        height: 57px;
                        background: url('../../../assets/image/forge0.png') no-repeat;
                        position: relative;
                        // left: -20px;
                        em{
                            position: absolute;
                            left: 4px;
                            top: 17px;
                            display: inline-block;
                            width: 477px;
                            height: 24px;
                            background: url('../../../assets/image/forge99.png') no-repeat;
                            transform: rotate(180deg);
                            // &.nostep{
                            //     background: none;
                            // }
                            &.allstep{
                                left: 0;
                                top: 0;
                                transform: rotate(0deg);
                                width: 533px;
                                height: 57px;
                                background: url('../../../assets/image/forge100.png') no-repeat;
                            }
                        }
                    }
                    .redpacket{
                            display: inline-block;
                            width: 29px;
                            height: 32px;
                            position: relative;
                            left: -46px;
                            top: -12px;
                            background: url('../../../assets/image/forgepackets.png') no-repeat;
                    }
                    .count{
                        position: absolute;
                        font-size:14px;
                        font-weight:400;
                        color:rgba(201,83,0,1);
                        right: 320px;
                        top: -13px;
                    }
                }
            }
            .step2_right{
                position: absolute;
                right: 48px;
                top: 125px;
                span{
                    display: inline-block;
                    width: 224px;
                    height: 248px;
                    background: url('../../../assets/image/daypacket.png') no-repeat;
                    position: relative;
                    left: -65px;
                    em:nth-child(1){
                        display: inline-block;
                        width: 98px;
                        height: 97px;
                        background: url('../../../assets/image/packetstatus1.png') no-repeat;
                        text-align: center;
                        line-height: 90px;
                        font-size:17px;
                        color:rgba(246,142,60,1);
                        font-weight:bold;
                        position: absolute;
                        left: 50%;
                        top: 45px;
                        transform: translateX(-50%);
                        cursor: pointer;
                        &.unget{
                            background: url('../../../assets/image/packetstatus.png') no-repeat;
                            color:rgba(126,126,126,1);
                        }                       
                    }
                    em:nth-child(2){
                        position: absolute;
                        display: inline-block;
                        font-size:28px;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                        left: 51px;
                        top: 169px;
                    }
                }
            }
        }
    }
    %step{
        span:nth-child(1){
            display: inline-block;
            width: 104px;
            height: 106px;
            background: url('../../../assets/image/stepstart.png') no-repeat;
            font-size:14px;
            font-weight:bold;
            color:rgba(201,83,0,1);
            line-height: 95px;
            text-align: center;
            position: relative;
            top: -121px;
            left: 25px;
            z-index: 100;
        }
        span:nth-child(2){
            display: inline-block;
            width: 203px;
            height: 30px;
            background: url('../../../assets/image/stepemtry.png') no-repeat;
            position: relative;
            top: -110px;
            em{
                position: absolute;
                top: 3px;
                left: 4px;
                // left: 0;
                display: inline-block;
                width: 149px;
                height: 24px;
                background: url('../../../assets/image/stepall.png') no-repeat;
                transform: rotate(180deg);
            }
        }
        span:nth-child(3){
            display: inline-block;
            width: 224px;
            height: 248px;
            background: url('../../../assets/image/daypacket.png') no-repeat;
            position: relative;
            left: -65px;
            em:nth-child(1){
                display: inline-block;
                width: 98px;
                height: 97px;
                background: url('../../../assets/image/packetstatus1.png') no-repeat;
                text-align: center;
                line-height: 90px;
                font-size:17px;
                color:rgba(246,142,60,1);
                font-weight:bold;
                position: absolute;
                cursor: pointer;
                left: 50%;
                top: 45px;
                transform: translateX(-50%);
                &.unget{
                    background: url('../../../assets/image/packetstatus.png') no-repeat;
                    color:rgba(126,126,126,1);
                }
            }
            em:nth-child(2){
                position: absolute;
                display: inline-block;
                font-size:28px;
                font-weight:bold;
                color:rgba(255,255,255,1);
                left: 51px;
                top: 169px;
            }
            em:nth-child(3){
                position: absolute;
                width:115px;
                height:31px;
                background: url('../../../assets/image/packetstep.png') no-repeat;
                text-align: center;
                line-height: 31px;
                font-size:14px;
                color:rgba(255,255,255,1);
                bottom: -40px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
    .dayreward_box{
        width: 100%;
        height: 2164px;
        overflow: hidden;
        position: relative;
        .dayreward_content{
            width: 1920px;
            height: 2122px;
            background: url('../../../assets/image/dayrewardbg.png') no-repeat;
            position: absolute;
			left: 50%;
			margin-left: -960px;
			font-family:Microsoft YaHei;
			font-weight:400;
            overflow: hidden;
            .tree{
                img{
                    position: absolute;
                    top: -30px;
                }
                .img1{
                    left: 258px;
                    width: 19px;
                    height: 11px;
                    animation: move 14s ease-in 0s infinite;
                }
                .img2{
                    width: 25px;
                    height: 24px;
                    left: 337px;
                    animation: move1 14s ease-in 4s infinite;
                }
                .img3{
                    width: 39px;
                    height: 24px;
                    left: 405px;
                    animation: move2 14s ease-in 8s infinite;
                }
                .img4{
                    right: 163px;
                    width: 14px;
                    height: 15px;
                    animation: move3 14s ease-in 5s infinite;
                }
                .img5{
                    width: 27px;
                    height: 22px;
                    right: 224px;
                    animation: move4 14s ease-in 2s infinite;
                }
            }
            .acttime{
                line-height: 23px;
                font-size:22px;
                color:rgba(201,83,0,1);
                position: absolute;
                top: 77px;
                left: 919px;
            }
            .userInfo{
                font-size:16px;
                color:rgba(135,67,68,1);
                position: absolute;
                left: 791px;
                top: 248px;
                span{
                    display: inline-block;
                    line-height: 17px;
                    em{
                        cursor: pointer;
                        &:hover{
                            text-decoration-line: underline;
                        }
                    }
                }
                span:nth-child(2){
                    line-height: 19px;
                    display: inline-block;
                    margin-left: 68px;
                    em{
                         font-weight: bold;
                        color: #FB5153;
                        text-decoration:underline;
                    }
                }
            }
            .step1{
                width:1099px;
                height:478px;
                position: absolute;
                top: 291px;
                left: 410px;
                padding: 107px 85px 52px 73px;
                box-sizing: border-box;
                .step1_content{
                    p:nth-child(1){
                        font-size:14px;
                        line-height: 15px;
                        color:rgba(135,67,68,1);
                        text-align: center;
                    }
                    .step1_packet{
                        position: relative;
                        left: -25px;
                        top: 17px;
                        .step1_left{
                            display: inline-block;
                            position: relative;
                            // float: left;
                            @extend %step;
                        }
                        .step1_right{
                            position: absolute;
                            top: 0;
                            right: -92px;
                            @extend %step;                 
                        }
                    }
                }
            }
            .step2{
                @extend %step2;
            }
            .step3{
                @extend %step2;
                position: absolute;
                left: 410px;
                top: 1263px;
            }
            .dayreward_rule{
                width: 1099px;
                height: 275px;
                padding-top: 91px;
                padding-left: 80px;
                box-sizing: border-box;
                position: absolute;
                left: 410px;
                top: 1738px;
                font-size:14px;
                font-weight:400;
                color:rgba(165,41,41,1);
                line-height:27px;
            }
        }
    }
   
</style>