<template>
  <div>
    <layout-header
      ref="layout_header"
      @logout="logoutContent"
      @userLogin="userLogin"
      @gotoPerson="gotoPerson"
      @gotoIndex="gotoIndex"
      @gotoRelease="gotoRelease"
      :headTitle="'在线联系'"
    >
    </layout-header>
    <a-row class="lay-content">
      <a-col :span="4"> </a-col>
      <a-col :span="4">
        <div class="firendsList">
          <ul class="friendul">
            <li class="userLi" v-for="(value, index) in chatList" :key="index" @click="changeUserChat(value.chatId)">
              <a-avatar
                shape="square"
                style="margin-right: 10px"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />{{ value.chatId }}
            </li>
          </ul>
        </div>
      </a-col>
      <a-col :span="12">
        <a-card
          class="card-content"
          :title="chatId"
          :bordered="false"
          style="width: 100%"
        >
        </a-card>
        <div class="list-adst">
          <div
            v-for="(value, index) in chatList[chatIndex].data"
            :key="index"
            :class="
              value.userId === userId
                ? 'right-message'
                : 'left-message'
            "
          >
            <span
              v-if="
                chatList[chatIndex].data.length != 0 &&
                value.userId === userId
              "
            >
              <span class="self-msg">{{ value.message }}</span>
              <a-avatar
                class="msg-logo"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </span>
            <span
              v-if="
                chatList[chatIndex].data.length != 0 &&
                value.userId != userId
              "
            >
              <a-avatar
                class="msg-logo"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <span class="other-msg">{{ value.message }}</span>
            </span>
          </div>
        </div>

        <a-input-search
          v-model="message"
          placeholder="输入消息内容"
          enter-button="发送"
          size="large"
          @search="onSend"
        />
      </a-col>
      <a-col :span="6"> </a-col>
    </a-row>
  </div>
</template>

<script>
import LayoutHeader from "../components/personHeader";
import { mapActions, mapState } from "vuex";
import { UserLogin, SelectUseDetail } from "@/api/userService.js";
import { GetAllChatMessage } from "@/api/chatService.js";
export default {
  name: "",
  data() {
    return {
      defalutSelected: "/person/myCollection",
      chatList: [{ chatId: "", data: [] }],
      chatCheckList: [],
      message: "",
      userId: "",
      chatId: "",
      chatIndex:0,
      checkChatId: "",
      websock: null,
      userList: [
        {
          uid: "",
        },
      ],
    };
  },
  components: {
    LayoutHeader,
  },
  methods: {
    ...mapActions(["logout", "userInfo"]),
    //退出登录
    logoutContent() {
      this.logout();
    },
    //用户登录
    userLogin(userForm) {
      console.log("用户信息", userForm);
      let body = {
        username: userForm.username,
        password: userForm.password,
      };
      UserLogin(body).then((res) => {
        console.log("当前信息", res);
        if (res.code === 200) {
          this.$notification["success"]({
            message: "登录成功",
          });
          console.log("ref", this.$refs.layout_header);
          this.$refs.layout_header.visible = false;
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
    //前往个人中心
    gotoPerson() {
      this.$router.push("/person/myCollection");
    },
    //前往首页
    gotoIndex() {
      this.$router.push("/index");
    },
    //发布房源页面
    gotoRelease() {
      this.$router.push("/releaseHouse");
    },
    websocketonmessage(event) {
      let json = JSON.parse(event.data);
      console.log(json);
      this.onmessage(json);
    },
    websocketonopen() {
      console.log("Netty-WebSocket服务器。。。。。。连接");
    },
    websocketonerror() {
      console.log("Netty-WebSocket服务器。。。。。。异常");
    },
    websocketclose() {
      console.log("Netty-WebSocket服务器。。。。。。关闭");
    },
    initWebsocket() {
      console.log("snfjas");
      //初始化websocket
      return new Promise((resolve, reject) => {
        const ws = "ws://192.168.106.1:11111/ws";
        if (!window.WebSocket) {
          window.WebSocket = window.MozWebSocket;
        }
        if(window.WebSocket){
          console.log("id",this.userId);
          this.websock = new WebSocket(ws + "?userId=" + this.userId);
          console.log("url",ws + "?userId=" + this.userId);
          
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onopen = this.websocketonopen;
          this.websock.onerror = this.websocketonerror;
          this.websock.onclose = this.websocketclose;
        }else{
          this.$message.error("您的浏览器不支持WebSocket协议！")
        }

        resolve("ok");
      });
    },
    sendMessage() {
      let message = this.message; //发送的内容
      if (message == "") {
        this.$message.warning("不能发送空消息");
        return;
      }
      if (!window.WebSocket) {
        return;
      }
      let chatId = this.chatId; //好友Id或房间号id

      let messageType = "chat"; //  聊天类型

      if (messageType == "chat") {
        if (chatId == this.userId) {
          this.$message.warning("不能给自己发私聊信息,请换个好友吧");
          return
        }
        
        let item = {  
          chatId: this.chatId.toString(),
          message: this.message,
          messageType: "chat",
          status: true,
          userId: this.userId.toString(),
        };
        this.addChat(item);
      }

      if (this.websock.readyState == WebSocket.OPEN) {
        var data = {};
        data.chatId = this.chatId;
        data.message = this.message;
        data.userId = this.userId;
        data.messageType = messageType;
        this.websock.send(JSON.stringify(data));
        this.message = ""
      } else {
        this.$message.error("和服务器连接异常！");
        this.message = ""
      }
    },
    //接收消息处理方法
    onmessage(jsonData) {    
      let item = {
          chatId: jsonData.chatId,
          message: jsonData.message,
          messageType: "chat",
          status: true,
          userId: jsonData.userId,
      };
      this.addChat(item);
      this.message = "";
    },
    //发送消息
    onSend() {
      this.sendMessage();
    },
    initUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.$store.state.userInfo != null) {
          let body = {
            username: this.$store.state.userInfo.username,
          };
          SelectUseDetail(body)
            .then((res) => {
              if (res.code === 200) {
                console.log("是",res);
                
                this.userId = res.data.id;
              } else {
                this.$message.warning("用户信息已失效，请重新登录");
                this.$router.push("/index");
                this.logout();
              }
              resolve("ok");
            })
            .catch((e) => {
              this.$message.warning("用户信息已失效，请重新登录");
              this.$router.push("/index");
              this.logout();
              resolve("fail");
            });
        } else {
          this.$message.warning("用户暂未登录，请重新登录");
          this.logout();
          this.$router.push("/index");
          resolve("fail");
        }
      });
    },
    initChatList() {
      return new Promise((resolve, reject) => {
        let body = {
          userId: this.userId,
          chatId: this.chatId,
        };
        GetAllChatMessage(body)
          .then((res) => {
            if (res.code === 200) {
              console.log("消息列表", res);
              this.chatCheckList = res.data;
              this.checkArrayByChatId();
              this.getCheckChatIndex();
              resolve("ok");
            } else {
              this.$message.error("初始化消息列表失败");
              resolve("fail");
            }
          })
          .catch((e) => {
            this.$message.error("初始化消息列表失败");
            resolve("fail");
          });
      });
    },
    getOtherId() {
      return new Promise((resolve, reject) => {
        let body = {
          username: this.$route.params.userName,
        };
        SelectUseDetail(body)
          .then((res) => {
            if (res.code === 200 && res.data != null) {
              this.chatId = res.data.id;
              this.checkChatId = res.data.id;
              this.userList = [];

              this.chatList = [{ chatId: this.chatId, data: [] }];

              this.userList.push({ uid: this.chatId });
            } else {
              this.$message.warning("对方账号不存在，无法在线联系");
              this.$router.push("/index");
            }
            resolve("ok");
          })
          .catch((e) => {
            this.$message.warning("对方账号不存在，无法在线联系");
            this.$router.push("/index");
            resolve("fail");
          });
      });
    },
    async initOption() {
      //获取自己的id
      await this.initUserInfo();
      await this.getOtherId();
      await this.initWebsocket();
      //初始化消息列表
      await this.initChatList();
    },
    handleClick() {},
    //判断大小

    //根据chatId进行分组
    checkArrayByChatId() {
      if (this.chatCheckList.length != 0) {
        let map = {},
          dest = [];
        for (let i = 0; i < this.chatCheckList.length; i++) {
          let ai = this.chatCheckList[i];
          let chatFlag = "";
          if (parseInt(ai.chatId) > parseInt(ai.userId)) {
            chatFlag = ai.chatId + "&&" + ai.userId;
          } else {
            chatFlag = ai.userId + "&&" + ai.chatId;
          }
          if (!map[chatFlag]) {
            dest.push({
              chatId: chatFlag,
              data: [ai],
            });
            map[chatFlag] = ai;
          } else {
            for (let j = 0; j < dest.length; j++) {
              let dj = dest[j];
              if (dj.chatId == chatFlag) {
                dj.data.push(ai);
                break;
              }
            }
          }
        }
        this.chatList = dest;
        this.isHasThisChat()
      }else{
        //如果缓存没有数据的话，默认 
        this.chatList = [];
        let chatFlag = "";
        if (parseInt(this.chatId) > parseInt(this.userId)) {
          chatFlag = this.chatId + "&&" + this.userId;
        } else {
          chatFlag = this.userId + "&&" + this.chatId;
        }
        this.chatList = [{chatId: chatFlag,data: []}]
      }
    },
    //判断消息记录中是否有这个聊天记录没有则添加
    isHasThisChat(){
      let flag = false
      let chatFlag = "";
      if (parseInt(this.chatId) > parseInt(this.userId)) {
        chatFlag = this.chatId + "&&" + this.userId;
      } else {
        chatFlag = this.userId + "&&" + this.chatId;
      }
      this.chatList.forEach((value,index)=>{
        if(value.chatId === chatFlag){
          flag = true
        }
      })
      if(!flag){
        let item = {
          chatId:chatFlag,
          data:[]
        }
        this.chatList.push(item)
      }
    },
    //发送消息和接受收消息进行数据渲染
    addChat(arr) {
      let chatFlag = "";
      if (parseInt(arr.chatId) > parseInt(arr.userId)) {
        chatFlag = arr.chatId + "&&" + arr.userId;
      } else {
        chatFlag = arr.userId + "&&" + arr.chatId;
      }
      let flag = false;
      for (let i = 0; i < this.chatList.length; i++) {
        if (this.chatList[i].chatId === chatFlag) {
          flag = true;
          this.chatList[i].data.push(arr);
        }
      }
      //当前对话不存在
      if (!flag) {
        let item = {
          chatId: chatFlag,
          data: arr,
        };
        this.chatList.push(item);
      }
    },
    //切换聊天对象
    changeUserChat(chatUserId){
        console.log("ids",chatUserId);
        this.checkChatId = chatUserId
        this.getCheckChatIndex()
    },
    getCheckChatIndex() {
      let index = 0;
      this.chatList.forEach((value, i) => {
        if (this.checkChatId === value.chatId) {
          index = i;
        }
      });
      this.chatIndex = index;
      console.log("下标",this.chatIndex);
      console.log("sad0",this.chatList[this.chatIndex].data);
    },
  },
  mounted() {
    this.initOption();
  },
  //路由离开
  destroyed() {
    if (this.websock != null) {
      this.websock.close();
    }
  },
  //计算属性
  computed: {

  },
};
</script>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
.ant-card-body {
  padding: 0 !important;
}
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
ul li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.ant-menu-item-selected {
  color: #ff787e !important;
}
li:hover {
  color: #ff787e !important;
}
i:hover {
  color: #ff787e !important;
}
.lay-content {
  margin-top: 10px;
}
.card-content {
  min-height: 1px;
  overflow-y: auto;
  background-color: rgb(248, 243, 243);
  border-bottom: 1px solid rgb(190, 186, 186);
}
.left-message {
  width: 100%;
  padding-right: 150px;
  text-align: left;
  margin-top: 10px;
}
.right-message {
  width: 100%;
  padding-left: 50px;
  text-align: right;
  margin-top: 10px;
}
.firendsList {
  height: 100%;
  min-height: 500px;
  max-height: 500px;
  background-color: rgb(248, 241, 241);
  overflow-y: auto;
  overflow-x: hidden;
}
.friendul {
  margin: 0;
  padding: 0;
}
.friendul li {
  width: 100%;
  height: 40px;
  line-height: 30px;
  color: aliceblue;
  background-color: rgb(190, 186, 186);
}
.list-adst {
  min-height: 403px;
  max-height: 403px;
  background-color: rgb(248, 241, 241);
  padding-bottom: 10px;
  overflow-y: auto;
}
/* 滑动条样式 */
::-webkit-scrollbar-track-piece {
  background-color: rgb(248, 241, 241);
  -webkit-border-radius: 0;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: #b8b8b8;
  -webkit-border-radius: 6px;
  outline: 2px solid rgb(248, 241, 241);
  outline-offset: -2px;
  border: 2px solid rgb(248, 241, 241);
  filter: alpha(opacity = 50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
}
::-webkit-scrollbar-thumb:hover {
  height: 50px;
  background-color: #878987;
  -webkit-border-radius: 6px;
}
.self-msg {
  max-width: 80%;
  display: inline-block;
  position: relative;
  min-height: 32px;
  background: #25a23b;
  border-radius: 5px;
  line-height: 50px;
  margin-left: 10px;
  word-break: break-word;
  color: white;
  padding: 5px;
  line-height: 22px;
}
.other-msg {
  max-width: 80%;
  display: inline-block;
  position: relative;
  min-height: 32px;
  background: white;
  border-radius: 5px;
  line-height: 50px;
  word-break: break-word;
  color: rgba(0, 0, 0, 0.87);
  padding: 5px;
  line-height: 22px;
}
.msg-logo {
  display: inline-block;
  vertical-align: top;
}
.userLi{
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
</style>
