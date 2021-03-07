<template>
  <a-layout-header class="backLayout">
    <a-row>
      <a-col :span="2">
        <img src="../assets/ehouse.svg" class="logo" />
      </a-col>
      <a-col :span="2">
        <span class="headerTitle">用户注册</span>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
export default {
    name:'headRegister',
    data() {
        return {
          
        };
    },
    components:{
      
    },
    methods:{
       
    }
};
</script>

<style>
.logo{
  display: block;
  width: 120px;
  height: 31px;
  margin: 16px 0 16px 0;
  float: left;
}
.backLayout{
  /* width: 100%; */
  position:sticky;
  top: 0;
  background: white  !important;
  z-index: 200;
  box-shadow: -2px 0px 4px 0px rgba(0, 0, 0, 0.1);
}
.headerTitle{
  font-size:18px ;
  font-weight: 500;
  color: black;
}
</style>
