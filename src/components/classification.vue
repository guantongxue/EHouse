<template>
  <div>
    <!-- <a-collapse default-active-key="1" :bordered="false" :expandIconPosition="'right'"> -->
    <index-tag ref="indexTag" @handleClose="handleClose"></index-tag>
    <ul class="ul-content">
      <li class="liprice">
        <span class="firstLi"
          >城 市:
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              {{ nowCity }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-for="(value, index) in cityList" :key="index">
                <a href="javascript:;" @click="ChangeSelectCity(value)">{{
                  value
                }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </li>
      <li class="liprice">
        <span class="firstLi"
          >区 域:<span
            @click="changeTag(value, '1')"
            class="areaTitle"
            v-for="(value, index) in areaList"
            >{{ value }}</span
          ></span
        >
      </li>
      <li class="liprice">
        <span class="firstLi"
          >房 型:<span
            @click="changeTag(value, '2')"
            class="areaTitle"
            v-for="(value, index) in houseTypeList"
            >{{ value }}</span
          ></span
        >
      </li>
      <li class="liprice">
        <span class="firstLi"
          >环 境:<span
            @click="changeTag(value, '3')"
            class="areaTitle"
            v-for="(value, index) in envirList"
            >{{ value }}</span
          ></span
        >
      </li>
      <li class="lipriceLast">
        <span class="firstLi"
          >价 格:
          <a-input-group compact>
            <a-select default-value="1" @select="selectInput">
              <a-select-option value="1"> 单位:元 </a-select-option>
              <a-select-option value="2"> 单位:万元 </a-select-option>
            </a-select>
            <a-input
              v-model="minPrice"
              style="width: 100px; text-align: center"
              placeholder="最小值"
            />
            <a-input
              style="
                width: 30px;
                border-left: 0;
                pointer-events: none;
                backgroundcolor: #fff;
              "
              placeholder="~"
              disabled
            />
            <a-input
              v-model="maxPrice"
              style="width: 100px; text-align: center; border-left: 0"
              placeholder="最大值"
            />
          </a-input-group>
          <a-button type="primary" @click="surePrice"> 确定 </a-button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import IndexTag from "@/components/indexcontent/indexTag";
import {
  GetAllAreaByCity,
  GetAllCity,
  GetHouseType,
  GetEnvironment,
} from "@/api/houseResouce.js";
export default {
  data() {
    return {
      text: `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`,
      customStyle: "border: 0; background: white;",
      areaList: [],
      houseTypeList: [],
      envirList: [],
      minPrice: "",
      maxPrice: "",
      defaultUnit: "元",
      cityList: [],
      nowCity: "",
      tagTemp: [
        {
          val: "全部分类",
          pid: "0",
        },
        {
          val: "",
          pid: "1",
        },
        {
          val: "",
          pid: "2",
        },
        {
          val: "",
          pid: "3",
        },
        {
          val: "",
          pid: "4",
        },
      ],
    };
  },
  props: {
    selectCity: {
      typeof: String,
    },
  },
  components: {
    IndexTag,
  },
  methods: {
    surePrice() {
      if (
        parseInt(this.minPrice) % 1 === 0 && this.minPrice.indexOf(".") < 0 &&
        parseInt(this.maxPrice) % 1 === 0 && this.maxPrice.indexOf(".") < 0
      ) {
        //价格输入正确
        if (parseInt(this.minPrice) >= parseInt(this.maxPrice)) {
          this.$message.warning("起始价格不能高于最终价格,请重新输入");
          this.minPrice = "";
          this.maxPrice = "";
          return;
        }
        this.$refs.indexTag.tags[4].val =
          "价格区间" + this.minPrice + "-" + this.maxPrice + this.defaultUnit;
          this.$emit('SelectHouseList')
      } else {
        //价格输入不正确
        this.$message.warning("非法输入价格,请重新输入");
        this.minPrice = "";
        this.maxPrice = "";
        return;
      }
    },
    changeTag(value, pid) {

      let flag = false;
      if (pid == 3) {
        console.log("tags", this.$refs.indexTag.tags);
        if (this.$refs.indexTag.tags[3].val === "") {

          this.$refs.indexTag.tags[3].val = value;
          this.$emit('SelectHouseList')
          return;
        } else {
          this.$refs.indexTag.tags.forEach((val, index) => {
            if (val.val == value) {
              flag = true;
            }
          });
          if (flag) {
            return;
          } else {

            this.$refs.indexTag.tags.push({ val: value, pid: pid });
            this.$emit('SelectHouseList')
          }
        }
      } else {
        this.$refs.indexTag.tags.forEach((val, index) => {
          if (val.pid == pid) {
            let flag = false
            if(this.$refs.indexTag.tags[index].val != value){
              flag = true 
            } 
            this.$refs.indexTag.tags[index].val = value;
            if(flag){
              this.$emit('SelectHouseList')
            }
          }
        });
      }
    },
    handleClose() {
      console.log("标签关闭");
      this.$emit('SelectHouseList')
    },
    selectInput(value) {
      if (value == 1) {
        this.defaultUnit = "元";
      } else if (value == 2) {
        this.defaultUnit = "万元";
      }
    },
    initAllArea(city) {
      let body = {
        city: city,
      };
      GetAllAreaByCity(body)
        .then((res) => {
          console.log("区域", res);
          if (res.code == 200) {
            let data = res.data;
            this.areaList = [];
            data.forEach((value) => {
              this.areaList.push(value.area_name);
            });
          }
        })
        .catch((e) => {
          this.$message.warning("获取区域数据失败");
        });
    },
    ChangeSelectCity(val) {
      if (this.nowCity != val) {
        this.nowCity = val;
        this.$refs.indexTag.tags[1].val = "" 
        this.initAllArea(this.nowCity);
        this.$emit("ChangeSelectCity");
      } else {
        this.nowCity = val;
      }
    },
    initCity() {
      GetAllCity()
        .then((res) => {
          this.cityList = [];
          let data = res.data;
          data.forEach((value) => {
            this.cityList.push(value.city_name);
          });
        })
        .catch((e) => {
          this.$message.error("获取城市数据失败");
        });
    },
    initHouseType() {
      GetHouseType()
        .then((res) => {
          this.houseTypeList = [];
          let data = res.data;
          data.forEach((value) => {
            this.houseTypeList.push(value.house_type);
          });
        })
        .catch((e) => {
          this.$message.error("获取房型数据失败");
        });
    },
    initEnvirList() {
      GetEnvironment()
        .then((res) => {
          this.envirList = [];
          let data = res.data;
          data.forEach((value) => {
            this.envirList.push(value.envir_type);
          });
        })
        .catch((e) => {
          this.$message.error("获取环境数据失败");
        });
    },
  },
  mounted() {
    this.nowCity = "福州市";
    this.initAllArea(this.nowCity);
    this.initCity();
    this.initHouseType();
    this.initEnvirList();
  },
};
</script>

<style scoped>
.ant-layout,
.ant-layout * {
}
a {
  color: #999 !important;
}
ul li {
  list-style: none;
}
.ul-content {
  width: 100%;
}
.firstLi {
  font-size: 16px;
  font-weight: 400;
  color: #999;
  display: inline-block;
}
.liarea {
  display: inline-block;
}
.areaTitle {
  padding-left: 15px;
  cursor: pointer;
}
.areaTitle:hover {
  color: #ff787e;
}
.ant-input-group.ant-input-group-compact {
  display: inline-block !important;
  vertical-align: top;
  width: auto !important;
}
.liprice {
  margin-top: 10px;
}
.lipriceLast {
  margin-top: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(190, 186, 186);
}
</style>


