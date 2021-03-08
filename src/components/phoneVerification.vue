<template>
  <div class="phone-content">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item
        label="手机号码"
        has-feedback
        :validate-status="phone_status"
        :required="true"
      >
        <a-input
          v-model="form.telphone"
          id="success"
          placeholder="请输入手机号码"
        />
      </a-form-item>
        <a-form-item
        label="验证码"
        has-feedback
        :validate-status="phone_status"
        :required="true"
      >
        <a-input
          v-model="form.verificationCode"
          id="success"
          class="input-adst"
          placeholder="请输入验证码"
        />
        <a-button type="danger" class="button-adst">
          获取验证码
        </a-button>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit" :size="'large'" @click="submitTelInfo">
                    立即绑定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "phoneVerification",
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      form:{
          telphone:"",
          verificationCode:""
      },
      phone_status:""
    };
  },
  props: {

  },
  methods: {
  submitTelInfo(){

  }
  },
};
</script>
<style  scoped>
.phone-content {
  width: 60%;
  margin-left: 18%;
}
.input-adst{
    width: 60%;
}
.button-adst{
  /* position: absolute; */
  right: 0;
}
</style>