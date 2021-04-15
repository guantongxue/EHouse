<template>
  <div class="content-main">
    <div v-if="this.resouceData.length != 0">
      <span class="resouce-title">{{ resouceData.resouce_title }}</span>
    </div>

    <a-carousel arrows :dots="false">
      <div
        slot="prevArrow"
        slot-scope="props"
        class="custom-slick-arrow"
        style="left: 10px; z-index: 999"
      >
        <a-icon type="left-circle" />
      </div>
      <div
        slot="nextArrow"
        slot-scope="props"
        class="custom-slick-arrow"
        style="right: 10px"
      >
        <a-icon type="right-circle" />
      </div>
      <div
        v-if="
          this.resouceData.length != 0 &&
          this.resouceData.releaseVideoList.length != 0
        "
      >
        <div v-if="this.resouceData.releaseVideoList.length != 0">
          <video-player
            class="video-player vjs-custom-skin img-content"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          >
          </video-player>
        </div>
      </div>

      <div v-for="(value, index) in resouceData.releasePhotosList">
        <img class="img-content" :src="value.photo_addr" alt="" />
      </div>
    </a-carousel>
    <div v-if="this.resouceData.length != 0" class="tel">
      <a-button type="primary" @click="gotoChat(resouceData.username)"> <a-icon type="mail" />联系我 </a-button>
      <span v-if="!isCollection">
        <a-icon
          @click="collection"
          class="collection-logo"
          type="star"
          title="取消收藏"
        />
        <span class="logo-adst">收藏</span>
      </span>
      <span v-else>
        <a-icon
          @click="cancleCollection"
          class="collection-logo2"
          type="star"
          title="取消收藏"
        />
        <span class="logo-adst">取消收藏</span>
      </span>
    </div>
    <!-- 描述 -->
    <div v-if="this.resouceData.length != 0">
      <a-descriptions title="房屋信息" layout="vertical" :bordered="true">
        <a-descriptions-item label="区域">
          {{ resouceData.area }}
        </a-descriptions-item>
        <a-descriptions-item label="房型">
          {{ resouceData.house_type }}
        </a-descriptions-item>
        <a-descriptions-item label="价格">
          <span class="content-price">{{
            getPrice(resouceData.biz_type, resouceData.price)
          }}</span>
        </a-descriptions-item>
        <a-descriptions-item label="发布者">
          {{
            resouceData.username.length > 15
              ? resouceData.username.slice(0, 14) + "..."
              : resouceData.username
          }}</a-descriptions-item
        >
        <a-descriptions-item label="发布编号">
          {{ resouceData.id }}</a-descriptions-item
        >
        <a-descriptions-item label="发布时间">
          {{ resouceData.create_time.slice(0, 10) }}</a-descriptions-item
        >
      </a-descriptions>
    </div>
    <div v-if="this.resouceData.length != 0" class="gaishu">
      <span class="desc-title">房屋概述:</span>
      <span>{{ resouceData.resouce_desc }}</span>
    </div>
  </div>
</template>

<script>
import { GetHouseResouceById,GetCollectionStatus,HouseIsCollection,CancleCollection} from "@/api/houseResouce.js";
import { SelectUseDetail } from "@/api/userService";
import { mapActions } from "vuex";
export default {
  props: {
    id: {
      typeof: String,
    },
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "", // url地址
          },
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
      resouceData: [],
      isCollection: false,
    };
  },
  methods: {
    ...mapActions(["logout", "userInfo"]),
    getPrice(biz_type, price) {
      if (biz_type == "sent") {
        return price + "元/月";
      } else {
        if (price > 10000) {
          return parseFloat(price / 10000) + "万元";
        } else {
          return price + "元";
        }
      }
    },
    //查询用户信息是否过期
    userInfoIsOk(){

    },
    //收藏
    collection() {
      console.log("45s45a");
      let userName = "";
      if(this.$store.state.userInfo != null){
        userName = this.$store.state.userInfo.username;
        let body2 = {
        username: userName,
        };
        SelectUseDetail(body2).then((res) => {
          if (res.code != 200){
            this.$message.warning('用户信息已失效，请重新登录')
            this.$emit('userLogin')
            this.logout();
          } else{
            let body ={
              username:this.$store.state.userInfo.username,
              release_id:this.id,
              isCollection:true
            }
            HouseIsCollection(body).then(res=>{
              if(res.code == 200){
                this.isCollection = res.data.isCollection
              }else{
                this.$message.error(res.message)
              }
            }).catch(e=>{
              this.$message.error('收藏失败')
            })
          }
          }).catch((e) => {
          this.$message.warning('用户信息已失效，请重新登录')
          this.$emit('userLogin')
          this.logout();
          });

      }else{
        this.$emit('userLogin')
      }
    },
    //取消收藏
    cancleCollection() {
      let userName = "";
      if(this.$store.state.userInfo != null){
        userName = this.$store.state.userInfo.username;
        let body2 = {
          username: userName,
        } 
        SelectUseDetail(body2).then((res) => {
          if (res.code != 200){
            this.$message.warning('用户信息已失效，请重新登录')
            this.$emit('userLogin')
            this.logout();
          } else{
            let body ={
              username:this.$store.state.userInfo.username,
              release_id:this.id,
              isCollection:false
            }
            CancleCollection(body).then(res=>{
              if(res.code == 200){
                this.isCollection = res.data.isCollection
              }else{
                this.$message.error(res.message)
              }
            }).catch(e=>{
              this.$message.error('取消收藏失败')
            })
          }
          }).catch((e) => {
          this.$message.warning('用户信息已失效，请重新登录')
          this.$emit('userLogin')
          this.logout();
          });

      }else{
        this.$emit('userLogin')
      }
    },
    //获取是否收藏
    getCollectionInfo() {
      console.log('efsd');
      let body = {
        release_id:this.id,
        username:this.$store.state.userInfo.username
      }
      GetCollectionStatus(body).then(res=>{
        console.log("2555",res);
        if(res.code == 200){
          this.isCollection = res.data.isCollection
        }
      })
    },
    gotoChat(username){

      let userName = "";
      if(this.$store.state.userInfo != null){
        userName = this.$store.state.userInfo.username;
        let body2 = {
          username: userName,
        } 
        SelectUseDetail(body2).then((res) => {
          if (res.code != 200){
            this.$message.warning('用户信息已失效，请重新登录')
            this.$emit('userLogin')
            this.logout();
          } else{
              const resouceUrl = this.$router.resolve({
              name: 'chat',
              params: { userName: username }
              })
              window.open(resouceUrl.href, '_blank')
              }
          }).catch((e) => {
          this.$message.warning('用户信息已失效，请重新登录')
          this.$emit('userLogin')
          this.logout();
          });
      }else{
          this.$message.warning('用户暂未登录，请先登录')
          this.$emit('userLogin')
          this.logout();
      }
    },
  },
  created() {},
  mounted() {
    let body = {
      id: this.id,
    };
    GetHouseResouceById(body).then((res) => {
        console.log("房源信息", res);
        if (res.code == 200) {
          this.resouceData = res.data;
          if (this.resouceData.releaseVideoList.length != 0) {
            this.playerOptions["sources"][0][
              "src"
            ] = this.resouceData.releaseVideoList[0].video_addr;
          } else {
            this.playerOptions.sources.src = "";
          }
        }
      }).catch((e) => {
        this.$message.error("房源信息加载失败");
      });
    let userName = "";
    if (this.$store.state.userInfo != null){
      userName = this.$store.state.userInfo.username;
      let body2 = {
        username: userName,
      };
      SelectUseDetail(body2).then((res) => {
        if (res.code != 200){
          this.logout();
        } else{
          this.getCollectionInfo()
        }
      }).catch((e) => {
        this.logout();
      });
    }

  },
};
</script>

<style scoped>
ul li {
  list-style: none;
  padding: 0 !important;
  margin: 0 !important;
}
.content-main {
  width: 800px;
  margin: 0 auto;
  /* min-width: 600px; */
  padding-top: 10px;
  /* padding-left: 15%; */
  /* padding-right: 15%; */
  background: white;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 450px;
  line-height: 450px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

.img-content {
  margin: auto;
  width: 800px !important;
  height: 450px !important;
}
.content-price {
  display: block;
  width: 100%;
  padding-right: 100px;
  padding-top: 4px;
  height: 32px;
  color: #eb5f00;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.resouce-title {
  display: block;
  font-size: 20px;
  color: #000;
  font-weight: bold;
  padding-bottom: 10px;
}
.desc-title {
  margin-top: 10px;
  display: block;
  font-size: 16px;
  color: #000;
  font-weight: bold;
  padding-bottom: 10px;
}
.tel {
  margin-top: 10px;
  padding-bottom: 20px;
}
.collection-logo {
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
}
.collection-logo2 {
  margin-left: 10px;
  font-size: 20px;
  color: #fffc48;
  cursor: pointer;
}
.logo-adst {
  display: inline-block;
  vertical-align: top;
  margin-left: 2px;
  font-size: 14px;
  font-weight: bold;
  height: 20px;
  line-height: 28px;
}
.gaishu {
  padding-bottom: 15px;
}
</style>
