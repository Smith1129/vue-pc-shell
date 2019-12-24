<!-- star -->
<template>
    <div class='star'>
        <navz></navz>
        <div class="star_box">
            <div class="box_tab">
                <ul>
                    <li v-for="(item,index) in tabLight" :class="item.isShow==true&&item.isActive==true?'active':''" :key="index" @mouseenter='changeMag(1,index,item)' @mouseleave='changeMag(2,index,item)' @click="goMsg(index,item)">
                        <img :src="
                            item.isShow==true&&item.isActive==false?item.img:
                            item.isShow==false&&item.isActive==false?item.shadow:
                            item.isShow==true&&item.isActive==true?item.active:''" 
                            >
                            <div v-if="item.isActive==true" ></div>
                    </li>
                </ul>
            </div>
        </div>
        <fream :name='hdName' :id='hdIndex' v-if="freamPop"></fream>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import fream from "@/view/activity/star/common/fream"
    import navz from "@/view/activity/common/nav"
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {fream,navz},
        data() {
        //这里存放数据
            return {
                tabLight:[
                    {img:require('../../../assets/image/zhcl1.png'),id:1,isShow:false,shadow:require('../../../assets/image/zhcs1.png'),active:require('../../../assets/image/zhca1.png'),isActive:false,},
                    {img:require('../../../assets/image/zhcl2.png'),id:2,isShow:true,shadow:require('../../../assets/image/zhcs2.png'),active:require('../../../assets/image/zhca2.png'),isActive:false},
                    {img:require('../../../assets/image/zhcl3.png'),id:3,isShow:false,shadow:require('../../../assets/image/zhcs3.png'),active:require('../../../assets/image/zhca3.png'),isActive:false},
                    {img:require('../../../assets/image/zhcl4.png'),id:4,isShow:false,shadow:require('../../../assets/image/zhcs4.png'),active:require('../../../assets/image/zhca4.png'),isActive:false},
                    {img:require('../../../assets/image/zhcl5.png'),id:5,isShow:true,shadow:require('../../../assets/image/zhcs5.png'),active:require('../../../assets/image/zhca5.png'),isActive:false},
                ],
                hdName:'',
                hdIndex:0,
            };
        },
        //方法集合
        methods: {
            changeMag(val,index,item){
                // console.log(val,index,item)
                if(item.isShow){
                    item.isActive = true
                }else{
                    console.log('bbb')
                }
                if(val==2){
                    item.isActive = false
                }
            },
            goMsg(index,item){
                if(index>=2){
                    console.log(index,'index')
                    if(index==2){
                        // this.$router.push('/activity/secondmall')
                    }else if(index==3){
                        // this.$router.push('/activity/firstmall')
                    }else if(index==4){
                        if(item.isShow==true){
                            this.$router.push('/activity/thirdmall')
                        }
                    }
                }else{  
                    if(index==0){
                        this.hdName = '活动一：猪友归来送豪礼'
                    }else{
                        this.hdName = '暂无'
                    }
                    this.hdIndex = index        
                    if(item.isShow==true){
                        this.$store.commit('activity/setFream',true)
                    }else{
                        return false
                    }
                }
            }
        },
        //监听属性 类似于data概念
        computed: {
            freamPop(){
                return this.$store.state.activity.fream
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
    %clearfix {
        *zoom: 1;
        &:before, &:after {
            content: " ";
            display: table;
        }
        &:after {
            clear: both;
        }
    }
    .star{
        position: relative;
        width: 100%;
        height: 1038px;
        overflow: hidden;
        .star_box{
            position: absolute;
            top: 42px;
            left: 50%;
            margin-left: -960px;
            width: 1920px;
            height: 1097px;
            background: url('../../../assets/image/zhcbg.jpg') no-repeat;
            .box_tab{
                position: absolute;
                top:407px;
                width: 1100px;
                height: 500px;
                left:50%;
                transform: translateX(-50%);
                ul{
                    @extend %clearfix;
                    width: 100%;
                    li{
                        float: left;
                        position: relative;
                        &.active{
                            background: url('../../../assets/image/activbg.png') top center no-repeat;
                            background-position-y: -23px;
                        }
                        img{
                            margin-top: 15px;
                        }
                        div{
                            width: 100px;
                            height: 50px;
                            position: absolute;
                            bottom:8px;
                            left:21.5%;
                            transform:translateX(-50%);
                            text-align: center;
                            background: url('../../../assets/image/byes.png') no-repeat;
                            animation: biging 1s linear infinite;
                        }
                        // position: absolute;
                        // &:nth-child(1){
                        //     left:0px;
                        // }
                        // &:nth-child(2){
                        //     left:300px;
                        // }
                        // &:nth-child(3){
                        //     left:600px;
                        // }
                        // &:nth-child(4){
                        //     left:900px;
                        // }
                        // &:nth-child(5){
                        //     left:1200px;
                        // }
                        // &:nth-child(6){
                        //     left:1500px;
                        // }
                        
                        margin-right: 60px;
                        &:last-child{
                            margin-right: 0;
                        }
                        &:nth-child(2n+2){
                            margin-top: 49px;
                        }
                        &:nth-child(3){
                            margin-top: 73px;
                        }
                        cursor: pointer;
                    }
                }
            }
        }
         @keyframes biging{
            0%{
                transform: scale(1);  /*开始为原始大小*/
            }
            25%{
                transform: scale(1.1); /*放大1.1倍*/
            }
            50%{
                transform: scale(1);
            }
            75%{
                transform: scale(1.1);
            }
            100%{
                transform: scale(1);  /*开始为原始大小*/
            }
        }
    }
</style>