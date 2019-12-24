<!--  -->
<template>
   <div class='page_content'>
       <div class="page">
            <span @click="pagePrev" :class="currentPage===1?'noprev':''"></span>
            <!-- <span>1</span> -->
            <span :class="index+1===currentPage&&rankType==='tablePage'?'active':index+1===currentPage&&rankType==='popPage'?'active1':''"
             v-for="(item,index) in pageNumber" :key="index"
             @click="pageSearch(index)"
             >
             {{item}}</span>
            <span @click="pageNext" :class="currentPage===pageNumber?'nonext':''"></span>
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
            page:[1,2,3,4,5],
            currentPage:1
         };
      },
      props:['rankType','pageNumber'],
      //方法集合
      methods: {
         pageSearch(index){
            if(this.rankType==='tablePage'){
                this.currentPage = index+1
            }else if(this.rankType==='popPage'){
                this.currentPage = index+1
            }
         },
         getPageData(page)
         {
             if(this.rankType==='tablePage'){
                  let param = {
                 PageNumber:page
                }
                this.$store.dispatch('activity/getAutumnRank',param);
             }else if(this.rankType==='popPage'){
                 let param = {
                      PageNumber:page
                 }
                this.$store.dispatch('activity/getAutumnPopRank',param);
             }
         },
         pagePrev(){
             if(this.rankType==='tablePage' && this.currentPage>1){
                 this.currentPage = this.currentPage - 1
             }else if(this.rankType==='popPage' && this.currentPage>1){
                 this.currentPage = this.currentPage - 1
             }
         },
         pageNext(){
             if(this.rankType==='tablePage' && this.currentPage<this.pageNumber){
                 this.currentPage = this.currentPage + 1
             }else if(this.rankType==='popPage' && this.currentPage<this.pageNumber){
                 this.currentPage = this.currentPage + 1
             }
         }
         
      },
      //监听属性 类似于data概念
      computed: {
          autumnPopRank(){
              console.log(this.$store.state.activity.autumnPopRank,'dd')
              return this.$store.state.activity.autumnPopRank
          }
      },
      //监控data中的数据变化
      watch: {
          currentPage(newVal){
              this.getPageData(this.currentPage)
          }
      },
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
         
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
         this.autumnPopRank
      },
   }
</script>
<style lang='scss' scoped>
        .page_content{
            width: 100%;
            height: 100%;
            position: relative;
            .page{
                width: 100%;
                text-align: center;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                span{
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background:rgba(255,255,255,1);
                    border-radius:2px;
                    font-size:14px;
                    color:rgba(106,124,162,1);
                    line-height: 30px;
                    text-align: center;
                    position: relative;
                    top: -10px;
                    cursor: pointer;
                    margin-right: 3px;
                    &.active{
                        background:rgba(54,160,129,1);
                        color:rgba(255,255,255,1);
                    }
                    &.active1{
                        background:rgba(207,166,80,1);
                        color:rgba(255,255,255,1);
                    }
            }:nth-child(1){
                position: relative;
                top: 0;
                background: url('../../../assets/image/midprev.png') no-repeat;
                &.noprev{
                    background: url('../../../assets/image/midprev1.png') no-repeat;
                }
                margin-right: 12px;
            }:nth-last-child(1){
                position: relative;
                top: 0;
                background: url('../../../assets/image/midnext.png') no-repeat;
                margin-left: 11px;
                &.nonext{
                    background: url('../../../assets/image/midnext1.png') no-repeat;
                }
            }
            }
            
        }
</style>