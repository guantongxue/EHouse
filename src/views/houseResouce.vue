<template>
  <div id="">
    <resouce-header
      ref="layout_header"
      @userLogin="userLogin"
      :positionCity="positionCity"
      @gotoRelease="gotoRelease"
      @gotoPerson="gotoPerson"
    >
    </resouce-header>
    <resouce-content></resouce-content>
    11
    <right-slider></right-slider>
  </div>
</template>

<script>
import ResouceHeader from "../components/resouceShow/resouceHead";
import ResouceContent from "../components/resouceShow/resouceContent";
import { UserLogin } from "@/api/userService.js";
import { getPosition } from "@/api/map.js";
import RightSlider from '../components/rightSlider.vue';
export default {
  name: "",
  components: {
    ResouceHeader,
    RightSlider,
    ResouceContent,
  },
  data() {
    return {
      positionCity: "未加载",
    };
  },
  methods: {
    userLogin(userForm) {
      console.log("用户信息", userForm);
      let body = {
        username: userForm.username,
        password: userForm.password,
      };
      UserLogin(body)
        .then((res) => {
          console.log("当前信息", res);
          if (res.code == 200) {
            this.$notification["success"]({
              message: "登录成功",
            });
            console.log("ref", this.$refs.layout_header);
            this.$refs.layout_header.visible = false;
            let details = {
              username: res.data.username,
              token: res.token,
              refreshToken: res.refreshToken,
            };
            this.$store.commit("userInfo", details);
            // this.userInfo.set(details)
          } else {
            this.$notification["error"]({
              message: res.message,
            });
          }
        })
        .catch((e) => {
          this.$message.error("服务响应失败");
        });
    },
    gotoRelease() {
      if (this.$store.state.userInfo == null) {
        this.$refs.layout_header.visible = true;
        return;
      }
      this.$router.push("/releaseHouse");
    },
    gotoPerson(){
      this.$router.push("/person/myCollection")
    },
  },
  mounted() {
    getPosition().then((res) => {
      if (res.code == 200) {
        this.positionCity = res.data.city;
      }
      console.log("res", res);
    });
  },
};
</script>

<style>
</style>
