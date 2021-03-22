<template>
  <div>
    <a-layout id="components-layout-demo-top" class="layout">
      <layout-header ref="layout_header" 
      @logout="logoutContent" 
      @userLogin="userLogin"
      :positionCity="positionCity"
      @gotoPerson="gotoPerson"
      @gotoRelease="gotoRelease"
      >

      </layout-header>
      <a-layout-content style="padding: 0 50px">
        <!-- 分类 -->
        <crumd></crumd>
        <index-content></index-content>
        

        <!-- <div
          :style="{ background: '#fff', padding: '24px', minHeight: '1200px' }"
        >
          Content
        </div> -->
      </a-layout-content>
      <right-slider></right-slider>
      <a-layout-footer style="text-align: center">
        Ehouse ©2021 Created by GNW
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import LayoutHeader from '../components/header.vue';
import RightSlider from '../components/rightSlider.vue';
import Crumd from '../components/crumd.vue';
import IndexContent from '../components/indexContent.vue';
import "../assets/css/content.css";
import { mapActions,mapState} from 'vuex'
import {UserLogin} from "@/api/userService.js"
import {getPosition} from "@/api/map.js"
import axios from 'axios'

export default {
  data(){
    return{
      positionCity:"未加载"
    }
  },
  components:{
    LayoutHeader,
    RightSlider,
    Crumd,
    IndexContent,

  },
  computed:{

  },
  methods:{
    ...mapActions(['logout','userInfo']),
    logoutContent(){
      this.logout()
    },
    userLogin(userForm){
      console.log("用户信息",userForm);
      let body = {
        username:userForm.username,
        password:userForm.password
      }
      UserLogin(body).then(res=>{
        console.log("当前信息",res);
        if(res.code == 200){
          this.$notification['success']({
          message: '登录成功',
          });
          console.log("ref",this.$refs.layout_header)
          this.$refs.layout_header.visible = false
          let details={
            username:res.data.username,
            token:res.token,
            refreshToken:res.refreshToken
          };
          this.$store.commit('userInfo', details)
          // this.userInfo.set(details)
        }else{
          this.$notification['error']({
          message: res.message,
          });
        }
      }).catch(e=>{
          this.$message.error("服务响应失败")
      })
    },
    logout(){
      this.$store.commit('logout')
    },
    gotoPerson(){
      this.$router.push("/person/myCollection")
    },
    gotoRelease(){
      if(this.$store.state.userInfo == null){
        //  this.$message.warning("当前用户暂未登录")
        this.$refs.layout_header.visible = true
        return
      }
      this.$router.push("/releaseHouse")
    }
  },
  mounted(){
    getPosition().then(res=>{
      if(res.code == 200){
        this.positionCity = res.data.city
      }
      console.log("res",res)
    })
  }

};
</script>

<style>



</style>
