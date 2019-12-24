<!--  -->
<template>
	<div class="fmcontent">
		<recruit-details v-if="recruitState"></recruit-details>
		<div class="fmfixed" v-show="scrollTop>500">
			<div class="awardcontent">
				<span>本期奖池</span>
				<span v-for="(item,index) in poolAward" :key="index" :class="item===','?'comma':''">{{item}}</span>
				<img src="../../../assets/image/smallpig.png" />
			</div>
		</div>
		<div class="fmtop" v-if="poolAward">
			<div class="awardcontent">
				<span>本期奖池</span>
				<span v-for="(item,index) in poolAward" :key="index" :class="item===','?'comma':''">{{item}}</span>
				<img src="../../../assets/image/bg5-pig.png" />
			</div>
			<p>
				每位推广员每拉一个有效用户，本期奖池总额就会增加20000金猪，月底按贡献瓜分大奖
				<em @click="goRoute()">查看奖励</em>
			</p>
		</div>
		<div class="fmlist">
			<div class="fmleft">
				<div class="firstleft">
					<div class="swiper-no-swiping flleft" v-if="slideData.length">
						<swiper :options="swiperOption" ref="mySwiper">
							<swiper-slide v-for="(item,index) in slideData" :key="index">
								<!-- <p>{{item.title}}</p> -->
								<p :class="index===0?'first':''">{{item.Content}}</p>
							</swiper-slide>
						</swiper>
					</div>
					<div class="flright">
						<div class="flrcontent">
							<ul>
								<li
									v-for="(item,index) in slideData"
									:key="index"
									@mouseenter="handleMouseEnter(index)"
									@mouseleave="handleMouseLeave()"
									:class="isIndex===index?'active':''"
								>{{item.Title}}</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="twoleft">
					<div class="tlcontent">
						<p>通过你的专属链接注册的好友在跳跳猪赚钱，你都可以获得好友提成奖励。他努力赚钱，你坐享收益，快来行动吧！</p>
						<p>
							<span>链接地址：</span>
							<span>{{isData.InviteUrl}}</span>
							<span class="box_btn" :data-clipboard-text="isData.InviteUrl" @click="handleCopy">立即邀请</span>
							<span @mouseenter="codeEnter(1)">我的二维码</span>
							<!-- <span></span> -->
						</p>
						<span class="erweima" @mouseleave="codeEnter(2)" v-show="codeState">
							<i></i>
							<qrcode :url="isData.InviteUrl" :wid="80" :hei="80"></qrcode>
							<!-- <p>请右键保存二维码</p> -->
						</span>
					</div>
				</div>
				<div class="threeleft">
					<div class="trcontent">
						<div class="trtopcontent">
							<p>金猪推广奖励</p>
							<div class="trtip">
								<span>游戏类别</span>
								<span>普通推广员</span>
								<span>超级推广员</span>
							</div>
							<div class="trli">
								<ul>
									<li>
										<span>游戏试玩</span>
										<span>40%</span>
										<span>60%</span>
									</li>
									<li>
										<span>棋牌试玩</span>
										<span>10%</span>
										<span>15%</span>
									</li>
									<li>
										<span>开通VIP</span>
										<span>2%</span>
										<span>5%</span>
									</li>
									<li>
										<span>影视专区</span>
										<span>30%</span>
										<span>50%</span>
									</li>
									<li>
										<span>游戏充值</span>
										<span>2%</span>
										<span>5%</span>
									</li>
								</ul>
							</div>
						</div>
						<div class="trmiddlecontent">
							<p>银猪推广奖励</p>
							<div class="trtip2">
								<span>游戏类别</span>
								<span>普通推广员</span>
								<span>超级推广员</span>
							</div>
							<div class="trli2">
								<ul>
									<li>
										<span>娱乐游戏</span>
										<span>1%</span>
										<span>3%</span>
									</li>
								</ul>
							</div>
						</div>
						<div class="trfootcontent">
							<p>例如：好友开通龙卡，则推广者获得15980000*5%=799000金猪</p>
							<p>好友游戏充值1000元，则推广者获得10000000*5%=500000金猪</p>
							<p>娱乐提成：下线每日娱乐为正盈利，次日上线获得提成奖励</p>
						</div>
					</div>
				</div>
				<div class="fourleft">
					<near-act></near-act>
				</div>
				<div class="fiveleft">
					<p>注意事项</p>
					<div class="notice">
						<ul>
							<li>1、有效好友定义：成功完成一次提现或有一次充值记录、领取一次试玩奖励（除棋牌外）、游戏充值返利、vip开通</li>
							<li>2、下线作弊产生的提成不参与统计，发现将全部扣除，作弊严重者将取消超级推广员资格</li>
							<li>
								3、若在推广过程中，出现刷号、好友活跃比例过低、违规推广、推广效果差等一切人为的不利于网站运营等情况，将取消其推广资格
								并扣除所有推广奖励，违者最高将以封号处理
							</li>
							<li>4、本次活动最终解释权归跳跳猪所有</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="fmright">
				<div class="firstright">
					<login :type="'other'" :tg="'y'"></login>
				</div>
				<div class="tworight">
					<!-- <rank-list :rankId="5" :rankTips="1"></rank-list> -->
					<rank-list :rankId="6" :rankTips="1"></rank-list>
					<div class="righttip">
						<div class="rtcontent">
							<!-- <p>
								今日娱乐净盈利：
								<em>0</em>
								<em></em>
							</p>-->
							<p>本月您暂未上榜(数据每半小时更新)</p>
							<p>查看奖池排名奖励 >></p>
						</div>
					</div>
				</div>
				<div class="threeright">
					<rank-list :rankId="7" :rankTips="1"></rank-list>
					<div class="righttip">
						<div class="rtcontent">
							<!-- <p>
								今日娱乐净盈利：
								<em>0</em>
								<em></em>
							</p>-->
							<p>本月您暂未上榜(数据每半小时更新)</p>
							<p>查看奖池排名奖励 >></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import nearAct from '../../activity/newactivity/nearactivity';
import rankList from '@/components/index/rank';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import qrcode from 'vue_qrcodes';
import Clipboard from 'clipboard';
import login from '@/components/index/login';
import recruitDetails from '@/components/common/recruitdetails';
let vm = null;
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {
		nearAct,
		rankList,
		swiper,
		swiperSlide,
		qrcode,
		login,
		recruitDetails
	},
	data() {
		//这里存放数据
		return {
			codeUrl: 'http:/t.cn/ELsEDcF',
			codeState: false,
			award: [3, ',', 6, 8, 0, 0, ',', 5, 9, 8, 0],
			piclabel: [
				'注册就送现金',
				'人人都是超级推广员',
				'超级推广员额外奖励',
				'奖池奖励推广员'
			],
			scrollTop: 0,
			swiperOption: {
				autoplay: {
					delay: 3500,
					stopOnLastSlide: false,
					disableOnInteraction: false
				},
				notNextTick: true,
				initialSlide: 0,
				direction: 'vertical',
				speed: 800,
				loop: true,
				on: {
					slideChangeTransitionEnd: function() {
						vm.handleMove(this.realIndex);
					}
				}
			},
			isIndex: 0,
			swiperLabel: [
				{
					title: '人人都是超级推广员1',
					desc:
						'当月用户推广达到80个有效好友时，将自动升级为超级推广员，并且每位有效用户奖励50000金1'
				},
				{
					title: '人人都是超级推广员2',
					desc:
						'当月用户推广达到80个有效好友时，将自动升级为超级推广员，并且每位有效用户奖励50000金2'
				},
				{
					title: '人人都是超级推广员3',
					desc:
						'当月用户推广达到80个有效好友时，将自动升级为超级推广员，并且每位有效用户奖励50000金3'
				},
				{
					title: '人人都是超级推广员4',
					desc:
						'当月用户推广达到80个有效好友时，将自动升级为超级推广员，并且每位有效用户奖励50000金4'
				}
			]
		};
	},
	//方法集合
	methods: {
		goRoute() {
			let routeData = this.$router.resolve({
				path: '/noticelist/details?id=18782&CategoryId=29'
			});
			window.open(routeData.href, '_blank');
		},
		handleMove(index) {
			this.isIndex = index;
		},
		handleMouseEnter(index) {
			this.isIndex = index;
			this.swiper.slideTo(index + 1, 2000, false);
		},
		handleScroll() {
			this.scrollTop =
				window.pageYOffset ||
				document.documentElement.scrollTop ||
				document.body.scrollTop;
		},
		handleMouseLeave() {
			// this.isIndex = 1
		},
		codeEnter(index) {
			if (index === 1) {
				this.codeState = true;
			} else if (index === 2) {
				this.codeState = false;
			}
		},
		getData() {
			this.$store.dispatch('activity/getPoolAward');
			this.$store.dispatch('app/getFriendList');
			this.$store.dispatch('activity/getSlideData');
		},
		handleCopy() {
			let tag1 = new Clipboard(`.box_btn`);
			var clipboard = tag1;
			clipboard.on('success', e => {
				this.$store.commit('app/getFrame', true);
				this.$store.commit('app/getFrameState', 0);
				this.$store.commit(
					'app/getFrameMsg',
					'已经复制您的专属链接，快去邀请吧！'
				);
				// 释放内存
				clipboard.destroy();
			});
			clipboard.on('error', e => {
				// 不支持复制
				console.log('该浏览器不支持自动复制');
				// 释放内存
				clipboard.destroy();
			});
		}
	},
	//监听属性 类似于data概念
	computed: {
		recruitState() {
			return this.$store.state.app.recruitState;
		},
		swiper() {
			return this.$refs.mySwiper.swiper;
		},
		poolAward() {
			return this.$store.state.activity.poolAward;
		},
		isData() {
			return this.$store.state.app.friendList;
		},
		slideData() {
			return this.$store.state.activity.slideData;
		},
		userInfo() {
			return this.$store.state.user.userInfo;
		}
	},
	//监控data中的数据变化
	watch: {
		userInfo(newVal) {
			this.$store.dispatch('app/getFriendList');
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.getData();
		vm = this;
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		window.addEventListener('scroll', this.handleScroll);
	}
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
%listyle {
	display: inline-block;
	width: 33.3%;
	height: 38px;
	font-size: 14px;
	color: rgba(106, 124, 162, 1);
	line-height: 38px;
	text-align: center;
	box-sizing: border-box;
	border-right: 1px solid #ebf0f5;
}
%pstyle {
	font-size: 18px;
	color: rgba(41, 39, 58, 1);
	line-height: 19px;
}
%tipstyle {
	margin-top: 14px;
	width: 100%;
	height: 40px;
	background: rgba(245, 246, 250, 1);
	font-size: 0;
	border: 1px solid #ebf0f5;
	border-bottom: none;
	span {
		@extend %listyle;
		height: 40px;
		line-height: 40px;
		&:nth-child(3) {
			border-right: none;
		}
	}
}
%trlistyle {
	width: 100%;
	border: 1px solid #ebf0f5;
	border-top: none;
	ul {
		overflow: hidden;
		font-size: 0;
		li {
			height: 38px;
			width: 100%;
			border-bottom: 1px solid #ebf0f5;
			&:last-child {
				border-bottom: none;
			}
			span {
				@extend %listyle;
				&:nth-child(3) {
					border-right: none;
				}
			}
		}
		li:nth-child(even) {
			background: rgba(249, 251, 254, 1);
		}
		li:nth-child(odd) {
			background: rgba(255, 255, 255, 1);
		}
	}
}
%righttip {
	width: 100%;
	height: 90px;
	box-sizing: border-box;
	padding: 16px 39px 15px 16px;
	background: rgba(255, 255, 255, 1);
	.rtcontent {
		font-size: 14px;
		color: #576077;
		line-height: 22px;
		p:nth-child(2) {
			cursor: pointer;
			font-size: 12px;
			color: rgba(44, 156, 254, 1);
		}
	}
}
%awardbox {
	width: 100%;
	position: absolute;
	top: 166px;
	text-align: center;
	span {
		display: inline-block;
		width: 66px;
		height: 100px;
		font-size: 82px;
		font-family: Arial;
		color: rgba(255, 255, 255, 1);
		border: 2px solid rgba(255, 255, 255, 1);
		border-radius: 2px;
		text-align: center;
		line-height: 100px;
		box-sizing: border-box;
		margin-right: 14px;
	}
	span:nth-child(1) {
		border: none;
		width: 180px;
		height: 44px;
		font-size: 44px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		margin-right: 28px;
		position: relative;
		top: -11px;
	}
	.comma {
		width: 10px;
		border: none;
		text-align: center;
		margin-left: -8px;
	}
	span:nth-last-child(2) {
		margin-right: 20px;
	}
	img {
		width: 67px;
		height: 52px;
	}
}
.fmcontent {
	width: 100%;
	overflow: hidden;
	font-family: Microsoft YaHei;
	font-weight: 400;
	background: rgba(245, 246, 250, 1);
	position: relative;
	.fmfixed {
		@extend %awardbox;
		position: fixed;
		top: 0;
		height: 80px;
		background: rgba(254, 110, 48, 1);
		z-index: 999999;
		.awardcontent {
			margin-top: 10px;
			height: 59px;
			span {
				width: 39px;
				height: 59px;
				line-height: 59px;
				margin-right: 7px;
				font-size: 44px;
			}
			span:nth-child(1) {
				width: 106px;
				font-size: 26px;
				height: 59px;
				margin-right: 14px;
				line-height: 59px;
				position: relative;
				top: -6px;
			}
			.comma {
				width: 10px;
				border: none;
				text-align: center;
				margin-left: -4px;
			}
			img {
				position: relative;
				top: 6px;
				width: 53px;
				height: 41px;
			}
		}
	}
	.fmtop {
		width: 1920px;
		height: 360px;
		background: url('../../../assets/image/bg5.jpg') no-repeat;
		.awardcontent {
			@extend %awardbox;
		}
		p {
			width: 100%;
			position: absolute;
			top: 295px;
			color: #ffffff;
			font-size: 16px;
			line-height: 18px;
			text-align: center;
			cursor: pointer;
			em {
				display: inline-block;
				margin-left: 14px;
				color: #fdf12b;
			}
		}
	}
	.fmlist {
		width: 1200px;
		margin: 43px auto 20px;
		@extend %clearfix;
		.fmleft {
			width: 900px;
			float: left;
			.firstleft {
				width: 100%;
				height: 294px;
				position: relative;
				.flleft {
					width: 671px !important;
					height: 290px;
					padding: 54px 47px 72px 47px;
					box-sizing: border-box;
					background: url('../../../assets/image/smallbg.png');
					float: left;
					position: relative;
					.swiper-container {
						width: 100%;
						height: 100%;
					}
					.swiper-slide {
						width: 100%;
						height: 100%;
						text-align: center;
						-webkit-box-pack: center;
						-ms-flex-pack: center;
						-webkit-justify-content: center;
						justify-content: center;
						-webkit-box-align: center;
						-ms-flex-align: center;
						-webkit-align-items: center;
						align-items: center;
					}
					// p:nth-child(1) {
					// 	width: 100%;
					// 	line-height: 48px;
					// 	font-size: 48px;
					// 	color: rgba(188, 82, 45, 1);
					// 	text-align: center;
					// }
					p:nth-child(1) {
						width: 424px;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						// margin-top: 64px;
						// width: 100%;
						line-height: 28px;
						color: rgba(188, 82, 45, 1);
						font-size: 20px;
						text-align: left;
						&.first {
							text-align: center;
						}
					}
				}
				.flright {
					width: 246px;
					height: 294px;
					// background: red;
					position: absolute;
					cursor: pointer;
					right: 0;
					background: url('../../../assets/image/flright.png')
						no-repeat;
					ul {
						width: 100%;
						height: 100%;
						li {
							width: 100%;
							height: 71px;
							font-size: 18px;
							color: rgba(41, 39, 58, 1);
							line-height: 71px;
							text-align: center;
							&.active {
								background: rgba(254, 111, 80, 1);
								color: rgba(255, 255, 255, 1);
							}
						}
					}
				}
			}
			.twoleft {
				margin-top: 26px;
				width: 100%;
				height: 126px;
				padding: 33px 0 33px 30px;
				background: rgba(255, 255, 255, 1);
				border-radius: 2px;
				box-sizing: border-box;
				.tlcontent {
					position: relative;
					font-size: 14px;
					p:nth-child(1) {
						color: rgba(41, 39, 58, 1);
						height: 15px;
					}
					p:nth-child(2) {
						margin-top: 17px;
						span {
							display: inline-block;
						}
						span:nth-child(1) {
							font-weight: bold;
							color: rgba(41, 39, 58, 1);
							line-height: 14px;
						}
						span:nth-child(2) {
							cursor: pointer;
							color: rgba(44, 156, 254, 1);
							line-height: 14px;
						}
						span:nth-child(3) {
							cursor: pointer;
							margin-left: 3px;
							display: inline-block;
							width: 80px;
							height: 28px;
							background: rgba(44, 156, 254, 1);
							border-radius: 2px;
							line-height: 28px;
							color: rgba(255, 255, 255, 1);
							text-align: center;
							margin-right: 7px;
						}
						span:nth-child(4) {
							display: inline-block;
							width: 80px;
							height: 29px;
							text-align: center;
							line-height: 29px;
							background: #2c9cfe;
							border-radius: 2px;
							color: #fff;
							font-weight: 400;
							cursor: pointer;
							margin-right: 7px;
							// cursor: pointer;
							// display: inline-block;
							// vertical-align: middle;
							// width: 28px;
							// height: 27px;
							// position: relative;
							// top: -0.5px;
							// left: 10px;
							// background: url('../../../assets/image/codepic.png')
							// 	no-repeat;
						}
					}
					.erweima {
						display: inline-block;
						position: absolute;
						background: white;
						border: 1px solid #bec2cd;
						display: block;
						border-radius: 2px;
						z-index: 210;
						box-sizing: border-box;
						left: 339px;
						top: 70px;
						// margin-left: 249px;
						// margin-top: 8px;
						padding: 6px;
						p {
							text-align: center;
						}
						i {
							position: absolute;
							top: -7px;
							left: 50%;
							width: 11px;
							height: 11px;
							-webkit-transform: translateX(-50%) rotate(45deg);
							transform: translateX(-50%) rotate(45deg);
							border: 1px solid #bec2cd;
							border-right: none;
							border-bottom: none;
							display: block;
							background: #fff;
						}
					}
				}
			}
			.threeleft {
				width: 100%;
				height: 550px;
				margin-top: 22px;
				padding: 22px 31px 19px 31px;
				background: rgba(255, 255, 255, 1);
				box-sizing: border-box;
				.trcontent {
					.trtopcontent {
						p {
							@extend %pstyle;
						}
						.trtip {
							@extend %tipstyle;
						}
						.trli {
							@extend %trlistyle;
						}
					}
					.trmiddlecontent {
						margin-top: 33px;
						p {
							@extend %pstyle;
						}
						.trtip2 {
							@extend %tipstyle;
						}
						.trli2 {
							@extend %trlistyle;
						}
					}
					.trfootcontent {
						margin-top: 32px;
						p {
							color: rgba(106, 124, 162, 1);
							font-size: 14px;
						}
						p:nth-child(1) {
							line-height: 14px;
						}
						p:nth-child(2) {
							line-height: 24px;
							margin-left: 42px;
						}
						p:nth-child(3){
							line-height: 14px;
							margin-left: 42px;
						}
					}
				}
			}
			.fourleft {
				width: 100%;
				height: 266px;
				margin-top: 20px;
			}
			.fiveleft {
				width: 900px;
				box-sizing: border-box;
				background: rgba(255, 255, 255, 1);
				margin-top: 22px;
				padding: 21px 49px 23px 30px;
				p {
					line-height: 19px;
					font-size: 18px;
					color: rgba(41, 39, 58, 1);
				}
				.notice {
					margin-top: 23px;
					ul {
						li {
							width: 100%;
							font-size: 14px;
							color: #6a7ca2;
							line-height: 25px;
						}
					}
				}
			}
		}
		.fmright {
			width: 280px;
			float: right;
			.tworight {
				width: 100%;
				margin-top: 31px;
				.righttip {
					@extend %righttip;
				}
			}
			.threeright {
				width: 100%;
				margin-top: 21px;
				.righttip {
					@extend %righttip;
				}
			}
		}
	}
}
</style>