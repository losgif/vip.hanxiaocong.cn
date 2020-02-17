<template>
  <div>
    <div class="step-form-style-desc">
      <div class="rule center">
        <span style="color: red; display:block;padding-top: 20px;font-size:16px;">
          大型生活服务类节目游戏规则
        </span>
      </div>
      <div class="rule">
        <span>以下信息为本人填写,也可以为朋友代发（但是必须是本人授权填写），工作人员会添加此童鞋进行核实！因为报名人数较多，按照报名顺序依次且择优发布，️，请报名者耐心等待！</span>
      </div>
      <div class="rule">
        <span>温馨提示：因为填写内容会进行公开发表在公众号，所以如果出现以下情况，️将不会发布️，谢谢理解！</span>
      </div>
      <div class="rule">
        <span>⚠️1.填写内容随意/不达要求!</span>
        <div class="rule_o">
          <span class="rule_t">⚠️2.照片模糊，面部不清楚</span>
          <span class="rule_t">⚠️3.合照不P掉无关人员的同样无效</span>
          <span class="rule_t">⚠️4.照片美颜、PS严重</span>
          <span class="rule_t">⚠️5.构图角度怪异、配色灰暗、入镜杂物多等</span>
          <span class="rule_t">⚠️6.照片数量不少于7张（多多益善），建议自拍和全身照以及生活照都有</span>
        </div>
      </div>
    </div>

    <a-divider />

    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="姓名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="姓名或者昵称" v-decorator="['name', { initialValue: '', rules: [{required: true, message: '请填写姓名'}] }]"/>
      </a-form-item>
      <a-form-item
        label="性别"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-radio-group v-decorator="['sex', { initialValue: 'male', rules: [{required: true, message: '请选择性别'}] }]">
          <a-radio-button value="male">男</a-radio-button>
          <a-radio-button value="female">女</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="联系方式"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="便于工作人员联系你，不会公布" v-decorator="['contact_account', { initialValue: '', rules: [{required: true, message: '请填写联系方式'}] }]"/>
      </a-form-item>
      <a-form-item
        label="学校"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="乱填可能会减少上镜的几率哦~" v-decorator="['university', { initialValue: '', rules: [{required: true, message: '请填写学校'}] }]"/>
      </a-form-item>
      <a-form-item
        label="座右铭"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="乱填可能会减少上镜的几率哦~" v-decorator="['department', { initialValue: '', rules: [{required: true, message: '请填写座右铭'}] }]"/>
      </a-form-item>
      <a-form-item
        label="身高"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="身高（单位：CM）" suffix="CM" v-decorator="['height', { initialValue: '', rules: [{required: true, message: '请填写身高'}] }]"/>
      </a-form-item>
      <a-form-item
        label="星座"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="选择你自己的星座"
          v-decorator="['constellation', { rules: [{required: true, message: '请选择星座'}] }]">
          <a-select-option value="白羊座">白羊座</a-select-option>
          <a-select-option value="金牛座">金牛座</a-select-option>
          <a-select-option value="双子座">双子座</a-select-option>
          <a-select-option value="巨蟹座">巨蟹座</a-select-option>
          <a-select-option value="狮子座">狮子座</a-select-option>
          <a-select-option value="处女座">处女座</a-select-option>
          <a-select-option value="天秤座">天秤座</a-select-option>
          <a-select-option value="天蝎座">天蝎座</a-select-option>
          <a-select-option value="射手座">射手座</a-select-option>
          <a-select-option value="摩羯座">摩羯座</a-select-option>
          <a-select-option value="水瓶座">水瓶座</a-select-option>
          <a-select-option value="双鱼座">双鱼座</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="产地"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="填写你的出生地" v-decorator="['origin', { initialValue: '', rules: [{required: true, message: '请填写产地'}] }]"/>
      </a-form-item>
      <a-form-item
        label="微博"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="没有写无" v-decorator="['weibo', { initialValue: '', rules: [{required: true, message: '请填写微博'}] }]"/>
      </a-form-item>
      <a-form-item
        label="特长"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-textarea
          placeholder="写上你的特长。 我想你认真对待的话，别人也会认真了解你～"
          v-decorator="['specialty', { initialValue: '', rules: [{required: true, message: '请填写特长'}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item
        label="个人照片"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-upload
          v-decorator="[
            'person_image',
            {
              initialValue: [],
              rules: [{required: true, message: '请上传个人照片', validator: validatorFile}],
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            },
          ]"
          name="image"
          @change="handleChange"
          :customRequest="customRequest"
          list-type="picture"
        >
          <a-button> <a-icon type="upload" /> 点击上传 </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item class="center">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { uploadImage } from '@/api/upload'

export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this)
    }
  },
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.form.setFieldsValue(this.formData)
    }, 100)
  },
  methods: {
    normFile (e) {
      let fileList = [...e.fileList]

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1)

      // 2. read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response
        }
        return file
      })

      e.fileList = fileList

      return e && e.fileList
    },
    customRequest (i) {
      var file = new FormData()
      file.append('name', i.file.name)
      file.append(i.filename, i.file)
      uploadImage(file)
        .then(res => {
          this.$message.success(`${i.file.name} 素材上传成功`)
          i.onSuccess(res)
        })
        .catch(e => {
          this.requestFailed(e)
          i.onError()
        })
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.$message.info(`${info.file.name} 素材开始上传`)
      }
    },
    validatorFile (rule, value, callback) {
      try {
        if (value[0].response === undefined) {
          throw new Error('system errors')
        }
        callback()
      } catch (err) {
        callback(err)
      }
    },
    requestFailed (err) {
      if (((err.response || {}).data || {}).message instanceof Object) {
        var message = ((err.response || {}).data || {}).message
        for (const key in message) {
          setTimeout(() => {
            this.$notification['error']({
              message: '错误',
              description: message[key] || '请求出现错误，请稍后再试',
              duration: 3
            })
          }, 0)
        }
      } else {
        this.$notification['error']({
          message: '错误',
          description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
          duration: 3
        })
      }
    },
    nextStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.$emit('nextStep', 1, values)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  color: rgba(0,0,0,.45);

  .rule{
    display: block;
    margin: 20px 20px 20px 0;
    font-size: 14px;
  }
  .rule_o{
    display: block;
  }
  .rule_t{
    display: block;
    margin-top: 10px;
  }
}
.center {
  text-align: center;
}
</style>
