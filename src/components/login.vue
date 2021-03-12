<template>
  <div>
    <a-modal class="modal-adst" v-model="visible"  :footer="false" :closable="false" :maskClosable="false" :keyboard="false" >
    <div class="modal-content">
        <!-- 左侧展示界面 -->
        <div class="left-showInfo">
            <!-- 图标页面 -->
            <div class="left-showInfo-icon">
                <img src="../assets/ehouse.svg" class="left-showInfo-icon-img" />
            </div>
            <!-- 信息介绍页面 -->
            <div class="left-showInfo-info">
                <ul>
                    <li><a-icon type="check" class="check-adst"/>急速注册</li>
                    <li><a-icon type="check" class="check-adst"/>在线签约</li>
                    <li><a-icon type="check" class="check-adst"/>快速发布房源</li>
                    <li><a-icon type="check" class="check-adst"/>个性搜索房源</li>
                </ul>
            </div>
            <!-- 底部图片 -->
            <div class="left-showInfo-img">
                <img src="../assets/img/login-foot.png" alt="">
            </div>
        </div>
        <!-- 右侧登录注册界面 -->
        <div cclass="right-showInfo">
            <div @click="hideModal">
                <a-icon type="close" class="right-showInfo-close"/>
            </div>
            <div class="test">
                  <div class="card-container">
                      <a-tabs default-active-key="1" :animated="false">
                        <a-tab-pane key="1">
                        <span slot="tab">
                            <a-icon type="user" />
                            用户登录
                        </span>
                            <!-- 密码登录 -->
                            <div v-if="isPwd">
                                <div class="login-title">
                                    <a-icon type="user" /><span>&nbsp;密码登录</span>
                                </div>
                                <div class="login-input-area">
                                    <input type="text" v-model="userForm.username" class="login-userInfo" placeholder="请输入账号">
                                    <input type="password" v-model="userForm.password" class="login-pwd" placeholder="请输入密码">
                                    <div class="tel-login-error"></div>
                                    <a class="login-submit" @click="userLogin">立即登录</a>
                                </div>
                                <div class="login-change-type">
                                    <ul>
                                        <!-- <li @click="changeType">手机验证登录</li> -->
                                        <li>更多登录方式</li>
                                    </ul>
                                </div>
                                <div class="login-change-type2">
                                    <ul>
                                        <li @click="userRegister">立即注册</li>
                                        <li>忘记密码？</li>
                                    </ul>
                                </div>
                            </div>
                            <!-- 手机验证登录 -->
                            <div v-else>
                                 <div class="login-title">
                                    <a-icon type="mobile" /><span>&nbsp;手机验证登录</span>
                                </div>
                                <div class="login-input-area">
                                    <input type="text" class="login-userInfo" placeholder="请输入手机号">
                                    <!-- <input type="text" class="login-pwd" placeholder="请输入密码"> -->
                                    <div class="login-send-code">
                                        <input type="text" class="login-tel-code" placeholder="短信验证码">
                                        <a id="send-code-btn">发送验证码</a>
                                        <a id="CaptchaEl" data-appid="2032266202" data-cbfn="callback" type="button" class="slider_captcha" style="display: none;">发送验证码</a>
                                    </div>
                                    <div class="tel-login-error"></div>
                                    <a class="login-submit">立即登录</a>
                                </div>
                                <div class="login-change-type">
                                    <ul>
                                        <li @click="changeType">密码验证登录</li>
                                        <li>更多登录方式</li>
                                    </ul>
                                </div>
                                <div class="login-change-type2">
                                    <ul>
                                        <li  @click="userRegister">立即注册</li>
                                        <li>忘记密码？</li>
                                    </ul>
                                </div>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="2">
                        <span slot="tab">
                            <a-icon type="usergroup-add" />
                            企业登录
                        </span>
                         <!-- 密码登录 -->
                            <div>
                                <div class="login-title">
                                    <a-icon type="user" /><span>&nbsp;密码登录</span>
                                </div>
                                <div class="login-input-area">
                                    <input type="text" class="login-userInfo" placeholder="请输入账号">
                                    <input type="text" class="login-pwd" placeholder="请输入密码">
                                    <div class="tel-login-error"></div>
                                    <a class="login-submit">立即登录</a>
                                </div>
                                <div class="login-change-type">
                                    <ul>
                                        <!-- <li @click="changeType">手机验证登录</li> -->
                                        <li>更多登录方式</li>
                                    </ul>
                                </div>
                                <div class="login-change-type2">
                                    <ul>
                                        <li  @click="userRegister">立即注册</li>
                                        <li>忘记密码？</li>
                                    </ul>
                                </div>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
        </div>
    </div>

    </a-modal>
  </div>
</template>

<script>
import "../assets/css/modal.css"
export default {
  name: 'login',
  data(){
      return{
          isPwd:true,
          userForm:{
              username:"",
              password:""
          }
      }
  },
  props:{
      visible:{
          type:Boolean,
          default:false
      }
  },
  methods:{
    showModal() {
      this.$emit("showModal")
    },
    hideModal() {
      this.$emit("hideModal")
    },
    callback(key) {
      console.log(key);
    },
    changeType(){
        this.isPwd = !this.isPwd
    },
    userRegister(){
        this.$router.push('/register')
    },
    userLogin(){
        if(this.userForm.username.match(/^[ ]*$/) || this.userForm.username.indexOf(" ")>-1 || this.userForm.password.match(/^[ ]*$/) || this.userForm.password.indexOf(" ")>-1){
            this.$message.error("用户信息输入不正确");
            return
        }else{
            this.$emit("userLogin",this.userForm)
        }
    }
  }
}
</script>
<style scoped>
ul,li{
    list-style: none;
    padding: 0;
    margin: 0;
}


.modal-content{
    display: flex;
    width: 100%;
    height: 100%;
    
}
.left-showInfo{
    display: inline-block;
    width: 278px;
    height: 420px;
    background: linear-gradient(314deg,rgba(254,67,80,1) 0%,rgba(255,85,132,1) 100%);
    /* border-radius: 10px 0px 0px 10px; */
}
.left-showInfo-icon{
    margin-top: 50px;
    width: 278px;
    height: 57px;
    padding-left: 40px;
}
.left-showInfo-icon-img{
    width: 158px;
    height: 57px;
}
.left-showInfo-info{
    width: 278px;
    height: 154px;
    margin-top: 50px;
    padding-left: 40px;
}
.left-showInfo-info ul{
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.left-showInfo-info ul li{
    width: 100%;
    height: 50px;
    padding-left: 30px;
}
.check-adst{
    padding-right: 10px;
}
.left-showInfo-img{
    margin-top: 24px;
}
.right-showInfo{
    display: inline-block;
    width: 402px;
    height: 420px;
    background: white !important;
}
.test{
    width:402px;
}
.right-showInfo-close{
    position: absolute;
    right: -39px;
    top: -2px;
    font-size: 22px;
    padding:0;
    width: 34px;
    height: 34px;
    text-align: center;
    line-height: 38px;
    border-radius: 50px;
    background: rgba(0, 0, 0, 0.3);
    color: rgba(255, 255, 255, 0.7);
}
.login-input-area {
    text-align: left;
    width: 266px;
    margin: 0 auto;
}
.login-userInfo{
    width: 266px;
    height: 36px;
    line-height: 36px;
    background: rgba(241,243,247,1);
    border-radius: 22px;
    margin-bottom: 14px;
    /* margin-top: 20px; */
    margin-left:15px ;
    padding: 0 20px;
    outline: none;
    margin-bottom: 28px;
    border: 0 solid #000000;
}
.login-pwd{
    width: 266px;
    height: 36px;
    line-height: 36px;
    background: rgba(241,243,247,1);
    border-radius: 22px;
    margin-left:15px ;
    padding: 0 20px;
    outline: none;
    margin-bottom: 28px;
    border: 0 solid #000000;
}
.login-title{
    margin-bottom: 20px;
    text-align: center;
    margin-top: 10px;
    color: black;
    font-size: 18px;
}
.login-submit {
    width: 266px;
    height: 36px;
    line-height: 36px;
    background: rgba(255,120,126,1);
    border-radius: 25px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255,255,255,1);
    text-align: center;
    display: block;
    cursor: pointer;
    margin-top: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-left: 15px;
}
.login-change-type{
    width: 100%;
}
.login-change-type ul{
    margin-top: 20px;
    margin-left:22px ;
    width: 100%;
    display: flex;
    justify-content: center;
}
.login-change-type ul li{
    width: 90px;
    font-size: 12px;
    color: black;
}
.login-change-type ul li:hover{
    color: rgba(255,120,126,1);
}
.login-send-code{
    position: relative;
}
.login-tel-code{
    margin-bottom: 28px;
    height: 36px;
    line-height: 36px;
    background: rgba(241,243,247,1);
    border-radius: 22px;
    margin-left: 19px;
    padding: 0 20px;
    outline: none;
    border: 0 solid #000000;
}
#send-code-btn{
    position: absolute;
    width: 110px;
    height: 36px;
    background: rgba(255, 120, 126, 1);
    border-radius: 22px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 34px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    right: -13px;
}
.login-change-type2{
    width: 100%;
}
.login-change-type2 ul{
    margin-top: 5px;
    margin-left:22px ;
    width: 100%;
    display: flex;
    justify-content: center;
}
.login-change-type2 ul li:nth-child(1){
    width: 49px;
    font-size: 12px;
    color: black;
}
.login-change-type2 ul li:nth-child(2){
    padding-left: 21px;
    width: 90px;
    font-size: 12px;
    color: black;
}
.login-change-type2 ul li:hover{
    color: rgba(255, 120, 126, 1);
}
</style>