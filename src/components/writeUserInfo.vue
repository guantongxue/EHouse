<template>
    <div class="userInfo-content">
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="用户名" has-feedback :validate-status="username_status"
             :required="true" :help="isDifferent?'用户名已存在':''">
                <a-input v-model="form.username" id="success" placeholder="请输入用户名" />
            </a-form-item>
            <!-- <a-form-item label="" has-feedback >
                <span>用户名已存在</span>
            </a-form-item> -->
            <a-form-item label="用户密码" has-feedback :validate-status="password_status" :required="true">
                <a-input-password v-model="form.password" id="success" placeholder="请输入用户密码" />
            </a-form-item>
            <a-form-item label="确认密码" has-feedback :validate-status="surepwd_status" :required="true">
                <a-input-password v-model="form.surepwd" id="success" placeholder="请确认用户密码" />
            </a-form-item>
            <a-form-item label="用户描述" has-feedback >
                <a-input v-model="form.userdesc" id="success" placeholder="请输入用户描述" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit" :size="'large'" @click="submitUserInfo">
                    立即注册
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import {DuplicateName} from "@/api/userService.js"
export default {
    name:'writeUserInfo',
    props:{

    },
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
            userName:'',
            userPwd:'',
            form:{
                username:'',
                password:'',
                surepwd:'',
                userdesc:''
            },
            username_status:'',
            password_status:'',
            surepwd_status:'',
            isDifferent:false
        };
    },
    components:{
      
    },
    methods:{
       submitUserInfo(){
           if(this.username_status != "success" || this.password_status != "success" || this.surepwd_status != "success"){
               this.$message.error('注册信息输入不正确');
               return
           }else{
               this.$emit("submitUserInfo",this.form)
           }
       },
       isDifferentName(val){
           let flag = false
           let body={
               username:val
           }
           DuplicateName(body).then(res=>{
               console.log("信息",res);
               if(res.code == 200){
                   this.username_status ="success"
                   this.isDifferent = false
               }else{
                   this.username_status ="error"
                   this.isDifferent = true
               }
               if(val ==""){
                   this.username_status =""
                   this.isDifferent = false
               }

           })
       }
    },
    computed:{
    
    },
    watch:{
    form: {
    　　handler(newName, oldName) {
      　　// ...
            const vm = this
            if(newName.username !=""){
                this.username_status ="success"
                if(newName.username.match(/^[ ]*$/) || newName.username.indexOf(" ")>-1){
                    this.username_status ="error"
                }else{
                    vm.isDifferentName(newName.username)
                }

            }else{
                this.username_status =""
            }
            if(newName.surepwd == ""){
                this.surepwd_status = ""
            }else{
                if(newName.surepwd.match(/^[ ]*$/) || newName.surepwd.indexOf(" ")>-1){
                    this.surepwd_status ="error"
                }
            }
            if(newName.password != ""){
                if(newName.surepwd == ""){
                    this.surepwd_status = ""
                }
                if(newName.surepwd ==""){
                    this.password_status = "success"
                    
                    if(newName.password.match(/^[ ]*$/)|| newName.password.indexOf(" ")>-1 ){
                        this.password_status ="error"
                    }

                }else if(newName.surepwd !=""){
                    if(newName.surepwd != newName.password){
                        this.password_status = "error"
                        this.surepwd_status = "error"
                        
                    }else{
                        this.password_status = "success"
                        this.surepwd_status = "success"
                        if(newName.password.match(/^[ ]*$/) || newName.password.indexOf(" ")>-1){
                            this.password_status ="error"
                        }
                        if(newName.surepwd.match(/^[ ]*$/) || newName.surepwd.indexOf(" ")>-1){
                            this.surepwd_status ="error"
                        }
                    }
                }
            }else{
                this.password_status = ""
            }
            
    　　},
    　　deep: true
    }
    }
};
</script>

<style scoped>
.userInfo-content{
    width: 80%;
    min-height: 700px;
    margin-left: 15%;
}

</style>
