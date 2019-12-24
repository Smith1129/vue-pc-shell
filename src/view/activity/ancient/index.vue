<!--  -->
<template>
	<div class="allcontent">
		<head-nav></head-nav>
		<frame v-if="popStatus" @popChange="changePop" 
			:right="right"
			:rightMsg="rightMsg"
			:worryMsg="worryMsg"
		/>
		<div class="ancient_content">
			<div class="ancient_time">活动时间：2019.12.16—2020.1.15</div>
			<div class="ancient_tip">会员在活动期间内开通vip（金卡以上），活动结束后即可获得相应的奖励，开通越多，奖励越丰富哦！</div>
			<div class="ancient_award"></div>
			<div class="ancient_award_info" v-if="userInfo">
				伟大的勇士 {{userInfo.Nickname}}，您已累计获得恩赐奖励：
				<em>{{ancientInfo.Award}}银猪</em>
			</div>
			<div class="ancient_award_info" v-else>
				您好，请<em @click="getLogin" class="login">【登录】</em>您已累计获得恩赐奖励：
				<em>--银猪</em>
			</div>
			<div class="ancient_button_list">
				<div class="button_content" v-for="(item,index) in 3" :key="index">
					<p  @click="getAward(index,buttonData[index])" :class="
					[`button${index}`,buttonData[index]==0?'noget':buttonData[index]==2?'geted':'']
					"></p>
					<div class="button_detail" v-if="ancientInfo.List">
						<span>已获恩赐：{{
							index==0?parseInt(ancientInfo.List.VipQilin.AwardGet/100000000)
							:index==1?parseInt(ancientInfo.List.VipLong.AwardGet/100000000)
							:index==2?parseInt(ancientInfo.List.VipTiger.AwardGet/100000000)
							:''
							}}亿银猪</span>
						<span>
							已开通：
							<em>{{
							 index==0?ancientInfo.List.VipQilin.Times
							:index==1?ancientInfo.List.VipLong.Times
							:index==2?ancientInfo.List.VipTiger.Times
							:''
							}}</em>/10
						</span>
					</div>
				</div>
			</div>
			<div class="ancient_firli">
				<ul>
					<li v-for="(item,index) in firli" :key="index">
						<span></span>
						<span>
							每开通1次{{item.name}},奖励<em>{{item.award}}</em>
						</span>
					</li>
				</ul>
			</div>
			<div class="ancient_secli">
				<div class="secli_tip">活动期间内，单种卡每累计达到10次，即可召唤神兽,并获得神兽恩赐</div>
				<ul>
					<li v-for="(item,index) in secli" :key="index">
                        <span></span>
                        <span>{{index==3?`${item.name}：`:item.name}}</span>
                        <span v-if="index!=3">(额外奖励<em>{{item.award}}</em>)</span>
                        <span v-else class="index4">{{item.award}}</span>
                    </li>
				</ul>
			</div>
            <div class="ancient_pics">
                <div class="ancient_pic_content" v-for="(item,index) in 3" :key="index">
                </div>
            </div>
            <div class="ancient_rule">
                <ul>
                    <li>1. 只有在活动期间内开通并享受特权才可以获得恩赐哦~</li>
                    <li>2. 活动严禁作弊，一旦被查到作弊，视情节严重程度取消或冻结账号。</li>
                    <li>3. 本次活动最终解释权归跳跳猪所有。</li>
                </ul>
            </div>
            <div class="ancient_pic_last"></div>
			<div class="ancient_bottom_button" @click="getAward(3,buttonData[3])" :class="buttonData[3]==0?'noget':buttonData[3]==2?'geted':''"></div>
		</div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import headNav from '../../activity/common/nav';
import frame from '../common/ancientpop';
import {ancientFrame} from '@/api/http'
export default {
	//import引入的组件需要注入到对象中才能使用
	components: { headNav, frame },
	data() {
		//这里存放数据
		return {
			popStatus: false,
			right:'',
			rightMsg:'',
			worryMsg:'',
			firli: [
				{ name: '金卡', award: '10w银猪' },
				{ name: '麒麟卡', award: '15w银猪' },
				{ name: '龙卡', award: '150w银猪' },
				{ name: '白虎卡', award: '200w银猪' }
			],
			secli: [
				{ name: '麒麟恩赐', award: '150w' },
				{ name: '龙之恩赐', award: '1500w' },
				{ name: '白虎恩赐', award: '2000w' },
				{
					name: '天神恩赐',
					award:
						'获得以上3种恩赐即可获得。必出5000w银猪'
				}
			],
			buttonData:[]
		};
	},
	//方法集合
	methods: {
		getLogin(){
			this.$store.commit('app/getLoginBox', true);
			this.$store.commit('app/setLoginOrReg', true);
		},
		changePop() {
			this.popStatus = false;
        },
        getAward(index,status){
            let payload = {
				VipCode:index==0?'vip_qilin'
				:index==1?'vip_long'
				:index==2?'vip_tiger'
				:index==3?'god'
				:''
			}
			let name = index==0?'麒麟恩赐'
			:index==1?'龙之恩赐'
			:index==2?'白虎恩赐'
			:index==3?'天神恩赐'
			:''
			if(status == 1){
				return new Promise((resolve,reject) => {
					ancientFrame(payload).then((res)=>{
						if(res.Code === 200){
							let data = {award:parseInt(res.Data.Award/10000),
							name:name}
							this.right = true
							this.rightMsg = data
							this.popStatus = true
							this.getData()
						}else{
							this.right = false
							this.worryMsg = res.Msg
							this.popStatus = true
						}
						resolve()
						}).catch(error => {
							reject(error)
					})
				})
			}else{
				return
			}
		},
		getData(){
			this.$store.dispatch('activity/getAncientInfo')
		}
	},
	//监听属性 类似于data概念
	computed: {
		ancientInfo(){
			// console.log(this.$store.state.activity.ancientInfo)
			return this.$store.state.activity.ancientInfo
		},
		 userInfo() {
            return this.$store.state.user.userInfo;
		}
	},
	//监控data中的数据变化
	watch: {
		ancientInfo(val){
			this.buttonData = []
			let data = val.List
			let {VipQilin,VipLong,VipTiger,God} = val.List
			this.buttonData.push(VipQilin.Status,VipLong.Status,VipTiger.Status,God.Status)
		},
		userInfo(val){
			this.getData()
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.getData()
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
.allcontent {
	width: 100%;
	height: 2917px;
	overflow: hidden;
	position: relative;
	.ancient_content {
		width: 1920px;
		height: 2875px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		background: url('../../../assets/image/ancient_bg.jpg') no-repeat;
		font-family: PingFang SC;
		.ancient_time {
			font-size: 18px;
			//    font-family:PingFang SC;
			//    font-weight:bold;
			color: rgba(90, 103, 166, 1);
			line-height: 18px;
			position: absolute;
			left: 813px;
			top: 567px;
		}
		.ancient_tip {
			width: 100%;
			text-align: center;
			position: absolute;
			top: 793px;
			font-size: 18px;
			line-height: 19px;
			color: rgba(123, 151, 216, 1);
		}
		.ancient_award {
			width: 837px;
			height: 40px;
			background: rgba(169, 197, 236, 1);
			opacity: 0.3;
			border-radius: 20px;
			text-align: center;
			line-height: 40px;
			position: absolute;
			top: 1316px;
			left: 50%;
			transform: translateX(-50%);
		}
		.ancient_award_info {
			width: 837px;
			height: 40px;
			font-size: 18px;
			color: #7b97d8;
			position: absolute;
			top: 1316px;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
			line-height: 40px;
			em {
				color: #fb6a49;
				&.login{
					cursor: pointer;
				}
			}
		}
		.ancient_button_list {
			position: absolute;
			top: 1837px;
			left: 413px;
			display: flex;
			flex-direction: row;
			.button_content {
				p {
					width: 252px;
					height: 55px;
					background: url('../../../assets/image/ancient_button.png')
						no-repeat 0 0;
						cursor: pointer;
						//0
					&.button0 {
						margin-right: 169px;
						&.noget{
							background-position: 0 -89px;
						}
						&.geted{
							background-position: 0 -178px;
						}
					}
					//1
					&.button1 {
						// background-position: 0 -89px;
						margin-right: 161px;
						&.noget{
							background-position: 0 -89px;
						}
						&.geted{
							background-position: 0 -178px;
						}
					}
					//2
					&.button2 {
						// background-position: 0 -178px;
						&.noget{
							background-position: 0 -89px;
						}
						&.geted{
							background-position: 0 -178px;
						}
					}
				}
				.button_detail {
					width: 252px;
					display: inline-flex;
					flex-direction: row;
					justify-content: space-between;
					margin-top: 9px;
					span {
						font-size: 14px;
						color: rgba(82, 106, 180, 1);
						line-height: 14px;
						em {
							color: #fb6a49;
						}
					}
				}
			}
		}
		.ancient_firli {
			position: absolute;
			left: 500px;
			top: 982px;
			ul {
				font-size: 0;
				li {
					span:nth-child(1) {
						display: inline-block;
						width: 14px;
						height: 14px;
						background: url('../../../assets/image/ancient_li.png')
							no-repeat;
					}
					span:nth-child(2) {
						font-size: 20px;
						color: #4c6faf;
						margin-left: 7px;
						em {
							color: #fb6a49;
						}
					}
				}
				:nth-child(n + 2) {
					margin-top: 8px;
				}
			}
		}
		.ancient_secli {
			width: 449px;
			height: 347px;
			position: absolute;
			right: 444px;
			top: 857px;
			.secli_tip {
				width: 386px;
				// height: 40px;
				color: #4c6faf;
				font-size: 16px;
				margin: 84px 0 0 40px;
			}
            ul{
                font-size: 0;
                position: absolute;
                left: 23px;
                top: 139px;
                // margin-left: 23px;
                // margin-top: 20px;
                li{
                    span:nth-child(1) {
						display: inline-block;
						width: 14px;
						height: 14px;
						background: url('../../../assets/image/ancient_li.png')
							no-repeat;
					}
                    span{
                        display: inline-block;
                        font-size: 18px;
                        color: #4C6FAF;
                        em{
                            color: #FB6A49;
                        }
                    }:nth-child(2){
                        margin-left: 3px;
                    }:nth-child(3){
                        margin-left: 11px;
                        &.index4{
                            display: inline;
                            margin-left: 9px;
                        }
                    }
                }:nth-child(n+2){
                    margin-top: 3px;
                }:nth-child(4){
                    margin-top: 8px;
                }
            }
		}
        .ancient_pics{
            width: 100%;
            position: absolute;
            bottom: 1046px;
            left: 374px;
            display: flex;
            flex-direction: row;
            background: url('../../../assets/image/ancient_pic.png') no-repeat 0 0;
            .ancient_pic_content{
                width: 332px;
                height: 320px;
            }:nth-child(1){
                background-position: -2px -2px;
            }:nth-child(2){
                background-position: -421px -2px;
            }:nth-child(3){
                background-position: -830px -2px;
            }
        }
        .ancient_rule{
            position: absolute;
            bottom: 202px;
            left: 699px;
            ul{
                li{
                    color: #7B97D8;
                    font-size: 20px;
                    margin-top: 6px;
                }
            }
        }
		.ancient_bottom_button {
			width: 252px;
			height: 55px;
			background: url('../../../assets/image/ancient_button.png')
				no-repeat 0 0;
			position: absolute;
			bottom: 480px;
			left: 830px;
			cursor: pointer;
			&.noget{
				background-position: 0 -89px;
			}
			&.geted{
				background-position: 0 -178px;
			}
		}
        .ancient_pic_last{
                position: absolute;
                bottom: 544px;
                left: 764px;
                width: 383px;
                height: 370px;
                background: url('../../../assets/image/ancient_pic.png') no-repeat -392px -455px;
        }
	}
}
</style>