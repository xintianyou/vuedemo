<template>
  <div class="mine">
      <vHeader></vHeader>
      <div class="main">
        <ul>
          <li v-for="(item, index) in obj.shop_name" @click="chanceShop(item, index)" :class="{active:Lindex == index}">
            {{ item }}
          </li>
        </ul>
        <P>
          <button @click="num--" :disabled="this.num <= 1 || this.price == 0">-</button>
          <input type="number" min="1" v-model="num" :disabled="this.price == 0"/>
          <button @click="num++" :disabled="this.price == 0">+</button>
        </P>
        <P>总价:{{ price*num }}</P>
        <button class="" @click="tTtranslate">跳转</button>
      </div>
      <vFooter></vFooter>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data: function () {
    return {
      price: 0,
      num: 0,
      obj: {
        shop_name: ["芝士奶盖","榴莲奶盖","芋圆","金钻","黑钻","布丁","珍珠"],
        price: [1, 2, 3, 4, 5, 6, 7]
      },
      Lindex: -1
    }
  },
  methods: {
    chanceShop (item, index) {    
      this.num = 1;  
      this.price = this.obj.price[index];
      this.Lindex = index;
      console.log(item)
    },
    tTtranslate () {
      this.$router.push('/translate');
    }
  },
  watch: {
    num () {
      this.num = parseInt(this.num);
    }
  }
}
</script>
<style>
	.mine{
    height: 100%;
    background-color: #f2f2f2;
  }
  .main{
    padding-top: 48px;
  }
  .main p, .main li{
    margin: 25px;
  }
  .active{
    background-color: orangered;
    color: #fff;
  }
</style>