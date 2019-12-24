<!-- forgeIndex -->
<template>
	<div class="forge_all_content">
		<head-nav></head-nav>
		<div class="forge_content">
			<div class="forgetime">2019年9月26日-12月31日</div>
			<div class="userinfo_box">
				<div class="userinfo">
					<span>用户昵称：{{userInfo.Nickname?userInfo.Nickname:'--'}}</span>
					<span>当前银猪：{{userInfo.CoinBean?userInfo.CoinBean:'0'}}</span>
					<span @click="goRouter(1)">我的奖品</span>
					<span @click="goRouter(2)">返回福利商城</span>
				</div>
			</div>
			<div class="tip">
				<p>在下方输入银猪福利卡的卡号卡密，点击“开始锻造”即可获得该银猪福利卡面值的水晶，且该银猪福利卡失效；消耗对应数量的水晶余量可以进行抽奖，抽到的银猪福利卡以卡号卡密形式发放。</p>
			</div>
			<div class="forge_pop">
				<forge-pop></forge-pop>
			</div>
			<div class="forge_draw">
				<div class="draw_title">
					<span>
						水晶余量：{{userInfo.CoinCristal | NumFormat}}
						<em></em>
					</span>
				</div>
				<div class="draw_award">
					<span :class="test" ref="span1" id="span1"></span>
					<span ref="span2" id="span2"></span>
					<span ref="span3" id="span3"></span>
				</div>

				<div class="draw_button">
					<span :class="btnAct1?'draw_button_left active':'draw_button_left'" @click="drawstart(1)"></span>
					<span :class="btnAct2?'draw_button_right active':'draw_button_right'" @click="drawstart(2)"></span>
				</div>
				<div class="draw_tip">
					<p>提示：1、水晶可以抽取银猪福利卡，抽奖成功后可在我的奖品中查看；</p>
					<p>2、抽奖成功率99%</p>
				</div>
			</div>
			<div class="forge_rule">
				<ul>
					<li>1、银猪福利卡为游戏道具，仅限游戏使用，且生成后无法更换；</li>
					<li>2、奖品仅限本人使用，禁止交易，如因私下交易造成损失，由获奖者自行承担；</li>
					<li>3、严禁作弊，违者将处以封号处理；</li>
					<li>4、本活动最终解释权归跳跳猪团队所有</li>
				</ul>
			</div>
		</div>
		<frame-pop v-if="isshow"></frame-pop>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import forgePop from '../common/forgepop';
import framePop from '../common/framepop';
import headNav from '../../activity/common/nav';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {
		forgePop,
		headNav,
		framePop
	},
	data() {
		//这里存放数据
		return {
			btnAct1: false,
			btnAct2: false,
			test: ''
		};
	},
	//方法集合
	methods: {
		drawstart(index) {
			console.log(this.$refs.span1, 'index');
			this.$store.commit('activity/setFramePop', true);
			this.$store.commit('activity/setFramePopType', 'msg');
			this.$store.commit('activity/setMsgType', 5);
			this.$store.commit(
				'activity/setFramePopMsg',
				index == 1 ? 500 : 1000
			);
		},
		goRouter(index) {
			if (index === 1) {
				let routeData = this.$router.resolve({
					path: '/personal/details?type=1'
				});
				window.open(routeData.href, '_blank');
			} else if (index === 2) {
				let routeData = this.$router.resolve({
					path: '/activity/happydraw'
				});
				window.open(routeData.href, '_blank');
			}
		}
	},
	//监听属性 类似于data概念
	computed: {
		isshow() {
			return this.$store.state.activity.framePop;
			// return true
		},
		userInfo() {
			return this.$store.state.user.userInfo;
		}
	},
	//监控data中的数据变化
	watch: {},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
.forge_all_content {
	width: 100%;
	height: 1466px;
	overflow: hidden;
	position: relative;
	.forge_content {
		width: 1920px;
		height: 1424px;
		background: url('../../../assets/image/forgebg.png') no-repeat;
		position: absolute;
		left: 50%;
		margin-left: -960px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		.forgetime {
			line-height: 25px;
			font-size: 18px;
			font-weight: 400;
			color: #3d2b1a;
			position: absolute;
			left: 813px;
			top: 228px;
		}
		.userinfo_box {
			width: 777px;
			height: 26px;
			padding: 7px 0 0 69px;
			position: absolute;
			top: 310px;
			left: 50%;
			transform: translateX(-50%);
			box-sizing: border-box;
			.userinfo {
				width: 100%;
				height: 100%;
				span {
					display: inline-block;
					margin-right: 80px;
					line-height: 16px;
					font-size: 12px;
					color: rgba(205, 121, 43, 1);
				}
				span:nth-child(4) {
					position: relative;
					top: -3px;
					cursor: pointer;
					margin-right: 0;
				}
				span:nth-child(1) {
					width: 120px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				span:nth-child(2) {
					width: 140px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				span:nth-child(3) {
					position: relative;
					top: -3px;
					cursor: pointer;
				}
			}
		}
		.tip {
			position: absolute;
			top: 371px;
			left: 50%;
			transform: translateX(-50%);
			p {
				text-align: center;
				width: 603px;
				font-size: 12px;
				color: rgba(37, 24, 15, 1);
				line-height: 19px;
			}
		}
		.forge_pop {
			width: 618px;
			height: 537px;
			position: absolute;
			left: 260px;
			top: 570px;
		}
		.forge_draw {
			position: absolute;
			left: 919px;
			top: 525px;
			width: 633px;
			height: 490px;
			background: url('../../../assets/image/forge_draw.png') no-repeat;
			.draw_title {
				height: 23px;
				width: 100%;
				text-align: center;
				margin-top: 15px;
				span {
					display: inline-block;
					font-size: 14px;
					color: rgba(244, 163, 114, 1);
					line-height: 23px;
					position: relative;
					em {
						display: inline-block;
						width: 20px;
						height: 23px;
						margin-left: 8px;
						background: url('../../../assets/image/pebble.png')
							no-repeat;
						vertical-align: middle;
						margin-bottom: 3px;
					}
				}
				img {
					vertical-align: middle;
					margin-top: -9px;
					margin-left: 2px;
				}
			}
		}
		.draw_award {
			margin-left: 134px;
			margin-top: -48px;
			span {
				display: inline-block;
				width: 110px;
				height: 165px;
				margin-top: 129px;
				background: url('../../../assets/image/allaward.png') 0 0;
			}
			span:nth-child(1) {
				background-position-y: -475px;
				// background-position-y:0;
			}
			span:nth-child(2) {
				background-position-y: -604px;
				margin-left: 15px;
			}
			span:nth-child(3) {
				background-position-y: -358px;
				margin-left: 12px;
			}
		}
		.draw_button {
			margin-top: 50px;
			margin-left: 85px;
			span {
				display: inline-block;
			}
			.draw_button_left {
				width: 209px;
				height: 72px;
				background: url('../../../assets/image/allbutton.png') no-repeat
					0 0;
				margin-right: 49px;
				cursor: pointer;
				&.active {
					width: 209px;
					height: 62px;
					background-position-y: -95px;
				}
			}
			.draw_button_right {
				width: 209px;
				height: 72px;
				background: url('../../../assets/image/allbutton.png') no-repeat
					0 -193px;
				cursor: pointer;
				&.active {
					width: 208px;
					height: 62px;
					background-position-y: -291px;
				}
			}
		}
		.draw_tip {
			position: absolute;
			bottom: 16px;
			left: 131px;
			p {
				font-size: 12px;
				font-weight: 400;
				color: rgba(244, 163, 114, 1);
				line-height: 18px;
			}
			p:nth-child(2) {
				margin-left: 36px;
			}
		}
		.forge_rule {
			width: 1113px;
			height: 181px;
			background: url('../../../assets/image/forge_rule.png') no-repeat;
			position: absolute;
			top: 1131px;
			left: 402px;
			ul {
				margin-top: 74px;
				margin-left: 38px;
				li {
					line-height: 21px;
					color: rgba(152, 95, 6, 1);
					font-size: 14px;
				}
			}
		}
	}
}
</style>