<template>
    <div class="goods">
        <div class="titleList">
            <div v-for="(item, indexL) in alldata" @click="changeGoods(indexL)" :class="{active:indexL == index}">
                {{item.cateName}}
            </div> 
        </div>
        <div class="goodsList">
            <div class="goodsBox" v-for="(item, indexR) in alldata" :key="indexR" v-if="indexL == indexR">                
                <div class="singleGood" v-for="(item, key) in item.itemList">
                    <p>{{item.name}} </p>
                    <p>
                        <span class="price">{{item.money[0]}}</span>元
                        <span class="numBtn" v-if="item.spec.length<=1 && item.flavors.length<=1">
                            <button @click="changeNum(item,-1,key,indexR)">-</button>
                            <span>{{item.num}}</span>
                            <button @click="changeNum(item,1,key,indexR)">+</button>
                        </span>
                        <span class="numBtn" v-else @click="chanceTaste(item)">
                            选口味
                        </span>
                        <van-popup v-model="showTasteBox" position="bottom" class="actionSheet" :overlay="true">
                            <div>
                                <p>规格</p>
                                <button class="typeBtn" @click="sizeType(item, index)" v-for="(item, index) in actions.spec" :class="{on:btnIndex == index}">{{item}}</button>
                            </div>
                            <div v-for="(item, optIndex) in actions.flavors">
                                <p>{{item.name}}</p>
                                <button class="typeBtn" @click="tasteType(optIndex, item, index)" v-for="(i, index) in item.flavors">{{i}}</button>
                            </div>
                            <div>
                                <span>{{adjustMoney}}</span>
                                <span class="numBtn">
                                    <button @click="changeNum2(item,-1)">-</button>
                                    <span>{{item.num}}</span>
                                    <button @click="changeNum2(item,1)">+</button>
                                </span>
                            </div>
                            <div class="confirm">
                                <button @confirmType(item)>确定</button>
                            </div>
                        </van-popup>
                    </p>
                </div> 
            </div>
        </div>
        <div class="cartContent" v-if="showCar">
            <div class="cartGoods" v-for="(item, index) in selectedGoods">
                <p>{{item.name}} </p>
                <p>
                    <span class="price">{{item.money[0]*item.num}}</span>元
                    <span class="numBtn">
                        <button @click="changeNum1(item,-1,index)">-</button>
                        <span>{{item.num}}</span>
                        <button @click="changeNum1(item,1,index)">+</button>
                    </span>
                </p>
            </div>
        </div>
        <div class="resultMoney" v-if="created"><div class="cart" @click="toCart()">购物车</div>总计：￥<span class="moneys">{{totalMoney}}</span>元</div>
    </div>
</template>

<script>
    export default {
        name: 'goods',
        components: {
            
        },
        data () {
            return {
                alldata: [],
                indexL: 0,
                indexR: 0,
                index: 0,
                singleTotalMoney: 0,
                totalMoney: 0,
                selectedGoods: [],
                showCar: false,
                created: false,
                showTasteBox: false,
                actions: [],
                adjustMoney: 0,
                selected: false,
                btnIndex: -1,
                btnIndex1: -1,
                btnIndex2: -1,
                typeIndex: -1,
                onceMoney: 0,
                Multiple: 0,
                single: 0,
                sizeMoney: 0
            }
        },
        created () {
            this.$http.get('https://te.ss.looovo.com/cartes/list?shop_id=11').then((res) => {
                this.created = true;   
                let data = res.body.data.commodList;
                for(let i=0;i<data.length;i++){
                    for(let j=0;j<data[i].itemList.length;j++){
                        data[i].itemList[j].num = 0;
                    }
                }
                this.alldata = data;
            }, (err) => {
                console.log(err)
            });
        },
        methods: {
            changeGoods (indexL) {
                this.indexL = indexL;
                this.index = indexL;
            },
            changeNum (item, way, key, indexR) {
                let totalMoney = 0;
                let data = this.alldata;
                if(way > 0){
                    item.num++;
                }else{
                    if(item.num<=0){
                        return;
                    }else{
                        item.num--;
                    }
                }
                data[indexR].itemList[key].singleTotalMoney = item.num*item.money[0];//给选中了的商品，添加当前总钱数字段
                for(let i=0;i<data.length;i++){
                    for(let j=0;j<data[i].itemList.length;j++){
                        if(data[i].itemList[j].singleTotalMoney != null){
                            if(data[i].itemList[j].singleTotalMoney == 0){
                                totalMoney = 0;
                            } else {
                                totalMoney += data[i].itemList[j].singleTotalMoney;
                            }
                            this.totalMoney = totalMoney;
                        }
                    }
                }
                if(data[indexR].itemList[key].singleTotalMoney !=null && data[indexR].itemList[key].singleTotalMoney !=0 && data[indexR].itemList[key].num ==1 && way>0){
                    this.selectedGoods.push(data[indexR].itemList[key]);
                }   
                if(data[indexR].itemList[key].num == 0 && way<0){
                    for(let i=0;i<this.selectedGoods.length;i++){
                        if(this.selectedGoods[i].id == data[indexR].itemList[key].id){
                            this.selectedGoods.splice(i, 1);
                        }
                    }
                    if(this.selectedGoods.length == 0){
                        this.showCar = false;
                    }
                } 
            },
            toCart () {
                if(this.selectedGoods.length == 0){
                    return;
                }else{
                    this.showCar = !this.showCar;
                }
            },
            changeNum1 (item,way,index) {
                if(way > 0){
                    item.num++;
                    this.totalMoney += item.money[0]*1;
                }else{
                    if(item.num<2){
                        this.selectedGoods.splice(index, 1);
                        if(this.selectedGoods.length == 0){
                            this.showCar = false;
                        }
                    }
                    item.num--;                   
                    this.totalMoney -= item.money[0];
                }
            },
            chanceTaste (item) {
                this.showTasteBox = true;
                this.actions = item;
                console.log(item)
            },
            sizeType (item, index) {
                this.btnIndex = index;
                this.sizeMoney = this.actions.money[index]*1;
                this.adjustMoney = this.actions.num*(this.onceMoney + parseInt(this.sizeMoney));
            },
            tasteType (optIndex, item, index) {
                //console.log(optIndex)
                //console.log(item)
                console.log(item.price[index])
                console.log(item.control_type);
                let singlePrice = 0;
                
                this.typeIndex = optIndex;
                if(item.control_type == 1){
                    this.btnIndex1 = index;
                    //singlePrice += item.price[index];
                    //this.single = singlePrice;
                    this.single += item.price[index];
                }else{
                    this.selected = !this.selected;
                    this.btnIndex2 = index; 
                    this.Multiple += item.price[index];
                }
                this.onceMoney = this.single + this.Multiple;
                this.adjustMoney = this.actions.num*(this.onceMoney + parseInt(this.sizeMoney));
            },
            changeNum2 (item, way) {
                console.log(item)
                if(way>0){
                    item.num++;
                }else{
                    if(item.num<=0){
                        return;
                    }else{
                        item.num--;
                    }
                }
                this.adjustMoney = item.num*(this.onceMoney*1 + this.sizeMoney*1);
            },
            confirmType (item) {

            }
        }
    }
</script>

<style>
    @import '../style/reset.css';
    .goods{
        width: 100%;
    }
    .titleList{
        width: 30%;
        float: left;
        background-color: #ffb304;
        text-align: center;
    }
    .goodsList{
        width: 70%;
        float: left;
    }
    .titleList div{
        padding: 5px 0;
        margin: 5px 0;
        color: #333;
    }
    .singleGood{
        background-color: #f7d998;
        margin: 5px 0;
        padding: 5px 0;
    }
    .active{
        background-color: red;
        color: #fff !important;
    }
    .price{
        color: #000;
    }
    .resultMoney{
        width: 100%;
        height: 50px;
        background-color: red;
        color: #fff;
        line-height: 50px;
        position: fixed;
        bottom: 0;
    }
    .moneys{
        font-size: 22px;
    }
    .numBtn{
        float: right;
    }
    .cart{
        width: 50px;
        height: 50px;
        display: inline-block;
        background-color: #000;
    }
    .cartContent{
        width: 100%;
        height: 120px;
        position: fixed;
        bottom: 50px;
        background-color: #f7d998;
        overflow: auto;
    }
    .cartGoods{
        height: 60px;
        border-bottom: 1px solid #333;
    }
    .cartGoods p{
        height: 30px;
    }
    .actionSheet div{
        height: 60px;
        margin-top: 20px;
    }
    .typeBtn{
        margin-right: 10px;
        margin-bottom: 2px;
        background-color: #fff;
        border: 0.5px solid #ddd;
    }
    .confirm button{
        width: 80%;
        display: block;
        margin: 0 auto;
    }
    .on{
        border: 0.5px solid red;
    }
</style>