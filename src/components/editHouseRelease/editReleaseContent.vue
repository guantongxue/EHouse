<template>
  <div class="release-content">
    <a-card title="业务类型">
    <div>
        <a-select
          :value="bizType=='rent'?'出租':'出售'"
          style="width: 120px"
          @change="handleChangeBiz"
        >
          <a-select-option value="rent"> 出租 </a-select-option>
          <a-select-option value="sell"> 出售 </a-select-option>
        </a-select>
      </div>
    </a-card>
    <a-card title="房源图片">
      <div class="clearfix">
        <!-- action="https://www.mocky.io/v2/5cc8019d300000980a055e76" -->
        <a-upload
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          :multiple="multiple"
          :before-upload="beforeUpload"
          accept="image/*"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">上传图片</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-card>
    <a-card title="房源视频">
      <a-upload
        :multiple="true"
        :file-list="fileList2"
        @change="handleChange2"
        :before-upload="beforeUpload2"
        accept="video/*"
      >
        <a-button> <a-icon type="upload" /> 上传视频 </a-button>
      </a-upload>
    </a-card>
    <a-card title="房源标题">
      <a-form  :form="form" :label-col="{ span: 1 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="标题" >
          <a-input v-model="form.title"  />
        </a-form-item>
      </a-form>
    </a-card>
    <a-card title="房源描述">
      <a-form :form="form" :label-col="{ span: 1 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="描述">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-item>
      </a-form>
    </a-card>
    <a-card title="房源条件">
      <div class="Condition-div">
        <label for="区域">区域:</label>
        <a-cascader
          :options="options"
          :value="[selectCity, selectArea]"
          placeholder="请选择区域"
          @change="onChange"
        />
      </div>

      <div class="Condition-div">
        <label for="房型">房型:</label>
        <a-select
          placeholder="请选择房型"
          :value="selectHouseType"
          style="width: 120px"
          @change="handleChangetype"
        >
          <a-select-option  v-for="(item,index) in houseTypeList" :key="index" :value="item.value" > {{item.value}} </a-select-option>
        </a-select>
      </div>
      <div class="Condition-div">
        <label for="环境">环境:</label>
        <a-select
          mode="multiple"
          style="width: 400px"
          placeholder="请选择环境"
          :value="selectEnvir"
          @change="handleChangeEnvir"
        >
        
          <a-select-option v-for="(item,index) in houseEnvirList" :key="item.value">
            {{ item.value }}
          </a-select-option>
        </a-select>
      </div>
      </a-select>
    </a-card>
    <a-card title="价格">
        <label for="价格">价格(元):</label>
        <a-input style="width:200px" placeholder="请输入价格" v-model="form.price" />
    </a-card>
    <div class="button-sub">
      <a-button
        type="primary"
        @click="subInfo"
        :disabled="form.title == '' || form.desc ==''? true : false"
      >
        提交
      </a-button>
    </div>
  </div>
</template>

<script>
import {
  GetCityArea,
  GetHouseType,
  GetEnvironment,
  HouseRelease,
  GetHouseResouceById,
  EditHouseRelease
} from "@/api/houseResouce";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  name: "",
  props: {},
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      //视频
      fileList2: [],
      uploading: false,
      multiple: true,
      form: {
        username: "",
        title: "",
        desc: "",
        area: "",
        city: "",
        price: "",
      },
      //条件
      options: [],
      //房型
      houseTypeList: [],
      //环境
      houseEnvirList: [],
      bizType: "rent",
      selectCity: "",
      selectArea: "",
      selectEnvir: [],
      defaultEnvir: [],
      selectHouseType: "",
      release_id: "",
    };
  },
  computed: {},
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      console.log("fileList", this.fileList);
      console.log("file", file);
      return false;
    },
    beforeUpload2(file) {
      this.fileList2 = [...this.fileList2, file];
      console.log("fileList", this.fileList2);
      console.log("file", file);
      return false;
    },
    handleChange2(info) {
      let fileList = [...info.fileList];

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1);

      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      this.fileList2 = fileList;
    },
    subInfo() {
      console.log("提交", this.fileList);

      const formData = new FormData();
      const { fileList } = this;
      if (this.fileList.length == 0) {
        this.$message.warning("至少上传一张图片！");
        return;
      }
      console.log('图片',fileList);
      let originalPhoto =[];
      if (fileList.length != 0) {
        fileList.forEach((file) => {
          console.log('55',typeof file);
          if(file.hasOwnProperty('originFileObj'))
          {
            formData.append("filePhotos", file.originFileObj);
          }else{
            originalPhoto.push(file.url)
          }
        });
      } else {
        formData.append("filePhotos", null);
      }
      //如果上传原始视频为空
      if(originalPhoto.length == 0){
        originalPhoto =null
      }
      let originalVideo = "";
      const { fileList2 } = this;
      if (fileList2.length != 0) {
        fileList2.forEach((file) => {
          console.log("视频",file);
          if(file.hasOwnProperty('originFileObj')){
            formData.append("fileVideo", file.originFileObj);
          }else{
            originalVideo = file.url
          }
        });
      } else {
        formData.append("fileVideo", null);
      }
      if(originalVideo == ""){
        originalVideo = null
      }
      
      let type = "^[0-9]*[1-9][0-9]*$";
      let r = new RegExp(type);
      let flag = r.test(this.form.price);
      let priceTemp = this.form.price;
      if (priceTemp.match(/^[ ]*$/) || priceTemp.indexOf(" ") > -1) {
        this.$message.warning("价格输入不正确");
        return;
      }
      if (!flag) {
        this.$message.warning("价格输入不正确");
        return;
      }

      let houseReleaseForm = {
        username: this.$store.state.userInfo.username,
        bizType: this.bizType,
        house_title: this.form.title,
        house_desc: this.form.desc,
        house_city: this.selectCity,
        house_area: this.selectArea,
        house_envir: this.selectEnvir,
        house_price: parseInt(this.form.price),
        house_type: this.selectHouseType,
        release_id:this.$route.params.id,
      };
      if(originalPhoto != null){
        houseReleaseForm.release_photos = originalPhoto;
      }
      if(originalVideo != null){
        houseReleaseForm.video_addr = originalVideo;
      }
      for (let key of Object.keys(houseReleaseForm)) {
        let mealName = houseReleaseForm[key];
        if (mealName == "" || mealName == null) {
          this.$message.warning("选项未填写");
          return;
        }
      }

      formData.append("houseReleaseForm", JSON.stringify(houseReleaseForm));
      EditHouseRelease(formData)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("修改发布信息成功");
            this.$router.push("/person/myRelease")
          } else {
            console.log(res.code);
            this.$message.warning("修改发布信息失败，请重新发布");
          }
        })
        .catch((e) => {
          console.log(e);
          this.$message.warning("修改发布信息失败，请重新发布");
        });
    },
    onChange(value) {
      this.selectCity = value[0];
      this.selectArea = value[1];
    },
    handleChangetype(value) {
      console.log(`selected ${value}`);
      this.selectHouseType = value;
    },
    handleChangeEnvir(value) {
      this.selectEnvir = value;
    },

    handleChangeBiz(value) {
      console.log(`selected ${value}`);
      if (value == "sent") {
        this.bizType = value;
      }
      if (value == "sell") {
        this.bizType = value;
      }
    },
    getEnirs() {
      this.selectEnvir = this.defaultEnvir;
    },
  },
  mounted() {
    const that = this;

    GetCityArea().then((res) => {
      console.log("area", res);
      let data = res.data;
      data.forEach((value) => {
        let parentArr = {
          value: value.city_name,
          label: value.city_name,
          children: [],
        };
        value.areaList.forEach((val) => {
          let childArr = {
            value: val.area_name,
            label: val.area_name,
          };
          parentArr.children.push(childArr);
        });
        this.options.push(parentArr);
      });
    });
    GetHouseType().then((res) => {
      console.log("type", res);

      let data = res.data;
      data.forEach((value) => {
        let arr = {
          value: value.house_type,
        };
        this.houseTypeList.push(arr);
      });
    });
    GetEnvironment()
      .then((res) => {
        console.log("GetEnvironment", res);
        let data = res.data;
        data.forEach((value) => {
          let arr = {
            value: value.envir_type,
          };
          this.houseEnvirList.push(arr);
        });
      })
      .then((res) => {
        let body = {
          id: this.$route.params.id,
        };
        GetHouseResouceById(body)
          .then((res) => {
            console.log("所有数据", res);
            if (res.code == 200) {
              this.release_id = res.data.id;
              if (res.data.username != that.$store.state.userInfo.username) {
                this.$router.push("/index");
              }
              if (res.data != null) {
                //业务类型
                that.handleChangeBiz(res.data.biz_type);
                // that.bizType = res.data.biz_type
                //标题
                that.form.title = res.data.resouce_title;
                //描述
                that.form.desc = res.data.resouce_desc;
                //价格
                that.form.price = res.data.price.toString();
                //区域
                that.selectCity = res.data.city;
                that.selectArea = res.data.area;
                //房型
                that.selectHouseType = res.data.house_type;
                //环境
                res.data.houseEnvironmentList.forEach((value) => {
                  that.defaultEnvir.push(value.envir_type);
                });
                this.getEnirs();
                //加载图片数据
                res.data.releasePhotosList.forEach((value) => {
                  let photo = {
                    uid: value.id,
                    name: `${value.id}.png`,
                    status: "done",
                    url: value.photo_addr,
                  };
                  that.fileList.push(photo);
                });
                //加载视频数据
                if (res.data.releaseVideoList.length != 0) {
                  res.data.releaseVideoList.forEach((value) => {
                    let video = {
                      uid: value.id,
                      name: `${value.id}.mp4`,
                      status: "done",
                      url: value.video_addr,
                    };
                    that.fileList2.push(video);
                  });
                }
              }
            } else {
              this.$message.error("获取房源发布数据失败");
            }
          })
          .catch((e) => {
            this.$message.error("获取房源发布数据失败");
          });
      });
  },
  created() {},
};
</script>

<style scpoed>
.release-content {
  width: 70%;
  margin-left: 15%;
  margin-top: 20px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.button-sub {
  position: relative;
  margin-top: 10px;
  right: 0;
}
.Condition-div {
  margin-top: 15px;
}
</style>
