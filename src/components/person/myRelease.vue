<template>
  <div id="app">
    <a-row>
      <a-col :span="12" >
        <div>  
          <a-checkbox class="paixu" :checked="checkList.new" @change="onChangeNew">
          最迟发布
          </a-checkbox>
          <a-checkbox class="paixu" :checked="checkList.old" @change="onChangeOld">
          最早发布
          </a-checkbox>
        </div>
      </a-col>
      <a-col :span="4" >
      </a-col>
      <a-col :span="8" class="search-content">
          <a-input-search
            placeholder="搜索关键字"
            enter-button=""
            size="default"
            @search="onSearch"
            v-model="key_word"
          />
      </a-col>
    </a-row>
    <div class="main-content">
      <div class="resource-content">
        <ul class="ul-content">
          <li v-for="(value,index) in houseResouceList" :key="index">
            <div class="li-content">
              <span class="content-title" @click="gotoResouce(value.id)">{{value.resouce_title}}</span>
              <span class="content-tag">{{value.area}} | {{value.house_type}} <span v-if="value.houseEnvironmentList.length != 0" v-for="(val,index) in value.houseEnvironmentList">| {{val.envir_type}}</span></span>
              <span class="content-price">{{getPrice(value.biz_type,value.price)}}</span>
              <span class="content-tag"><a-icon type="user" /> {{value.username}}</span>
            </div>

            <div class="li-img" >
              <img @click="gotoResouce(value.id)" class="img-adst" :src="value.releasePhotosList[0].photo_addr" alt="">
              <a-icon :class="value.releaseVideoList.length != 0?'img-logo':'img-logo2'" :type="value.releaseVideoList.length != 0?'play-circle':'picture'" />
            </div>
            <div class="option-content">
              <div>
                <span class="opt-adst" @click="delHouseRelease(value.id)">删除 </span>
                |
                <span class="opt-adst" @click="editHouseRelease(value.id)"> 编辑</span>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="count != 0" class="pagination-adst">
          <a-pagination show-quick-jumper :pageSize="15" :default-current="1" :total="count" @change="onChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  {GetMyReleaseHouse,DelMyReleaseHouse} from "@/api/houseResouce.js"
import {SelectUseDetail} from '@/api/userService'
import { mapActions } from 'vuex';
import "@/assets/css/myRelease.css"
export default {
  name: "",
  data() {
    return {
      checkList: {
        new: true,
        old: false,
      },
      houseResouceList:[],
      count:0,
      current_page:0,
      page_size:15,
      key_word:''
    };
  },
  methods: {
    ...mapActions(['logout','userInfo']),
    onChangeNew() {
      if(!this.checkList.new){
        this.checkList.new = true;
        this.checkList.old = false;
        this.initUserInfo()
      }

    },
    onChangeOld() {
      if(!this.checkList.old){
        this.checkList.new = false;
        this.checkList.old = true;
        this.initUserInfo()
      }
    },
    onSearch() {
      this.current_page = 0
      this.initUserInfo()
    },
    onChange(pageNumber) {
      this.current_page = pageNumber - 1
      this.initUserInfo()
    },
    gotoResouce(value){
      const resouceUrl = this.$router.resolve({
      name: 'houseResouce',
      params: { id: value }
      })
      window.open(resouceUrl.href, '_blank')
    },
    getPrice(biz_type,price){
      if(biz_type == "sent"){
        return price+'元/月'
      }else{
        if(price>10000){
          return parseFloat(price/10000)+"万元"
        }else{
          return price+"元"
        }
      }
    },
    getMyReleaseHouse(){
      let order_createTimeTemp = 1;
      if(this.checkList.old){
        order_createTimeTemp =2
      }
      let key_wordTemp = null
      if(this.key_word != ''){
        key_wordTemp = this.key_word
      }
      let body = {
        current_page:this.current_page,
        page_size:this.page_size,
        username:this.$store.state.userInfo.username,
        order_createTime:order_createTimeTemp,
        key_word:key_wordTemp
      }
      GetMyReleaseHouse(body).then(res=>{
        console.log("房源数据",res);
        if(res.code == 200){
            this.count = res.data.count
            this.houseResouceList = res.data.houseResouceListList
        }else{
          this.$message.error('发布房源数据加载失败')
        }
      }).catch(e=>{
        this.$message.error('发布房源数据加载失败')
      })
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
          console.log("查询信息",res);
          this.userInfoDetail= res.data;
          if(res.code != 200){
            this.$router.push('/index')
            this.$message.warning('用户信息已失效请重新登录')
            this.logout();
          }else{
            this.getMyReleaseHouse()
          }
      }).catch(e=>{
          this.$router.push('/index')
          this.$message.warning('用户信息已失效请重新登录')
          this.logout();
          console.log(e)
      })
    },
    delMyReleaseHouse(id){
      
      let body = {
        username:this.$store.state.userInfo.username,
        release_id: id
      }
      DelMyReleaseHouse(body).then(res=>{
        if(res.code == 200 ){
          this.$message.success('删除房源信息成功')
          this.initUserInfo()
        }else{
          this.$message.error('删除房源信息失败')
        }
      }).catch(e=>{
        this.$message.error('删除房源信息失败')
      })
    },
    initUserInfoBefore(id){
      let userName = '';
      if(this.$store.state.userInfo != null){
          userName = this.$store.state.userInfo.username
      }
      let body ={
          username:userName
      }
      
      SelectUseDetail(body).then(res=>{
        
          console.log("查询信息",res);
          this.userInfoDetail= res.data;
          if(res.code != 200){
            this.$router.push('/index')
            this.$message.warning('用户信息已失效请重新登录')
            this.logout();
          }else{
            this.delMyReleaseHouse(id)
          }
      }).catch(e=>{
          this.$router.push('/index')
          this.$message.warning('用户信息已失效请重新登录')
          this.logout();
          console.log(e)
      })
    },
    delHouseRelease(id) {
      const that =this 
      this.$confirm({
        title: '确认删除该发布房源？',
        onOk() {
          that.initUserInfoBefore(id);
        },
        onCancel() {},
      });
    },
    editHouseRelease(id){
      const resouceUrl = this.$router.resolve({
      name: 'editHouseRelease',
      params: { id: id }
      })
      window.open(resouceUrl.href, '_blank')
    }
  },
  mounted(){
    this.initUserInfo()
  }
};
</script>


<style scoped>

.paixu {
  margin-top: 20px;
  margin-left: 20px;
}
.search-content {
  margin-top: 20px;
  padding-right: 20px;
}
.main-content {
  margin-left: 20px;
  padding-right: 20px;
}

ul li{
  position: relative; 
  list-style: none;
  padding-inline-start: 0px !important;
}
ul{
  margin: 0;
  padding: 0;
}
.ul-content{
  padding-bottom: 15px;
}
li{
  padding-bottom: 10px;
  border-bottom: 1px dashed #e6e6e6;
}
.li-content{
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 70%;
  height: 130px;
}
.li-img{
  position: relative;
  margin-top: 10px;
  display: inline;
  width: 30%;
  height: 110px;
}
.img-logo{
  display: block;
  font-size: 18px;
  position: absolute;
  right: 3px;
  bottom: -50px;
  z-index: 100;
  color: #fff;
  border-radius: 50%;
  background: rgba(51,51,51,0.5);
}
.img-logo2{
  display: block;
  font-size: 18px;
  position: absolute;
  right: 3px;
  bottom: -50px;
  z-index: 100;
  color: #fff;
  background: rgba(51,51,51,0.5);
}
.img-adst{
  position: relative;
  /* float: right; */
  margin-top: 15px;
  width: 28%;
  height: 110px;
}
.content-title{
  display: block;
  width: 100%;
  padding-right: 100px;
  padding-top: 4px;
  height: 32px;
  color: black;
  font-size: 22px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content-price{
  display: block;
  width: 100%;
  padding-right: 100px;
  padding-top: 4px;
  height: 32px;
  color: #eb5f00;
  font-size: 22px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content-tag{
  display: block;
  width: 100%;
  margin-top:10px ;
  padding-right: 100px;
  height: 20px;
  color: #999;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pagination-adst{
  /* width: 100%; */
  
  /* margin-left: 30%; */
  padding-top: 15px;
  padding-bottom: 15px;
}
.option-adst{
  float: right;
}
.option-content{
  width: 100%;
}
.opt-adst:hover{
  color: #FF787E;
}
.content-title:hover{
  color: #FF787E;
  text-decoration: underline;
}
</style>
