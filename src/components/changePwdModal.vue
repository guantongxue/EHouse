<template>
  <div>
    <a-modal
      title="修改密码"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :cancelText="'取消'"
      :okText="'提交'"
    >
      <div class="userInfo-content">
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item
            label="旧密码"
            has-feedback
            :validate-status="oldpassword_status"
            :required="true"
          >
            <a-input-password
              v-model="form.oldpwd"
              id="success1"
              placeholder="请输入旧密码"
            />
          </a-form-item>
          <a-form-item
            label="新密码"
            has-feedback
            :validate-status="password_status"
            :required="true"
          >
            <a-input-password
              v-model="form.password"
              id="success2"
              placeholder="请输入新密码"
            />
          </a-form-item>
          <a-form-item
            label="确认密码"
            has-feedback
            :validate-status="surepwd_status"
            :required="true"
          >
            <a-input-password
              v-model="form.surepwd"
              id="success3"
              placeholder="请确认用户密码"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
import {ChangePwd} from '@/api/userService'
export default {
  data() {
    return {
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      userName: "",
      userPwd: "",
      form: {
        oldpwd: "",
        password: "",
        surepwd: "",
      },
      password_status: "",
      surepwd_status: "",
      oldpassword_status: "",
      isDifferent: false,
    };
  },
  methods: {
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      if(this.password_status == "success" && this.surepwd_status == "success" && this.oldpassword_status == "success"){
        let body = {
          username:this.$store.state.userInfo.username,
          oldpwd:this.form.oldpwd,
          newpwd:this.form.password
        }
        ChangePwd(body).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success(res.message)
          }else{
            this.$message.error(res.message)
          }
          this.confirmLoading = false
          this.visible =false
          this.loadInfo();
        }).catch(e=>{
          this.$message.error("系统错误")
          this.confirmLoading = false
          this.visible =false
        })
      }else{
        this.confirmLoading = false
        this.visible =false
        return
      }
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    loadInfo(){
      this.$emit("loadInfo")
    }
  },
  watch: {
    form: {
      handler(newName, oldName) {
        // ...
        const vm = this;
        if (newName.oldpwd != "") {
          this.oldpassword_status = "success";
          if (
            newName.oldpwd.match(/^[ ]*$/) ||
            newName.oldpwd.indexOf(" ") > -1
          ) {
            this.oldpassword_status = "error";
          } 
        } else {
          this.oldpassword_status = "";
        }
        if (newName.surepwd == "") {
          this.surepwd_status = "";
        } else {
          if (
            newName.surepwd.match(/^[ ]*$/) ||
            newName.surepwd.indexOf(" ") > -1
          ) {
            this.surepwd_status = "error";
          }
        }
        if (newName.password != "") {
          if (newName.surepwd == "") {
            this.surepwd_status = "";
          }
          if (newName.surepwd == "") {
            this.password_status = "success";

            if (
              newName.password.match(/^[ ]*$/) ||
              newName.password.indexOf(" ") > -1
            ) {
              this.password_status = "error";
            }
          } else if (newName.surepwd != "") {
            if (newName.surepwd != newName.password) {
              this.password_status = "error";
              this.surepwd_status = "error";
            } else {
              this.password_status = "success";
              this.surepwd_status = "success";
              if (
                newName.password.match(/^[ ]*$/) ||
                newName.password.indexOf(" ") > -1
              ) {
                this.password_status = "error";
              }
              if (
                newName.surepwd.match(/^[ ]*$/) ||
                newName.surepwd.indexOf(" ") > -1
              ) {
                this.surepwd_status = "error";
              }
            }
          }
        } else {
          this.password_status = "";
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.userInfo-content {
  width: 80%;
  margin-left: 15%;
}
</style>
