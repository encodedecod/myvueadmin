<template>
  <div>
         <p>欢迎访问祥哥哥的后台管理系统!</p>
         
  
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component({
  components: {
   
  },
})
export default class App extends Vue {
 
  
}
</script>

<style lang='less' scoped>
div{
 display: flex;
 justify-content: center;
}
div p{
  font-size: 50px;
  color: blue;
}
</style>
