<!-- nav -->
<template>
    <div class='nav'>
        <div class="nav_box">
            <a href="/" class="logo"><img src="../../../assets/image/activlogo.png" alt=""></a>
            <ul>
                <li v-for="(item,index) in List" :key="index">
                    <router-link  :to="item.url" tag="a" >{{item.txt}}</router-link>
                    <!-- <span v-if="index==1">53元<i></i></span> -->
                </li>
            </ul>
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
                List:[
                    {txt:'首页',url:'/',id:0},
                    // {txt:'新人专区',url:'/new',id:1},
                    {txt:'游戏试玩',url:'/game',id:2},
                    {txt:'休闲试玩',url:'/card',id:3},
                    {txt:'VIP',url:'/vip',id:5},
                ]
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
    .nav{
        width: 100%;
        height: 42px;
        background: #fff;
        .nav_box{
            width: 1200px;
            margin: 0 auto;
            height: 100%;

            .logo{
                display: block;
                float: left;
                height: 42px;
                img{
                    display: inline-block;
                    margin-top:10px;
                    margin-right: 70px;
                }
            }
            ul{
                float: left;
                li{
                    float: left;
                    line-height: 42px;
                    height: 40px;
                    padding: 0 5px;
                    margin: 0 15px;
                    font-size: 16px;
                    a{
                        color: #3f3f4d;
                        display: block;
                        height: 40px;
                        &:hover{
                            text-decoration: none;
                            color: #2C9CFE;
                            border-bottom: 2px solid #2C9CFE;
                        }
                    }
                    
                }
            }
        }
    }
</style>