<!--  -->
<template>
	<div class="slide_content">
		<div class="slide_list">
			<vue-seamless-scroll :data="boxDetailData" :class-option="optionTop">
				<ul>
					<li v-for="(item,index) in boxDetailData" :key="index">
						<p>{{item.NickName | star}}打开了{{
                      item.BoxType==1?'木宝箱'
                     :item.BoxType==2?'黄金宝箱'
                     :item.BoxType==3?'钻石宝箱'
                     :item.BoxType==4?'神龙宝箱'
                     :item.BoxType==5?'白虎宝箱'
                     :''
                     }},
                     获得了{{list[index]}}
                  </p>
					</li>
				</ul>
			</vue-seamless-scroll>
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
			awardList: [
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶',
				'JJJ***打开了神龙宝箱,获得了1000W水晶'
			],
			list:[]
		};
	},
	//方法集合
	methods: {},
	//监听属性 类似于data概念
	computed: {
		optionTop() {
			return {
				step: 0.5,
				limitMoveNum: 10,
				openTouch: false,
				direction: 1,
				openWatch: true
			};
      },
      boxDetailData(){
			return this.$store.state.activity.openBoxDetail;
		}
	},
	//监控data中的数据变化
	watch: {
		boxDetailData(value){
			for(let i in value){
				let data = value[i]
				if(data.AwardType==1){
					let count;
					if(parseInt(data.CoinBean/10000) == 0){
						count = `${data.CoinBean}银猪`
					}else{
						count = `${parseInt(data.CoinBean/10000)}w银猪`
					}
					this.list.push(count)
				}else{
					let count;
					if(parseInt(data.Crystal/10000) == 0){
						count = `${data.Crystal}水晶`
					}else{
						count = `${parseInt(data.Crystal/10000)}w水晶`
					}
					this.list.push(count)
				}
			}
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.$store.dispatch('activity/getBoxDetailInfo');
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
.slide_content {
	width: 304px;
	.slide_list {
		width: 100%;
		height: 208px;
		overflow: hidden;
		color: #611f3c;
		font-size: 16px;
		ul {
			li {
				margin-top: 20px;
			}
		}
	}
}
</style>