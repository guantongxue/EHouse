<template>
  <div>
    <a-layout id="components-layout-demo-top" class="layout">
      <layout-header></layout-header>
      <a-layout-content style="padding: 0 50px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ background: '#fff', padding: '24px', minHeight: '1200px' }"
        >
          Content
        </div>
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
export default {
  components:{
    LayoutHeader,
    RightSlider
  },

};
</script>

<style>



</style>
