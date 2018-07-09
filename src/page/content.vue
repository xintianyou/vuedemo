<template>
	<div class="content">
		<vHeader></vHeader>
		<div class="main">content</div>
		<vFooter></vFooter>
	</div>
</template>

<script>
export default {
	name: 'Content',
	components: {
		
  	},
	created(){
		let ids = this.$route.params.id
		let id = this.$route.query.id;
		console.log(ids)
	},
	methods:{
		
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
</style>