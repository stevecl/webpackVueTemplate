<template>
    <div class="plugin-box">
        <div class="plugin-list">
            <ul>
                <li @click="linkTo('/demo/date')">日期选择</li>
                <li @click="linkTo('/demo/pagination')">分页</li>
            </ul>
            <div class="plugin-content">
                <router-view />
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    methods: {
        linkTo (path){
            this.$router.push(path)
        }
    }
}
</script>
<style lang="less">
.plugin-box{
    height: 100%;
    .plugin-list{
        height: 100%;
        position: relative;
        ul{
            width: 100px;
            height: 100%;
            border-right: 1px solid #ddd;
            box-sizing: border-box;
            li{
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #ddd;
                cursor: pointer;
                &:hover{
                    background-color: #2196F3;
                    color: #fff;
                }
            }
        }
        .plugin-content{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 100px;
            top: 0;
            box-sizing: border-box;
        }
    }
}
</style>


