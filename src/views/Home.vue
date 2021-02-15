<template>
    <el-container>
      <el-header>
        <div class="el-header-left">
          <img src="../assets/xj-logo.png" alt="" class="logo">
          <h3 class="f-w-n">
            房屋管理平台
          </h3>
          <i class="el-icon-s-fold"></i>
        </div>
        <div class="logininfo">
            <i class="iconfont icon-user"></i>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                猴哥<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="iconfont icon-lock">修改密码</el-dropdown-item>
                <el-divider></el-divider>
                <el-dropdown-item @click.native="logout" icon="iconfont icon-sign-out">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#e3e3e3" text-color="#000" active-text-color="#0e7de6">

              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>

              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">房屋管理</span>
              </el-menu-item>

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>缴纳管理</span>
                </template>
                <el-menu-item index="3-1">缴纳记录</el-menu-item>
                <el-menu-item index="3-2">催缴清单</el-menu-item>
              </el-submenu>

              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>缴纳统计</span>
                </template>
                <el-menu-item index="4-1">当日缴费统计</el-menu-item>
                <el-menu-item index="4-2">月缴费统计</el-menu-item>
                <el-menu-item index="4-3">月追缴欠费统计</el-menu-item>
                <el-menu-item index="4-4">年欠费统计</el-menu-item>
              </el-submenu>

              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item index="5-1">账期设置</el-menu-item>
                <el-menu-item index="5-2">小区设置</el-menu-item>
                <el-menu-item index="5-3">减免项设置</el-menu-item>
              </el-submenu>

          </el-menu>
        </el-aside>
        
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>


</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods:{
    logout(){
       this.$confirm('确定退出登录码？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.clear()
          //编程式导航
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
    }
  }
}
</script>
<style lang="less" scoped>
.el-container{
  height: 100vh;
  background: #f4f4f4!important;
}
.el-aside{
  background: #e3e3e3;
  ul li{text-align: left;}
}

.el-header{
  background: #0e7de6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left{
    display: flex;
    align-items: center;
    h3{
      margin: 0 10px;
      color:#fff
    }
    i{
      color: #fff;
      font-size: 20px;
      padding-top: 2px;
      cursor: pointer;
    }
  }
  .logininfo{
    display: flex;
    align-items: center;
    
    i{font-size: 30px;color:#ccc;cursor: pointer;color:#fff;}
  }
}
.logo{
  width: 40px;
  border-left: solid 6px white;
  border-right: solid 6px white;
}
.el-main{}
.el-dropdown{
  color: #fff
}
.el-dropdown-menu__item{width: 100px;}
.el-divider--horizontal{
  margin: 0;
}
</style>