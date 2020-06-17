<template>
  <div>
    <el-form
      :model="registerForm"
      status-icon
      label-width="100px"
      class="registerruleForm"
    >
    <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="registerForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="icon">
        <el-input type="text" v-model="registerForm.icon" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input type="text" v-model="registerForm.nickName" autocomplete="off"></el-input>
      </el-form-item>
      
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="registerForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="note">
        <el-input type="text" v-model="registerForm.note" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="registersubmit()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        email:"",
        icon:"",
        nickName:"",
        username: "",
        note:"",
        password: "",
      }
    };
  },
  methods:{
    registersubmit(){
      this.$axios.post("/api/admin/register",this.registerForm).then(res=>{
        console.log(res);
        if(res.data.code===200){
          // localStorage.setItem('email', this.registerForm.email);
          this.$router.push("/");
        }
      })
    }
  }
};
</script>
<style lang="">
.registerruleForm{
  width: 30%;
  margin: 200px auto;
}
</style>