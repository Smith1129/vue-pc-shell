<!-- oldfriend -->
<template>
	<div class="oldfriend">
		<head-nav></head-nav>
        <home></home>
		<frame v-if="oldPop"></frame>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import headNav from '../../activity/common/nav';
import frame from './common/frame';
import home from './home'
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {
        headNav,
		home,
		frame
	},
	data() {
		//这里存放数据
		return {};
	},
	//方法集合
	methods: {
		
	},
	//监听属性 类似于data概念
	computed: {
		oldPop(){
			return this.$store.state.happydraw.oldPop
		}
	},
	//监控data中的数据变化
	watch: {},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
	
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
</style>