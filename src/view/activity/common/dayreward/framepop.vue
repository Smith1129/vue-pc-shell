<!--  -->
<template>
   <div class='dayrewardpop_content'>
      <div class="msgpop" v-if="dayRewardPopType==='msgPop'">
         <div class="cancel" @click="cancel"></div>
         <div class="popname">温馨提醒</div>
         <div class="msg">{{dayRewardPopMsg}}</div>
         <div class="sure" @click="cancel"></div>
      </div>

      <div class="tablepop" v-if="dayRewardPopType==='tablePop'">
         <div class="cancel" @click="cancel"></div>
         <div class="popname">赏金记录</div>
         <div class="tablecontent">
            <table>
               <thead>
                  <tr>
                     <td>获得时间</td>
                     <td>赏金来源</td>
                     <td>获得赏金数量</td>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="(item,index) in dayRewardPopData.List" :key="index">
                     <td>{{item.CreateTime | allTime}}</td>
                     <td>赏金任务{{item.Rule}}</td>
                     <td>{{item.Award}}金猪</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div class="tablepop_page">
              <span :class="currentPage===1?'prev nopage':'prev'" @click="pageArrow(0)">上页</span>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="1"
                :current-page="currentPage"
                @current-change="handlePageChange"
                :total="dayRewardPopData.PageCount"
                >
            </el-pagination>
                <span  @click="pageArrow(1)" :class="currentPage===dayRewardPopData.PageCount?'next nopage':'next'">下页</span>
         </div>
      </div>
   </div>
</template>

<script>
   //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
   //例如：import 《组件名称》 from '《组件路径》';

   export default {
      //import引入的组件需要注入到对象中才能使用
      components: {},
      data() {
      //这里存放数据
         return {
            currentPage:1
         };
      },
      //方法集合
      methods: {
         handlePageChange(page){
            this.currentPage = page
            this.getPageData()
         },
         getPageData(){
            let params = {
               PageNumber:this.currentPage
            }
            this.$store.dispatch('activity/getDayRewardPopData',params)
         },
         pageArrow(index){
            if(index===0 && this.currentPage>1){
               this.currentPage--;
               this.getPageData()
            }else if(index===1 && this.currentPage <this.dayRewardPopData.PageCount)
            {
               this.currentPage++;
               this.getPageData()
            }
         },
         cancel(){
            this.$store.commit('activity/setDayRewardPopShow',false)
         }
      },
      //监听属性 类似于data概念
      computed: {
         dayRewardPopType(){
            return this.$store.state.activity.dayRewardPopType;
         },
         dayRewardPopMsg(){
            return this.$store.state.activity.dayRewardPopMsg;
         },
         dayRewardPopData(){
            return this.$store.state.activity.dayRewardPopData;
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
<style lang='scss'>
    .tablepop_page{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 379px;
      //   margin-top: 208px;
        .prev,.next{
            position: absolute;
            display: inline-block;
            width: 44px;
            height: 24px;
            cursor: pointer;
            box-sizing: border-box;
            background:rgba(255,223,185,1);
            border:1px solid rgba(250,190,120,1);
            text-align: center;
            line-height: 24px;
            color:rgba(135,67,68,1);
            &.nopage{
               background:rgba(252,253,220,1);
               font-size:12px;
               color:rgba(189,139,139,1);
            }
        }
        .prev{
            left: -45px;
            top: 2px;
        }
        .next{
            right: -45px;
            top: 2px;
        }
        .el-pagination{
            .btn-next{
                display: none;
            }
            .btn-prev{
                display: none;
            }
            li{
                padding: 0 !important;
                min-width: 24px !important;
                height: 24px;
                line-height: 24px;
                background:rgba(255,223,185,1) !important;
                font-size: 12px;
                font-weight: 400 !important;
                color:rgba(135,67,68,1) !important;
                border:1px solid rgba(250,190,120,1);
                margin-right: 2px !important;
                cursor: pointer;
                &.active{
                  // background:rgba(244,184,55,1) !important;
                  background:#f54445 !important;
                  // border:1px solid rgba(250,190,120,1);;
                  border:1px solid #f54445;
                  color: rgba(252,253,220,1) !important;
                }
                &.active+li{
                  border:1px solid rgba(250,190,120,1);
                }
                &.el-icon{
                    border: none;
                    background: none !important;
                    line-height: 20px;
                    position: relative;
                    top: -2px;
                }
            }
        }
    }
</style>
<style lang='scss' scoped>
   .dayrewardpop_content{
      width: 100%;
      height: 100%;
      position: fixed;
      background: rgba(0,0,0,0.4);
      z-index: 999999;
      top:0;
      .tablepop{
         width: 1099px;
         height: 478px;
         background: url('../../../../assets/image/rewardlog.png') no-repeat;
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%,-50%);
         .cancel{
            width:32px;
            height:32px;
            background: url('../../../../assets/image/dayreward_cancel.png') no-repeat;
            position: absolute;
            right: 0;
            top: 7px;
            cursor: pointer;
         }
         .popname{
            width: 100%;
            text-align: center;
            line-height: 27px;
            font-weight:bold;
            color:rgba(165,41,41,1);
            font-size:28px;
            margin-top: 21px;
         }
         .tablecontent{
            width: 742px;
            position: absolute;
            left: 187px;
            top: 111px;
            // transform: translate(-50%,-50%);
            table{
               width: 100%;
               border: 1px solid rgba(250,190,120,1);
               box-sizing: border-box;
               thead{
                  width: 100%;
                  background:rgba(255,223,185,1);
                  tr{
                     width: 100%;
                     td{
                        height: 36px;
                        box-sizing: border-box;
                        border-right: 1px solid rgba(250,190,120,1);
                        border-bottom: 1px solid rgba(250,190,120,1);
                        text-align: center;
                        font-size:16px;
                        font-weight:bold;
                        color:rgba(135,67,68,1);
                     }
                     td:nth-child(1){
                        width: 286px;
                     }
                     td:nth-child(2){
                        width: 256px;
                     }
                     td:nth-child(3){
                        width: 197px;
                        border-right: none;
                     }
                  }
               }
               tbody{
                  width: 100%;
                  tr{
                     width: 100%;
                     td{
                        height: 41px;
                        text-align: center;
                        box-sizing: border-box;
                        font-size:16px;
                        font-weight:400;
                        color:rgba(135,67,68,1);
                        border-right: 1px solid rgba(250,190,120,1);
                        border-bottom: 1px solid rgba(250,190,120,1);
                     }
                  }
               }
            }
         }

      }
      .msgpop{
         width: 756px;
         height: 350px;
         background: url('../../../../assets/image/msgpop.png') no-repeat;
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%,-50%);
         .cancel{
            width:32px;
            height:32px;
            background: url('../../../../assets/image/dayreward_cancel.png') no-repeat;
            position: absolute;
            right: 0;
            top: 7px;
            cursor: pointer;
         }
         .popname{
            width: 100%;
            text-align: center;
            line-height: 27px;
            font-weight:bold;
            color:rgba(165,41,41,1);
            font-size:28px;
            margin-top: 21px;
         }
         .msg{
            width: 100%;
            text-align: center;
            line-height: 22px;
            font-size:22px;
            color:rgba(135,67,68,1);
            font-weight:400;
            margin-top: 100px;
         }
         .sure{
            width: 203px;
            height: 74px;
            background: url('../../../../assets/image/popsure.png') no-repeat;
            margin-left: 283px;
            margin-top: 57px;
            cursor: pointer;
         }
      }
   }
</style>