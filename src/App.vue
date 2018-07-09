<template>
  	<div id="app">			
  		<router-view></router-view>
  	</div>
</template>

<script>

export default {
  name: 'App',
  components: {
  
  },
  data: function () {
    return {
      
    }
    
  },
  mounted(){
        // 窗口改变大小的事件。
        window.addEventListener("resize", ()=>{
            //this.$store.dispatch("rootWindowResizeFlagAction");
        });
  }
}
</script>

<style scoped>
  
  #app{
    width: 100%;
    height: 100%;
  }
</style>
