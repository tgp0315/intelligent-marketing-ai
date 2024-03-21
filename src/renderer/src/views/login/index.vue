<template>
  <div
    class="login"
    @mousedown.prevent.stop="mousedown"
    @mouseup="mouseup"
  >
    <div class="control">
      <template
        v-for="item in icons"
        :key="item"
      >
        <svg-icon
          class="icon"
          :name="item"
          @click.stop.prevent="clickIcon(item)"
        />
      </template>
    </div>
    <div class="logo">
      <img
        class="img"
        src="../../assets/png/frame.png"
        alt=""
      />
    </div>
    <div class="form">
      <div class="title">账号登录</div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
      >
        <el-form-item prop="name">
          <el-input
            v-model="ruleForm.name"
            :prefix-icon="Svguser"
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            :prefix-icon="Svgunlock"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item class="remember">
          <el-checkbox
            v-model="isRemember"
            label="记住密码"
            size="large"
          />
        </el-form-item>
        <el-form-item class="button">
          <el-button
            type="primary"
            link
            @click="forgetPassword"
          >
            忘记密码
          </el-button>
          <el-button @click="submitForm(ruleFormRef)"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Svglogin from '@/assets/icons/login.svg?component'
import Svguser from '@/assets/icons/user.svg'
import Svgunlock from '@/assets/icons/unlock.svg'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { encrypt, decrypt } from '@/utils/crypto'
import { useRouter } from 'vue-router'
import { test } from '@/api/module'
const router = useRouter()
const icons = ['zuixiaohua', 'close']
const key = encrypt('user')
interface RuleForm {
  name: string
  password: string
}
const isRemember = ref(false)
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  password: ''
})

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const a = async () => {
  const data = await test()
  console.log(data, 'data')
}
a()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (isRemember.value) {
        const data = encrypt({
          ...ruleForm,
          isRemember: isRemember.value
        })
        window.api.setStore(key, data)
      } else {
        window.api.deleteStore(key)
      }
      router.replace('/workbench')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const forgetPassword = () => {
  router.replace('/forgetPassword')
}

const getInfo = async () => {
  const info = await window.api.getStore(key)
  if (info) {
    const data = JSON.parse(decrypt(info))
    console.log(data, 'data')
    ruleForm.name = data.name
    ruleForm.password = data.password
    isRemember.value = data.isRemember
  }
}
getInfo()
/**鼠标按压 */
const mousedown = (e: Event) => {
  if (e.target instanceof SVGElement) {
    return
  }
  window.api.windowMove(true)
}

/**鼠标释放 */
const mouseup = () => {
  window.api.windowMove(false)
}

const clickIcon = (type: string): void => {
  if (type === 'zuixiaohua') {
    window.api.minimize()
  } else {
    window.api.close()
  }
}
</script>

<style lang="scss">
.login {
  height: 100%;
  width: 100%;
  display: flex;

  .control {
    position: absolute;
    top: 8px;
    right: -4px;
  }

  .icon {
    margin-right: 12px;
    cursor: pointer;
  }

  .logo {
    flex: 3;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    .img {
      width: 700px;
    }
  }

  .form {
    flex: 2;
    background: linear-gradient(180deg, #81affe 0%, #5691fe 16%, #1b68ff 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      width: 333px;
      height: 56px;
      font-size: 26px;
      font-weight: 600;
      color: #fff;
      line-height: 56px;
    }

    .el-form {
      width: 333px;
      // height: 56px;
      font-size: 28px;
      font-weight: 600;
      color: #fff;
      line-height: 56px;
      margin-top: 50px;
    }

    .el-input__inner {
      height: 42px;
    }

    .el-input__wrapper {
      background: #ffffff;
      box-shadow: 0px 3px 6px 1px rgba(0, 80, 171, 0.05);
      border-radius: 32px 32px 32px 32px;
    }
  }

  .el-input__icon {
    width: 20px;
    height: 20px;
    svg {
      height: 20px;
      width: 20px;
    }
  }

  .el-checkbox__label {
    width: 56px;
    height: 22px;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    line-height: 22px;
  }

  .el-checkbox__inner {
    border-radius: 14px;
  }

  .button {
    .el-form-item__content {
      display: flex;
      justify-content: space-between;
    }
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #fff;
  }

  .el-checkbox.el-checkbox--large {
    height: 30px;
    margin-top: -10px;
  }

  .is-link {
    width: 64px;
    height: 22px;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    line-height: 19px;
  }

  .el-button + .el-button {
    background: #ffffff;
    box-shadow: 8px 13px 26px 0px rgba(45, 100, 234, 0.16);
    border-radius: 51px 51px 51px 51px;
    width: 120px;
    font-size: 14px;
    font-family:
      Alibaba PuHuiTi-Regular,
      Alibaba PuHuiTi;
    font-weight: 400;
    color: #165dff;
  }
}
</style>
