<!-- frame -->
<!-- propsId ==1 弹出消息 ==2 抽奖成功 ==3获取次数  -->
<template>
	<div class="frame">
		<div class="frame_box">
			<div class="box_title">
				{{propsId==1?'温馨提示':propsId==2?'恭喜获得':propsId==3?'温馨提示':propsId==4?'温馨提示':''}}
				<i
					@click="handleClose"
				></i>
			</div>
			<div
				class="box_content"
				:class="propsId==1?'xiaoxi':propsId==2?'choujiang':propsId==3?'getcishu':propsId==4?'xiaoxi':''"
			>
				<!-- 弹出消息 -->
				<span v-if="propsId==1" class="xiaoxi_content">
					<p>{{text}}</p>
				</span>
				<!-- 抽奖成功 -->
				<span v-else-if="propsId==2" class="choujiang_content">
					<ul>
						<li :style="prizeList.award==0?{'margin-left':'145px'}:{}">
							<span class="item_img" :class="`${prizeList.id==0?'zzsp':'zzjc'}`"></span>
							<span class="item_name">{{prizeList.id==0?'猪猪碎片':'猪猪精粹'}}x{{prizeList.num}}</span>
						</li>
						<li>
							<span class="item_img" :class="`xyfc`"></span>
							<span class="item_name">{{'许愿粉尘'}}x{{prizeList.num}}</span>
						</li>
						<li>
							<span class="item_img" :class="`yz`"></span>
							<span class="item_name">{{'银猪'}}{{prizeList.award}}</span>
						</li>
					</ul>
				</span>
				<!-- 获取次数 -->
				<span v-else-if="propsId==3" class="getcishu_content">
					<p class="getcishu_more">
						<router-link :to="'/vip'" tag="a">更多次数</router-link>
					</p>
					<p class="getcishu_input">
						获取
						<span class="input_bg">
							<i style="float:left" @click="handleAM(0)"></i>
							<input type="text" v-model="prizeNum" v-if="type==0" />
							<input type="text" v-model="exNum" v-else />
							<i style="float:right" @click="handleAM(1)"></i>
						</span>
						<span class="input_tips">{{type==2?paramsProps.params1:'欧皇摇奖次数'}}</span>
					</p>
					<p class="getcishu_need" v-if="type!=2">需要 {{(isAll/10000)|NumFormat}}万 银猪</p>
				</span>
				<!-- 确认交互 -->
				<span v-if="propsId==4" class="xiaoxi_content">
					<p>{{text}}</p>
				</span>
			</div>
			<div
				class="box_handle"
				:class="propsId==1?'xiaoxiBtn':propsId==2?'choujiangBtn':propsId==3?'getcishuBtn':''"
				@click="handleClick"
				v-if="type==0"
			></div>
			<div class="box_allHanlde" v-else>
				<span class="querenBtn" @click="handleExChange"></span>
				<span class="closeBtn" @click="handleClose"></span>
			</div>
			<!-- 剩余次数 -->
			<div class="box_surplus" v-show="propsId==3&&type==0">今日剩余次数：{{drawInfo.FreecaCanCnt}}</div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { drawExchange, drawCompose, drawAnimalCompose } from '@/api/http';

export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			prizeNum: 1,
			exNum: 1
		};
	},
	//方法集合
	methods: {
		handleExChange() {
			if (this.type == 1) {
				let payload = {
					Type: this.paramsProps.params1,
					Number: this.paramsProps.params2
				};
				return new Promise((resolve, reject) => {
					drawExchange(payload)
						.then(res => {
							let params = {
								state: true,
								propsId: 1,
								text: '',
								type: 0
							};
							if (res.Code == 200) {
								this.$store.dispatch('user/getInfo');
								params.text = `成功兑换${res.Data.Number}张`;
							} else {
								params.text = res.Msg;
							}
							this.$store.commit(
								'happydraw/setFrameState',
								params
							);
							resolve();
						})
						.catch(error => {
							reject(error);
						});
				});
			} else if (this.type == 2) {
				let payload = {
					GoodsId: this.paramsProps.GoodsId,
					Number:
						this.exNum > 1 ? this.exNum : this.paramsProps.params2
				};
				return new Promise((resolve, reject) => {
					drawCompose(payload)
						.then(res => {
							let params = {
								state: true,
								propsId: 1,
								text: '',
								type: 0
							};
							if (res.Code == 200) {
								this.$store.dispatch('user/getInfo');
								params.text = `恭喜您合成${res.Data.Number}张！`;
								this.$store.commit(
									'happydraw/setFrameState',
									params
								);
							} else {
								params.text = res.Msg;
								this.$store.commit(
									'happydraw/setFrameState',
									params
								);
							}

							resolve();
						})
						.catch(error => {
							reject(error);
						});
				});
				console.log(payload, 'payload');
			} else if (this.type == 3) {
				let payload = {
					VipCode: this.paramsProps.VipCode
				};
				return new Promise((resolve, reject) => {
					drawAnimalCompose(payload)
						.then(res => {
							let params = {
								state: true,
								propsId: 1,
								text: '',
								type: 0
							};
							if (res.Code == 200) {
								this.getUserInfo();
								params.text = `恭喜您合成成功！`;
								this.$store.commit(
									'happydraw/setFrameState',
									params
								);
							} else {
								params.type = 0;
								params.text = res.Msg;
								this.$store.commit(
									'happydraw/setFrameState',
									params
								);
							}
							resolve();
						})
						.catch(error => {
							console.log(error, 'ddda');
							reject(error);
						});
				});
			}
		},
		handleAM(index) {
			let _this = this;
			if (_this.type != 2) {
				if (index == 1) {
					_this.prizeNum += 1;
					if (this.prizeNum > this.drawInfo.FreecaCanCnt) {
						return (this.prizeNum = this.drawInfo.FreecaCanCnt);
					}
				} else {
					if (_this.prizeNum == 1) {
						return false;
					} else {
						_this.prizeNum -= 1;
					}
				}
			} else {
				if (index == 1) {
					_this.exNum += 1;
				} else {
					if (_this.exNum == 1) {
						return false;
					} else {
						_this.exNum -= 1;
					}
				}
			}
		},
		handleClose() {
			let params = {
				state: false,
				type: 0
			};
			this.exNum = 1;
			this.prizeNum = 1;
			this.$store.commit('happydraw/setFrameState', params);
		},
		handleClick() {
			if (this.propsId == 3) {
				let payload = {
					ExchangeType: 2,
					Number: this.prizeNum
				};
				return new Promise((resolve, reject) => {
					drawExchange(payload)
						.then(res => {
							let params = {
								state: true,
								propsId: 1,
								text: res.Msg,
								type: 0
							};
							if (res.Code == 200) {
								this.$store.dispatch('user/getInfo');
								this.handleClose();
								params.text = `您成功获取${res.Data.Number}次`;
								this.$store.commit(
									'happydraw/setFrameState',
									params
								);
							} else {
								this.$store.commit(
									'happydraw/setFrameState',
									params
								);
							}

							this.$store.commit(
								'happydraw/setFrameState',
								params
							);
							resolve();
						})
						.catch(error => {
							reject(error);
						});
				});
			} else {
				this.handleClose();
			}
		}
	},
	//监听属性 类似于data概念
	computed: {
		propsId() {
			return this.$store.state.happydraw.frameState.propsId;
		},
		text() {
			return this.$store.state.happydraw.frameState.text;
		},
		type() {
			return this.$store.state.happydraw.frameState.type;
		},
		paramsProps() {
			return this.$store.state.happydraw.frameState.props;
		},
		prizeList() {
			return this.$store.state.happydraw.propsList;
		},
		drawInfo() {
			return this.$store.state.happydraw.drawInfo;
		},
		isAll() {
			let all = 0;
			all = this.drawInfo.FreecaCost * this.prizeNum;
			return all;
		}
	},
	//监控data中的数据变化
	watch: {
		prizeNum(newVal, oldVal) {
			if (isNaN(this.prizeNum) || this.prizeNum == '') {
				this.prizeNum = 1;
			} else {
				if (parseInt(newVal) > this.drawInfo.FreecaCanCnt) {
					this.prizeNum =
						this.drawInfo.FreecaCanCnt == 0
							? 1
							: this.drawInfo.FreecaCanCnt;
				}
			}
		},
		exNum(newVal, oldVal) {
			if (isNaN(this.exNum) || this.exNum == '') {
				this.exNum = 1;
			}
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
.frame {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background: rgba(000, 000, 000, 0.6);
	z-index: 999;
	.frame_box {
		position: absolute;
		top: 50%;
		left: 50%;
		background: url('../../../../assets/image/drawframebg.png') no-repeat -113px -410px;
		width: 680px;
		height: 309px;
		transform: translate(-50%, -50%);
		.box_title {
			width: 100%;
			line-height: 58px;
			text-align: center;
			color: #fff;
			font-size: 24px;
			position: relative;
			i {
				display: block;
				width: 30px;
				height: 30px;
				background: url('../../../../assets/image/framesee.png')
					no-repeat -322px -162px;
				position: absolute;
				top: 0;
				right: -35px;
				cursor: pointer;
			}
		}
		.box_content {
			width: 100%;
			text-align: center;
			margin: 0 auto;
			overflow: hidden;
			&.xiaoxi {
				p {
					margin: 50px auto 40px;
					text-align: center;
					font-size: 24px;
					color: #f3defe;
				}
			}
			&.choujiang {
				width: 526px;
				height: 133px;
				background: url('../../../../assets/image/drawframebg.png')
					no-repeat -194px -85px;
				margin-top: 13px;
				span {
					ul {
						overflow: hidden;
						width: 100%;
						height: 100%;
						li {
							float: left;
							height: 100%;
							width: 100px;
							margin-left: 45px;
							position: relative;
							&:first-child {
								margin-left: 80px;
							}
							span {
								display: block;
								&.item_name {
									color: #f3defe;
									font-size: 16px;
									line-height: 16px;
									position: absolute;
									bottom: 17px;
									width: 100px;
								}
								&.item_img {
									margin: 17px auto 0;
									background: url('../../../../assets/image/framesee.png')
										no-repeat;
									&.zzsp {
										width: 72px;
										height: 58px;
										background-position: -20px -19px;
									}
									&.zzjc {
										width: 62px;
										height: 64px;
										background-position: -159px -17px;
									}
									&.xyfc {
										width: 47px;
										height: 62px;
										background-position: -194px -238px;
									}
									&.ssyw {
										width: 72px;
										height: 57px;
										background-position: -298px -243px;
									}
									&.yz {
										width: 68px;
										height: 68px;
										background-position: -290px -16px;
									}
								}
							}
						}
					}
				}
			}
			&.getcishu {
				p {
					text-align: center;
					font-size: 24px;
					color: #f3defe;
					&.getcishu_need {
						font-size: 16px;
						line-height: 16px;
					}
					&.getcishu_more {
						text-align: right;
						color: #f3defe;
						line-height: 16px;
						font-size: 16px;
						text-decoration: underline;
						padding-right: 35px;
						cursor: pointer;
						a {
							color: #f3defe;
						}
					}
					&.getcishu_input {
						margin-top: 24px;
						margin-bottom: 44px;
						span {
							display: inline-block;
						}
						.input_bg {
							width: 121px;
							height: 40px;
							background: url('../../../../assets/image/framesee.png')
								no-repeat -27px -247px;
							overflow: hidden;
							vertical-align: middle;
							margin-bottom: 1px;
							i {
								display: inline-block;
								cursor: pointer;
								height: 100%;
								width: 28px;
							}
							input {
								width: 64px;
								margin-top: 7px;
								box-sizing: border-box;
								font-size: 24px;
								color: #d74b27;
								border: none;
								text-align: center;
							}
						}
						.input_tips {
							color: #fff;
						}
					}
				}
			}
		}
		.box_handle {
			width: 229px;
			height: 66px;
			margin: 15px auto 0;
			background: url('../../../../assets/image/framesee.png') no-repeat;
			cursor: pointer;

			&.xiaoxiBtn {
				background-position: -69px -356px;
			}
			&.choujiangBtn {
				background-position: -69px -144px;
			}
			&.getcishuBtn {
				background-position: -69px -356px;
			}
		}
		.box_allHanlde {
			margin: 15px auto 0;
			text-align: center;
			span {
				display: inline-block;
				width: 169px;
				height: 66px;
				background: url('../../../../assets/image/framesee.png')
					no-repeat;
				margin: 0 20px;
				cursor: pointer;

				&.querenBtn {
					background-position: -11px -489px;
				}
				&.closeBtn {
					background-position: -200px -489px;
				}
			}
		}
		.box_surplus {
			color: #f3defe;
			font-size: 16px;
			line-height: 16px;
			text-align: right;
			position: absolute;
			right: 35px;
			bottom: 35px;
		}
	}
}
</style>