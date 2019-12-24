<!--  -->
<template>
   <div class='content'>
       <div class="fontcontent">
           <div class="allcontent">
                <div class="title"><p>文字素材</p></div>
                <div class="middlecontent">
                    <ul>
                        <li v-for="(item,index) in fontList" :key="index" :class="index==0?'first':''">
                            <p><span>{{item.title}}</span></p>
                            <p v-if="userInfo">{{`${item.content}http://t.ttz.com/${userInfo.UserId}`}}</p>
                            <p v-else>{{`${item.content}http://t.ttz.com`}}</p>
                             <p
                             :data-clipboard-text="userInfo?`${fontList[index].content}http://t.ttz.com/${userInfo.UserId}`:`${fontList[index].content}http://t.ttz.com`"
                             @click="copy"
                             class="copybtn"
                             >复制素材
                             </p>
                        </li>
                    </ul>
                </div>
           </div>
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
             fontList:[
                 {content:'上跳跳猪，金猪送给你，学生党，上班族、宝妈、游戏爱好者，只要有时间都适合的赚钱方式，随便玩玩，零花钱到手，一般玩玩，双倍工资，认真玩玩，月入过万。',title:'素材一'},
                 {content:'自从上了跳跳猪，妈妈再也不用担心我玩游戏了，女朋友也不会反对我玩游戏了，原来玩游戏还可以赚钱，女朋友包包口红完全不成问题，自己还留有生活费。',title:'素材二'},
                 {content:'足不出户也能赚钱，天天赚不停，月月爽翻天，各种活动奖励不间断，娱乐赚钱尽在跳跳猪，各种好礼奖励都在等着你哦。',title:'素材三'},
                 {content:'天天赚钱，周周奖励，月月榜单，一边工作一边赚外快，双倍工资真过瘾！跳跳猪，一个会赚钱的网站。',title:'素材四'},
                 {content:'玩游戏还能赚钱？游戏试玩五大榜，超20万奖金等你拿！跳跳猪这是要搞事情啊！充值游戏还有额外奖励，我的天呐！兄弟开黑不？',title:'素材五'},
                 {content:'疯狂棋牌种类多，月月兑换3000元，来跳跳猪，不仅让你感受棋牌的快感，还有丰厚的奖励，来跳跳猪我们棋牌场里携手前进。',title:'素材六'},
                 {content:'每天为了没钱和闲得无聊而苦恼？来跳跳猪吧，一个能让你的时间换来金钱和开心的地方，边玩游戏边赚钱，娱乐赚钱两不误！',title:'素材七'},
                 {content:'每天下班、下课后感觉没事做？跳跳猪集结各种有趣的游戏活动，可以抽奖、兑换，各种精美奖品送不停，说不定还可以找到志同道合的另一半哦。',title:'素材八'}
             ]
            
         };
      },
      //方法集合
      methods: {
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
            }
      },
      //监听属性 类似于data概念
      computed: {
          userInfo(){
              return this.$store.state.user.userInfo
         }
      },
      //监控data中的数据变化
      watch: {},
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
         
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
         
      },
   }
</script>
<style lang='scss' scoped>
    .content{
        width: 100%;
        // height: 1258px;
        height: 913px;
        position: relative;
        overflow: hidden;
        margin-top: -255px;
        .fontcontent{
            width: 1920px;
            height: 913px;
            position: absolute;
            left: 50%;
            margin-left: -960px;
            background: #f94b40;
            .allcontent{
                width: 1200px;
                height: 780px;
                background:rgba(255,255,255,1);
                border-radius:8px;
                margin: 0 auto;
                // position: absolute;
                // top: 0;
                // left: 50%;
                // top: 40%;
                position: relative;
                .title{
                    width: 622px;
                    height: 13px;
                    background:  url('../../../assets/image/titlelong.png') no-repeat;
                    text-align: center;
                    position: absolute;
                    left: 289px;
                    top: 50px;
                    p{
                        font-size:24px;
                        color:rgba(51,51,51,1);
                        font-weight:bold;
                        position: relative;
                        top: -12px
                    }
                }
                .middlecontent{
                    position: absolute;
                    left: 21px;
                    top: 93px;
                    ul{
                        li{
                            width: 1160px;
                            height: 74px;
                            background:rgba(254,249,245,1);
                            border-radius:10px;
                            text-align: left;
                            position: relative;
                            p{
                                display: inline-block;
                                font-family:MicrosoftYaHei;
                                font-weight:400;
                                font-size: 14px;
                            }
                            p:nth-child(1){
                                width: 117px;
                                height: 38px;
                                background: url('../../../assets/image/titleA.png') no-repeat;
                                margin-top: 18px;
                                margin-left: 16px;
                                span{
                                    position: absolute;
                                    left: 65px;
                                    top: 29px;
                                }
                            }
                            p:nth-child(2){
                                width: 828px;
                                height: 38px;
                                color:rgba(51,51,51,1);
                                line-height:24px;
                                margin-left: 17px;
                                position: absolute;
                                top: 18px;
                            }
                            p:nth-child(3){
                                width:89px;
                                height:30px;
                                background:rgba(255,80,95,1);
                                border-radius:15px;
                                color:rgba(255,255,255,1);
                                font-size:12px;
                                line-height: 30px;
                                text-align: center;
                                position: absolute;
                                right: 28px;
                                top: 22px;
                                cursor: pointer;
                                &:hover{
                                    background:rgba(254,15,35,1);
                                }
                            }
                        }
                        li:not(.first){
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
    }
   
</style>