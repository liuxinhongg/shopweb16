<template>
  <div class="loginbox">
    <el-form
      :model="loginform"
      status-icon
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginform.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input type="password" v-model="loginform.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginForm()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      loginform: {
        username: "",
        password: "",
      }
    };
  },
  methods:{
     ...mapMutations(['changeLogin']),
    loginForm(){
      let _this = this;
      this.$axios.post("/api/admin/login",_this.loginform).then(res=>{
        console.log(res);
        if(res.data.code===404){
          _this.$message.error("用户名或密码错误");
        }else if(res.data.code===200){
          _this.userToken = 'Bearer ' + res.data.data.token;
          // 将用户token保存到vuex中
          _this.changeLogin({ Authorization: _this.userToken });
          _this.$axios.get("/api/admin/info").then(res=>{
            console.log(res);
            let users=res.data.data
            // let users=[];
            // users.push(res.data.data);
            // console.log(users)
            // let isUser=users.filter(item=>{
            //   return item.username==this.loginform.username
            // })
            if(users){
              _this.$store.dispatch("setUser",users);
              _this.$message.success("登录成功");
              _this.$router.push("/page")
            }else{
              _this.$store.dispatch("setUser",null);
              _this.$message.error("当前用户不存在");
            }
          })
        }
      })
    }
  },
  // 登录页面中进行路由守卫，推出后进行清空用户信息
  beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.dispatch("setUser", null);
      });
    },
};
</script>

<style>
.loginbox{
  width: 30%;
  margin: 200px auto;
}
</style>