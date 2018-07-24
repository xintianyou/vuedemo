<template>
    <div class="translate">
        <input type="text" v-model="text" placeholder="请输入需要翻译的文字">
        <select v-model="lang">
            <option value="en">English</option>
            <option value="ru">Russian</option>
            <option value="ko">Korean</option>
            <option value="ja">Japanese</option>
        </select>
        <button @click="translate">翻译</button>
        <h1>{{ translatedText }}</h1>
    </div>
</template>

<script>
    export default {
        name:'translate',
        components: {

        },
        data () {
            return {
                text: '',
                translatedText: '',
                lang: 'en'
            }
        },
        methods: {
            translate () {
                let url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180719T113654Z.f5cdbdee87ab3ed9.b1b80c743cb31f210e68b46ec785310b726a4669&text='+ this.text +'&lang='+ this.lang +'';
                this.$http.get(url).then((res) => {
                    this.translatedText = res.body.text[0];
                }, (response) => {
                    // 响应错误回调
                });
            }
        }
    }
</script>

<style scoped>

</style>