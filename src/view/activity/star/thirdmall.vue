<!--  -->
<template>
	<div class="gameTasks">
		<head-nav></head-nav>
		<!-- thirdMallPop -->
		<pop-content v-if="thirdMallPop"></pop-content>
		<div class="allcontent">
			<div class="headerPic">
				<img src="../../../assets/image/hudie.png" class="hudie" />
			</div>
			<div class="limitTime">
				<p>活动时间：2019-07-18 ~ 2019-08-08</p>
			</div>
			<div class="fontcontent">
				<p class="complete">
					完成任务，将
					<em>自动</em>发放相应的金猪奖励和活跃度(任务每天凌晨刷新)
				</p>\
				<div class="luck_turn_user">
					<p v-if="userInfo">
						欢迎您,
						<i>{{userInfo.Nickname}}</i>
					</p>
					<p v-else>
						您好，还未登录，请
						<em @click="goLogin()">[登录]</em>
					</p>
				</div>
			</div>
			<div class="picList">
				<ul>
					<li v-for="(item,index) in picList" :key="index">
						<div class="licontent">
							<p class="p1">{{item.label}}</p>
							<img
								v-if="userBoxInfo.Act1"
								:src="userBoxInfo.Act1[index].Step==userBoxInfo.Act1[index].TargetStep?greenBox:noOpen"
							/>
							<p class="p2">{{item.name}}</p>
						</div>
						<p
							v-if="userBoxInfo.Act1"
							:class="userBoxInfo.Act1[index].Step==userBoxInfo.Act1[index].TargetStep?
                     'p3':userBoxInfo.Act1[index].Step>0?
                     'nocomplete p3':'p3 ccc'"
							@mouseenter="mouseEnter(1,index)"
							@mouseleave="mouseLeave(1)"
							@mousedown="mouseDown(1,index)"
						>
							<span v-show="isIndex==index?false:true">
								{{userBoxInfo.Act1[index].Step}}
								<em>/{{userBoxInfo.Act1[index].TargetStep}}</em>
							</span>
							<span class="goNow" v-show="isIndex==index?true:false">立即参与</span>
						</p>
					</li>
				</ul>
			</div>
			<div class="picList2">
				<ul>
					<li v-for="(item,index) in picList2" :key="index">
						<div class="licontent">
							<p class="p1">{{item.label}}</p>
							<img
								v-if="userBoxInfo.Act2"
								:src="userBoxInfo.Act2[index].Step==userBoxInfo.Act2[index].TargetStep?greenBox:noOpen"
							/>
							<p class="p2">{{item.name}}</p>
						</div>
						<p
							v-if="userBoxInfo.Act2"
							:class="userBoxInfo.Act2[index].Step==userBoxInfo.Act2[index].TargetStep?'p3':userBoxInfo.Act2[index].Step>0?
                     'nocomplete p3':'p3 ccc'"
							@mouseenter="mouseEnter(2,index)"
							@mouseleave="mouseLeave(2)"
							@mousedown="mouseDown(2,index)"
						>
							<span v-show="isIndex1==index?false:true">
								{{userBoxInfo.Act2[index].Step}}
								<em>/{{userBoxInfo.Act2[index].TargetStep}}</em>
							</span>
							<span class="goNow" v-show="isIndex1==index?true:false">立即参与</span>
						</p>
					</li>
				</ul>
			</div>
			<div class="picList3">
				<ul>
					<li v-for="(item,index) in picList3" :key="index">
						<div class="licontent">
							<div v-if="index==0||index==2||index==3">
								<p class="p1">{{item.label}}</p>
								<p>{{item.label2}}</p>
							</div>
							<div v-else>
								<p class="p1">{{item.label}}</p>
							</div>
							<img
								v-if="userBoxInfo.Act3"
								:src="userBoxInfo.Act3[index].Step==userBoxInfo.Act3[index].TargetStep?greenBox:noOpen"
								:class="index==1?'pic1':''"
							/>
							<p class="p2">{{item.name}}</p>
						</div>
						<p
							v-if="userBoxInfo.Act3"
							:class="userBoxInfo.Act3[index].Step==userBoxInfo.Act3[index].TargetStep?'p3':userBoxInfo.Act3[index].Step>0?
                     'nocomplete p3':'p3 ccc'"
						>
							<span>
								{{userBoxInfo.Act3[index].Step}}
								<em>/{{userBoxInfo.Act3[index].TargetStep}}</em>
							</span>
							<!-- <span class="goNow" v-show="isIndex==index?true:false">立即参与</span> -->
						</p>
					</li>
				</ul>
			</div>
			<div v-if="boxStatusInfo">
				<div class="listFont">
					<p>本周累计:</p>
					<p>{{boxStatusInfo.Active}}活跃度</p>
				</div>
				<div class="refresh">
					每周四凌晨刷新清零(请及时
					<em>手动</em>领取奖励)
				</div>
				<div class="picList4">
					<img src="../../../assets/image/livefont.png" class="livefont" />
					<div class="bgpic" v-if="boxStatusInfo">
						<span
							class="bgpic1"
							:style="Number(boxStatusInfo.Active)<300?{width:Number(boxStatusInfo.Active)/1000*100+'%'}:Number(boxStatusInfo.Active)<500&&Number(boxStatusInfo.Active)>=300?{width:Number(boxStatusInfo.Active)/1000*100+5+'%'}:Number(boxStatusInfo.Active)<1000&&Number(boxStatusInfo.Active)>=500?{width:Number(boxStatusInfo.Active)/1000*100+10+'%'}:{width:100+'%'}"
						></span>
					</div>
					<ul>
						<li v-for="(item,index) in boxStatusInfo.BoxInfo" :key="index">
							<div v-if="boxStatusInfo.Active>=item.Active&&item.IsGet==0">
								<img src="../../../assets/image/hammer.png" class="hammer" />
							</div>
							<img v-if="item.IsGet==0" :src="noOpen" @click="openBox(index,item.Active)" />
							<img v-if="item.IsGet==1" :src="opened" class="opened" />
							<p :class="item.IsGet==1?'opened1':''">{{item.Active}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="tableContent">
				<div class="tableTitle">
					以活动期间活跃度累计进行排名，活动结束后次日
					<em>自动</em>发放奖励
				</div>
				<div class="tableTop" v-if="userRankInfo.Info">
					<span>我的排名：{{userRankInfo.Info.Rank==0?'未上榜':userRankInfo.Info.Rank}}</span>
					<span>我的累计活跃度：{{userRankInfo.Info.CountInfo}}</span>
					<span>我的奖励：{{userRankInfo.Info.Award==0?'暂无,请加油上榜':userRankInfo.Info.Award+'元'}}</span>
				</div>
				<table>
					<thead>
						<tr>
							<td>排名</td>
							<td>会员昵称</td>
							<td>累计活跃度</td>
							<td>奖励</td>
						</tr>
					</thead>
					<tbody v-if="userRankInfo">
						<tr v-for="(item,index) in userRankInfo.List" :key="index">
							<td v-if="item.Rank==1">
								<img src="../../../assets/image/first.png" />
							</td>
							<td v-if="item.Rank==2">
								<img src="../../../assets/image/second.png" />
							</td>
							<td v-if="item.Rank==3">
								<img src="../../../assets/image/third.png" />
							</td>
							<td v-if="item.Rank!=1&&item.Rank!=2&&item.Rank!=3">{{item.Rank}}</td>
							<td>{{item.Nickname}}</td>
							<td>{{item.CountInfo}}</td>
							<td>{{item.Award}}元</td>
						</tr>
						<tr class="last">
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
				<div class="page">
					<p class="prev" @click="pageSearch(currentPage)" :class="currentPage+1>1?'show':''">上一页</p>
					<div class="content">
						<p
							v-for="(item,index) in lableList"
							:key="index"
							:class="currentPage==index?'active':''"
							@click="pageSearch(item.inner)"
						>{{item.inner}}</p>
					</div>
					<p class="next" @click="pageSearch(currentPage+2)" :class="currentPage+1<5?'show':''">下一页</p>
				</div>
			</div>
			<div class="bottom-rule">
				<ul>
					<li>1.活动时间为2019年7月18日-2019年8月8日。</li>
					<li>2.完成活动每日任务,即可获得相应的金猪及活跃度奖励;当日达到上限后将无法再次获得金猪及活跃度奖励。(任务每天凌晨刷新,刷新后可以继续完成)。</li>
					<li>3.宝箱活跃度累计一周，达到相应的活跃度既可开启宝箱。(每周四凌晨刷新清零,请及时领取奖励)。</li>
					<li>4.宝箱排行榜以活动期间累计的活跃度进行排名,活动结束后奖励次日自动发放。</li>
					<li>5.发现作弊行为或者其他异常导致结果异常,跳跳猪有权取消活动资格,违者最高将以封号处理。</li>
					<li>6.活动最终解释权归跳跳猪所有。</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import headNav from '../../activity/common/nav';
import popContent from './common/thirdmallpop';
import { openBox } from '@/api/http';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {
		headNav,
		popContent
	},
	data() {
		//这里存放数据
		return {
			refresh: true,
			// show:true,
			isIndex: -1,
			isIndex1: -1,
			currentPage: 0,
			picList: Object.freeze([
				{ label: '注册一个游戏', name: '1000金猪+10活跃' },
				{ label: '领取一次试玩奖励', name: '2000金猪+20活跃' },
				{ label: '毕业一个游戏', name: '2000金猪+50活跃' },
				{ label: '领取一次冲级赛奖励', name: '3000金猪+30活跃' },
				{ label: '领取日榜奖励', name: '2500金猪+25活跃' },
				{ label: '开通VIP', name: '2000金猪+20活跃' }
			]),
			picList2: Object.freeze([
				{ label: '注册一个游戏', name: '1000金猪+10活跃' },
				{ label: '领取一个等级奖励', name: '2000金猪+20活跃' },
				// {label:'毕业一个游戏',name:'2000金猪+40活跃'},
				{ label: '领取日榜奖励', name: '2500金猪+25活跃' }
			]),
			picList3: Object.freeze([
				{
					label: '单次盈利',
					label2: '10万银猪以上',
					name: '1000金猪+10活跃'
				},
				{ label: '领取日榜奖励', name: '2000金猪+30活跃' },
				{
					label: '单次盈利',
					label2: '100万银猪以上',
					name: '1500金猪+20活跃'
				},
				{
					label: '单次盈利',
					label2: '1000万银猪以上',
					name: '2000金猪+20活跃'
				}
			]),
			noOpen: require('../../../assets/image/jinbox.png'),
			opened: require('../../../assets/image/openbox.png'),
			greenBox: require('../../../assets/image/greenbox.png'),
			lableList: Object.freeze([
				{ inner: 1 },
				{ inner: 2 },
				{ inner: 3 },
				{ inner: 4 },
				{ inner: 5 }
			])
		};
	},
	//方法集合
	methods: {
		mouseEnter(a, index) {
			if (a === 1) {
				if (index == 0 || index == 5) {
					this.isIndex = index;
				}
			} else if (a === 2) {
				if (index == 0) {
					this.isIndex1 = index;
				}
			}
			// this. = index
		},
		mouseLeave(index) {
			if (index === 1) {
				this.isIndex = -1;
			} else if (index === 2) {
				this.isIndex1 = -1;
			}
		},
		mouseDown(a, index) {
			if (a === 1) {
				if (index === 0) {
					// this.$router.push({path:'/game'})
					let routeData = this.$router.resolve({ path: '/game' });
					window.open(routeData.href, '_blank');
				} else if (index === 5) {
					// this.$router.push({path:'/vip'})
					let routeData = this.$router.resolve({ path: '/vip' });
					window.open(routeData.href, '_blank');
				}
			}
			if (a === 2) {
				if (index === 0) {
					let routeData = this.$router.resolve({ path: '/card' });
					window.open(routeData.href, '_blank');
					// this.$router.push({path:'/card'})
				}
			}
		},
		handleCurrentChange(val) {
			this.currentPage1 = val;
		},
		goLogin() {
			this.refresh = false;
			this.$store.commit('app/getLoginBox', true);
			this.$store.commit('app/setLoginOrReg', true);
		},
		pageSearch(page) {
			if (page >= 1 && page <= 5) {
				this.currentPage = page - 1;
			} else if (page < 0) {
				this.currentPage = 0;
			} else if (page > 5) {
				this.currentPage = 4;
			}
		},
		getPageData(val) {
			let param = {
				PageNumber: val + 1
			};
			this.$store.dispatch('activity/getUserRankInfo', param);
		},
		getData() {
			this.$store.dispatch('activity/getUserBoxInfo');
			this.$store.dispatch('activity/getUserRankInfo', { PageNumber: 1 });
			this.$store.dispatch('activity/getBoxStatusInfo');
		},
		openBox(index, score) {
			if (this.boxStatusInfo.Active < score) {
				this.$store.commit('app/getFrame', true);
				this.$store.commit('app/getFrameMsg', '活跃度不足');
				this.$store.commit('app/getFrameState', 0);
			} else {
				let params = {
					Id: index + 1
				};
				return new Promise((resolev, reject) => {
					openBox(params)
						.then(res => {
							let params = res.Data;
							this.$store.commit(
								'activity/setThirdMallPop',
								true
							);
							this.$store.commit(
								'activity/setOpenBoxInfo',
								params
							);
							resolve();
						})
						.catch(error => {
							reject(error);
						});
				});
			}
		}
	},
	//监听属性 类似于data概念
	computed: {
		userInfo() {
			return this.$store.state.user.userInfo;
		},
		thirdMallPop() {
			return this.$store.state.activity.thirdPopMallShow;
		},
		userBoxInfo() {
			return this.$store.state.activity.userBoxInfo;
		},
		userRankInfo() {
			return this.$store.state.activity.userRankInfo;
		},
		boxStatusInfo() {
			return this.$store.state.activity.boxStatusData;
		}
	},
	//监控data中的数据变化
	watch: {
		currentPage(val) {
			this.getPageData(val);
		},
		userInfo: {
			handler(newVal, oldVal) {
				if (newVal) {
					if (
						!sessionStorage.getItem('refresh') &&
						this.refresh === false
					) {
						this.getData();
					}
				}
			}
		}
	},

	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.getData();
		window.οnbefοreunlοad = function() {
			this.refresh = true;
			sessionStorage.setItem('refresh', this.refresh);
		};
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {},
	beforeDestroy() {
		sessionStorage.removeItem('refresh');
	}
};
</script>
<style lang='scss' scoped>
.gameTasks {
	width: 100%;
	height: 3380px;
	overflow: hidden;
	position: relative;
	font-family: MicrosoftYaHei;
	font-weight: 400;
	.allcontent {
		box-sizing: border-box;
		width: 1920px;
		height: 3380px;
		background: url('../../../assets/image/bg4.jpg') no-repeat;
		position: absolute;
		left: 50%;
		margin-left: -960px;
		.headerPic {
			position: absolute;
			top: 71px;
			left: 1026px;
			.hudie {
				width: 40px;
				height: 32px;
				animation: firstdiv 1.5s linear 1.5s infinite alternate;
			}
			@keyframes firstdiv {
				to {
					margin-top: 10px;
				}
				from {
					margin-top: -10px;
				}
			}
		}
		.limitTime {
			height: 20px;
			font-size: 20px;
			color: rgba(248, 248, 248, 1);
			position: absolute;
			left: 533px;
			top: 287px;
		}
		.fontcontent {
			position: relative;
			top: 513px;
			.complete {
				width: 407px;
				height: 26px;
				background: rgba(23, 140, 100, 1);
				border-radius: 13px;
				text-align: center;
				line-height: 26px;
				font-size: 12px;
				margin: 0 auto;
				color: rgba(169, 248, 221, 1);
				em {
					color: #fee173;
				}
			}
			.luck_turn_user {
				font-size: 16px;
				height: 16px;
				color: rgba(169, 248, 221, 1);
				margin-left: 480px;
				em {
					color: #fee173;
					cursor: pointer;
				}
			}
		}
		.picList {
			position: absolute;
			left: 530px;
			top: 635px;
			box-sizing: border-box;
			ul {
				font-size: 12px;
				color: rgba(255, 255, 255, 1);
				li {
					float: left;
					text-align: center;
					.licontent {
						width: 120px;
						height: 180px;
						background: rgba(23, 134, 92, 1);
						border-radius: 10px;
						padding-top: 14px;
						margin-right: 30px;
						img {
							width: 101px;
							height: 99px;
							margin-top: 30px;
						}
						.p1 {
							height: 11px;
						}
						.p2 {
							width: 120px;
							height: 30px;
							background: rgba(5, 69, 41, 1);
							border-radius: 10px;
							color: rgba(70, 189, 144, 1);
							line-height: 30px;
							margin-top: 7px;
						}
					}
					.p3 {
						width: 112px;
						height: 24px;
						background: rgba(70, 189, 144, 1);
						border-radius: 12px;
						font-size: 11px;
						color: rgba(5, 69, 41, 1);
						line-height: 24px;
						margin-top: 16px;
						margin-left: 5px;
						&.nocomplete {
							background: rgba(254, 225, 115, 1);
							span {
								color: #f32a02;
								em {
									color: rgba(5, 69, 41, 1);
								}
							}
						}
						&.ccc {
							background: rgba(254, 225, 115, 1);
						}
						.goNow {
							display: block;
							width: 112px;
							height: 24px;
							background: rgba(253, 203, 54, 1);
							text-align: center;
							line-height: 24px;
							font-size: 12px;
							font-family: MicrosoftYaHei;
							font-weight: 400;
							cursor: pointer;
							color: rgba(252, 75, 5, 1);
							border-radius: 12px;
						}
					}
				}
			}
		}
		.picList2 {
			position: absolute;
			left: 690px;
			top: 986px;
			box-sizing: border-box;
			ul {
				font-size: 12px;
				color: rgba(255, 255, 255, 1);
				li {
					float: left;
					text-align: center;
					.licontent {
						width: 120px;
						height: 180px;
						background: rgba(23, 134, 92, 1);
						border-radius: 10px;
						padding-top: 14px;
						margin-right: 100px;
						img {
							width: 101px;
							height: 99px;
							margin-top: 30px;
						}
						.p1 {
							height: 11px;
						}
						.p2 {
							width: 120px;
							height: 30px;
							background: rgba(5, 69, 41, 1);
							border-radius: 10px;
							color: rgba(70, 189, 144, 1);
							line-height: 30px;
							margin-top: 7px;
						}
					}
					.p3 {
						width: 112px;
						height: 24px;
						background: rgba(70, 189, 144, 1);
						border-radius: 12px;
						font-size: 11px;
						color: rgba(5, 69, 41, 1);
						line-height: 24px;
						margin-top: 16px;
						margin-left: 5px;
						&.nocomplete {
							background: rgba(254, 225, 115, 1);
							span {
								color: #f32a02;
								em {
									color: rgba(5, 69, 41, 1);
								}
							}
						}
						&.ccc {
							background: rgba(254, 225, 115, 1);
						}
						.goNow {
							display: block;
							width: 112px;
							height: 24px;
							background: rgba(253, 203, 54, 1);
							text-align: center;
							line-height: 24px;
							font-size: 12px;
							font-family: MicrosoftYaHei;
							font-weight: 400;
							cursor: pointer;
							color: rgba(252, 75, 5, 1);
							border-radius: 12px;
						}
					}
				}
			}
		}
		.picList3 {
			position: absolute;
			left: 567px;
			top: 1330px;
			box-sizing: border-box;
			ul {
				font-size: 12px;
				color: rgba(255, 255, 255, 1);
				li {
					float: left;
					text-align: center;
					.licontent {
						width: 120px;
						height: 180px;
						background: rgba(23, 134, 92, 1);
						border-radius: 10px;
						padding-top: 14px;
						margin-right: 100px;
						img {
							width: 101px;
							height: 99px;
							margin-top: 20px;
							&.pic1 {
								margin-top: 36px;
							}
						}
						div {
							.p1 {
								height: 20px;
							}
						}
						.p2 {
							width: 120px;
							height: 30px;
							background: rgba(5, 69, 41, 1);
							border-radius: 10px;
							color: rgba(70, 189, 144, 1);
							line-height: 30px;
							margin-top: -7px;
						}
					}
					.p3 {
						width: 112px;
						height: 24px;
						background: rgba(70, 189, 144, 1);
						border-radius: 12px;
						font-size: 11px;
						color: rgba(5, 69, 41, 1);
						line-height: 24px;
						margin-top: 16px;
						margin-left: 5px;
						&.nocomplete {
							background: rgba(254, 225, 115, 1);
							span {
								color: #f32a02;
								em {
									color: rgba(5, 69, 41, 1);
								}
							}
						}
						&.ccc {
							background: rgba(254, 225, 115, 1);
						}
					}
				}
			}
		}
		.picList4 {
			position: absolute;
			left: 520px;
			top: 1850px;
			.livefont {
				position: relative;
				left: 10px;
				top: -50px;
				z-index: 99;
			}
			.bgpic {
				width: 578px;
				height: 22px;
				position: absolute;
				top: 0;
				left: 135px;
				background: url('../../../assets/image/processbg.png') center
					right no-repeat;
				.bgpic1 {
					background: url('../../../assets/image/live1000.png') center
						right no-repeat;
					height: 22px;
					display: inline-block;
					position: absolute;
					left: 0;
				}
			}

			box-sizing: border-box;
			ul {
				position: relative;
				left: 110px;
				top: -190px;
				li {
					float: left;
					text-align: center;
					margin-left: 107px;
					.hammer {
						width: 70px;
						height: 43px;
						margin-left: 30px;
						position: absolute;
						top: -35px;
						animation: twodiv 0.2s linear 0.2s infinite alternate;
					}
					@keyframes twodiv {
						to {
							transform-origin: 100% 100%;
							transform: rotateZ(45deg);
						}
						from {
							transform-origin: 100% 100%;
							transform: rotateZ(0deg);
						}
					}
					img {
						width: 129px;
						height: 125px;
						background-size: 100% 100%;
						cursor: pointer;
						&.opened {
							width: 160px;
							height: 151px;
							margin-left: -31px;
							margin-top: -26px;
							// margin-bottom: 5px;
						}
					}
					p {
						width: 83px;
						font-size: 16px;
						height: 24px;
						background: rgba(251, 206, 46, 1);
						border-radius: 10px;
						color: rgba(161, 87, 21, 1);
						text-align: center;
						line-height: 24px;
						margin-left: 23px;
						&.opened1 {
							margin-left: -8px;
						}
					}
				}
			}
		}
		.listFont {
			position: absolute;
			top: 1835px;
			left: 565px;
			height: 31px;
			font-size: 14px;
			box-sizing: border-box;
			word-break: break-all;
			color: rgba(255, 255, 255, 1);
			z-index: 10000;
			word-wrap: break-word;
			text-align: center;
		}
		.refresh {
			position: absolute;
			top: 1719px;
			left: 747px;
			width: 407px;
			height: 26px;
			background: rgba(23, 140, 100, 1);
			border-radius: 13px;
			font-size: 12px;
			color: rgba(169, 248, 221, 1);
			line-height: 26px;
			text-align: center;
			em {
				color: #fee173;
			}
		}
		.tableContent {
			position: absolute;
			top: 2205px;
			left: 635px;
			.tableTitle {
				width: 407px;
				height: 26px;
				background: rgba(23, 140, 100, 1);
				border-radius: 13px;
				font-size: 12px;
				line-height: 26px;
				text-align: center;
				position: absolute;
				color: rgba(169, 248, 221, 1);
				left: 113px;
				top: -86px;
				em {
					color: #fee173;
				}
			}
			.tableTop {
				// width: 798px;
				box-sizing: border-box;
				height: 12px;
				text-align: left;
				line-height: 12px;
				font-size: 14px;
				color: rgba(190, 237, 205, 1);
				margin-bottom: 13px;
				box-sizing: border-box;
				span {
					display: inline-block;
					// width: 33%;
					margin-right: 115px;
				}
			}
			table {
				width: 656px;
				thead {
					background: rgba(5, 69, 41, 1);
					tr {
						font-size: 12px;
						color: rgba(255, 255, 255, 1);
						text-align: center;
						td {
							height: 59px;
						}
					}
				}
				tbody {
					background: #beedcd;
					padding: 0 22px 30px 22px;
					width: 613px;
					box-sizing: border-box;
					tr {
						text-align: center;
						font-size: 12px;
						color: rgba(5, 69, 41, 1);
						td {
							width: 259px;
							height: 46px;
							border-bottom: 1px solid #a2d4b5;
						}
						td:nth-last-child(1) {
							color: rgba(207, 7, 7, 1);
						}
						&.last {
							td {
								height: 29px;
							}
						}
					}
				}
			}
			.page {
				position: absolute;
				left: 67px;
				text-align: center;
				margin-top: 32px;
				cursor: pointer;
				p,
				.content {
					display: inline-block;
					text-align: center;
				}
				.content {
					margin-left: 73px;
					margin-right: 73px;
					p {
						width: 24px;
						height: 24px;
						font-size: 12px;
						color: rgba(127, 254, 206, 1);
						&.active {
							background: rgba(70, 189, 144, 1);
						}
						line-height: 24px;
						margin-left: 20px;
					}
					p:nth-child(1) {
						margin-left: 0;
					}
				}
				.prev,
				.next {
					width: 72px;
					height: 29px;
					background: rgba(11, 88, 58, 1);
					border: 1px solid rgba(70, 189, 144, 1);
					line-height: 29px;
					font-size: 12px;
					color: rgba(70, 189, 144, 1);
					&.show {
						background: rgba(70, 189, 144, 1);
						color: rgba(127, 254, 206, 1);
					}
				}
			}
		}
		.bottom-rule {
			width: 826px;
			height: 141px;
			font-size: 12px;
			position: absolute;
			bottom: 162px;
			left: 492px;
			ul {
				color: rgba(70, 189, 144, 1);
				li {
					line-height: 26px;
				}
			}
		}
	}
}
</style>