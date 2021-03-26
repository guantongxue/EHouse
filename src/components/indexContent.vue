<template>
  <div class="indexContent">
 
     <crumd ref="crumd" @SelectHouseList="SelectHouse"></crumd>      
      <classification ref="classification" :selectCity="selectCity" @ChangeSelectCity="ChangeSelectCity" @SelectHouseList="SelectHouse"></classification>
      <index-resouce-list :houseResouceList="HouseResouse" :count="count" ref="resouceList" @onChange="onChange" @SelectHouseList="SelectHouse"></index-resouce-list>
  </div>
</template>

<script>
import Classification from './classification.vue';
import IndexResouceList from '../components/indexResouceList.vue';
import  {SelectHouseByOption} from "@/api/houseResouce.js"
import Crumd from '../components/crumd.vue';
export default {
    data(){
        return{
            current_page : 1,
            page_size : 15,
                HouseResouse:[],
            count:0
        }
    },
    props:{
        selectCity:{
            typeof:String
        },
    },
    components:{
        Classification,
        IndexResouceList,
        Crumd,

    },
    methods:{
        SelectHouse(){
            //区域
            let areaTemp =null;
            if(this.$refs.classification.$refs.indexTag.tags[1].val != ''){
                areaTemp =this.$refs.classification.$refs.indexTag.tags[1].val
            }
            //房型
            let house_typeTemp = null
            if(this.$refs.classification.$refs.indexTag.tags[2].val != ''){
                house_typeTemp =this.$refs.classification.$refs.indexTag.tags[2].val
            }
            //环境条件
            let tags = []
            this.$refs.classification.$refs.indexTag.tags.forEach(value => {
                if(value.val != '' && value.pid != '0' && value.pid != '1' && value.pid != '2' &&value.pid != '4'){
                    tags.push(value.val)
                }
            });
            if(tags.length == 0){
                tags = null
            }
            //业务类型
            let biz_typeTemp = this.$refs.crumd.clickedIndex;
            if(biz_typeTemp == 0){
                biz_typeTemp = null
                console.log("类型",biz_typeTemp);
            }else if(biz_typeTemp == 1){
                biz_typeTemp = 'sell'
                console.log("类型",biz_typeTemp);
            }else if(biz_typeTemp == 2){
                biz_typeTemp = 'sent'
                console.log("类型",biz_typeTemp);
            }
            //价格区间
            let minPriceTemp = ''
            let maxPriceTemp = ''
            if(this.$refs.classification.minPrice == ""){
                minPriceTemp = null
            }else{
                minPriceTemp = parseInt(this.$refs.classification.minPrice)
                if(this.$refs.classification.defaultUnit == '万元'){
                    minPriceTemp = minPriceTemp * 10000
                }
            }
            if(this.$refs.classification.maxPrice == ''){
                maxPriceTemp = null
            }else{
                maxPriceTemp = parseInt(this.$refs.classification.maxPrice)
                if(this.$refs.classification.defaultUnit == '万元'){
                    maxPriceTemp = maxPriceTemp * 10000
                }
            }
            //价格排序方式
            let price_orderTemp = 1
            if(this.$refs.resouceList.checkList.asc){
                price_orderTemp = 2
            }
            let body = {
                city:this.$refs.classification.nowCity,
                area:areaTemp,
                house_type:house_typeTemp,
                biz_type:biz_typeTemp,
                house_envirs:tags,
                minPrice:minPriceTemp,
                maxPrice:maxPriceTemp,
                price_order:price_orderTemp,
                current_page:parseInt(this.current_page-1),
                page_size:this.page_size,
            }
            SelectHouseByOption(body).then(res=>{
                console.log("房源查询数据",res);
                this.count = res.data.count
                this.HouseResouse = res.data.houseResouceListList

            }).catch(e=>{
                this.$message.error('房源查询数据失败')
            })
        },
        onChange(page){
            this.current_page = page
        },
        //城市修改
        ChangeSelectCity(){
            this.SelectHouse();
        }
    },
    mounted(){
        this.SelectHouse();
    }

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
.crumd-content{
    background-color:#f0f2f5 ;
}
</style>


