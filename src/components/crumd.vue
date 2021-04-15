<template>
  <div class="crmd-content">
        <div class="crumb-adst">
            <ul >
                <li v-for="(val,index) in title" :key="index">
                    <span :class="index == clickedIndex?'li-back':''" @click="changeIndex(index)"><a-icon :type="val.icon" />&nbsp;{{val.lable}}</span>
                </li>
            </ul>
            
        </div>
    </div>
</template>

<script>

export default {
  name: 'login',
  data(){
      return{
          title:[
              {icon:"appstore",lable:"全部分类"},
              {icon:"shopping-cart",lable:"买房"},
              {icon:"audit",lable:"租房"},
          ],
          clickedIndex:0,

      }
  },
  props:{

  },
  methods:{
      changeIndex(index){
          let flag =false
          if(this.clickedIndex != index){
              flag = true
          }
          this.clickedIndex = index
          this.$emit('SelectHouseList')
      }
  }
}
</script>
<style  scoped>
.crmd-content{
    /* border-bottom: 1px solid rgb(190, 186, 186); */
    padding-left: 8%;
    background-color: #F5F5F8;
}
ul li{
    list-style: none;
}
.crumb-adst ul{
    width: 100%;
    display: flex;
    justify-content: left ;
    flex-direction: row;
    overflow: hidden;
}

.crumb-adst ul li {
    width: 15%;
    color: #000;
    font-size: 16px;
    font-weight: 500;
    overflow: hidden;
}
.crumb-adst ul li:hover {
    color: #FF787E;
}

.li-back{
    background: #FEE5E6;
    color: #FF575E !important;
    padding: 3px 10px;
}
.crumb-adst{
    padding-left: 0% !important; 
    padding-right: 8% !important;
    padding-top: 18px;
    height: 65px;
    font-size: 16px !important;
}
</style>