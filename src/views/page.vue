<template>
    <div>
        
        <tou @getvalue="change($event)"></tou>
        <div class="subject_content">
            <el-button type="info" @click="newfrist">新增首页专题</el-button>
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
        <!-- 新增弹框 -->
        <el-dialog title="收货地址" :visible.sync="newvisible">
            <el-form :model="themeform">
                <el-form-item label="主题名称" :label-width="formLabelWidth">
                    <el-input v-model="themeform.subjectName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="主题ID" :label-width="formLabelWidth">
                    <el-input v-model.number="themeform.subjectId" autocomplete="off" placeholder="主题id是1-6" min="1" max="6"></el-input>
                </el-form-item>
                <el-form-item label="上传文件地址" :label-width="formLabelWidth">
                    <el-input type="text" v-model="themeform.pic"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newvisible = false">取 消</el-button>
                <el-button type="primary" @click="newfrom">确 定</el-button>
            </div>
            </el-dialog>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import tou from "@/components/top"
    export default {
        components:{
            tou
        },
        data(){
            return{
                formLabelWidth:'300',
                themeform:{
                    subjectName:'',
                    subjectId:1,
                    sort:0,
                    recommendStatus:1,
                    pic:'',
                },
                newvisible:false,
                isdl:this.$store.state.isLogin,
                sousuoval:'',
                subjectlist:[],
                newlist:[],
                getTopVal:'',
                defaultImg: 'this.src = "' + require('../assets/newlist.png') + '"',
                
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
            newfrist(){
                this.newvisible=true;
            },
            newfrom(){
                this.$axios.post('/api/home/recommendSubject/create',JSON.stringify([this.themeform]),{
                     headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res=>{
                    console.log(res);
                    if(res.data.code==200){
                        this.$message.success("数据新增成功")
                        this.$axios.get('/api/home/recommendSubject/list',{
                            params:{
                                subjectName:'',
                                recommendStatus:'',
                                pageSize:6,
                                pageNum:3
                            }
                        }).then(res=>{
                            console.log(res);
                        })
                        this.newvisible=false;
                    }
                })
            },
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