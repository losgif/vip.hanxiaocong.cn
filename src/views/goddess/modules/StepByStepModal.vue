<template>
  <a-modal
    title="分步对话框"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-steps :current="currentStep" :style="{ marginBottom: '28px' }" size="small">
        <a-step title="基本信息" />
        <a-step title="扩展问题" />
      </a-steps>
      <a-form :form="form" :layout="formLayout">
        <div v-show="currentStep === 0">
          <a-form-item
            label="姓名"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input placeholder="姓名或者昵称" v-decorator="['name', { initialValue: this.formData.name, rules: [{required: true, message: '请填写姓名'}] }]"/>
          </a-form-item>
          <a-form-item
            label="性别"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-radio-group v-decorator="['sex', { initialValue: this.formData.sex, rules: [{required: true, message: '请选择性别'}] }]">
              <a-radio-button value="male">男</a-radio-button>
              <a-radio-button value="female">女</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="联系方式"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input placeholder="便于工作人员联系你，不会公布" v-decorator="['contact_account', { initialValue: this.formData.contact_account, rules: [{required: true, message: '请填写联系方式'}] }]"/>
          </a-form-item>
          <a-form-item
            label="学校"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input placeholder="乱填可能会减少上镜的几率哦~" v-decorator="['university', { initialValue: this.formData.university, rules: [{required: true, message: '请填写学校'}] }]"/>
          </a-form-item>
          <a-form-item
            label="座右铭"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input placeholder="乱填可能会减少上镜的几率哦~" v-decorator="['department', { initialValue: this.formData.department, rules: [{required: true, message: '请填写座右铭'}] }]"/>
          </a-form-item>
          <a-form-item
            label="身高"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input placeholder="身高（单位：CM）" suffix="CM" v-decorator="['height', { initialValue: this.formData.height, rules: [{required: true, message: '请填写身高'}] }]"/>
          </a-form-item>
          <a-form-item
            label="星座"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-select
              placeholder="选择你自己的星座"
              v-decorator="['constellation', { initialValue: this.formData.constellation, rules: [{required: true, message: '请选择星座'}] }]">
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
            <a-input placeholder="填写你的出生地" v-decorator="['origin', { initialValue: this.formData.origin, rules: [{required: true, message: '请填写产地'}] }]"/>
          </a-form-item>
          <a-form-item
            label="微博"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input placeholder="没有写无" v-decorator="['weibo', { initialValue: this.formData.weibo, rules: [{required: true, message: '请填写微博'}] }]"/>
          </a-form-item>
          <a-form-item
            label="特长"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-textarea
              placeholder="写上你的特长。 我想你认真对待的话，别人也会认真了解你～"
              v-decorator="['specialty', { initialValue: this.formData.specialty, rules: [{required: true, message: '请填写特长'}] }]"
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
                  rules: [{validator: validatorFile}],
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                },
              ]"
              name="image"
              @change="handleChange"
              action="/api/upload/image"
              list-type="picture"
            >
              <a-button> <a-icon type="upload" /> 点击上传 </a-button>
            </a-upload>
          </a-form-item>
        </div>
        <div v-show="currentStep === 1">
          <a-form-item
            label="1、女神/男神对自己的评价（感觉自己是什么样的人）？"
            :labelCol="step2LabelCol"
            :wrapperCol="step2WrapperCol"
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
                    rules: [{validator: validatorFile}],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  },
                ]"
                name="image"
                action="/api/upload/image"
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
            :labelCol="step2LabelCol"
            :wrapperCol="step2WrapperCol"
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
                    rules: [{validator: validatorFile}],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  },
                ]"
                name="image"
                action="/api/upload/image"
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
            :labelCol="step2LabelCol"
            :wrapperCol="step2WrapperCol"
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
                    rules: [{validator: validatorFile}],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  },
                ]"
                name="image"
                action="/api/upload/image"
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
            :labelCol="step2LabelCol"
            :wrapperCol="step2WrapperCol"
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
                    rules: [{validator: validatorFile}],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  },
                ]"
                name="image"
                action="/api/upload/image"
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
            :labelCol="step2LabelCol"
            :wrapperCol="step2WrapperCol"
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
                    rules: [{validator: validatorFile}],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  },
                ]"
                name="image"
                action="/api/upload/image"
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
            :labelCol="step2LabelCol"
            :wrapperCol="step2WrapperCol"
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
                    rules: [{validator: validatorFile}],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  },
                ]"
                name="image"
                action="/api/upload/image"
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
            :labelCol="step2LabelCol"
            :wrapperCol="step2WrapperCol"
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
                    rules: [{validator: validatorFile}],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  },
                ]"
                name="image"
                action="/api/upload/image"
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
            :labelCol="step2LabelCol"
            :wrapperCol="step2WrapperCol"
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
                    rules: [{validator: validatorFile}],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  },
                ]"
                name="image"
                action="/api/upload/image"
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
            :labelCol="step2LabelCol"
            :wrapperCol="step2WrapperCol"
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
                    rules: [{validator: validatorFile}],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  },
                ]"
                name="image"
                action="/api/upload/image"
                @change="handleChange"
                list-type="picture"
              >
                <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>
              </a-upload>
            </div>
          </a-form-item>
        </div>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="back" @click="backward" v-if="currentStep > 0" :style="{ float: 'left' }" >上一步</a-button>
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleNext(currentStep)">{{ currentStep === 1 && '完成' || '下一步' }}</a-button>
    </template>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

const stepForms = [
  ['name', 'desc'],
  ['target', 'template', 'type'],
  ['time', 'frequency']
]

export default {
  name: 'StepByStepModal',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      step2LabelCol: { lg: { span: 24 }, sm: { span: 24 } },
      step2WrapperCol: { lg: { span: 24 }, sm: { span: 24 } },
      visible: false,
      confirmLoading: false,
      currentStep: 0,
      mdl: {},

      form: this.$form.createForm(this),
      formLayout: 'horizontal'
    }
  },
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  methods: {
    edit (record) {
      this.visible = true
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        setFieldsValue(pick(record, []))
      })
    },
    handleNext (step) {
      this.formLayout = 'vertical'

      const { form: { validateFields } } = this
      const currentStep = step + 1
      if (currentStep <= 1) {
        // stepForms
        validateFields(stepForms[ this.currentStep ], (errors, values) => {
          if (!errors) {
            this.currentStep = currentStep
          }
        })
        return
      }
      // last step
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          console.log('values:', values)
          setTimeout(() => {
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    backward () {
      this.currentStep--
      this.formLayout = 'horizontal'
    },
    handleCancel () {
      // clear form & currentStep
      this.visible = false
      this.currentStep = 0
      this.formLayout = 'horizontal'
    },
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
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 素材上传成功`)

        console.log(info)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 素材上传失败`)
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
    }
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
</style>
