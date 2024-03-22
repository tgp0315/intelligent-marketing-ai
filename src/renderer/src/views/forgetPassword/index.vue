<template>
  <div
    class="forgetPassword"
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
      />
    </div>
    <div class="form">
      <div class="title">忘记密码</div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
      >
        <el-form-item prop="email">
          <el-input
            v-model="ruleForm.email"
            :prefix-icon="Svguser"
            placeholder="请输入电子邮箱账号"
          />
        </el-form-item>
        <el-form-item
          prop="code"
          class="code"
        >
          <el-input
            v-model="ruleForm.code"
            :prefix-icon="Svgverification"
            placeholder="请输入验证码"
          />
          <el-button
            v-if="hasGetCode"
            round
            link
            disabled
            @click="getCode"
          >
            {{ count }}秒后重试
          </el-button>
          <el-button
            v-else
            type="primary"
            round
            @click="getCode"
          >
            获取验证码
          </el-button>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            :prefix-icon="Svgunlock"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            :prefix-icon="Svgunlock"
            placeholder="确认密码"
          />
        </el-form-item>
        <el-form-item class="button">
          <div class="accountNumber">
            已有账号？去
            <el-button
              type="primary"
              link
              @click="goToLogin"
            >
              登录
            </el-button>
          </div>
          <el-button
            class="submit"
            @click="submitForm(ruleFormRef)"
          >
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Svguser from '@/assets/icons/user.svg'
import Svgunlock from '@/assets/icons/unlock.svg'
import Svgverification from '@/assets/icons/verification.svg'
import { onUnmounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { message } from '@/utils/message'
const icons = ['zuixiaohua', 'close']
// eslint-disable-next-line no-useless-escape
const reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
const router = useRouter()
interface RuleForm {
  email: string
  password: string
  code: string
}
const count = ref(60)
const hasGetCode = ref(false)
const formSize = ref('default')
let timer: number | undefined = void 0
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  email: '',
  password: '',
  code: ''
})

const validateEmail = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入电子邮箱账号'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确格式的电子邮箱账号'))
    }
    callback()
  }
}

const rules = reactive<FormRules<RuleForm>>({
  email: [{ validator: validateEmail, trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      router.replace('/home')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const goToLogin = () => {
  router.replace('./login')
}
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

const getCode = () => {
  if (!ruleForm.email) {
    message('请输入电子邮箱账号', 'warning')
    return
  }

  if (!reg.test(ruleForm.email)) {
    message('请输入正确格式的电子邮箱账号', 'warning')
    return
  }
  hasGetCode.value = true
  timer = Number(
    setInterval(() => {
      if (count.value > 0 && count.value <= 60) {
        count.value--
      } else {
        hasGetCode.value = false
        clearInterval(timer)
        timer = void 0
      }
    }, 1000)
  )
}

const clickIcon = (type: string): void => {
  if (type === 'zuixiaohua') {
    window.api.minimize()
  } else {
    window.api.close()
  }
}

onUnmounted(() => {
  timer && clearInterval(timer)
})
</script>

<style lang="scss">
.forgetPassword {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;

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

  .accountNumber {
    display: flex;
    align-items: center;
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
      font-size: 22px;
      font-weight: 600;
      color: #fff;
      line-height: 56px;
    }

    .el-form {
      width: 333px;
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
    // width: 64px;
    height: 14px;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    line-height: 19px;
    margin-top: 2px;
    border-bottom: 1px solid #fff;
  }

  .submit {
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

  .code {
    position: relative;

    .el-button--default {
      position: absolute;
      right: 2px;
      box-shadow: 8px 13px 26px 0px rgba(45, 100, 234, 0.16);
      border-radius: 51px 51px 51px 51px;

      &.is_round {
        background: #165dff;
      }
    }
  }
}
</style>
