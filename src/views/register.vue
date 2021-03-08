<template>
  <div>
    <header-register></header-register>
    <a-steps v-model="current" type="navigation" :style="stepStyle">
      <a-step status="finish" title="用户信息填写" @click="changeCurrent(0)" >
        <a-icon slot="icon" type="user" />
      </a-step>
      <a-step status="process" title="绑定手机" @click="changeCurrent(1)">
        <a-icon slot="icon" type="mobile" />
      </a-step>
    </a-steps>
    <write-user-info v-if="current==0" @submitUserInfo="submitUserInfo"></write-user-info>
    <phone-verification v-if="current==1"></phone-verification>
  </div>
</template>

<script>
import HeaderRegister from '../components/headerRegister.vue';
import WriteUserInfo from '../components/writeUserInfo.vue';
import PhoneVerification from '../components/phoneVerification.vue';

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
    submitUserInfo(form){
      console.log("用户信息",form)
    },
    changeCurrent(index){
      this.current = index
    }
  }
};
</script>

<style>



</style>
