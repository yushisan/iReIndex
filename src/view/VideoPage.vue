<template>
	<div>
		<div class="row">
			<div class="banner">
				<header>网络影视指数</header>
			</div>
		</div>
		<div class="row">
			<el-card class="box-card">
				<div class="row">
					<div class="tabs">
						<el-tabs v-model="activeName">
							<el-tab-pane label="全部" name="all"></el-tab-pane>
							<el-tab-pane label="移动端" name="mobile"></el-tab-pane>
							<el-tab-pane label="PC端" name="PC"></el-tab-pane>
							<el-tab-pane label="OTT端" name="OTT"></el-tab-pane>
						</el-tabs>
					</div>
				</div>
				<div class="row" style="position: relative">
					<el-select v-model="timeId" placeholder="请选择" @change="tabTime" class="timeSelect">
						<el-option v-for="item in timeList" :key="item.ID"
						:label="item.TimeName" :value="item.ID"></el-option>
					</el-select>
				</div>
				<div class="row">
					<ul class="classGroup">
						<li class="classItem" v-for="item in items" :key="item.id"
						:style="{borderColor: item.themeColor}">
							<h3 class="header" :style="{color: item.themeColor}">
								<span>
									<i class="fa fa-fw" :class="{[item.ico]: true}"></i>
									{{item.title}}
								</span>
								<span>More</span>
							</h3>
							<ol class="list">
								<li class="listItem" v-for="(data,index) in dataList[item.name]" :key="data.id">
									<span class="rank">
										<i :style="getColor(index,item)">{{index+1}}</i>{{data.mName}}
									</span>
									<span>{{data.UV}}</span>
								</li>
							</ol>
						</li>
					</ul>
				</div>
			</el-card>
		</div>
		<div class="row">
			<el-card class="box-card about">
				<header>研究方法及原理</header>
				<p>iVideoTracker网络视频市场监测由艾瑞咨询自主研发，是基于庞大的网民网络视频收视行为监测所建立的数据库 该数据库运营自2011年开始，收集用户对视频内容的浏览行为记录，提供国内主流视频媒体各视频类别 视频影片的收视情况及收视人群分布数据，真实反映中国互联网在线视频市场客观情况。</p>
			</el-card>
		</div>
	</div>
</template>

<script>
import MyFooter from '@/components/MyFooter'

let items = [
	{title: '电影指数（万台）', ico: 'fa-film', themeColor: '#8ec63f', name: 'filmList'},
	{title: '电视剧指数（万台）', ico: 'fa-tv', themeColor: '#ff6b46', name: 'teleplayList'},
	{title: '综艺指数（万台）', ico: 'fa-yelp', themeColor: '#1fc8f3', name: 'varietyList'},
	{title: '动漫指数（万台）', ico: 'fa-ge', themeColor: '#fdb916', name: 'animationList'},
];

import { fetchMonthSpans,fetchVideoDatalist } from '@/store/api.js'


export default {
	mounted() {
		fetchMonthSpans('video').then(response=>{
			this.timeList = response;
			this.timeId = Number(response[0].ID);
			for (let i = 0; i<4; i++) {
				fetchVideoDatalist({type: 'video',classId: i+1}).then(response=>{
					this.dataList[this.items[i].name] = response.List;
				});
			}
		});
	},
	data() {
		return {
			timeId: NaN,
			timeList: null,
			activeName: 'all',
			items,
			dataList: {
				filmList:null,
				teleplayList: null,
				varietyList: null,
				animationList: null
			},
			deviceTypeId: 1
		}
	},
	methods: {
		tabTime(timeId) {
			this.timeId = Number(timeId);
			for (let i = 0; i<4; i++) {
				fetchVideoDatalist({type: 'video',classId: i+1,timeId: this.timeId}).then(response=>{
					this.dataList[this.items[i].name] = response.List;
				});
			}
		},
		getColor(index,item) {
			return {color: index < 3 ? '#fff' : '', backgroundColor: index < 3 ? item.themeColor : ''}
		}
	},
	watch: {
		activeName() {
			if (this.activeName == 'all') {
				this.deviceTypeId = 1;
			}else if (this.activeName == 'mobile') {
				this.deviceTypeId = 2;
			}else if (this.activeName == 'PC') {
				this.deviceTypeId = 3;
			}else {
				this.deviceTypeId = 4;
			}
			for (let i = 0; i<4; i++) {
				fetchVideoDatalist({type: 'video',classId: i+1,deviceTypeId: this.deviceTypeId}).then(response=>{
					this.dataList[this.items[i].name] = response.List;
				});
			}
		},
	},
	components: {
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
.timeSelect {
	position: absolute;
	top: 0;
	right: 10px;
	transform: translateY(-60px);
}
.classGroup {
	display: flex;
	justify-content: space-around;
	margin-top: 20px;
	width: 100%;
}
.classItem {
	border-top: 5px solid #000;
	flex: 1;
	margin: 0 15px;
	padding: 0 10px 20px;
	border-radius: 4px;
	box-shadow: 0 0 2px #d1dbe5;
	cursor: pointer;
}
.classItem:hover {
	box-shadow: 0 0 2px #d1dbe5, 0 2px 4px rgba(0,0,0,.4), 0 0 6px 0 rgba(0,0,0,.2);
}
.classItem .header {
	font-size: 16px;
	font-weight: normal;
	line-height: 40px;
	display: flex;
	justify-content: space-between;
}
.list {
	margin-top: 10px;
}
.listItem {
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #d1dbe5;
	line-height: 40px;
	font-size: 14px;
	color: #444;
}
.listItem .rank {
	display: flex;
}
.rank i {
	margin: auto 10px auto 0;
	vertical-align: top;
	display: inline-block;
	width: 20px;
	border-radius: 3px;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
}
.about {
	height: 460px;
	text-align: center;
	background: url('../../static/img/aboutVideo.png') no-repeat center 90%;
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
.banner {
	flex: 1;
	margin: 0px 5px 5px;
	padding: 10px 15%;
	border: 1px solid #d1dbe5;
    border-radius: 4px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	background: linear-gradient(45deg,#127CE7 0,#4AD89C 100%);
}
.banner header {
	line-height: 200px;
	font-size: 50px;
	text-align: center;
	color: #fff;
	background: url('../../static/img/head-bg.png') left center no-repeat;
}
</style>

