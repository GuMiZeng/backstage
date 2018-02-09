<template>
  <div class="operate" @keydown.enter="handleSubmit()">
    <Card class="personal">
      <p class="title">
        <Icon type="person"></Icon>
        <span v-text="'添加人员'"></span>
      </p>
      <div>
        <i-form ref="d_form" :model="d_form" label-position="right" :label-width="80" :rules="d_form_check">
          <Form-item prop="remark" label="备注:">
            <div class="form_input">
              <i-input ref="d_form.remark" v-model="d_form.pwd" @on-blur="inputFilter()" type="text" :maxlength="20" placeholder="备注">
              </i-input>
            </div>
          </Form-item>
          <Form-item prop="phone" label="手机号:">
            <div class="form_input">
              <i-input> ref="d_form.phone" v-model="d_form.new_pwd" @on-blur="inputFilter()" type="text" :maxlength="11" placeholder="手机号">
              </i-input>
            </div>
          </Form-item>
          <Form-item prop="pwd" label="密码:">
            <div class="form_input">
              <i-input ref="d_form.pwd" v-model="d_form.sure_pwd" @on-blur="inputFilter()" type="password" :maxlength="14" placeholder="密码">
              </i-input>
            </div>
          </Form-item>
          <div class="form_button">
            <Button type="primary" :loading="savePassLoading" @click="handleSubmit()" v-text="'保存'"></Button>
          </div>
        </i-form>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      d_form: {
        pwd: null,
        new_pwd: null,
        sure_pwd: null
      },
      d_form_check: {
        remark: [
          {
            trigger: 'change',
            validator: (rule, value, callback) => {
              // 禁止空
              if (!value) {
                return callback(new Error('备注不能为空'))
              }
              // 长度必须为4
              if (value.length < 6) {
                return callback(new Error('输入6-14字符的密码'))
              }
              return callback()
            }
          }
        ],
        phone: [{
          trigger: 'change',
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
        pwd: [{
          trigger: 'change',
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
  computed: {
  },
  methods: {
    handleSubmit () {
      this.$refs.d_form.validate((valid) => {
        if (valid) {
          this.$store.actions('dealer/upData', this.d_form)
        } else {
          this._message('error', '输入错误')
        }
      })
    }
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
.personal {
 text-align: left;
 .title {
  margin: 10px 0;
  color: #2d8cf0;
 }
 .form_input {
  display: inline-block;
  width: 300px;
 }
 .form_button {
  width: 380px;
  text-align: right;
 }
}
</style>
