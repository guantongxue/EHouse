<template>
  <div class="resource-content">
    <div>排序:  
      <a-checkbox :checked="checkList.asc" @change="onChangePriceASC">
      价格升序
      </a-checkbox>
      <a-checkbox :checked="checkList.desc" @change="onChangePriceDESC">
      价格降序
      </a-checkbox>
    </div>
    <ul>
      <li v-for="(value,index) in houseResouceList" :key="index" @click="gotoResouce(value.id)">
        <div class="li-content">
          <span class="content-title">{{value.resouce_title}}</span>
          <span class="content-tag">{{value.area}} | {{value.house_type}} <span v-if="value.houseEnvironmentList.length != 0" v-for="(val,index) in value.houseEnvironmentList">| {{val.envir_type}}</span></span>
          <span class="content-tag">发布者:{{value.username}}</span>
        </div>
        <div class="li-img">
          <img class="img-adst" :src="value.releasePhotosList[0].photo_addr" alt="">
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
          desc:false
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

    }
  },
  mounted(){

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
}
ul{
  margin: 0;
  padding: 0;
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
  height: 120px;
}
.li-img{
  position: relative;
  margin-top: 10px;
  display: inline;
  width: 30%;
  height: 110px;
}
.img-adst{
  margin-top: 10px;
  width: 25%;
  height: 110px;
}
.content-title{
  display: block;
  width: 100%;
  padding-right: 100px;
  height: 30px;
  color: black;
  font-size: 22px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content-tag{
  display: block;
  width: 100%;
  margin-top:20px ;
  padding-right: 100px;
  height: 25px;
    color: #999;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pagination-adst{
  margin-top: 10px;
  padding-bottom: 10px;
  margin-left: 30%;
}
</style>


