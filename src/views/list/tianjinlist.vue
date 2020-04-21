<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>房价管理</el-breadcrumb-item>
      <el-breadcrumb-item>天津房价</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getgoodlist">
            <el-button slot="append" icon="el-icon-search" @click="handleCurrentChange(1);getgoodlist"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品房</el-button>
        </el-col>
      </el-row>
       <!-- table表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="房屋照片" width="200px">
          <template slot-scope="scope">
            <img :src="scope.row.jpgs" alt="" class="imgclass">
          </template>
        </el-table-column>
        <el-table-column label="房子描述" prop="scripts" width="500px"></el-table-column>
        <el-table-column label="房子单价" prop="oneprice" width="120px"></el-table-column>
        <el-table-column label="房子位置" prop="localtwo" width="120px"></el-table-column>
         <el-table-column label="小区名字" prop="local" width="100px"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editCateDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
   
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
    </el-card>
   <el-dialog title="添加商品房" :visible.sync="addHouseVisible" width="50%" class="addpreiw">
      <!-- 添加表单区域 -->
        <!-- action 表示图片要上传到的后台API地址 -->
            <el-upload :action="imgUrl" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :headers="headerObj" :on-success="handleSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="0px" class="add_form">
        <!-- 小区名字 -->
        <el-form-item prop="local">
          小区名字:<el-input v-model="addForm.local" ></el-input>
        </el-form-item>
        <!-- 房子描述 -->
        <el-form-item prop="scripts">
          房子描述:<el-input v-model="addForm.scripts"></el-input>
        </el-form-item>
         <!-- 小区名字 -->
        <el-form-item prop="onePrice">
          单价:<el-input v-model="addForm.onePrice" ></el-input>
        </el-form-item>
        <!-- 房子描述 -->
        <el-form-item prop="localRoom">
          房子套型:<el-input v-model="addForm.localRoom"></el-input>
        </el-form-item>
         <!-- 小区名字 -->
        <el-form-item prop="localArea">
          占地面积:<el-input v-model="addForm.localArea" ></el-input>
        </el-form-item>
        <!-- 房子描述 -->
        <el-form-item prop="localHigh">
          房子高度:<el-input v-model="addForm.localHigh"></el-input>
        </el-form-item>
         <!-- 小区名字 -->
        <el-form-item prop="localTimes">
          建造时间:<el-input v-model="addForm.localTimes" ></el-input>
        </el-form-item>
        <!-- 房子描述 -->
        <el-form-item prop="localTwo">
          房子位置:<el-input v-model="addForm.localTwo"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="addRoomtotal">提交</el-button>
        </el-form-item>
      </el-form>
     
    </el-dialog>
<!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt="" class="previewImg">
    </el-dialog>
    <!-- 修改数据 -->
    <el-dialog title="编辑商品房" :visible.sync="editHouseVisible" width="50%" class="addpreiw">
      <!-- 添加表单区域 -->
       <!-- action 表示图片要上传到的后台API地址 -->
            <el-upload :action="imgUrl" :on-preview="edithandlePreview" :on-remove="edithandleRemove" list-type="picture" :headers="headerObj" :on-success="edithandleSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
      <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="0px" class="add_form">
        <!-- 小区名字 -->
        <el-form-item prop="local">
          小区名字:<el-input v-model="editForm.local" ></el-input>
        </el-form-item>
        <!-- 房子描述 -->
        <el-form-item prop="scripts">
          房子描述:<el-input v-model="editForm.scripts"></el-input>
        </el-form-item>
         <!-- 小区名字 -->
        <el-form-item prop="oneprice">
          单价:<el-input v-model="editForm.oneprice" ></el-input>
        </el-form-item>
        <!-- 房子描述 -->
        <el-form-item prop="localtwo">
          房子位置:<el-input v-model="editForm.localtwo"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="editRoomtotal">提交</el-button>
        </el-form-item>
      </el-form>
    
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component({
  components: {
   
  },
})
export default class App extends Vue {
      previewVisible= false
      // 图片上传组件的headers请求头对象
      headerObj= {
        Authorization: window.sessionStorage.getItem('token')
      }
      
      
      //上传地址
     imgUrl= 'http://127.0.0.1:5757/fy/upload'
      //图片预览
      previewPath=''
       //添加房子信息
    addForm= {
        jpgs: '',
        local: '',
        scripts:'',
        onePrice:'',
        localRoom:'',
        localArea:'',
        localHigh:'',
        localTimes:'',
        localTwo:''

      }
      // 这是表单的验证规则对象
      addFormRules= {
        // 验证用户名是否合法
        scripts: [
          { required: true, message: '请输入详细描述', trigger: 'blur' },
          { min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        local: [
          { required: true, message: '请输入小区名字', trigger: 'blur' },//提交为空时显示
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }//提交少于6或者大于15时显示
        ]}
          //添加房子信息
    editForm= {
        id:'',
        jpgs: '',
        local: '',
        scripts:'',
        oneprice:'',
        localtwo:''

      }
      // 这是表单的验证规则对象
      editFormRules= {
        // 验证用户名是否合法
        scripts: [
          { required: true, message: '请输入详细描述', trigger: 'blur' },
          { min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        local: [
          { required: true, message: '请输入小区名字', trigger: 'blur' },//提交为空时显示
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }//提交少于6或者大于15时显示
        ]}
        addHouseVisible=false
         // 查询参数对象
      queryInfo= {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
      // 总数据条数
      total= 0
      //数据列表
      goodslist=[]
      editHouseVisible=false
      //创建时触发
      created(){
        this.getgoodlist()
      }
async  getgoodlist(){
    const {data:data}=await this.$http.get('/tianjin/index',{
      params:this.queryInfo
      
    })
    console.log(data);
     this.goodslist=data.tianjin
    console.log(this.goodslist);
     this.total=data.total
    
  }
  //分页改变时
  handleSizeChange(newSize:any) {
      this.queryInfo.pagesize = newSize
      this.getgoodlist()
    }
    handleCurrentChange(newPage:any) {
      this.queryInfo.pagenum = newPage
      this.getgoodlist()
    }
    //图片移除时
      handleRemove() {
  
        this.addForm.jpgs=''
         console.log(this.addForm.jpgs);
      }
      //图片预览
      handlePreview(file:any) {
        
        console.log(file)
      this.previewPath = file.response.imgurl
      this.previewVisible = true
        

      }
      // 监听图片上传成功的事件
    handleSuccess(response:any) {
      console.log(response.data)
      
      // 将图片信息对象，push到新图像数组中
      this.addForm.jpgs=response.imgurl
      console.log(this.addForm.jpgs);
      
    }
    //编辑对象时的图片操作
    //编辑图片移除时
      edithandleRemove() {
  
        this.editForm.jpgs=''
         console.log(this.editForm.jpgs);
      }
      //图片预览
      edithandlePreview(file:any) {
        
        console.log(file)
      this.previewPath = file.response.imgurl
      this.previewVisible = true
        

      }
      // 监听图片上传成功的事件
     edithandleSuccess(response:any) {
      console.log(response.data)
      
      // 将图片信息对象，push到新图像数组中
      this.editForm.jpgs=response.imgurl
      console.log(this.editForm.jpgs);
      
    }
   //添加商品房
   goAddpage(){
      this.addHouseVisible=true
   }

    //提交新信息  
   async addRoomtotal() {
     console.log(this.addForm);
     
      this.$refs.addFormRef.validate(async (valid:any) => {
        if (!valid) return
      const {data:data}=await this.$http.post('/tianjin/add',this.addForm)
     console.log(data.data);
     
       
     if(data.data){
        this.$message({
          showClose: true,
          message: '添加成功！',
          type: 'success'
        });
        this.addHouseVisible=false 
        this.getgoodlist()  
     }else{
        this.$message({
          showClose: true,
          message: '添加失败！',
          type: 'error'
        });
     }
     })
      
    }
     // 删除商品房
     // 根据Id删除对应的信息
    async removeById(id:any) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const res = await this.$http.post('/delete/goods',{
        "id":id
      })

      if (res.data == null) {
        return this.$message.error('删除用户失败！')
      }

      this.$message.success('删除用户成功！')
      this.getgoodlist()
      // console.log(res)
      // id.children = res.data
    }
  //查询对应信息
  async editCateDialog(id:any){
 const res =await this.$http.post('/findid/goods',{
   "id":id
 })
 if (res.data == null) {
        return this.$message.error('查询用户失败！')
      }

      this.$message.success('查询用户成功！')
      console.log(res.data.data);
      this.editForm.id=res.data.data[0].id
      this.editForm.jpgs=res.data.data[0].jpgs
      this.editForm.scripts=res.data.data[0].scripts
      this.editForm.local=res.data.data[0].local
      this.editForm.oneprice=res.data.data[0].oneprice
      this.editForm.localtwo=res.data.data[0].localtwo
      this.editHouseVisible=true
    console.log(this.editForm);
    
  }
  //提交修改数据
 async editRoomtotal(){
   console.log(this.editForm);
   
this.$refs.editFormRef.validate(async (valid:any) => {
        if (!valid) return
      const data=await this.$http.post('/put/goods',this.editForm)
     console.log(data);
     
       
     if(data){
        this.$message({
          showClose: true,
          message: '编辑成功！',
          type: 'success'
        });
        this.editHouseVisible=false 
        this.getgoodlist()  
     }else{
        this.$message({
          showClose: true,
          message: '编辑失败！',
          type: 'error'
        });
     }
     })
 }
      
}
     

</script>

<style lang="less" scoped>
.previewImg {
  width: 100%;
}
.addpreiw{
  display: flex;
  flex-direction: column;
  width:100%;
  height: 100%;

}
.add_form{
  width:100%;
  z-index: 1;
}
.imgclass{
  width: 100%;
  height: 200px;
}


</style>
