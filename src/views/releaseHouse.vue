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
import {UserLogin} from "@/api/userService.js"
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
  },
  mounted() {},
};
</script>

<style>
</style>
