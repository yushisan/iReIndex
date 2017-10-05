<template>
<div class="main">
	<h3 class="title">中国互联网活跃监测设备数（台）</h3>
	<ul class="numberBox">
		<li v-for="(num,index) in number" :key="num.id" class="number" :class="getStyle(number,index)">
			<div class="mask">
				<ul :style="getTransform(num)">
					<li v-for="i in 10" :key="i.id">{{i-1}}</li>
				</ul>
			</div>
		</li>
	</ul>
</div>
</template>


<script>

import { fetchBigData } from '@/store/api.js'
export default {
	mounted() {
		clearInterval(this.timer);
		this.updata();
		this.timer = setInterval(()=>{
			this.updata();
		},2000);
	},
	destroyed() {
		//防止定时器一直开着不断发送请求（切换页面后）
		clearInterval(this.timer);
	},
	data() {
		return {
			number: '',
			timer: null
		}
	},
	methods: {
		updata() {
			return fetchBigData().then(response=>{
				this.number = response.match(/\d+/)[0];
			});
		},
		getTransform(num) {
			return {transform: `translateY(-${num}0%) translateZ(0.01px)`};
		},
		getStyle(number,index) {
			return {comma: (number.length -index)%3 == 0 && index != 0};
		}
	}
}
</script>

<style scoped>
.main {
	display: flex;
	flex-direction: column;
	margin: 0px 5px 5px;
	height: 180px;
	border: 1px solid #d1dbe5;
    border-radius: 4px;
	background: linear-gradient(45deg,#127CE7 0,#4AD89C 100%);
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	overflow: hidden;
}
.title {
	padding-top: 15px;
	font: bold 24px/30px '宋体';
	color: #fff;
	text-align: center;
}
.numberBox {
	margin: auto;
	display: flex;
	justify-content: center;
	cursor: pointer;
}
.number {
	position: relative;
	margin: 0 10px;
	width: 50px;
	height: 80px;
	border: 2px solid #fff;
	border-radius: 5px;
	font: 50px/80px arial;
	color: #fff;
	text-align: center;
	background: linear-gradient(
		rgba(255, 255, 255, 0) 0,
		rgba(255, 255, 255, 0) 50%,
		rgba(255, 255, 255, .15) 50%,
		rgba(255, 255, 255, .15) 100%
	);
	transition: .4s;
}
.numberBox:hover .number {
	box-shadow: 0 0 20px #fff;
}
.comma {
	margin-left: 20px;
}
.comma:before {
	position: absolute;
	top: 0;
	left: -27px;
	content: ',';
	width: 20px;
	text-align: center;
}
.number ul {
	width: 100%;
	height: 1000%;
	transition: .5s;
	overflow: hidden;
}
.mask {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
