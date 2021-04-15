<template>
  <div class="resource-content">
    <div class="paixu">排序:  
      <a-checkbox class="paixu" :checked="checkList.asc" @change="onChangePriceASC">
      价格升序
      </a-checkbox>
      <a-checkbox class="paixu" :checked="checkList.desc" @change="onChangePriceDESC">
      价格降序
      </a-checkbox>
    </div>
    <ul class="ul-content">
      <li v-for="(value,index) in houseResouceList" :key="index" >
        <div class="li-content">
          <span @click="gotoResouce(value.id)" class="content-title">{{value.resouce_title}}</span>
          <span class="content-tag">{{value.area}} | {{value.house_type}} <span v-if="value.houseEnvironmentList.length != 0" v-for="(val,index) in value.houseEnvironmentList">| {{val.envir_type}}</span></span>
          <span class="content-price">{{getPrice(value.biz_type,value.price)}}</span>
          <span class="content-tag"><a-icon type="user" /> {{value.username}}</span>
        </div>
        <div class="li-img">
          <img @click="gotoResouce(value.id)" class="img-adst" :src="value.releasePhotosList[0].photo_addr" alt="">
          <a-icon :class="value.releaseVideoList.length != 0?'img-logo':'img-logo2'" :type="value.releaseVideoList.length != 0?'play-circle':'picture'" />
        </div>
      </li>
    </ul>
    <div class="pagination-adst">
      <a-pagination show-quick-jumper :pageSize="15" :default-current="1" :total="count" @change="onChange" />
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
        checkList:{
          asc:true,
          desc:false,
        }
    };
  },
  props: {
    houseResouceList:{
      typeof:Object
    },
    count:{
      typeof:Number
    }
  },
  components: {},
  methods:{
    onChangePriceASC(){
      let flag = false
      if(!this.checkList.asc){
        flag =true;
      }
      this.checkList.asc=true
      this.checkList.desc=false
      if(flag){
        this.$emit('SelectHouseList')
      }
    },
    onChangePriceDESC(){
      let flag = false
      if(!this.checkList.desc){
        flag =true;
      }
      this.checkList.asc=false
      this.checkList.desc=true
      if(flag){
        this.$emit('SelectHouseList')
      }
    },
    onChange(pageNumber) {
      this.$emit('onChange',pageNumber)
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
  },
  mounted(){

  },
  computed:{
    
  }
};
</script>

<style scoped>
.resource-content {
  margin-left: 40px;
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
  width: 100%;
  /* margin-left: 30%; */
  padding-top: 15px;
  padding-bottom: 15px;
}
.paixu{
  color: #666;
  font-size: 13px;
}
.content-title:hover{
  color: #FF787E;
  text-decoration: underline;
}
</style>


