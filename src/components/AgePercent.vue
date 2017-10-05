<template>
	<ul class="list">
		<li v-for="(item,index) in items" :key="index" v-if="iShow(index)">
			<img :src="item.ico" class="ico">
			<span class="percent" :style="autoStyle(item,index)"></span>
			<span class="text" :style="{color: item.color}">{{autoStyle(item,index).width}}</span>
		</li>
	</ul>
</template>


<script>

var items = [
	{ ico: 'static/img/icon_10h.png', color: '#ffcf00'},
	{ ico: 'static/img/icon_24yx.png', color: '#b3d332'},
	{ ico: 'static/img/icon_90h.png', color: '#8bc53d'},
	{ ico: 'static/img/icon_80h.png', color: '#66af44'},
	{ ico: 'static/img/icon_70h.png', color: '#20c9f4'},
	{ ico: 'static/img/icon_60h.png', color: '#00afe1'}
];

export default {
	props: ['attrData','typeid'],
	data() {
		return {
			items
		}
	},
	computed: {
		autoPercent() {
			var newArr = null;
			if (this.typeid==1) {
				//pc分类
				newArr = this.attrData.filter((item,index)=>{
					// if (item.TypeID>=8 && item.TypeID<=11 || item.TypeID===37) {
					if (item.RootType == 2) {
						return true;
					}
				});
			}else {
				//app分类
				newArr = this.attrData.filter((item,index)=>{
					// if (item.TypeID>=8 && item.TypeID<=11 || item.TypeID===37) {
					if (item.RootType == 2) {
						return true;
					}
				});
				newArr.unshift(newArr.pop());
				newArr.unshift({});
			}
			return newArr;
		}
	},
	methods: {
		autoStyle(item,index) {
			return {
				backgroundColor: item.color,
				width: this.autoPercent[index].Proportion + '%'
			};
		},
		iShow(index) {
			if (this.typeid == 0 && index>0) {
				return true;
			}
			if (this.typeid == 1 && index>=0) {
				return true;
			}
		}
	}
}
</script>

<style scoped>
.list {
	margin-left: 50px;
}
.list li {
	display: flex;
	margin-top: 20px;
}
.ico {
	margin-right: 20px;
	width: 135px;
	height: 75px;
}
.percent {
	margin: auto 0;
	height: 50px;
	border-radius: 5px;
}
.text {
	margin-left: 10px;
	line-height: 75px;
}
</style>
