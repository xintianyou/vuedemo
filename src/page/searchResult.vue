<template>
    <van-nav-bar
        title="搜索结果"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
</template>

<script>
    export default {
        name: 'searchResult',
        data () {
            return {

            }
        },
        methods: {
            onClickLeft () {
                this.$router.push('/');
            }
        }
    }
</script>

<style>
    .van-nav-bar__text{
        color: #666;
    }
    .van-nav-bar .van-icon{
        color: #666;
    }
</style>