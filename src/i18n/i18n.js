import Vue from 'vue';
import Element from 'element-ui'
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './locale/en'
import zh from './locale/zh-CN'
const messages={
  en: {
      ...en,
      ...enLocale
  },
  zh: {
      ...zh,
      ...zhLocale
  }
}
let lang = localStorage.getItem('lang');
let locale = lang =='en_US'?'en':'zh';

Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: locale, //设置默认语言
	messages,
    silentTranslationWarn: true
});

Vue.use(Element,{
    i18n:(key,value) => i18n.t(key,value)
})
export default i18n;
