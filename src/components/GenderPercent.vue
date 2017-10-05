<template>
	<div class="genderGroup">
		<div class="male">
			<p class="gender">男</p>
			<div class="icos">
				<span class="icoBg"></span>
				<span class="ico" :style="{width: male}"></span>
			</div>
			<p class="text">{{male}}</p>
		</div>
		<div class="female">
			<p class="gender">女</p>
			<div class="icos">
				<span class="icoBg"></span>
				<span class="ico" :style="{width: female}"></span>
			</div>
			<p class="text">{{female}}</p>
		</div>
	</div>
</template>

<script>

export default {
	props: ['attrData'],
	data() {
		return {
			
		}
	},
	computed: {
		male() {
			if (this.attrData) {
				return this.attrData[0].Proportion + '%';
			}
			
		},
		female() {
			if (this.attrData) {
				return this.attrData[1].Proportion + '%';
			}
		}
	}
}
</script>


<style scoped>
.genderGroup {
	margin-top: 30px;
	padding: 0 50px;
	display: flex;
	justify-content: space-between;
}
.genderGroup >* {
	display: flex;
}
.gender {
	margin: 10px;
	width: 44px;
	height: 44px;
	border-radius: 50%;
	line-height: 44px;
	font-weight: bold;
	text-align: center;
	color: #fff;
	background: #b3d332;
}
.female .gender {
	background: #20c9f3;
}
.icos {
	position: relative;
	width: 360px;
	height: 64px;
}
.icos span {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	background-image: url('../../static/img/icon_m.png');
	background-size: 36px 64px;
	background-repeat: repeat-x;
}
.female .icos span {
	background-image: url('../../static/img/icon_w.png');
}
.icos .ico {
	width: 50%;
}
.icos .icoBg {
	filter: grayscale(1);
}
.text {
	margin-left: 20px;
	line-height: 64px;
	font-size: 24px;
	color: #b3d332;
}
.female .text {
	color: #20c9f3;
}
</style>
