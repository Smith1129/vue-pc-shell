<!--  -->
<template>
   <div class='content'>
    <div class="all">
     <div class="allcontent">
       <div class="topcontent">
           <div class="qqtasks">
               <div class="title">
                   <p>QQ任务</p>
               </div>
               <div class="middlecontent">
                    <ul>
                        <li v-for="(item,index) in qqList" :key="index">
                            <div class="qqcontent" :class="index==2?'morelong':''">
                                    <div class="top">
                                        <span>{{item.task1}}</span>
                                    </div>
                                    <span class="middle" :class="index==2?'more':''">{{item.label}}</span>
                                    <p @mouseenter="mouseEnter(1,index,tasksInfo.Qq[index].Status==1)"
                                       @mouseleave="mouseLeave(1)"
                                       @mousedown="mouseDown(1,index)"
                                       v-if="tasksInfo.Qq"
                                       @click="goMore(3,tasksInfo.Qq[index].Status,1,index)"
                                       :class="[{active:isIndex==index},{audit:tasksInfo.Qq[index].Status==2},{limit:tasksInfo.Qq[index].Status==3}]"
                                       >
                                        <span>{{tasksInfo.Qq[index].Status==1&&tasksInfo.Qq[index].Times==0?'去完成':
                                                tasksInfo.Qq[index].Status==3?'达上限':
                                                tasksInfo.Qq[index].Status==2?'审核中':
                                                `${tasksInfo.Qq[index].Times}/3`}}
                                        </span>
                                    </p>
                            </div>
                        </li>
                    </ul>
              </div>
          </div>

          <div class="wechatcontent">
               <div class="title">
                   <p>微信任务</p>
               </div>
               <div class="middlecontent">
                    <ul>
                        <li v-for="(item,index) in wechatList" :key="index">
                            <div class="qqcontent" :class="index==2?'morelong':''">
                                    <div class="top">
                                        <span>{{item.task1}}</span>
                                    </div>
                                    <span class="middle" :class="index==2?'more':''">{{item.label}}</span>
                                    <p 
                                       @mouseenter="mouseEnter(2,index,tasksInfo.Wechat[index].Status===1)"
                                       @mouseleave="mouseLeave(2)"
                                       @mousedown="mouseDown(2,index)"
                                       :class="[{active:isIndex1==index},{audit:tasksInfo.Wechat[index].Status==2},{limit:tasksInfo.Wechat[index].Status==3}]"
                                       v-if="tasksInfo.Wechat"
                                       @click="goMore(3,tasksInfo.Wechat[index].Status,2,index)"
                                       >
                                       <span>{{tasksInfo.Wechat[index].Status==1&&tasksInfo.Wechat[index].Times==0?'去完成':
                                                tasksInfo.Wechat[index].Status==3?'达上限':
                                                tasksInfo.Wechat[index].Status==2?'审核中':
                                                `${tasksInfo.Wechat[index].Times}/3`}}
                                        </span>
                                    </p>
                            </div>
                        </li>
                    </ul>
              </div>
          </div>
   </div>

   <div class="topright">
       <div class="rightcontent"  v-if="!userInfo">
           <img src="../../../assets/image/nologin.png" class="toppic">
           <p>你好，还未登录!</p>
           <p>当前金猪:--<img src="../../../assets/image/glodenpig.png"></p>
           <p @click="login">立即登录</p>
       </div>
       <div v-else class="rightcontent">
           <img :src="userInfo.AvatarPath" class="toppic">
           <p>{{userInfo.Nickname}}<em>{{`(ID:${userInfo.UserId})`}}</em></p>
           <p>当前金猪：{{userInfo.CoinDiamond}}<img src="../../../assets/image/glodenpig.png"></p>
           <p @click="goMore(1)">金猪明细</p>
       </div>

        <div class="rightbottom">
           <div class="bottomtitle">
               <p>活动说明</p>
           </div>
           <div class="bottomcontent">
               <ul>
                   <li v-for="(item,index) in ruleList" :key="index">
                       <p class="ruletitle"><span></span>{{item.contentTitle}}</p>
                       <p class="rulecontent" v-if="index!=1">{{item.content}}</p>
                       <div v-else>
                           <p>1.QQ空间、朋友圈动态24小时内不可删除，否则无效。</p>
                           <p>2.死群或僵尸群不算任何奖励。</p>
                           <p>3.同一ID每条任务上限为三次，达上限后该任务不可提交。</p>
                           <p>4.任务A提交审核通过后，才能再次提交任务A。</p>
                           <p>5.严禁刷奖励刷号，一经查实，冻结账户，扣除奖励。</p>
                       </div>
                   </li>
               </ul>
           </div>
       </div>
   </div>
   </div>

   <div class="tuiguangcontent">
        <div class="tuiguangtitle">
            <p>推广范文</p>
        </div>
        <div class="more" @click="goMore(2)">更多素材>></div>
        <div class="picList">
            <ul>
                <li v-for="(item,index) in picList" :key="index">
                    <p>{{item.title}}</p>
                    <p>{{item.content}}</p>
                    <p>{{item.url}}</p>
                    <p
                    @mouseenter="mouseEnter(3,index)"
                    @mouseleave="mouseLeave(3)"
                    @mousedown="mouseDown(3,index)"
                    :class="isIndex2==index?'active':''"
                    :data-clipboard-text="picList[index].content+picList[index].url"
                    @click="copy"
                    class="copybtn"
                    >复制素材</p>
                </li>
            </ul>
        </div>
   </div>

   <div class="footcontent">
       <div class="foottitle">
            <p>图片素材</p>
        </div>
        <div class="footpic">
            <ul>
                <li v-for="(item,index) in footList" :key="index">
                    <img :src="item.imgUrl">
                    <p
                    @mouseenter="mouseEnter(4,index)"
                    @mouseleave="mouseLeave(4)"
                    @mousedown="mouseDown(4,index)"
                    :class="isIndex3==index?'active':''"
                    @click="download(item.imgUrl)"
                    >下载图片</p>
                </li>
            </ul>
        </div>
   </div>

   <div class="blong" v-if="tasksInfo">本次活动最终解释权归跳跳猪所有</div>
   </div>
</div>
</template>

<script>
   //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
   //例如：import 《组件名称》 from '《组件路径》';
   import Clipboard from 'clipboard';
   export default {
      //import引入的组件需要注入到对象中才能使用
      components: {},
      data() {
      //这里存放数据
         return {
             logincheck:true,
             isIndex:-1,
             isIndex1:-1,
             isIndex2:-1,
             isIndex3:-1,
             qqImg:require('../../../assets/image/qqtask.png'),
             qqList:[
                {task1:'任务一',label:'1、以群主和管理员身份发布QQ群公告奖励5000金猪，人数满100人奖励10000金猪。'},
                {task1:'任务二',label:'2、发QQ空间说说奖励5000金猪，满10个赞奖励10000金猪。'},
                {task1:'任务三',label:'3、发QQ群，试玩群奖励20000金猪，网赚、兼职、刷单群奖励10000金猪，死群或僵尸群不算任何奖励；若QQ群人数满1000人，试玩群奖励30000金猪，网赚、兼职、刷单群奖励20000金猪。'}
             ],
             wechatList:[
                 {task1:'任务一',label:'1、群发微信好友奖励5000金猪，人数满100人奖励10000金猪。'},
                 {task1:'任务二',label:'2、发朋友圈（并在底下带上评论）奖励5000金猪，满10个赞奖励10000金猪。'},
                 {task1:'任务三',label:'3、发微信群，试玩群奖励20000金猪，网赚、兼职、刷单群奖励10000金猪，其余类型群奖励5000黄钻;若微信群人数满300人，试玩群奖励30000金猪，网赚、兼职、刷单群奖励20000金猪，其余类型群奖励10000金猪。'}
             ],
             ruleList:[
                 {contentTitle:'【活动内容】',content:'分享文字素材和图片素材，完成QQ任务、微信任务即可获得相应的奖励，记得带上自己的好友邀请链接哦！'},
                 {contentTitle:'【活动规则】',content:'1.QQ空间、朋友圈动态24小时内不可删除，否则无效。 2.死群或僵尸群不算任何奖励。 3.同一ID每条任务上限为三次，达上限后该任务不可提交。4.任务A提交审核通过后，才能再次提交任务A。5.严禁刷奖励刷号，一经查实，冻结账户，扣除奖励。'},
                 {contentTitle:'【任务提交】',content:'请提交全屏截图，不规范或不合格者一律不发放任何奖励。'},
                 {contentTitle:'【奖励发放】',content:'任务提交后，管理员审核通过后，自动发放到账号。请及时查看金猪明细。'}
             ],
             picList:[
                 {title:'文字素材一',content:'每天下班、下课后感觉没事做？跳跳猪集结各种有趣的游戏活动，可以抽奖、兑换，各种精美奖品送不停，说不定还可以找到志同道合的另一半哦。',url:'http://t.ttz.com'},
                 {title:'文字素材二',content:'自从上了跳跳猪，妈妈再也不用担心我玩游戏了，女朋友也不会反对我玩游戏了，原来玩 游戏还可以赚钱，女朋友包包口红完全不成问题,自己还留有生活费。',url:'http://t.ttz.com'},
                 {title:'文字素材三',content:'足不出户也能赚钱，天天赚不停，月月爽翻天，各种活动奖励不间断，娱乐赚钱尽在跳跳猪，各种好礼奖励都在等着你哦。',url:'http://t.ttz.com'}
             ],
             footList:[
                 {imgUrl:require('../../../assets/image/tuiguang1.png')},
                 {imgUrl:require('../../../assets/image/tuiguang2.png')},
                 {imgUrl:require('../../../assets/image/tuiguang3.png')}
             ],
         };
      },
      //方法集合
      methods: {
          goMore(active,goBoolean,type,index)
          {
              if(active == 1){
                  let routeData = this.$router.resolve({path: '/personal/award',query:{id:1,type:4}});
                  window.open(routeData.href, '_blank');
              }
              if(active ==2){
                  let routeData = this.$router.resolve({path: '/activity/fourmall/fontdetail'});
                  window.open(routeData.href, '_blank');
              }
              if(active == 3){
                  if(goBoolean == 3){
                      alert('已达上限')
                  }else if(goBoolean == 2){
                      alert('审核中')
                  }else if(goBoolean == 1){
                      console.log(type,index)
                     this.$router.push({path: '/activity/fourmall/upload',query:{type:type,rule:index+1}});
    //                   window.open(routeData.href, '_blank');
                  }
              }
          },
          mouseEnter(active,index,check){
              if(active == 1 && check){
                  this.isIndex = index
              }else if(active ==2 && check){
                  this.isIndex1 = index
              }else if(active == 3){
                  this.isIndex2 = index
              }else if(active == 4){
                  this.isIndex3 = index
              }
          },
          mouseLeave(active){
              if(active == 1){
                  this.isIndex = -1
              }else if(active ==2){
                  this.isIndex1 = -1
              }else if(active ==3){
                  this.isIndex2 = -1
              }else if(active == 4){
                  this.isIndex3 = -1
              }
          },
          mouseDown(active,index){

          },
          copy(){
              let tag1 = new Clipboard(`.copybtn`)
                var clipboard =  tag1
                console.log(tag1,'ssss')
                clipboard.on('success', e => {  
                    console.log('复制成功')
                    alert('复制成功')
                    // 释放内存  
                        clipboard.destroy()  
                    })  
                        clipboard.on('error', e => {  
                    // 不支持复制  
                    console.log('该浏览器不支持自动复制')  
                    // 释放内存  
                    clipboard.destroy()  
                })  
          },
          download(url){
              this.downloadIamge(url, 'pic')
          },
          downloadIamge(imgsrc,name){
              var image = new Image();
            // 解决跨域 Canvas 污染问题
            image.setAttribute("crossOrigin", "anonymous");
            image.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
                var a = document.createElement("a"); // 生成一个a元素
                var event = new MouseEvent("click"); // 创建一个单击事件
                a.download = name || "photo"; // 设置图片名称
                a.href = url; // 将生成的URL设置为a.href属性
                a.dispatchEvent(event); // 触发a的单击事件
            };
                image.src = imgsrc;
          },
          login(){
              this.$store.commit('app/getLoginBox',true)
             this.$store.commit('app/setLoginOrReg',true)
          }
      },
      //监听属性 类似于data概念
      computed: {
          userInfo(){
              return this.$store.state.user.userInfo
         },
         tasksInfo(){
             return this.$store.state.activity.allTasksInfo
         }
      },
      //监控data中的数据变化
      watch: {
          userInfo(val){
              if(val){
                  for(let i in this.picList)
                  {
                      this.picList[i].url = 'http://t.ttz.com/'+val.UserId
                  }
                  this.$store.dispatch('activity/getAllTasksInfo')
              }
          }
      },
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
          this.$store.dispatch('activity/getAllTasksInfo')
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
         
      },
   }
</script>
<style lang='scss' scoped>
    .content{
         %clearfix {
            *zoom: 1;
            &:before, &:after {
                content: " ";
                display: table;
            }
            &:after {
                clear: both;
            }
        }
        width: 100%;
        height: 1894px;
        overflow: hidden;
        position: relative;
        margin-top: -255px;
        .all{
            width: 1920px;
            height: 1894px;
            position: absolute;
            left: 50%;
            margin-left: -960px;
            // background: #f94b40;
        }
        .allcontent{
            width: 1200px;
            height: 750px;
            margin: 0 auto;
        }
        .topcontent{
            width: 800px;
            height: 750px;
            background:  url('../../../assets/image/taskwhite.png') no-repeat;
            font-family:MicrosoftYaHei;
            // margin: 0 auto;
            float: left;
            // @extend %clearfix;
            .qqtasks{
                width: 800px;
                height: 356px;
                position: relative;
                .title{
                    width: 622px;
                    height: 13px;
                    background:  url('../../../assets/image/titlelong.png') no-repeat;
                    text-align: center;
                    position: absolute;
                    top: 36px;
                    left: 89px;
                    p{
                        font-size:24px;
                        color:rgba(51,51,51,1);
                        position: relative;
                        top: -12px;
                        font-weight:bold;
                    }
                }
                .middlecontent{
                    width: 770px;
                    position: absolute;
                    left: 15px;
                    top: 67px;
                    ul{
                        li{
                            width: 770px;
                            background:rgba(254,249,245,1);
                            border-radius:10px;
                            text-align: center;
                            position: relative;
                            margin-bottom: 20px;
                            .qqcontent{
                                height: 64px;
                                .top{
                                    display: inline-block;
                                    width: 117px;
                                    height: 38px;
                                    background:  url('../../../assets/image/qqtask.png') no-repeat;
                                    vertical-align: middle;
                                    position: absolute;
                                    left: 16px;
                                    top: 14px;
                                    span{
                                        position: absolute;
                                        top: 10px;
                                        left: 49px;
                                        font-weight:400;
                                        font-size:14px;
                                        color:rgba(51,51,51,1);
                                    }
                                }
                                .middle{
                                    // width: 490px;
                                    display: inline-block;
                                    position: absolute;
                                    left: 157px;
                                    top: 15px;
                                    width: 450px;
                                    text-align: left;
                                    line-height: 20px;
                                    font-weight:400;
                                    color:rgba(51,51,51,1);
                                    font-size:14px;
                                    &.more{
                                        position: absolute;
                                        left: 157px;
                                        top: 21px;
                                        line-height: 24px;
                                    }
                                }
                                p{
                                    display: inline-block;
                                    width: 89px;
                                    height: 30px;
                                    background:rgba(255,80,95,1);
                                    border-radius:15px;
                                    line-height: 30px;
                                    position: absolute;
                                    right: 12px;
                                    top: 16px;
                                    // cursor: pointer;
                                    span{
                                        font-size:12px;
                                        font-weight:400;
                                        color:rgba(255,255,255,1);
                                    }
                                    &.limit{
                                        background:rgba(226,221,221,1);
                                    }
                                    &.audit{
                                        background:rgba(255,165,48,1);
                                        // cursor: pointer;
                                    }
                                    &.active{
                                        background:rgba(254,15,35,1);
                                        cursor: pointer;
                                    }
                                }
                                &.morelong{
                                    height: 104px;
                                    .top{
                                        top: 32px;
                                    }
                                    .middle{
                                        width: 490px;
                                        height: 61;
                                        top: 21px;
                                        text-align: left;
                                    }
                                    p{
                                        top: 37px;
                                    }
                                }
                            }
                        }
                    }
              }
            }
            .wechatcontent{
                width: 800px;
                height: 356px;
                position: relative;
                .title{
                    width: 622px;
                    height: 13px;
                    background:  url('../../../assets/image/titlelong.png') no-repeat;
                    text-align: center;
                    position: absolute;
                    top: 58px;
                    left: 89px;
                    p{
                        font-size:24px;
                        color:rgba(51,51,51,1);
                        position: relative;
                        top: -12px;
                        font-weight:bold;
                    }
                }
                .middlecontent{
                    width: 770px;
                    position: absolute;
                    left: 15px;
                    top: 96px;
                    ul{
                        li{
                            width: 770px;
                            background:rgba(254,249,245,1);
                            border-radius:10px;
                            text-align: center;
                            position: relative;
                            margin-bottom: 20px;
                            .qqcontent{
                                height: 64px;
                                .top{
                                    display: inline-block;
                                    width: 117px;
                                    height: 38px;
                                    background:  url('../../../assets/image/weixintask.png') no-repeat;
                                    vertical-align: middle;
                                    position: absolute;
                                    left: 16px;
                                    top: 14px;
                                    span{
                                        position: absolute;
                                        top: 10px;
                                        left: 49px;
                                        font-weight:400;
                                        font-size:14px;
                                        color:rgba(51,51,51,1);
                                    }
                                }
                                .middle{
                                    // width: 490px;
                                    display: inline-block;
                                    position: absolute;
                                    left: 149px;
                                    top: 25px;
                                    font-weight:400;
                                    color:rgba(51,51,51,1);
                                    font-size:14px;
                                    &.more{
                                        position: absolute;
                                        left: 157px;
                                        top: 21px;
                                        line-height: 24px;
                                    }
                                }
                                p{
                                    display: inline-block;
                                    width: 89px;
                                    height: 30px;
                                    background:rgba(255,80,95,1);
                                    border-radius:15px;
                                    line-height: 30px;
                                    position: absolute;
                                    right: 12px;
                                    top: 16px;
                                    // cursor: pointer;
                                    span{
                                        font-size:12px;
                                        font-weight:400;
                                        color:rgba(255,255,255,1);
                                    }
                                    &.limit{
                                        background:rgba(226,221,221,1);
                                    }
                                    &.audit{
                                        background:rgba(255,165,48,1);
                                    }
                                    &.active{
                                        background:rgba(254,15,35,1);
                                        cursor: pointer;
                                    }
                                }
                                &.morelong{
                                    height: 104px;
                                    .top{
                                        top: 32px;
                                    }
                                    .middle{
                                        width: 490px;
                                        height: 61;
                                        top: 21px;
                                        text-align: left;
                                        left: 148px;
                                    }
                                    p{
                                        top: 37px;
                                    }
                                }
                            }
                        }
                    }
              }

            }
        }
        .topright{
            width: 380px;
            float: right;
            .rightcontent{
                position: relative;
                font-family:MicrosoftYaHei;
                text-align: center;
                height: 340px;
                background:  url('../../../assets/image/personinfo.png') no-repeat;
                border-radius:8px;
                .toppic{
                    width: 110px;
                    height: 110px;
                    margin-top: 35px;
                    border-radius: 50%;
                }
                p:nth-child(2){
                    font-size:18px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    margin-top: 20px;
                    em{
                        font-size:14px;
                        color:rgba(102,102,102,1);
                        display: inline-block;
                        margin-left: 5px;
                    }
                }
                p:nth-child(3){
                    font-size:14px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    margin-top: 15px;
                    img{
                        width: 14px;
                        height: 11px;
                        margin-left: 3px;
                    }
                }
                p:nth-child(4){
                    width:128px;
                    height:40px;
                    background:rgba(255,80,95,1);
                    border-radius:20px;
                    color:rgba(255,255,255,1);
                    font-weight:400;
                    font-size:14px;
                    line-height: 40px;
                    margin: 0 auto;
                    margin-top: 28px;
                    cursor: pointer;
                    &:hover{
                        background:rgba(254,15,35,1);
                    }
                }
            }
            .rightbottom{
                width: 380px;
                height: 390px;
                background:rgba(255,255,255,1);
                border-radius:8px;
                margin-top: 20px;
                position: relative;
                font-family:MicrosoftYaHei;
                .bottomtitle{
                    width: 374px;
                    height: 13px;
                    background:  url('../../../assets/image/titleshort.png') no-repeat;
                    position: relative;
                    top: 35px;
                    left: 3px;
                    p{
                        font-size:18px;
                        font-weight:bold;
                        color:rgba(51,51,51,1);
                        text-align: center;
                        position: relative;
                        top: -7px;
                    }
                }
                .bottomcontent{
                    position: absolute;
                    left: 27px;
                    top:72px;
                    ul{
                        text-align: left;
                        font-size:12px;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        span{
                            display: inline-block;
                            width: 6px;
                            height: 6px;
                            background:linear-gradient(0deg,rgba(246,161,155,1) 0%,rgba(249,75,64,1) 100%);
                            position: relative;
                            left: -8px;
                          }
                        li:nth-child(1){
                            width: 332px;
                            height: 52px;
                             .ruletitle{
                                line-height: 20px;
                             }
                             .rulecontent{
                                 margin-left: 6px;
                                 line-height: 20px;
                             }
                        }
                        li:nth-child(2){
                            margin-top: 15px;
                            width: 320px;
                            height: 111px;
                            .ruletitle{
                                line-height: 20px;
                             }
                            div{
                                margin-left: 5px;
                                line-height:20px;
                            }
                        }
                        li:nth-child(3){
                            margin-top: 15px;
                            width: 320px;
                            height: 32px;
                            .ruletitle{
                                line-height: 20px;
                             }
                            .rulecontent{
                                 margin-left: 6px;
                                 line-height:20px;
                             }
                        }
                        li:nth-child(4){
                            margin-top: 15px;
                            width: 336px;
                            height: 51px;
                            .ruletitle{
                                line-height: 20px;
                             }
                            .rulecontent{
                                 margin-left: 6px;
                                 line-height:20px;
                             }
                        }
                   }
                }
            }
        }
        .tuiguangcontent{
            width: 1201px;
            height: 376px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            margin: 0 auto;
            margin-top: 20px;
            position: relative;
            text-align: center;
            font-family:MicrosoftYaHei;
            .tuiguangtitle{
                width: 622px;
                height: 13px;
                position: absolute;
                left: 290px;
                top: 31px;
                background:  url('../../../assets/image/titlelong.png') no-repeat;
                p{
                    font-weight:bold;
                    color:rgba(51,51,51,1);
                    font-size:24px;
                    line-height:8px;
                }
            }
            .more{
                position: absolute;
                right: 85px;
                top: 37px;
                cursor: pointer;
                font-size:14px;
                font-weight:400;
                text-decoration:underline;
                color:rgba(51,51,51,1);
            }
            .picList{
                position: absolute;
                top: 66px;
                left: 87px;
                ul{
                    li{
                        width: 334px;
                        height: 280px;
                        background:rgba(254,249,245,1);
                        border:1px solid rgba(255,204,204,1);
                        float: left;
                        p:nth-child(1){
                            font-size:18px;
                            font-weight:bold;
                            color:rgba(51,51,51,1);
                            margin-top: 19px;
                        }
                        p:nth-child(2){
                            width: 288px;
                            height: 84px;
                            font-size:14px;
                            font-weight:400;
                            color:rgba(51,51,51,1);
                            line-height:24px;
                            margin-top: 20px;
                            margin-left: 23px;
                            text-align: left;
                        }
                        p:nth-child(3){
                            font-size:14px;
                            font-weight:400;
                            color:rgba(102,102,102,1);
                            margin-top: 26px;
                        }
                        p:nth-child(4){
                            width:198px;
                            height:48px;
                            background:rgba(255,80,95,1);
                            border-radius:24px;
                            font-size:18px;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                            line-height:48px;
                            margin-top: 24px;
                            margin-left: 68px;
                            cursor: pointer;
                            &.active{
                                background:rgba(254,15,35,1);
                            }
                        }
                    }
                    li:nth-child(1),li:nth-child(2){
                        margin-right: 14px;
                    }
                }
            }
        }
        .footcontent{
            width: 1201px;
            height: 570px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            margin: 0 auto;
            margin-top: 20px;
            position: relative;
            text-align: center;
            font-family:MicrosoftYaHei;
            .foottitle{
                width: 622px;
                height: 13px;
                position: absolute;
                left: 290px;
                top: 31px;
                background:  url('../../../assets/image/titlelong.png') no-repeat;
                p{
                    font-weight:bold;
                    color:rgba(51,51,51,1);
                    font-size:24px;
                    line-height:8px;
                }
            }
            .footpic{
                position: absolute;
                left: 114px;
                top: 83px;
                ul{
                    li{
                        float: left;
                        img{
                            width: 300px;
                            height: 376px;
                        }
                        p{
                            width:198px;
                            height:48px;
                            background:rgba(255,80,95,1);
                            border-radius:24px;
                            font-size:18px;
                            font-family:MicrosoftYaHei;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                            line-height:48px;
                            margin-top: 30px;
                            margin-left: 46px;
                            cursor: pointer;
                            &.active{
                                 background:rgba(254,15,35,1);
                            }
                        }
                    }
                    li:nth-child(1),li:nth-child(2){
                        margin-right: 37px;
                    }
                }
            }
        }
        .blong{
            text-align: center;
             margin-top: 68px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(255,204,204,1);
            opacity:0.63;
        }
    }
   
</style>