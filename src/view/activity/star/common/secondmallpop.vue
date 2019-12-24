<!--  -->
<template>
   <div class='popContent'>
        <div class="popList">
            <div>
                <img src="../../../../assets/image/interest.png" class="interest">
            </div>
            <img src="../../../../assets/image/dotry.png" class="dotry" @click="back()">
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
      //方法集合
      methods: {
          back(){
            this.$router.push({path:'/'});
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
    .popContent{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        left:0;
        background:rgba($color: #000000, $alpha: 0.7);
        z-index: 999;
        .popList{
            background: url('../../../../assets/image/popsec.png') no-repeat;
            position: absolute;
            left: 50%;
            top: 40%;
            transform: translate(-50%,-50%);
            z-index: 9999;
            width: 478px;
            height: 576px;
            div{
                text-align: center;
                margin-top:240px;
            }
            .interest{
                width:217px;
                height: 158px;
            }
            .dotry{
                position: absolute;
                bottom: -22px;
                left: 50%;
                margin-left: -115px;
                width: 238px;
                height: 76px;
                cursor: pointer;
            }
        }
    }
   
</style>