<!--  -->
<template>
   <div class='pop_content'>
       <div class="msg_pop" v-if="false">
           <div class="msg_cancel" @click="popCancel"></div>
           <div class="solo_rank_title">温馨提醒</div>
           <div class="msg_inner">
               <p>额外奖励领取成功</p>
               <p>您已获得奖金 5000 金猪</p>
           </div>
           <div class="msg_button">确定</div>
       </div>
       <div class="award_list_pop">
            <div class="msg_cancel" @click="popCancel"></div>
            <div class="solo_rank_title">我的奖金</div>
            <div class="award_list">
                <div class="award_list_head">
                    <div class="head_inner">
                        <span>获奖期数</span>
                        <span>盈利战绩</span>
                        <span>获得奖励</span>
                        <span>领取奖励</span>
                    </div>
                </div>
                <div class="award_list_center" v-for="(item,index) in 10" :key="index">
                    <div class="center_inner">
                        <span>极速90秒 - 第1234567期</span>
                        <span>150,000,000,000 银猪</span>
                        <span>5000 金猪</span>
                        <span>可领奖</span>
                    </div>
                </div>
                <div class="award_list_page">
                    <span class="award_list_prev">上页</span>
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="100"
                    :page-size="1"
                    :current-page="currentPage"
					@current-change="handlePageChange"
                    >
                    </el-pagination>
                    <span class="award_list_next">下页</span>
                </div>
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
         popCancel(){
             this.$emit('getShow')
         },
         handlePageChange(val){
             console.log(val)
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
<style lang='scss'>
    .award_list_page{
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 25px;
        .el-pagination{
            display: inline-block;
            li{
                width: 32px;
                height: 32px;
                line-height: 32px;
                background:rgba(224,223,255,1) !important;
                border:1px solid rgba(140,118,199,1);
                color: rgba(90,57,172,1) !important;
                &.active {
                    background:rgba(147,103,255,1) !important;
                    border:1px solid rgba(140,118,199,1);
                    color: #fff !important;
			    }
                &.active + li {
				    border:1px solid rgba(140,118,199,1);
			    }
                &.el-icon {
                    border: none;
                    background: none !important;
                    line-height: 30px;
                    position: relative;
                    top: 2px;
			    }
            }
            .btn-next {
                display: none;
            }
            .btn-prev {
                display: none;
            }
        }
        .award_list_prev{
            display: inline-block;
            width:44px;
            height:30px;
            background:rgba(201,187,255,1);
            border-radius:2px;
            line-height: 30px;
            color:rgba(130,86,239,1);
            cursor: pointer;
            margin-right: 18px;
        }
        .award_list_next{
            display: inline-block;
            width:44px;
            height:30px;
            background:rgba(147,103,255,1);
            border-radius:2px;
            line-height: 30px;
            color:rgba(255,255,255,1);
            cursor: pointer;
            margin-left: 18px;
        }
    }
</style>
<style lang='scss' scoped>
%center {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
%common{
    width: 1200px;
    background: rgba(245, 244, 253, 1);
    border-radius: 36px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    .solo_rank_title {
        width: 276px;
        height: 78px;
        @extend %center;
        top: -43px;
        background: url('../../../assets/image/solo_title.png') no-repeat;
        font-size: 28px;
        color: rgba(255, 255, 255, 1);
        line-height: 59px;
        text-align: center;
    }
}
    .pop_content{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0, 0, 0, 0.4);
        z-index: 999999;
        top: 0;
        font-family:Microsoft YaHei;
        font-weight:400;
        .msg_pop{
            @extend %common;
            width:406px;
            height:233px;
            background:rgba(224,223,255,1);
            border-radius:36px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
        .msg_inner{
            color: #5A39AC;
            font-size:20px;
            position: absolute;
            top: 69px;
            width: 100%;
            text-align: center;
            p:nth-child(1){
                line-height: 19px;
            }
            p:nth-child(2){
                line-height: 20px;
                margin-top: 14px;
            }
        }
        .msg_button{
            width:160px;
            height:45px;
            background:linear-gradient(-90deg,rgba(255,92,109,1) 0%,rgba(253,150,110,1) 100%);
            border-radius:23px;
            font-size:22px;
            color:rgba(255,255,255,1);
            line-height: 45px;
            text-align: center;
            position: absolute;
            bottom: 34px;
            left: 50%;
            transform: translateX(-50%);
            cursor: pointer;
        }
        .msg_cancel{
            width: 34px;
            height: 34px;
            position: absolute;
            right: -31px;
            top: -29px;
            cursor: pointer;
            background: url('../../../assets/image/solo_cancel.png') no-repeat;
        }
        .award_list_pop{
            @extend %common;
            width:1000px;
            height:684px;
            background:rgba(224,223,255,1);
            border-radius:36px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            .award_list{
                width:902px;
                @extend %center;
                top: 57px;
                .award_list_head{
                    width: 100%;
                    height:44px;
                    background:rgba(147,103,255,1);
                    border:1px solid rgba(140,118,199,1);
                    box-sizing: border-box;
                    .head_inner{
                        width: 100%;
                        height: 44px;
                        padding: 0 59px 0 87px;
                        box-sizing: border-box;
                        display: inline-flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        font-size:18px;
                        color:rgba(255,255,255,1);
                    }
                    span:nth-child(2){
                        display: inline-block;
                        width: 116px;
                        text-align: center;
                    }
                    span:nth-child(1){
                        display: inline-block;
                        width: 142px;
                    }
                }
                .award_list_center{
                    width: 100%;
                    height: 50px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(140,118,199,1);
                    box-sizing: border-box;
                    border-top: none;
                    .center_inner{
                        width: 100%;
                        height: 50px;
                        padding: 0 35px 0 39px;
                        box-sizing: border-box;
                        display: inline-flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 16px;
                        color: #5A39AC;
                        span:nth-child(4){
                            display: inline-block;
                            width:115px;
                            height:32px;
                            background:linear-gradient(-90deg,rgba(255,220,64,1) 0%,rgba(255,237,102,1) 100%);
                            border-radius:16px;
                            text-align: center;
                            line-height: 32px;
                            color:rgba(232,89,5,1);
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
   
</style>