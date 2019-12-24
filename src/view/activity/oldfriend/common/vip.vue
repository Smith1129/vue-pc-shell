<!-- vip -->
<template>
	<div class="vip">
		<ul>
			<li
				class="vip_list"
				v-for="(item,index) in vipList"
				:key="index"
				@mouseenter="handleShadow(index)"
			>
				<div class="shadowbox">
					<transition name="fade">
						<span class="vip_shadow" v-show="shadowIndex==index" @click="goRouter">
							<i></i>
						</span>
					</transition>
				</div>
				<span class="vip_tips">{{item.more}}</span>
				<span class="vip_jiao" v-show="shadowIndex==index"></span>
			</li>
		</ul>
		<div class="vip_quanyi">
			<span v-if="vipList[shadowIndex].list.secert">
				<h3>神秘特技</h3>
				<h5>{{vipList[shadowIndex].list.secert}}</h5>
			</span>
			<span v-else-if="vipList[shadowIndex].list.disDraw">
				<h3>抽奖折扣</h3>
				<h5>{{vipList[shadowIndex].list.disDraw}}</h5>
			</span>
			<span>
				<h3>每日摇奖次数</h3>
				<h5>{{vipList[shadowIndex].list.dayDraw}}</h5>
			</span>
			<span>
				<h3>额外试玩加成</h3>
				<h5>{{vipList[shadowIndex].list.moreGame}}</h5>
			</span>
			<span>
				<h3>开卡奖励</h3>
				<h5>{{vipList[shadowIndex].list.openAward}}</h5>
			</span>
			<span>
				<h3>每日工资</h3>
				<h5>{{vipList[shadowIndex].list.daySalary}}</h5>
			</span>
			<span>
				<router-link tag="a" to="/vip" target="_blank">查看更多</router-link>
			</span>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			shadowIndex: 3,
			vipList: [
				{
					name: 'vip_jin',
					more: '额外赠送20万银猪',
					list: {
						secert: null,
						dayDraw: '幸运摇奖2次，欧皇摇奖4次',
						moreGame: '10%',
						openAward: '900万',
						daySalary: '1000金猪',
						disDraw: '无'
					}
				},
				{
					name: 'vip_qilin',
					more: '额外赠送80万银猪',
					list: {
						secert: null,
						dayDraw: '幸运摇奖5次，欧皇摇奖6次',
						moreGame: '15%',
						openAward: '2700万',
						daySalary: '20000金猪',
						disDraw: '享9.9折'
					}
				},
				{
					name: 'vip_shen',
					more: '额外赠送150万银猪',
					list: {
						secert: null,
						dayDraw: '幸运摇奖8次，欧皇摇奖8次',
						moreGame: '20%',
						openAward: '5300万',
						daySalary: '60000金猪',
						disDraw: '享9.8折'
					}
				},
				{
					name: 'vip_long',
					more: '额外赠送350万银猪',
					list: {
						secert: null,
						dayDraw: '幸运摇奖10次，欧皇摇奖10次',
						moreGame: '30%',
						openAward: '1.5亿',
						daySalary: '50000金猪',
						disDraw: '享9.7折'
					}
				},
				/* {
					name: 'vip_xuanwu',
					more: '额外赠送600万银猪',
					list: {
						secert: '昨日亏损则获得昨日亏损额的50%',
						dayDraw: '幸运摇奖12次，欧皇摇奖10次',
						moreGame: '30%',
						openAward: '2亿',
						daySalary: '300000金猪',
						disDraw: '享9.7折'
					}
				} */
			]
		};
	},
	//方法集合
	methods: {
		handleShadow(index) {
			this.shadowIndex = index;
		},
		goRouter(){
			let routeData = this.$router.resolve({ path: '/vip' });
			window.open(routeData.href, '_blank');
		}
	},
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
.vip {
	width: 100%;
	margin-top: 286px;
	margin-bottom: 31px;
	ul {
		width: 100%;
		overflow: hidden;
		li {
			color: #feefbc;
			font-size: 18px;
			float: left;
			margin-right: 45px;
			&:first-child {
				margin-left: 28px;
			}
			&:nth-child(3) {
				margin-left: 1px;
			}
			&:last-child {
				margin-right: 0;
			}
			.shadowbox {
				width: 251px;
				height: 182px;
				.vip_shadow {
					display: block;
					width: 100%;
					height: 100%;
					background: rgba(000, 000, 000, 0.7);
					border-radius: 8px;
					position: relative;
					i {
						width: 150px;
						height: 41px;
						display: block;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						cursor: pointer;
						background: url('../../../../assets/image/oldfspirit.png')
							no-repeat -71px -87px;
					}
				}
			}

			.vip_tips {
				text-align: center;
				display: block;
				width: 221px;
				height: 30px;
				line-height: 30px;
				margin: 14px auto 0;
			}
			.vip_jiao {
				width: 76px;
				height: 50px;
				background: rgba(255, 246, 233, 1);
				transform: rotate(45deg);
				display: block;
				margin-left: 95px;
				margin-top: 25px;
			}
		}
	}
	.vip_quanyi {
		padding: 0 100px;
		span {
			display: inline-block;
			width: 240px;
			margin-right: 135px;
			margin-bottom: 15px;
			&:nth-child(3n + 3) {
				margin-right: 0;
			}
			&:last-child {
				overflow: hidden;
				border-bottom: 1px solid #769bf8;
				width: 73px;
				margin-bottom: 6px;
			}
			h3 {
				color: #f63e05;
				font-size: 19px;
				font-weight: 500;
				line-height: 30px;
			}
			h5 {
				color: #b14f0d;
				font-size: 15px;
				font-weight: 500;
				line-height: 26px;
			}
			a {
				color: #769bf8;
				font-size: 18px;
				margin-bottom: 8px;
				display: block;
				&:hover {
					text-decoration: none;
				}
			}
		}
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
	}
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
}
</style>