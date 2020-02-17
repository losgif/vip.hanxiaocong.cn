<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;" :layout="'vertical'">
      <a-alert
        :closable="true"
        message="请至少任选6个问题回答，无图片信息将被丢弃。"
        style="margin-bottom: 24px;"
      />
      <a-form-item
        label="1、女神/男神对自己的评价（感觉自己是什么样的人）？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的自我评价。"
          v-decorator="['question_1', { initialValue: '', rules: [{required: false}] }]"
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
                rules: [{message: '请重新上传图片', validator: validatorFile}],
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
        label="2、女神/男神是单身还是有男or女票呢？喜欢什么类型的异性？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
          v-decorator="['question_2', { initialValue: '', rules: [{required: false}] }]"
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
                rules: [{message: '请重新上传图片', validator: validatorFile}],
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
        label="3、女神/男神在大学期间的经历，有什么改变？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的经历。"
          v-decorator="['question_3', { initialValue: '', rules: [{required: false}] }]"
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
                rules: [{message: '请重新上传图片', validator: validatorFile}],
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
        label="4、女神/男神在生活中发生过的囧事？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
          v-decorator="['question_4', { initialValue: '', rules: [{required: false}] }]"
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
                rules: [{message: '请重新上传图片', validator: validatorFile}],
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
        label="5、女神/男神有喜欢的偶像（科学家/明星）吗？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
          v-decorator="['question_5', { initialValue: '', rules: [{required: false}] }]"
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
                rules: [{message: '请重新上传图片', validator: validatorFile}],
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
        label="6、女神/男神有没有参加过什么社团、组织、活动啊，自己的收获是什么？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
          v-decorator="['question_6', { initialValue: '', rules: [{required: false}] }]"
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
                rules: [{message: '请重新上传图片', validator: validatorFile}],
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
        label="7、女神/男神对自己未来的规划？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
          v-decorator="['question_7', { initialValue: '', rules: [{required: false}] }]"
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
                rules: [{message: '请重新上传图片', validator: validatorFile}],
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
        label="8、女神/男神有什么小梦想？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
          v-decorator="['question_8', { initialValue: '', rules: [{required: false}] }]"
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
                rules: [{message: '请重新上传图片', validator: validatorFile}],
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
        label="9、女神/男神有什么要对学弟学妹说的话？"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-textarea
          placeholder="请填写简单的描述。"
          v-decorator="['question_9', { initialValue: '', rules: [{required: true, message: '必填'}] }]"
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
                rules: [{message: '请重新上传图片', validator: validatorFile}],
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
        if (value.length !== 0 && value[0].response === undefined) {
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
