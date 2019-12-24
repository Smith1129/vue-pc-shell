<!--  -->
<template>
   <div class='bgcontent'>
       <head-nav></head-nav>
       <div class="bgpic">
           <p>活动时间：7月25日~8月8日</p>
       </div>
       <flex></flex>
        <router-view></router-view>
   </div>
</template>

<script>
   //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
   //例如：import 《组件名称》 from '《组件路径》';
// import axios from 'axios'
   import headNav from '../../activity/common/nav'
   import flex from '@/components/index/flex'
   export default {
      //import引入的组件需要注入到对象中才能使用
      components: {
          headNav,
          flex
      },
      data() {
      //这里存放数据
         return {
             fileData:[]
         };
      },
      //方法集合
      methods: {
        //   update(event){
        //       this.fileData = event.target.files
        //     //   console.log(event.target.files[0])
        //   },
        //   upload(){
        //       const formdata = new FormData();
        //       formdata.append('smfile', this.fileData[0]);
        //       axios.post('https://sm.ms/api/upload',formdata).then(res =>{
                    
        //       })
              
        //   }
         
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
    .bgcontent{
        width: 100%;
        // height: 600px;
        overflow: hidden;
        // background: #fff;
        position: relative;
        background: #f94b40;
        .bgpic{
            width: 1920px;
            height: 600px;
            background:  url('../../../assets/image/bghead.jpg') center right no-repeat;
            position: absolute;
            left: 50%;
            margin-left: -960px;
            // margin: 0 auto;
            // background-size: 100% 100%;
            position: relative;
            p{
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:bold;
                color:rgba(255,255,255,1);
                position: absolute;
                left: 824px;
                top: 168px;
            }
        }
        
    }
   
</style>