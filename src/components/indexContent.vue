<template>
  <div class="indexContent">
      <classification></classification>
      <index-resouce-list></index-resouce-list>
  </div>
</template>

<script>
import Classification from './classification.vue';
import IndexResouceList from '../components/indexResouceList.vue';
export default {
    data(){
        return{
        }
    },
    props:{

    },
    components:{
        Classification,
        IndexResouceList

    },


};
</script>

<style scoped>

.indexContent{
    width: 100%;
    min-height: 1200px;
    padding-left: 8%;
    padding-right: 8%;
    background: white;
}

</style>


