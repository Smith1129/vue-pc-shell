<!-- info -->
<template>
	<div class="info">
		<div class="info_time">活动时间：2019.9.27-12.31</div>
		<div class="info_user">
			<div class="user_text" v-if="userInfo">
				<span class="myPrize" @click="goRouter(1)"></span>
				<span class="myDeposit" @click="goRouter(2)"></span>
				<div class="myPig">
					<p>
						金猪数量：{{userInfo.CoinDiamond|NumFormat}}
						<i @click="goRouter(3)">兑换银猪</i>
					</p>
					<p>银猪数量：{{userInfo.CoinBean|NumFormat}}</p>
				</div>
			</div>
			<div class="user_noLogin" v-else>
				您还未登录,请
				<em @click="openLogin">登录</em>
			</div>
		</div>
		<div class="info_prize">
			<ul>
				<li v-for="(item,index) in List" :key="index" @click="handlePrize(index,item)">
					<span :class="`list${index}`">
						<i v-show="ListIndex==index"></i>
						<em v-show="item.time">有效期{{item.time}}</em>
					</span>
				</li>
			</ul>
		</div>
		<div class="info_handle">
			<div class="handle_left">
				<div
					v-if="userInfo"
					class="handle_watchBag"
					@mouseenter="handleBagState(true)"
					@mouseleave="handleBagState(false)"
				>
					<div class="myBag" v-show="myBagState">
						<div class="myBag_list">
							<ul>
								<li v-for="(item,index) in drawInfo.Tools" :key="index">
									<span
										class="item_img"
										:class="item.Time>0?`${item.Name}`:`${item.Name}N`"
										@mouseenter="handleBagIndex(index)"
										@mouseleave="handleBagIndex(-1)"
									></span>
									<span class="item_time" v-show="item.Time>0&&myBagIndex==index">
										<i class="item_corner"></i>
										到期时间：{{item.Time|allTime}}
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="handle_right">
				<p class="handle_right_select">
					您选择的是
					<em>{{activeName}}</em>
					<i @click="openAllPrize">查看所有道具</i>
				</p>
				<p class="handle_right_time">今日可兑换次数：{{drawInfo.CanCnt||0}}/{{drawInfo.TotalCnt||0}}</p>
				<div class="handle_right_btn">
					<div class="btn_box">
						<p>
							{{(drawInfo.NowCost/10000)|NumFormat}}万
							<i></i>
						</p>
						<span
							:class="userInfo.CoinBean>=drawInfo.NowCost&&drawInfo.CanCnt!=0?'handleOneY':'handleOne'"
							@click="handleExchange(1,userInfo.CoinBean>=drawInfo.NowCost)"
						></span>
					</div>
					<div class="btn_box">
						<p>
							{{ parseInt(drawInfo.NowCost/10000*drawInfo.CanCnt)|NumFormat}}万
							<i></i>
						</p>
						<span
							:class="userInfo.CoinBean>=(drawInfo.NowCost*drawInfo.CanCnt)&&drawInfo.CanCnt!=0?'handleAllY':'handleAll'"
							@click="handleExchange(2,userInfo.CoinBean>=drawInfo.NowCost*drawInfo.CanCnt)"
						></span>
					</div>
				</div>
				<p class="handle_right_tips" @click="goRouter(4)">尊享龙卡每日可兑换10次 >></p>
			</div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { drawExchange } from '@/api/http';

export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			List: [
				{ name: '限定头像', time: '1天' },
				{ name: '专属头像框', time: '1天' },
				{ name: '经验加成卡', time: '1天' },
				{ name: '神秘奖品' }
			],
			ListIndex: 0,
			activeName: '限定头像',
			myBagIndex: -1,
			myBagState: false
		};
	},
	//方法集合
	methods: {
		handlePrize(index, item) {
			this.ListIndex = index;
			this.activeName = item.name;
		},
		handleBagState(val) {
			this.myBagState = val;
		},
		handleBagIndex(index) {
			this.myBagIndex = index;
		},
		openAllPrize() {
			this.$store.commit('happydraw/setAllprize', true);
		},
		getDrawInfo() {
			//获取抽奖信息
			this.$store.dispatch('happydraw/getDrawInfo');
		},
		openLogin() {
			this.$store.commit('app/getLoginBox', true);
			this.$store.commit('app/setLoginOrReg', true);
		},
		handleExchange(index, val) {
			// 兑换次数
			if (val == true && this.drawInfo.CanCnt != 0) {
				let params = {
					Type: this.ListIndex + 1,
					Number: index == 1 ? 1 : this.drawInfo.CanCnt
				};
				let payload = {
					state: true,
					propsId: 4,
					text: `是否兑换 ${
						index == 1 ? 1 : this.drawInfo.CanCnt
					}份 ${this.activeName}`,
					type: 1,
					props: {
						params1: params.Type,
						params2: params.Number
					}
				};
				this.$store.commit('happydraw/setFrameState', payload);

				/* return new Promise((resolve, reject) => {
					drawExchange(params)
						.then(res => {
							let payload = {
								state: true,
								propsId: 1,
								text: ''
							};
							if (res.Code == 200) {
								this.$store.dispatch('user/getInfo');
								payload.text = `成功兑换${res.Data.Number}张`
							}else{
								payload.text = res.Msg
							}
							
							this.$store.commit(
								'happydraw/setFrameState',
								payload
							);
							resolve();
						})
						.catch(error => {
							console.log(error, 'ddda');
							reject(error);
						});
				}); */
			} else {
				return false;
			}
		},
		goRouter(index) {
			if (index == 1) {
				this.$router.push('/personal/prize?type=7');
			} else if (index == 2) {
				let parmas = {
					state: true,
					isType: 0,
					coinBean: this.userInfo.CoinBean,
					coinBeanUnavl: 0
				};
				this.$store.commit('app/setAccess', parmas);
			} else if (index == 3) {
				this.$router.push('/personal/award?id=1&type=4');
			} else if (index == 4) {
				this.$router.push('/vip');
			}
		}
	},
	//监听属性 类似于data概念
	computed: {
		drawInfo() {
			return this.$store.state.happydraw.drawInfo;
		},
		userInfo() {
			return this.$store.state.user.userInfo;
		}
	},
	//监控data中的数据变化
	watch: {
		userInfo() {
			this.getDrawInfo();
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
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
.info {
	width: 100%;
	height: 571px;
	position: relative;
	.info_time {
		position: absolute;
		left: 175px;
		top: 235px;
		color: #f2440a;
		font-size: 18px;
	}
	@extend %clearfix;
	.info_user {
		width: 100%;
		height: 95px;
		margin-top: 38px;
		.user_noLogin {
			float: right;
			height: 100%;
			width: 590px;
			margin-right: 29px;
			overflow: hidden;
			text-align: center;
			font-size: 14px;
			color: #fdc24c;
			line-height: 95px;
			em {
				cursor: pointer;
				&:hover {
					text-decoration: underline;
				}
			}
		}
		.user_text {
			float: right;
			height: 100%;
			width: 590px;
			margin-right: 29px;
			overflow: hidden;
			span {
				display: block;
				background: url('../../../../assets/image/happypart1.png')
					no-repeat;
				margin-top: 24px;
				float: left;
				cursor: pointer;
				&.myPrize {
					width: 116px;
					height: 51px;
					background-position: -591px -8px;
					margin-left: 30px;
					margin-right: 10px;
				}
				&.myDeposit {
					width: 130px;
					height: 47px;
					background-position: -721px -8px;
					margin-right: 27px;
				}
			}
			.myPig {
				float: left;
				height: 40px;
				min-width: 173px;
				margin-top: 30px;
				p {
					font-size: 14px;
					color: #fdc24c;
					line-height: 14px;
					margin-bottom: 7px;
					i {
						color: #8bfff0;
						cursor: pointer;
					}
				}
			}
		}
	}
	.info_prize {
		width: 100%;
		margin-top: 40px;
		overflow: hidden;
		ul {
			width: 580px;
			float: right;
			li {
				float: left;
				span {
					display: block;
					width: 116px;
					height: 106px;
					background: url('../../../../assets/image/happypart1.png')
						no-repeat;
					margin-left: 13px;
					position: relative;
					cursor: pointer;
					i {
						display: block;
						position: absolute;
						top: 0;
						right: 0;
						background: url('../../../../assets/image/happypart1.png')
							no-repeat -516px -116px;
						width: 29px;
						height: 29px;
					}
					em {
						display: block;
						width: 98%;
						height: 26px;
						position: absolute;
						left: 1px;
						bottom: 1px;
						text-align: center;
						line-height: 26px;
						color: #fff;
						font-size: 12px;
						background: rgba(000, 000, 000, 0.6);
						border-radius: 0px 0px 6px 6px;
					}
					&.list0 {
						background-position: -583px -113px;
					}
					&.list1 {
						background-position: -715px -113px;
					}
					&.list2 {
						background-position: -845px -113px;
					}
					&.list3 {
						background-position: -974px -113px;
					}
				}
			}
		}
	}
	.info_handle {
		width: 100%;
		height: 250px;
		margin-top: 47px;
		.handle_left {
			float: left;
			.handle_watchBag {
				background: url('../../../../assets/image/happypart1.png')
					no-repeat -1px -414px;
				width: 155px;
				height: 57px;
				margin-top: 145px;
				margin-left: 50px;
				position: relative;
				.myBag {
					position: absolute;
					top: 47px;
					z-index: 99;
					background: url('../../../../assets/image/bagbg.png')
						no-repeat;
					width: 522px;
					height: 108px;
					.myBag_list {
						height: 95px;
						width: 100%;
						margin-top: 15px;
						ul {
							overflow: hidden;
							padding: 0 20px;
							height: 100%;
							li {
								float: left;
								margin-left: 20px;
								margin-top: 10px;
								.item_img {
									display: block;
									height: 72px;
									background: url('../../../../assets/image/bagall.png')
										no-repeat;
									&.head_power_end_time {
										width: 60px;
										background-position: 0 -6px;
									}
									&.frame_power_end_time {
										width: 72px;
										background-position: -80px -6px;
									}
									&.background_a_end_time {
										width: 59px;
										background-position: -178px -6px;
									}
									&.exp_buffer_10_end_time {
										width: 73px;
										background-position: -258px -6px;
									}
									&.exp_buffer_5_end_time {
										width: 94px;
										background-position: -355px -6px;
									}
									&.head_power_end_timeN {
										width: 60px;
										background-position: 0 -110px;
									}
									&.frame_power_end_timeN {
										width: 72px;
										background-position: -80px -110px;
									}
									&.background_a_end_timeN {
										width: 59px;
										background-position: -178px -110px;
									}
									&.exp_buffer_10_end_timeN {
										width: 73px;
										background-position: -258px -110px;
									}
									&.exp_buffer_5_end_timeN {
										width: 94px;
										background-position: -355px -110px;
									}
								}
								.item_time {
									width: 250px;
									position: absolute;
									display: block;
									height: 30px;
									line-height: 30px;
									text-align: center;
									background: #fff;
									border-radius: 2px;
									font-size: 14px;
									color: #333;
									bottom: -38px;
									.item_corner {
										position: absolute;
										width: 12px;
										height: 12px;
										background: #fff;
										top: -6px;
										left: 30px;
										transform: rotate(45deg);
										border-right: none;
										border-bottom: none;
									}
								}
							}
						}
					}
				}
			}
		}
		.handle_right {
			float: right;
			width: 510px;
			margin-right: 60px;
			.handle_right_select {
				font-size: 20px;
				color: #fff;
				line-height: 30px;
				text-align: center;
				em {
					display: inline-block;
					height: 30px;
					text-align: center;
					color: #fdc24c;
					line-height: 30px;
				}
				i {
					color: #8bfff0;
					font-size: 16px;
					cursor: pointer;
				}
			}
			.handle_right_time {
				margin-top: 18px;
				text-align: center;
				font-size: 16px;
				line-height: 16px;
				color: #fcc4f2;
			}
			.handle_right_btn {
				margin-top: 36px;
				.btn_box {
					display: inline-block;
					&:nth-child(1) {
						margin-right: 18px;
					}
					p {
						font-size: 14px;
						line-height: 14px;
						color: #fff;
						text-align: center;
						margin-bottom: 5px;
						i {
							display: inline-block;
							background: url('../../../../assets/image/bean3.png')
								no-repeat;
							width: 22px;
							height: 17px;
							vertical-align: middle;
							margin-bottom: 3px;
						}
					}
					span {
						display: inline-block;
						width: 229px;
						height: 66px;
						background: url('../../../../assets/image/happypart1.png')
							no-repeat;
						cursor: pointer;
						&.handleOne {
							background-position: -594px -304px;
						}
						&.handleOneY {
							background-position: -594px -390px;
						}
						&.handleAll {
							background-position: -851px -300px;
						}
						&.handleAllY {
							background-position: -851px -390px;
						}
					}
				}
			}
			.handle_right_tips {
				color: #8bfff0;
				font-size: 14px;
				line-height: 14px;
				text-align: right;
				margin-top: 14px;
				cursor: pointer;
			}
		}
	}
}
</style>