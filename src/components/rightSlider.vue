<template>
  <div class="slider-content">
    <!-- 联系客服
    消息列表
    回到顶部 -->
    <div class="ul-main">
        <ul class="slider-ul">
            <li>
                <a-icon type="aliwangwang" class="icon-adst"/>
                联系客服
            </li>
            <li>
                <a-badge :count="1" dot class="icon-adst2 ant-badge-dot-adst">
                    <a-icon type="notification" />
                </a-badge>
                消息列表
            </li>
            <li @click="topClick">
                <a-icon type="to-top" class="icon-adst"/>
                顶部
            </li>
        </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
      topClick(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
  }
}
</script>

<style scoped>
li,ul{
    padding: 0;
    margin: 0;
    list-style: none;
}
.slider-content{
    position: relative;
    background: #ffffff;
    width: 52px;
    height: 100%;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 10;
    box-shadow: -2px 0px 4px 0px rgba(0, 0, 0, 0.1);
}
.ul-main{
    position:absolute;
    bottom: 20px;
}
.slider-ul{
    /* position: relative; */
    width: 52px;
    display: flex;
    flex-direction: column;
    justify-content: end;
}
.slider-ul li{
    display: block;
    width: 100%;
    height: 68px;
    text-align: center;
    font-size: 12px;
    color: #666666; 
    padding-top: 15px;
    box-sizing: border-box;
}
.slider-ul li:hover{
    background-color: #FF4555;
    color: white;
}
.slider-ul li .icon-adst{
    display: block;
    height: 20px;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
}
.slider-ul li .icon-adst2{
    display: block;
    height: 20px;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    padding-left:10px ;
}
.ant-badge-dot-adst{
    /* position: absolute; */
    right: 5px !important;
}
</style>


