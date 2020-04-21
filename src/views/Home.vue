<template>
  <div>
 <el-container>
   <el-aside width="200px">
          <el-menu mode="vertical" style="height:100vh;" :default-active="$route.path" router>
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="`menu-item-${index}-${item}`"
          :key="`menu-item-${index}}`"
        >
          <template slot="title">{{item.title}}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :key="`menu-item-${index}-${subIndex}-${subItem.path}`"
            :index="subItem.path"
          >{{subItem.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
   </el-aside>
   <el-container>
     <el-header height="400px">
       <div>
         <el-carousel :interval="2000" type="card" height="400px">
    <el-carousel-item v-for="(itemimg,index) in imgs" :key="itemimg.img" :index="`index-${index}`">
        <img :src="itemimg.img" alt="">
    </el-carousel-item>
  </el-carousel>
       </div>
        
     </el-header>
     <el-main>
           <router-view>

           </router-view>
     </el-main>
   </el-container>
 </el-container>
 
  
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component({
  components: {
   
  },
})
export default class App extends Vue {
  menu = {
    
    items: [
      
      {
        title: "房价管理",
        items: [
          { title: "首页", path: "/Home" },
          { title: "天津房价", path: "/tianjin/list"},
          { title: "成都房价", path: "/chengdu/list"},
          { title: "上海房价", path: "/shanghai/list" }
        ]
      },
       {
        title: "用户管理",
        items: [{ title: "用户列表", path: "/myuserlist/list" },
                { title: "用户限权", path: "/userpower/list" }]
      }
      ,
      {
        title: "整体分析",
        items: [{ title: "房价趋势", path: "/state/list" }]
      }
    ]
  };
  imgs=[{img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=816478222,3575111382&fm=11&gp=0.jpg'},
  {img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1798173886,3671914447&fm=26&gp=0.jpg'},
  {img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1357518075,2207145940&fm=26&gp=0.jpg'},
  {img:'http://attach.bbs.miui.com/forum/201303/18/233119quyrec7to3ws3rco.jpg'},
  {img:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1038132070,911008441&fm=26&gp=0.jpg'}]
  
}
</script>

<style lang='less' scoped>
.el-header{
  position: relative;
  width: 100%;

}
.fangjia{
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
position:absolute;
left: 50%;

}
.el-carousel{
  width: 100%;
  margin: auto;
  position: relative;
}
.el-carousel__item{
 position: absolute;
  left: 60px;
  right: 20px;  
 

}
.el-carousel__item img{
  width: 500px;
  height: 400px;
  margin: 0;
  position: absolute;
  border:4px outset palegreen;
  border-radius: 4px;
  

}
</style>
