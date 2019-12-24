<!--  -->
<template>
   <div class='autumn_box'>
       <head-nav></head-nav>
       <mid-pop v-if="popShow"></mid-pop>
       <div class="autumn_content">
           <div class="act_time">
               活动时间: 2019.09.12 -- 2019.10.9
           </div>
           <div class="user_info">
               <p v-if="!userInfo">您好，请<em @click="getLogin">【登录】</em><span>我的仙丹：<em>0</em></span></p>
               <p v-else class="nologin">欢迎您，<em>{{userInfo.Nickname}}</em><span>我的仙丹：<em @click="tablePop">{{AutumnUserInfo.All}}</em></span></p>
           </div>
           <div class="detail_box">
               <div class="detail_tip">
                   <span>今日领取：<em>{{AutumnUserInfo.Today}}</em></span>
                   <span>累计领取：<em>{{AutumnUserInfo.Total}}</em></span>
               </div>
               <div class="detail_content">
                   <div class="detail_top">
                       <span v-for="(item,index) in detail1" :key="index">{{item}}</span>
                   </div>
                   <div class="detail_bottom">
                       <span v-for="(item,index) in award1" :key="index">{{item}}</span>
                   </div>
               </div>
               <div class="detail_content1">
                   <div class="detail_top">
                       <span v-for="(item,index) in detail2" :key="index">{{item}}</span>
                   </div>
                   <div class="detail_bottom">
                       <span v-for="(item,index) in award2" :key="index">{{item}}</span>
                   </div>
               </div>

               <div class="detail_content2">
                   <div class="detail_top">
                       <span v-for="(item,index) in detail3" :key="index">{{item}}</span>
                   </div>
                   <div class="detail_bottom">
                       <span v-for="(item,index) in award3" :key="index">{{item}}</span>
                   </div>
               </div>
           </div>
           <div class="tasks_box">
               <div v-for="(item,index) in tasksInfo" :key="index" :class="index!=0?'task_item notfirst':'task_item'">
                   <span>{{item.Name}}</span>
                   <span>奖励：{{item.Award}}仙丹<em>（{{item.Cnt}}/{{item.Limit}}）</em></span>
                   <span :class="item.Status===1?'canget':item.Status===2?'complete':''" @click="weekAward(item.Id,item.Status)"></span>
               </div>
           </div>
           <div class="welfare_box" >
               
               <div class="welf1 wlefarebox" v-if="weekInfo.WeekInfo" >
                    <span :class="weekInfo.WeekInfo[2].Get===1&&welf1?'active1':
                             weekInfo.WeekInfo[2].Get===1?'active':weekInfo.WeekInfo[2].Get===2&&welf1?'active1':''"
                             @mouseenter="handleMouseEnter(1)"
                             @mouseleave="handleMouseLeave(1)">
                        <em>九重天 · <i>50000金猪</i></em>
                        <em v-show="weekInfo.WeekInfo[2].Get===1&&welf1" @click="getWelfAward(weekInfo.WeekInfo[2].Id)"></em>
                    </span>
                    <span :class="weekInfo.WeekInfo[2].Get===1&&welf1?'active1':
                             weekInfo.WeekInfo[2].Get===1?'active':''">1000仙丹<em></em></span>
               </div>
               <div class="welf2 wlefarebox">
                    <span><em :style="{'height':weekSalary*426 + 'px'}"><em v-show="weekSalary!=1"></em></em></span>
                    <span :class="weekInfo.WeekSalary>=100?'active':''"></span>
                    <span :class="weekInfo.WeekSalary>=600?'active':''"></span>
               </div>
               <div class="wlefarebox welf3" v-if="weekInfo.WeekInfo"  >
                   <p>
                       <span><em></em>600仙丹</span>
                        <span :class="weekInfo.WeekInfo[1].Get===1&&welf2?'active1':
                             weekInfo.WeekInfo[1].Get===1?'active':weekInfo.WeekInfo[1].Get===2&&welf2?'active1':''"
                             @mouseenter="handleMouseEnter(2)"
                             @mouseleave="handleMouseLeave(2)"
                             ><em>六重天 · <i>20000金猪</i></em>
                       <em v-show="weekInfo.WeekInfo[1].Get===1&&welf2" @click="getWelfAward(weekInfo.WeekInfo[1].Id)"></em>
                       </span>
                   </p>
                   <p>
                       <span><em></em>100仙丹</span>
                       <span :class="weekInfo.WeekInfo[0].Get===1&&welf3?'active1':
                             weekInfo.WeekInfo[0].Get===1?'active':weekInfo.WeekInfo[0].Get===2&&welf3?'active1':''"
                             @mouseenter="handleMouseEnter(3)"
                             @mouseleave="handleMouseLeave(3)"
                             >
                            <em>三重天 · <i>10000金猪</i></em>
                            <em v-show="weekInfo.WeekInfo[0].Get===1&&welf3" @click="getWelfAward(weekInfo.WeekInfo[0].Id)"></em>
                       </span>
                   </p>
               </div>
               <div>

               </div>
           </div>
           <div class="autumn_rank">
               <div class="autumn_tip">
                   <span>您的累计仙丹：{{rankTopInfo.CountInfo}}</span>
                   <span>{{rankTopInfo.Rank===0?'您的排名：暂未上榜':`您的排名：${rankTopInfo.Rank}`}}</span>
               </div>
               <div class="autumn_pic"> </div>
                <div class="autumn_table_content">
                    <table>
                        <thead>
                            <tr>
                                <td>登仙榜排名</td>
                                <td>会员昵称</td>
                                <td>累计仙丹数量</td>
                                <td>排名奖励</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in rankInfo" :key="index">
                                <td>{{item.Rank}}</td>
                                <td>{{item.Nickname}}</td>
                                <td>{{item.CountInfo}}</td>
                                <td>￥{{item.Award}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="autumn_rank_page">
                    <page :rankType="'tablePage'" :pageNumber = "5"></page>
                </div>

           </div>

           <div class="autumn_rule">
               <ul>
                   <li>1、仙丹数量仅可通完成各种任务获得；</li>
                   <li>2、仅限活动期限上线的游戏才可以通过领取试玩或棋牌奖励获仙丹；</li>
                    <li>3、有效好友定义：成功完成一次提现或有一次充值记录、领取一次试玩奖励、游戏充值、vip开通等；</li>
                    <li>4、严禁作弊，违者将处以封号处理；</li>
                    <li>5、本活动最终解释权归跳跳猪团队所有。</li>
               </ul>
           </div>
   </div>
   </div>
</template>

<script>
   //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
   //例如：import 《组件名称》 from '《组件路径》';
import headNav from '../../activity/common/nav';
import midPop from '../../activity/common/midpop';
import page from '../../activity/common/page';
import { getAutumnAward,autumnWelfare} from '@/api/http'
   export default {
      //import引入的组件需要注入到对象中才能使用
      components: {
          headNav,
          midPop,
          page
      },
      data() {
      //这里存放数据
         return {
            detail1:['完成档位','第一档','第二档','第三档','第四档','第五档','第六档','第七档','第八档'],
            award1:['仙丹奖励',1,3,6,10,15,21,28,36],
            detail2:['完成档位','第九档','第十档','第十一档','第十二档','第十三档','第十四档','第十五档','第十六档'],
            award2:['仙丹奖励',45,55,66,78,97,105,120,136],
            detail3:['完成档位','第十七档','第十八档','第十九档','第二十档','第二十一档','第二十二档','第二十三档','第二十四档'],
            award3:['仙丹奖励',153,171,190,210,231,253,276,300],
            status:'active',
            status1:'active',
            isshow:false,
            welf1:false,
            welf2:false,
            welf3:false
         };
      },
      //方法集合
      methods: {
          getLogin(){
              this.$store.commit('app/getLoginBox', true);
			  this.$store.commit('app/setLoginOrReg', true);
          },
          getData(){
                this.$store.dispatch('activity/getAutumnData');
                this.$store.dispatch('activity/getAutumnWeekAward');
                this.$store.dispatch('activity/getAutumnRank');
          },
          tablePop(){
                this.$store.dispatch('activity/getAutumnPopRank');
                this.$store.commit('activity/setMidPopStatus', true);
                this.$store.commit('activity/setMidPopType', 'tablepop');  
                this.$store.dispatch('activity/getAutumnWeekAward')
          },
          handleMouseEnter(index)
          {
              if(index===3){
                  this.welf3 = true
              }else if(index===2){
                  this.welf2 = true
              }else if(index===1){
                  this.welf1 = true
              }
          },
          handleMouseLeave(index){
              if(index===3){
                  this.welf3 = false
              }else if(index===2){
                  this.welf2 = false
              }else if(index===1){
                  this.welf1 = false
              }
          },
          getWelfAward(id){
            let payload = {
                Rule:id
            }
            return new Promise((resolve,reject) => {
                autumnWelfare(payload).then((res)=>{
                    if(res.Code === 200){
                        this.$store.commit('activity/setMidPopMsg',`恭喜获得本周${res.Data.Name}飞升奖励,${res.Data.Award}金猪`)
                        this.$store.commit('activity/setMidPopStatus', true);
                        this.$store.commit('activity/setMidPopType', 'awardpop');  
                        this.$store.dispatch('activity/getAutumnWeekAward')
                    }else{
                        this.$store.commit('activity/setMidPopMsg',`${res.Msg}`)
                        this.$store.commit('activity/setMidPopStatus', true);
                        this.$store.commit('activity/setMidPopType', 'awardpop'); 
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
          },
          weekAward(id,status){
              if(status === 1){
                   let payload = {
                    Rule:id
                }
                return new Promise((resolve,reject) => {
                    getAutumnAward(payload).then((res)=>{
                        if(res.Code === 200){
                            this.$store.commit('activity/setMidPopMsg',`您已成功领取${res.Data.Value}仙丹`)
                            this.$store.commit('activity/setMidPopStatus', true);
                            this.$store.commit('activity/setMidPopType', 'awardpop');
                            this.$store.dispatch('activity/getAutumnData')
                        }else{
                            this.$store.commit('activity/setMidPopMsg',`${res.Msg}`)
                            this.$store.commit('activity/setMidPopStatus', true);
                            this.$store.commit('activity/setMidPopType', 'awardpop'); 
                        }
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
              }
              else{
                  return
              }
          }
         
      },
      //监听属性 类似于data概念
      computed: {
        userInfo() {
            return this.$store.state.user.userInfo;
        },
        AutumnUserInfo(){
            return this.$store.state.activity.autumnUserInfo
        },
        rankTopInfo(){
            return this.$store.state.activity.rankInfo
        },
        tasksInfo(){
            return this.$store.state.activity.autumnData
        },
        rankInfo(){
            return this.$store.state.activity.autumnRank
        },
        weekInfo(){
            return this.$store.state.activity.autumnWeekAward
        },
        weekSalary(){
            let level = this.weekInfo.WeekSalary / 1000
            if(this.weekInfo.WeekSalary  > 1000){
                level = 1
            }
            return level
        },
        popShow(){
            return this.$store.state.activity.midPopStatus
        }
      },
      //监控data中的数据变化
      watch: {
          userInfo(newVal){
              this.getData()
          }
      },
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
         this.getData()
      },
   }
</script>
<style lang='scss' scoped>
%detailstyle{
    width: 100%;
    height:94px;
    background:rgba(255,248,226,1);
    border:1px solid rgba(209,165,114,1);
    border-radius:12px;
    .detail_top{
        width: 100%;
        box-sizing: border-box;
        span{
            box-sizing: border-box;
            display: inline-block;
            width: 118px;
            height: 47px;
            text-align: center;
            line-height: 47px;
            border-right:1px solid rgba(209,165,114,1);
            border-bottom:1px solid rgba(209,165,114,1);
            font-size:16px;
            color:rgba(177,111,46,1);
        }:nth-child(even){
            background:rgba(253,240,203,1);
        }
        :nth-last-child(1){
            border-radius:0 12px 0 0; 
            border-right: none;
            //左上角、右上角、右下角、左下角。
        }
        :nth-child(1){
            background:rgba(240,211,143,1);
            border-radius:12px 0 0 0;
        }
    }
    .detail_bottom{
        width: 100%;
        box-sizing: border-box;
        span{
            box-sizing: border-box;
            display: inline-block;
            width: 118px;
            height: 47px;
            text-align: center;
            line-height: 47px;
            border-right:1px solid rgba(209,165,114,1);
            // border-bottom:1px solid rgba(209,165,114,1);
            font-size:16px;
            color:rgba(177,111,46,1);
        }:nth-child(even){
            background:rgba(253,240,203,1);
        }
        :nth-last-child(1){
            border-radius:0 0 12px 0; 
            border-right: none;
            //左上角、右上角、右下角、左下角。
        }
        :nth-child(1){
            background:rgba(240,211,143,1);
            border-radius:0 0 0 12px;
        }
    }
}
    .autumn_box{
        width: 100%;
        height: 4814px;
        overflow: hidden;
        position: relative;
        font-family: MicrosoftYaHei;
	    font-weight: 400;
        .autumn_content{
            width: 1920px;
            height: 4772px;
            background: url('../../../assets/image/zqbg.jpg') no-repeat;
            position: absolute;
            left: 50%;
            margin-left: -960px;
            .act_time{
                line-height: 20px;
                font-size:18px;
                color:rgba(203,120,39,1);
                position: absolute;
                left: 942px;
                top: 356px;
            }
            .user_info{
                // width: 331px;
                position: absolute;
                left: 933px;
                top: 412px;
                p{
                    line-height: 21px;
                    font-size:20px;
                    color:rgba(195,111,30,1);
                    &.nologin{
                        // text-align: center;
                    }
                    em:nth-child(1){
                            cursor: pointer;
                    }
                    span{
                        margin-left: 15px;
                        display: inline-block;
                        em{
                            color: #CD1D06;
                            text-decoration:underline;
                            cursor: pointer;
                        }
                    }
                }
            }
            .detail_box{
                width: 1062px;
                position: absolute;
                top: 821px;
                left: 429px;
                // box-sizing: border-box;
                position: relative;
                .detail_tip{
                    width: 287px;
                    height: 26px;
                    background:rgba(28,101,86,1);
                    border-radius:13px;
                    text-align: center;
                    line-height: 26px;
                    margin: 0 auto;
                    span{
                        display: inline-block;
                        line-height: 14px;
                        font-size:14px;
                        color:rgba(244,235,184,1);
                    }
                    span:nth-child(2){
                        margin-left: 49px;
                    }
                }
                .detail_content{
                    @extend %detailstyle;
                    margin-top: 16px;
                }
                .detail_content1{
                    @extend %detailstyle;
                    margin-top: 27px;
                }
                .detail_content2{
                    @extend %detailstyle;
                    margin-top: 27px;
                }
            }
            .tasks_box{
                width: 1071px;
                // height: 97px;
                box-sizing: border-box;
                position: absolute;
                left: 425px;
                top: 1478px;
                .task_item{
                    width: 100%;
                    height: 97px;
                    margin-left: 51px;
                    &.notfirst{
                        margin-top: 28px;
                    }
                }
                span{
                    display: inline-block;
                }

                span:nth-child(1){
                    width: 396px;
                    font-size:22px;
                    // font-weight:bold;
                    color:rgba(253,237,190,1);
                    line-height: 97px;
                }
                span:nth-child(2){
                    width: 190px;
                    line-height: 97px;
                    // margin-left: 523px;
                    margin-left: 230px;
                    font-size:18px;
                    color: #9DDDBB;
                    em{
                        color: #F9E5AA;
                    }
                }
                span:nth-child(3){
                    cursor: pointer;
                    position: relative;
                    top: 12px;
                    margin-left: 32px;
                    width: 125px;
                    height: 40px;
                    background: url('../../../assets/image/nogetbutton.png') no-repeat;
                    &.canget{
                        background: url('../../../assets/image/getbutton1.png') no-repeat;
                    }
                    &.complete{
                        background: url('../../../assets/image/completebutton.png') no-repeat;
                    }

                }
            }
            .welfare_box{
                position: absolute;
                // position: absolute;
                top: 2583px;
                left: 320px;
                .wlefarebox{
                    float: left;
                }
                span{
                    display: inline-block;
                    background: url('../../../assets/image/autumnall.png') no-repeat;
                }
                .welf1{
                    position: relative;
                     span:nth-child(1){
                        width: 430px;
                        height: 268px;
                        background-position: -75px -30px;
                        text-align: center;
                        position: relative;
                        z-index: 9999;
                        em:nth-child(1){
                            position: absolute;
                            left: 0;
                            bottom: 17px;
                            width: 100%;
                            font-size:18px;
                            color:rgba(255,255,255,1);
                            text-align: center;
                            i{
                                color: #FFF697;
                            }
                        }
                        em:nth-child(2){
                            cursor: pointer;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            // transform: translateY(-50%);
                            display: inline-block;
                            width: 147px;
                            height: 43px;
                            background: url('../../../assets/image/autumnall.png') no-repeat -314px -1037px;
                        }
                        &.active{
                            width: 454px;
	                        height: 292px;
                            background-position: -593px -30px;
                            em:nth-child(1){
                                bottom: 28px;
                            }
                        }
                        &.active1{
                            width: 454px;
	                        height: 292px;
                           background-position: -1135px -30px;
                            em:nth-child(1){
                                bottom: 28px;
                            }
                        }
                    }
                span:nth-child(2){
                    // position: absolute;
                    position: relative;
                    top: -217px;
                    left: 11px;
                    background: none;
                    font-size:20px;
                    line-height: 20px;
                    color:rgba(255,196,79,1);
                    &.active{
                        top: -237px;
                        // top: 
                    }
                    &.active1{
                         top: -237px;
                    }
                    em{
                        position: relative;
                        top: 11px;
                        display: inline-block;
                        width: 32px;
	                    height: 37px;
                        background: url('../../../assets/image/autumnall.png') no-repeat -75px -1046px;
                    }
                }
                }
               .welf2{
                   position: relative;
                   top: 35px;
                   left: -58px;
                   span:nth-child(1){
                        width: 277px;
                        height: 680px;
                        background: url('../../../assets/image/processbox.png') no-repeat;
                        em:nth-child(1){
                            position: absolute;
                            left: 78px;
                            bottom: 243px;
                            display: inline-block;
                            width: 112px;
                            height: 426px;
                            background: url('../../../assets/image/midprocess.png');
                            em{
                                position: absolute;
                                top: -27px;
                                left: 0;
                                display: inline-block;
                                width: 100%;
                                height: 27px;
                                background: url('../../../assets/image/midtop.png') no-repeat;
                            }
                        }
                    }
                    span:nth-child(2){
                        position: absolute;
                        left: 78px;
                        top: 363px;
                        height: 3px;
                        width: 122px;
                        background: url('../../../assets/image/scale.png') no-repeat;
                        &.active{
                            background: none;
                        }
                    }
                    span:nth-child(3){
                        position: absolute;
                        left: 78px;
                        top: 153px;
                        height: 3px;
                        width: 122px;
                        background: url('../../../assets/image/scale1.png') no-repeat;
                        &.active{
                            background: none;
                        }
                    }
               }
               .welf3{
                   position: relative;
                   p:nth-child(1){
                       position: absolute;
                       top: 71px;
                       left: -8px;
                       span:nth-child(2){
                           width: 362px;
                           height: 226px;
                           background-position:  -99px -418px;
                           position: relative;
                           em:nth-child(1){
                            position: absolute;
                            left: 0;
                            bottom: 17px;
                            width: 100%;
                            font-size:18px;
                            color:rgba(255,255,255,1);
                            text-align: center;
                            i{
                                color: #FFF697;
                            }
                        }
                        em:nth-child(2){
                            cursor: pointer;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            // transform: translateY(-50%);
                            display: inline-block;
                            width: 147px;
                            height: 43px;
                            background: url('../../../assets/image/autumnall.png') no-repeat -314px -1037px;
                        }
                        &.active{
                            width: 386px;
	                        height: 250px;
                            background-position:  -540px -394px;
                            position: relative;
                            left: -8px;
                            top: -14px;
                            em:nth-child(1){
                                bottom: 28px;
                            }
                        }
                        &.active1{
                            width: 386px;
	                        height: 250px;
                            background-position: -993px -394px;
                            position: relative;
                            left: -8px;
                            top: -14px;
                            em:nth-child(1){
                                bottom: 28px;
                            }
                        }
                       }
                       span:nth-child(1){
                           position: absolute;
                           top: 90px;
                           left: -127px;
                            background: none;
                            line-height: 20px;
                            font-size:20px;
                            color:rgba(255,196,79,1);
                            em{
                                display: inline-block;
                                width: 32px;
	                            height: 37px;
                                background: url('../../../assets/image/autumnall.png') no-repeat -191px -1043px;
                                position: relative;
                                top: 11px;
                            }
                       }
                   }
                   p:nth-child(2){
                       position: absolute;
                       top: 358px;
                       span:nth-child(2){
                           width: 315px;
                           height: 196px;
                           background-position:  -86px -724px;
                           position: relative;
                           em:nth-child(1){
                            position: absolute;
                            left: 0;
                            bottom: 13px;
                            width: 100%;
                            font-size:18px;
                            color:rgba(255,255,255,1);
                            text-align: center;
                            i{
                                color: #FFF697;
                            }
                        }
                        em:nth-child(2){
                            position: absolute;
                            cursor: pointer;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            // transform: translateY(-50%);
                            display: inline-block;
                            width: 147px;
                            height: 43px;
                            background: url('../../../assets/image/autumnall.png') no-repeat -314px -1037px;
                        }
                        &.active{
                            width: 338px;
	                        height: 220px;
                            background-position: -476px -700px;
                            left: -15px;
                            top: -6px;
                            em:nth-child(1){
                                bottom: 24px;
                            }
                        }
                        &.active1{
                           width: 338px;
	                        height: 220px;
                            background-position: -878px -700px;
                            left: -15px;
                            top: -6px;
                            em:nth-child(1){
                                bottom: 24px;
                            }
                        }
                       }
                       span:nth-child(1){
                           position: absolute;
                           left: -138px;
                           top: 14px;
                           margin-right: 10px;
                            background: none;
                            line-height: 20px;
                            font-size:20px;
                            color:rgba(255,196,79,1);
                            em{
                                display: inline-block;
                                width: 32px;
	                            height: 37px;
                                background: url('../../../assets/image/autumnall.png') no-repeat -191px -1043px;
                                position: relative;
                                top: 11px;
                            }
                       }
                   }
                    
               }
            }
            .autumn_rank{
                width: 1004px;
                position: absolute;
                top: 3562px;
                left: 457px;
                // margin: 0 auto;
                .autumn_tip{
                    text-align: center;
                    font-size:16px;
                    color:rgba(183,136,39,1);
                    height:16px;
                    span{
                        display: inline-block;
                        line-height: 16px;
                    }
                    span:nth-child(2){
                        margin-left: 34px;
                        
                    }
                }
                .autumn_pic{
                    width: 1004px;
                    height: 22px;
                    background: url('../../../assets/image/autumn_table.png') no-repeat;
                }
                .autumn_table_content{
                    width: 100%;
                    table{
                        width: 100%;
                        thead{
                            width: 100%;
                            background:rgba(207,166,80,1);
                            border: 1px solid rgba(207,166,80,1);
                            tr{
                                width: 100%;
                                td{
                                    width: 25%;
                                    text-align: center;
                                    height: 38px;
                                    font-size:16px;
                                    color:rgba(255,255,255,1);
                                    box-sizing: border-box;
                                }
                            }
                        }
                        tbody{
                            width: 100%;
                            background:rgba(255,252,244,1);
                            tr{
                                width: 100%;
                                border: 1px solid rgba(207,166,80,1);
                                border-top: none;
                                td{
                                    width: 25%;
                                    text-align: center;
                                    box-sizing: border-box;
                                    height:42px;
                                    font-size:16px;
                                    color:rgba(199,135,2,1);
                                    border-right: 1px solid rgba(207,166,80,1);
                                }:nth-last-child(1){
                                    border-right: none;
                                }
                            }
                        }
                    }
                }
                .autumn_rank_page{
                    margin-top: 16px;
                    width: 1004px;
                }
            }
            .autumn_rule{
                position: absolute;
                bottom: 215px;
                left: 433px;
                ul{
                    li{
                        font-size:16px;
                        color:rgba(142,227,201,1);
                        line-height:32px;
                    }
                }
            }
        }

    }
   
</style>