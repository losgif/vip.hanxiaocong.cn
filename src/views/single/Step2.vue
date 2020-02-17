<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;" :layout="'vertical'">
      <a-alert
        :closable="true"
        message="请认真填写问题，无图片信息将被丢弃。"
        style="margin-bottom: 24px;"
      />
      <a-form-item
        label="1、兴趣爱好以及性格"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="可以多写一些自己的兴趣和爱好，多写一些，最少20个字，敷衍了事的一律不予上墙。"
          v-decorator="['question_1', { initialValue: '', rules: [{required: true, message: '必填'}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item>
        <div class="dropbox">
          <a-upload
            v-decorator="[
              'question_image_1',
              {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            :customRequest="customRequest"
            @change="handleChange"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="2、人生经历分享"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="分享生活、学习、工作、旅游等经历都可以，向TA展示有趣有序的你，最少20字。"
          v-decorator="['question_2', { initialValue: '', rules: [{required: true, message: '必填'}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item>
        <div class="dropbox">
          <a-upload
            v-decorator="[
              'question_image_2',
              {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            :customRequest="customRequest"
            @change="handleChange"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="3、一段简单地自我介绍"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="写的真诚一点可以获得更多赞哦，最少20字，多写一些，敷衍了事的一律不予上墙"
          v-decorator="['question_3', { initialValue: '', rules: [{required: true, message: '必填'}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item>
        <div class="dropbox">
          <a-upload
            v-decorator="[
              'question_image_3',
              {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            :customRequest="customRequest"
            @change="handleChange"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="4、好友对你的印象或评价"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="写的真诚一点可以获得更多赞哦，多写一些，最少20字，敷衍了事的一律不予上墙。"
          v-decorator="['question_4', { initialValue: '', rules: [{required: true, message: '必填'}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item>
        <div class="dropbox">
          <a-upload
            v-decorator="[
              'question_image_4',
              {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            :customRequest="customRequest"
            @change="handleChange"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="5、你的爱情观"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="你自己对爱情看法或者感悟，最少20字，敷衍了事的一律不予上墙。"
          v-decorator="['question_5', { initialValue: '', rules: [{required: true, message: '必填'}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item>
        <div class="dropbox">
          <a-upload
            v-decorator="[
              'question_image_5',
              {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            :customRequest="customRequest"
            @change="handleChange"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="6、希望未来的他是怎样的？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="你理想中的或者你期望的ta，多写一些，最少20字，敷衍了事的一律不予上墙。"
          v-decorator="['question_6', { initialValue: '', rules: [{required: true, message: '必填'}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item>
        <div class="dropbox">
          <a-upload
            v-decorator="[
              'question_image_6',
              {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            :customRequest="customRequest"
            @change="handleChange"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="7、自己单身的原因是什么？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
          v-decorator="['question_7', { initialValue: '', rules: [{required: true, message: '必填'}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item>
        <div class="dropbox">
          <a-upload
            v-decorator="[
              'question_image_7',
              {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            :customRequest="customRequest"
            @change="handleChange"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="8、如果碰到对的那个TA，最希望和对方过什么样的生活？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
          v-decorator="['question_8', { initialValue: '', rules: [{required: true, message: '必填'}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item>
        <div class="dropbox">
          <a-upload
            v-decorator="[
              'question_image_8',
              {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            :customRequest="customRequest"
            @change="handleChange"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="9、备注"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
          v-decorator="['question_9', { initialValue: '', rules: [{required: false}] }]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item>
        <div class="dropbox">
          <a-upload
            v-decorator="[
              'question_image_9',
              {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            :customRequest="customRequest"
            @change="handleChange"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-form-item class="dropbox">
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { uploadImage } from '@/api/upload'

export default {
  name: 'Step2',
  data () {
    return {
      labelCol: { lg: { span: 24 }, sm: { span: 24 } },
      wrapperCol: { lg: { span: 24 }, sm: { span: 24 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0
    }
  },
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  mounted () {
    console.log(this.formData)
    setTimeout(() => {
      this.form.setFieldsValue(this.formData)
    }, 100)
  },
  methods: {
    nextStep () {
      const that = this
      const { form: { validateFields } } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          that.timer = setTimeout(function () {
            that.loading = false
            that.$emit('nextStep', 2, values)
          }, 1500)
        } else {
          that.loading = false
        }
      })
    },
    prevStep () {
      const values = this.form.getFieldsValue()
      this.$emit('prevStep', 0, values)
    },
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
          i.onSuccess(res)
        })
        .catch(e => {
          console.log(e)
          i.onError()
        })
    },
    handleChange (info) {
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 素材上传成功`)

        console.log(info)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 素材上传失败`)
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }

  .dropbox {
    text-align: center;
  }
</style>
