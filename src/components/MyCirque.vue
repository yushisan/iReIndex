<template>
	<div class="chart">
		<div class="chartGroup"></div>
		<div class="chartInfo">
			<p v-for="(item,index) in top3" :key="index"
			:style="getStyle(index)">
				<img :src="getIcoUrl(item)" class="ico">
				<span class="name">{{item.BrandName}}</span>
				<span class="percent">{{getPercent(item)+'%'}}</span>
			</p>
		</div>
	</div>
</template>

<script>

import echarts from 'echarts'

export default {
	props: ['data'],
	mounted() {
		this.myChart = echarts.init(this.$el.firstElementChild);
	},
	data() {
		return {
			chartSet: {
				color: ['#add532','#8dcb3a','#1bc8f4'],
				center: [
					['20%', '45%'],
					['50%', '45%'],
					['80%', '45%']
				]
			},
			myChart: null
		}
	},
	methods: {
		getIcoUrl(item) {
			if (item.Logo) {
				return 'http://index.iresearch.com.cn/' + item.Logo;
			}
		},
		getStyle(index) {
			return {
				left: this.chartSet.center[index][0],
				top: this.chartSet.center[index][1],
				color: this.chartSet.color[index]};
		},
		getPercent(item) {
			return (item.Percent*100).toFixed(2);
		},
		updateChart() {
			var chartSet = this.chartSet;
			var otherItemStyle = {
				normal: {
					color: 'rgba(0,0,0,.15)',
				},
				emphasis: {
					color: 'rgba(0,0,0,.15)'
				}
			};
			var commonBabel = {
				normal: {
					position: 'center',
				}
			};
			var series = [];
			for (var i = 0; i < 3; i++) {
				var percent = this.getPercent(this.top3[i]);
				series[i] = {
					type:'pie',
					radius: ['36%', '40%'],
					center: chartSet.center[i],
					hoverAnimation: false,
					data: [
						{
							value: percent,
							label: commonBabel,
							itemStyle: {
								normal: {
									color: chartSet.color[i],
									shadowColor: chartSet.color[i],
									shadowBlur: 5
								},
								emphasis: {
									color: chartSet.color[i],
								}
							}
						},
						{
							value: 100 - percent,
							label: commonBabel,
							itemStyle: otherItemStyle
						}
					]
				}
			}
			var option = {
				title : {
					text: '移动设备指数',
					subtext: `厂商品牌排名（Top3）`,
					x:'center'
				},
				series
			};
			this.myChart.setOption(option);
		}
	},
	computed: {
		top3() {
			if (this.data) {
				return this.data.filter((item,index)=>{
					if (index<3) {
						return true;
					}
				});
			};
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
.chart p {
	position: absolute;
	transform: translate(-50%, -50%);
}
.chart p>* {
	display: block;
	text-align: center;
}
.chart .ico {
	width: 90px;
}
.chart .percent {
	position: absolute;
	left: 0;
	top: 200px;
	width: 100%;
	font-size: 30px;
	line-height: 50px;
}
</style>

