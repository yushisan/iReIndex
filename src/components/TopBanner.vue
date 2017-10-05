<template>
	<div class="banner" :style="{backgroundImage: `url(${pic})`}"></div>
</template>

<script>
export default {
	props: ['pic']
}
</script>

<style scoped>
.banner {
	margin: 0px 5px 5px;
	height: 140px;
	border: 1px solid #d1dbe5;
    border-radius: 4px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
