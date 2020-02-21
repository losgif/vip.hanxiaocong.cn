<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;" :layout="'vertical'">
      <a-form-item
        label="1、女神/男神对自己的评价（感觉自己是什么样的人）？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的自我评价。"
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
                initialValue: [],
                rules: [{required: true, message: '请上传照片'}],
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            @change="handleChange"
            action="/api/upload/image"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 请点击上传一张照片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="2、女神/男神是否单身？喜欢什么类型的异性？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
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
                initialValue: [],
                rules: [{required: true, message: '请上传照片'}],
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            @change="handleChange"
            action="/api/upload/image"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 请点击上传一张照片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="3、女神/男神在大学期间的有什么印象深刻经历，对自己有什么改变？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的经历。"
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
                initialValue: [],
                rules: [{required: true, message: '请上传照片'}],
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            @change="handleChange"
            action="/api/upload/image"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 请点击上传一张照片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="4、女神/男神在生活中有木有发生过的比较囧的事？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
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
                initialValue: [],
                rules: [{required: true, message: '请上传照片'}],
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            @change="handleChange"
            action="/api/upload/image"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 请点击上传一张照片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="5、女神/男神有喜欢的偶像？为什么喜欢？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
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
                initialValue: [],
                rules: [{required: true, message: '请上传照片'}],
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            @change="handleChange"
            action="/api/upload/image"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 请点击上传一张照片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="6、女神/男神有没有参加过什么社团、组织、活动啊，感觉自己的收获是什么？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
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
                initialValue: [],
                rules: [{required: true, message: '请上传照片'}],
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            @change="handleChange"
            action="/api/upload/image"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 请点击上传一张照片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="7、女神/男神对自己的未来有哪些规划？"
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
                initialValue: [],
                rules: [{required: true, message: '请上传照片'}],
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            @change="handleChange"
            action="/api/upload/image"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 请点击上传一张照片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="8、女神/男神有什么小梦想，想去完成？"
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
                initialValue: [],
                rules: [{required: true, message: '请上传照片'}],
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
            ]"
            name="image"
            @change="handleChange"
            action="/api/upload/image"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> 请点击上传一张照片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-divider />
      <a-form-item
        label="9、女神/男神有什么要对学弟学妹说的话？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
          v-decorator="['question_9', { initialValue: '', rules: [{required: true, message: '必填'}]}]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item>
        <div class="dropbox">
          <a-upload
            v-decorator="[
              'question_image_9',
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
            <a-button> <a-icon type="upload" /> 请点击上传一张照片 </a-button>
          </a-upload>
        </div>
      </a-form-item>
      <a-form-item class="dropbox">
        <a-button :loading="loading" type="primary" @click="nextStep">提交报名</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
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
