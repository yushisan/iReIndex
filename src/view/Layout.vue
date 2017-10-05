<template>
<div id="layout">
	<my-header></my-header>
	<div id="wrap">
		<side-bar></side-bar>
		<transition mode="out-in"
		:enter-active-class="myAnimate.enter"
		:leave-active-class="myAnimate.leave">
			<router-view class="contentBox" id="contentBox"></router-view>
		</transition>
	</div>
</div>
	
</template>

<script>

let myAnimate = {
	// enter: 'animated zoomInDown',
	// leave: 'animated zoomOutDown'
};
import MyHeader from '@/components/MyHeader'
import SideBar from '@/components/SideBar'

export default {
	data() {
		return {
			myAnimate
		}
	},
	components: {
		MyHeader,
		SideBar
	},
	transitions: {
        bounce: {
            enterClass: 'bounceInLeft',
            leaveClass: 'bounceOutRight'
        }
    }
}
</script>

<style scoped>
#layout {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background: rgba(0, 0, 0, .05);
}
#wrap {
	margin-top: 5px;
	display: flex;
	flex: 1;
}
.contentBox {
	display: flex;
	padding: 0px 5px 5px;
	flex: 1;
	align-items: flex-start;
	align-content: flex-start;
	flex-wrap: wrap;
	overflow-y: auto;
}


</style>


