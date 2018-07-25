<template>
    <div>
        <page name="分页" :flip="paging.flip" :total="paging.total" :page="paging.page" @selectPage="selectPage"></page>
    </div>
</template>
<script>
import pagination from '@/components/pagination.vue';
export default {
    components: {
        page: pagination
    },
    data(){
        return {
            paging: {
                flip: 2,
                total: 10,
                page: 1
            },
        }
    },
    methods: {
        selectPage(page){
            console.log('选择了页数： ',page)
        }
    }
}
</script>

