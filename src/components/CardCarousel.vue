<template>
	<el-carousel :interval="2000" type="card" height="200px" trigger="click">
		<el-carousel-item v-for="(item,index) in items" :key="item.id" class="carouselItem">
			<div :style="getImgStyle(item)" class="img"></div>
			<div class="text" :style="{borderColor: item.themeColor}">
				<h3 class="title">{{item.title}}</h3>
				<p class="subtitle">{{item.subtitle}}</p>
				<p class="en">{{item.en}}</p>
				<router-link :to="item.path" class="detail"
				:style="getDetailStyle(item,index,btnIndex)"
				@mouseover.native="hoverIn(index)"
				@mouseout.native="hoverOut" tag="span">查看详情</router-link>
			</div>
		</el-carousel-item>
	</el-carousel>
</template>

<script>
let items = [
	{title: 'APP指数', path: '/App', subtitle: '移动用户行为洞察', en: 'Mobile User Behavior Insight', url: 'static/img/pic-item0.png', themeColor: '#8bc43f'},
	{title: 'PC指数', path: '/PC', subtitle: '网站用户行为洞察', en: 'Web User Behavior Insight', url: 'static/img/pic-item1.png', themeColor: '#1fc8f3'},
	{title: '影视指数', path: '/Video', subtitle: '网络影视市场监测', en: 'Online Video Market Monitoring', url: 'static/img/pic-item2.png', themeColor: '#ffcf00'},
	{title: '移动设备指数', path: '/Device', subtitle: '移动设备监测', en: 'Mobile Device Index', url: 'static/img/pic-item3.png', themeColor: '#ff6b46'},
	// {title: '广告指数', path: '/Ad', subtitle: '网络广告投放监测', en: 'Online Advertising Index', url: 'static/img/pic-item4.png', themeColor: '#dd679e'}
];

export default {
	name: 'CardCarousel',
	data() {
		return {
			items,
			btnIndex: NaN
		}
	},
	methods: {
		hoverIn(index) {
			this.btnIndex = index;
		},
		hoverOut() {
			this.btnIndex = NaN;
		},
		getImgStyle(item) {
			return {backgroundImage: `url(${item.url})`, backgroundColor: item.themeColor};
		},
		getDetailStyle(item,index,btnIndex) {
			return {
				borderColor: item.themeColor,
				color: index == btnIndex ? '#fff' : item.themeColor,
				backgroundColor: index == btnIndex ? item.themeColor : '#fff'};
		}
	}
}
</script>


<style scoped>
.carouselItem {
	display: flex;
	box-sizing: border-box;
	text-align: center;
	background: yellow;
	border-radius: 5px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
.img {
	height: 100%;
	flex: 1;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
}
.text {
	flex: 1;
	border-width: 2px;
	border-style: solid;
	border-radius: 0 5px 5px 0;
	border-left: none;
	background: #fff;
}
.title {
	padding-top: 10px;
	font-size: 20px;
	line-height: 60px;
}
.subtitle {
	font-size: 16px;
	line-height: 20px;
}
.en {
	font-size: 12px;
	line-height: 20px;
}
.detail {
	vertical-align: top;
	display: inline-block;
	margin-top: 25px;
	padding: 5px 30px;
	border: 1px	solid #000;
	border-radius: 10px;
	transition: .4s;
}
</style>
