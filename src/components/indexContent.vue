<template>
  <div class="indexContent">
      <classification></classification>
  </div>
</template>

<script>
import Classification from './classification.vue';
export default {
    data(){
        return{
        }
    },
    props:{

    },
    components:{
        Classification

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


