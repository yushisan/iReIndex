<template>
	<div>
		<div class="row">
			<top-banner style="flex: 1" :pic="bgUrl"></top-banner>
		</div>
		<div class="row">
			<el-card class="box-card">
				<div class="tabs">
					<el-tabs v-model="activeName">
						<el-tab-pane label="月度覆盖人数" name="first"></el-tab-pane>
						<el-tab-pane label="日均覆盖人数" name="second"></el-tab-pane>
						<el-tab-pane label="月度浏览时间" name="third"></el-tab-pane>
					</el-tabs>
				</div>
				<div class="row" style="position: relative">
					<el-input placeholder="网站" icon="search" class="searchBar"
					v-model.lazy="searchVal" :on-icon-click="handleIconClick"></el-input>
				</div>
				<select-tab class="selectTab" :data="selectItems"
				:selectNum.sync="selectNum" :startId="startId"></select-tab>
				<el-select v-model="timeId" placeholder="请选择" @change="tabTime" class="timeSelect">
					<el-option v-for="item in timeList" :key="item.ID"
					:label="item.TimeName" :value="item.ID"></el-option>
				</el-select>
				<info-list class="dataList" :data="listData" :type="listTypeName" :orderBy="orderBy" v-model="isLoading" :msgNum="msgNum" :searchVal="searchVal"></info-list>
			</el-card>
		</div>
	</div>
</template>

<script>
import TopBanner from '@/components/TopBanner'
import SelectTab from '@/components/SelectTab'
import InfoList from '@/components/InfoList'
import MyFooter from '@/components/MyFooter'

import { fetchTabClasses,fetchTopDatalist,fetchDatalist,fetchMonthSpans } from '@/store/api.js'


export default {
	mounted() {
		fetchMonthSpans('pc').then(response=>{
			this.timeList = response;
			this.timeId = Number(response[0].ID);
			fetchTopDatalist({type: 'pc',timeId: this.timeId}).then(response=>{
				this.listData = response.List;
				this.msgNum = Number(response.Msg);
			});

		});
		fetchTabClasses(167).then(response=>{
			this.selectItems = response;
		});
	},
	data() {
		return {
			timeId: NaN,
			timeList: null,
			startId: 168,
			bgUrl: 'static/img/banner-pc.jpg',
			activeName: 'first',
			selectItems: null,
			listData: null,
			listTypeName: '网站',
			orderBy: 2,
			isLoading: false,
			pageIndex: 1,
			selectNum: {num: 0, subNum: 0},
			msgNum: 0,
			searchVal: ''
		}
	},
	watch: {
		activeName() {
			this.pageIndex = 1;
			if (this.activeName == 'first') {
				this.orderBy = 2;
			}else if (this.activeName == 'second') {
				this.orderBy = 10;
			}else {
				this.orderBy = 6;
			}
			fetchTopDatalist({type: 'pc',pageIndex: this.pageIndex,orderBy: this.orderBy,classId: this.selectNum.num,classLevel: this.selectNum.subNum,timeId: this.timeId,name: this.searchVal}).then(response=>{
				this.listData = response.List;
				this.msgNum = Number(response.Msg);
			});
		},
		isLoading() {
			if (this.isLoading) {
				this.pageIndex++;
				fetchDatalist({type: 'pc',pageIndex: this.pageIndex,orderBy: this.orderBy,classId: this.selectNum.num,classLevel: this.selectNum.subNum,timeId: this.timeId,name: this.searchVal}).then(response=>{
					this.listData = this.listData.concat(response.List);
					this.msgNum = Number(response.Msg);
					this.isLoading = false;
				});
			}
		},
		selectNum() {
			this.searchVal = '';
			this.pageIndex = 1;
			fetchDatalist({type: 'pc',orderBy: this.orderBy,classId: this.selectNum.num,classLevel: this.selectNum.subNum,timeId: this.timeId}).then(response=>{
				this.listData = response.List;
				this.msgNum = Number(response.Msg);
			});
		}
	},
	methods: {
		tabTime(timeId) {
			this.timeId = Number(timeId);
			fetchDatalist({type: 'pc',orderBy: this.orderBy,classId: this.selectNum.num,classLevel: this.selectNum.subNum,timeId: this.timeId,name: this.searchVal}).then(response=>{
				this.listData = response.List;
				this.msgNum = Number(response.Msg);
			});
		},
		handleIconClick() {
			this.pageIndex = 1;
			fetchDatalist({type: 'pc',orderBy: this.orderBy,classId: this.selectNum.num,classLevel: this.selectNum.subNum,timeId: this.timeId,name: this.searchVal}).then(response=>{
				this.listData = response.List;
				this.msgNum = Number(response.Msg);
			});
		}
	},
	components: {
		TopBanner,
		SelectTab,
		InfoList,
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
.tabs,
.selectTab,
.timeSelect,
.dataList {
	margin: 0 20px;
}
.dataList {
	margin-top: 20px;
}
.moreList {
	margin-top: 20px;
	text-align: center;
	font-size: 16px;
	line-height: 20px;
}
.searchBar {
	position: absolute;
	top: 0;
	right: 30px;
	width: 300px;
	transform: translateY(-60px);
}
</style>


