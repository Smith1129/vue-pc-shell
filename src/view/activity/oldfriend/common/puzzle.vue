<!-- puzzle -->
<template>
	<div class="puzzle">
		<p class="puzzle_title">每日登入即可领取一片拼图，活动期间凑满20片，可以开启金猪回归福袋</p>
		<div class="puzzle_left">
			<span
				v-for="(item,index) in puzzleData.List"
				:key="index"
				:style="item==1?{'opacity':'0'}:{}"
				@click="handleClick(index,puzzleData.IsGetChips)"
			></span>
		</div>
		<div class="puzzle_right">
			<div class="puzzle_step">
				累计拼图：
				<em>{{puzzleCount}}/20</em>
			</div>
			<div
				class="puzzle_btn"
				:class="puzzleData.Status?'open_btn':'close_btn'"
				@click="getPuzzleAward(puzzleData.Status)"
			></div>
			<div class="puzzle_todayStep">今日拼图：{{puzzleData.IsGetChips}}/1</div>
			<img src="../../../../assets/image/oldfh.png" alt />
			<p class="puzzle_tips">
				点击您想要开启的拼图区域，即可完成拼图
				开启福袋可获得10000~30000金猪
			</p>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getPuzzleAward, gashPuzzle } from '@/api/http';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			// puzzleIndex: -1,
		};
	},
	//方法集合
	methods: {
		getPuzzleAward(status) {
			if (status) {
				return new Promise((resolve, reject) => {
					getPuzzleAward()
						.then(res => {
							if (res.Code === 200) {
								this.$store.dispatch(
									'activity/getOldFriendData'
								);
								this.$store.commit('happydraw/setOldPop', true);
								this.$store.commit(
									'happydraw/setOldPopStatus',
									5
								);
								// this.$store.commit('happydraw/setOldPopMsgInfo',`${res.Data.Award}`)
							} else {
								this.$store.commit(
									'happydraw/setOldPopMsgInfo',
									`${res.Msg}`
								);
								this.$store.commit('happydraw/setOldPop', true);
								this.$store.commit(
									'happydraw/setOldPopStatus',
									4
								);
							}
							resolve();
						})
						.catch(error => {
							reject(error);
						});
				});
			} else {
				return;
			}
		},
		handleClick(index, status) {
			console.log(this.userToken, 'dd');
			if (this.userToken) {
				if (status === 0) {
					let payload = {
						Xyz: index
					};
					return new Promise((resolve, reject) => {
						gashPuzzle(payload)
							.then(res => {
								if (res.Code === 200) {
									// this.$store.dispatch('activity/getOldFriendData')
									this.$store.commit(
										'happydraw/setOldPop',
										true
									);
									this.$store.commit(
										'happydraw/setOldPopStatus',
										4
									);
									this.$store.commit(
										'happydraw/setOldPopMsgInfo',
										`拼图领取成功`
									);
									this.$store.dispatch(
										'activity/getOldFriendData'
									);
								} else {
									this.$store.commit(
										'happydraw/setOldPopMsgInfo',
										`${res.Msg}`
									);
									this.$store.commit(
										'happydraw/setOldPop',
										true
									);
									this.$store.commit(
										'happydraw/setOldPopStatus',
										4
									);
								}
								resolve();
							})
							.catch(error => {
								reject(error);
							});
					});
				} else {
					this.$store.commit(
						'happydraw/setOldPopMsgInfo',
						`今日已领取拼图!!`
					);
					this.$store.commit('happydraw/setOldPop', true);
					this.$store.commit('happydraw/setOldPopStatus', 4);
				}
			} else {
				this.$store.commit(
					'happydraw/setOldPopMsgInfo',
					`您未登录，请登录!!`
				);
				this.$store.commit('happydraw/setOldPop', true);
				this.$store.commit('happydraw/setOldPopStatus', 6);
			}

			// this.puzzleList.splice(index, 1, 1);
			// console.log(this.puzzleList);
		}
	},
	//监听属性 类似于data概念
	computed: {
		userToken() {
			return this.$store.state.user.userToken;
		},
		puzzleData() {
			return this.$store.state.activity.oldFriendData.Forth.Chips;
		},
		puzzleCount() {
			let arr = this.puzzleData.List;
			let count = 0;
			for (let i = 0; i <= arr.length; i++) {
				if (arr[i] === 1) {
					count++;
				}
			}
			return count;
			// this.puzzleData
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
.puzzle {
	margin-top: 145px;
	box-sizing: border-box;
	padding: 0 74px;
	.puzzle_title {
		text-align: center;
		color: #f63e05;
		font-size: 16px;
		margin-bottom: 45px;
	}
	.puzzle_left {
		float: left;
		height: 482px;
		width: 604px;
		margin: 44px 0 0 55px;
		background: url('../../../../assets/image/puzzle.png') no-repeat;
		font-size: 0;
		span {
			display: inline-block;
			background: #fce480;
			width: 119px;
			height: 119px;
			margin-right: 2px;
			margin-bottom: 2px;
			cursor: pointer;
			&:nth-child(5n + 5) {
				margin-right: 0;
			}
		}
	}
	.puzzle_right {
		float: right;
		height: 543px;
		width: 292px;
		margin: 21px 15px 0 0;
		.puzzle_step {
			width: 168px;
			height: 31px;
			background: rgba(123, 1, 0, 1);
			border-radius: 16px;
			font-size: 18px;
			line-height: 31px;
			text-align: center;
			color: #fff6e9;
			margin: 60px auto 0;
			em {
				color: #fbe272;
			}
		}
		.puzzle_btn {
			width: 226px;
			height: 66px;
			background: url('../../../../assets/image/oldfspirit.png') no-repeat;
			margin: 22px auto 0;
			cursor: pointer;
			&.open_btn {
				background-position: -64px -170px;
			}
			&.close_btn {
				background-position: -64px -264px;
			}
		}
		.puzzle_todayStep {
			width: 120px;
			font-size: 16px;
			line-height: 17px;
			margin: 39px auto 0;
			color: #fff6e9;
		}
		img {
			margin: 118px 0 10px 10px;
			animation: mymove 0.45s infinite;
		}
		.puzzle_tips {
			color: #f7f687;
			font-size: 14px;
			line-height: 20px;
			margin-left: 10px;
		}
	}
	@keyframes mymove {
		0% {
			margin-left: 10px;
		}
		50% {
			margin-left: 20px;
		}
		100% {
			margin-left: 10px;
		}
	}
}
</style>