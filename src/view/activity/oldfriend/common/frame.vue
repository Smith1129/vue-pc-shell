<!-- frame -->
<template>
	<div class="frame">
		<div class="frame_box" :class="isType==2 || isType==5?'pop2':'pop1'">
			<i class="frame_close" @click="handleClose"></i>
			<p
				class="frame_title"
				:style="isType==2?{'font-size':'22px','padding-left':'15px','box-sizing':'border-box'}:{}"
			>{{isType==1?'兑换信息':isType==2||isType==5?'':'温馨提示'}}</p>
			<!-- 恭喜您！成功获得！ -->
			<!-- 美团外卖红包 -->
			<div class="frame_pack" v-if="isType==1">
				<p class="frame_text">
					恭喜您获得！美团外卖
					<em>5元红包</em>兑换码
				</p>
				<p class="frame_key">{{msgInfo}}</p>
				<span class="frame_btn box_btn" :data-clipboard-text="msgInfo" @click="copy"></span>
				<p class="frame_tips">您可以前往美团外卖输入兑换码兑换5元红包</p>
			</div>
			<!-- 获得奖励 -->
			<div class="frame_price" v-else-if="isType==2">
				<span v-for="(item,index) in 1" :key="index" class="frame_icon fl">
					<i class="sliver"></i>
					<em>{{msgInfo}}银猪</em>
				</span>
				<span class="frame_btn" @click="handleClose"></span>
			</div>
			<div class="frame_price" v-else-if="isType==5">
				<span v-for="(item,index) in 1" :key="index" class="frame_icon fl">
					<i class="glod"></i>
					<em>10000金猪</em>
				</span>
				<span class="frame_btn" @click="handleClose"></span>
			</div>
			<!-- 提示 -->
			<div class="frame_txt" v-else-if="isType==3">
				<p>红包兑换码已经复制到您的粘贴板了</p>
				<span class="frame_btn" @click="handleClose"></span>
			</div>
			<div class="frame_txt" v-else-if="isType==4||isType==6">
				<p>{{msgInfo}}</p>
				<span class="frame_btn" @click="handleClose"></span>
			</div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Clipboard from 'clipboard';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			// isType: 2,
			isKey: '12312312312asd'
		};
	},
	//方法集合
	methods: {
        handleClose(){
			this.$store.commit('happydraw/setOldPop',false);
			if(this.isType==6){
				this.$router.push('/')
			}
        },
		copy() {
			let tag1 = new Clipboard(`.box_btn`);
			var clipboard = tag1;
			console.log(tag1, 'ssss');
			clipboard.on('success', e => {
				console.log('复制成功');
				this.$store.commit('happydraw/setOldPopStatus',3)
				// this.isType = 3;
				// 释放内存
				clipboard.destroy();
			});
			clipboard.on('error', e => {
				// 不支持复制
				console.log('该浏览器不支持自动复制');
				// 释放内存
				clipboard.destroy();
			});
		}
	},
	//监听属性 类似于data概念
	computed: {
		isType(){
			return this.$store.state.happydraw.oldPopStatus
		},
		msgInfo(){
			return this.$store.state.happydraw.oldPopMsgInfo
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
.frame {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(000, 000, 000, 0.6);
	z-index: 99;
	.frame_box {
		&.pop1 {
			background: url('../../../../assets/image/oldfpop.png') no-repeat;
		}
		&.pop2 {
			background: url('../../../../assets/image/oldfpop2.png') no-repeat;
		}
		position: absolute;
		width: 510px;
		height: 339px;
		margin-left: -255px;
		margin-top: -169.5px;
		top: 50%;
		left: 50%;
		.frame_close {
			width: 30px;
			height: 30px;
			background: url('../../../../assets/image/oldfclose.png') no-repeat;
			display: block;
			position: absolute;
			right: -35px;
			top: 0;
			cursor: pointer;
		}
		.frame_title {
			text-align: center;
			color: #ffffff;
			font-size: 24px;
			line-height: 24px;
			margin-top: 22px;
		}
		.frame_pack {
			width: 100%;
			text-align: center;
			margin-top: 50px;
			.frame_text {
				font-size: 18px;
				color: #b14f0d;
				em {
					font-size: 24px;
				}
			}
			.frame_key {
				line-height: 36px;
				color: #f63e05;
				font-size: 18px;
			}
			.frame_btn {
				background: url('../../../../assets/image/oldfspirit.png')
					no-repeat -837px -271px;
				width: 227px;
				height: 65px;
				display: block;
				margin: 30px auto 0;
				cursor: pointer;
			}
			.frame_tips {
				color: #d26402;
				font-size: 14px;
				text-align: center;
				margin-top: 25px;
			}
		}
		.frame_price {
			overflow: hidden;
			width: 280px;
			// margin: 50px auto 0;
			margin: 85px auto 0;
			.frame_icon {
				width: 76px;
				height: 76px;
				border-radius: 50%;
				background: #9a440a;
				&.fl {
					float: left;
					position: relative;
					left: 106px;
				}
				// &.fr {
				// 	float: right;
				// }
				i {
					display: inline-block;
					width: 58px;
					height: 45px;
					// background: red;
					background: url('../../../../assets/image/oldfspirit.png') no-repeat;
					margin-top: 17px;
					margin-left: 9px;
					&.glod{
						background-position: -1223px -294px;
					}
					&.sliver{
						// margin-left: 9px;
						background-position:  -1223px -390px;
					}
					// background-position: 
				}
				em {
					width: 510px;
					margin-left: -214px;
					display: block;
					color: #b14f0d;
					font-size: 16px;
					line-height: 25px;
					text-align: center;
					margin-top: 18px;
					position: relative;
				}
			}
			.frame_btn {
				background: url('../../../../assets/image/oldfspirit.png')
					no-repeat -534px -271px;
				width: 227px;
				height: 65px;
				display: block;
				margin: 130px auto 0;
				cursor: pointer;
			}
		}
		.frame_txt {
			p {
				color: #b14f0d;
				font-size: 18px;
				text-align: center;
				margin: 70px 0 0;
			}
			span {
				background: url('../../../../assets/image/oldfspirit.png')
					no-repeat -534px -271px;
				width: 227px;
				height: 65px;
				display: block;
				margin: 53px auto 0;
				cursor: pointer;
			}
		}
	}
}
</style>