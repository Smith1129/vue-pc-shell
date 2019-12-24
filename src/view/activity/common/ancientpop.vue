<!--  -->
<template>
   <div class='ancient_pop'>
      <div class="ancient_pop_content">
         <div class="ancient_pop_title">{{right?'恭喜您!':'对不起!'}}</div>
         <div class="ancient_pop_cancel" @click="popCancel"></div>
         <div class="ancient_pop_inner" v-if="right">
            <p>恭喜您获得{{rightMsg.name}}</p>
            <p>获得<em>{{rightMsg.award}}w银猪</em></p>
         </div>
         <div class="ancient_pop_btn" @click="popCancel" v-if="right"></div>
         <div class="ancient_pop_inner worry" v-if="!right">
            <p>{{worryMsg}}</p>
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
            
         };
      },
      props:['right','rightMsg','worryMsg'],
      //方法集合
      methods: {
         popCancel(){
            this.$emit('popChange')
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
   .ancient_pop{
      width: 100%;
      height: 100%;
      position: fixed;
      background: rgba(0, 0, 0, 0.4);
      z-index: 999999;
      top: 0;
      .ancient_pop_content{
         width: 464px;
         height: 344px;
         background: url('../../../assets/image/ancient_popbg.png') no-repeat;
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%,-50%);
         .ancient_pop_cancel{
            width: 33px;
            height: 33px;
            background: url('../../../assets/image/ancient_cancel.png') no-repeat;
            position: absolute;
            right: -10px;
            top: -7px;
            cursor: pointer;
         }
         .ancient_pop_title{
            position: absolute;
            left: 188px;
            top: 6px;
            // width: 100%;
            // text-align: center;
            font-size: 30px;
            color: #ffffff;
         }
         .ancient_pop_inner{
            width: 100%;
            position: absolute;
            top: 122px;
            &.worry{
               top: 159px;
            }
            p{
               width: 100%;
               text-align: center;
               font-size:24px;
               color:rgba(82,106,180,1);
               em{
                  color: #FB6A49;
               }
            }:nth-child(2){
               margin-top: 3px;
            }
         }
         .ancient_pop_btn{
            width: 252px;
            height: 55px;
            background: url('../../../assets/image/ancient_get.png') no-repeat;
            position: absolute;
            left: 50%;
            bottom: 64px;
            transform: translateX(-50%);
            cursor: pointer;
         }
      }
   }
</style>