<template>
	<div id="box">
		<vHeader></vHeader>
		<div class="main">
			<van-cell-group>
				<van-field
					v-model="value"
					center
					clearable
					label="票面金额:"
					placeholder="请输入票面金额"
				>
					<van-button slot="button" size="small" >万元</van-button>
				</van-field>
			</van-cell-group>
			<van-cell-group>
				<van-field label="银行名：" placeholder="请选择银行类型" is-link @click="isBankTypeShow = true" readonly></van-field>
			</van-cell-group>
			<van-cell-group>
				<van-field
					v-model="bankName"
					label="银行名："
					type="textarea"
					placeholder="请输入银行名"
					rows="1"
					autosize
				/>
			</van-cell-group>
			<van-cell-group>
				<van-field label="到期日：" placeholder="请选择到期日" is-link @click="isDatePickerShow = true" readonly></van-field>
			</van-cell-group>
			<van-popup v-model="isDatePickerShow" position="bottom">
				<van-datetime-picker
					v-model="date"
					type="date"
					:min-date="new Date()"
					:max-date="new Date(+ new Date() + 8.64e7*366)"
				></van-datetime-picker>
			</van-popup>
			
		</div>
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
		data(){
			return{
				value: '',
				bankName: '',
				isBankTypeShow: false,
				isDatePickerShow: false,
				date: ''
			}
		},
		methods:{
			
    	}
	}
</script>

<style>
	@import "../style/reset.css";
	body{
		margin: 0;
		padding: 0;
		background-color: #f2f2f2;
	}
	#box{
		text-align: center;
		width: 100%;
		height: 100%;
		padding-top: 48px;
	}
	.main{
		width: 90%;
		height: 100%;
		padding-top: 20px;
		margin-left: 5%;
	}
	ul, li{
		list-style: none;
	}
	.header{
		height: 48px;
		width: 100%;
	}
	.van-cell-group{
		margin-bottom: 20px;
	}
	.van-button--default{
		border: none;
	}
</style>