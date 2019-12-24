<!-- fream -->
<template>
    <div class='fream'>
        <div class="fream_box">
            <div class="box_title">
                {{id==0?'活动一：猪友归来送豪礼':id==1?'活动二：千军万马齐相聚':''}}
                <i @click="close"></i>
            </div>
            <div class="box_list">
                <span v-for="(item,index) in id==0?hdList:id==1?hdList2:''" :key="index" @click="openList(index)">
                    <b  v-if="id!=1"></b>{{item.label}}
                    <p v-show="ListIndex==index">
                        <em v-for="jtem in item.list" :key="jtem.txt"><h5>{{jtem.fanwei}}</h5>{{jtem.txt}}</em>
                        <i v-if="id!=1&&ListIndex==0">Ps：原开通vip越多获得奖励就可能越高哦</i>
                    </p>
                </span>
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
        props:['hdName','id'],
        data() {
        //这里存放数据
            return {
                hdList:[
                    {label:'福利一',list:[
                        {fanwei:'【活动时间】：',txt:'2019年7月1日-2019年7月31日'},
                        {fanwei:'【活动范围】：',txt:'老用户专享（注册时间超过三个月且近30天未登录）'},
                        {fanwei:'【活动内容】：',txt:'老用户登陆即可领取银猪回归奖励(每个用户限领一次)'},
                    ]},
                    {label:'福利二',list:[
                        {fanwei:'【活动范围】：',txt:'老用户专享（注册时间超过三个月且近30天未登录）仅享受一次'},
                        {fanwei:'【活动内容】：',txt:'开通vip送银猪福利卡'},
                        {fanwei:'',txt:'开通王卡：送50万福利卡'},
                        {fanwei:'',txt:'开通神卡：送100万福利卡'},
                        {fanwei:'',txt:'开通龙卡：送500万福利卡'},
                    ]}
                ],
                hdList2:[
                    {label:'',list:[
                        {fanwei:'【活动时间】：',txt:'2019年7月1日-2019年9月30日'},
                        {fanwei:'【活动范围】：',txt:'所有会员'},
                        {fanwei:'【活动内容】：',txt:'1、游戏试玩提成额外增加30%，总共90%'},
                        {fanwei:'',txt:'2、vip开通上线提成奖励增至5%'},
                        {fanwei:'',txt:'3、增加指定游戏充值返利银猪提成2%-5%'},
                    ]}
                ],
                ListIndex:0
            };
        },
        //方法集合
        methods: {
            openList(index){
                this.ListIndex = index
            },
            close(){
                this.$store.commit('activity/setFream',false)
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
    .fream{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.7);
        top:0;
        left: 0;
        z-index: 999;
        .fream_box{
            width: 559px;
            height: 285px;
            background: #1687F0;
            position: absolute;
            left:50%;
            top:50%;
            transform: translate(-50%,-50%);
            .box_title{
                line-height: 50px;
                width: 100%;
                background: url('../../../../assets/image/zhcjb.png')  top no-repeat;
                color: #61EEFD;
                font-size: 20px;
                padding: 0 16px 0 20px;
                box-sizing: border-box;
                i{
                    display: block;
                    float: right;
                    width: 20px;
                    height: 20px;
                    background: url('../../../../assets/image/close2.png')  no-repeat;
                    margin-top: 15px;
                    cursor: pointer;
                }
            }
            .box_list{
                width: 100%;
                background: #1687F0;
                b{
                    background: #fff;
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    margin-right: 15px;
                    vertical-align: middle;
                }
                span{
                    display: block;
                    min-height: 36px;
                    color: #fff;
                    font-size: 16px;
                    width: 100%;
                    border:1px solid #2267E6;
                    box-sizing: border-box;
                    border-left: none;
                    border-right: none;
                    padding: 0 25px;
                    p{
                        padding: 22px 0 14px 15px;

                        em{
                            display: block;
                            line-height: 14px;
                            margin-bottom: 15px;
                            font-size: 14px;
                            h5{
                                display: inline-block;
                                width: 100px;
                                font-weight: 400;
                            }
                        }
                        i{
                            display: block;
                            color: #89ECFF;
                            font-size: 12px;
                            text-align: center;
                        }
                    }
                    
                }
            }
        }
    }
</style>