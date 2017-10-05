<template>
	<div class="footer">
		<span style="flex: 1">加个浏览器检测，加个全屏按钮</span>
		<el-tooltip content="点击可复制" placement="top">
			<span>
				<i class="fa fa-envelope-o fa-fw fa-lg"></i>
				<a href="javascript:;">player_ky@126.com</a>
			</span>
		</el-tooltip>
		<el-tooltip content="访问 GitHub" placement="top">
			<span>
				<i class="fa fa-github fa-fw fa-lg"></i>
				<a href="https://github.com/Dark-Chef-K" target="_blank">https://github.com/Dark-Chef-K</a>
			</span>
		</el-tooltip>
	</div>
</template>

<script>
	export default {
		name: 'Footer'
	}
</script>

<style scoped>
.footer {
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: center;
}
.footer span {
	margin: auto 10px;
}
</style>
