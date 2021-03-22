<template>
  <div class="release-content">
    <a-card title="业务类型">
    <div>
        <a-select
          default-value="rent"
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
          placeholder="请选择区域"
          @change="onChange"
        />
      </div>

      <div class="Condition-div">
        <label for="房型">房型:</label>
        <a-select
          placeholder="请选择房型"
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
          @change="handleChangeEnvir"
        >
          <a-select-option v-for="(item,index) in houseEnvirList" :key="index">
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
        :disabled="form.title == '' ? true : false"
      >
        提交
      </a-button>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import {GetCityArea,GetHouseType,GetEnvironment,HouseRelease} from '@/api/houseResouce'
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
        price:""
      },
      //条件
      options: [
      ],
      //房型
      houseTypeList:[],
      //环境
      houseEnvirList:[],
      bizType:'sent',
      selectCity:'',
      selectArea:'',
      selectEnvir:[],
      selectHouseType:''
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
     
      console.log("提交",this.fileList);
      const formData = new FormData();
      const { fileList } = this;
      if(fileList.length !=0){
      fileList.forEach(file=>{
          console.log(file);
        formData.append('filePhotos', file.originFileObj);
      })
      }else{
          formData.append('filePhotos', null);
      }
      const { fileList2 } = this;
    if( fileList2.length !=0){
        fileList2.forEach(file=>{
        formData.append('fileVideo', file.originFileObj);
        })
    }else{
        formData.append('fileVideo', null);
    }

    
    let houseReleaseForm = {
        username:this.$store.state.userInfo.username,
        bizType:this.bizType,
        house_title:this.form.title,
        house_desc:this.form.desc,
        house_city:this.selectCity,
        house_area:this.selectArea,
        house_envir:this.selectEnvir,
        house_price:parseInt(this.form.price),
        house_type:this.selectHouseType
    }
    formData.append('houseReleaseForm',JSON.stringify(houseReleaseForm))
    console.log("上传参数",formData.get("houseReleaseForm"));
    HouseRelease(formData).then(res=>{
        console.log(res);
    })
    },
    onChange(value) {
      console.log(value);
      this.selectCity = value[0]
      this.selectArea = value[1]
    },
    handleChangetype(value) {
      console.log(`selected ${value}`);
      this.selectHouseType = value
    },
    handleChangeEnvir(value) {
      console.log(`selected ${value}`);
      console.log(typeof value);
      let arrs= new Array()
      arrs=value.toString().split(",");
      this.selectEnvir = [];
      arrs.forEach(value=>{
          this.selectEnvir.push(this.houseEnvirList[parseInt(value)].value)
      })
    },
    handleChangeBiz(value){
        console.log(`selected ${value}`);
        if(value == "sent"){
            this.bizType = value;
        }
        if(value == "sell"){
            this.bizType = value;
        }
    }
  },
  mounted(){
      GetCityArea().then(res=>{
          console.log("area",res);
          let data = res.data;
          data.forEach(value => {
              let parentArr={
                  value:value.city_name,
                  label:value.city_name,
                  children:[]
              }
              value.areaList.forEach(val=>{
                  let childArr = {
                      value:val.area_name,
                      label:val.area_name
                  }
                parentArr.children.push(childArr)
              })
              this.options.push(parentArr)
          });


      })
      GetHouseType().then(res=>{
          console.log("type",res);
          
          let data = res.data 
          data.forEach(value=>{
            let arr = {
                value:value.house_type
            }
            this.houseTypeList.push(arr)
          })
      })
      GetEnvironment().then(res=>{
          console.log("GetEnvironment",res);
          let data = res.data 
          data.forEach(value=>{
            let arr = {
                value:value.envir_type
            }
            this.houseEnvirList.push(arr)
          })
      })
  }
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
.Condition-div{
    margin-top: 15px;
}
</style>
