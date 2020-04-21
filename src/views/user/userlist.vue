<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getuserlist">
            <el-button slot="append" icon="el-icon-search" @click="handleCurrentChange(1);getuserlist"></el-button>
          </el-input>
        </el-col>
      </el-row>
       <!-- table表格区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户姓名" prop="username" width="500px"></el-table-column>
        <el-table-column label="用户密码" prop="password" width="120px"></el-table-column>
        <el-table-column label="用户邮箱" prop="email" width="120px"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editCateDialog(scope.row.create_time)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.create_time)"></el-button>
          </template>
        </el-table-column>
      </el-table>
   
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 4, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
    </el-card>
   
    <!-- 修改数据 -->
    <el-dialog title="编辑用户" :visible.sync="editUserVisible" width="50%" class="addpreiw">
      <!-- 添加表单区域 -->
      <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="0px" class="edit_form">
        <!-- 用户名字 -->
        <el-form-item prop="username">
         用户名字:<el-input v-model="editForm.username" ></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item prop="password">
          用户密码:<el-input v-model="editForm.password"></el-input>
        </el-form-item>
         <!--用户邮箱 -->
        <el-form-item prop="email">
         用户邮箱:<el-input v-model="editForm.email" ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="editUserlist">提交</el-button>
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
     
      
     
     
          //编辑用户信息
    editForm= {
       username:'',
       password:'',
       email:'',
       create_time:''

      }
      // 这是表单的验证规则对象
      editFormRules= {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入详细用户信息', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },//提交为空时显示
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }//提交少于6或者大于15时显示
        ]}
         // 查询参数对象
      queryInfo= {
        query: '',
        pagenum: 1,
        pagesize: 2
      }
      // 总数据条数
      total= 0
      //数据列表
      userlist=[]
      editUserVisible=false
      //创建时触发
      created(){
        this.getuserlist()
      }
async  getuserlist(){
    const {data:data}=await this.$http.get('/user/list',{
      params:this.queryInfo
      
    })
    console.log(data);
     this.userlist=data.userlist
    console.log(this.userlist);
     this.total=data.total
    
  }
  //分页改变时
    handleSizeChange(newSize:any) {
      this.queryInfo.pagesize = newSize
      this.getuserlist()
    }
    handleCurrentChange(newPage:any) {
      this.queryInfo.pagenum = newPage
      this.getuserlist()
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

      const res = await this.$http.post('/user/delete',{
        "create_time":id
      })

      if (res.data == null) {
        return this.$message.error('删除用户失败！')
      }

      this.$message.success('删除用户成功！')
      this.getuserlist()
      // console.log(res)
      // id.children = res.data
    }
  //查询对应信息
  async editCateDialog(id:any){
 const res =await this.$http.post('/user/find',{
   "create_time":id
 })
 if (res.data == null) {
        return this.$message.error('查询用户失败！')
      }

      this.$message.success('查询用户成功！')
      console.log(res.data);
      this.editForm.password=res.data.data[0].password
      this.editForm.username=res.data.data[0].username
      this.editForm.create_time=res.data.data[0].create_time
      this.editForm.email=res.data.data[0].email
      this.editUserVisible=true
    console.log(this.editForm);
    
  }
  //提交修改数据
 async editUserlist(){
   console.log(this.editForm);
   
this.$refs.editFormRef.validate(async (valid:any) => {
        if (!valid) return
      const data=await this.$http.post('/user/edit',this.editForm)
     console.log(data);
     
       
     if(data){
        this.$message({
          showClose: true,
          message: '编辑成功！',
          type: 'success'
        });
        this.editUserVisible=false 
        this.getuserlist()  
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
.edit_form{
  width:100%;
  z-index: 1;
}



</style>