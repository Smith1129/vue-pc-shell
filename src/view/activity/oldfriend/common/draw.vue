<!-- draw -->
<template>
	<div class="draw">
		<p class="draw_tips">
			【温馨提示】：每个用户只能领取一个宝箱，以到达时间的先后来发放奖励。
			<router-link tag="a" to='/noticelist/details?id=18797&CategoryId=29' target="_blank">详见公告</router-link>
		</p>
		<ul>
			<li v-for="(item,index) in drawList" :key="index">
				<!-- <div :class="`${isType}${index}`" class="draw_box"></div> -->
				<div :class="boxData.List[index]===1&&boxData.Get===0?`open${index}`:`close${index}`" class="draw_box" @click="getAward(boxData.Get,boxData.List[index])">
					<span class="canget" :class="index===1?'mid':''" v-if="boxData.List[index]===1&&boxData.Get===1"></span>
				</div>
				<p :class="`${isType}Tips${index}`" >
					单期盈利大于
					<em>{{item.tips}}银猪</em>
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getBoxFoodAward } from '@/api/http'
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			drawList: [{ tips: '1000万' }, { tips: '1亿' }, { tips: '5000万' }],
			isType: 'close'
		};
	},
	//方法集合
	methods: {
		getAward(getStatus,boxStatus){
			if(getStatus===1&&boxStatus===1)
			{
				return new Promise((resolve,reject) => {
					getBoxFoodAward().then((res)=>{
						if(res.Code === 200){
							this.$store.dispatch('activity/getOldFriendData')
							this.$store.commit('happydraw/setOldPop',true)
							this.$store.commit('happydraw/setOldPopStatus',2)
							this.$store.commit('happydraw/setOldPopMsgInfo',`${res.Data.Award}`)
						}else{
							this.$store.commit('happydraw/setOldPopMsgInfo',`${res.Msg}`)
							this.$store.commit('happydraw/setOldPop',true)
							this.$store.commit('happydraw/setOldPopStatus',4)
						}
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			}
		}
	},
	//监听属性 类似于data概念
	computed: {
		boxData(){
			// console.log(this.$store.state.activity.oldFriendData)
			return this.$store.state.activity.oldFriendData.Third.LuckAwardList;
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
.draw {
	margin-top: 134px;
	height: 519px;
	position: relative;
	.draw_tips{
		position: absolute;
		left:50%;
		transform: translateX(-50%);
		top:20px;
		color: #F63E05;
		font-size: 16px;
		width: 800px;
		text-align: center;
		z-index: 9;
		a{
			color: #769bf8;
		}
	}
	ul {
		width: 100%;
		height: 100%;
		overflow: hidden;
		li {
			float: left;
			width: 330px;
			margin-left: 58px;
			margin-top: -20px;
			position: relative;
			height: 290px;
			&:nth-child(2) {
				width: 389px;
				margin-left: 20px;
				margin-top: -20px;
				height: 380px;
				p{
					bottom: -90px;
				}
			}
			&:nth-child(3) {
				margin-left: 17px;
			}
			div {
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				background: url('../../../../assets/image/oldfspirit.png')
					no-repeat;
					cursor: pointer;
				&.close0 {
					width: 203px;
					height: 167px;
					background-position: -531px -26px;
				}
				&.close1 {
					width: 240px;
					height: 198px;
					background-position: -1068px -29px;
				}
				&.close2 {
					width: 202px;
					height: 168px;
					background-position: -816px -26px;
				}
				&.open0 {
					width: 330px;
					height: 286px;
					background-position: -12px -357px;
				}
				&.open1 {
					width: 389px;
					height: 338px;
					background-position: -734px -344px;
				}
				&.open2 {
					width: 330px;
					height: 287px;
					background-position: -382px -370px;
				}
				.canget{
					position: absolute;
					display: inline-block;
					width: 48px;
					height: 48px;
					left: 28px;
					top: 83px;
					transform: rotate(170deg);
					animation: mymove 0.45s infinite;
					background: url('../../../../assets/image/ohyj.png') no-repeat -507px -571px;
					@keyframes mymove {
						0% {
							top: 83px;
							left: 30px;
						}
						50%{
							top: 95px;
							left: 20px;
						}
						100% {
							top: 83px;
							left: 30px;
						}
					}
					&.mid{
						left: 39px;
						top: 107px;
						animation: mymove1 0.45s infinite;
						@keyframes mymove1 {
							0% {
								left: 39px;
								top: 107px;
							}
							50%{
								top: 119px;
								left: 29px;
							}
							100% {
								left: 39px;
								top: 107px;
							}
						}
					}
				}
			}
			p{
				width: 100%;
				position: absolute;
				bottom: -70px;
				left:50%;
				transform: translateX(-50%);
				color: #B14F0D;
				font-size: 16px;
				text-align: center;
				line-height: 16px;
				em{
					color: #F63E05;
					font-size: 20px;
				}
			}
		}
	}
}
</style>