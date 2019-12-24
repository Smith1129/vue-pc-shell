<!-- draw -->
<template>
	<div class="draw">
		<div class="drawLeft" v-if="actStatus.FetchList">
			<!-- 5金猪，4折扣卡，3经验，2红包，1福利卡 -->
			<ul>
				<li
					v-for="(item,index) in drawIndex"
					@click="handleClick(index)"
					:class="item==1?'active':''"
					:key="index"
				>
					<div></div>
					<img src="../../../../assets/image/timep1.png" alt v-if="actStatus.FetchList[index]==1" />
					<img src="../../../../assets/image/timep2.png" alt v-else-if="actStatus.FetchList[index]==2" />
					<img src="../../../../assets/image/timep3.png" alt v-else-if="actStatus.FetchList[index]==3" />
					<img src="../../../../assets/image/timep4.png" alt v-else-if="actStatus.FetchList[index]==4" />
					<img src="../../../../assets/image/timep5.png" alt v-else-if="actStatus.FetchList[index]==5" />
				</li>
			</ul>
			<!-- 遮罩层 -->
			<div class="drawMask" v-if="drawType!='4'">
				<img src="../../../../assets/image/mask0.png" v-if="drawType=='0'" />
				<img
					src="../../../../assets/image/mask1.png"
					v-else-if="drawType=='1'"
					:style="drawType=='1'?{'top':'49%','left':'51.5%'}:''"
				/>
				<img src="../../../../assets/image/mask0.png" v-else-if="drawType=='5'" />
				<img src="../../../../assets/image/mask0.png" v-else-if="drawType=='6'" />
				<img src="../../../../assets/image/mask2.png" v-else />
				<p>{{maskTips}}</p>
			</div>
		</div>
		<!-- 按钮 -->
		<div class="drawBtn" :class="`type${drawType}`" @click="handleBtn"></div>
		<div class="drawRight">
			<roll></roll>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import roll from './roll';
import { fuLiKaFetch } from '@/api/http';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: { roll },
	data() {
		//这里存放数据
		return {
			drawList: [4, 5, 4, 3, 2, 5, 3, 1, 1],
			drawIndex: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			drawType: '0', //0正式开始，1成功获取，2未抓到，3抓错，4抓取中，5区分未开始，6已结束。
			awradName: ''
		};
	},
	//方法集合
	methods: {
		handleClick(index) {
			if(this.drawIndex[index] == 1){
				this.drawIndex.splice(index, 1, 0);
			}else{
				this.drawIndex.splice(index, 1, 1);
			}
		},
		getAward() {
			return new Promise((resolve, reject) => {
				fuLiKaFetch()
					.then(res => {
						console.log(res);
						if (res.Code == 200) {
							this.drawType = '1';
							this.awradName = res.Data;
						} else {
							this.drawType = '2';
							console.log('ccc', this.drawType);
						}
						resolve();
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		handleBtn() {
			let type = this.drawType;
			let nowList = this.drawIndex;
			let isList = this.actStatus.FetchList;
			let nowIndex = [];
			let listIndex = [];
			let _this = this;
			let isArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
			this.drawIndex = isArr;
			switch (type) {
				case '0':
					this.drawType = '4';
					break;
				case '1':
					this.$store.dispatch('happydraw/getActStatus');
					this.drawType = this.actStatus.Status
					break;
				case '2':
					this.$store.dispatch('happydraw/getActStatus');
					this.drawType = this.actStatus.Status
					break;
				case '3':
					this.$store.dispatch('happydraw/getActStatus');
					this.drawType = this.actStatus.Status;
					break;
				case '4':
					for (var i = 0; i < nowList.length; i++) {
						if (nowList[i] == '1') {
							nowIndex.push(i);
						}
					}
					for (var i = 0; i < isList.length; i++) {
						if (isList[i] == '1') {
							listIndex.push(i);
						}
					}
					if (nowIndex.toString() == listIndex.toString()) {
						console.log('成功');
						this.getAward();
					} else {
						this.drawType = '3';
						console.log('错误', this.drawIndex);
					}
					break;
				case '5':
					return false;
					break;
				case '6':
					return false;
					break;
				default:
					break;
			}
		}
	},
	//监听属性 类似于data概念
	computed: {
		actStatus() {
			return this.$store.state.happydraw.actStatus || [];
		},
		maskTips() {
			let type = this.drawType;
			let tips = '';
			switch (type) {
				case '0':
					tips = '来啊，找到我就送福利卡！';
					break;
				case '1':
					tips = `恭喜你获得 ${this.awradName}福利卡`;
					break;
				case '2':
					tips = '很遗憾，福利卡已经跑完了请下一个整点再来吧!';
					break;
				case '3':
					tips = '抓错了，小福利卡逃跑了';
					break;
				default:
					tips = '来啊，找到我就送福利卡！';
					break;
			}
			return tips;
		}
	},
	//监控data中的数据变化
	watch: {
		actStatus(newVal, oldVal) {
			this.drawType = newVal.Status
			console.log(newVal, oldVal, 'vallasv');
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
.draw {
	width: 1000px;
	height: 635px;
	margin: 150px auto 0;
	overflow: hidden;
	position: relative;
	.drawLeft {
		float: left;
		width: 494px;
		height: 338px;
		overflow: hidden;
		margin-left: 122px;
		margin-top: 105px;
		border-radius: 50px;
		position: relative;
		ul {
			width: 100%;
			height: 100%;
			overflow: hidden;
			padding-top: 15px;
			box-sizing: border-box;
			li {
				width: 140px;
				height: 84px;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(191, 225, 254, 1);
				border-radius: 40px;
				float: left;
				margin-left: 19px;
				margin-bottom: 28px;
				box-sizing: border-box;
				cursor: pointer;
				&:hover {
					@extend .active;
				}
				&.active {
					background: url('../../../../assets/image/timehover.png')
						no-repeat;
					border: none;
				}
			}
		}
		.drawMask {
			width: 100%;
			height: 100%;
			background: rgba(69, 10, 68, 0.8);
			position: absolute;
			top: 0;
			left: 0;
			img {
				position: absolute;
				left: 50%;
				top: 40%;
				transform: translate(-50%, -50%);
			}
			p {
				color: #ffffff;
				font-size: 24px;
				text-align: center;
				width: 288px;
				position: absolute;
				bottom: 55px;
				left: 50%;
				margin-left: -144px;
			}
		}
	}
	.drawBtn {
		position: absolute;
		bottom: 0;
		left: 270px;
		cursor: pointer;
		width: 214px;
		height: 97px;
		background: url('../../../../assets/image/timesprite.png') no-repeat;
		&.type0 {
			background-position: -15px -113px;
			&:hover {
				background-position: -241px -113px;
			}
		}
		&.type1 {
			background-position: -15px -361px;
			&:hover {
				background-position: -241px -361px;
			}
		}
		&.type2 {
			background-position: -15px -361px;
			&:hover {
				background-position: -241px -361px;
			}
		}
		&.type3 {
			background-position: -15px -361px;
			&:hover {
				background-position: -241px -361px;
			}
		}
		&.type4 {
			background-position: -15px -237px;
			&:hover {
				background-position: -241px -237px;
			}
		}
		&.type5 {
			background-position: -15px -485px;
		}
		&.type6 {
			background-position: -15px -609px;
		}
	}
	.drawRight {
		float: right;
	}
}
</style>