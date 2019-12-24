<!--  -->
<template>
   <div class='midautumn_pop'>
           <div class="pop1" v-if="type=='awardpop'">
               <!-- <p>恭喜获得本周三重天飞升奖励，10000金猪</p> -->
               <p>{{popMsg}}</p>
               <p @click="cancelpop"></p>
               <p class="popcancel" @click="cancelpop"></p>
           </div>

           <div class="pop2" v-if="type==='tablepop'">
               <div class="poptop">
               </div>
               <div class="popcancel" @click="cancelpop">
               </div>
               <div class="poptable">
                   <table>
                       <thead>
                           <tr>
                               <td>时间</td>
                               <td>仙丹来源</td>
                               <td>获得数量</td>
                           </tr>
                       </thead>
                       <tbody>
                          <tr v-for="(item,index) in tableData.List" :key="index">
                              <td>{{item.CreateTime | allTime}}</td>
                              <td>{{item.Desc}}</td>
                              <td>{{item.Value}}</td>
                          </tr>
                       </tbody>
                   </table>
               </div>
               <div class="pop_table_page">
                   <page :rankType="'popPage'" :pageNumber= "tableData.PageCount"></page>
               </div>
           </div>
   </div>
</template>

<script>
   //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
   //例如：import 《组件名称》 from '《组件路径》';
    import page from './page'
   export default {
      //import引入的组件需要注入到对象中才能使用
      components: {
          page
      },
      data() {
      //这里存放数据
         return {
            //  type:'tablepop',  //tablepop
         };
      },
    //   props:['type'],
      //方法集合
      methods: {
          cancelpop(){
              this.$store.commit('activity/setMidPopStatus',false)
          },
      },
      //监听属性 类似于data概念
      computed: {
          popMsg(){
              return this.$store.state.activity.midPopMsg
          },
          type(){
              return this.$store.state.activity.midPopType
          },
          tableData(){
              return this.$store.state.activity.autumnPopRank
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
        .midautumn_pop{
            width: 100%;
            height: 100%;
            position: fixed;
            background: rgba(0,0,0,0.4);
            z-index: 999999;
            top:0;
            .pop1{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                width: 506px;
                height: 338px;
                background: url('../../../assets/image/pop1.png') no-repeat;
                p:nth-child(1){
                    width: 100%;
                    font-size: 18px;
                    text-align: center;
                    color: #fff;
                    position: absolute;
                    top: 141px;

                }
                p:nth-child(2){
                    position: absolute;
                    top: 212px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 209px;
                    height: 54px;
                    background: url('../../../assets/image/pop1button.png') no-repeat;
                    cursor: pointer;
                }
                .popcancel{
                    cursor: pointer;
                    width:28px;
                    height:28px;
                    background: url('../../../assets/image/popcancel.png') no-repeat;
                    position: absolute;
                    right: -8px;
                    top: 31px;
                }
            }
            .pop2{
                width: 946px;
                height: 654px;
                background: url('../../../assets/image/pop2.png') no-repeat;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                .poptop{
                    margin-top: 86px;
                    margin-left: 71px;
                    width: 805px;
                    height: 18px;
                    background: url('../../../assets/image/poptip.png') no-repeat;
                }
                .popcancel{
                    cursor: pointer;
                    width:28px;
                    height:28px;
                    background: url('../../../assets/image/popcancel.png') no-repeat;
                    position: absolute;
                    right: -8px;
                    top: 31px;
                }
                .poptable{
                    width: 806px;
                    margin-left: 71px;
                    // height: 38px;
                    table{
                        width: 100%;
                        thead{
                            width: 100%;
                            // height: 38px;
                            background:rgba(207,166,80,1);
                            border: 1px solid rgba(207,166,80,1);
                            tr{
                                width: 100%;
                                td{
                                    width: 40%;
                                    height: 38px;
                                    font-size:16px;
                                    color:rgba(255,255,255,1);
                                    box-sizing: border-box;
                                    text-align: center;
                                }
                                td:nth-child(3){
                                    width: 20%;
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
                                    width: 40%;
                                    text-align: center;
                                    box-sizing: border-box;
                                    height:42px;
                                    font-size:16px;
                                    color:rgba(199,135,2,1);
                                    border-right: 1px solid rgba(207,166,80,1);
                                }:nth-last-child(1){
                                    border-right: none;
                                }:nth-child(2){
                                    width: 20px;
                                }
                            }
                        }
                    }
                    // background:rgba(207,166,80,1);
                }
                .pop_table_page{
                    width: 806px;
                    height: 30px;
                    margin-top: 25px;
                    margin-left: 71px;
                }
            }
        }
   
</style>