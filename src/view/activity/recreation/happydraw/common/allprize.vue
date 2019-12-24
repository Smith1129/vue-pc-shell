<!-- allprize -->
<template>
	<div class="allprize">
		<div class="allprize_box">
			<ul>
				<li>
					<div class="item_head">
						<span class="item_label">限定头像</span>
						<span class="item_Img">
							<span v-for="(item,index) in 4" :key="index" :class="`item_Img_head${index}`"></span>
						</span>
						<span class="item_tips">您可以在“个人中心”的“修改头像”中替换</span>
					</div>
				</li>
				<li>
					<div class="item_headBox">
						<span class="item_label">专属头像框</span>
						<span class="item_Img">
							<span v-for="(item,index) in 4" :key="index" :class="`item_Img_headBox${index}`"></span>
						</span>
						<span class="item_tips">您可以在“个人中心”的“我的装扮”中替换</span>
					</div>
				</li>
				<li>
					<div class="item_exp">
						<span class="item_label">
							<em>10%</em>
							<em>经验加成卡</em>
						</span>
						<span class="item_Img">
							<span v-for="(item,index) in 1" :key="index" class="item_exp_card"></span>
						</span>
						<span class="item_tips">
							经验值加成卡有效期1天。获得后立即生效，生效期间额外增加
							您获得的10%经验值，此加成卡可以叠加累计。
						</span>
					</div>
				</li>
				<li>
					<div class="item_all">
						<span class="item_label">
							<em>更多</em>
							<em>神秘奖品</em>
						</span>
						<span class="item_Img">
							<span v-for="(item,index) in 7" :key="index" :class="`item_all_img${index}`"></span>
						</span>
					</div>
				</li>
			</ul>
			<div class="allprize_tips">
				神秘奖品随机发放，更多奖品规则详见
				<i>公告</i>
			</div>
			<div class="handle_close" @click="handleClose"></div>
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
        handleClose(){
            this.$store.commit('happydraw/setAllprize',false)
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
.allprize {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background: rgba(000, 000, 000, 0.6);
    z-index: 999;
	.allprize_box {
		background: url('../../../../assets/image/allprize.png') no-repeat;
		width: 680px;
		height: 747px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
		ul {
			width: 629px;
			margin: 142px auto 0;
			li {
				width: 100%;
				height: 93px;
				margin-bottom: 11px;
				&:last-child {
					height: 162px;
					margin-bottom: 0px;
				}
				div {
					height: 100%;
					&.item_headBox {
						.item_label {
							margin-right: 10px;
						}
					}
					&.item_exp {
						.item_label {
							text-align: center;
							em {
								display: block;
								line-height: 18px;
							}
							margin-right: 10px;
						}
						.item_Img {
							margin-right: 25px;
						}
						.item_tips {
							font-size: 14px;
							width: 385px;
						}
					}
					&.item_all {
						.item_label {
							text-align: center;
							em {
								display: block;
								line-height: 18px;
							}
							margin-right: 25px;
						}
						.item_Img {
							margin-right: 0;
							width: 445px;
						}
					}
					span {
						display: inline-block;
						color: #f3defe;
						vertical-align: middle;
						margin-top: 7px;
						&.item_label {
							font-size: 16px;
							margin-left: 22px;
							margin-right: 26px;
						}
						&.item_Img {
							margin-right: 50px;
							span {
								width: 64px;
								height: 64px;
								background: url('../../../../assets/image/allprizesp.png')
									no-repeat;
								margin-right: 10px;
								&.item_exp_card {
									background-position: -30px -334px;
								}
								&.item_Img_head0 {
									background-position: -30px -129px;
								}
								&.item_Img_head1 {
									background-position: -104px -129px;
								}
								&.item_Img_head2 {
									background-position: -179px -129px;
								}
								&.item_Img_head3 {
									background-position: -253px -129px;
								}
								&.item_Img_headBox0 {
									background-position: -30px -232px;
								}
								&.item_Img_headBox1 {
									background-position: -104px -232px;
								}
								&.item_Img_headBox2 {
									background-position: -179px -232px;
								}
								&.item_Img_headBox3 {
									background-position: -253px -232px;
								}
								&.item_all_img0 {
									background-position: -30px -436px;
								}
								&.item_all_img1 {
									background-position: -104px -436px;
								}
								&.item_all_img2 {
									background-position: -179px -436px;
								}
								&.item_all_img3 {
									background-position: -253px -436px;
								}
								&.item_all_img4 {
									background-position: -328px -436px;
								}
								&.item_all_img5 {
									background-position: -403px -436px;
								}
								&.item_all_img6 {
									background-position: -29px -510px;
								}
								&:last-child {
									margin-right: 0;
								}
							}
						}
						&.item_tips {
							font-size: 14px;
							width: 155px;
						}
					}
				}
			}
		}
		.allprize_tips {
			font-size: 14px;
			line-height: 14px;
			color: #f3defe;
			float: right;
			margin-right: 28px;
			margin-top: 13px;
			i {
				color: #ffb20c;
				text-decoration: underline;
				cursor: pointer;
				display: inline-block;
			}
		}
		.handle_close {
			background: url('../../../../assets/image/allprizesp.png') no-repeat -110px -623px;
			width: 229px;
			height: 66px;
			margin: 33px auto 0;
            cursor: pointer;
		}
	}
}
</style>