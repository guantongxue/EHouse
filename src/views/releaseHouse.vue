<template>
  <div>
    <release-head
      @gotoPerson="gotoPerson"
      @logout="logoutContent"
      @userLogin="userLogin"

      @gotoIndex="gotoIndex"
      ref="releaseHead"
    >
    </release-head>
    <release-house-content></release-house-content>
  </div>
</template>

<script>
import ReleaseHead from "../components/releaseHead.vue";
import releaseHouseContent from "../components/releaseHouseContent.vue";
import { mapActions, mapState } from "vuex";
import {UserLogin,SelectUseDetail} from "@/api/userService.js"
export default {
  data() {
    return {};
  },
  components: {
    ReleaseHead,
    releaseHouseContent,
  },
  computed: {},
  methods: {
    ...mapActions(["logout", "userInfo"]),
    gotoPerson() {
      this.$router.push("/person/myCollection");
    },

    logoutContent() {
      this.logout();
      this.$router.push('/index')
    },
    userLogin(userForm) {
      console.log("用户信息", userForm);
      let body = {
        username: userForm.username,
        password: userForm.password,
      };
      UserLogin(body).then((res) => {
        console.log("当前信息", res);
        if (res.code == 200) {
          this.$notification["success"]({
            message: "登录成功",
          });
          console.log("ref", this.$refs.releaseHead);
          this.$refs.releaseHead.visible = false;
          let details = {
            username: res.data.username,
            token: res.token,
            refreshToken: res.refreshtoken,
          };
          this.$store.commit("userInfo", details);
        } else {
          this.$notification["error"]({
            message: res.message,
          });
        }
      });
    },
    gotoIndex(){
        this.$router.push('/index')
    },
    initUserInfo(){
      let userName = '';
      if(this.$store.state.userInfo != null){
          userName = this.$store.state.userInfo.username
      }
      let body ={
          username:userName
      }
      SelectUseDetail(body).then(res=>{
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
  },
  mounted() {
    this.initUserInfo();
  },
};
</script>

<style>
</style>
