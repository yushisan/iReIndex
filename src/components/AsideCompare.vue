<template>
	<div>
		<div class="asideBar" :class="{'show': isShow}">
			<header>
				{{type}}对比
				<span class="closeBtn" @click="close">
					<i class="fa fa-window-close fa-fw"></i>
				</span>
			</header>
			<ul class="content">
				<li v-for="(item,index) in checkGroup" :key="item.id">
					<img :src="'http://index.iresearch.com.cn/'+item.AppLogo" class="ico">
					<span class="name" :title="item.AppName">{{item.AppName}}</span>
					<i class="fa fa-times-circle fa-fw fa-lg close" @click="delet(index)"></i>
				</li>
			</ul>
			<p class="infoTitle" v-show="value.length < 2">请至少添加两个选项</p>
			<footer>
				<span class="compareBtn" @click="showCompar">{{`对比（${checkGroup.length}/5）`}}</span>
				<span class="toEmpty" @click="clearAll">一键清空</span>
			</footer>
		</div>
		<div class="compareBar" :class="{'show': isShowCompar}">
			<div class="wrap">
				<header>
					{{type}}数据对比图例
					<span class="closeBtn" @click="closeCompar">
						<i class="fa fa-window-close fa-fw fa-lg"></i>
					</span>
				</header>
				<div class="selectBar">
					<el-select v-model="activeName" placeholder="请选择">
						<el-option
						v-for="item in classText"
						:key="item.name"
						:label="item[toEnType]"
						:value="item.name">
						</el-option>
					</el-select>
					<el-select v-model="timeId" placeholder="请选择" @change="tabTime">
						<el-option v-for="item in timeList" :key="item.ID"
						:label="item.TimeName" :value="item.ID"></el-option>
					</el-select>
				</div>
				<div class="chart"></div>
			</div>
		</div>
	</div>
	
</template>

<script>

import echarts from 'echarts'
import { fetchMonthSpans,fetchOneData } from '@/store/api.js'

var classText = [
	{ name: 'first', pc: '月度覆盖人数', app: '月度独立设备数' },
	{ name: 'second', pc: '日均覆盖人数', app: '日均独立设备数' },
	{ name: 'third', pc: '月度浏览时间', app: '月度总有效时长' }
];
export default {
	props: ['value','checkGroup','type'],
	mounted() {
		this.myChart = echarts.init(this.$el.querySelector('.chart'));

		fetchMonthSpans(this.toEnType).then(response=>{
			this.timeList = response;
			this.timeId = response[0].ID;
		
		});
	},
	data() {
		return {
			isShowCompar: false,
			isShow: false,
			classText,
			activeName: 'first',
			// orderBy: 2,
			timeId: NaN,
			timeList: null,
			dataList: null,
			myChart: null,
			percentName: '',
			dataName: ''

		}
	},
	computed: {
		toEnType() {
			if (this.type == '应用') {
				return 'app';
			}else {
				return 'pc';
			}
		},
		postfix() {
			if (this.activeName == 'third') {
				return '万小时';
			}else {
				if (this.toEnType == 'pc') {
					return '万人';
				}else {
					return '万台';
				}
			}
		}
	},
	methods: {
		show() {
			this.isShow = true;
		},
		close() {
			this.isShow = false;
		},
		delet(index) {
			var newArr = this.value.filter((item,i)=>{
				if (index != i) {
					return true;
				}
			});
			this.$emit('input',newArr);
		},
		clearAll() {
			this.$emit('input',[]);
		},
		tabTime(timeId) {
			this.timeId = Number(timeId);

			this.checkGroup.forEach((item,index)=>{
				fetchOneData({aid: item.Appid,tid: this.timeId}).then(response=>{
					this.dataList[index] = response.Item;
					if (index == this.checkGroup.length-1) {
						//这里有个BUG，如果没有定时器的话就会渲染数据失败，部分数据出现 undefined 
						//莫非是数据没能请求完？不可能啊
						//2017-9-26
						setTimeout(()=>{
							this.updateChart();
						},50);
					}
				});
			});
		},
		showCompar() {
			if (this.checkGroup.length>1) {
				this.isShowCompar = true;
			}

			
			this.dataList = [];
			this.checkGroup.forEach((item,index)=>{
				fetchOneData({aid: item.Appid,tid: this.timeId}).then(response=>{
					this.dataList[index] = response.Item;
					if (index == this.checkGroup.length-1) {
						//这里有个BUG，如果没有定时器的话就会渲染数据失败，部分数据出现 undefined 
						//莫非是数据没能请求完？不可能啊
						//2017-9-26
						setTimeout(()=>{
							this.updateChart();
						},50);
					}
				});
			});


		},
		closeCompar() {
			this.isShowCompar = false;
		},
		updateChart() {
			var classTitle = '';
			this.classText.forEach(item=>{
				if (this.activeName == 'first') {
					classTitle = this.classText[0][this.toEnType];
				}else if (this.activeName == 'second') {
					classTitle = this.classText[1][this.toEnType];
				}else {
					classTitle = this.classText[2][this.toEnType];
				}
			});
			var postfix = this.postfix;
			var barName = this.dataList.map(item=>{
				return item.AppName;
			});
			var barData = this.dataList.map(item=>{
				if (this.activeName == 'first') {
					return item.UseNum;
				}else if (this.activeName == 'second') {
					return item.DayMachineNum;
				}else {
					return item.UseTime;
				}
			});
			var lineData = this.dataList.map(item=>{
				if (this.activeName == 'first') {
					return item.Growth;
				}else if (this.activeName == 'second') {
					return item.DmGrowth;
				}else {
					return item.TimeGrowth;
				}
			});
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				grid: {
					left: '15%',
					right: '10%'
				},
				legend: {
					data:[classTitle,'环比增幅（%）']
				},
				xAxis: [
					{
						type: 'category',
						data: barName,
						axisPointer: {
							type: 'shadow'
						},
						axisLabel: {
							interval: 0
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						name: classTitle,
						axisLabel: {
							formatter: '{value} ' + postfix
						},
						splitLine: {
							lineStyle: {
								// color: '#b2d234'
							}
						}
					},
					{
						type: 'value',
						name: '环比增幅（%）',
						axisLabel: {
							formatter: '{value}%'
						},
						splitLine: {
							lineStyle: {
								// color: '#1ec8f3',
								type: 'dashed'
							}
						}
					}
				],
				series: [
					{
						name: classTitle,
						type: 'bar',
						barCategoryGap: '50%',
						data: barData,
						itemStyle: {
							normal: {
								color: '#b2d234',
								barBorderRadius: [5,5,0,0]
							}
						},
					},
					{
						name: '环比增幅（%）',
						type: 'line',
						smooth: true,
						itemStyle: {
							normal: {
								color: '#1ec8f3'
							}
						},
						yAxisIndex: 1,
						data: lineData
					}
				]
			};
			this.myChart.setOption(option,true);
		}
	},
	watch: {
		activeName() {
			this.updateChart();
		}
	}
}
</script>

<style scoped>
.asideBar {
	position: fixed;
	right: -300px;
	top: 50%;
	transform: translateY(-50%);
	width: 250px;
	border-radius: 5px;
	background: #fff;
	box-shadow: 0 0 3px #000;
	z-index: 99;
	transition: .5s;
}
.asideBar.show {
	right: 40px;
}
.asideBar header {
	position: relative;
	text-align: center;
	font-size: 16px;
	line-height: 40px;
	color: #fff;
	background: #8bc43f;
}
.closeBtn {
	position: absolute;
	right: 0;
	top: 0;
	width: 30px;
	color: #eee;
	cursor: pointer;
}
.closeBtn i:hover {
	color: #fff;
}
.asideBar footer {
	display: flex;
	padding: 15px 20px;
	border-top: 1px solid #ccc;
}
.asideBar footer span {
	flex: 1;
	padding: 0 10px;
	border-radius: 5px;
	font-size: 14px;
	line-height: 30px;
	text-align: center;
	cursor: pointer;
	
}
.compareBtn {
	background: #8bc43f;
	color: #fff;
}
.compareBtn:hover {
	opacity: .9;
}
.toEmpty {
	color: #8bc43f;
}
.toEmpty:hover {
	text-decoration: underline;
}
.content {
	/* overflow: hidden; */
	background: #ccc;
}
.content li {
	display: flex;
	height: 60px;
	line-height: 60px;
	background: #fff;
	transition: .3s;
	cursor: default;
}
.content li:hover {
	transform: translateX(-5px) translateY(-2px);;
	box-shadow: 0 0 3px #000;
	
}
.content .ico {
	height: 40px;
	border-radius: 5px;
	margin: auto 10px;
}
.content .name {
	flex: 1;
	color: #aaa;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.content .close {
	margin: auto 10px;
	cursor: pointer;
	color: #ccc;
}
.content .close:hover {
	color: red;
}
.infoTitle {
	border-top: 1px solid #ccc;
	line-height: 100px;
	color: #aaa;
	text-align: center;
}
.compareBar {
	position: fixed;
	display: flex;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, .5);
	z-index: 999;
	transform: scale(0);
}
.compareBar.show {
	transform: scale(1);
}
.wrap {
	margin: auto;
	width: 900px;
	border-radius: 5px;
	background: #fff;
	box-shadow: 0 0 3px #000;
	overflow: hidden;
	transform: scale(0);
	transition: .3s;
}
.compareBar.show .wrap {
	transform: scale(1);
}
.compareBar header {
	position: relative;
	line-height: 40px;
	text-align: center;
	color: #fff;
	background: #b2d234;
}
.compareBar header .closeBtn {
	width: 40px;
}
.compareBar .chart {
	height: 400px;
}
.selectBar {
	padding: 10px 0 10px 20px;
	text-align: center;
}
</style>

