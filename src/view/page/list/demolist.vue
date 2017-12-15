<template lang="">
    <div>
        <ul class="demolist">
            <li class="fl" @click="toDemo('carousel')">carousel</li>
            <li class="fl" @click="toDemo('array')">array</li>
            <li class="fl" @click="show = !show">componets</li>
            <li class="fl" @click="test()">main</li>
        </ul>
        <router-view></router-view>
        <div class="content" v-if="show">
            <div>
                <button @click="click1()">气泡</button>
                <button @click="loading()">加载中</button>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            show : false
        }
    },
    mounted (){
    },
    beforeRouteLeave (to, from, next) {
        console.log(to);
        console.log(from);
        next();
    },
    methods:{
        toDemo (n){
            this.$router.push({ path: '/list/'+n });
        },
        test (){
            this.$router.push({ path: '/main'});
        },
        click1 (){
            bus.$emit('bubble','网络繁忙，请稍后试试吧')
        },
        loading (){
            bus.$emit('loading',true);
            setTimeout(() => {
                bus.$emit('loading',false);
            }, 3000);
        }
    }
}
</script>
<style lang="sass">
    $color_golden : #ac8e45 //金色
    .demolist
        height: 40px
        margin-top: 10px
    .demolist li
        width: 80px
        font-size: 20px
        text-align: center
        margin-right: 30px
    .demolist li:hover
        text-decoration: underline
        cursor: pointer
        color: $color_golden

</style>