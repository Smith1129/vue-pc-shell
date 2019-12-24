<!-- rule -->
<template>
	<div class="rule">
		<div class="rule_title">玩法规则</div>
		<div class="rule_list">
			<p v-for="(item,index) in List" :key="index">
				<i>{{index+1}}</i>
				{{item}}
			</p>
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
			List: [
				'每兑换一个特权道具（限定头像、专属头像框等）都可赠送一次摇奖机会；',
				'摇奖可随机获得神秘奖品和各种碎片，碎片可以自由选择合成指定道具；',
				'奖品仅限本人使用，禁止交易，如因私下交易造成损失，由获奖者自行承担；',
				'本活动最终解释权归跳跳猪所有。'
			]
		};
	},
	//方法集合
	methods: {},
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
.rule {
	width: 100%;
	margin-top: 40px;
	.rule_title {
		text-align: center;
		color: #fee144;
		font-size: 30px;
		line-height: 60px;
	}
	.rule_list {
		margin-top: 40px;
		margin-left: 70px;
		p {
			font-size: 16px;
			line-height: 16px;
			color: #f590e0;
			margin-bottom: 15px;
			i {
				width: 19px;
				height: 19px;
				text-align: center;
				line-height: 19px;
				border-radius: 50%;
				background: #c103d8;
				margin-right: 10px;
				color: #f9cd48;
				display: inline-block;
				box-shadow: inset 1px -1px 1px 0px #F590E0;
			}
		}
	}
}
</style>