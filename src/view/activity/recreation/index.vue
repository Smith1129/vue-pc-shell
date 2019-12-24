<!--  -->
<template>
	<div class="solo_all_content">
		<head-nav></head-nav>
        <frame @getShow="showChange" v-if="status"></frame>
		<div class="solo_content">
			<div class="solo_time">活动时间：2019.12.1-12.10</div>
			<div class="solo_rank">
				<div class="solo_rank_title">今日战绩</div>
                <div class="solo_rank_tip">单期最高净盈利≥15亿时，可获得奖励“战绩3%的银猪”！（该奖励以金猪发放）</div>
				<div class="solo_rank_listall">
					<div class="solo_rank_list" :class="`list${index}`" v-for="(item,index) in 5" :key="index">
						<img src="http://image-material.ttz.com/avatar/21.jpg"
                        :class="index==0||index==4?'small':index==1?'center1':index==2?'big':'center2'
                        ">
						<p class="name">土**豆</p>
						<p class="num" :class="`num${index}`">5000万<em></em></p>
					</div>
				</div>
                <div class="solo_rank_bottom">
                    <div class="solo_rank_name" v-for="(item,index) in 5" :key="index">
                        <p>开心60秒</p>
                        <p>第1282743期</p>
                    </div>
                </div>
			</div>
            <div class="solo_zhanji">
                <div class="solo_zhanji_detail">
                    <span>我的战绩：未上榜</span>
                    <span>已领奖金：<em>200000金猪</em></span>
                    <span>最高战绩：极速90秒-第123456期<em class="gold_num">123123123银猪</em></span>
                    <span>前往领奖</span>
                </div>
            </div>
            <div class="solo_day_rank">
                <div class="solo_rank_title">每日单挑王</div>
                <div class="solo_rank_tip">每日单期战绩最高的用户为本日单挑王，可获得奖励“最高战绩10%的银猪！（奖励均以金猪形式发放）</div>
                <div class="solo_day_list">
                    <div class="solo_day_inner" v-for="(item,index) in 10" :key="index">
                        <div class="solo_day_img">
                            <img src="http://image-material.ttz.com/avatar/21.jpg">
                        </div>
                        <div class="solo_day_name">疲惫的小土豆</div>
                        <div class="solo_day_num">2600w<em></em></div>
                        <div class="solo_day_flag">12月01日  单挑王</div>
                    </div>
                </div>
            </div>
            <div class="solo_go">
                <div class="solo_rank_title">极速前往</div>
                <div class="solo_go_pic">
                    <span :class="`pic${index}`" v-for="(item,index) in 3" :key="index"></span>
                </div>
            </div>
            <div class="solo_rule">
                <div class="solo_rule_name"><em>活动规则</em></div>
                <div class="solo_rule_inner">
                    <ul>
                        <li>1、根据用户参与数字游戏的单期所盈利银猪金额进行排名。</li>
                        <li>2、娱乐solo 活动范围为 娱乐大厅中所有数字娱乐游戏：极速90秒、幸运300秒、开心60秒。</li>
                        <li>3、单场solo冠军战绩相同时，最先达到此战绩的用户可获得此战绩的用户获得solo冠军奖励。若同时达到此战绩，最先投注的用户获得solo冠军奖励。</li>
                        <li>4、Solo冠军奖励于每日决战结束后由系统自动发放。</li>
                        <li>5、严禁用户对刷、使用三方软件等一切作弊行为，一经查实，扣除奖励并永久封禁账号。</li>
                        <li>6、本活动最终解释权归跳跳猪所有！</li>
                    </ul>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import headNav from '../../activity/common/nav';
import frame from '../common/recreationpop';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: { headNav,frame },
	data() {
		//这里存放数据
		return {
            status:true,
        };
	},
	//方法集合
	methods: {
        showChange(){
            this.status = false
        }
    },
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
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
    .solo_rank_tip{
        font-size:14px;
        color:rgba(51,51,51,1);
        line-height: 14px;
        width: 100%;
        text-align: center;
        position: absolute;
        top: 58px;
    }
}
.solo_all_content {
	width: 100%;
	position: relative;
	overflow: hidden;
	height: 2533px;
	.solo_content {
		width: 1920px;
		height: 2491px;
		background: url('../../../assets/image/solobg.jpg') no-repeat;
		@extend %center;
		font-weight: 400;
		font-family: Microsoft YaHei;
	}
	.solo_time {
		line-height: 17px;
		font-size: 18px;
		color: rgba(221, 192, 249, 1);
		position: absolute;
		top: 431px;
		text-align: center;
		width: 100%;
	}
	.solo_rank {
        @extend %common;
		height: 452px;
		top: 519px;
		.solo_rank_listall {
            @extend %center;
            top: 82px;
			display: flex;
			.solo_rank_list {
				display: flex;
				flex-direction: column;
				align-items: center;
                margin-right: 58px;
				&.list0 {
					width: 143px;
					height: 214px;
					background: url('../../../assets/image/solo_award4.png')
						no-repeat;
                    margin-top: 70px;
				}
				&.list1 {
					width: 143px;
					height: 264px;
					background: url('../../../assets/image/solo_award2.png')
						no-repeat;
                    margin-top: 20px;                                                                             
				}
				&.list2 {
					width: 143px;
					height: 284px;
					background: url('../../../assets/image/solo_award1.png')
						no-repeat;
				}
				&.list3 {
					width: 143px;
					height: 243px;
					background: url('../../../assets/image/solo_award3.png')
						no-repeat;
                    margin-top: 41px;
				}
				&.list4 {
					width: 143px;
					height: 195px;
					background: url('../../../assets/image/solo_award5.png')
						no-repeat;
                    margin-right: 0;
                    margin-top: 89px;
				}
				img {
					// margin-top: 30px;
					width: 80px;
					height: 80px;
					border-radius: 50%;
                    margin-left: 1px;
                    &.small{
                        margin-top: 3px;
                    }
                    &.center2{
                        margin-top: 24px;
                    }
                    &.center1{
                        margin-top: 25px
                    }
                    &.big{
                        margin-top: 28px;
                    }
				}
                .name{
                    margin-top: 6px;
                    font-size:16px;
                    color:rgba(51,51,51,1);
                    line-height: 14px;
                }
                .num{
                    font-size:16px;
                    color:rgba(51,51,51,1);
                    em{
                        display: inline-block;
                        width: 14px;
                        height: 11px;
                        background: url('../../../assets/image/solo_sliver.png');
                        position: relative;
                        top: 1px;
                        left: 4px;
                    }
                    &.num0{
                        margin-top: 60px;
                    }
                    &.num1{
                        margin-top: 60px;
                    }
                    &.num2{
                        margin-top: 53px
                    }
                    &.num3{
                        margin-top: 56px
                    }
                    &.num4{
                        margin-top: 55px;
                    }
                }
			}
		}
        .solo_rank_bottom{
            @extend %center;
            bottom: 34px;
            display: flex;
            flex-direction: row;
            .solo_rank_name{
                margin-right: 103px;
                p{
                    width: 100px;
                    text-align: center;
                }
                p:nth-child(1){
                    font-size:18px;
                    color:rgba(51,51,51,1);
                    line-height: 17px;
                }
                p:nth-child(2){
                    font-size:14px;
                    color:rgba(153,153,153,1);
                    line-height: 12px;
                    margin-top: 10px;
                }
            }:nth-child(5){
                margin-right: 0;
            }
        }
	}
    .solo_zhanji{
        width: 1200px;
        height: 71px;
        background: url('../../../assets/image/solo_zhanji.png');
        @extend %center;
        top: 971px;
        .solo_zhanji_detail{
            width: 100%;
            height: 100%;
            padding: 0 36px 0 46px;
            box-sizing: border-box;
            display: inline-flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            span{
                color:rgba(255,255,255,1);
                font-size:16px;
                em{
                    display: inline-block;
                    color: #FFED66;
                    &.gold_num{
                        color:rgba(255,255,255,1);
                        margin-left: 26px;
                    }
                }
            }:nth-child(4){
                color:rgba(232,89,5,1);
                line-height: 49px;
                text-align: center;
                font-size:24px;
                width:174px;
                height:49px;
                background:linear-gradient(-90deg,rgba(255,220,64,1) 0%,rgba(255,237,102,1) 100%);
                border-radius:25px;
                cursor: pointer;
            }
        }
    }
    .solo_day_rank{
        @extend %common;
        height: 648px;
        bottom: 724px;
        .solo_day_list{
            padding: 0 80px 0 63px;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            position: absolute;
            top: 153px;
            .solo_day_inner{
                width:150px;
                height:172px;
                background:rgba(253,221,209,1);
                border-radius:10px;
                font-size: 16px;
                color:rgba(224,117,19,1);
                text-align: center;
                position: relative;
                margin-right: 76px;
                .solo_day_img{
                    width: 86px;
                    height: 108px;
                    background: url('../../../assets/image/solo_1.png') no-repeat;
                    position: relative;
                    margin-left: 35px;
                    top: -61px;
                    img{
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        position: absolute;
                        left: 3px;
                        bottom: 3px;
                    }
                }
                .solo_day_num{
                    position: absolute;
                    bottom: 12px;
                    left: 50%;
                    transform: translateX(-50%);
                    em{
                        margin-left: 5px;
                        display: inline-block;
                        width: 14px;
                        height: 11px;
                        background: url('../../../assets/image/solo_gold.png') no-repeat;
                    }
                }
                .solo_day_flag{
                    position: absolute;
                    top: 86px;
                    left: -32px;
                    line-height: 49px;
                    color:rgba(255,255,255,1);
                    width: 213px;
                    height: 67px;
                    text-align: center;
                    background: url('../../../assets/image/solo_flag.png') no-repeat;
                }
                .solo_day_name{
                    position: absolute;
                    top: 56px;
                    width: 100%;
                    text-align: center;
                    color:rgba(224,117,19,1);
                }
            }:nth-child(5n){
                margin-right: 0;
            }:nth-child(n+6){
                margin-top: 95px;
            }
        }
    }
    .solo_go{
        @extend %common;
        width: 900px;
        height: 220px;
        bottom: 426px;
        .solo_go_pic{
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 40px;
            span{
                display: inline-block;
                width: 145px;
                height: 159px;
                margin-right: 105px;
                cursor: pointer;
                &.pic0{
                    background: url('../../../assets/image/fast90.png') no-repeat;
                }
                &.pic1{
                    background: url('../../../assets/image/fast300.png') no-repeat;
                }
                &.pic2{
                    background: url('../../../assets/image/fast60.png') no-repeat;
                }
            }:nth-last-child(1){
                margin-right: 0;
            }
        }
    }
    .solo_rule{
        width:1200px;
        height:248px;
        background:rgba(224,223,255,0.49);
        border-radius:36px;
        @extend %common;
        bottom: 121px;
        .solo_rule_name{
             top: 26px;
             width: 171px;
             height: 14px;
             @extend %common;
             background: url('../../../assets/image/solo_rule.png') no-repeat;
             em{
                 display: inline-block;
                 position: relative;
                 top: -10px;
                 width: 100%;
                 text-align: center;
                 font-size:24px;
                 color:rgba(64,28,157,1);
             }
        }
        .solo_rule_inner{
            position: absolute;
            top: 69px;
            left: 31px;
            ul{
                li{
                    color: #401C9D;
                    font-size: 14px;
                    line-height: 26px;
                }
            }
        }
    }
}
</style>