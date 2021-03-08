<template>
  <div>
    <header-register></header-register>
    <a-steps v-model="current" type="navigation" :style="stepStyle">
      <a-step status="finish" title="用户信息填写" >
        <a-icon slot="icon" type="user" />
      </a-step>
      <a-step status="process" title="绑定手机">
        <a-icon slot="icon" type="mobile" />
      </a-step>
    </a-steps>
    <write-user-info @submitUserInfo="submitUserInfo"></write-user-info>
  </div>
</template>

<script>
import HeaderRegister from '../components/headerRegister.vue';
import WriteUserInfo from '../components/writeUserInfo.vue';
export default {
  name:'register',
  data(){
    return{
      current: 1,
      stepStyle: {
        marginBottom: '60px',
        boxShadow: '0px -1px 0 0 #e8e8e8 inset',
      },
    }
  },
  components:{
    HeaderRegister,
    WriteUserInfo
  },
  methods:{
    submitUserInfo(form){
      console.log("用户信息",form)
    }
  }
};
</script>

<style>



</style>
