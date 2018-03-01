<template>
  <div class="login" @keydown.enter="handleSubmit()">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          欢迎登录瀑布竞技
        </p>
        <div class="form-con">
          <i-form ref="d_form" :model="d_form" :rules="d_form_check">
            <Form-item prop="phone">
              <i-input v-model="d_form.phone" @on-blur="inputFilter()" placeholder="请输入手机号" :maxlength="11">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
              </i-input>
            </Form-item>
            <Form-item prop="password">
              <i-input type="password" v-model="d_form.password" @on-blur="inputFilter()" placeholder="请输入密码" :maxlength="16">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </i-input>
            </Form-item>
            <Form-item>
              <i-button @click="handleSubmit()" type="primary" long>登录</i-button>
            </Form-item>
          </i-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
'use strict'
/* eslint-disable */
import { onlyNum, trimAll } from '../libs/function'
// import apiUser from '../api/user'
/* eslint-enable */
export default {
  data () {
    return {
      d_form: {
        phone: null,
        password: ''
      },
      d_form_check: {
        phone: [{
          trigger: 'change',
          required: true,
          validator: (rule, value, callback) => {
            // 禁止空
            if (!value) {
              return callback(new Error('手机号不能为空'))
            }
            // 检查格式
            if (!/^1[34578]{1}\d{9}$/.test(value)) {
              return callback(new Error('输入正确手机号码'))
            }
            return callback()
          }
        }],
        password: [{
          trigger: 'change',
          required: true,
          validator: (rule, value, callback) => {
            // 禁止空
            if (!value) {
              return callback(new Error('密码不能为空'))
            }
            // 长度必须为4
            if (value.length < 6) {
              return callback(new Error('输入6-14字符的密码'))
            }
            return callback()
          }
        }]
      }
    }
  },
  methods: {
    _message (_type = 'success', _str = 'success', _destroy = true, _onClose) {
      if (_destroy) this.$Message.destroy()
      this.$Message[_type]({
        content: _str,
        onClose: _onClose
      })
    },
    handleSubmit () {
      this.$refs.d_form.validate((valid) => {
        if (valid) {
          this.$store.actions('user/login', this.d_form)
        }
      })
    },
    inputFilter () {
      this.d_form.phone = onlyNum(this.d_form.phone)
      this.d_form.phone = trimAll(this.d_form.phone)
      this.d_form.password = trimAll(this.d_form.password)
    }
  }
}
</script>

<style lang="less" scoped>
.login {
 width: 100vw;
 height: 100vh;
 background-image: url("//file.iviewui.com/iview-admin/login_bg.jpg");
 background-size: cover;
 background-position: center;
 position: relative;
 &-con {
  position: absolute;
  right: 160px;
  top: 50%;
  transform: translateY(-60%);
  width: 300px;
  .form-con {
   padding: 10px 0 0;
  }
 }
}
</style>
