<!-- pack -->
<template>
	<div class="pack">
		<div v-for="(item,index) in 2" :key="index" class="pack_box">
			<p class="pack_box_title">{{item==1?'游戏试玩领取奖励':'棋牌试玩领取奖励'}}</p>
			<p class="pack_box_tips">{{item==1?'达到10w金猪即可获得5元美团外卖红包劵':'达到20w金猪即可获得5元美团外卖红包劵'}}</p>
			<span class="pack_box_img" v-if="packData.Game">
				<i class="pack_box_btn" :class="index==0&&packData.Game.Status===1?'open_btn':index==1&&packData.Card.Status===1?'open_btn':'close_btn'" @click="getAward(index)"></i>
				<span class="pack_box_step">
					<span class="pack_box_stepB" :style="index===0?{width:packData.Game.Score>=100000?'100%':`${packData.Game.Score/100000}%`}:{width:packData.Card.Score>=200000?'100%':`${packData.Card.Score/200000}%`}"></span>
				</span>
				<p>{{index===0?`${packData.Game.Score}/100000`:`${packData.Card.Score}/200000`}}</p>
			</span>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getFoodAward } from '@/api/http'
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {};
	},
	//方法集合
	methods: {
		getAward(index){
			if(index===0){
				if(this.packData.Game.Status ===1){
					let payload = {
						Type:'n'
					}
					 return new Promise((resolve,reject) => {
						getFoodAward(payload).then((res)=>{
							if(res.Code === 200){
								this.$store.commit('happydraw/setOldPop',true)
								this.$store.commit('happydraw/setOldPopStatus',1)
								this.$store.commit('happydraw/setOldPopMsgInfo',`${res.Data.Award}`)
								this.$store.dispatch('activity/getOldFriendData')
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
				}else{
					return;
				}
			}else if(index===1){
				if(this.packData.Card.Status === 1){
					let payload = {
						Type:'y'
					}
					 return new Promise((resolve,reject) => {
						getFoodAward(payload).then((res)=>{
							if(res.Code === 200){
								this.$store.commit('happydraw/setOldPop',true)
								this.$store.commit('happydraw/setOldPopStatus',1)
								this.$store.commit('happydraw/setOldPopMsgInfo',`${res.Data.Award}`)
								this.$store.dispatch('activity/getOldFriendData')
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
				}else{
					return;
				}
			}
		}
	},
	//监听属性 类似于data概念
	computed: {
		packData(){
			// console.log(this.$store.state.activity.oldFriendData)
			return this.$store.state.activity.oldFriendData.First || [];
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
.pack {
	width: 100%;
	margin-top: 627px;
	overflow: hidden;
	padding: 0 139px;
	box-sizing: border-box;
	.pack_box {
		width: 371px;
		margin-right: 179px;
		float: left;
		&:last-child {
			margin-right: 0;
		}
		p {
			text-align: center;
		}
		.pack_box_title {
			color: #f63e05;
			font-size: 24px;
			line-height: 24px;
		}
		.pack_box_tips {
			color: #b14f0d;
			font-size: 16px;
			line-height: 16px;
			margin: 11px 0 28px;
		}
		.pack_box_img {
			display: block;
			width: 371px;
			height: 436px;
			background: url('../../../../assets/image/oldfpack.png') no-repeat;
			overflow: hidden;
			p {
				text-align: center;
				font-size: 16px;
				color: #fbfbbc;
				line-height: 35px;
			}
			.pack_box_btn {
				display: block;
				width: 134px;
				height: 134px;
				margin: 105px auto 0;
				background: url('../../../../assets/image/oldfspirit.png')
					no-repeat;
				cursor: pointer;
				&.close_btn {
					background-position: -330px -209px;
				}
				&.open_btn {
					background-position: -330px -59px;
				}
			}
			.pack_box_step {
				display: block;
				width: 289px;
				height: 26px;
				border-radius: 20px;
				text-align: center;
				color: #fdefae;
				font-size: 18px;
				line-height: 26px;
				background: #be0311;
				box-shadow: 0 3px 2px 0 rgba(190, 3, 17, 0.51);
				margin: 97px auto 0;
				position: relative;
				overflow: hidden;
				.pack_box_stepB {
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					background: linear-gradient(
						0deg,
						rgba(254, 197, 75, 1) 0%,
						rgba(253, 242, 182, 1) 100%
					);
				}
			}
		}
	}
}
</style>