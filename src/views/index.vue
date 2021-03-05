<template>
  <div>
    <a-layout id="components-layout-demo-top" class="layout">
      <layout-header></layout-header>
      <a-layout-content style="padding: 0 50px">
        <!-- 分类 -->
        <crumd></crumd>
        <index-content></index-content>
        <!-- <div
          :style="{ background: '#fff', padding: '24px', minHeight: '1200px' }"
        >
          Content
        </div> -->
      </a-layout-content>
      <right-slider></right-slider>
      <a-layout-footer style="text-align: center">
        Ehouse ©2021 Created by GNW
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import LayoutHeader from '../components/header.vue';
import RightSlider from '../components/rightSlider.vue';
import Crumd from '../components/crumd.vue';
import IndexContent from '../components/indexContent.vue';
import "../assets/css/content.css";
export default {
  components:{
    LayoutHeader,
    RightSlider,
    Crumd,
    IndexContent
  },

};
</script>

<style>


</style>
