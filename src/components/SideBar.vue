<template>
	<ul class="sideBar" :class="{open: isOpen}">
		<router-link :to="item.path" class="menuItem" v-for="(item,index) in items" :key="item.id"
		:class="{active: index===itemIndex}"
		@click.native="tabItem(index)" tag="li">
			<div class="row">
				<i class="fa fa-lg fa-fw" :class="{[item.ico]: true}"></i>
				<span class="text" v-show="isOpen">{{item.title}}</span>
			</div>
			<span class="label" v-show="!isOpen">{{item.title}}</span>
		</router-link>
		<li style="flex: 1"></li>
		<li class="toggle" @click="toggle">
			<i class="fa fa-lg" :class="{'fa-chevron-left': isOpen,'fa-chevron-right':!isOpen}"></i>
		</li>
	</ul>
</template>

<script>

let items = [
	{
		ico: 'fa-home',
		title: '首页',
		path: '/Home'
	},
	{
		ico: 'fa-mobile',
		title: 'APP指数',
		path: '/App'
	},
	{
		ico: 'fa-desktop',
		title: 'PC指数',
		path: '/PC'
	},
	{
		ico: 'fa-android',
		title: '移动设备指数',
		path: '/Device'
	},
	{
		ico: 'fa-film',
		title: '影视指数',
		path: '/Video'
	},
	// {
	// 	ico: 'fa-dollar',
	// 	title: '广告指数',
	// 	path: '/Ad'
	// }
];
export default {
    data() {
		return {
			isOpen: false,
			items,
			itemIndex: 0
		}
	},
	methods: {
		toggle() {
			this.isOpen = !this.isOpen;
		},
		tabItem(index) {
			this.itemIndex = index;
		}
	}
}
</script>

<style scoped>
.sideBar {
	display: flex;
	padding-bottom: 10px;
	flex-direction: column;
	border: 1px solid #d1dbe5;
	border-radius: 8px;
	color: #48576a;
	background: #DADDE2;
	z-index: 99;
}
.menuItem:hover {
	background: #BDC7D1;
}
.menuItem i {
	transition: transform .3s;
}
.menuItem:hover i {
	transform: scale(1.5);
}
/* .menuItem.active {
	color: #20a0ff;
} */
.menuItem.router-link-active {
	color: #20a0ff;
}
.menuItem {
	position: relative;
}
.row {
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	padding: 20px 20px;
	cursor: pointer;
}
.row i {
	width: 20px;
}
.text {
	margin-left: 20px;
	display: block;
	width: 110px;
	font-size: 16px;
	line-height: 16px;
	text-align: center;
}
.toggle {
	display: flex;
}
.toggle i {
	margin: auto;
	padding: 20px;
	border-radius: 50%;
	background: rgba(189, 199, 209, 0);
	transition: .5s;
	cursor: pointer;
}
.toggle i:hover {
	background: rgba(189, 199, 209, 1);
}
.label {
	position: absolute;
	left: 70px;
	top: 13px;
	padding: 0 20px;
	height: 30px;
	border-radius: 5px;
	font-size: 14px;
	line-height: 30px;
	color: #fff;
	white-space: nowrap;
	background: #333;
	z-index: 1;
	opacity: 0;
	transform: scale(0);
	transform-origin: left;
	transition: .5s;
}
.menuItem:hover .label {
	transform: scale(1);
	opacity: 1;
	
}
.label:before {
	content: '';
	position: absolute;
	left: -10px;
	top: 10px;
	border: 5px solid transparent;
	border-right-color: #333;
}
</style>

