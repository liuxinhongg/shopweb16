<template>
    <div>
        <!-- <top/> -->
dfgdfgfdgdfg
    </div>
</template>

<script>
import top  from "./top"
    export default {
        components:{
            top
        },
        data(){
            return{
                isdl:this.$store.state.isLogin,
            }
        },
        created(){
            if (this.isdl==false) {
                this.$router.push("/login");
            }
        }
        
    }
</script>

<style scoped>

</style>