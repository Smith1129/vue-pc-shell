<!--  -->
<template>
   <div class='open_box_frame'>
       <div class="open_box_frame_content">
           <div class="frame_cancel" @click="popCancel"></div>
           <div class="frame_content" v-if="msgInner != -1">
               <p>历经艰苦总算找到一个{{
                    msgInner==0?'木钥匙'
                    :msgInner==1?'金钥匙'
                    :msgInner==2?'钻石钥匙'
                    :msgInner==3?'龙吟钥匙'
                    :msgInner==4?'虎啸钥匙'
                    :''
                   }}了 </p>
               <p>偷偷的打开宝箱，获得{{msgAward}}！ </p>
           </div>
           <div class="frame_content" v-else>
               <p>{{worryMsg}} </p>
           </div>
           <div class="frame_sure" @click="popCancel"></div>
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
            
         };
      },
      props:['msgInner','msgAward','worryMsg'],
      //方法集合
      methods: {
         popCancel(){
             this.$emit('frameChange')
         }
      },
      //监听属性 类似于data概念
      computed: {},
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
   .open_box_frame{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0, 0, 0, 0.4);
        z-index: 999999;
        top: 0;
        .open_box_frame_content{
            width: 631px;
            height: 319px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            background: url('../../../assets/image/openbox_frame.png') no-repeat;
            .frame_cancel{
                width: 20px;
                height: 20px;
                background: url('../../../assets/image/openbox_cancel.png') no-repeat;
                position: absolute;
                right: 40px;
                top: 25px;
                cursor: pointer;
            }
            .frame_content{
                position: absolute;
                top: 85px;
                width: 100%;
                p{
                    text-align: center;
                    line-height: 24px;
                    font-size:24px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(97,31,60,1);
                }:nth-child(2){
                    margin-top: 23px;
                }
            }
            .frame_sure{
                width: 171px;
                height: 61px;
                background: url('../../../assets/image/open_box_sure.png') no-repeat;
                position: absolute;
                bottom: 49px;
                left: 50%;
                transform: translateX(-50%);
                cursor: pointer;
            }
        }
}
</style>