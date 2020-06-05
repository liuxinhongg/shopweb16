<template>
    <div>
        <tou></tou>
        <div class="subject_content">
            <div class="item" v-for="(item,index) in subjectlist" :key="index">
                <img :src="item.pic" alt="">
                <h3>{{item.subjectName}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import tou from "@/components/top"
    export default {
        components:{
            tou
        },
        data(){
            return{
                sousuoval:'',
                subjectlist:[]
            }
        },
        created(){
            // 首页新品管理--查询
            this.$axios.get("/api/home/recommendSubject/list",{
                params:{
                    productName:'',
                    recommendStatus:'',
                    pageSize:6,
                    pageNum:1
                }
            }).then(res=>{
                console.log(res);
                this.subjectlist=res.data.data.list;
            })
        },
        methods:{
            search(){}
        }
    }
</script>

<style>

.subject_content{
    width: 80%;
    overflow: hidden;
    margin: auto;
}
.item{
    width: 300px;
    height: 350px;
    box-shadow: 0px 0px 5px #ccc;
    margin: 10px;
    float: left;
    text-align: center;
}
.item img{
    width: 300px;
    height: 300px;
}
</style>