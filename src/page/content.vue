<template>
	<div class="content">
		<vHeader></vHeader>
		<div class="main">
			<van-tabs v-model="active" @click="changeRole">
				<van-tab v-for="index in 2">
					<div slot="title">
						{{ index == 1 ? '我是票方' : '我是资方' }}
					</div>
					<div>{{ content }}</div>
				</van-tab>
			</van-tabs>								
		</div>
		<vFooter></vFooter>
	</div>
</template>

<script>
export default {
	name: 'Content',
	components: {
		
	},
	data () {
		return {
			active: '0',
			content: '票方信息'
		}
	},
	created () {
		let ids = this.$route.params.id
		let id = this.$route.query.id;
		//console.log(ids)
	},
	methods: {
		changeRole (active) {
			console.log(active)
			if(active == 0){
				this.content = '票方信息';
			}else{
				this.content = '资方信息';
			}
		}
	}
}
</script>

<style>
	.content{
		height: 100%;
		background-color: #f2f2f2;
	}
	.main{
		padding-top: 48px;
	}
	.van-tab--active{
		color: #ffb304;
	}
	.van-tabs__line{
		background-color: #ffb304;
	}
</style>