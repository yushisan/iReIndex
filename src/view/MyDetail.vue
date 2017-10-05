<template>
	<div>
		<div class="row">
			<el-card class="box-card">
				<header class="header">
					<div class="ico">
						<img :src="icoUrl">
					</div>
					<div class="text">
						<h3>{{itemInfo.AppName}}</h3>
						<div class="other">
							<p class="selectTime">
								时间区间：
								<el-select v-model="timeId" placeholder="请选择" @change="tabTime" class="timeSelect">
									<el-option v-for="item in timeList" :key="item.ID"
									:label="item.TimeName" :value="item.ID"></el-option>
								</el-select>
							</p>
							<p class="rank">
								<i class="fa fa-trophy fa-fw fa-2x" style="color: #FFD700"></i>总榜 {{itemInfo.Rank}}
							</p>
							<p class="typeClass">{{itemInfo.KclassName}} {{itemInfo.CRank}}</p>			 
						</div>
					</div>
				</header>
				<div class="tabs">
					<el-tabs v-model="activeName">
						<el-tab-pane v-for="item in autoClassText" :key="item.id"
						:label="item.label" :name="item.name"></el-tab-pane>
						<!-- <el-tab-pane label="月度独立设备数" name="first"></el-tab-pane>
						<el-tab-pane label="日均独立设备数" name="second"></el-tab-pane>
						<el-tab-pane label="月度总有效时长" name="third"></el-tab-pane> -->
					</el-tabs>
				</div>
				<p class="dataShow">
					<strong class="data">{{getShowData.num}}</strong>
					<span class="postfix">{{getShowData.postfix}}</span>
					<span :style="{color: getShowData.color}" class="percent">
						{{getShowData.percent}}
						<i class="fa fa-fw" :class="{[getShowData.ico]:true}"></i>
					</span>
				</p>
				<div class="row">
					<mix-chart :monthData="monthData" v-if="monthData"
					:activeName="activeName" :typeid="typeid" :timeList="timeList.slice(0,12)"></mix-chart>
				</div>
				<div class="rowBlock">
					<h3>使用人群性别占比</h3>
					<gender-percent :attrData="attrData" v-if="attrData && attrData.length != 0"></gender-percent>
					<p v-if="!(attrData && attrData.length != 0)" class="noData">暂无数据</p>
				</div>
				<div class="rowBlock">
					<h3>使用人群年龄占比</h3>
					<age-percent :attrData="attrData" :typeid="typeid" v-if="attrData && attrData.length != 0"></age-percent>
					<p v-if="!(attrData && attrData.length != 0)" class="noData">暂无数据</p>
				</div>
				<div class="rowBlock">
					<h3>使用区域占比</h3>
					<map-chart :attrData="attrData" v-if="attrData && attrData.length != 0"></map-chart>
					<p v-if="!(attrData && attrData.length != 0)" class="noData">暂无数据</p>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>

import MixChart from '@/components/MixChart'
import GenderPercent from '@/components/GenderPercent'
import AgePercent from '@/components/AgePercent'
import MapChart from '@/components/MapChart'
import { fetchMonthSpans,fetchOneData,fetchAttrlist,fetchLrr } from '@/store/api.js'


var classText = [
	{ name: 'first', pc: '月度覆盖人数', app: '月度独立设备数' },
	{ name: 'second', pc: '日均覆盖人数', app: '日均独立设备数' },
	{ name: 'third', pc: '月度浏览时间', app: '月度总有效时长' }
];
export default {
	mounted() {
		this.id = this.$route.query.id;
		this.typeid = this.$route.query.type;
		var type = this.typeid == 1 ? 'pc' : 'app';
		fetchMonthSpans(type).then(response=>{
			this.timeList = response;
			this.timeId = response[0].ID;
			fetchOneData({aid: this.id,tid: this.timeId}).then(response=>{
				this.itemInfo = response.Item;
			});
			fetchAttrlist({aid: this.id,tid: this.timeId,typeid: this.typeid}).then(response=>{
				this.attrData = response.List;
			});
			fetchLrr({id: this.id}).then(response=>{
				this.monthData = response;
			});
		});
		
	},
	data() {
		return {
			id: NaN,
			timeId: NaN,
			timeList: null,
			typeid: NaN,
			itemInfo: {},
			activeName: 'first',
			attrData: null,
			monthData: null,
			classText
		}
	},
	computed: {
		autoClassText() {
			if (this.typeid == 1) {
				return this.classText.map((item)=>{
					return {
						name: item.name,
						label: item.pc
					}
				});
			}else {
				return this.classText.map((item)=>{
					return {
						name: item.name,
						label: item.app
					}
				});
			}
		},
		icoUrl() {
			if (this.itemInfo.AppLogo) {
				return 'http://index.iresearch.com.cn/' + this.itemInfo.AppLogo;
			}
		},
		getShowData() {
			var data = this.itemInfo;
			var num = NaN;
			var postfix = '';
			var percent = '';
			var ico = '';
			var color = '';
			var isPC = this.$route.name == 'PCDetail' ? true : false;
			if (this.activeName == 'first') {
				num = data.UseNum;
				postfix =  isPC ? '（万人）' : '（万台）';
				percent = data.Growth;
			}else if (this.activeName == 'second') {
				num = data.DayMachineNum;
				postfix =  isPC ? '（万人）' : '（万台）';
				percent = data.DmGrowth;
			}else {
				num = data.UseTime;
				postfix = '（万小时）';
				percent = data.TimeGrowth;
			}
			color = percent>0 ? 'red':'green';
			ico =  percent>0 ? 'fa-long-arrow-up' : (percent<0 ? 'fa-long-arrow-down' : '');
			percent = (percent>0 ? '+'+ percent : percent) + '%';
			return { num,postfix,percent,ico,color };
		}
	},
	methods: {
		tabTime(timeId) {
			this.timeId = Number(timeId);
			fetchOneData({aid: this.id,tid: this.timeId}).then(response=>{
				this.itemInfo = response.Item;
			});
		},
	},
	components: {
		MixChart,
		GenderPercent,
		AgePercent,
		MapChart
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
.header {
	display: flex;
}
.header .ico {
	margin: auto 20px auto;
}
.header .ico img {
	border-radius: 10px;
	height: 100px;
}
.header h3 {
	font-size: 24px;
	font-weight: normal;
	line-height: 50px;
}
.header .other {
	display: flex;
	height: 50px;
	color: #666;
}
.header .other >* {
	margin: auto 20px auto 0;
	line-height: 50px;
}
.timeSelect {
	width: 120px;
}
.header .rank {
	display: flex;
}
.header .rank >* {
	margin: auto 0;
}
.dataShow {
	margin-left: 10px;
	display: flex;
	font-size: 20px;
	line-height: 30px;
}
.dataShow .postfix {
	margin: auto 10px 5px 0;
	font-size: 14px;
	line-height: 14px;
}
.rowBlock {
	padding: 20px 0;
}
.rowBlock>h3 {
	padding-left: 10px;
	font-size: 18px;
	line-height: 30px;
	font-weight: normal;
	border-left: 5px solid #69c72b;
}
.noData {
	text-align: center;
	line-height: 100px;
}
</style>
