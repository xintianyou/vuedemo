<template>
    <div class="footer">
        <!-- <ul>
            <li @click="changePage(index)" v-for="(menu,index) in menus" :key="menu.path">{{ menu.text }}</li>
        </ul> -->
        <van-tabbar v-model="checked" @change="changeTabs">
            <van-tabbar-item v-for="menu in menus" :key="menu.path">
                <span>{{ menu.text }}</span>
                <template slot="icon" slot-scope="props">
                    <img :src="props.checked ? menu.active : menu.normal" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    import Main from '../../static/img/icon_mine.png';
    import MainNo from '../../static/img/icon_mineNo.png';  
    export default {
        name: 'Footer',
        data () {
            return {
                checked: 0,
                menus: [
                    {
                        path: '/',
                        text: '查价',
                        normal: MainNo,
                        active: Main
                    },
                    {
                        path: '/content/1',
                        text: '报价',
                        normal: MainNo,
                        active: Main
                    },
                    {
                        path: '/mine',
                        text: '我的',
                        normal: MainNo,
                        active: Main
                    }
                ]
            }
        },
        methods: {
            changeTabs (checked) {
                //alert(checked)
                this.$router.push(this.menus[checked].path)
            }
        }
    }
</script>
<style>
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
    /* .footer ul{
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
    } */
    .van-tabbar-item--active{
        color: #ffb304;
    }
</style>