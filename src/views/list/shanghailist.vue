<template>
  <div>
 
           <button @click="mycreated">获取照片</button>
            <div v-for="items in imgs" :key="items.id">
              <img :src="items.jpgs" alt="">
            </div>
    
  
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component({
  components: {
   
  },
})
export default class App extends Vue {
 
  imgs=[]
async  mycreated(){
    const {data:data}=await this.$http.get('/shanghai/index')
    console.log(data);
     this.imgs=data.shanghai
    console.log(this.imgs);
    
  }
}
</script>

<style lang='less' scoped>

</style>
