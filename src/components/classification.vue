<template>
  <div>
    <!-- <a-collapse default-active-key="1" :bordered="false" :expandIconPosition="'right'"> -->
      <index-tag ref="indexTag" @handleClose="handleClose"></index-tag>
      <ul class="ul-content">
        <li class="liprice">
          <span class="firstLi">区 域:<span @click="changeTag(value,'1')" class="areaTitle" v-for="(value,index) in areaList">{{value}}</span></span>
        </li>
        <li class="liprice">
          <span class="firstLi">房 型:<span @click="changeTag(value,'2')" class="areaTitle" v-for="(value,index) in houseTypeList">{{value}}</span></span>
        </li>
        <li class="liprice">
          <span class="firstLi">环 境:<span @click="changeTag(value,'3')" class="areaTitle" v-for="(value,index) in envirList">{{value}}</span></span>
        </li>
        <li class="lipriceLast">
          <span class="firstLi">价 格:
            <a-input-group compact>
              <a-select default-value="1" @select="selectInput">
                <a-select-option value="1">
                  单位:元
                </a-select-option>
                <a-select-option value="2">
                  单位:万元
                </a-select-option>
              </a-select>
              <a-input v-model="minPrice" style=" width: 100px; text-align: center" placeholder="最小值" />
              <a-input
                style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                placeholder="~"
                disabled
              />
              <a-input v-model="maxPrice" style="width: 100px; text-align: center; border-left: 0" placeholder="最大值" />
            </a-input-group>
            <a-button type="primary" @click="surePrice">
              确定
            </a-button>
        </span>
        </li>
      </ul>
  </div>
</template>

<script>
import IndexTag from "@/components/indexcontent/indexTag"
export default {
    data(){
        return{
            text: `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`,
            customStyle:"border: 0; background: white;",
            areaList:[
              "晋安",
              "仓山",
              "闽侯",
              "高新",
              "鼓楼",
              "闽江",
              "长乐",
              "仓山",
              "晋安",
              "仓山",
              "闽侯",
              "高新",
              "鼓楼",
              "闽江",
              "长乐",
              "仓山",
              "晋安",
              "仓山",
              "闽侯",
              "高新",
              "鼓楼",
              "闽江",
              "长乐",
              "仓山",
            ],
            houseTypeList:[
              "一室",
              "两室",
              "三室",
              "四室及以上"
            ],
            envirList:[
              "近地铁",
              "近医院",
              "交通便利",
            ],
            minPrice:"",
            maxPrice:"",
            defaultUnit:'元'
        }
    },
    props:{

    },
    components:{
      IndexTag
    },
    methods:{
      surePrice(){
        if(parseInt(this.minPrice)%1 === 0 && parseInt(this.maxPrice)%1 === 0 ){
          //价格输入正确
          if(parseInt(this.minPrice) >= parseInt(this.maxPrice)){
            this.$message.warning("起始价格不能高于最终价格,请重新输入")
            this.minPrice=""
            this.maxPrice=""
            return
          }
          this.$refs.indexTag.tags[3].val = "价格区间"+this.minPrice+"-"+this.maxPrice+this.defaultUnit
        }else{
          //价格输入不正确
          this.$message.warning("非法输入价格,请重新输入")
          this.minPrice=""
          this.maxPrice=""
          return
        }
      },
    changeTag(value,pid){
      this.$refs.indexTag.tags.forEach((val,index) => {
        if(val.pid == pid){
          this.$refs.indexTag.tags[index].val = value
        }
      });
    },
    handleClose(){
      console.log("标签关闭");
    },
    selectInput(value){
      if(value == 1){
        this.defaultUnit = '元'
      }else if(value == 2){
        this.defaultUnit = '万元'
      }
    }
  },

};
</script>

<style scoped>
.ant-layout, .ant-layout *{
   
}
ul li{
  list-style: none;
}
.ul-content{
  width: 100%
}
.firstLi{
  font-size: 16px;
  font-weight: 400;
  color: #999;
  display: inline-block;
}
.liarea{
  display: inline-block;
}
.areaTitle{
  padding-left:15px ;
  cursor: pointer;
}
.areaTitle:hover{
  color: #FF787E;
}
.ant-input-group.ant-input-group-compact{
  display: inline-block  !important;
  vertical-align: top;
  width: auto  !important;
}
.liprice{
  margin-top:10px ;
}
.lipriceLast{
  margin-top:10px ;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(190, 186, 186);
}
</style>


