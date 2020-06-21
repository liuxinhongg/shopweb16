<template>
    <div class="home">
        <div class="home_nav">
            <ul>
                <li v-for="(item,index) in sortlist" :key="index" @click="jump(item.name)">{{item.name}}</li>
            </ul>
        </div>
        <div class="block">
            <el-carousel height="150px">
                <el-carousel-item v-for="(item,index) in bannerlist" :key="index">
                    <img :src="item.img" alt="" width="100%" height="300px"> 
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="nineby">
            <h1>九块九包邮</h1>
            <ul style="overflow:hidden;">
                <li v-for="(nineitem,index) in ninelist" :key="index" class="ninebox">
                    <div class="ninebox">
                        <img :src="nineitem.pict_url" alt="" srcset="">
                            <h3>{{nineitem.short_title}}</h3>
                            <p>{{nineitem.zk_final_price}} </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="totalsize">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            sortlist:[],
            bannerlist:[],
            ninelist:[],
            currentPage:1,
            pagesize:20,
            totalsize:0,
        }
    },
    mounted(){
        this.sortdata();
        this.bannerdata();
        this.ninedata()
    },
    methods:{ 
        sortdata(){
            this.$axios.get("/sqy/w/website/findGoodsTypeList").then(res=>{
                // console.log(res);
                this.sortlist=res.data.data;
            })
        },
        bannerdata(){
            this.$axios.get('/sqy/w/website/bannerList').then(res=>{
                // console.log(res);
                this.bannerlist=res.data.data;
            })
        },
        ninedata(){
            this.$axios.get("/sqy/w/website/findGoodsList",{
                params:{
                    info:'9.9',
                    pageNo:this.currentPage,
                    platId:'d0a500ecf8ab41aa9ffe8e18ac6419e1'
                }
            }).then(res=>{
                console.log(res);
                this.ninelist=res.data.data.tbk_dg_material_optional_response.result_list.map_data;
                this.totalsize=res.data.data.tbk_dg_material_optional_response.total_results;
            })
        },
         handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage=val;
            if(this.currentPage){
                this.ninedata()
            }
        },
        jump(val){
            console.log(val);
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
    .ninebox{
        width: 300px;
        /* height:350px; */
        box-shadow: 0px 0px 5px #000;
        float: left;
        list-style: none;
    }
    .ninebox img{
        width: 300px;
        height: 300px;
     }
    /*.ninebox p{
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
    } */
</style>