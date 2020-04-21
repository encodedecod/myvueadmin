<template>
   
  <div class="login_container">
    
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=834881161,3879896475&fm=26&gp=0.jpg" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="yanma">
          <el-input v-model="loginForm.yanma" prefix-icon="iconfont icon-3702mima" placeholder="请输入验证码"></el-input>
          <span>
      
        <img :src="imgsrc" @click="changeimg" alt="验证码" class="yanmaicon">
        
      </span>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
      <span class="register">
         未注册？，点击注册
         <el-button type="primary" @click="register">注册</el-button>
      </span>
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
      loginForm= {
        username: 'admin',
        password: 'ws123456',
        yanma:'pnjp'
      }
     imgsrc='http://127.0.0.1:5757/fy/login/yanma'
      // 这是表单的验证规则对象
      loginFormRules= {
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

        ]
        }
//  async beforeCreate(){
//  const res=await this.$http.get('/login/yanma')
//  console.log(res);
//  }
    changeimg(){
    
      this.imgsrc='http://127.0.0.1:5757/fy/login/yanma?'+Math.random();
     
      
    }
        // 点击重置按钮，重置登录表单
   async resetLoginForm() {
    // const res = await this.$http.get('/login/admin',{
    //   headers:{
    //     'Authorization':`${this.resdata}`
    //   }
    // })
    //   console.log(res);
      
      // if(res.data.code==404){
      //   console.log('页面跳转失败');
        
      // }else{
      //    this.$router.push('/Home')
      // }
       this.$refs.loginFormRef.resetFields();
    }
   async login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
      const {data:data}=await this.$http.post('/login/login',this.loginForm)
      // console.log(data.token);
      console.log(this.loginForm);
      
       this.resdata=data.token
     window.sessionStorage.setItem('token', data.token)
     if(data.token){
        this.$message({
          showClose: true,
          message: '登录成功！',
          type: 'success'
        });
          // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
     }else{
        this.$message({
          showClose: true,
          message: '登录失败！',
          type: 'error'
        });
     }
     })
      
    }
    register(){
      this.$router.push('/register')
    }
    }

</script>

<style lang='less'>
.login_container {
  background-image:url('https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4065813837,3538914239&fm=26&gp=0.jpg');
  height: 100%;
 
}

.login_box {
  width: 450px;
  height: 380px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  background: url('https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2072754941,521046530&fm=26&gp=0.jpg');
  transform: translate(-50%, -50%);
  background-size:100% 100%;
  background-repeat:no-repeat;

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 40px;
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
.login_form :nth-child(3) .el-input{
  width: 250px;
}
.register{
  position: absolute;
  bottom: 2px;
  right: 20px;
}
</style>