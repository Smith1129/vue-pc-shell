<template>
   <div class='popContent'>
        <div class="popList">
            <img src="../../../../assets/image/thirdpop.png" class="pic">
            <div class="popInner" @click="back">立即收下它</div>
            <p v-if="boxOpenInfo">开启宝箱，获得{{boxOpenInfo.Award}}金猪</p>
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
            // this.$router.push({path:'/'});
            this.$store.dispatch('activity/getBoxStatusInfo')
            this.$store.commit('activity/setThirdMallPop',false)
          }
      },
      //监听属性 类似于data概念
      computed: {
          boxOpenInfo(){
              return this.$store.state.activity.boxOpenInfo
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
    .popContent{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        left:0;
        background:rgba($color: #000000, $alpha: 0.6);
        z-index: 999;
        .popList{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 9999;
            .pic{
                 width: 783px;
                 height: 753px;
                 background-size: 100% 100%;
                 background-repeat: no-repeat;
            }
            p{
                font-size:18px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(21,92,65,1);
                line-height:40px;
                position: absolute;
                top: 303px;
                left: 302px;
                // transform: translate(-50%)
                // position: absolute;
                // top: 100px;
            }
            .popInner{
                width: 200px;
                height: 47px;
                background:rgba(249,213,58,1);
                border-radius:24px;
                text-align: center;
                line-height: 47px;
                position: absolute;
                bottom: 111px;
                left: 316px;
                font-size:20px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(85,42,25,1);
                cursor: pointer;
                // left: 316px;
            }
        }
    }
   
</style>