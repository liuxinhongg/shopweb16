<template>
    <div>
        
        <tou @getvalue="change($event)"></tou>
        <div class="subject_content">
            <h1> <font color="red">———专题推荐———</font> </h1>
            <div class="item" v-for="(item,index) in subjectlist" :key="index">
                <img :src="item.pic" alt="">
                <h3>{{item.subjectName}}</h3>
            </div>
        </div>
        <div class="subject_content">
         <h1> <font color="red">———新品推荐———</font> </h1>
            <div class="item" v-for="(item,index) in newlist" :key="index">
                <!-- <img :src="item.pic"  :error="defaultImg" /> -->
                <!-- <img :src="item.pic==undefined ? '../assets/newlist.png':item.pic" alt=""> -->
                <img src="../assets/newlist.png" alt="" srcset=""> 
                <h3>{{item.productName}}</h3>
            </div>
        </div>
    </div>
</template>
<script>
// import { mapMutations } from 'vuex';
import tou from "@/components/top"
    export default {
        components:{
            tou
        },
       
        data(){
            return{
                isdl:this.$store.state.isLogin,
                sousuoval:'',
                subjectlist:[],
                newlist:[],
                getTopVal:'',
                defaultImg: 'this.src = "' + require('../assets/newlist.png') + '"'
            }
        },
        mounted(){
            // console.log(this.$store.getters.isLogin);
            console.log(this.isdl)
            if (this.isdl==false) {
                this.$router.push("/login");
            }
            // 首页新品管理--查询
            this.recommendSubject();
            // 新品管理 
            this.newProduct();
        },
        methods:{
            defaultBackImg() {
                if(event.type == "error") {
                event.target.src= require("../assets/newlist.png")
                }
            },
            change(data) {
                console.log(data);
                this.getTopVal=data;
                this.recommendSubject();
            },
            // 首页专题推荐管理--查询
            recommendSubject(){
                this.$axios.get("/api/home/recommendSubject/list",{
                    params:{
                        subjectName:this.getTopVal,
                        recommendStatus:'',
                        pageSize:10,
                        pageNum:1
                    }
                }).then(res=>{
                    // console.log(res);
                    if (res.data.code==401) {
                        this.$router.push("/")
                    }else{
                        this.subjectlist=res.data.data.list;
                    }
                
                })
            },
            // 新品管理 GET /home/newProduct/list
            newProduct(){
                this.$axios.get("/api/home/newProduct/list",{
                    params:{
                        productName:this.getTopVal,
                        recommendStatus:'',
                        pageSize:6,
                        pageNum:1
                    }
                }).then(res=>{
                    console.log(res);
                    // console.log(res.data.data.list[0].pic)
                    this.newlist=res.data.data.list;
                })
            }

        }
    }
</script>

<style>

.subject_content{
    width: 80%;
    overflow: hidden;
    margin: auto;
    text-align: center;
}
.item{
    width: 200px;
    height: 250px;
    box-shadow: 0px 0px 5px #ccc;
    margin: 10px;
    float: left;
    text-align: center;
}
.item img{
    width: 200px;
    height: 200px;
}
.item h3{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>