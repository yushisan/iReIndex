<template>
	<div class="chart">
		<div class="chartGroup"></div>
		<i class="fa fa-fw fa-3x chartIco" :class="{[getCenterIco]: true}"></i>
	</div>
</template>


<script>

import echarts from 'echarts'

export default {
	props: ['data','activeName'],
	mounted() {
		this.myChart = echarts.init(this.$el.firstElementChild);
	},
	data() {
		return {
			chartSet: {
				color: ['#add532','#8dcb3a','#5fb738','#1ac7f3','#01afe6','#ffcf00']
			},
			myChart: null
		}
	},
	methods: {
		updateChart() {
			var legendData = [];
			var seriesData = [];
			for (var i = 0; i < 6; i++) {
				var data = this.top6[i];
				var color = this.chartSet.color[i];
				legendData[i] = ((data.BrandName=='苹果'? '':data.BrandName) + ' ' + data.ModelName);
				seriesData[i] = {
					value: (data.Percent*100).toFixed(2),
					name: legendData[i],
					itemStyle: {
						normal: {
							color: color,
							shadowColor: color,
							shadowBlur: 15
						}
					}
				};
			}
			var option = {
				title : {
					text: '移动设备指数',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a}<br/>{b} :&nbsp;&nbsp;{c}%"
				},
				legend: {
					x: '75%',
					y: 'center',
					itemWidth: 50,
					itemHeight: 20,
					borderRadius: 10,
					itemGap: 30,
					formatter: '{name}',
					textStyle: {
						lineHeight: 20,
						fontSize: 14,
						padding: [0,0,0,10]
					},
					orient: 'vertical',
					data: legendData
				},
				calculable : true,
				series : [
					{
						name:'覆盖率',
						type:'pie',
						radius : ['15%', '70%'],
						center : ['35%', '55%'],
						roseType : 'area',
						data: seriesData
					}
				]
			};
			this.myChart.setOption(option,true);
		}
	},
	computed: {
		top6() {
			if (this.data) {
				return this.data.filter((item,index)=>{
					if (index<6) {
						return true;
					}
				});
			};
		},
		getCenterIco() {
			if (this.activeName == 'iOS') {
				return 'fa-apple';
			}else {
				return 'fa-android';
			}
		}
	},
	watch: {
		data() {
			this.updateChart();
		}
	}
}
</script>


<style scoped>
.chart {
	position: relative;
}
.chartGroup {
	width: 100%;
	height: 100%;
}
.chartIco {
	position: absolute;
	left: 35%;
	top: 55%;
	color: #ccc;
	text-shadow: 0 0 2px #ccc;
	transform: translate(-50%,-50%);
}
</style>
