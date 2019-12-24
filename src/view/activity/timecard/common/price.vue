<!-- price -->
<template>
	<div class="price">
		<p class="price_title">本场奖品展示：</p>
		<ul>
			<li v-for="(item,index) in actStatus.Award" :key="index">
				<span :class="`active${index}`"></span>
				<p>{{item.Limit}}张</p>
			</li>
		</ul>
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
		return {};
	},
	//方法集合
	methods: {},
	//监听属性 类似于data概念
	computed: {
		actStatus() {
			return this.$store.state.happydraw.actStatus || [];
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
.price {
	width: 572px;
	margin: 0 auto;
	.price_title {
		color: #ebf0f5;
		font-size: 18px;
		line-height: 36px;
		text-align: center;
	}
	ul {
		overflow: hidden;
		margin-top: 30px;
		li {
			float: left;
			margin-right: 60px;
			&:first-child {
				margin-left: 55px;
			}
			&:last-child {
				margin-right: 0;
			}
			span {
				display: block;
				width: 104px;
				height: 64px;
				background: url('../../../../assets/image/timesprite.png')
					no-repeat;
				&.active0 {
					background-position: -8px -14px;
				}
				&.active1 {
					background-position: -190px -14px;
				}
				&.active2 {
					background-position: -368px -14px;
				}
			}
			p {
				width: 100px;
				height: 24px;
				line-height: 24px;
				color: #fff;
				font-size: 14px;
				border-radius: 20px;
				text-align: center;
				margin: 15px auto 0;
				background: linear-gradient(
					to right,
					#4f1366,
					#431c81
				); /* 标准的语法 */
			}
		}
	}
}
</style>