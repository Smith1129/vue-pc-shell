<!-- prize -->
<template>
	<div class="prize">
		<div class="prize_title">奖品合成</div>
		<div class="prize_virtual">
			<div class="virturl_title">虚拟奖品 -</div>
			<div class="virturl_list">
				<ul>
					<li v-for="(item,index) in drawComposeList.List" :key="index">
						<div class="item">
							<span class="item_img">
								<img :src="`//image-material.ttz.com/${item.ImgPath}`" alt />
							</span>
							<p class="item_name">{{item.Name}}</p>
							<span
								class="formula_pop"
								@mouseleave="mouseIndex(-1)"
								v-show="formula_popIndex==index"
							>该奖品={{item.LuckChips>0?'猪猪碎片':item.FreecaChips>0?'猪猪精粹':''}}*1+许愿粉尘*1</span>
							<p class="item_formula" @mouseenter="mouseIndex(index)">
								<em>合成公式：</em>
								<span v-if="item.LuckChips>0">
									<i style="background:#33B86E"></i>
								</span>
								<span v-if="item.FreecaChips>0">
									<i style="background:#00B4FF"></i>
								</span>
								<span>
									<i style="background:#FD628D"></i>
								</span>
								<!-- <i v-show="item.step4==1" style="background:yellow"></i> -->
							</p>
							<p class="item_debris">
								<span>
									<em>持有碎片：</em>
									<span v-if="item.LuckChips>0">
										<i>{{drawChipsInfo.LuckChips>99?'99+':drawChipsInfo.LuckChips||0}}</i>
									</span>
									<span v-if="item.FreecaChips>0">
										<i>{{drawChipsInfo.FreecaChips>99?'99+':drawChipsInfo.FreecaChips||0}}</i>
									</span>
									<span>
										<i>{{drawChipsInfo.Salt>99?'99+':drawChipsInfo.Salt||0}}</i>
									</span>
									<!-- <i v-show="item.chip3&&item.step3==1">{{item.chip3>99?'99+':item.chip3}}</i> -->
									<!-- <i v-show="item.chip4&&item.step4==1">{{item.chip4>99?'99+':item.chip4}}</i> -->
								</span>
								<i>余量：{{item.LimitNum>99?'99+':item.LimitNum}}</i>
							</p>
						</div>
						<div class="item_handle">
							<span class="handle_one" @click="handleClick(1,item)"></span>
							<span class="handle_all" @click="handleClick(2,item)"></span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="prize_advanced">
			<div class="advanced_title">高级奖品 -</div>
			<div class="advanced_list">
				<ul>
					<li v-for="(item,index) in drawComposeList.VipList" :key="index">
						<div class="item" :class="item.VipCode" @mouseenter="handleIndex(index)">
							<span class="item_step">
								<span class="bg_box">
									<i class="item_stepTips">
										<em>{{drawChipsInfo.AnimalChips||0}}</em>
										/
										<em>{{item.Chips}}</em>
									</i>
									<i
										class="item_stepBg"
										:style="{'width':Math.round(drawChipsInfo.AnimalChips/item.Chips *10000)/100.00 + '%'}"
									></i>
								</span>

								<i
									class="item_icon"
									:class="drawChipsInfo.AnimalChips==item.Chips?'item_iconY':'item_iconN'"
								></i>
							</span>
						</div>
						<div
							class="item_handle"
							:class="drawChipsInfo.AnimalChips>=item.Chips?'item_handleY':'item_handleN'"
							@click="handleMoreClick(index,item,drawChipsInfo.AnimalChips>=item.Chips)"
						></div>
						<div class="itemTips" v-show="listIndex==index" @mouseleave="handleIndex(-1)">
							<div class="itemTips_title">{{item.VipName}}</div>
							<div class="itemTips_list" v-show="item.VipCode=='vip_phoenix'">
								<h3>神秘特技</h3>
								<h5>昨日亏损则获得昨日亏损的50%，上限1500万</h5>
								<h3>开卡奖励</h3>
								<h5>1.8亿</h5>
								<h3>每日工资</h3>
								<h5>300000金猪</h5>
								<h3>试玩加成</h3>
								<h5>30%</h5>
								<h3>每日摇奖次数</h3>
								<h5>幸运要摇奖12次，欧皇摇奖10次</h5>
							</div>
							<div class="itemTips_list" v-show="item.VipCode=='vip_pixiu'">
								<h3>神秘特技</h3>
								<h5>昨日净盈利达2000万，奖励1000万</h5>
								<h3>开卡奖励</h3>
								<h5>1.2亿</h5>
								<h3>每日工资</h3>
								<h5>200000金猪</h5>
								<h3>试玩加成</h3>
								<h5>20%</h5>
								<h3>每日摇奖次数</h3>
								<h5>幸运摇奖10次，欧皇摇奖10次</h5>
							</div>
							<div class="itemTips_more" @click="goRouter">查看更多</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="advanced_tips">
				<p>神兽遗物达到相应数量即可生成对应神兽卡，生成后进度将重置。</p>
				<p>5连抓取有极小概率掉落神兽遗物，此外开通龙卡、白虎卡有极大概率掉落。</p>
			</div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { drawCompose, drawAnimalCompose } from '@/api/http';

export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			listIndex: -1,
			formula_popIndex: -1
		};
	},
	//方法集合
	methods: {
		goRouter() {
			console.log('dddd');
			let routeUrl = this.$router.resolve({
				path: '/noticelist/details',
				query: { id: '18793', CategoryId:29}
			});
			window.open(routeUrl.href, '_blank');
		},
		mouseIndex(index) {
			this.formula_popIndex = index;
		},
		handleIndex(index) {
			this.listIndex = index;
		},
		handleClick(val, item) {
			let payload = {
				GoodsId: item.Id,
				Number: 1
			};
			let params = {
				state: true,
				propsId: val == 1 ? 3 : 4,
				text: '',
				type: 2,
				props: {
					params1: item.Name,
					params2: payload.Number,
					GoodsId: payload.GoodsId,
					max: 0
				}
			};
			if (!this.userInfo) {
				params.propsId = 1;
				params.type = 0;
				params.text = '请登录！';
				this.$store.commit('happydraw/setFrameState', params);
				return false;
			}

			let spa1 = 0;
			if (item.LuckChips > 0) {
				spa1 = parseInt(this.drawChipsInfo.LuckChips) / item.LuckChips;
			} else {
				spa1 =
					parseInt(this.drawChipsInfo.FreecaChips) / item.FreecaChips;
			}
			let slot = parseInt(this.drawChipsInfo.Salt);
			if (spa1 > 0 && slot > 0) {
				if (val == 2) {
					payload.Number = spa1;
				} else {
					payload.Number = 1;
				}
				params.text = `是否兑换 ${payload.Number}份 ${item.Name}?`;
				params.props.params2 = payload.Number;
				params.props.max = spa1;
				this.$store.commit('happydraw/setFrameState', params);

				/* return new Promise((resolve, reject) => {
					drawCompose(payload)
						.then(res => {
							if (res.Code == 200) {
								this.getUserInfo();
								params.text = `恭喜您合成${res.Data.Number}次！`;
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
							console.log(error, 'ddda');
							reject(error);
						});
				}); */
			} else {
				params.propsId = 1;
				params.type = 0;
				params.text = '您的碎片不足无法合成！';
				this.$store.commit('happydraw/setFrameState', params);
			}
		},
		handleMoreClick(val, item, state) {
			if (!state) return false;
			let payload = {
				VipCode: item.VipCode
			};
			let params = {
				state: true,
				propsId: 1,
				text: `确认兑换${item.VipName}?`,
				type: 3,
				props: {
					VipCode: item.VipCode
				}
			};
			this.$store.commit('happydraw/setFrameState', params);
			/* return new Promise((resolve, reject) => {
				drawAnimalCompose(payload)
					.then(res => {
						if (res.Code == 200) {
							this.getUserInfo();
							params.text = `恭喜您合成成功！`;
							this.$store.commit(
								'happydraw/setFrameState',
								params
							);
						} else {
							params.type = 0
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
			}); */
		},
		getInfo() {
			this.$store.dispatch('happydraw/getComposeList');
		},
		getDrawInfo() {
			this.$store.dispatch('happydraw/getChipsInfo');
		},
		getUserInfo() {
			this.$store.dispatch('user/getInfo');
		}
	},
	//监听属性 类似于data概念
	computed: {
		drawComposeList() {
			return this.$store.state.happydraw.drawComposeList;
		},
		drawChipsInfo() {
			return this.$store.state.happydraw.drawChipsInfo;
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
	mounted() {
		this.getInfo();
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
.prize {
	width: 100%;
	margin-top: 40px;
	min-height: 1587px;
	.prize_title {
		text-align: center;
		color: #fee144;
		font-size: 30px;
		line-height: 60px;
	}
	.prize_virtual {
		width: 98%;
		overflow: hidden;
		height: 1050px;
		.virturl_title {
			width: 187px;
			height: 50px;
			background: rgba(74, 15, 110, 1);
			border-radius: 0 22px 22px 0;
			color: #fd61fd;
			font-size: 20px;
			line-height: 50px;
			text-align: center;
			margin-bottom: 37px;
		}
		.virturl_list {
			width: 100%;
			height: 965px;
			overflow-x: hidden;
			overflow-y: auto;
			&::-webkit-scrollbar {
				width: 16px; /*高宽分别对应横竖滚动条的尺寸*/
				height: 1px;
			}
			&::-webkit-scrollbar-thumb {
				/*滚动条里面小方块*/
				border-radius: 8px;
				background: #bb4ff6;
			}
			&::-webkit-scrollbar-track {
				/*滚动条里面轨道*/
				border-radius: 8px;
				background: #2f1f7b;
			}
			ul {
				width: 100%;
				padding: 0 57px;
				li {
					width: 248px;
					margin-right: 25px;
					float: left;
					margin-bottom: 35px;
					&:nth-child(4n + 4) {
						margin-right: 0;
					}
					.item {
						width: 248px;
						height: 220px;
						background: #fff;
						padding: 11px;
						box-sizing: border-box;
						border-radius: 4px;
						font-size: 0;
						position: relative;
						.item_img {
							width: 226px;
							height: 125px;
							// background: url('../../../../assets/image/cardspirit.png')
							// 	no-repeat;
							display: inline-block;
							border-radius: 2px;
							img {
								width: 100%;
								height: 100%;
							}
							/* &.item0 {
								background-position: -994px 0;
							}
							&.item1 {
								background-position: -746px -176px;
							}
							&.item2 {
								background-position: -746px 0;
							}
							&.item3 {
								background-position: 0 -352px;
							}
							&.item4 {
								background-position: -249px -176px;
							}
							&.item5 {
								background-position: 0 0;
							}
							&.item6 {
								background-position: -497px 0;
							}
							&.item7 {
								background-position: -994px -176px;
							}
							&.item8 {
								background-position: -249px 0;
							}
							&.item9 {
								background-position: -497px -176px;
							}
							&.item10 {
								background-position: 0 -176px;
							} */
						}
						.item_name {
							color: #474747;
							font-size: 14px;
							line-height: 14px;
							margin-top: 13px;
							margin-bottom: 9px;
						}
						.formula_pop {
							display: block;
							position: absolute;
							background: rgba(000, 000, 000, 0.6);
							padding: 5px;
							text-align: center;
							color: #fff;
							font-size: 12px;
							z-index: 99;
							border-radius: 4px;
							top: 140px;
							left: 50%;
							transform: translateX(-50%);
							width: 200px;
						}
						.item_formula {
							font-size: 0;
							line-height: 12px;
							height: 12px;
							padding-top: 1px;
							overflow: hidden;
							position: relative;

							em {
								font-size: 12px;
								line-height: 12px;
								color: #767676;
								display: inline-block;
							}
							span {
								display: inline-block;
								width: 30px;
								text-align: center;
								vertical-align: middle;
							}
							i {
								display: inline-block;
								width: 10px;
								height: 10px;
								border-radius: 50%;
								vertical-align: middle;
								margin-bottom: 8px;
							}
						}
						.item_debris {
							color: #767676;
							margin-top: 9px;
							line-height: 12px;
							span {
								font-size: 0;
								span {
									display: inline-block;
									width: 30px;
									text-align: center;
									&:nth-child(3) {
										margin-right: 28px;
									}
								}
								em {
									font-size: 12px;
									line-height: 12px;
									color: #767676;
									display: inline-block;
								}
								i {
									font-size: 12px;
									// margin-right: 12px;
									// &:nth-child(3) {
									// 	margin-right: 64px;
									// }
								}
							}
							i {
								margin-right: 0;
								font-size: 12px;
								color: #ff8024;
							}
						}
					}
					.item_handle {
						margin-top: 12px;
						text-align: center;
						width: 100%;
						height: 49px;
						span {
							display: inline-block;
							background: url('../../../../assets/image/happybut.png')
								no-repeat;
							cursor: pointer;
							&.handle_one {
								width: 129px;
								height: 49px;
								background-position: 0 0;
							}
							&.handle_all {
								width: 81px;
								height: 33px;
								background-position: -23px -131px;
								vertical-align: top;
								margin-top: 7px;
							}
						}
					}
				}
			}
		}
	}
	.prize_advanced {
		width: 100%;
		overflow: hidden;
		.advanced_title {
			width: 187px;
			height: 50px;
			background: rgba(74, 15, 110, 1);
			border-radius: 0 22px 22px 0;
			color: #fd61fd;
			font-size: 20px;
			line-height: 50px;
			text-align: center;
			margin-bottom: 0;
		}
		.advanced_list {
			width: 100%;
			ul {
				width: 640px;
				margin: 0 auto;
				@extend %clearfix;
				li {
					float: left;
					position: relative;
					&:nth-child(1) {
						margin-right: 80px;
					}
					.itemTips {
						position: absolute;
						background: url('../../../../assets/image/tipsgj.png')
							no-repeat;
						width: 286px;
						height: 359px;
						top: -30px;
						left: -5px;
						.itemTips_title {
							color: #ffffff;
							font-size: 18px;
							text-align: center;
							line-height: 44px;
							margin-bottom: 20px;
						}
						.itemTips_list {
							width: 100%;
							margin-left: 18px;
							h3 {
								color: #fecb39;
								font-size: 16px;
								line-height: 22px;
								font-weight: normal;
							}
							h5 {
								color: #fff;
								font-size: 13px;
								line-height: 25px;
								font-weight: normal;
							}
						}
						.itemTips_more {
							color: #fecb39;
							font-size: 16px;
							text-align: center;
							margin-top: 15px;
							cursor: pointer;
						}
					}
					.item {
						width: 280px;
						height: 214px;
						background: url('../../../../assets/image/gaoji.png')
							no-repeat;
						position: relative;
						.item_step {
							position: absolute;
							top: 173px;
							display: block;
							height: 16px;
							width: 230px;
							left: 26px;
							.bg_box {
								display: inline-block;
								width: 193px;
								margin-top: 1px;
								height: 14px;
								margin-left: 3px;
								.item_stepTips {
									position: absolute;
									width: 193px;
									text-align: center;
									height: 100%;
									color: #fff;
									font-weight: bold;
								}
							}
							.item_stepBg {
								display: inline-block;
								height: 100%;
								background: linear-gradient(
									to right,
									#f94074 0%,
									#fcad14 100%
								);
								border-radius: 6px;
								font-weight: bold;
								color: #fff;
							}
							.item_icon {
								background: url('../../../../assets/image/gaoji.png')
									no-repeat;
								display: inline-block;
								width: 27px;
								height: 31px;
								right: 4px;
								bottom: -8px;
								position: absolute;
							}
						}
						&.vip_phoenix {
							background-position: 0 0;
							.item_iconN {
								background-position: -300px -115px;
							}
							.item_iconY {
								background-position: -300px -163px;
							}
						}
						&.vip_pixiu {
							background-position: -361px 0;
							.item_iconN {
								background-position: -661px -112px;
							}
							.item_iconY {
								background-position: -661px -161px;
							}
						}
					}
					.item_handle {
						background: url('../../../../assets/image/gaoji.png')
							no-repeat;
						width: 155px;
						height: 50px;
						margin: 15px auto 0;
						cursor: pointer;
						&.item_handleN {
							background-position: -423px -228px;
						}
						&.item_handleY {
							background-position: -63px -228px;
						}
					}
				}
			}
		}
		.advanced_tips {
			width: 100%;
			margin-top: 53px;
			text-align: center;
			color: #fdb9fd;
			p {
				font-size: 14px;
				line-height: 14px;
				margin-bottom: 10px;
			}
		}
	}
}
</style>