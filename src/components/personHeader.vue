<template>
  <a-layout-header class="backLayout">
    <a-row>
      <a-col :span="2">
        <img src="../assets/ehouse.svg" class="logo" @click="gotoIndex"/>
      </a-col>
      <a-col :span="5" class="head-title">
        <span >{{headTitle}}</span>
      </a-col>
      <a-col :span="17">
           <a-row>
               <a-col :span="3">
                  <div  class="goto-index" @click="gotoIndex">
                    <a-icon type="home"/>首页  
                  </div>  
               </a-col>
               <a-col :span="8">
                <!-- 搜索框 -->
               </a-col>
               <a-col :span="13">
                 <a-row class="environment-button">
                   <a-col :span="5"></a-col>
                   <a-col :span="8">
                    <span @click="gotoRelease" class="release">发布房源</span>
                   </a-col>
                   <a-col :span="8"></a-col>
                   <a-col :span="3">
                      <div>
                        <a-dropdown v-if="getUserInfo!=null">
                          <a-avatar shape="square" @click="e => e.preventDefault()"
                           src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                          <a-menu slot="overlay">
                            <a-menu-item>
                              <a href="javascript:;" >欢迎您:{{$store.state.userInfo.username}}</a>
                            </a-menu-item>
                            <a-menu-item>
                              <a href="javascript:;" @click="gotoPerson">个人中心</a>
                            </a-menu-item>
                            <a-menu-item>
                              <a href="javascript:;" @click="logout">退出登录</a>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                        <a-button type="link" @click="showModal" v-else>
                          登录/注册
                        </a-button>
                        <!-- 登录注册弹窗 -->
                        <login @showModal="showModal"
                               @hideModal="hideModal" :visible="visible"
                               @userLogin="userLogin"
                               >
                        </login>
                      </div>
                   </a-col>
                 </a-row>
               </a-col>
           </a-row> 
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
import Login from './login.vue';
// import {mapActions,mapState} from "vuex"

export default {
    props:{
      headTitle:{
        type:String
      }
    },
    data() {
        return {
          visible:false
        };
    },
    components:{
      Login
    },
    methods:{
        onSearch(){

        },
        callback(val) {
        console.log(val);
        },
        showModal(){
          this.visible = true 
        },
        hideModal(){
          this.visible = false
        },
        logout(){
          this.$emit("logout")
          this.$store.commit('logout')
        },
        userLogin(userForm){
           this.$emit("userLogin",userForm)
        },
        gotoPerson(){
          this.$emit("gotoPerson")
        },
        gotoIndex(){
          this.$emit("gotoIndex")
        },
        gotoRelease(){
          this.$emit("gotoRelease")
        },
    },
    computed:{
      // ...mapState(['userInfo']),
      getUserInfo(){
        return this.$store.state.userInfo
      }
    }
};
</script>

<style scoped>

.logo{
  display: block;
  width: 120px;
  height: 31px;
  margin: 16px 0 16px 0;
  float: left;
}
.backLayout{
  width: 100%;
  position:sticky;
  top: 0;
  background: white  !important;
  z-index: 200;
  box-shadow: -2px 0px 4px 0px rgba(0, 0, 0, 0.1);
}
.search-input{
    margin-top: 16px;
}
.overlay_adst:hover{
    background-color: white;
}
.environment-button{
  color: #202020  !important;
}
.ant-btn-primary{
  background-color: #FF787E  !important;
  border-color: #FF787E !important;

}
.ant-input:hover{
    border-color: #FF787E !important;
}
.head-title{
  font-size: 18px;
  font-weight: 500;
  color: black;
}
.goto-index:hover{
  color: #FF787E;
}
.release:hover{
  color: #FF787E;
}
</style>
