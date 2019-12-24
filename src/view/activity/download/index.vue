<!--  -->
<template>
   <div class='download_all'>
       <head-nav></head-nav>
       <div class="download_content">
           <div class="pic_content">
               <div class="name_content"></div>
               <div class="code_content">
                   <div class="ercode"></div>
                   <p>安卓、ios扫码下载安装</p>
               </div>
           </div>
            <div class="type_content">
                <div class="type_item">休闲试玩</div>
                <div class="type_item">娱乐游戏</div>
                <div class="type_item">悬赏任务</div>
            </div>
       </div>
   </div>
</template>
<script>
   //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
   //例如：import 《组件名称》 from '《组件路径》';
import headNav from '../../activity/common/nav';
   export default {
      //import引入的组件需要注入到对象中才能使用
      components: {headNav},
      data() {
      //这里存放数据
         return {
            
         };
      },
      //方法集合
      methods: {
         
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
   .download_all{
       width: 100%;
       overflow: hidden;
       position: relative;
       height: 1078px;
       .download_content{
           width: 1920px;
           height: 1036px;
           position: absolute;
           left: 50%;
           margin-left: -960px;
           background: url('../../../assets/image/download_bg.png') no-repeat;
           .pic_content{
               position: absolute;
               top: 85px;
               right: 429px;
               .name_content{
                   width: 415px;
                   height: 218px;
                   background: url('../../../assets/image/download_name.png') no-repeat;
               }
               .code_content{
                   position: absolute;
                   left: 106px;
                   top: 235px;
                   background: #ffffff;
                   text-align: center;
                   padding: 15px;
                   box-sizing: border-box;
                   border-radius: 10px;
                   .ercode{
                       width: 215px;
                       height: 215px;
                       background: url('../../../assets/image/download_code.png') no-repeat;
                   }
                   p{
                       font-size: 20px;
                       line-height: 19px;
                       color: #FF8C00;
                       font-weight: 500;
                       margin-top: 10px;
                   }
               }
           }
           .type_content{
               width: 100%;
               position: absolute;
               bottom: 146px;
               display: grid;
               grid-template-rows: repeat(44px);
               grid-template-columns: repeat(3,153px);
               justify-content:center;
               grid-column-gap:62px;
               .type_item{
                   width: 100%;
                   height: 44px;
                   border: 1px solid rgba(246,91,21,1);
                   border-radius:10px;
                   box-sizing: border-box;
                   text-align: center;
                   color: #FD7B09;
                   line-height: 44px;
                   font-size: 26px;
                   font-weight: 500;
               }
           }
       }
   }
</style>