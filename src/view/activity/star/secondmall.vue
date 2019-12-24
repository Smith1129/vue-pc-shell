<!--  -->
<template>
   <div class='allcontent'>
       <head-nav></head-nav>
       <pop-content v-if="popBoolean"></pop-content>
       <div class="logo-pic" >
         <div class="luck_turn_user">
            <p v-if="userInfo">欢迎您,<i>{{userInfo.Nickname}}</i></p>
            <p v-else>您好，请<em @click="goLogin()">[登陆]</em></p>
         </div>
         <div class="content-list">
         <ul>
            <li>
               <img v-if="complete1" src="../../../assets/image/complete.png" class="complete1">
               <div>
                  <img :src="picsList[0].Img" class="pic1">
               </div>
               <img :src="picsList[5].Img" alt="" class="pic2" @click="tiaozhuan(5)">
            </li>

            <li>
                  <img :src="picsList[1].Img" class="pic3">
            </li>
            
            <li>
               <img v-if="complete2" src="../../../assets/image/complete.png" class="complete2">
               <div>
                  <img :src="picsList[2].Img" class="pic4">
               </div>
               <img :src="picsList[6].Img" alt="" class="pic5" @click="tiaozhuan(6)">
            </li>

             <li>
                  <img :src="picsList[1].Img" class="pic6">
            </li>

            <li>
               <div>
                  <img :src="picsList[4].Img" class="pic7">
               </div>
               <img :src="picsList[7].Img" alt="" class="pic8" @click="tiaozhuan(7)">
            </li>
         </ul>
         </div>
       <!-- <div :class="['content-list',{'checkComplete':checkComplete}]" >
          <img v-show="complete1" src="../../../assets/image/complete.png" class="complete1">
          <img v-show="complete2"  src="../../../assets/image/complete.png" class="complete2">
               <ul>
                   <li v-for="(item,index) in picsList"
                    :key="index" :class="['award'+index,{'checkComplete':checkComplete}]">
                       <img :src="item.Img" @click="tiaozhuan(index)">
                   </li>
                   <li>
                    :key="index" :class="['award'+index,{'checkComplete':checkComplete}]">
                       <img :src="item.Img" @click="tiaozhuan(index)">
                   </li>
               </ul>
       </div> -->

       <div class="bottom-content-list">
           <img :src="picBottomList[0].Img" class="awardbottom1" @click="getBoxInfo()">
           <img :src="picBottomList[1].Img" class="awardbottom2">
       </div>
       <div class="bottom-content">
            <ul>
               <li>1.本活动时间为2019年7月10 日至 2019年7月31日</li>
               <li>2.每位用户在活动期间可领取一张“趣卡”，趣卡有效时间30天</li>
               <li>3.获得趣卡后，自动开通并享受30%试玩额外奖</li>
               <li>4.禁止作弊，违者最高将处以封号处理</li>
               <li>5.本次活动最终解释权归跳跳猪所有</li>
            </ul>
      </div>
    </div>
   </div>
</template>

<script>
   //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
   //例如：import 《组件名称》 from '《组件路径》';
   import headNav from '../../activity/common/nav'
   import popContent from './common/secondmallpop'
   import { userTaskInfo,userKeyInfo,userBoxInfo} from '@/api/http'
   export default {
      //import引入的组件需要注入到对象中才能使用
      components: {
          headNav,
          popContent
      },
      data() {
      //这里存放数据
         return {
            // popcheck:false,
            popBoolean:false,
            // checkComplete:false,
            // userTasks:{},
            // current:-1,
            complete1:false,
            complete2:false,
            // registerCheck:false,
            picsList:[
              {Img:require('../../../assets/image/taska.png')},
              {Img:require('../../../assets/image/arrow.png')},
              {Img:require('../../../assets/image/taskb.png')},
              {Img:require('../../../assets/image/arrow.png')},
              {Img:require('../../../assets/image/lingyaoshi.png')},
              {Img:require('../../../assets/image/register.png'),Url:'11'},
              {Img:require('../../../assets/image/noplay.png'),Url:'22'},
              {Img:require('../../../assets/image/nokey.png'),Url:'33'}
            ],
            picBottomList:[
               {Img:require('../../../assets/image/box1.png')},
               {Img:require('../../../assets/image/interest.png')}
            ]
            
         };
      },
      //方法集合
      methods: {
         resetToken(){
            this.$store.dispatch('user/resetToken');
         },
         goLogin(){
            this.$store.commit('app/getLoginBox',true)
            this.$store.commit('app/setLoginOrReg',true)
         },
         tiaozhuan(index){
            if(this.userInfo){
               if(index == '5' && !(this.complete1)){
                  window.open(this.picsList[5].Url,'_blank');  
               }
               if(index == '6' && !(this.complete2)){
                  window.open(this.picsList[6].Url,'_blank');  
               }
               if(index == '7' && this.complete1 && this.complete2){
                  return new Promise((resolve,reject)=>{
                     userKeyInfo().then(res=>{
                        let params = res.Data
                     if(params.Code === 'ok'){
                        this.$store.commit('app/getFrame',true);
                        this.$store.commit('app/getFrameMsg','领取成功');
                        this.$store.commit('app/getFrameState',0);
                        this.getInfo()
                     }else{
                        this.$store.commit('app/getFrame',true);
                        this.$store.commit('app/getFrameMsg',params.Mag);
                        this.$store.commit('app/getFrameState',0);
                     }
                        resolve()
                     }).catch(error => {
                        reject(error)
                     })
                  })
               }
            }else{
               this.goLogin();
            }
            
         },
         getBoxInfo(){
              return new Promise((resolve,reject)=>{
            userBoxInfo().then(res=>{
                let params = res.Data
                 if(params.Code === 'ok')
                    {
                       this.picBottomList[0].Img = require('../../../assets/image/box2.png')
                       this.popBoolean = true;
                     //   this.popcheck = true;
                    }else{
                       this.$store.commit('app/getFrame',true);
                       this.$store.commit('app/getFrameMsg',params.Mag);
                       this.$store.commit('app/getFrameState',0);
                    }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })

         },
         getInfo(){
           return new Promise((resolve,reject)=>{
            userTaskInfo().then(res=>{
                let params = res.Data
                this.picsList[5].Url = params.Step1.Url
                this.picsList[6].Url = params.Step2.Url
                this.picsList[7].Url = params.Step3.Url
            if(params.Step1.Status === 'reach'){
               this.picsList[5].Img = require('../../../assets/image/noregister.png')
               this.complete1 = true
               }
            if(params.Step2.Status === 'reach'){
               this.picsList[6].Img = require('../../../assets/image/noplay.png')
               this.complete2 = true
            }
            if(params.Step3.Status === 'reach'){
               this.picsList[7].Img = require('../../../assets/image/nokey.png')
            }
            if(this.complete1 == true && params.Step2.Status === 'not_reach')
            {
               this.picsList[6].Img = require('../../../assets/image/dotry.png')
            }
            if(this.complete1 == true && this.complete2 && params.Step3.Status === 'not_reach')
            {
               this.picsList[7].Img = require('../../../assets/image/getkey.png')
            }
                  resolve()
               }).catch(error => {
                  reject(error)
               })
         })

         }

      },
      //监听属性 类似于data概念
      computed: {
         userInfo(){
               return this.$store.state.user.userInfo
         }
      },
      //监控data中的数据变化
      watch: {
         userInfo(val){
            if(val){
            }
         }
      },
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
         this.getInfo();
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
      },
   }
</script>
<style lang='scss' scoped>
   .allcontent{
      position: relative;
      width: 100%;
      height: 2097px;
      overflow: hidden;
      .logo-pic{
         box-sizing: border-box;
         background:#F0F7FE;
         width: 1920px;
         height: 2097px;
         background:  url('../../../assets/image/fenhuichang-3.jpg') no-repeat;
         position: absolute;
         left:50%;
         margin-left: -960px;
         .luck_turn_user{
            position: absolute;
            left: 20%;
            top: 30.5%;
            transform: (-50%,-50%);
            font-size: 16px;
            color: #FFF;
            cursor: pointer;
         }
         .bottom-content{
            position: absolute;
            left: 34.5%;
            bottom: 1.5%;
            transform: translate(-50%,-50%);
            ul{
                width: 519px;
                height: 142px;
                font-size: 14px;
                color: #FFF2D1;
                margin-top: 60px;
                margin-left: 20px;
                li{
                    margin-top: 10px;
                    // float: left;
                }
            }
         }
         .bottom-content-list{
            position: absolute;
            left: 45%;
            top: 68%;
            transform: translate(-50%,-50%);
            .awardbottom1{
               width: 583px;
               height: 351px;
               // margin-right: 40px;
               cursor: pointer;
            }
            .awardbottom2{
               width: 315px;
               height: 232px;
               position: relative;
               top: -60px;
               left: 100px;
            }
         }
         .content-list{
            height: 310px;
            box-sizing: border-box;
            position: absolute;
            left: 50%;
            top: 42%;
            transform: translate(-50%,-50%);
         ul{
            li{
               width: 232px;
               height: 221px;
               float: left;
               .pic2,.pic5,.pic8{
                  cursor: pointer;
               }
            }
            li:nth-child(1){
               .complete1{
                  position: absolute;
                  left: 150px;
                  top: -35px;
               }
               .pic2{
                  margin-top: 30px;
                  margin-left: 10px;
               }
            }
            li:nth-child(2),li:nth-child(4){
               width: 100px;
                position: relative;
                  left: 50px;
                  top: 83px;
            }
            li:nth-child(3){
               .complete2{
                  position: absolute;
                  left: 480px;
                  top: -35px;
               }
               .pic5{
                  margin-top: 30px;
                  margin-left: 10px;
               }
            }
            li:nth-child(5){
               .pic8{
                  margin-top: 30px;
                  margin-left: 10px;
               }
            }
         }
      }
      }
}
   
</style>