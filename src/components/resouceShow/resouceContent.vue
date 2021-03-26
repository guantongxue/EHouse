<template>
  <div class="content-main">
    <a-carousel arrows :dots="false">
    <div
      slot="prevArrow"
      slot-scope="props"
      class="custom-slick-arrow"
      style="left: 10px;zIndex: 1" 
    >
      <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle" />
    </div>
    <div>
        <video style="width:100%;height:400px;" controls>
            <source src="http://106.52.39.242/1375404605093036032/1375408639560421376.mp4">
        </video>
    </div>
    <div><img class="img-content" src="http://106.52.39.242/1375404605093036032/1375408621441028096.jpg" alt=""></div>
    <div><img class="img-content" src="http://106.52.39.242/1375404605093036032/1375408628256772096.jpg" alt=""></div>
    <div><img class="img-content" src="http://106.52.39.242/1375404605093036032/1375408630374895616.jpg" alt=""></div>
    <div><img class="img-content" src="http://106.52.39.242/1375404605093036032/1375408630374895616.jpg" alt=""></div>
  </a-carousel>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style scoped>
.content-main {
  width: 100%;
  padding-top: 10px;
  padding-left: 15%;
  padding-right: 15%;
  background: white;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 400px;
  line-height: 400px;
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

.img-content{
    width: 100%  !important;
    height: 400px !important;
}
</style>
