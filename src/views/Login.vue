<template>
  <div class="login">
    <div class="mainLogin-img">
      <img src="../assets/home/bglogin.jpg" alt="logo" class="imgOne" />
      <img src="../assets/home/logo.png" alt="" class="lilto_imgs" />
    </div>
    <div class="modoles">
      <div class="text_one">
        <p>欢迎来到</p>
        <p>九天智能稽核平台</p>
      </div>
      <div class="Input_net">
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          layout="horizontal"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              class="inp_user"
              v-decorator="[
                'userName',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名!',
                      trigger: 'change blur',
                      initialValue: form.userName,
                    },
                  ],
                },
              ]"
              placeholder="用户名"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
              class="inp_password"
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      validator: passwordValidator,
                      trigger: 'change blur',
                      initialValue: form.password,
                    },
                  ],
                },
              ]"
              type="password"
              placeholder="密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
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
            <a-button html-type="submit" class="login-form-button">
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <h3 class="h_num">有问题请联系管理员 010-5268668</h3>
      <h3 class="h_footer">copyright © 中国移动九天智能稽核平台</h3>
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  mounted() {
    const param = JSON.parse(sessionStorage.getItem("password")) || {};
    if (Object.keys(param).length > 0) {
      this.form.setFieldsValue({
        userName: param.userName,
        password: param.password,
      });
    } else {
      this.form.setFieldsValue({
        userName: "",
        password: "",
      });
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          // return false;
        }
        // if (values.remember) {
        //   sessionStorage.setItem("password", JSON.stringify(values));
        // }
        sessionStorage.setItem("username", values.userName);
        window.location.href = "#/checkall";
      });
    },
    passwordValidator(rule, value, callback) {
      // const reg = /^.*(?=.{8,32})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%\^&\*\(\)_+{}\|":\?><,\.\/;'\[\]\\]).[A-Za-z\d~`!@#$%\^&\*\(\)_+{}\|":\?><,\.\/;'\[\]\\]*$/;
      if (!value.length) {
        callback("密码长度不能为空!");
      }
      // else if (value.length < 8) {
      //   callback("密码长度不能小于8位！");
      // } else if (!reg.test(value)) {
      //   callback("密码必须包含大小写字母，特殊符号!");
      // }
      callback();
    },
  },
};
</script>

<style lang="less">
.login {
  height: 100vh;
  display: flex;
  overflow: hidden;
  .mainLogin-img {
    width: 60%;
    height: 100%;
    background: #0b2f8a;
    .imgOne {
      width: 100%;
    }
    .lilto_imgs {
      width: 400px;
      position: absolute;
      left: 48px;
      top: 22px;
    }
  }
  .modoles {
    height: 100% !important;
    margin-left: 97px;
    flex: 1;
    text-align: left;
    position: relative;
    width: 472px;
    height: 452px;
    .text_one {
      font-size: 34px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
    }
    .Input_net {
      margin-top: 96px;
      .chackNumber {
        margin: 14px 0;
      }
    }
  }
}
</style>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
.main_Login {
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  position: relative;
}

.text_one {
  width: 272px;
  height: 96px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  padding-top: 189px;
  /* padding-left: 97px; */
}

.inp_user {
  width: 368px;
  height: 40px;
  margin-top: 48px;
  line-height: 40px;
  margin-bottom: 10px;
  background: #ffffff;
  border-radius: 4px;
}
.inp_password {
  width: 368px;
  height: 40px;
  line-height: 40px;
  background: #ffffff;
  border-radius: 4px;
}
.h_num {
  font-size: 12px;
  margin-top: 16px;
  color: #7f828f;
}
.h_footer {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  /* position: absolute;
  bottom: 48px; */
 margin-top: 74px;
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
  background: linear-gradient(90deg, #63c4ff 0%, #457eff 100%);
  color: #ffffff;
  font-weight: 400;
  display: block;
  margin-top: 12px;
}
</style>
