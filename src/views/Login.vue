<template>
   <div class="container" v-loading="loading">
      <div class="loginBox">
            <h3>房屋管理平台</h3>
            
            <el-form ref="loginRef" :rules="loginRules" :model="loginForm">

               <el-form-item prop="username">
                  <el-input  prefix-icon="iconfont icon-user" clearable v-model="loginForm.username" placeholder="请输入用户名" autofocus='true'></el-input>
               </el-form-item>
               <el-form-item prop='password'>
                  <el-input prefix-icon="iconfont icon-lock" clearable type="password" show-password v-model="loginForm.password" placeholder="请输入密码"></el-input>
               </el-form-item>
               <el-form-item prop="code">
                  <el-input prefix-icon="iconfont icon-yanzhengma"  placeholder="请输入验证码" v-model="loginForm.code" style="display:block"></el-input>
               </el-form-item>
               <span class="checkCode">   
                  <div class="coderight" @click="refreshCode">
                     <s-identify :identifyCode="identifyCode"></s-identify>
                  </div>
               </span>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('loginRef')" class="loginBtn">登录</el-button>
               </el-form-item>

            </el-form>

      </div>
      <footer>
         <p>Copyright(C)2010-2011</p>
         <p>津ICP备12003500</p>
         <p>公安备12003508-15</p>
      </footer>
   </div>
</template>

<script>
import SIdentify from "./identify";
export default{
   data(){
      // var validatePass2 = (rule, value, callback) => {
      //    if (value === '') {
      //       callback(new Error('请再次输入密码'));
      //    } else if (value !== this.ruleForm2.pass) {
      //       callback(new Error('两次输入密码不一致!'));
      //    } else {
      //       callback();
      //    }
      // };
      const validateCode=(rule,value,callback)=>{
         // const patt=/^(?|bai[0-9]+$)(?|[a-zA-Z]+$)[0-9A-Za-z]{6-12}$/;
         // if(value===''){
         //    callback(new Error('请输入验证码'))
         // }else if(!patt.test(value)){
         //    callback(new Error('6-12数字字母组成！'))
         // }else{
         //    callback()
         // }
         value=value.toUpperCase()
         if(value !=this.identifyCode){
            callback(new Error('验证码不正确'))
         }else{
            callback()
         }
      }
      return {
         loginForm:{
            username:'15110283003',
            password:'88888888',
            code:''
         },
         loginRules:{
            username:[
               { required: true, message: '请输入用户名', trigger: 'blur' },
               { max:11,min:11, message: '用户名长度11位数，是电话号码', trigger: 'blur' },
            ],
            password:[
               { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            code:[
               { validator:validateCode, trigger: 'blur' },
            ]
         },
         identifyCodes: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
         identifyCode: "",
         loading:false
      }
   },

   components: {
      SIdentify: SIdentify
   },
   mounted(){
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
   },
   methods:{
      onSubmit(loginRef){
         // console.log(this.loginForm)
         this.$refs[loginRef].validate(async valid=>{
            if(valid){
                this.loading=true
                const res=await this.$http.post('/user_login/Login',{
                   'username':this.loginForm.username,
                   'password':this.loginForm.password
                })
                console.log(res)  
                if(res.status==200){
                   sessionStorage.token={'username':this.loginForm.username,'password':this.loginForm.password}
                   this.$message.success('登录成功')
                   this.loading=false//关闭登录成功模态框
                   
                   this.$router.push('/home')//编程式导航跳转后台首页面
                }else{
                   this.$message.error('网络连接错误')
                }
            }else{
               return false
            }
         })
      },
      randomNum(min, max) {
         return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
         this.identifyCode = "";
         this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
         for (let i = 0; i < l; i++) {
         this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
         ];
         }
         console.log(this.identifyCode);
      }
   }
}
</script>
<style lang="less" scoped>

.container{
  height: 100vh;
  background: url(../assets/image/background.jpeg);
  background-size: 100% 100%;
  background-size: cover;
  position: relative;
}
.loginBox{
   width: 300px;
   height: 400px;
   padding: 50px 75px;
   background-color: white;
   position: fixed;
   right: 100px;
   top: 10%;
}
footer{
   display: flex;
   justify-content: space-around;
   width: 1400px;
   color: #fff;
   // margin: 0 auto;
   position: absolute;
   left: 50%;
   bottom: 0;
   transform: translateX(-50%);
}
.loginBtn{width: 100%;}
.el-form{
   position: relative;
   .checkCode{
      position:absolute;
      right: 0;
      bottom: 62px;
      width: 110px;
      height: 42px;
   }
   
}

</style>