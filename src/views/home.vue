<template>
    <div class="home">
        <div class="home_nav">
            <ul>
                <li v-for="(item,index) in sortlist" :key="index">{{item.name}}</li>
            </ul>
        </div>
        <div class="block">
            <el-carousel height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img src="" alt="" srcset="">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            sortlist:[]
        }
    },
    mounted(){
        this.sortdata();
        this.bannerdata()
    },
    methods:{
        sortdata(){
            this.$axios.get("/sqy/w/website/findGoodsTypeList").then(res=>{
                console.log(res);
                this.sortlist=res.data.data;
            })
        },
        bannerdata(){
            this.$axios.get('/sqy/w/website/bannerList').then(res=>{
                console.log(res);
            })
        }
    }
}
</script>
<style >
    .home_nav{
        width: 80%;
        height: 50px;
        margin:50px auto;
    }
    .home_nav ul{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        list-style: none;
        flex-wrap: wrap;
    }
    .home_nav ul li{
        width: 60px;
        height: 40px;
        background-color: red;
        color: white;
        text-align: center;
        line-height: 40px;
        margin-right:10px;
        border-radius: 5px;
    }
</style>