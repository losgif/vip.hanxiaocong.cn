<template>
  <div>
    <div class="step-form-style-desc">
      <div class="rule center">
        <span style="color: red; display:block;font-size:16px;">
          大型生活服务类节目游戏规则
        </span>
      </div>
      <div class="rule">
        <span>可以适当卖自己的舍友、兄弟、闺蜜等，帮助他们脱单，平台会进行认真审核然后发布。</span>
      </div>
      <div class="rule">
        <span>最重要的是，欢迎替自己报名!我们的原则是：有对象的不能上，同时拒绝无脑低端黑，须征得本人同意，希望大家遵守。</span>
      </div>
      <div class="rule">
        <span>我们不会将任何一个人的联系方式直接发布到网络。想知道他的联系方式吗？在平台里直接发送编号（如love1111），即可收到TA的联系方式</span>
      </div>
      <div class="rule">
        <span>⚠️1.填写内容随意/不达要求!</span>
        <div class="rule_o">
          <span class="rule_t">⚠️2.照片模糊，面部不清楚</span>
          <span class="rule_t">⚠️3.合照不P掉无关人员的同样无效</span>
          <span class="rule_t">⚠️4.照片美颜、PS严重</span>
          <span class="rule_t">⚠️5.构图角度怪异、配色灰暗、入镜杂物多等</span>
        </div>
      </div>
      <div class="rule">
        <span>本功能由小葱工作室开发，有问题请联系：ujnhand@qq.com</span>
      </div>
    </div>

    <a-divider />

    <a-form layout="vertical" :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="被卖人（TA的昵称）"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="输入被卖人姓名或者昵称" v-decorator="['ta_name', { initialValue: '', rules: [{required: true, message: '请填写被卖人姓名或者昵称'}] }]"/>
      </a-form-item>
      <a-form-item
        label="TA的性别"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-radio-group v-decorator="['sex', { initialValue: 'male', rules: [{required: true, message: '请选择性别'}] }]">
          <a-radio-button value="male">男</a-radio-button>
          <a-radio-button value="female">女</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="TA的联系方式（标注微信或者QQ）"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="输入TA的联系方式" v-decorator="['ta_contact_account', { initialValue: '', rules: [{required: true, message: '请填写TA的联系方式'}] }]"/>
      </a-form-item>
      <a-form-item
        label="TA的学校"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="输入学院年级或者毕业学校" v-decorator="['university', { initialValue: '', rules: [{required: true, message: '请填写学校'}] }]"/>
      </a-form-item>
      <a-form-item
        label="你的联系方式"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="你的联系方式，便于随时沟通" v-decorator="['your_contact_account', { initialValue: '', rules: [{required: true, message: '请填写你的联系方式'}] }]"/>
      </a-form-item>
      <a-form-item
        label="TA的身高"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="身高（单位：CM）" suffix="CM" v-decorator="['height', { initialValue: '', rules: [{required: true, message: '请填写身高'}] }]"/>
      </a-form-item>
      <a-form-item
        label="TA的产地"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="请输入产地家乡" v-decorator="['origin', { initialValue: '', rules: [{required: true, message: '请填写产地家乡'}] }]"/>
      </a-form-item>
      <a-form-item
        label="TA的描述（爆料）简短个人介绍"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-textarea
          placeholder="写上他的品质以及兴趣爱好的特长。 我想你认真对待的话，别人也会认真了解你～"
          v-decorator="['specialty', { initialValue: '', rules: [{required: true, message: '请填写描述'}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item
        label="TA对另一半的期望（喜欢哪种类型）"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-textarea
          placeholder="结合现实，遵循本心~"
          v-decorator="['expectation', { initialValue: '', rules: [{required: true, message: '请输入Ta喜欢的类型'}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item
        label="TA的撩妹（汉）皂片"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-upload
          v-decorator="[
            'person_image',
            {
              initialValue: [],
              rules: [{required: true, message: '请上传照片'}, {validator: validatorFile}],
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            },
          ]"
          name="image"
          @change="handleChange"
          action="/api/upload/image"
          list-type="picture"
        >
          <a-button> <a-icon type="upload" /> 点击上传个人照片 </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item class="center">
        <a-button type="primary" @click="nextStep">提交报名</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 24 }, sm: { span: 24 } },
      wrapperCol: { lg: { span: 24 }, sm: { span: 24 } },
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
        if (file.response !== undefined && file.response.code === 200) {
          // Component will show file.url as link
          file.url = file.response.data
        }
        return file
      })

      e.fileList = fileList

      return e && e.fileList
    },
    handleChange (info) {
      if (info.file.status === 'done' || info.file.status === 'error') {
        if (info.file.response.code === 200) {
          this.$message.success(`${info.file.name} 素材上传成功`, 3)
        } else {
          this.$message.error('上传失败！' + info.file.response.message, 3)
        }
      }
    },
    validatorFile (rule, value, callback) {
      try {
        if (value.length !== 0 && value[0].response !== undefined && value[0].response.code !== 200) {
          throw new Error(value[0].response.message)
        }
        callback()
      } catch (err) {
        callback(err.message)
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
    margin: 0 20px 20px 0;
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
