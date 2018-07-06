<template>
	<div class="box">
		<vHeader></vHeader>
		<div>content</div>
		<vFooter></vFooter>
	</div>
</template>

<script>
import vHeader from './header'
import vFooter from './footer'
export default {
	components: {
		vHeader,
		vFooter
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
	.box{
		padding-top: 48px;
	}
</style>