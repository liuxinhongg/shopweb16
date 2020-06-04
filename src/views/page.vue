<template>
    <div>
        <el-select v-model="value" placeholder="请选择" @change="btn(value)">
            <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.label"
            :value="item.name">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                 options: [{
                    name: '11',
                    label: '角色一'
                    }, {
                    name: '22',
                    label: '角色一'
                    }, {
                    name: '33',
                    label: '角色三'
                    }, {
                    name: '44',
                    label: '角色四'
                    }, {
                    name: '55',
                    label: '角色五'
                    }],
                value: ''
            }
        },
        created(){
            this.$axios.get("/api/home/newProduct/list",{
                productName:'',
                recommendStatus:'',
                pageSize:5,
                pageNum:1
            }).then(res=>{
                console.log(res);
            })
        },
        methods:{
            btn(n){
                // console.log(n);
                // this.$axios.get("url",{params:{"参数"}}).then(res=>{
                //     console.log(n)
                // })
            }

        }
    }
</script>

<style scoped>

</style>