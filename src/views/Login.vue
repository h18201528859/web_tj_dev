<template>
  <div class="login">
    <!-- <h1>This is login page</h1> -->
    <!-- <a-button type="primary" @click="jumpToHome">Login</a-button> -->
    <!-- <img
          src="../../images/bglogin.jpg"
          width="300px"
          height="30px"
          alt="logo"
          style="vertical-align: middle;"
        /> -->
    <div class="main_Login_img">
      <img
        src="../assets/home/bglogin.jpg"
        alt="logo"
        class="imgOne"
      />
      <img src="../assets/home/logo.png" alt="" class="lilto_imgs">
      <div class="box">
          <div class="modoles">
              <div class="text_one">
                  <p>欢迎来到</p >
                  <p>九天智能稽核平台</p >
              </div>
              <div class="Input_net">
                   <div class="login-container">
                       <a-form
                          id="components-form-demo-normal-login"
                          :form="form"
                          class="login-form"
                          @submit="handleSubmit"
                        >
                          <a-form-item>
                            <a-input
                            class="inp_user"
                              v-decorator="[
                                'userName',
                                { rules: [{ required: true, message: 'Please input your username!', trigger: 'change blur',initialValue: form.userName}] },
                              ]"
                              placeholder="用户名"
                            
                            >
                              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                          </a-form-item>
                          <a-form-item>
                            <a-input-password
                            class="inp_password"
                              v-decorator="[
                                'password',
                                { rules: [{ required: true,validator:passwordValidator, trigger: 'change blur',initialValue: form.password, }] },
                              ]"
                              type="password"
                              placeholder="密码"
                              
                            >
                              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                            </a-input-password>
                          </a-form-item>
                          <a-form-item class="chackNumber">
                            <a-checkbox
                              v-decorator="[
                                'remember',
                                {
                                  valuePropName: 'checked',
                                  initialValue: false,
                                },
                              ]"
                            >
                              记住密码
                            </a-checkbox>
                            <a-button  html-type="submit" class="login-form-button">
                              登录
                            </a-button>
                          </a-form-item>
                        </a-form>
                    </div>
                    <h3 class="h_num">有问题请联系管理员 010-5268668</h3>
                    <h3 class="h_footer">copyright © 中国移动九天智能稽核平台</h3>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
       
      // form:{
      //   password:'',
      //   userName:''
      // }
    }
  },
  beforeCreate() {
   this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
   mounted() {
    const param =  JSON.parse(sessionStorage.getItem('password')) || {};
   console.log(this.form,param)
    if(Object.keys(param).length>0){
      this.form.setFieldsValue({
        userName:param.userName,
        password:param.password
      })
    }else{
       this.form.setFieldsValue({
        userName:'',
        password:''
      })
    }
  },
  methods: {
    jumpToHome() {
      this.$router.push({
        path: "/home",
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
         console.log(err)
        if (!err) {
          console.log('Received values of form: ', values);
          // return false;
        }
        if(values.remember){
          sessionStorage.setItem('password',JSON.stringify(values))
        }
         this.$router.push({
          path: "/checkall",
        });
      });
    },
    passwordValidator(rule,value,callback){
       const reg = /^.*(?=.{8,32})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%\^&\*\(\)_+{}\|":\?><,\.\/;'\[\]\\]).[A-Za-z\d~`!@#$%\^&\*\(\)_+{}\|":\?><,\.\/;'\[\]\\]*$/
      if(!value.length){
         callback('密码长度不能为空!')
      }else if(value.length<8){
         callback('密码长度不能小于8位！')
      }else if(!reg.test(value)){
          callback('密码必须包含大小写字母，特殊符号!')
      }
       callback()
    }
  },
};
// style="vertical-align: middle"
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.main_Login {
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  position: relative;
}
.main_Login_img{
  display: flex;
}
 .imgOne{
  width: 55rem;
  height: 721px;

}
.lilto_imgs{
  position: absolute;
  left: 5px;
  top: 5px;
  width:   578px;
  height: 74px;
}
.box{
  flex: 1;
  height: 721px;
  text-align: left;
  position: relative;
}
.modoles{
    width: 474px;
    height: 452px;
    /* border: 1px solid #ccc; */
}
.text_one{
  width: 272px;
  height: 96px;
  font-size: 18px;
  
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  padding-top: 189px;
    padding-left: 97px;

}
.Input_net{
  margin: 24px 97px;
}
.inp_user{
  width:368px;
  height:40px;
  margin-top:48px;
  line-height:40px;
  background: #FFFFFF;
  border-radius: 4px;
}
.inp_password{
  width:368px;
  height:40px;
  line-height:40px;
  background: #FFFFFF;
  border-radius: 4px;
}
.h_num{
  font-size: 12px;
  color:#7F828F;
}
.h_footer{
  font-size:12px;
  color: #7F828F;
  position:absolute;
  bottom:48px;
}
 #components-form-demo-normal-login .login-form {
  max-width: 368px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 368px;
  height: 40px;
  line-height: 40px;
  background: linear-gradient(90deg, #63C4FF 0%, #457EFF 100%);
  color: #FFFFFF;
  font-weight: 400;
}

</style>
