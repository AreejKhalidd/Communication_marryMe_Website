<template>
    <div data-app>
        <v-toolbar  style="background-color: #FE6265;color: black;direction: rtl">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>قائمة المحظورين</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>
        <BlockList  v-for="block in blocks" :key="block.id" :id="block.id" :name="block.name" :age="block.age" :img="block.blocked_image"/>
</div>


</template>

<script>
    import BlockList from '@/components/BlockList.vue'
    import axios from "axios";

    export default {
    name: "Block",
    components: {
    BlockList
},
    data()  {
    return{
    blocks: []
}
},
    mounted() {
    // GET request using axios with set headers
    const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMTU1NzI0MiwiZXhwIjoxNjMxNTYwODQyLCJuYmYiOjE2MzE1NTcyNDIsImp0aSI6IlhlZ0R6cXlEOGxvdlRONm0iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.O_MQdJI3mAyg2BxoO-KuSPuFIuxfdoU1UvCUP0Dnymc");
    axios.get("http://127.0.0.1:8000/api/getAllBlocks", {headers: {Authorization: AuthStr}})
    .then(response => {
    // If request is good...
    console.log(response.data);
    this.blocks = response.data
    console.log(this.blocks)
})
    .catch((error) => {
    console.log('error ' + error);
    return "There is not any data"
});
}

}
</script>

<style scoped>

</style>