<template>
  <div>
    <div class="step-form-style-desc">
      <div class="rule center">
        <span style="color: red; display:block;font-size:16px;">
          脱单上墙交友报名
        </span>
      </div>
      <div class="rule">
        <span>以下信息为交友男/女嘉宾本人填写,也可以为朋友代发（但是必须是交友本人授权填写），工作人员会扫描二维码添加此童鞋进行核实！因为报名人数较多，按照报名顺序依次且择优发布，⚠️工作人员添加微信好友告知发布安排，请报名者耐心等待！</span>
      </div>
      <div class="rule">
        <span>温馨提示：因为填写内容会进行公开发表在公众号，所以如果出现以下情况，⚠️将不会发布⚠️，谢谢理解！</span>
      </div>
      <div class="rule">
        <span>⚠️1.填写内容随意/不达要求!</span>
        <div class="rule_o">
          <span class="rule_t">⚠️2.照片模糊，面部不清楚</span>
          <span class="rule_t">⚠️3.合照不P掉无关人员的同样无效</span>
          <span class="rule_t">⚠️4.照片美颜、PS严重</span>
          <span class="rule_t">⚠️5.构图角度怪异、配色灰暗、入镜杂物多等</span>
          <span class="rule_t">⚠️6.照片数量不少于7张（多多益善），建议自拍和全身照以及生活照都有</span>
          <span class="rule_t">⚠️7.在写个人介绍和交友需求的时候可以多写一些，敷衍了事的一律不通过</span>
          <span class="rule_t">！！！请确保你的信息不会出现以上现象后再进行填写（仅一次填写机会，提交后不可更改了，请仔细检查是否填写正确！）！！！</span>
        </div>
      </div>
      <div class="rule">
        <span>本功能由小葱工作室开发，有问题请联系：ujnhand@qq.com</span>
      </div>
    </div>

    <a-divider />

    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="姓名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="请输入姓名或昵称" v-decorator="['name', { initialValue: '', rules: [{required: true, message: '请填写姓名'}] }]"/>
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
        <a-input placeholder="请保持微信号搜索正常，以免错过ta~" v-decorator="['contact_account', { initialValue: '', rules: [{required: true, message: '请填写联系方式'}] }]"/>
      </a-form-item>
      <a-form-item
        label="教育背景"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="必须写清在读或毕业院校的全称及相应学历~" v-decorator="['university', { initialValue: '', rules: [{required: true, message: '请填写学校'}] }]"/>
      </a-form-item>
      <a-form-item
        label="工作类型"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="例：互联网／公务员／创业／学生或者其他" v-decorator="['department', { initialValue: '', rules: [{required: true, message: '请填写工作类型'}] }]"/>
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
        label="籍贯"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="填写你的出生地或者成长地" v-decorator="['origin', { initialValue: '', rules: [{required: true, message: '请填写籍贯'}] }]"/>
      </a-form-item>
      <a-form-item
        label="期望发展城市"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="乱填可能会减少上镜的几率哦" v-decorator="['weibo', { initialValue: '', rules: [{required: true, message: '请填写期望发展城市'}] }]"/>
      </a-form-item>
      <a-form-item
        label="目前活动范围"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="如XX市XX区或者XX大学" v-decorator="['specialty', { initialValue: '', rules: [{required: true, message: '请填写目前活动范围'}] }]"/>
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
              rules: [{required: true, message: '请上传一张个人照片'}, {validator: validatorFile}],
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            },
          ]"
          name="file"
          @change="handleChange"
          action="https://up-z0.qiniup.com/"
          :defaultFileList="this.defaultFileList"
          :data="() => this.getUploadToken()"
          :beforeUpload="beforeUpload"
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
import { requestFailedHandle } from '@/utils/request'
import { uploadFetchToken } from '@/api/upload'

export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      token: '',
      domain: '',
      defaultFileList: []
    }
  },
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.beforeUpload()

    setTimeout(() => {
      this.form.setFieldsValue(this.formData)
    }, 100)
  },
  methods: {
    getUploadToken () {
      return {
        token: this.token
      }
    },
    async beforeUpload (file) {
      await this.fetchUploadToken(file)

      return true
    },
    async fetchUploadToken () {
      uploadFetchToken().then(res => {
        this.token = res.data.token
        this.domain = res.data.domain
      }).catch(e => {
        requestFailedHandle(e)
      })
    },
    normFile (e) {
      let fileList = [...e.fileList]

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1)

      // 2. read from response and show file link
      fileList = fileList.map(file => {
        if (file.response !== undefined && file.response.key !== undefined) {
          // Component will show file.url as link
          file.url = this.domain + file.response.key
        }
        return file
      })

      e.fileList = fileList

      return e.fileList
    },
    handleChange (info) {
      if (info.file.status === 'done' || info.file.status === 'error') {
        if (info.file.response.key !== undefined) {
          this.$message.success(`${info.file.name} 素材上传成功`, 3)
        } else {
          this.$message.error('上传失败！', 3)
        }
      }
    },
    validatorFile (rule, value, callback) {
      try {
        if (value.length !== 0 && value[0].response !== undefined && value[0].response.key === undefined) {
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
