<!--  -->
<template>
	<div class="forge_pop_content">
		<div class="forge_pop_top">
			<p @click="forgelog">锻造记录</p>
			<img src="../../../assets/image/forgetitle.png" />
		</div>
		<div class="forge_pop_middle_box">
			<div class="forge_pop_middle">
				<!-- <p>
                    <span>卡号：</span>
                    <input v-model="cardNumber">
                </p>
                <p>
                    <span>卡密：</span>
                    <input v-model="cardPass">
				</p>-->
				<div class="forge_pop_text">
					<label for="isAllCard">卡号卡密：</label>
					<textarea id="isAllCard" cols="10" rows="10" v-model="allCard"></textarea>
				</div>
				<p class="start" @click="start"></p>
			</div>
		</div>
		<div class="forge_pop_bottom_box">
			<p>
				提示：锻造成功后在右方能看到加入的水晶余量
				<em></em>
			</p>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { freecaForgeBatch } from '@/api/http';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			cardNumber: '',
			cardPass: '',
			allCard: ''
		};
	},
	//方法集合
	methods: {
		forgelog() {
			this.$store.commit('activity/setFramePop', true);
			this.$store.commit('activity/setMsgType', 2);
			this.$store.commit('activity/setFramePopType', 'log');
			this.$store.dispatch('activity/getForgeLogData');
		},
		start() {
			if (this.allCard) {
				console.log();
				if (
					document.getElementById('isAllCard').value.split('\n')
						.length > 11
				) {
					this.$store.commit('activity/setFramePop', true);
					this.$store.commit('activity/setMsgType', 0);
					this.$store.commit('activity/setFramePopType', 'msg');
					this.$store.commit(
						'activity/setFramePopMsg',
						'卡号卡密不得超出10张!!!'
					);
				} else {
					let payload = {
						Content: this.allCard
					};
					return new Promise((resolve, reject) => {
						freecaForgeBatch(payload)
							.then(res => {
								if (res.Code === 200) {
									this.allCard = ''
									this.$store.dispatch('user/getInfo');
									if (res.Data.Err.length == 0) {
										this.$store.commit(
											'activity/setFramePop',
											true
										);
										this.$store.commit(
											'activity/setMsgType',
											0
										);
										this.$store.commit(
											'activity/setFramePopType',
											'msg'
										);
										this.$store.commit(
											'activity/setFramePopMsg',
											'锻造成功'
										);
										this.cardNumber = '';
										this.cardPass = '';
									} else {
										this.$store.commit(
											'activity/setFramePop',
											true
										);
										this.$store.commit(
											'activity/setMsgType',
											1
										);
										this.$store.commit(
											'activity/setMsgWorryInfo',
											res.Data.Err
										);
										this.$store.commit(
											'activity/setFramePopType',
											'log'
										);
										this.$store.commit(
											'activity/setFramePopMsg',
											res.Data.Err
										);
									}
								} else {
									console.log('vvvv');
									this.$store.commit(
										'activity/setFramePop',
										true
									);
									this.$store.commit(
										'activity/setMsgType',
										0
									);
									this.$store.commit(
										'activity/setFramePopType',
										'msg'
									);
									this.$store.commit(
										'activity/setFramePopMsg',
										res.Msg
									);
								}
								resolve();
							})
							.catch(error => {
								reject(error);
							});
					});
				}
			} else {
				this.$store.commit('activity/setFramePop', true);
				this.$store.commit('activity/setMsgType', 0);
				this.$store.commit('activity/setFramePopType', 'msg');
				this.$store.commit(
					'activity/setFramePopMsg',
					'卡号和卡密不得为空!!!'
				);
			}
		}
	},
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
.forge_pop_content {
	width: 100%;
	height: 100%;
	background: url('../../../assets/image/forgeleft.png');
	position: relative;
	.forge_pop_top {
		width: 100%;
		p {
			font-size: 14px;
			line-height: 16px;
			color: rgba(236, 192, 31, 1);
			text-decoration: underline;
			float: right;
			margin-right: 97px;
			margin-top: 40px;
			cursor: pointer;
		}
		img {
			margin-left: 243px;
			margin-top: 50px;
			// display: block;
		}
		// padding-right: 23px;
	}
	.forge_pop_middle_box {
		text-align: center;
		.forge_pop_text {
			label {
				display: block;
				width: 338px;
				margin: 0 auto;
				text-align: left;
				color: #ab6d42;
				font-size: 16px;
			}
			textarea {
				width: 338px;
				height: 120px;
				background: rgba(255, 255, 255, 1);
				overflow-x: hidden;
				overflow-y: auto;
				resize: none;
				margin-top: 8px;
				color: #999999;
				font-size: 12px;
				line-height: 17px;
				padding: 10px;
				box-sizing: border-box;
			}
		}
		.start {
			margin-left: 255px;
			// position: absolute;
			// left: 50%;
			// transform: translateX(-50%);
			margin-top: 18px;
			width: 142px;
			height: 70px;
			cursor: pointer;
			background: url('../../../assets/image/allbutton.png') no-repeat -33px -381px;
			&:hover {
				background-position-y: -476px;
			}
		}
		// padding:
	}
	.forge_pop_bottom_box {
		// width: 100%;
		margin-top: 90px;
		p {
			font-size: 12px;
			color: rgba(184, 119, 74, 1);
			line-height: 13px;
			text-align: center;
			em {
				display: inline-block;
				width: 20px;
				height: 23px;
				margin-left: 8px;
				margin-top: 2px;
				background: url('../../../assets/image/pebble.png') no-repeat;
				position: relative;
				top: 7px;
			}
		}
	}
}
</style>