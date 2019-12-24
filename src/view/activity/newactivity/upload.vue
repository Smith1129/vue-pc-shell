<!--  -->
<template>
   <div class='content'>
       <div class="allcontent">
           <div class="uploadcontent">
               <div class="title"><p>上传图片</p></div>
                <div class="middlecontent">
                   <div class="leftcontent">
                       <p>请上传你的截图</p>
                       <img :src="pic">
                       <p v-show="!piccheck"><input type="file" ref="inputImg" id="filebtn" class="filebtn" accept="image/*"  @change="update($event)">立即上传</p>
                       <!-- <div v-show="piccheck"> -->
                       <!-- <span @click="sure">确认</span><span @click="cancel">取消</span> -->
                       <p v-show="piccheck"><input type="file" ref="inputImg" id="filebtn" class="filebtn" accept="image/*"  @change="update($event)">重新上传</p>
                       <!-- </div> -->
                   </div>
                   <div class="rightcontent">
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
                <div class="submit" :class="piccheck?'canupload':''" @click="sure">提交任务</div>
           </div>
       </div>
   </div>
</template>

<script>
   //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
   //例如：import 《组件名称》 from '《组件路径》';
    import axios from 'axios'
    import { upload } from '@/api/http'
   export default {
      //import引入的组件需要注入到对象中才能使用
      components: {},
      data() {
      //这里存放数据
         return {
             pic:require('../../../assets/image/morenavatar.png'),
             piccheck:false,
             imgUrl:'',
             tasksInfo:{},
             fileData:{},
             ruleList:[
                 {contentTitle:'【活动内容】',content:'分享文字素材和图片素材，完成QQ任务、微信任务即可获得相应的奖励，记得带上自己的好友邀请链接哦！'},
                 {contentTitle:'【活动规则】',content:'1.QQ空间、朋友圈动态24小时内不可删除，否则无效。 2.死群或僵尸群不算任何奖励。 3.同一ID每条任务上限为三次，达上限后该任务不可提交。4.任务A提交审核通过后，才能再次提交任务A。5.严禁刷奖励刷号，一经查实，冻结账户，扣除奖励。'},
                 {contentTitle:'【任务提交】',content:'请提交全屏截图，不规范或不合格者一律不发放任何奖励。'},
                 {contentTitle:'【奖励发放】',content:'任务提交后，管理员审核通过后，自动发放到账号。请及时查看金猪明细。'}
             ],
         };
      },
      //方法集合
      methods: {
            update(event){
              this.piccheck = true
              this.fileData = event.target.files[0]
              if (!event || !window.FileReader) return
              let reader = new FileReader()
              var that = this
              reader.readAsDataURL(that.fileData)
              reader.onloadend = function () {
                  that.pic = this.result
                }
                this.upload();
          },
           upload(){
               console.log(this.fileData.type)
               if(this.fileData.type.indexOf("image/")== -1){
                   alert('请选择正确格式的图片')
               }else{
                   const  isLt2M = this.fileData.size / 1024 / 1024 < 2
                   if(!isLt2M){
                       alert('上传图片大小不能超过2MB')
                   }else{
                        const formdata = new FormData();
                        formdata.append('smfile', this.fileData);
                        axios.post('https://sm.ms/api/upload',formdata).then(res =>{
                                if(res.data.code == 'success'){
                                    this.imgUrl = res.data.data.url
                                    // console.log(res.data)
                                }else{
                                    alert('上传失败')
                                }
                        })
                   }
               }
            //    if(this.fileData.size >= 3145728){
            //        alert('文件过大')
            //    }else{

            //    }
                // const formdata = new FormData();
                // formdata.append('smfile', this.fileData);
                // axios.post('https://sm.ms/api/upload',formdata).then(res =>{
                //         if(res.data.code == 'success'){
                //             this.imgUrl = res.data.data.url
                //             // console.log(res.data)
                //         }else{
                //             alert('上传失败')
                //         }
                // })
          },
          sure(){
              if(this.imgUrl){
                   return new Promise((resolve,reject)=>{
                       let params = {Type:this.tasksInfo.type,Rule:this.tasksInfo.rule,ImgUrl:this.imgUrl}
                        upload(params).then(res=>{
                            alert('上传成功')
                            this.$router.push({path:'/activity/fourmall'})
                            resolve()
                        }).catch(error => {
                            reject(error)
                        })
                    })
              }else{
                  alert('请先选择图片')
              }
            //   this.upload()
          },
          cancel(){
            //   this.piccheck = false;
            //   this.fileData = {};
            //   this.$refs.inputImg.value = ''
            //   this.pic = require('../../../assets/image/morenavatar.png');
          }
      },
      //监听属性 类似于data概念
      computed: {
          
      },
      //监控data中的数据变化
      watch: {
        
      },
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
          this.tasksInfo = this.$route.query
        //   this.$route.query
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
         
      },
   }
</script>
<style lang='scss' scoped>
    .content{
        width: 100%;
        // height: 1158px;
        height: 813px;
        overflow: hidden;
        position: relative;
        margin-top: -255px;
        .allcontent{
            width: 1920px;
            // height: 1158px;
             height: 813px;
            background: #f94b40;
            position: absolute;
            left: 50%;
            margin-left: -960px;
            .uploadcontent{
                width: 1200px;
                height: 660px;
                background:rgba(255,255,255,1);
                border-radius:8px;
                margin: 0 auto;
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
                .submit{
                    width:254px;
                    height:54px;
                    background:rgba(226,221,221,1);
                    border-radius:27px;
                    text-align: center;
                    line-height: 54px;
                    font-size:18px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    position: absolute;
                    bottom: 47px;
                    left: 473px;
                    &.canupload{
                        background:rgba(255,80,95,1);
                        cursor: pointer;
                    }
                }
                .middlecontent{
                    width: 1081px;
                    height: 401px;
                    position: absolute;
                    left: 50px;
                    top: 110px;
                    .leftcontent{
                        width: 573px;
                        height: 401px;
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(255,204,204,1);
                        float: left;
                        text-align: center;
                        position: relative;
                        p:nth-child(1){
                            font-size:18px;
                            font-family:MicrosoftYaHei;
                            font-weight:bold;
                            color:rgba(51,51,51,1);
                            margin-top: 30px;
                        }
                        img{
                            width: 350px;
                            height: 210px;
                            margin-top: 33px;
                        }
                        p:nth-child(3){
                            width:198px;
                            height:48px;
                            box-sizing: border-box;
                            background:rgba(255,80,95,1);
                            border-radius:24px;
                            font-size:18px;
                            font-family:MicrosoftYaHei;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                            line-height: 43px;
                            margin-top: 30px;
                            margin-left: 188px;
                            cursor: pointer;
                            padding: 3px 5px;
                            overflow: hidden;
                            position: relative;
                            &:hover{
                                background:rgba(254,15,35,1);
                            }
                            input{
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                top: 0;
                                left: 0;
                                outline: none;
                                background-color: transparent;
                                filter:alpha(opacity=0);
                                -moz-opacity:0;
                                -khtml-opacity: 0;
                                opacity: 0;
                                // display: none;
                            }
                            // span:nth-child(1){

                            // }
                        }
                        p:nth-child(4){
                            width:198px;
                            height:48px;
                             box-sizing: border-box;
                            background:rgba(255,80,95,1);
                            border-radius:24px;
                            font-size:18px;
                            font-family:MicrosoftYaHei;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                            line-height: 43px;
                            margin-top: 30px;
                            margin-left: 188px;
                            cursor: pointer;
                            padding: 3px 5px;
                            overflow: hidden;
                            position: relative;
                            &:hover{
                                background:rgba(254,15,35,1);
                            }
                            input{
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                top: 0;
                                left: 0;
                                outline: none;
                                background-color: transparent;
                                filter:alpha(opacity=0);
                                -moz-opacity:0;
                                -khtml-opacity: 0;
                                opacity: 0;
                                // display: none;
                            }
                        }
                        // div{
                        //     position: absolute;
                        //     top: 321px;
                        //     left: 146px;
                        //     span{
                        //         display: inline-block;
                        //         width: 109px;
                        //         height: 48px;
                        //         background:rgba(255,80,95,1);
                        //         border-radius:24px;
                        //         font-size:18px;
                        //         font-family:MicrosoftYaHei;
                        //         font-weight:400;
                        //         color:rgba(255,255,255,1);
                        //         line-height: 48px;
                        //         text-align: center;
                        //         cursor: pointer;
                        //     }
                        //     span:nth-child(1){
                        //         margin-right: 60px;
                        //     }
                        // }
                    }
                    .rightcontent{
                        width:447px;
                        height:401px;
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(255,204,204,1);
                        float: right;
                        position: relative;
                        .bottomtitle{
                            width: 374px;
                            height: 13px;
                            background:  url('../../../assets/image/titleshort.png') no-repeat;
                            position: absolute;
                            top: 39px;
                            left: 42px;
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
                            top:93px;
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
                                    margin-top: 17px;
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
                                    margin-top: 17px;
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
                                    margin-top: 17px;
                                    width: 412px;
                                    height: 51px;
                                    .ruletitle{
                                        line-height: 20px;
                                    }
                                    .rulecontent{
                                        margin-left: 6px;
                                        line-height: 20px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
   
</style>