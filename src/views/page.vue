<template>
    <div>
        <div class="page_top">
           <div class="top_sousuo"> <el-input v-model="sousuoval" placeholder="请输入内容"></el-input> <el-button  type="danger" size="mini" @click="search"> 搜索</el-button> </div> 
        </div>
        <div class="subject_content">
            <div class="item" v-for="(item,index) in subjectlist" :key="index">
                <img :src="item." alt="">
                <h3></h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                sousuoval:'',
                subjectlist:[]
            }
        },
        created(){
            // 首页新品管理--查询
            this.$axios.get("/api/home/recommendSubject/list",{
                productName:'',
                recommendStatus:'',
                pageSize:3,
                pageNum:1
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
.page_top{
    width: 50%;
    height: 80px;
    margin: 20px auto;

}
.top_sousuo{
    width: 300px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
}
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
}
</style>