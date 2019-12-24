<!-- bag -->
<template>
	<div class="bag">
		<div class="bag_title">
			<i></i>我的背包
		</div>
		<div class="bag_list">
			<ul>
				<li>
					<p>{{drawChipsInfo.LuckChips>99?'99+':drawChipsInfo.LuckChips||0}}</p>
				</li>
				<li>
					<p>{{drawChipsInfo.FreecaChips>99?'99+':drawChipsInfo.FreecaChips||0}}</p>
				</li>
				<li>
					<p>{{drawChipsInfo.Salt>99?'99+':drawChipsInfo.Salt||0}}</p>
				</li>
				<li>
					<p>{{drawChipsInfo.AnimalChips>99?'99+':drawChipsInfo.AnimalChips||0}}</p>
				</li>
			</ul>
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
		return {};
	},
	//方法集合
	methods: {
		getInfo() {
			this.$store.dispatch('happydraw/getChipsInfo');
		}
	},
	//监听属性 类似于data概念
	computed: {
		drawChipsInfo() {
			return this.$store.state.happydraw.drawChipsInfo;
		},
		userInfo(){
			return this.$store.state.user.userInfo
		}
	},
	//监控data中的数据变化
	watch: {
		userInfo(newVal,oldVal){
			this.getInfo();
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
	}
};
</script>
<style lang='scss' scoped>
.bag {
	width: 100%;
	min-height: 285px;
	.bag_title {
		width: 100%;
		text-align: center;
		color: #fee144;
		font-size: 30px;
		line-height: 57px;
		i {
			display: inline-block;
			background: url('../../../../assets/image/xbg.png') no-repeat;
			width: 56px;
			height: 50px;
			vertical-align: middle;
		}
	}
	.bag_list {
		width: 100%;
		margin-top: 42px;
		ul {
			overflow: hidden;
			width: 785px;
			margin: 0 auto;
			font-size: 0;
			li {
				float: left;
				width: 137px;
				height: 160px;
				margin-right: 74.5px;
				text-align: center;
				p {
					font-size: 16px;
					color: #fff;
					line-height: 29px;
					font-weight: bold;
				}
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
}
</style>