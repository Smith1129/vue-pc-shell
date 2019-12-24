<!--  -->
<template>
	<div class="nearactcontent">
		<div class="nearbox">
			<p>近期活动</p>
			<p v-if="isshow">
				<span @click="pageChange('prev')">&lt;</span>
				<span>
					<em>{{page+1}}</em>
					<em>/{{pageCount}}</em>
				</span>
				<span @click="pageChange('next')">&gt;</span>
			</p>
			<div class="tglist">
				<div class="tgleft">
					<ul>
						<li v-for="(item,index) in picList2" :key="index">
							<img :src="item.ImgSrc" v-if="item.isMyst" />
							<a v-else :href="item.UrlPath">
                        		<img :src='`//image-material.ttz.com//${item.ImgSrc}`'>
							</a>
							<div class="desc">
								<p>{{item.InfoTitle}}</p>
								<p v-if="item.EndTime">{{item.EndTime | fromCurrent}}天以后结束</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="tgright">
					<div class="tg1" @click="goExample(1)">
						<img src="../../../assets/image/tg1.png" />
					</div>
					<div class="tg2" @click="goExample(1)">
						<img src="../../../assets/image/tg2.png" />
					</div>
				</div>
			</div>
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
		return {
			isshow: false,
			picList: [
				// {
				// 	imgUrl: require('../../../assets/image/act1.png'),
				// 	desc: '注册就送666元大红包',
				// 	limit: '30以后结束1'
				// },
			],
			picList2: [],
			page: 0,
			pageCount: 0
		};
	},
	//方法集合
	methods: {
		goExample(index) {
			if (index == 1) {
				this.$router.push(
					`/recruit/example?url=${this.isData.InviteUrl}`
				);
			}
		},
		activity() {
			if (this.picList.length < 3) {
				this.isshow = false;
				for (let i = this.picList.length; i < 3; i++) {
					let slideJson = {
						ImgSrc: require('../../../assets/image/mystery.png'),
						InfoTitle: '即将上线',
						EndTime: '',
						isMyst: true
					};
					this.picList.push(slideJson);
				}
				this.picList2 = this.picList;
			} else if (this.picList.length > 3) {
				this.isshow = true;
				this.pageCount = Math.ceil(this.picList.length / 3);
				this.pageData();
			} else if (this.picList.length == 3) {
				this.isshow = false;
				this.picList2 = this.picList;
			}
		},
		pageData() {
			for (let i = this.page * 3; i < (this.page + 1) * 3; i++) {
				if (this.picList[i]) {
					this.picList2.push(this.picList[i]);
				} else {
					return;
				}
			}
		},
		pageChange(choose) {
			if (choose === 'next') {
				if (this.page < this.pageCount - 1) {
					this.picList2 = [];
					this.page = this.page + 1;
					this.pageData();
				}
			} else if (choose === 'prev') {
				if (this.page > 0) {
					this.picList2 = [];
					this.page = this.page - 1;
					this.pageData();
				}
			}
		}
	},
	//监听属性 类似于data概念
	computed: {
		isData() {
			return this.$store.state.app.friendList;
		},
		slide() {
			return this.$store.state.app.slideList;
		}
	},
	//监控data中的数据变化
	watch: {
		slide(newVal) {
			if(newVal[25]){
				this.picList = newVal[25];
			}else{
				this.picList = []
			}
			this.activity();

		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.$store.dispatch('app/getSlide');
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
%clearfix {
	*zoom: 1;
	&:before,
	&:after {
		content: ' ';
		display: table;
	}
	&:after {
		clear: both;
	}
}
.nearactcontent {
	width: 100%;
	height: 266px;
	padding: 21px 31px 25px 30px;
	background: rgba(255, 255, 255, 1);
	font-family: Microsoft YaHei;
	font-weight: 400;
	box-sizing: border-box;
	.nearbox {
		height: 100%;
		p:nth-child(1) {
			font-size: 18px;
			color: rgba(41, 39, 58, 1);
			line-height: 18px;
		}
		p:nth-child(2) {
			margin-left: 518px;
			span:nth-child(1),
			span:nth-child(3) {
				display: inline-block;
				width: 6px;
				line-height: 10px;
				color: rgba(136, 136, 136, 1);
			}
			span:nth-child(1) {
				margin-right: 16px;
				cursor: pointer;
			}
			span:nth-child(3) {
				color: rgba(41, 39, 58, 1);
				cursor: pointer;
			}
			span:nth-child(2) {
				line-height: 10px;
				font-size: 12px;
				font-family: Arial;
				color: rgba(41, 39, 58, 1);
				margin-right: 16px;
			}
		}
		.tglist {
			margin-top: 15px;
			// overflow: hidden;
			height: 183px;
			.tgleft {
				float: left;
				ul {
					@extend %clearfix;
					li {
						float: left;
						margin-right: 10px;
						img {
							width: 188px;
							height: 137px;
							display: block;
							cursor: pointer;
						}
						.desc {
							width: 100%;
							margin-top: 12px;
							p:nth-child(1) {
								color: #29273a;
								font-size: 14px;
								line-height: 16px;
							}
							p:nth-child(2) {
								line-height: 18px;
								font-size: 12px;
								color: #ffa505;
								margin-left: 0;
							}
						}
					}
				}
			}
			.tgright {
				float: right;
				img {
					width: 245px;
					height: 83px;
					display: block;
					cursor: pointer;
				}
				.tg2 {
					margin-top: 15px;
				}
			}
		}
	}
}
</style>