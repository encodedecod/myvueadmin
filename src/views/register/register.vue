<template>
  <div class="register_container">
      <div class="register_box"> 
   <!-- 注册表单区域 -->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="0px" class="register_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" prefix-icon="iconfont icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="iconfont icon-3702mima" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
         <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" prefix-icon="iconfont icon-danju" type="text" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="yanma">
          <el-input v-model="registerForm.yanma" prefix-icon="iconfont icon-3702mima" placeholder="请输入验证码"></el-input>
          <span>
      
        <img :src="imgsrc" @click="changeimg" alt="验证码" class="yanmaicon">
        
      </span>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetRegisterForm">重置</el-button>
        </el-form-item>
      </el-form>
         
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
  // 这是登录表单的数据绑定对象
     resdata=''
      registerForm= {
        username: '',
        password: '',
        yanma:'',
        email:''

      }
     imgsrc='http://127.0.0.1:5757/fy/login/yanma'
      // 这是表单的验证规则对象
      registerFormRules= {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },//提交为空时显示
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }//提交少于6或者大于15时显示
        ],
         yanma: [
          { required: true, message: '请输入验证码', trigger: 'blur' },//提交为空时显示

        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },//提交为空时显示

        ]
        }
    changeimg(){
    
      this.imgsrc='http://127.0.0.1:5757/fy/login/yanma?'+Math.random();
     
      
    }
        // 点击重置按钮，重置登录表单
   async resetRegisterForm() {
       this.$refs.registerFormRef.resetFields();
    }
   async register() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
      const {data:data}=await this.$http.post('/login/register',this.registerForm)
      // console.log(data.token);
      console.log(this.registerForm);
     if(data){
        this.$message({
          showClose: true,
          message: '注册成功！',
          type: 'success'
        });
          // 回到登录页面
        this.$router.go(-1)
     }else{
        this.$message({
          showClose: true,
          message: '注册失败！',
          type: 'error'
        });
     }
     })
      
    }
  
}
</script>

<style lang='less' scoped>
.register_container {
  background-image:url('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1467174003,3923680221&fm=26&gp=0.jpg');
  height: 100%;
 
}

.register_box {
  width: 450px;
  height: 340px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585853885685&di=49a050de3c0868045138d5f9bf546058&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fadaf2edda3cc7cd91769df6a3801213fb80e9139.jpg');
  transform: translate(-50%, -50%);
  background-size:100% 100%;
  background-repeat:no-repeat;
}

.register_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;//使其符合盒子模型
}

.btns {
  display: flex;
  justify-content: flex-end;
}
img[class="yanmaicon"]{
  position: absolute;
  right: 0px;
  height: 100%;
  border-radius: 4px;

}
.register_form :nth-child(4) .el-input{
  width: 250px;
}
</style>
