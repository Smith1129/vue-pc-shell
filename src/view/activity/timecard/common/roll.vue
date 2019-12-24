<!-- roll -->
<template>
	<div class="roll">
		<div class="roll_title">近期中奖</div>
		<div class="roll_list">
			<vue-seamless-scroll
				:data="prizelist"
				:class-option="optionTop"
				id="warp"
				class="seamless-warp2"
			>
				<ul>
					<li v-for="(item,index) in prizelist" :key="index">
						<img :src="item.AvatarPath" />
						<div>
							<p class="prizeName">{{item.Nickname|star}}</p>
							<p class="prizePlay">抢到{{item.GoodsName}}</p>
						</div>
					</li>
				</ul>
			</vue-seamless-scroll>
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
			rollData: []
		};
	},
	//方法集合
	methods: {},
	//监听属性 类似于data概念
	computed: {
		prizelist() {
			return this.$store.state.happydraw.actStatus.GetAwardList || [];
		},
		optionTop() {
			return {
				step: 0.5,
				limitMoveNum: this.mallId == 1 ? 6 : 10,
				openTouch: false,
				direction: 1,
				openWatch: true
			};
		}
	},
	//监控data中的数据变化
	watch: {},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
	}
};
</script>
<style lang='scss' scoped>
.roll {
	width: 247px;
	.roll_title {
		font-size: 14px;
		color: #ff6600;
		text-align: center;
		height: 79px;
		line-height: 110px;
	}
	.roll_list {
		width: 208px;
		margin: 0 auto;
		height: 438px;
		overflow: hidden;
		border-radius: 0 0 30px 30px;
		ul {
			width: 100%;
			li {
				width: 100%;
				height: 54px;
				line-height: 54px;
				img {
					width: 38px;
					height: 38px;
					vertical-align: middle;
					float: left;
					margin-top: 5px;
					margin-left: 15px;
					border-radius: 50%;
				}
				div {
					float: left;
					margin-left: 11px;
					margin-top: 10px;
					width: 144px;
				}
				p {
					font-size: 13px;
					height: 13px;
					line-height: 13px;
				}
				.prizeName {
					color: #5b5d65;
					margin-bottom: 6px;
				}
				.prizePlay {
					color: #FF6600;
					width: 209px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			li:nth-child(odd) {
				background: #f5f6fa;
			}
			li:nth-child(even) {
				background: #fff;
			}
		}
	}
}
</style>