<template lang="">
    <div id="list-demo" class="demo2">
        <transition-group name="list" tag="p" style="margin-bottom: 10px;">
            <span v-for="item in items" v-bind:key="item" class="list-item">
                {{ item }}
            </span>
        </transition-group>
        <button ref="test" v-on:click="add">Add</button>
        <button v-on:click="remove">Remove</button>
        <button v-on:click="reverse(items)">reverse</button>


        <transition-group name="flip-list" tag="ul" style="margin: 20px; 0 10px;">
            <li v-for="item in arrs" v-bind:key="item">
                {{ item }}
            </li>
        </transition-group>
        <button v-on:click="reverse(arrs)">reverse</button>
    </div>
</template>
<script>
export default {
    created() {
        console.log("created");
    },
    data() {
        return {
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            arrs: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            nextNum: 10
        };
    },
    mounted() {
    },
    methods: {
        randomIndex() {
            return Math.floor(Math.random() * this.items.length);
        },
        add() {
            this.items.splice(this.randomIndex(), 0, this.nextNum++);
        },
        remove() {
            this.items.splice(this.randomIndex(), 1);
        },
        reverse(arr) {
            console.log(this.$refs.test);
            this.$refs.test.style.color = "red";
            // this.items = _.shuffle(this.items)
            arr.reverse();
        }
    }
};
</script>
<style lang='sass'>
@import 'array.sass'
</style>