<template>
  <a-layout-header class="backLayout">
    <a-row>
      <a-col :span="2">
        <img src="../assets/ehouse.svg" class="logo" />
      </a-col>
      <a-col :span="5">
        <a-icon type="environment" />
        <a-button type="link" class="environment-button"> 福州 </a-button>
      </a-col>
      <a-col :span="17">
           <a-row>
               <a-col :span="3">
                   <a-dropdown>
                        <a class="ant-dropdown-link environment-button" >
                        <a-icon type="menu"/>房源服务    
                        </a>
                        <a-menu slot="overlay" class="overlay_adst">
                            <a-menu-item>
                              <a href="javascript:;">购房</a>
                             </a-menu-item>
                            <a-menu-item>
                              <a href="javascript:;">租房</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
               </a-col>
               <a-col :span="8">
                <!-- 搜索框 -->
                <a-input-search class="search-input" placeholder="输入关键字" enter-button @search="onSearch" />
               </a-col>
               <a-col :span="13">
                 <a-row class="environment-button">
                   <a-col :span="5"></a-col>
                   <a-col :span="8">
                    <span>发布房源</span>
                   </a-col>
                   <a-col :span="8">房源管理</a-col>
                   <a-col :span="3">
                      <div>
                        <a-dropdown v-if="false">
                          <a-avatar shape="square" @click="e => e.preventDefault()"
                           src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                          <a-menu slot="overlay">
                            <a-menu-item>
                              <a href="javascript:;" @click="login">登录/注册</a>
                            </a-menu-item>
                            <a-menu-item>
                              <a href="javascript:;">2nd menu item</a>
                            </a-menu-item>
                            <a-menu-item>
                              <a href="javascript:;">退出登录</a>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                        <a-button type="link" @click="showModal" v-else>
                          登录/注册
                        </a-button>
                        <!-- 登录注册弹窗 -->
                        <login @showModal="showModal"
                               @hideModal="hideModal" :visible="visible"
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
export default {
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
        // login(){
        //   this.visible = true
        // },
        showModal(){
          this.visible = true 
        },
        hideModal(){
          this.visible = false
        },
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
</style>
