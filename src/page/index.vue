<template>
	<div id="box">
		<vHeader></vHeader>
		<div class="main">
			<van-cell-group>
				<van-field
					v-model="price"
					center
					clearable
					label="票面金额:"
					placeholder="请输入票面金额"
				>
					<van-button slot="button" size="small" >万元</van-button>
				</van-field>
			</van-cell-group>
			<van-cell-group>
				<van-field 
					label="银行类型:" 
					v-model="bankType" 
					placeholder="请选择银行类型" 
					is-link 
					@click="isBankTypeShow = true" 
					readonly
					>
				</van-field>
			</van-cell-group>
			<van-cell-group>
				<van-field
					v-model="bankName"
					label="银 行 名:"
					type="textarea"
					placeholder="请输入银行名"
					rows="1"
					autosize
				/>
			</van-cell-group>
			<van-cell-group>
				<van-field 
					label="到 期 日:" 
					v-model="initDate" 
					placeholder="请选择到期日" 
					is-link 
					@click="isDatePickerShow = true" 
					readonly
					>
				</van-field>
			</van-cell-group>
			<div class="moreContent">
				<van-collapse v-model="activeName" accordion>
					<van-collapse-item title="更多内容" name="1">
						<p><span>票据类型:</span><van-button size="small">电票</van-button><van-button size="small">纸票</van-button></p>
						<p><span>瑕疵:</span><van-button size="small">无</van-button><van-button size="small">有</van-button></p>
						<p><span>备注:</span><van-button size="small">不限</van-button><van-button size="small">行口票</van-button><van-button size="small">货款票</van-button></p>
						<p><span>交易方式:</span><van-button size="small">买断</van-button><van-button size="small">带贴</van-button></p>
					</van-collapse-item>
				</van-collapse>
			</div>
			<van-button size="large" class="getBillProduct" @click="getBillProduct">立即询价</van-button>
			<van-popup v-model="isBankTypeShow" position="bottom">
				<van-picker
					show-toolbar
					title="请选择银行类型"
					:columns="banksName"
					@cancel="onCancel"
					@confirm="onConfirm"
				/>
			</van-popup>
			<van-popup v-model="isDatePickerShow" position="bottom">
				<van-datetime-picker
					v-model="date"
					type="date"
					:min-date="new Date()"
					:max-date="new Date(+ new Date() + 8.64e7*366)"
					@confirm="sureDate"
					@cancel="cancelDate"
				></van-datetime-picker>
			</van-popup>
			
		</div>
		<vFooter></vFooter>
	</div>
</template>

<script>
	export default {
		components: {

  		},
		data(){
			return{
				price: '',
				bankType:'',
				bankTypeId: '',
				bankName: '',
				initDate: '',
				date: '',
				isBankTypeShow: false,
				isDatePickerShow: false,
				banksName:[],
				activeName: ''
			}
		},
		created() {
			this.$http.get("http://139.224.112.243:8022/v1/mainconstants/constant/getConstantType").then(res => {
				let banks = res.data.data.bankType;
				for(let i=0;i<banks.length;i++){
					this.banksName.push(banks[i].constantName);
				}
			})
			.catch(error => {
				console.log(error);
			});
		},
		methods:{
			onConfirm (value, index) {
				this.bankType = value;
				switch (index) {
					case 0:
						this.bankTypeId = 401;
					break;
					case 1:
						this.bankTypeId = 409;
					break;
					case 2:
						this.bankTypeId = 402;
					break;
					case 3:
						this.bankTypeId = 404;
					break;
					case 4:
						this.bankTypeId = 405;
					break;
					case 5:
						this.bankTypeId = 406;
					break;
					case 6:
						this.bankTypeId = 407;
					break;
					case 7:
						this.bankTypeId = 408;
					break;
				}
				this.isBankTypeShow = false;
			},
			onCancel () {
				this.isBankTypeShow = false;
			},
			sureDate () { 
				let myDate = this.date;
				myDate = myDate.toLocaleDateString().replace(/\//g,'-');
				this.initDate = myDate;
				this.isDatePickerShow = false;
			},
			cancelDate () {
				this.isDatePickerShow = false;
			},
			getBillProduct () {
				this.$http.post("http://139.224.112.243:8022/v1/pcc/app/getPccBillOfferList",{
					billSumPrice: this.price,
					bankType: this.bankTypeId,
					bankName: this.bankName,
					deadlineDays: this.initDate,
					billTypeId: '101',
					billFlaw: '0',
					outUsageIsEntrance: '0',
					outUsageIsLoan: '0',
					tradeTypeId: '1801'
				})
				.then(res => {
					console.log(res)
					this.$router.push('/searchResult');
				})
				.catch(error => {
					console.log(error);
				});
			}
    	}
	}
</script>

<style>
	@import "../style/reset.css";	
	#box{
		text-align: center;
		width: 100%;
		height: 100%;
		padding-top: 48px;
		background-color: #f2f2f2;
	}
	#box .main{
		width: 90%;
		padding-top: 20px;
		margin-left: 5%;
		padding-bottom: 50px;
	}
	.van-cell{
		padding: 10px 10px;
	}
	.van-cell-group{
		margin-bottom: 20px;
	}
	.van-button--default{
		border: none;		
	}
	.van-picker__cancel, .van-picker__confirm{
		color: #ffb304;
	}
	.getBillProduct{
		background-color: #ffb304;
		color: #fff;
		height: 40px;
		line-height: 40px;
	}
	.moreContent{
		margin-bottom: 20px;
	}
	.moreContent p{
		height: 40px;
		line-height: 40px;
		border-bottom: 0.5px solid #e6e6e6;
	}
	.moreContent p span{
		float: left;
		font-size: 14px;
		color: #333;
	}
	.moreContent p button{
		float: left;
		border: 0.5px solid #ccc;
		border-radius: 2px;
		color: #999;
		background-color: #fff;
		padding: 0 6px;
		height: 20px;
		min-width: 0px;
		width: auto;
		margin: 10px;
		font-size: 13px;
		line-height: 18px;
	}
</style>