<template>
  <div class="tag-content">
    <template v-for="(tag, index) in tags">
      <a-tooltip v-if="tag.val.length > 20" :key="tag.val" :title="tag.val" color="#FF787E" class="tag-content-head">
        <a-tag  color="#FF787E" v-if="tag.val.length > 20 && tag.val!=''" :key="tag.val" :closable="index !== 0" @close="() => handleClose(tag.val)">
            {{ `${tag.val.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag v-if="tag.val.length <= 20 && tag.val!=''" color="#FF787E" :key="tag.val" :closable="index !== 0" @close="() => handleClose(tag.val)">
        {{ tag.val }}
      </a-tag>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: [
        {
          val:'全部分类',
          pid:'0'
        },
        {
          val:'',
          pid:'1'
        },
        {
          val:'',
          pid:'2'          
        },
        {
          val:'',
          pid:'3'          
        },
        {
          val:'',
          pid:'4'          
        }

        ],
      inputVisible: false,
      inputValue: '',
    };
  },
  methods: {
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      this.tags = tags;
      
      this.tags.forEach((val,index)=>{
        if(this.tags[index].val == removedTag){
            this.tags[index].val = ""
        }
      })
      this.$emit("handleClose")
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

  },
};
</script>
<style scoped>
.tag-content{
    width: 100%;
    height: 50px;
    padding-top: 15px;
    padding-left: 40px;
    background:white ;
}
</style>