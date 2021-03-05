<template>
  <div>
    <a-collapse default-active-key="1" :bordered="false" :expandIconPosition="'right'">
      <a-collapse-panel :showArrow="false" key="1" header="This is panel header 1" :style="customStyle">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel :showArrow="false" key="2" header="This is panel header 2" :disabled="false" :style="customStyle">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel :showArrow="false" key="3" header="This is panel header 3" :style="customStyle">
        <p>{{ text }}</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
export default {
    data(){
        return{
            text: `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`,
            customStyle:"border: 0; background: white;"
        }
    },
    props:{

    },
    components:{

    },


};
</script>

<style scoped>
.ant-layout, .ant-layout *{
   
}
</style>


