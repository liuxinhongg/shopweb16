<template>
  <div>
    <div class="page_top">
      <div class="top_sousuo">
        <el-input v-model="sousuoval" placeholder="请输入内容"></el-input>
        <el-button type="danger" size="mini" @click="search">搜索</el-button>
      </div>
      <div class="userinfo_right">
        <el-button type="text">
          <router-link to="/login" v-show="!isLogin">登陆</router-link>
        </el-button>
        <div class="userinfo"  v-show="isLogin">
          <img :src="usericon" alt srcset width="40" height="40" />
          <router-link to="/page">{{current}}</router-link>
        </div>
        <el-button type="text">
          <router-link to="/login" v-show="isLogin">[退出]</router-link>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sousuoval: "",
      usericon: localStorage.getItem("userAvatar")
    };
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.getIsLogin;
    },

    current: function() {
      return this.$store.getters.getCurrentuser;
    }
  },
  methods: {
    search() {
      this.$emit('getvalue', this.sousuoval)
    }
  }
};
</script>

<style scoped>
.page_top {
  width: 50%;
  height: 80px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.userinfo{
    width: 60px;
    height: 60px;
    text-align: center;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 50%;
    margin-right: 10px;
}
.userinfo_right{
    display: flex;
    justify-content: flex-start;
}
.top_sousuo {
  width: 300px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
}
</style>