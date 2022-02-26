<template>
  <div class="about">
    <div class="site-content">
      <div class="content-warp">
        <div class="about-site about-info">
          <section-title><span>❤</span>关于博客</section-title>
          <div class="info-card">
            <p>Lewiis</p>
            <p>在校大学生</p>
            <p>数字媒体技术专业</p>
            <p>一个正在努力的前端工作者</p>
            <p>
              博客基于<a
                target="_blank"
                class="out-link"
                href="https://fengziy.cn"
                style="color: #ff6d6d"
                >fengziy</a
              >二次开发(跪谢大佬!!!)
            </p>
            <p>
              您高抬贵手，<a
                target="_blank"
                class="out-link"
                href="https://gitee.com/lewiis/lewiis"
                style="color: #ff6d6d"
                >Gitee仓库</a
              >无论如何一定要star★一下哟!
            </p>
            <p>
              有问题发邮件(<a
                href="mailto:1819631759@qq.com?subject=深入探讨一些事情&body你此时所想的内容"
                style="color: #ff6d6d"
                >1819631759@qq.com</a
              >)，我们一块儿"深入探讨"
            </p>
          </div>
        </div>
        <div class="about-me about-info">
          <section-title id="Guestbook"><span>❤</span>给我留言</section-title>
          <div class="info-card">
            <div class="contactForm">
              <div class="form-item">
                <label for="mail">邮箱：</label>
                <input
                  class="v"
                  type="email"
                  name="mail"
                  id="mail"
                  placeholder="请输入你的邮箱"
                  v-model="email"
                />
              </div>
              <div class="form-item">
                <label for="content">内容：</label>
                <textarea
                  rows="5"
                  class="v"
                  id="content"
                  name="content"
                  placeholder="这里可以输入你想咨询的问题或者你的博客名称+个人简介+博客地址,收到后第一时间我将在博客中发布!"
                  v-model="question"
                ></textarea>
              </div>
              <div class="form-item">
                <label></label>
                <button @click="onSubmit">提交</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sectionTitle from "@/components/section-title";
import { addMessage } from "@/api/message"
import { getTime, getTimeInterval } from "@/utils";
export default {
  name: "About",
  data() {
    return {
      list: [],
      email:'',
      question:''
    };
  },
  components: {
    sectionTitle,
  },
  methods: {
    onSubmit() {
      // 保存到数据库中
      this.addMessage()
    },
    addMessage(){
      addMessage({email:this.email,msg:this.question})
      .then((res)=>{
        this.$message({
          message: '恭喜你，留言成功',
          type: 'success'
        });
        // 清空输入框的内容
        this.email = '',
        this.question = ''
      })
    }
  },
  mounted() {},
};
</script>
<style scoped lang="less">
.about {
  padding-top: 40px;
}

.content-warp {
  margin-top: 80px;

  .about-info {
    margin: 30px 0;

    span {
      color: red;
      margin-right: 10px;
    }

    .info-card {
      min-height: 100px;
      padding: 20px;
      border-radius: 3px;
      margin: 30px 0 50px 0;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      p {
        line-height: 1.7rem;
      }
    }
  }
  .contactForm {
    width: 100%;
    padding: 20px;
    .form-item {
      align-items: center;
      display: flex;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      label {
        width: 80px;
      }
      .v {
        min-height: 40px;
        line-height: 20px;
        border-radius: 3px;
        padding: 2px 10px;
        outline: none;
        border: 1px solid #8fd0cc;
        width: 100%;
        resize: vertical;
      }
      button {
        width: 100px;
        height: 40px;
        border-radius: 3px;
        outline: 0;
        border-style: none;
        cursor: pointer;
        background-color: #409eff;
        color: white;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}

/*******/
@media (max-width: 800px) {
  .content-warp {
    margin-top: 0;
  }
}
</style>
