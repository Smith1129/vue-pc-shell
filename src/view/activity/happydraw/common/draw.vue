<!-- darw -->
<template>
	<div class="darw" :class="drawIndex==0?'bg1':'bg2'">
		<!-- 主要抽奖机 -->
		<div class="darw_machine" :class="drawIndex==0?'left':'right'">
			<div
				class="darw_box"
				:class="`box${index}`"
				v-for="(item,index) in 2"
				:key="index"
				v-show="index == drawIndex"
			>
				<div class="box_wen" @mouseenter="handleHot(1)" @mouseleave="handleHot(-1)"></div>
				<div class="box_hot" v-show="drawIndex==0&&hotIndex==1">
					<i></i>
					使用
					<em>摇取5次</em>将会有更高几率获得额外奖品，祝您今日好运
				</div>
				<div class="box_light" :class="`light${index}`"></div>
				<div class="box_prize">
					<div class="prizeShadow"></div>
					<transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
						<div class="prizeList" ref="list"></div>
					</transition>
				</div>
				<div class="box_get" v-show="index==1">
					<span class="get_btn" @click="getNum"></span>
					<span class="handle_get"></span>
				</div>
				<div class="box_btn" :class="`btn${index}`">
					<span
						v-for="(item,index) in 2"
						:key="index"
						class="isBtn"
						:class="[`isBtn${index}`,downIndex==0?'isBtn0A':downIndex==1?'isBtn1A':'']"
						@mousedown="handleClick(index)"
					></span>
				</div>
				<div class="box_tips">
					今日{{drawIndex==0?'幸运摇奖':'欧皇摇奖'}}次数：
					<em>{{drawIndex==0?drawInfo.GoodsLotteryTimes||0:drawInfo.FreecaLotteryTimes||0}}</em>
				</div>
			</div>
		</div>
		<!-- 阴影切换层 -->
		<div class="darw_handleIndex" :class="drawIndex==0?'right':'left'" @click="handleIndex()">
			<span class="tips" :style="drawIndex==0?{'right':'32%'}:{'left':'57%'}">
				切换{{drawIndex==0?'欧皇摇奖':'幸运摇奖'}}
			</span>
		</div>
	</div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具ddjs，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { drawLottery } from '@/api/http';

var timer = null;
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			drawIndex: 0, //抽奖类型
			downIndex: -1, //按钮index
			hotIndex: -1
		};
	},
	//方法集合
	methods: {
		handleHot(index) {
			this.hotIndex = index;
		},
		handleIndex() {
			if (this.downIndex == -1) {
				if (this.drawIndex == 0) {
					this.drawIndex = 1;
				} else {
					this.drawIndex = 0;
				}
			} else {
				return false;
			}
		},
		getNum() {
			
			let params = {
				state: true,
				propsId: 3,
				text: '',
				type:0
			};
			
			if (!this.userInfo) {
				params.propsId = 1;
				params.text = '请登录！';
				this.$store.commit('happydraw/setFrameState', params);
				return false;
			}
			this.$store.commit('happydraw/setFrameState', params);
		},
		handleClick(index, val) {
			let _this = this;

			let params = {
				state: true,
				propsId: 1,
				text: '',
				type:0
			};
			if (!_this.userInfo) {
				params.text = '请登录！';
				this.$store.commit('happydraw/setFrameState', params);
				return false;
			}
			if (this.drawIndex == 0) {
				if (index == 0) {
					if (this.drawInfo.GoodsLotteryTimes <= 0) {
						params.text = '幸运摇奖次数不足！';
						this.$store.commit('happydraw/setFrameState', params);
						return false;
					}
				} else {
					if (this.drawInfo.GoodsLotteryTimes < 5) {
						params.text = '幸运摇奖次数不足！';
						this.$store.commit('happydraw/setFrameState', params);
						return false;
					}
				}
			} else {
				if (index == 0) {
					if (this.drawInfo.FreecaLotteryTimes <= 0) {
						params.text = '欧皇摇奖次数不足！';
						this.$store.commit('happydraw/setFrameState', params);
						return false;
					}
				} else {
					if (this.drawInfo.FreecaLotteryTimes < 5) {
						params.text = '欧皇摇奖次数不足！';
						this.$store.commit('happydraw/setFrameState', params);
						return false;
					}
				}
			}
			if (_this.downIndex == -1) {
				_this.downIndex = index;
				let List = _this.$refs.list;
				var start = this.drawIndex == 0 ? -260 : -645;
				var end = this.drawIndex == 0 ? -5308 : -5700;
				// 猪猪碎片-5308	起始点-260
				// 猪猪精粹 -5842	起始点-645
				var timers = 3500;
				let payload = {
					Type: _this.drawIndex + 1,
					Num: index == 0 ? 1 : 5
				};
				return new Promise((resolve, reject) => {
					drawLottery(payload)
						.then(res => {
							if (res.Code == 200) {
								_this.$store.dispatch('user/getInfo');
								let params2 = {
									num: res.Data.Number,
									id: _this.drawIndex,
									award: res.Data.Award
								};
								Velocity(
									List[_this.drawIndex],
									{ backgroundPositionX: end },
									{
										duration: timers,
										complete: function(elements) {
											_this.$store.dispatch(
												'happydraw/getChipsInfo'
											);
											params.propsId = 2;
											_this.$store.commit(
												'happydraw/setPropsList',
												params2
											);
											_this.$store.commit(
												'happydraw/setFrameState',
												params
											);
											elements[0].style.backgroundPositionX =
												start + 'px';
											_this.downIndex = -1;
										}
									}
								);
							} else {
								_this.downIndex = -1;
								params.propsId = 1;
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
			} else {
				console.log('ddd');
				return false;
			}
		},
		beforeEnter: function(el) {
			console.log('a');
		},
		enter: function(el, done) {
			console.log('b');
		},
		leave: function(el, done) {
			console.log('c');
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
		drawIndex(newVal, oldVal) {
			this.downIndex = -1;
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {},
	destroyed() {
		clearTimeout(timer);
	}
};
</script>
<style lang='scss' scoped>
.darw {
	width: 1200px;
	height: 720px;
	position: relative;
	.darw_machine {
		position: absolute;
		width: 685px;
		height: 630px;
		top: 50px;
		&.right {
			right: 0;
		}
		&.left {
			left: 0;
		}
		.darw_box {
			width: 445px;
			height: 523px;
			margin: 40px auto 0;
			position: relative;
			&.box0 {
				background: url('../../../../assets/image/xyyj.png') no-repeat -2px
					0;
			}
			&.box1 {
				background: url('../../../../assets/image/ohyj.png') no-repeat 0 -310px;
			}
			.box_wen {
				width: 25px;
				height: 25px;
				position: absolute;
				right: 135px;
				top: 30px;
			}
			.box_hot {
				position: absolute;
				padding: 10px;
				background: #fff;
				right: 90px;
				top: 60px;
				border-radius: 25px;
				em {
					color: #ff5959;
					font-weight: bold;
				}
				i {
					display: block;
					position: absolute;
					width: 11px;
					height: 11px;
					transform: rotate(45deg);
					top: -5px;
					background: #fff;
					right: 50px;
				}
			}
			.box_light {
				position: absolute;
				width: 451px;
				height: 249px;
				top: 88px;
				left: -2px;
				animation: identifier 1s infinite;
				background: url('../../../../assets/image/light1.png') no-repeat;
				@keyframes identifier {
					0% {
						opacity: 1;
					}
					50% {
						opacity: 0.7;
					}
					100% {
						opacity: 1;
					}
				}
			}
			.box_prize {
				width: 381px;
				height: 181px;
				position: absolute;
				left: 50%;
				top: 125px;
				margin-left: -188px;
				overflow: hidden;
				.prizeShadow {
					background: url('../../../../assets/image/xyyj.png')
						no-repeat -479px -580px;
					width: 383px;
					height: 182px;
					position: absolute;
					z-index: 99;
				}
				.prizeList {
					margin-top: 18px;
					height: 150px;
					width: 1683px;
					background: url('../../../../assets/image/prizelist.png');
					background-position: -260px 0;
					position: absolute;
				}
			}
			.box_get {
				width: 384px;
				height: 45px;
				position: absolute;
				bottom: 138px;
				left: 50%;
				margin-left: -192px;
				span {
					display: inline-block;
					background: url('../../../../assets/image/ohyj.png')
						no-repeat;
					position: absolute;
					&.get_btn {
						background-position: -619px -598px;
						width: 120px;
						height: 35px;
						left: 50%;
						top: 50%;
						margin-left: -60px;
						margin-top: -17.5px;
						cursor: pointer;
					}
					&.handle_get {
						background-position: -507px -571px;
						width: 48px;
						height: 48px;
						animation: mymove 0.45s infinite;
						z-index: 999;
					}
				}
			}
			.box_btn {
				width: 100%;
				height: 60px;
				position: absolute;
				bottom: 70px;
				padding: 0 64px;
				box-sizing: border-box;
				.isBtn {
					display: inline-block;
					width: 148px;
					height: 60px;
					overflow: hidden;
					cursor: pointer;
				}
				&.btn0 {
					.isBtn {
						background: url('../../../../assets/image/xyyj.png')
							no-repeat;
						&.isBtn0 {
							background-position: 0 -621px;
							float: left;
							&.isBtn0A {
								background-position: -190px -627px;
								margin-top: 10px;
							}
						}
						&.isBtn1 {
							background-position: 0 -723px;
							float: right;
							&.isBtn1A {
								background-position: -190px -730px;
								margin-top: 10px;
							}
						}
					}
				}
				&.btn1 {
					.isBtn {
						background: url('../../../../assets/image/ohyj.png')
							no-repeat;
						&.isBtn0 {
							background-position: -722px -377px;
							float: left;
							&.isBtn0A {
								background-position: -531px -383px;
								margin-top: 10px;
							}
						}
						&.isBtn1 {
							background-position: -726px -465px;
							float: right;
							&.isBtn1A {
								background-position: -531px -470px;
								margin-top: 10px;
							}
						}
					}
				}
			}
			.box_tips {
				width: 174px;
				height: 22px;
				line-height: 22px;
				text-align: center;
				color: #fff;
				font-size: 13px;
				position: absolute;
				bottom: 26px;
				left: 51%;
				margin-left: -87px;
				border-radius: 20px;
				background: #a10f02;
				em {
					color: #ffda03;
				}
			}
			@keyframes mymove {
				0% {
					top: -40px;
					right: 88px;
				}
				50% {
					top: -10px;
					right: 100px;
				}
				100% {
					top: -40px;
					right: 88px;
				}
			}
		}
	}
	.darw_handleIndex {
		position: absolute;
		width: 510px;
		height: 550px;
		margin-top: -275px;
		top: 50%;
		.tips{
			color: #fff;
			text-align: center;
			font-size: 16px;
			line-height: 16px;
			padding: 9px 18px;
			border: 1px solid #fff;
			border-radius: 25px;
			display: inline-block;
			position: absolute;
			top:50%;
			transform: translate(-50%,-50%);
			cursor: pointer;
		}
		&.right {
			right: 0;
		}
		&.left {
			left: 0;
		}
	}
	&.bg2 {
		background: url('../../../../assets/image/prizebg1.png') no-repeat;
	}
	&.bg1 {
		background: url('../../../../assets/image/prizebg2.png') no-repeat;
	}
}
</style>