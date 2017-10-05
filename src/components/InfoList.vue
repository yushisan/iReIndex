<template>
	<div class="wrap">
		<header class="header">
			<span class="rank">排名</span>
			<span class="contrast">对比</span>
			<span class="name">{{type}}</span>
			<span class="dataClass">类别</span>
			<span class="titleClass">{{titleClass}}</span>
			<span class="growth">环比增幅(%)</span>
			<span class="tabBtns">
				操作
				<!-- <label title="数据表格">
					<i class="fa fa-list fa-fw fa-lg"></i>
					<input type="radio" value="no" v-model="showChart">
				</label>
				<label  title="数据图形">
					<i class="fa fa-line-chart fa-fw fa-lg"></i>
					<input type="radio" value="yes" v-model="showChart">
				</label> -->
			</span>
		</header>
		<div class="dataChart"></div>
		<transition-group name="list" tag="ul" class="list">
			<!-- <mix-chart tag="li" :key="'mixChart'" :data="data"></mix-chart> -->
			<li v-for="(item,index) in data" :key="index" class="listItem" v-lazyLoad="(index == data.length-1)">
				<i class="rank" :class="{top3: getRankType(item,index) < 4}">{{getRankType(item,index)}}</i>
				<label class="contrast">
					<i class="fa fa-fw fa-lg"
					:class="{'fa-check-square': isChecked(item.Appid),
					'fa-square-o': !isChecked(item.Appid),
					'checked': isChecked(item.Appid),
					'disabled': isDisabled(item.Appid)}"></i>
					<input type="checkbox" :value="item.Appid"
					v-model="checkList"
					:disabled="isDisabled(item.Appid)">
				</label>
				<span class="name" :title="item.AppName">
					<img :src="getIcoUrl(item)">
					{{item.AppName}}
				</span>
				<span class="dataClass">{{item.KclassName}}</span>
				<span class="titleClass">
					{{dataType(item).data}}
					<i class="fa fa-fw" :class="dataType(item).ico" :style="{color: dataType(item).color}"></i>
				</span>
				<span class="growth" :style="{color: growthType(item).color}">{{growthType(item).attr}}</span>
				<span class="tabBtns">
					<router-link :to="linkId(item)" tag="span">详情</router-link>
				</span>
			</li>
			<li class="mask" :key="'mask'" v-show="value">
				<div class="loadingIco">
					<i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
					<p>加载中</p>
				</div>
			</li>
			<li class="moreList" :key="'moreList'" v-show="showNomoreText">没有更多了</li>
		</transition-group>
		<aside-compare ref="aside-compare" v-model="checkList"
		:type="type" :checkGroup="checkGroup"></aside-compare>
	</div>
</template>


<script>

import MixChart from '@/components/MixChart'
import AsideCompare from '@/components/AsideCompare'

export default {
	//这里的value 绑定的是 isLoading，用于双向绑定加载状态
	props: ['data','orderBy','type','value','msgNum','searchVal'],
	data() {
		return {
			checkList: [],
			showChart: false,
			checkGroup: []
		}
	},
	watch: {
		checkList() {
			this.$refs['aside-compare'].show();
			var newAdd = [];
			var newId = [];
			var newArr = [];
			this.checkList.forEach((id)=>{
				var checkGroup = this.checkGroup;
				for (var i = 0; i < checkGroup.length; i++) {
					if (checkGroup[i].Appid == id) {
						newArr.push(checkGroup[i]);
						return;
					}
				}
				newId.push(id);
			});
			newAdd = this.data.filter((item)=>{
				if (newId.includes(item.Appid)) {
					return true;
				}
			});
			this.checkGroup = newArr.concat(newAdd);
		}
	},
	computed: {
		//根据orderBy返回列表数据的标题文字
		titleClass() {
			if (this.orderBy == 2 && this.type == '应用') {
				return '月度独立设备数(万台)';
			}else if (this.orderBy == 2 && this.type == '网站') {
				return '月度覆盖人数(万人)';
			}else if (this.orderBy == 10) {
				return '日均覆盖人数(万人)';
			}else if (this.orderBy == 6) {
				return '月度浏览时间(万小时)';
			}else if (this.orderBy == -2) {
				return '日均独立设备数(万台)';
			}else {
				return '月度总有效时长(万小时)';
			}
		},
		showNomoreText() {
			if (this.data && this.data.length == 0) {
				return true;
			}
			return this.data && this.msgNum && this.data.length >= this.msgNum;
		}
	},
	methods: {
		getIcoUrl(item) {
			if (item.AppLogo) {
				return `http://index.iresearch.com.cn${item.AppLogo}`;
			}
		},
		//选中数量大于等于5且该选项不在选中列表中，则该选项不能再进行勾选操作
		//val 选项值
		isDisabled(val) {
			if (this.checkList.length >=5 && !this.checkList.includes(val)) {
				return true;
			}
			return false;
		},
		//判断该选项是否在已选中列表中
		isChecked(val) {
			if (this.checkList.includes(val)) {
				return true;
			}
			return false;
		},
		// 根据orderBy判断当前需要显示的增长率是哪一个，根据增长率的正负得到符号和比率颜色
		growthType(item) {
			var attr = NaN;
			if (this.orderBy == 2) {
				attr = item.Growth;
			}else if (this.orderBy == -2) {
				attr = item.DmGrowth;
			}else {
				attr = item.TimeGrowth;
			}
			var color = attr > 0 ? 'red': 'green';
			var symbol = attr > 0 ? 1 : (attr == 0 ? 0 : -1);
			attr = attr > 0 ? '+' + attr : attr;
			return {attr, color, symbol};
		},
		getRankType(item,index) {
			return index+1;
			//由于element-ui 的 input 无法lazy双向绑定，所以这个功能弃用

			// if (!this.searchVal) {
			// 	return index+1;
			// }
			// if (this.orderBy == 2) {
			// 	return item.Rank;
			// }else if (this.orderBy == 10 || this.orderBy == -2) {
			// 	return item.DmRank;
			// }else if (this.orderBy == 6 || this.orderBy == -1) {
			// 	return item.TimeRank;
			// }
		},
		//根据orderBy判断当前需要显示的数据是哪一个，根据增长率的正负返回比率颜色和显示图标的class
		dataType(item) {
			var data = NaN;
			if (this.orderBy == 2) {
				data = item.UseNum;
			}else if (this.orderBy == -2) {
				data = item.DayMachineNum;
			}else {
				data = item.UseTime;
			}
			var ico = '';
			var symbol = this.growthType(item).symbol;
			var color = '';
			if (symbol > 0) {
				ico = 'fa-long-arrow-up';
				color = 'red';
			}else if (symbol < 0) {
				ico = 'fa-long-arrow-down';
				color = 'green';
			}
			return {color, ico, data};	
		},
		linkId(item) {
			if (item.AppType == 1) {
				return '/PC/detail?type=' + item.AppType + '&id=' + item.Appid;
			}else {
				return '/App/detail?type=' + item.AppType + '&id=' + item.Appid;
			}
			// return '/detail?type=' + item.AppType + '&id=' + item.Appid;
		}
	},
	components: {
		MixChart,
		AsideCompare
	},
	directives: {
		lazyLoad: {
			bind(el,{value},vnode) {
				if (value == true) {
					var contentBox = document.querySelector('#contentBox');
					var _this = vnode.context;
					contentBox.onscroll = function() {
						//这里做个判断，没有更多时不加载
						if (_this.showNomoreText) {
							_this.$emit('input',false);
							return;
						}else {
							var rect = el.getBoundingClientRect().bottom;
							var pageH = document.documentElement.clientHeight;
							if (rect < pageH && !_this.value) {
								_this.$emit('input',true);
								console.log('加载中……');
							}
						}
					};
				}
			}
		}
	}
}
</script>


<style scoped>
.list {
	position: relative;
	min-height: 255px;
}
.mask {
	position: absolute;
	left: 0;
	right: 0;
	height: 100%;
	top: 0;
	background: rgba(255, 255, 255, .8);
	z-index: 99;
}
.loadingIco {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 150px;
	margin: auto;
	text-align: center;
	color: #20a0ff;
}
.loadingIco p {
	line-height: 50px;
}
.listItem {
	display: flex;
	height: 50px;
	border-bottom: 1px solid #ccc;
}
.listItem:hover {
	background: #ddd;
}
.listItem >* {
	margin: auto 0;
}
.header {
	display: flex;
	border-radius: 5px 5px 0 0;
	background: #8bc43f;
}
.header >span {
	margin: auto 0;
	text-align: center;
	color: #fff;
	font-weight: bold; 
}
.rank,
.contrast,
.name,
.dataClass,
.titleClass,
.growth,
.tabBtns {
	flex: 3;
	font-size: 14px;
	text-align: center;
}
.contrast,
.rank {
	flex: 1;
}
.rank.top3 {
	color: #8bc43f;
}
.listItem .contrast {
	cursor: pointer;
}
input[type="checkbox"],
input[type="radio"] {
	display: none;
}
.checked {
	color: #20a0ff;
}
.disabled {
	color: #ccc;
	cursor: not-allowed;
}
.name {
	font-size: 14px;
	line-height: 50px;
	text-align: left;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	cursor: pointer;
}
.name >* {
	display: inline-block;
	vertical-align: middle;
	
	
}
.name img {
	margin: 0 10px 0 27%;
	width: 40px;
	border-radius: 5px;
}
.tabBtns label {
	display: inline-block;
	margin: 0 5px;
	width: 30px;
	line-height: 30px;
	border-radius: 50%;
	border: 1px solid #fff;
	cursor: pointer;
}
.tabBtns label:hover {
	transform: scale(1.1);
}
.tabBtns label.active {
	color: #8bc43f;
	background: #fff;
}
.tabBtns span {
	display: inline-block;
	padding: 0 15px;
	border: 1px solid #8bc43f;
	border-radius: 5px;
	line-height: 26px;
	color: #8bc43f;
	cursor: pointer;
}
.tabBtns span:hover {
	color: #fff;
	background: #8bc43f
}
.moreList {
	margin-top: 20px;
	font-size: 16px;
	line-height: 20px;
	text-align: center;
}



/* 懒加载后的动画效果 */
.list-enter-active, .list-leave-active {
  	transition: all .5s;
}
.list-enter, .list-leave-to{
	opacity: 0;
}
</style>
