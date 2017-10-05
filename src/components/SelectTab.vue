<template>
	<div>
		<div class="selectTab">
			<label class="tab" :class="{active: selectVal === 'all'}"
			@click="tabItem(0)">
				<input type="radio" value="all" v-model="selectVal" @click.stop>
				全部
			</label>
			<label v-for="(item,index) in data" :key="item.id" class="tab"
			:class="{active: item.ClassName === selectVal}"
			@click="tabItem(index+startId)">
				<input type="radio" :value="item.ClassName" v-model="selectVal" @click.stop>
				{{item.ClassName}}
			</label>
		</div>
		<div class="subSelectTab" v-show="subData">
			<label v-for="(item,index) in subData" :key="item.id" class="tab"
			:class="{active: item.ClassName === subSelectVal}"
			@click="tabSubItem(item.ID)">
				<input type="radio" :value="item.ClassName" v-model="subSelectVal" @click.stop>
				{{item.ClassName}}
			</label>
		</div>
		
	</div>
</template>

<script>

import { fetchTabClasses } from '@/store/api.js'

export default {
	props: ['data','color','selectNum','startId'],
	data() {
		return {
			selectVal: 'all',
			subData: null,
			subSelectVal: '',
		}
	},
	methods: {
		tabItem(classId) {
			this.subSelectVal = '';
			if (classId === 0) {
				this.subData = null;
				this.selectVal = 'all';
				this.$emit('update:selectNum', {num: 0, subNum: 0});
				return;
			}
			if (classId == 22) {
				classId = 26; 
			}
			if (classId >= 178) {
				classId++;
			};
			if (this.startId == 168) {
				this.$emit('update:selectNum', {num: classId});
				return;
			}
			this.$emit('update:selectNum', {num: classId, subNum: 1});
			fetchTabClasses(classId).then(response=>{
				this.subData = response;
			});
		},
		tabSubItem(classId) {
			this.$emit('update:selectNum', {num: classId, subNum: 2});
		}
	}
}
</script>

<style scoped>
input[type='radio'] {
	display: none;
}
.selectTab,
.subSelectTab {
	/* padding: 0 20px; */
	display: flex;
	flex-wrap: wrap;
	padding-bottom: 10px;
}
.subSelectTab {
	margin: 0 20px;
	width: 100%;
	border-radius: 5px;
	background: #eee;
}
.tab {
	margin: 10px 10px 0;
	flex: 0 0 12.5%;
	display: inline-block;
	border-radius: 5px;
	font-size: 14px;
	line-height: 26px;
	text-align: center;
	cursor: pointer;
	
}
.tab.active,
.tab:hover {
	color: #fff;
	background: #8bc43f;
}

</style>
