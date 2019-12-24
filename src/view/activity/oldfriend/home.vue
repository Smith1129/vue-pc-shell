<!-- home -->
<template>
	<div class="oldFriend">
		<div class="oldFriend_box">
			<!-- 红包 -->
			<div class="oldFriend_pack oldFriend_cls">
				<pack></pack>
			</div>
			<!-- VIP -->
			<div class="oldFriend_vip oldFriend_cls">
				<vip></vip>
			</div>
			<!-- 宝箱 -->
			<div class="oldFriend_draw oldFriend_cls">
				<draw v-if="oldFriendData.Third"></draw>
			</div>
			<!-- 拼图 -->
			<div class="oldFriend_puzzle oldFriend_cls">
				<puzzle  v-if="oldFriendData.Forth"></puzzle>
			</div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import pack from './common/pack';
import vip from './common/vip';
import draw from './common/draw';
import puzzle from './common/puzzle';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: { pack, vip, draw, puzzle },
	data() {
		//这里存放数据
		return {};
	},
	//方法集合
	methods: {
		getData(){
			this.$store.dispatch('activity/getOldFriendData')
		}
	},
	//监听属性 类似于data概念
	computed: {
		oldFriendData(){
			// console.log(this.$store.state.activity.oldFriendData)
			return this.$store.state.activity.oldFriendData
		}
	},
	//监控data中的数据变化
	watch: {},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.getData()
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
.oldFriend {
	position: relative;
	width: 100%;
	min-height: 3534px;
	overflow: hidden;
	.oldFriend_box {
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -960px;
		width: 1920px;
		height: 100%;
		background: url('../../../assets/image/oldfbg.jpg') no-repeat;
		.oldFriend_pack{
			min-height: 1142px;
		}
		.oldFriend_vip{
			min-height: 760px;
		}
		.oldFriend_draw{
			min-height: 653px;
		}
		.oldFriend_puzzle{
			min-height: 775px;
		}
		.oldFriend_cls {
			overflow: hidden;
			width: 1200px;
			margin: 0 auto;
		}
	}
}
</style>