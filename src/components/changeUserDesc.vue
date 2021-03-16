<template>
  <div>
    <a-modal
      title="修改用户简介"
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
            label="用户简介"
            has-feedback
            :validate-status="userDesc_status"
            :required="true"
          >
            <a-input
            type="textarea"
              v-model="form.userDesc"
              id="success1"
              placeholder="请输入用户简介"
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
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
      userName: "",
      userPwd: "",
      form: {
        userDesc: "",
      },
      userDesc_status: "",

    };
  },
  methods: {
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;

        let body = {
          username:this.$store.state.userInfo.username,
          userDesc:this.form.userDesc
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
        if (newName.userDesc != oldName.userDesc) {
          this.telphone_status = "success";
        } else {
          this.userDesc_status = "";
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
  margin-left: 10%;
}
</style>
