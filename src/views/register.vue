<template>
  <div>
    <header-register></header-register>
    <a-steps v-model="current" type="navigation" :style="stepStyle">
      <a-step status="finish" title="用户信息填写" @click="changeCurrent(0)" >
        <a-icon slot="icon" type="user" />
      </a-step>
      <!-- <a-step status="process" title="绑定手机" @click="changeCurrent(1)">
        <a-icon slot="icon" type="mobile" />
      </a-step> -->
    </a-steps>
    <write-user-info v-if="current==0" @submitUserInfo="submitUserInfo"></write-user-info>
    <phone-verification v-if="current==1"></phone-verification>
  </div>
</template>

<script>
import HeaderRegister from '../components/headerRegister.vue';
import WriteUserInfo from '../components/writeUserInfo.vue';
import PhoneVerification from '../components/phoneVerification.vue';
import {UserRegister} from '@/api/userService.js'
import { mapActions } from 'vuex'
export default {
  name:'register',
  data(){
    return{
      current: 0,
      stepStyle: {
        marginBottom: '60px',
        boxShadow: '0px -1px 0 0 #e8e8e8 inset',
      },
    }
  },
  components:{
    HeaderRegister,
    WriteUserInfo,
    PhoneVerification
  },
  methods:{
    ...mapActions(['userInfo']),
    submitUserInfo(form){
      console.log("用户信息",form)
      let body ={
        username : form.username,
        password : form.password,
        user_desc: form.userdesc,
        authority: 1
      }
      console.log("form",body)
      UserRegister(body).then(res=>{
        console.log("提交信息",res)
        if(res.code == 200){
          this.$message.success('用户注册成功');
          let userDeatil = {
            username:res.data.username,
            token:res.token,
            refreshToken:res.refreshToken
          }
          this.userInfo(userDeatil)
          this.$router.push("/index")
        }else{
          this.$message.error('用户失败');
        }
      })

    },
    changeCurrent(index){
      this.current = index
    }
  }
};
</script>

<style>



</style>
