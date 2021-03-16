<template>
  <div>
    <a-modal
      title="修改绑定手机号"
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
            label="新手机号"
            has-feedback
            :validate-status="telphone_status"
            :required="true"
          >
            <a-input
              v-model="form.telphone"
              id="success1"
              placeholder="请输入更改后的手机号"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
import {ChangeUserInfo} from '@/api/userService'
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
        telphone: "",
      },
      telphone_status: "",

    };
  },
  methods: {
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      // setTimeout(() => {
      //   this.visible = false;
      //   this.confirmLoading = false;
      // }, 2000);
      if(this.telphone_status == "success"){
        let body = {
          username:this.$store.state.userInfo.username,
          userTel:this.form.telphone
        }
        ChangeUserInfo(body).then(res=>{
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
        this.$message.error("信息填写不正确")
        this.confirmLoading = false;
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
        if (newName.telphone != "") {
          this.telphone_status = "success";
          if (
            newName.telphone.match(/^[ ]*$/) ||
            newName.telphone.indexOf(" ") > -1
          ) {
            this.telphone_status = "error";
          } 
        } else {
          this.telphone_status = "";
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
