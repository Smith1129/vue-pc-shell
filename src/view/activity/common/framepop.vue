<!--  -->
<template>
	<div class="frame_pop">
		<!-- <div></div> -->
		<div class="frame_content" v-if="type === 'msg'">
			<p @click="cancel" class="cancel"></p>
			<p class="tip"></p>
			<p class="msg" v-if="msgType===0">{{msg}}</p>
			<!-- <div v-else-if="msgType===1" class="hiddenY">
				<p>抱歉,该福利卡已经失效</p>
				<p class="limitId" v-for="(item,index) in msgWorryInfo" :key="index">
					<span>使用ID:{{item.id}}</span>
					<span>使用时间:{{item.time | allTime}}</span>
				</p>
			</div>-->
			<div v-else-if="msgType===5">
				<p class="handleMsg">
					正在抽取
					<span class="tkHandle">
						<i @click="handlePlusMinds(0)"></i>
						<input type="text" v-model="isNumber" />
						<i @click="handlePlusMinds(1)"></i>
					</span>
					<span>
						<i class="msgTips">{{msg}}万</i>银猪福利卡
					</span>
				</p>
			</div>
			<p class="sure" @click="cancel" v-if="msgType<1"></p>
			<span class="frame_handle" v-else-if="msgType==5">
				<p @click="cancel"></p>
				<p @click="startDraw"></p>
			</span>
		</div>
		<div class="frame_content1" v-if="type==='log'">
			<p @click="cancel"></p>
			<p></p>
			<ul v-if="msgType!=1" class="logList">
				<li v-for="(item,index) in logData.List" :key="index">
					<span>{{item.CreateTime | allTime}}</span>
					<span>{{item.Desc}}</span>
				</li>
				
			</ul>
			<div v-else class="hiddenY">
				<i>抱歉，该福利卡已经失效</i>
				<ul>
					<li v-for="(item,index) in msgWorryInfo.slice(frontNum,backNum)" :key="index">
						<span>使用ID:{{item.Id}}</span>
						<span>使用时间:{{item.Time | allTime}}</span>
					</li>
				</ul>
			</div>
			<div class="forgePage">
				<span :class="currentPage===1?'prev nopage':'prev'" @click="pageArrow(0)"></span>
				<el-pagination
					background
					layout="prev, pager, next"
					:total="logData.PageCount"
					:page-size="1"
					:current-page="currentPage"
					@current-change="handlePageChange"
					v-if="msgType!=1"
				></el-pagination>
				<span
					:class="currentPage===logData.PageCount?'next nopage':'next'"
					@click="pageArrow(1)"
					v-if="msgType!=1"
				></span>
				<span
					:class="currentPage==Math.ceil(msgWorryInfo.length/10)?'next nopage':'next'"
					@click="pageArrow(2)"
					v-else
				></span>
			</div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { forgeGetCard } from '@/api/http';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			currentPage: 1,
			isNumber: 1,
			awardList: [
				{
					styles: '-429',
					id: 1
				},
				{
					styles: 'background-position-y: -348px',
					id: 2
				}
			],
			diff: 0,
			test: '',
			count: 0,
			speed: 100,
			timer: null,
			timer1: null,
			result: '',
			btnAct1: false,
			btnAct2: false,
			frontNum: 0,
			backNum: 10
		};
	},
	//方法集合
	methods: {
		startDraw() {
			var index = this.msg == 500 ? 1 : 2;
			if (this.userInfo.CoinCristal >= this.msg * 10000) {
				let payload = {
					Type: index,
					Num: this.isNumber
				};
				return new Promise((resolve, reject) => {
					forgeGetCard(payload)
						.then(res => {
							if (res.Code === 200) {
								this.$store.commit(
									'activity/setFramePop',
									false
								);
								this.$store.dispatch('user/getInfo');
								this.result =
									this.msg == 500
										? '500w银猪福利卡'
										: '1000w银猪福利卡';
								if (index === 1) {
									this.btnAct1 = true;
									this.btnAct2 = false;
								} else if (index === 2) {
									this.btnAct2 = true;
									this.btnAct1 = false;
								}
								Velocity(
									document.getElementById('span1'),
									{
										backgroundPositionY: -5451 + 'px'
									},
									{
										duration: 5000,
										complete: this.complete
									}
								);
								this.timer = setTimeout(() => {
									Velocity(
										document.getElementById('span2'),
										{
											backgroundPositionY: -5451 + 'px'
										},
										{
											duration: 5000,
											complete: this.complete1
										}
									);
								}, 1000);

								this.timer1 = setTimeout(() => {
									Velocity(
										document.getElementById('span3'),
										{
											backgroundPositionY: -5451 + 'px'
										},
										{
											duration: 5000,
											complete: this.complete2
										}
									);
								}, 2000);
							} else {
								this.$store.commit(
									'activity/setFramePop',
									true
								);
								this.$store.commit('activity/setMsgType', 0);
								this.$store.commit(
									'activity/setFramePopType',
									'msg'
								);
								this.$store.commit(
									'activity/setFramePopMsg',
									res.Msg
								);
							}
							resolve();
						})
						.catch(error => {
							reject(error);
						});
				});
			} else {
				this.$store.commit('activity/setFramePop', true);
				this.$store.commit('activity/setMsgType', 0);
				this.$store.commit('activity/setFramePopType', 'msg');
				this.$store.commit(
					'activity/setFramePopMsg',
					'您当前的水晶余额不足，赶紧用福利卡锻造吧！'
				);
			}
		},
		handlePlusMinds(index) {
			if (index == 0) {
				if (this.isNumber == 1) {
					return false;
				} else {
					this.isNumber -= 1;
				}
			} else {
				if (this.userInfo.CoinCristal / (this.msg * 10000) >= 1) {
					if (
						this.isNumber >=
						Math.floor(
							this.userInfo.CoinCristal / (this.msg * 10000)
						)
					) {
						this.isNumber = Math.floor(
							this.userInfo.CoinCristal / (this.msg * 10000)
						);
					} else {
						this.isNumber += 1;
					}
				} else {
					return false;
				}
			}
		},
		handlePageChange(page) {
			this.currentPage = page;
			this.getPageData(page);
		},
		getPageData(page) {
			let payload = {
				PageNumber: page
			};
			this.$store.dispatch('activity/getForgeLogData', payload);
		},
		cancel() {
			this.$store.commit('activity/setFramePop', false);
		},
		pageArrow(index) {
			if (this.msgType != 1) {
				if (index === 0 && this.currentPage > 1) {
					this.currentPage--;
					this.getPageData(this.currentPage);
				} else if (
					index === 1 &&
					this.currentPage < this.logData.PageCount
				) {
					this.currentPage++;
					this.getPageData(this.currentPage);
				}
			} else {
				if (index == 0) {
					if (this.currentPage > 1) {
						this.currentPage--;
					} else {
						return false;
					}
				} else {
					if (
						this.currentPage ==
						Math.ceil(this.msgWorryInfo.length / 10)
					) {
						return false;
					} else {
						this.currentPage++;
					}
				}
			}
		},
		complete() {
			document.getElementById('span1').style.backgroundPositionY = '4px';
		},
		complete1() {
			document.getElementById('span2').style.backgroundPositionY = '4px';
			clearTimeout(this.timer);
		},
		complete2() {
			document.getElementById('span3').style.backgroundPositionY = '4px';
			clearTimeout(this.timer1);
			this.$store.commit('activity/setFramePop', true);
			this.$store.commit('activity/setMsgType', 0);
			this.$store.commit('activity/setFramePopType', 'msg');
			this.$store.commit(
				'activity/setFramePopMsg',
				`恭喜您锻造成功${this.isNumber}张${this.result}!`
			);
			this.btnAct1 = false;
			this.btnAct2 = false;
		}
	},
	//监听属性 类似于data概念
	computed: {
		msg() {
			return this.$store.state.activity.framePopMsg;
		},
		logData() {
			return this.$store.state.activity.forgeLogData;
		},
		type() {
			return this.$store.state.activity.framePopType;
		},
		msgType() {
			return this.$store.state.activity.msgType;
		},
		msgWorryInfo() {
			return this.$store.state.activity.msgWorryInfo;
		},
		userInfo() {
			return this.$store.state.user.userInfo;
		}
	},
	//监控data中的数据变化
	watch: {
		isNumber(newVal, oldVal) {
			if (isNaN(this.isNumber) || this.isNumber == '') {
				this.isNumber = 1;
			} else {
				if (this.userInfo.CoinCristal / (this.msg * 10000) < 1) {
					this.isNumber = 1;
				}
			}
		},
		currentPage(newVal, oldVal) {
			console.log(newVal, 'asdasd');
			if (newVal == 1) {
				this.frontNum = 0;
				this.backNum = 10;
			} else {
				this.frontNum = 10;
				this.backNum = 20;
			}
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {},
	destroyed() {
		this.currentPage = 1;
		console.log(';asdasdasklj');
	}
};
</script>
<style lang='scss'>
.forgePage {
	width: 100%;
	text-align: center;
	margin-top: 25px;
	.prev,
	.next {
		display: inline-block;
		width: 10px;
		height: 15px;
		cursor: pointer;
		vertical-align: middle;
	}
	.prev {
		background: url('../../../assets/image/forgeprev.png');
		&.nopage {
			background: url('../../../assets/image/forgenoprev.png');
		}
	}
	.next {
		background: url('../../../assets/image/forgenext.png');
		&.nopage {
			background: url('../../../assets/image/forgenonext.png');
		}
	}
	.el-pagination {
		display: inline-block;
		vertical-align: middle;
		.btn-next {
			display: none;
		}
		.btn-prev {
			display: none;
		}
		li {
			padding: 0 !important;
			min-width: 20px !important;
			height: 20px;
			line-height: 20px;
			// width: 20px;
			background: rgba(46, 36, 29, 1) !important;
			font-size: 12px;
			color: rgba(248, 214, 192, 1) !important;
			border: 1px solid rgba(105, 65, 35, 1);
			margin-right: 2px !important;
			cursor: pointer;
			&.active {
				background: rgba(68, 41, 23, 1) !important;
				border: 1px solid rgba(210, 139, 86, 1);
			}
			&.active + li {
				border-left: 1px solid rgba(105, 65, 35, 1);
			}
			&.el-icon {
				border: none;
				background: none !important;
				line-height: 20px;
				position: relative;
				top: -6px;
			}
		}
	}
}
</style>
<style lang='scss' scoped>
.frame_pop {
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(0, 0, 0, 0.4);
	z-index: 999999;
	top: 0;
	.frame_content {
		width: 618px;
		height: 537px;
		background: url('../../../assets/image/forgeleft.png');
		position: absolute;
		left: 48.6%;
		top: 52%;
		transform: translate(-50%, -50%);
		.handleMsg {
			font-size: 16px;
			margin-left: 40px;
			.msgTips {
				color: #eab91e;
			}
			.tkHandle {
				background: url('../../../assets/image/forgetk.png') no-repeat -62px
					0;
				width: 76px;
				height: 31px;
				display: inline-block;
				vertical-align: middle;
				font-size: 0;
				margin: 0 15px 0;
				i {
					display: inline-block;
					width: 20px;
					height: 30px;
					cursor: pointer;
				}
				input {
					vertical-align: top;
					width: 35px;
					height: 29px;
					line-height: 26px;
					color: #aa2b24;
					font-size: 19px;
					text-align: center;
					border: none;
				}
			}
		}

		.cancel {
			width: 30px;
			height: 30px;
			background: url('../../../assets/image/cancelpop.png');
			float: right;
			margin-right: 35px;
			cursor: pointer;
		}
		.tip {
			width: 168px;
			height: 23px;
			background: url('../../../assets/image/forgetitle2.png');
			margin-left: 245px;
			margin-top: 66px;
		}
		.msg {
			width: 100%;
			font-size: 16px;
			color: rgba(194, 125, 78, 1);
			line-height: 19px;
			text-align: center;
			margin-top: 70px;
			margin-left: 14px;
			margin-bottom: 46px;
		}
		div {
			width: 100%;
			color: rgba(194, 125, 78, 1);
			font-size: 14px;
			margin-left: 143px;
			margin-top: 38px;
			line-height: 21px;
			p {
				text-align: left;
			}
			.limitId {
				span:nth-child(2) {
					display: inline-block;
					margin-left: 70px;
				}
				// text-align: center;
			}
		}
		.sure {
			width: 142px;
			height: 70px;
			background: url('../../../assets/image/allbutton.png') no-repeat -33px -570px;
			position: absolute;
			left: 53%;
			transform: translateX(-50%);
			cursor: pointer;
		}
		.frame_handle {
			display: block;
			text-align: center;
			margin: 55px 0 0 45px;
			p {
				background: url('../../../assets/image/forgetk.png') no-repeat;
				width: 119px;
				height: 59px;
				display: inline-block;
				cursor: pointer;
				&:nth-child(1) {
					background-position: 0 -86px;
					margin-right: 30px;
				}
				&:nth-child(2) {
					background-position: -169px -86px;
				}
			}
		}
	}
	.frame_content1 {
		width: 460px;
		height: 498px;
		background: url('../../../assets/image/forgeleftbg.png');
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		p:nth-child(1) {
			width: 30px;
			height: 30px;
			background: url('../../../assets/image/cancelpop.png');
			float: right;
			cursor: pointer;
			margin-right: -27px;
		}
		p:nth-child(2) {
			width: 168px;
			height: 23px;
			background: url('../../../assets/image/logtitle.png');
			margin: 66px auto 0;
		}
		.hiddenY {
			width: 442px;
			margin: 15px auto 0;
			i {
				color: #c27d4e;
				font-size: 14px;
				margin-left: 72px;
			}
			ul {
				width: 100%;
				li {
					text-align: center;
					color: #c27d4e;
					font-size: 14px;
					line-height: 28px;
				}
			}
		}
		.logList {
			margin-top: 25px;
			width: 100%;
			text-align: center;
			li {
				margin-top: 15px;
				span {
					line-height: 14px;
					font-size: 14px;
					color: rgba(194, 125, 78, 1);
				}
				span:nth-child(2) {
					margin-left: 15px;
				}
			}
			li:nth-child(1) {
				margin-top: 0;
			}
		}
		// .page{
		//     position: absolute;
		//     left: 54.5%;
		//     transform: translateX(-50%);
		//     margin-top: 215px;
		//     .el-pagination{
		//         .btn-next{
		//             display: none;
		//         }
		//     }
		// }
	}
}
</style>