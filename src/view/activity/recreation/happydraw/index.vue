<!-- index -->
<template>
	<div class="index">
		<div class="index_box">
			<div class="index_box_all">
				<!-- 抽奖页面信息 -->
				<div class="index_info">
					<info></info>
				</div>
				<!-- 抽奖机 -->
				<div class="index_draw">
					<draw></draw>
				</div>
				<!-- 我的背包 -->
				<div class="index_bag">
					<bag></bag>
				</div>
				<!-- 奖品列表 -->
				<div class="index_prize">
					<prize></prize>
				</div>
				<!-- 规则 -->
				<div class="index_rule">
					<rule></rule>
				</div>
				<!-- 全部道具 -->
				<allprize v-show="allprizeState"></allprize>
				<!-- 公用弹窗组件 -->
				<frame v-show="frameState"></frame>
			</div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import info from './common/info';
import bag from './common/bag';
import prize from './common/prize';
import rule from './common/rule';
import draw from './common/draw';
import allprize from './common/allprize';
import frame from './common/frame';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: { info, bag, prize, rule, draw, frame ,allprize},
	data() {
		//这里存放数据
		return {};
	},
	//方法集合
	methods: {},
	//监听属性 类似于data概念
	computed: {
		allprizeState(){	//全部道具状态
			return this.$store.state.happydraw.allprize
		},
		frameState(){	//公用弹窗状态
			return this.$store.state.happydraw.frameState.state
		},
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
.index {
	position: relative;
	width: 100%;
	min-height: 3756px;
	overflow: hidden;
	.index_box {
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -960px;
		width: 1920px;
		height: 100%;
		background: url('../../../assets/image/happybg.jpg') no-repeat;
		.index_box_all {
			width: 1200px;
			margin: 40px auto;
			height: 100%;
		}
	}
}
</style>