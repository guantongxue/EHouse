<template>
  <div>
    <div></div>
    <div class="info-content">
        <ul>
            <li class="firstli">
                <div class="firstInfoLogo">
                  <a-avatar :size="85" slot="avatar" :src="headlogo"/>
                </div>            
                
                <!-- <span>{{userInfoDetail.username}}</span> -->
                <div class="firstInfo">
                  <span class="infoUsername">{{userInfoDetail.username}}</span>
                  <span class="infoUserAuth"><a-icon type="user" />&nbsp; {{userInfoDetail.authority =='1'?'普通用户':'企业用户'}}</span>
                </div>
                
            </li>
            <li class="changeli">
              用户密码: ·········· &nbsp;<a-button type="primary" shape="circle" icon="edit" :size="'small'" @click="changePWD"/>
            </li>
            <li class="changeli">
              绑定手机号：{{userInfoDetail.tel_phone}}&nbsp;<a-button type="primary" shape="circle" icon="edit" :size="'small'" @click="changeTel"/>
            </li>
            <li class="changeli">
              身份证号码: {{userInfoDetail.id_card}}
            </li>
            <li class="changeli">用户描述: {{userInfoDetail.user_desc}}
              &nbsp;<a-button type="primary" shape="circle" icon="edit" :size="'small'" @click="changeUserDesc"/>
            </li>
        </ul>
    </a-list>

    </div>
    <change-pwd-modal ref="changePwdModal" @loadInfo="loadInfo"></change-pwd-modal>
    <change-tel ref="changeTel" @loadInfo="loadInfo"></change-tel>
    <change-user-desc ref="changeUserDesc"  @loadInfo="loadInfo"></change-user-desc>
  </div>
</template>

<script>
import {SelectUseDetail} from '@/api/userService'
import changePwdModal from '../changePwdModal.vue';
import changeTel from '../changeTel.vue';
import changeUserDesc from '../changeUserDesc.vue';
import { mapActions } from 'vuex';
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
export default {
  components: { changePwdModal,changeTel,changeUserDesc},
  name: '',
  data(){
      return{
          userInfoDetail:{},
          data,
          headlogo:require("../../assets/img/headlogo.png")
      }
  },
  mounted(){
      this.initUserInfo();
  },
  methods:{
    ...mapActions(['logout','userInfo']),
    initUserInfo(){
      let userName = '';
      if(this.$store.state.userInfo != null){
          userName = this.$store.state.userInfo.username
      }
      let body ={
          username:userName
      }
      SelectUseDetail(body).then(res=>{
          console.log("查询信息",res);
          this.userInfoDetail= res.data;
          if(res.code != 200){
            this.$router.push('/index')
            this.$message.warning('用户信息已失效请重新登录')
            this.logout();
          } 
      }).catch(e=>{
          this.$router.push('/index')
          this.$message.warning('用户信息已失效请重新登录')
          this.logout();
          console.log(e)
      })
    },
    changePWD(){
      this.$refs.changePwdModal.visible = true
    },
    changeTel(){
      this.$refs.changeTel.visible = true
    },
    changeUserDesc(){
      this.$refs.changeUserDesc.visible = true
    },
    loadInfo(){
      this.initUserInfo()
    }
  }
}
</script>

<style>
.info-content{
    width: 100%;
    padding:10px 20px;
}
ul li{
    list-style: none;
}
ul li{
    width: 100%;
}
.firstli{
  margin-top:28px ;
}
.firstInfoLogo{
  display: inline-block;
}
.firstInfo{
  display: inline-block;
  vertical-align: top;
}
.infoUsername{
  display: block;
  width: 100%;
  font-size: 16px;
  height: 50px;
  font-weight: 500;
  color: black;
  padding-top: 20px;
}
.infoUserAuth{
  width: 100%;
  height: 50px;
  display: block;
  padding-top: 5px;
}
.changeli{
  margin-top: 25px;
  margin-left: 15px;
}
</style>
