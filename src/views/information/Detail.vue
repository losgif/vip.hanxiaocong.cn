<template>
  <div>
    <div class="wrapper">
      <h1>注意事项</h1>
      <p>本功能为娱乐目的，如对您的生活造成了困扰，请联系<a href="mailto:losgif@gmail.com">losgif@gmail.com</a>删除联系方式</p>
      <div class="container">
        <div class="copy">
          <h3>联系方式 <span><i class="fa fa-hand-peace-o"></i></span></h3>
          <form>
            <input type="text" v-model="text">
            <button type="button" class="copy">复制</button>
          </form>
        </div>
      </div><!-- end .container -->
    </div><!-- end .wrapper -->
  </div>
</template>
<script>
import Clipboard from 'clipboard'
import { informationSearch } from '@/api/information'

//
// create clipboard for every copy element
const clipboard = new Clipboard('.copy', {
  target: (trigger) => {
    return trigger.previousElementSibling
  }
})

//
// do stuff when copy is clicked
clipboard.on('success', (event) => {
  event.trigger.textContent = '复制成功!'
  setTimeout(() => {
    event.clearSelection()
    event.trigger.textContent = '复制'
  }, 2000)
})

export default {
  data () {
    return {
      text: '正在查询中'
    }
  },
  mounted () {
    informationSearch(this.$route.params).then(res => {
      if (res.code === 200) {
        this.text = res.data
      } else {
        this.text = res.message
      }
    }).catch(e => {
      const message = e.response.data.message
      this.text = message
      this.$message.error(message)
    })
  }
}
</script>
<style>
html,
body {
  height: 100%;
}

body {
  font-size: 16px;
  background: #ffd1dd;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
}

* {
  box-sizing: border-box;
}

.wrapper {
  padding: 0 5px;
}

h1 {
  text-align: center;
  font-size: 40px;
  margin-bottom: 1.2em;
  text-decoration: underline;
  text-transform: uppercase;
}

p {
  font-size: 20px;
}

.container {
  display: -webkit-box;
  display: flex;
  background: #ffa3bb;
  border-radius: 7px;
  padding: 10px;
  margin: 0 auto;
}

h3 {
  font-size: 28px;
  text-transform: uppercase;
  text-align: center;
}
h3 span {
  display: inline-block;
  position: relative;
}

.copy {
  -webkit-box-flex: 1;
          flex-grow: 1;
}

.copy {
  padding-right: 10px;
}
.copy h3 span {
  background: #76ecff;
}
.copy input {
  padding-right: 90px;
}

form {
  position: relative;
  width: 100%;
}
form input {
  display: block;
  width: 100%;
  border: 3px solid;
  outline: 0;
  background: #fff;
  font-size: 25px;
  padding: 5px 4px;
  margin-bottom: 20px;
}
form button {
  display: block;
  position: absolute;
  top: 50%;
  right: 10px;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  border: 0;
  outline: 0;
  color: #fff;
  background: #000;
  font-size: 25px;
  text-transform: uppercase;
  padding: 0.08em 0.8em;
  cursor: pointer;
}
</style>
