<template>
  <div>
    <layout-header
      ref="layout_header"
      @logout="logoutContent"
      @userLogin="userLogin"
      @gotoPerson="gotoPerson"
      @gotoIndex="gotoIndex"
    >
    </layout-header>
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible theme="light" class="sider-adst">
        <div>
            <!-- @click="() =>{collapsed = !collapsed} " -->
        <a-icon
            class="trigger trigger-adst"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="clickCollapsed"
        />
        </div>
        <a-menu theme="light" mode="inline" :default-selected-keys="[defalutSelected]">
          <a-menu-item key="/person/myCollection" @click="gotoMyCollection">
            <a-icon type="star" />
            <span>我的收藏</span>
          </a-menu-item>
          <a-menu-item key="/person/myRelease" @click="gotoMyRelease">
            <a-icon type="cloud-upload" />
            <span>我的发布</span>
          </a-menu-item>
          <a-menu-item key="/person/myInfo" @click="gotoMyInfo">
            <a-icon type="user" />
            <span>个人信息</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content
          ref="myContent"
          :style="{
            margin: `24px 85px 24px ${leftAdst}`,
            padding: '16px',
            background: '#fff',
            minHeight: initMinHeight,
          }"
        >
          <!-- 内容界面 -->
          <router-view />
        </a-layout-content>
        <right-slider></right-slider>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import LayoutHeader from "../components/personHeader"
import RightSlider from '../components/rightSlider.vue';
import {UserLogin} from "@/api/userService.js"
import { mapActions,mapState} from 'vuex'
export default {
  name: "",
  components: {
    LayoutHeader,
    RightSlider,
  },
  data() {
    return {
      collapsed: false,
      defalutSelected:'/person/myCollection',
      initMinHeight:'',
      leftAdst:'235px'
    };
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
            refreshToken:res.refreshtoken
          };
          this.$store.commit('userInfo', details)
        }else{
          this.$notification['error']({
          message: res.message,
          });
        }
      })
    },
    logout(){
      this.$router.push('/index')
    },
    gotoPerson(){
      this.$router.push("/person/myCollection")
    },
    gotoIndex(){
        this.$router.push('/index')
    },
    gotoMyCollection(){
        this.$router.push("/person/myCollection")
    },
    gotoMyRelease(){
        this.$router.push("/person/myRelease")
    },
    gotoMyInfo(){
        this.$router.push("/person/myInfo")
    },
    clickCollapsed(){
        this.collapsed = !this.collapsed
        if(this.collapsed){
            this.leftAdst = '120px'
        }else{
            this.leftAdst = '235px'
        }
    }
  },
  created(){
      this.defalutSelected = this.$route.path
      console.log("gao",document.body.clientHeight)
      this.initMinHeight = document.body.clientHeight-115+"px"
  },
  mounted(){
  },
  
};
</script>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.ant-menu-item-selected{
    color: #FF787E !important;
}
li:hover{
    color: #FF787E !important;
}
i:hover{
    color: #FF787E !important;
}
.ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after, .ant-menu-inline .ant-menu-item::after{
        border-right: 3px solid #FF787E !important;
}
::selection{
    background: #FF787E !important;
}
.trigger-adst{
    padding: 0px 25px !important;
}
.ant-layout-sider-light {
    background: #fff;
    position: fixed;
    height: 100%;
}
.ant-layout-content {
    /* margin-left: 223px !important; */
}
</style>
