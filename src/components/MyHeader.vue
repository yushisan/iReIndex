<template>
	<div class="header">
		<i class="fa fa-bar-chart fa-2x logo"></i>
		<h1 class="center">艾瑞指数</h1>
		<p class="user">
			<!-- <span class="avatar"></span> -->
			<span class="username">
				Contact Me
			</span>
			<el-tooltip content="点击可复制" class="email"
			id="copy" data-clipboard-text="player_ky@126.com">
				<span>
					<i class="fa fa-envelope-o fa-fw fa-lg"></i>
					player_ky@126.com
				</span>
			</el-tooltip>
			<el-tooltip content="访问 GitHub 查看源码" class="github">
				<span>
					<i class="fa fa-github fa-fw fa-lg"></i>
					<a href="https://github.com/Dark-Chef-K/iReIndex" target="_blank">https://github.com</a>
				</span>
			</el-tooltip>
		</p>
	</div>
</template>

<script>

import Clipboard from 'clipboard'

export default {
	mounted() {
		this.copyEl = new Clipboard('#copy');
		this.copyEl.on('success', ()=>{
			this.$message('复制成功!');
		});
		this.copyEl.on('error', ()=>{
			this.$message('复制失败!');
		});
	},
	data() {
		return {
			copyEl: null
		}
	}
}


</script>

<style scoped>
.header {
	display: flex;
	padding: 15px 20px;
	border: 1px solid #d1dbe5;
    border-radius: 8px;
	background: rgb(125, 125, 162);
}
.logo {
	margin-right: 10px;
	color: #fff;
}
.center {
	flex: 1;
	font: bold 24px/32px arial;
	color: #fff;
}
.user {
	display: flex;
}
.user a {
	color: #fff;
}
.username,
.email,
.github {
	margin: auto 10px;
	color: #fff;
	cursor: default;
}
.username {
	font-weight: bold;
}
.github:hover {
	text-decoration: underline;
}
</style>

