<template>
	<div>
		<div class="row">
			<top-banner style="flex: 1" :pic="bgUrl" :style="{height: '250px'}"></top-banner>
		</div>
		<div class="row">
			<el-card class="box-card">
				<div class="row">
					<div class="tabs">
						<el-tabs v-model="activeName">
							<el-tab-pane label="厂商品牌" name="brand"></el-tab-pane>
							<el-tab-pane label="iOS机型" name="iOS"></el-tab-pane>
							<el-tab-pane label="Android机型" name="Android"></el-tab-pane>
						</el-tabs>
					</div>
				</div>
				<div class="row">
					<div class="selectGroup">
						<el-select v-model="dataYear" placeholder="请选择" @change="tabTime">
							<el-option v-for="year in dataYears" :key="year" :value="year"></el-option>
						</el-select>
						<el-select v-model="dataWeek" placeholder="请选择" @change="subTabTime">
							<el-option v-for="item in dataWeeks" :key="item.ID"
							:label="item.text" :value="item.week"></el-option>
						</el-select>
					</div>
				</div>
				<div class="row">
					<el-card class="box-card" style="flex:5">
						<my-cirque :style="autoStyle" :data="dataList" v-if="activeName == 'brand'"></my-cirque>
						<my-rose-chart :style="autoStyle" :data="dataList" :activeName="activeName" v-if="activeName != 'brand'"></my-rose-chart>
					</el-card>
					<el-card class="box-card" style="flex:2">
						<div class="rank">
							<header class="rankHeader">
								<span>{{rankTitle}}</span>
								<span>覆盖率</span>
							</header>
							<ul class="rankList">
								<li v-for="(item,index) in dataList" :key="item.id" class="rankListItem">
									<i>{{index+1}}</i>
									<p>
										<span>{{getName(item)}}</span>
										<span>{{computNum(item)}}</span>
									</p>
								</li>
							</ul>
						</div>
					</el-card>
				</div>
			</el-card>
		</div>
		<div class="row">
			<el-card class="box-card about">
				<header>研究方法及原理</header>
				<p>艾瑞移动终端品牌监测数据基于由艾瑞自主研发的iSdkTracker数据监测产品，通过SDK监测技术，手机移动终端的系统设备信息。 并对系统设备中的品牌及相关信息进行分析验证，提供移动终端品牌市场份额、机型占比、地区分布等数据， 真实描绘中国移动互联网终端市场的客观情况。</p>
			</el-card>
		</div>
	</div>
</template>


<script>

import MyFooter from '@/components/MyFooter'
import TopBanner from '@/components/TopBanner'
import MyCirque from '@/components/MyCirque'
import MyRoseChart from '@/components/MyRoseChart'

import { fetchDataWeek,fetchBrandData,fetchDeviceData } from '@/store/api.js'

export default {
	mounted() {
		fetchDataWeek().then(response=>{
			this.dataWeek = String(response);
			var start = new Date(2017,0,1).getTime();
			var dataList = [];
			var maxWeek = Number(String(response).substr(4,2));
			for (let i=7; i<=maxWeek; i++) {
				var time1 = new Date((i*7-6)*3600*24*1000 + start);
				var month1 = time1.getMonth()+1;
				var day1 = time1.getDate();
				var time2 = new Date((i*7)*3600*24*1000 + start);
				var month2 = time2.getMonth()+1;
				var day2 = time2.getDate();
				var dateText = `${month1}月${day1}日~${month2}月${day2}日`;
				dataList.unshift({week: '2017'+ (i<10? '0'+i : i), text: dateText});
			}
			this.dataWeeks = dataList;
			fetchBrandData({week: this.dataWeek}).then(response=>{
				this.dataList = response.List;
			});
		});
	},
	data() {
		return {
			bgUrl: 'static/img/banner-device.jpg',
			dataWeek: '',
			dataWeeks: null,
			activeName: 'brand',
			timeList: null,
			subTimeList: null,
			dataYears: ['2017年'],
			dataYear: '2017年',
			dataList: null,
			rankTitle: '厂商品牌排名（Top20）'
		}
	},
	computed: {
		autoStyle() {
			return {width: '100%', height: '440px'};
		}
	},
	watch: {
		activeName() {
			if (this.activeName == 'brand') {
				fetchBrandData({week: this.dataWeek}).then(response=>{
					this.dataList = response.List;
					this.rankTitle = '厂商品牌排名（Top20）';
				});
			}else if (this.activeName == 'iOS') {
				fetchDeviceData({week: this.dataWeek,osType: 1}).then(response=>{
					this.dataList = response.List;
					this.rankTitle = 'iOS机型（Top20）';
				});
			}else {
				fetchDeviceData({week: this.dataWeek,osType: 2}).then(response=>{
					this.dataList = response.List;
					this.rankTitle = 'Android机型（Top20）';
				});
			}
		}
	},
	methods: {
		tabTime(yearId) {
			
		},
		subTabTime(weekId) {
			this.dataWeek = weekId;
			if (this.activeName == 'brand') {
				fetchBrandData({week: this.dataWeek}).then(response=>{
					this.dataList = response.List;
				});
			}else if (this.activeName == 'iOS') {
				fetchDeviceData({week: this.dataWeek,osType: 1}).then(response=>{
					this.dataList = response.List;
				});
			}else {
				fetchDeviceData({week: this.dataWeek,osType: 2}).then(response=>{
					this.dataList = response.List;
				});
			}
		},
		getName(item) {
			if (this.activeName == 'brand') {
				return item.BrandName
			}else {
				if (item.BrandName == '苹果') {
					return `${item.ModelName}`;
				}else {
					return `${item.BrandName} ${item.ModelName}`;
				}
			}
		},
		computNum(item) {
			return (item.Percent * 100).toFixed(2) + '%';
		}
	},
	components: {
		TopBanner,
		MyFooter,
		MyCirque,
		MyRoseChart,
		MyFooter
	}
}
</script>


<style scoped>
.row {
	width: 100%;
	display: flex;
	justify-content: center;
	max-width: 1300px;
	margin: 0 auto;
}
.box-card {
	flex: 1;
	margin: 5px;
}
.tabs {
	width: 100%;
}
.selectGroup {
	margin: -60px 10px 0 auto;
}
.rankHeader {
	display: flex;
	justify-content: space-between;
	padding: 0 40px 0 10px;
	border-radius: 3px;
	line-height: 40px;
	color: #fff;
	background: #a1aebe;
}
.rankList {
	max-height: 400px;
	padding: 0 10px;
	overflow-y: auto;
}
.rankListItem {
	display: flex;
	margin-top: 10px;
	line-height: 30px;
	font-size: 14px;
}

.rankListItem i {
	margin: auto 10px auto 0;
	vertical-align: top;
	display: inline-block;
	width: 26px;
	border-radius: 3px;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	background: #cacaca;
}
.rankListItem:nth-of-type(1) i {
	background: #add532;
}
.rankListItem:nth-of-type(2) i {
	background: #8dcb3a;
}
.rankListItem:nth-of-type(3) i {
	background: #1bc8f4;
}
.rankListItem p {
	flex: 1;
	display: flex;
	justify-content: space-between;
	padding: 0 15px;
	border-radius: 3px;
	background: #f8f8f8;
}
.about {
	height: 460px;
	text-align: center;
	background: url('../../static/img/aboutDevice.png') no-repeat center 90%;
	background-color: #fff;
}
.about header {
	font-size: 30px;
	line-height: 100px;
	color: #333;
}
.about p {
	padding: 0 300px;
	color: #666;
}
</style>
