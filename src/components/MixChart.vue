<template>
	<div class="chart"></div>
</template>


<script>

import echarts from 'echarts'

var title = {
	first: ['月度独立设备数','月度覆盖人数'],
	second: ['日均独立设备数','日均覆盖人数'],
	third: ['月度总有效时长','月度浏览时间']
};

export default {
	props: ['timeList','monthData','activeName','typeid'],
	mounted() {
		this.timeData = this.timeList.map((item)=>{
			return item.TimeName;
		});
		

		this.myChart = echarts.init(this.$el);
		this.updateChart();
	},
	data() {
		return {
			title,
			timeData: null
		}
	},
	computed: {
		postfix() {
			if (this.activeName == 'third') {
				return '万小时';
			}else {
				if (this.typeid == 1) {
					return '万人';
				}else {
					return '万台';
				}
			}
		}
	},
	methods: {
		updateChart() {
			var postfix = this.postfix;
			var timeData = this.timeData;
			var data = this.monthData.map((item)=>{
				if (this.activeName == 'first') {
					return item.UseNum;
				}else if (this.activeName == 'second') {
					return item.DayMachineNum;
				}else {
					return item.UseTime;
				}
			}).reverse();
			var percent = this.monthData.map((item)=>{
				if (this.activeName == 'first') {
					return item.Growth;
				}else if (this.activeName == 'second') {
					return item.DmGrowth;
				}else {
					return item.TimeGrowth;
				}
			}).reverse();
			var classTitle = this.title[this.activeName][this.typeid];
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
				toolbox: {
					right: 30,
					itemGap: 20,
					orient: 'vertical',
					feature: {
						dataView: {show: true, readOnly: false},
						saveAsImage: {show: true}
					}
				},
				legend: {
					data:[classTitle,'环比增幅（%）']
				},
				xAxis: [
					{
						type: 'category',
						data: timeData,
						axisPointer: {
							type: 'shadow'
						},
						inverse: true,
						axisLabel: {
							rotate : 30,
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
						data: data,
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
						data: percent
					}
				]
			};
			this.myChart.setOption(option);
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
.chart {
	width: 100%;
	height: 400px;
}
</style>

