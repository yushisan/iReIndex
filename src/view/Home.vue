<template>
	<div>
		<div class="row">
			<data-counter style="flex: 1"></data-counter>
		</div>
		<div class="row">
			<card-carousel style="flex: 1;" class="cardCarousel"></card-carousel>
		</div>
		<div class="row classGroup">
			<div>
				<header :style="{backgroundColor: items[0].themeColor}">
					<i class="fa fa-mobile fa-fw fa-2x"></i>
					App指数
				</header>
				<P>
					<span class="rank">排名</span>
					<span class="name">应用</span>
					<span class="index">月度独立设备(万台)</span>
				</p>
				<ul>
					<router-link tag="li" :to="getPath(item)" v-for="(item,index) in indexData.app" :key="item.id">
						<span class="rank">{{index+1}}</span>
						<span class="name" :title="item.AppName">
							<img :src="icoUrl(item.AppLogo)">
							{{item.AppName}}
						</span>
						<span class="index">{{item.UseNum}}</span>
					</router-link>
				</ul>
			</div>
			<div>
				<header :style="{backgroundColor: items[1].themeColor}">
					<i class="fa fa-desktop fa-fw fa-2x"></i>
					PC指数
				</header>
				<P>
					<span class="rank">排名</span>
					<span class="name">网站</span>
					<span class="index">月度覆盖人数(万人)</span>
				</p>
				<ul>
					<router-link tag="li" :to="getPath(item)" v-for="(item,index) in indexData.pc" :key="item.id">
						<span class="rank">{{index+1}}</span>
						<span class="name" :title="item.AppName">
							<img :src="icoUrl(item.AppLogo)">
							{{item.AppName}}
						</span>
						<span class="index">{{item.UseNum}}</span>
					</router-link>
				</ul>
			</div>
			<div class="lastNot">
				<header :style="{backgroundColor: items[2].themeColor}">
					<i class="fa fa-android fa-fw fa-2x"></i>
					设备指数
				</header>
				<P>
					<span class="rank">排名</span>
					<span class="name">品牌</span>
					<span class="index">覆盖率</span>
				</p>
				<ul>
					<li v-for="(item,index) in indexData.device" :key="item.id">
						<span class="rank">{{index+1}}</span>
						<span class="name" :title="item.BrandName">
							<img :src="icoUrl(item.Logo)">
							{{item.BrandName}}
						</span>
						<span class="index">{{(item.Percent*100).toFixed(2)+'%'}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<el-card class="box-card about">
				<header>关于艾瑞</header>
				<p>艾瑞数据基于十五年互联网的研究积累，致力于数据改变认知、提升企业效能，为客户提供基于情报+数据+服务的多元化大数据解决方案，服务涵盖市场竞争监测、消费者洞察、营销决策、企业精细化运营及数据共享等业务。</p>
			</el-card>
		</div>
	</div>
</template>

<script>
import DataCounter from '@/components/DataCounter'
import CardCarousel from '@/components/CardCarousel'
import MyFooter from '@/components/MyFooter'

import { fetchTopDatalist,fetchMonthSpans,fetchDataWeek,fetchBrandData,fetchDeviceData } from '@/store/api.js'

let items = [
	{title: 'APP指数排名', ico: 'fa-mobile', themeColor: '#8bc43f', itemNames: ['排名','应用','类别']},
	{title: '网站流量排名', ico: 'fa-desktop', themeColor: '#1fc8f3', itemNames: ['排名','网站','类别']},
	{title: '手机品牌排名', ico: 'fa-android', themeColor: '#ff6b46', itemNames: ['排名','品牌','覆盖率']},
	// {title: '广告投放排名', ico: 'fa-dollar', themeColor: '#dd679e', itemNames: ['排名','品牌','费用指数']},
];


export default {
	mounted() {
		fetchMonthSpans('pc').then(response=>{
			var timeId = Number(response[0].ID);
			fetchTopDatalist({type: 'pc',timeId: timeId,dataNum: 10}).then(response=>{
				this.indexData.pc = response.List;
			});
		});
		fetchMonthSpans('app').then(response=>{
			var timeId = Number(response[0].ID);
			fetchTopDatalist({type: 'app',timeId: timeId,dataNum: 10}).then(response=>{
				this.indexData.app = response.List;
			});
		});
		fetchDataWeek().then(response=>{
			var dataWeek = String(response);
			fetchBrandData({week: dataWeek,topNum: 10}).then(response=>{
				this.indexData.device = response.List;
			});
		});
	},
	data() {
		return {
			items,
			indexData: {
				pc: null,
				app: null,
				device: null
			}
		}
	},
	methods: {
		icoUrl(url) {
			if (url) {
				return 'http://index.iresearch.com.cn' + url;
			}
		},
		getPath(item) {
			if (item.AppType == 1) {
				return '/PC/detail?type=' + item.AppType + '&id=' + item.Appid;
			}else {
				return '/App/detail?type=' + item.AppType + '&id=' + item.Appid;
			}
			// return '/detail?type=' + item.AppType + '&id=' + item.Appid;
		}
	},
	components: {
		DataCounter,
		CardCarousel,
		MyFooter
	}
}
</script>

<style scoped>
.row {
	width: 100%;
	display: flex;
	justify-content: space-around;
	max-width: 1300px;
	margin: 0 auto;
}
.box-card {
	flex: 1;
	margin: 5px;
}
.cardCarousel {
	 margin: 10px 30px 0;
}
.about {
	height: 460px;
	background: url('../../static/img/banner.png') no-repeat 90% center;
	background-color: #00afe6;
}
.about header,
.about p {
	width: 40%;
	color: #fff;
}
.about header {
	font-size: 40px;
	line-height: 200px;
}
.about p {
	text-indent: 2em;
	line-height: 30px;
}
.classGroup header {
	line-height: 50px;
	color: #fff;
	font-weight: bold;
	border-radius: 5px 5px 0 0;
}
.classGroup header i {
	margin: 0 10px;
	vertical-align: middle;
}
.classGroup>div {
	margin: 0 30px 5px;
	padding-bottom: 20px;
	border-radius: 0 0 5px 5px;
	flex: 1;
	font-size: 16px;
	background: #fff;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
.classGroup>div p {
	display: flex;
	padding: 0 10px;
	border-bottom: 1px solid #ccc;
	line-height: 40px;
	text-align: center;
}
.classGroup ul {
	background: #ccc;
}
.classGroup li {
	display: flex;
	padding: 0 10px;
	text-align: center;
	line-height: 50px;
	background: #fff;
	transition: .3s;
	cursor: pointer;
}
.classGroup>div:not(.lastNot) li:hover {
	transform: translateX(-5px) translateY(-3px);
	box-shadow: 0 0 3px #000;
}
.rank {
	width: 40px
}
.name {
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.index {
	flex: 1;
}
.classGroup ul .name {
	text-align: left;
	text-indent: 2em;
}
.name img {
	vertical-align: middle;
	width: 40px;
	margin-right: 5px;
	border-radius: 5px;
}
.aaa {
	background: yellow;
	color: red;
}
</style>
