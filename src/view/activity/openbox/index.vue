<!--  -->
<template>
	<div class="boxAct_allcontent">
		<head-nav></head-nav>
        <frame v-if="frameStatus" 
		@frameChange="fraChange"
		 :msgInner="msgInner"
		 :msgAward="msgAward"
		 :worryMsg="worryMsg"
		 >
		</frame>
		<div class="boxAct_content">
			<div class="boxAct_time">活动时间：2019.12.02~12.16</div>
			<div class="boxAct_user">
				<div v-if="userInfo">hi，{{userInfo.Nickname}}，您当前剩余{{boxInitData.BoxAll}}个宝箱未开启。</div>
                <div v-else>您好,请<em @click="getLogin">【登录】</em></div>
				<div class="user_award" v-if="userInfo">
					<span>已获奖励</span>
					<span>银猪:{{parseInt(boxInitData.Sum1/10000)}}W</span>
					<span>水晶:{{parseInt(boxInitData.Sum2/10000)}}W</span>
				</div>
				<div class="user_award" v-else>
					<span>已获奖励</span>
					<span>银猪:--</span>
					<span>水晶:--</span>
				</div>
			</div>
			<div class="circle_box">
				<span class="circle" v-for="(item,index) in 5" :key="index" :class="`circle${index}`"></span>
			</div>
			<div class="boxAct_box">
				<div class="move_box" 
				v-for="(item,index) in 5" :key="index"
				:class="[`all_box${index}`,boxIndex===index?'move':'']"
				@click="getAward(index)"
				>
					<div class="top_content" :class="`move_box${index}`">
						<!-- <em class="circle"></em> -->
						<p :class="`wire${index}`"></p>
					</div>
					<span
						:class="[`box${index}`]"
						@mouseenter="handleBoxEnter(index)"
						@mouseleave="handleBoxLeave()"
					></span>
				</div>
			</div>
			<div class="boxAct_boxname">
				<div class="box_content" v-for="(item,index) in 5" :key="index">
					<p
						:class="`boxname${index}`"
						@mouseenter="handleMouseEnter(index)"
						@mouseleave="handleMouseLeave"
					></p>
					<p class="box_name_tip" v-show="index===isIndex">
						<!-- 可获得随机100-200w银猪奖励 -->
						{{
							 index==0?'可获得随机5000-1万银猪'
							:index==1?'可获得随机10-20万银猪'
							:index==2?'可获得随机50-100万银猪'
							:index==3?'必定获得500万水晶'
							:index==4?'必定获得600万水晶'
							:''
						}}
					</p>
					<p class="key_num" v-show="!(index===isIndex)">
						<span class="key" :class="`key${index}`"></span>
						<span class="num">x {{
						 index==0?boxInitData.BoxMu
						:index==1?boxInitData.BoxGold
						:index==2?boxInitData.BoxDiamond
						:index==3?boxInitData.BoxLong
						:index==4?boxInitData.BoxTiger
						:''
						}}</span>
					</p>
				</div>
			</div>
			<div class="boxAct_contain">
				<div class="boxAct_method">
					<ul>
						<li v-for="(item,index) in titleList" :key="index">
							<span>{{item.title}}</span>
							<span><em>{{item.award}}</em></span>
						</li>
					</ul>
					<div class="boxAct_method_tip">* 开通多次vip可获得多把钥匙哦</div>
				</div>
				<div class="boxAct_list">
					<div class="slide_right">
						<slide></slide>
					</div>
                    <div class="box_list_name" v-if="boxInitData.Nickname">{{boxInitData.Nickname|star}}</div>
                    <div class="box_list_opened">已打开{{boxInitData.Sum3}}个宝箱</div>
				</div>
			</div>
			<div class="boxAct_rule">
				<ul>
					<li>1. 只有在活动期间内开通并享受特权才可以开宝箱哦~</li>
					<li>2. 宝箱必须在当天开启，不然会被强盗夺走。</li>
					<li>3. 活动严禁作弊，一旦被查到作弊，视情节严重程度取消奖励或冻结账号。</li>
					<li>4. 本次活动最终解释权归跳跳猪所有。</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import headNav from '../../activity/common/nav';
import slide from '../common/slide/slide';
import frame from '../common/openboxframe';
import {openBoxAward} from '@/api/http'
export default {
	//import引入的组件需要注入到对象中才能使用
	components: { headNav, slide,frame },
	data() {
		//这里存放数据
		return {
			tipStatus: false,
			msgInner:-1,
			msgAward:'银猪',
			isIndex: -1,
			worryMsg:'',
			boxIndex: -1,
            lineKey: ['line0', 'line1', 'line2', 'line3', 'line4'],
			frameStatus:false,
			titleList:[
				{title:'开通gvip或mvip',award:'可获得一把木头钥匙'},
				{title:'开通金卡',award:'可获得一把黄金钥匙'},
				{title:'开通麒麟卡',award:'可获得一把钻石钥匙'},
				{title:'开通龙卡',award:'可获得一把龙吟钥匙'},
				{title:'开通白虎卡',award:'可获得一把虎啸钥匙'},
			]
		};
	},
	//方法集合
	methods: {
		getLogin(){
			this.$store.commit('app/getLoginBox', true);
			this.$store.commit('app/setLoginOrReg', true);
		},
		handleMouseEnter(index) {
			this.isIndex = index;
		},
		handleMouseLeave() {
			this.isIndex = -1;
		},
		handleBoxEnter(index) {
			this.boxIndex = index;
		},
		handleBoxLeave() {
			this.boxIndex = -1;
        },
        fraChange(){
            this.frameStatus = false;
		},
		getData(){
			this.$store.dispatch('activity/getOpenBoxInitData')
		},
		getAward(index){
			let check = index==0&&this.boxInitData.BoxMu?true
			:index==1&&this.boxInitData.BoxGold?true
			:index==2&&this.boxInitData.BoxDiamond?true
			:index==3&&this.boxInitData.BoxLong?true
			:index==4&&this.boxInitData.BoxTiger?true
			:false
			console.log(check)
			if(check){
				let payload = {
					BoxType:index+1
				}
				return new Promise((resolve,reject) => {
					openBoxAward(payload).then((res)=>{
						if(res.Code === 200){
							let award = res.Data.Type==1?
							`${res.Data.Value}银猪`
							:`${res.Data.Value}水晶`
							this.msgInner = index
							this.msgAward = award
							this.frameStatus = true
							this.getData()
							this.$store.dispatch('activity/getBoxDetailInfo');
						}else{
							this.worryMsg = res.Msg
							this.frameStatus = true
						}
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			}else{
				return
			}
		}
	},
	//监听属性 类似于data概念
	computed: {
        userInfo() {
            return this.$store.state.user.userInfo;
		},
		boxInitData(){
			return this.$store.state.activity.openBoxInitData;
		}
    },
	//监控data中的数据变化
	watch: {
		userInfo(val){
			this.getData()
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.getData()
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
%clearfix {
	*zoom: 1;
	&:before,
	&:after {
		content: ' ';
		display: table;
	}
	&:after {
		clear: both;
	}
}
.boxAct_allcontent {
	width: 100%;
	height: 2208px;
	overflow: hidden;
	position: relative;
}
.boxAct_content {
	width: 1920px;
	height: 2166px;
	background: url('../../../assets/image/box_bg.jpg') no-repeat;
	position: absolute;
	left: 50%;
	margin-left: -960px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	.boxAct_time {
		width: 398px;
		height: 37px;
		background: url('../../../assets/image/box_time.png') no-repeat;
		font-size: 20px;
		color: rgba(52, 20, 102, 1);
		line-height: 37px;
		text-align: center;
		position: absolute;
		left: 547px;
		top: 328px;
	}
	.boxAct_user {
		width: 1000px;
		height: 59px;
		background: url('../../../assets/image/box_user.png') no-repeat;
		position: absolute;
		left: 460px;
		top: 443px;
		padding: 21px 55px;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 16px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 15px;
		em{
			color: #fe70db;
		}
		.user_award {
			span {
				margin-right: 41px;
			}
			span:nth-child(3) {
				margin-right: 0;
			}
		}
        em{
            cursor: pointer;
        }
	}
	.boxAct_box {
		position: absolute;
		left: 367px;
		top: 548px;
		.move_box {
			width: 207px;
			float: left;
			position: relative;
			margin-right: 40px;
			cursor: pointer;
			&.all_box0 {
			}
			&.all_box1 {
				top: 53px;
			}
			&.all_box2 {
				top: 70px;
			}
			&.all_box3 {
				top: 57px;
			}
			&.all_box4 {
				top: 5px;
			}
			//左右晃动
			&.move {
				animation: move 2s infinite linear;
				transform-origin: top center;
			}
			@keyframes move {
                0%{
                  transform: rotate(0)  
                }
                25%{
                  transform: rotate(5deg)
                }
                50%{
                    transform: rotate(0)  
                }
                75%{
                    transform: rotate(-5deg)
                }
                100%{
                    transform: rotate(0deg)
                }
			}
			.top_content {
				position: relative;
				left: 107px;
				top: 18px;
				&.move_box0 {
				}
				&.move_box1 {
					left: 105px;
				}
				&.move_box2 {
					left: 109px;
				}
				&.move_box3 {
					left: 122px;
				}
				&.move_box4 {
					left: 105px;
				}
			}
			p {
				width: 6px;
				height: 176px;
				background: rgba(207, 183, 238, 1);
				position: relative;
				left: 3px;
				&.wire0 {
					height: 219px;
				}
				&.wire1 {
					height: 167px;
				}
				&.wire2 {
					height: 146px;
				}
				&.wire3 {
					height: 140px;
				}
				&.wire4 {
					height: 194px;
				}
			}
			span {
				display: inline-block;
				position: relative;
				&.box0 {
					width: 207px;
					height: 218px;
					background: url('../../../assets/image/box_1.png') no-repeat;
				}
				&.box1 {
					width: 206px;
					height: 217px;
					background: url('../../../assets/image/box_glod.png')
						no-repeat;
				}
				&.box2 {
					width: 206px;
					height: 224px;
					background: url('../../../assets/image/box_4.png') no-repeat;
				}
				&.box3 {
					width: 207px;
					height: 244px;
					background: url('../../../assets/image/box_2.png') no-repeat;
				}
				&.box4 {
					width: 206px;
					height: 237px;
					background: url('../../../assets/image/tigerbox.png') no-repeat;
				}
			}
		}
	}
	.circle_box{
		position: absolute;
		left: 476px;
		top: 558px;
		.circle {
			display: inline-block;
			width: 12px;
			height: 12px;
			background: linear-gradient(
				0deg,
				rgba(182, 90, 225, 1) 0%,
				rgba(66, 24, 124, 1) 100%
			);
			border-radius: 50%;
			position: absolute;
			z-index: 99;
			&.circle0{
				left: -2px;
			}
			&.circle1{
				left: 243px;
				top: 52px;
			}
			&.circle2{
				left: 494px;
				top: 71px;
			}
			&.circle3{
				left: 754px;
				top: 57px;
			}
			&.circle4{
				left: 984px;
				top: 11px;
			}
		}
	}
	.boxAct_boxname {
		display: flex;
		flex-direction: row;
		position: absolute;
		top: 1021px;
		left: 397px;
		.box_content {
			margin-right: 94px;
			position: relative;
		}
		p {
			width: 153px;
			height: 36px;
			&.box_name_tip {
				width: 242px;
				height: 57px;
				background: url('../../../assets/image/box_boxtip.png')
					no-repeat;
				position: absolute;
				left: -43px;
				top: 40px;
				font-size: 16px;
				color: rgba(66, 24, 124, 1);
				line-height: 66px;
				text-align: center;
			}
			&.key_num {
				display: inline-flex;
				flex-direction: row;
				align-items: flex-start;
				margin-top: 21px;
				position: relative;
				left: 38px;
			}
			&.boxname0 {
				background: url('../../../assets/image/box_name1.png') no-repeat;
			}
			&.boxname1 {
				background: url('../../../assets/image/box_name2.png') no-repeat;
			}
			&.boxname2 {
				background: url('../../../assets/image/box_name3.png') no-repeat;
			}
			&.boxname3 {
				background: url('../../../assets/image/box_name5.png') no-repeat;
			}
			&.boxname4 {
				background: url('../../../assets/image/tigername.png') no-repeat;
			}
			.key {
				display: inline-block;
				width: 28px;
				height: 34px;
				margin-right: 0;
				&.key0 {
					background: url('../../../assets/image/key_1.png') no-repeat;
				}
				&.key1 {
					background: url('../../../assets/image/key_2.png') no-repeat;
				}
				&.key2 {
					background: url('../../../assets/image/key_3.png') no-repeat;
				}
				&.key3 {
					background: url('../../../assets/image/key_5.png') no-repeat;
				}
				&.key4 {
					background: url('../../../assets/image/tigerkey.png') no-repeat;
				}
			}
			.num {
				display: inline-block;
				font-size: 20px;
				color: #dcccf4;
				margin-left: 8px;
			}
		}
	}
	.boxAct_contain {
		position: absolute;
		top: 1168px;
		display: flex;
		flex-direction: row;
		left: 361px;
		.boxAct_method {
			width: 548px;
			height: 342px;
			background: url('../../../assets/image/box_rule.png') no-repeat;
			margin-right: 21px;
			position: relative;
			top: 16px;
			ul {
				width: 445px;
				margin: 72px auto 0;
				font-size: 0;
				box-sizing: border-box;
				height: 198px;
				li {
					height: 30px;
					span {
						height: 100%;
						display: inline-block;
						font-size: 16px;
						color: rgba(97, 31, 60, 1);
						line-height: 30px;
						text-align: center;
					}
					:nth-child(1) {
						width: 150px;
						background: rgba(240, 211, 143, 1);
					}
					:nth-child(2) {
						width: 295px;
						background: rgba(254, 240, 203, 1);
						em{
							background: none;
							display: inline-block;
							width: 144px;
							text-align: left;
						}
					}
				}
				:nth-child(n + 2) {
					margin-top: 12px;
				}
			}
			.boxAct_method_tip {
				font-size: 14px;
				color: rgba(195, 160, 248, 1);
				width: 100%;
				text-align: center;
				margin-top: 26px;
			}
		}
		.boxAct_list {
			width: 631px;
			height: 364px;
			background: url('../../../assets/image/box_list.png') no-repeat;
			position: relative;
			.slide_right {
				position: absolute;
				right: 61px;
				top: 100px;
			}
            .box_list_name{
                width: 153px;
                height: 36px;
                background: url('../../../assets/image/box_list_name.png') no-repeat;
                position: absolute;
                left: 56px;
                bottom: 91px;
                font-size:19px;
                color:rgba(97,31,60,1);
                line-height: 36px;
                text-align: center;
                font-family:Source Han Serif SC;
            }
            .box_list_opened{
                width:151px;
                height:32px;
                background:rgba(254,240,203,1);
                border-radius:16px;
                font-size:16px;
                color:rgba(97,31,60,1);
                line-height: 32px;
                position: absolute;
                left: 58px;
                bottom: 44px;
                text-align: center;
            }
		}
	}
	.boxAct_rule {
		width: 1200px;
		height: 214px;
		background: url('../../../assets/image/box_tip.png') no-repeat;
		position: absolute;
		bottom: 378px;
		left: 50%;
		transform: translateX(-50%);
		ul {
			position: absolute;
			left: 53px;
			top: 66px;
			height: 113px;
			li {
				width: 100%;
				line-height: 30px;
				font-size: 14px;
				color: #c3a0f8;
			}
		}
	}
}
</style>