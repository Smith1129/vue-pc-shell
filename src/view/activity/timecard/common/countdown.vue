<!-- time -->
<template>
	<div class="countdown">
		<div class="countdown_time" v-show="tast_countDown">
			<span>{{tast_countDown.hour1||0}}</span>
			<span>{{tast_countDown.hour2||0}}</span>
			<span>{{tast_countDown.min1||0}}</span>
			<span>{{tast_countDown.min2||0}}</span>
			<span>{{tast_countDown.sec1||0}}</span>
			<span>{{tast_countDown.sec2||0}}</span>
		</div>
		<div class="countdown_tips">(每天10:00&nbsp;&nbsp;20:00)</div>
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
			tast_countDown: {},
			timer: null
		};
	},
	//方法集合
	methods: {
		countDown() {
			let isCount = new Date(this.actStatus.NextTime);
			let nowTime = Math.round(new Date() / 1000);
			let endTime = isCount;
			let t = endTime.getTime() - nowTime;
			var hour = Math.floor((t / 60 / 60) % 24);
			var min = Math.floor((t / 60) % 60);
			var sec = Math.floor(t % 60);
			if (hour < 10) {
				hour = '0' + hour;
			}
			if (min < 10) {
				min = '0' + min;
			}
			if (sec < 10) {
				sec = '0' + sec;
			}
			var isHour = hour.toString().split('');
			var isMin = min.toString().split('');
			var isSec = sec.toString().split('');
			this.tast_countDown = {
				hour1: isHour[0],
				hour2: isHour[1],
				min1: isMin[0],
				min2: isMin[1],
				sec1: isSec[0],
				sec2: isSec[1]
			};
			if(t < 0 ){
				this.$store.dispatch('happydraw/getActStatus')
			}
			this.timer = setTimeout(this.countDown, 1000);
		}
	},
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
	mounted() {
		setTimeout(this.countDown, 1000);
	},
	destroyed() {
		window.clearTimeout(this.timer);
	}
};
</script>
<style lang='scss' scoped>
.countdown {
	width: 812px;
	height: 240px;
	margin: 0 auto;
	.countdown_time {
		width: 100%;
		margin-top: 220px;
		padding: 0 100px;
		box-sizing: border-box;
		font-size: 0;
		span {
			width: 83px;
			height: 98px;
			background: rgba(95, 22, 174, 1);
			border-radius: 5px;
			display: inline-block;
			color: #ffffff;
			font-size: 59px;
			line-height: 98px;
			text-align: center;
			margin-right: 13px;
			&:last-child {
				margin-right: 0px !important;
			}
			&:nth-child(2n + 2) {
				margin-right: 37px;
			}
		}
	}
	.countdown_tips {
		color: #333333;
		font-size: 16px;
		text-align: center;
		margin-top: 16px;
	}
}
</style>