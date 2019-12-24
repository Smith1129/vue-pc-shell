<!--  -->
<template>
    <div class='allContent'>
        <nav-list></nav-list>
        <!-- <img src="../../../assets/image/bg2.jpg" alt="" class="logo"> -->
        <div class='funluck'>
            <div class="luck_turn">
                <div class="luck_turn_user">
                    <p v-if="userInfo">欢迎您，<i>{{userInfo.Nickname}}</i><em @click="resetToken" v-if="false">[注销]</em></p>
                    <p v-else>您好，请 <em @click="goLogin()">[登陆]</em></p>
                </div>
                <div class="luck_turnBox">
                    <ul>
                        <li v-for="(item,index) in picsList" :key="index" :class="['award'+index,{'active':index==current}]">
                            <img :src="item.Img">
                            <p>{{item.Name}}</p>
                        </li>
                        <div :class="'turnBox_flex'" @click="start()">
                            <p>今日剩余机会:<em></em>{{this.infoTime}}</p>
                            <!-- <p>试试手气吧</p> -->
                            <div class="try">{{hasDraw ? '今日已抽奖' : '试试手气吧'}}</div>
                        </div>
                        <p class="luck_tips">注:同一ip以及同一ID，每天只限抽奖一次</p>
                    </ul>
                </div>
            </div>
            <div class="bottom-pic">
                <!-- <img src="../../../assets/image/rule1.png" class="rule">  -->
                <ul>
                    <li>1.本活动时间为2019年7月10 日至 2019年7月24日</li>
                    <li>2.每位用户在活动期间每日可参与抽奖一次；同一ip以及同一ID，每天只限抽奖一次</li>
                    <li>3.活动中，您将可能抽到更加适合您的奖品，奖品有可能重复</li>
                    <li>4.禁止作弊，违者最高将处以封号处理</li>
                    <li>5.本次活动最终解释权归跳跳猪所有</li>
                </ul>
            </div>
        </div>
   </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import headNav from '../../activity/common/nav'
    import { activityTimes,activityLottery} from '@/api/http'
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            navList:headNav
        },
        data() {
        //这里存放数据
            return {
                hasDraw:false,
                current:-1,
                clickBoolean:false,
                picsList:[
                    {Name:'5888金猪',Img:require('../../../assets/image/yellowDiamond-2888.png'),Id:1},
                    {Name:'50万福利卡',Img:require('../../../assets/image/Bridgecard.png'),Id:2},
                    {Name:'1元红包',Img:require('../../../assets/image/redpacket-1.png'),Id:3},
                    {Name:'经验值100',Img:require('../../../assets/image/value-100.png'),Id:4},
                    {Name:'58888银猪',Img:require('../../../assets/image/18888thousand.png'),Id:5},
                    {Name:'iphonexs',Img:require('../../../assets/image/iphonexs.png'),Id:6},
                    {Name:'38888银猪',Img:require('../../../assets/image/18888thousand.png'),Id:7},
                    {Name:'2888金猪',Img:require('../../../assets/image/yellowDiamond-2888.png'),Id:8},
                    {Name:'100元话费',Img:require('../../../assets/image/100yuan.png'),Id:9},
                    {Name:'10元Q币',Img:require('../../../assets/image/10qb.png'),Id:10},
                    {Name:'18888银猪',Img:require('../../../assets/image/18888thousand.png'),Id:11},
                    {Name:'2元红包',Img:require('../../../assets/image/redpacket-2.png'),Id:12},
                    {Name:'经验值50',Img:require('../../../assets/image/value-50.png'),Id:13},
                    {Name:'108888银猪',Img:require('../../../assets/image/18888thousand.png'),Id:14},
                    {Name:'50元话费',Img:require('../../../assets/image/huafei50.jpg'),Id:15},
                    {Name:'28888银猪',Img:require('../../../assets/image/18888thousand.png'),Id:16},
                ],
                infoTime:0,
                speed:200,
                diff:15,
                award:{},
                time:0,
                prize:''
            }
        },
        //方法集合
        methods: {
            resetToken(){
                this.$store.dispatch('user/resetToken')
            },
            goLogin(){
                this.$store.commit('app/getLoginBox',true)
                this.$store.commit('app/setLoginOrReg',true)
            },
            getInfo(){
                return new Promise((resolve,reject)=>{
                    activityTimes().then(res=>{
                        let params = res.Data
                        this.infoTime = params.Times
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            start(){
                return new Promise((resolve,reject)=>{
                    activityLottery().then(res=>{
                        let params = res.Data
                        this.prize = params
                        this.drawAward()
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            drawAward(){
                // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
                this.time = Date.now();
                this.speed = 200;
                this.diff = 10;
                this.current = 0;
                this.move();
            },
            move(){
                window.timeout = setTimeout( () => {
                    this.current++;
                    if ( this.current > 15 ) {
                        this.current = 0;
                    }
                    let playerPrize = this.prize
                    if ( playerPrize.AwardId && ( Date.now() - this.time ) / 1000 > 2 ) {
                        if ( ( Date.now() - this.time ) / 1000 > 3 && playerPrize.AwardId == this.picsList[ this.current ].Id ) {
                            clearTimeout( window.timeout );
                            setTimeout( () => {
                                let params = '恭喜你，抽中了' + playerPrize.AwardName
                                this.$store.commit('app/getFrame',true);
                                this.$store.commit('app/getFrameMsg',params);
                                this.$store.commit('app/getFrameState',0);
                                this.$store.commit('app/getFrameIcon',false)
                                this.getInfo()
                            }, 1000 );
                            return;
                        }
                    } else {
                        this.speed -= this.diff;
                    }
                    this.move();
                }, this.speed );
            },
        },
        //监听属性 类似于data概念
        computed: {
            userInfo(){
                return this.$store.state.user.userInfo
            }
        },
        //监控data中的数据变化
        watch: {
            userInfo(val){
                if(val){
                    this.getInfo()
                }
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            
        },
    }
</script>
<style lang='scss' scoped>
    .allContent{
        width:100%;
        height: 1907px;
        overflow: hidden;
        position: relative;
        .funluck{
            width:1920px;
            height: 1907px;
            background:#F0F7FE;
            border:1px solid rgba(191,225,254,1);
            border-radius:2px;
            box-sizing: border-box;
            position: absolute;
            left: 50%;
            margin-left: -960px;
            background: url('../../../assets/image/bg2.jpg') no-repeat;
            .bottom-pic{
                position: absolute;
                bottom: 199px;
                margin-left: 512px;
                // position: absolute;
                // left: 50%;
                // top:80%;
                // transform: translate(-50%,-50%);
                // width: 958px;
                // height: 273px;
                // background-size:100% 100%;
                ul{
                    // width: 519px;
                    // height: 142px;
                    // font-size: 14px;
                    // color: #AFEDD6;
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(175,237,214,1);
                    // margin-top: 89px;
                    // margin-left: 20px;
                    li{
                        line-height:32px;
                        // margin-top: 10px;
                        // float: left;
                    }
                }
            }
            .luck_turn{
                width: 975px;
                height: 756px;
                position: absolute;
                left: 50%;   
                top:50%;
                transform: translate(-50%,-50%);
                box-sizing: border-box;
                border-radius:2px;
                .luck_turn_user{
                    margin-bottom: 15px;
                    margin-left: 33px;
                    font-size: 16px;
                    color: #fff;
                    em{
                        cursor: pointer;
                        color: #FFE10F;
                        margin-left: 2px;
                    }
                }
                .luck_turnBox{
                    width: 100%;
                    height: 100%;
                    background: url('../../../assets/image/lampion.gif');
                    background-size: 100% 100%;
                    border-radius:2px;
                    ul{
                        width: 100%;
                        height: 100%;
                        position: relative;
                        padding: 37px;
                        box-sizing: border-box;
                        .clickActive{
                            background: url('../../../assets/image/firstMall_buttonLight.png');
                            background-size:100% 100%;
                             width: 329px;
                            height: 192px;
                        }
                        .luck_tips{
                            text-align: center;
                            font-size: 14px;
                            width: 271px;
                            padding: 5px 23px 5px 20px;
                            font-weight:400;
                            color: #fff;
                            opacity: 0.47;
                            background:rgba(211,85,19,1);
                            border-radius: 15px;
                            margin-top: 453px;
                            margin-left: 291px;
                        }
                        .turnBox_flex{
                            position: absolute;
                            top:50%;
                            left:50%;
                            transform: translate(-50%,-50%);
                            text-align: center;
                            background: url('../../../assets/image/firstMall_button.png');
                            background-size:100% 100%;
                            width: 329px;
                            height: 192px;
                            cursor: pointer;
                            &:hover{
                                @extend .clickActive
                            }
                            .turnBox_flexBtn{
                                width:194px;
                                height:44px;
                                background:rgba(44,156,254,1);
                                border-radius:2px;
                                font-size: 18px;
                                color: #fff;
                                margin: 0 auto 15px;
                                cursor: pointer;
                            }
                            p{
                                margin-top: 52px;
                                margin-left: 74px;
                                width: 172px;
                                height: 21px;
                                line-height: 7px;
                                font-size: 22px;
                                color: #914B23;
                                font-family:SourceHanSansCN-Normal;
                                em{
                                    color: #f60;
                                }
                            }
                            span{
                                color: #2C9CFE;
                                font-size: 14px;
                                margin-top:15px;
                                display: block;
                                cursor: pointer;
                            }
                            .try{
                                margin-top: 20px;
                                height: 38px;
                                font-size: 40px;
                                font-family:MicrosoftYaHei-Bold;
                                font-weight:bold;
                                line-height:12px;
                                color:#FF6000;
                                cursor: pointer;
                            }
                            
                        }
                        
                        li{
                            background: url('../../../assets/image/common.png') no-repeat;
                            background-size: 100% 100%;
                            width:135px;
                            height: 150px;
                            position: absolute;
                            text-align: center;
                            box-sizing: border-box;
                            p{
                                font-size: 16px;
                                color: #914B23;
                                height: 15px;
                                line-height: 15px;
                                width:100px;
                                margin: 0 auto;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap
                            }
                            &.active{
                                background: url('../../../assets/image/on.png') no-repeat!important;
                            }
                            &.award0{   
                                top:55px;
                                left:55px;
                            }
                            &.award1{
                                top:55px;
                                left: 200px;
                            }
                            &.award2{
                                top:55px;
                                left: 347px;
                            }
                            &.award3{
                                top:55px;
                                left: 492px;
                            }
                            &.award4{
                                top:55px;
                                left: 638px;
                            }
                            &.award5{
                                top:55px;
                                left: 784px;
                            }
                            &.award6{
                                top:218px;
                                right: 55px;
                            }
                            &.award7{
                                top:380px;
                                right: 55px;
                            }
                            &.award8{
                                bottom:63px;
                                right: 55px;
                            }
                            &.award9{
                                bottom:63px;
                                right: 200px;
                            }
                            &.award10{
                                bottom:63px;
                                right: 347px;
                            }
                            &.award11{
                                bottom:63px;
                                right: 492px;
                            }
                            &.award12{
                                bottom:63px;
                                right: 638px;
                            }
                            &.award13{
                                bottom:63px;
                                right: 784px;
                            }

                            &.award14{
                                bottom:226px;
                                left: 55px;
                            }
                            &.award15{
                                bottom:388px;
                                left: 55px;
                            }
                            img{
                                width: 120px;
                                height: 120px;
                            }
                        }
                    }
                }
            }
            
        }
    }
   
</style>