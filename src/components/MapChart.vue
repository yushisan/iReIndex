<template>
	<div class="myChart"></div>
</template>


<script>

import echarts from 'echarts'
import 'echarts/map/js/china.js'

export default {
	props: ['attrData'],
	mounted() {
		var myChart = echarts.init(this.$el);
		var max = 0;
		var mapData = this.filterData.map((item)=>{
			max = Math.max(max,item.Proportion);
			return {
				name: item.TypeName,
				value: item.Proportion
			}
		});
		mapData.push({name:"南海诸岛",value:0,itemStyle:{normal:{opacity:0,label:{show:false}}}});
		var yData = this.filterData.map((item,index)=>{
			if (index < 10) {
				return {
					value: index+1 + '. ' + item.TypeName
				}
			};
		});
		var color = ['#b3d332','#8bc53e','#66af44','#20c9f3','#00afe1','#f59b9b','#f48387','#fff500','#ffcf00','#adadad'];
		var barData = this.filterData.map((item,index)=>{
			if (index < 10) {
				return {
					value: item.Proportion,
					itemStyle: {
						normal: {
							color: color[index],
							width: 10
						}
					}
				}
			};
		});
		barData.push({value:0, itemStyle:{ normal:{opacity:0,label:{show:false}}}});
		var option = {
			tooltip : {
				trigger: 'item',
				formatter : function (params) {
					return params.name + ' : ' + (params.value? params.value+'%' : '未录入');
				}
			},
			toolbox: {
				show : true,
				orient : 'vertical',
				right: 30,
				top: 'top',
				feature : {
					mark : {show: true},
					dataView : {show: false, readOnly: true},
					restore : {show: false},
					saveAsImage : {show: true}
				}
			},
			grid: {
				right: 100,
				top: 60,
				bottom: 40,
				width: '20%'
			},
			xAxis: {
				type: 'value',
				show: false,
				position: 'top',
				boundaryGap: false,
				splitLine: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					margin: 2,
					textStyle: {
						color: '#aaa'
					}
				}
				
			},
			yAxis: {
				type: 'category',
				position: 'left',
				min: 0,
				max: 9,
				inverse: true,
				axisLabel: {
					margin: 20,
					show: true,
					interval: 0,
					textStyle: {
						color: '',
						fontSize: 16
					}
				},
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				zlevel: 2,
				data: yData
			},
			visualMap: {
				show: false,
				min: 0,
				max: max,
				type: 'continuous',
				inRange: {
					color: ['yellow','green']
				},
				seriesIndex: 0
			},
			series : [
				{
					type: 'map',
					mapType: 'china',
					left: '15%',
					roam: true,
					itemStyle: {
						normal:{label:{show:true}}
					},
					data: mapData
				},
				{
					id: 'bar',
					type: 'bar',
					symbol: 'none',
					barWidth: 20,
					zlevel: 2,
					itemStyle:{
						normal:{
							barBorderRadius: 5,
							label:{
								show:true,
								position: 'right',
								color: '#000',
								formatter: '{c}%',
							},
							color: 'red'
						}
					},
					data: barData
				}
			]
		};
		myChart.setOption(option);
	},
	computed: {
		filterData() {
			return this.attrData.filter((item)=>{
				if (item.RootType == 3) {
					return true;
				}
			});
		}
	}
}
</script>
<style scoped>
.myChart {
	height: 500px;
	margin-top: 10px;
	border: 1px dashed rgba(0, 0, 0, .1);
}
</style>
