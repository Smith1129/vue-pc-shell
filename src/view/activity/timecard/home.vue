<!-- home -->
<template>
	<div class="home">
		<div class="timecard">
			<div class="timecard_box">
				<countdown></countdown>
				<price></price>
				<draw></draw>
				<div class="banner" @click="goRouter"></div>
			</div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import countdown from './common/countdown';
import price from './common/price';
import draw from './common/draw';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: { countdown, price, draw },
	data() {
		//这里存放数据
		return {};
	},
	//方法集合
	methods: {
		getData() {
			this.$store.dispatch('happydraw/getActStatus');
		},
		goRouter() {
			let routeUrl = this.$router.resolve({
				path: '/noticelist/details',
				query: { id: 18796,CategoryId:29 }
			});
			window.open(routeUrl.href, '_blank');
		}
	},
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.getData();
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
.home {
	position: relative;
	width: 100%;
	min-height: 1798px;
	overflow: hidden;
	.timecard {
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -960px;
		width: 1920px;
		height: 100%;
		background: url('../../../assets/image/timebg.png') no-repeat;
		.timecard_box {
			width: 1200px;
			height: 100%;
			overflow: hidden;
			margin: 0 auto;
			position: relative;
			.banner {
				background: url('../../../assets/image/timebanner.png')
					no-repeat;
				width: 960px;
				height: 120px;
				position: absolute;
				bottom: 145px;
				left: 120px;
				cursor: pointer;
			}
		}
	}
}
</style>