<template>
    <div class="footer">
        <ul>
            <li @click="changePage(index)" v-for="(menu,index) in menus" :key="menu.path">{{ menu.text }}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'footer',
        data () {
            return {
                menus: [
                    {
                        path: '/',
                        text: '首页'
                    },
                    {
                        path: '/hello',
                        text: '我的'
                    }
                ]
            }
        },
        methods: {
            changePage (index) {
                this.$router.push(this.menus[index].path)
            }
        }
    }
</script>
<style scoped>
    @import "../style/reset.css";
    .footer{
        width: 100%;
        height: 48px;
        text-align: center;
        line-height: 48px;
        position: fixed;
        bottom: 0;
        background-color: #fff;
    }
    .footer ul{
        display: block;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    .footer li{
        display: block;
        float: left;
        width: 50%;
        text-align: center;
    }
</style>